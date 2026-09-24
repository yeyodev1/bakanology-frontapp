<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { academyService, type Course } from '@/services/academyService'
import { useDashboardStore } from '@/stores/dashboard'
import { useUserStore } from '@/stores/user'
import LaunchBlocker from '@/components/dashboard/LaunchBlocker.vue'

const launchDeadline = (import.meta.env.VITE_LAUNCH_DEADLINE as string) || '2026-07-06T00:00:00-05:00'
const isBeforeLaunch = computed(() => new Date().getTime() < new Date(launchDeadline).getTime())

const dashboardStore = useDashboardStore()
const userStore = useUserStore()
const courses = ref<Course[]>([])
const loading = ref(true)

const accessState = computed(() => (userStore.hasActiveAccess ? 'active' : 'inactive'))
const subscriptionStatusLabel = computed(() => (userStore.hasActiveAccess ? 'Activa' : 'Inactiva'))

const expiresAtLabel = computed(() => {
  if (!userStore.accessUntil) return 'Sin fecha de vencimiento'
  const date = new Date(userStore.accessUntil)
  const label = date.toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
  return userStore.hasActiveAccess ? `Acceso hasta el ${label}` : `Venció el ${label}`
})

const totalProgress = computed(() => {
  if (!courses.value.length) return 0
  const total = courses.value.reduce((acc, c) => acc + (c.progress?.totalLessons || 0), 0)
  const completed = courses.value.reduce((acc, c) => acc + (c.progress?.completedLessons || 0), 0)
  return total === 0 ? 0 : Math.round((completed / total) * 100)
})

const recentCourses = computed(() => courses.value.slice(0, 3))

onMounted(async () => {
  try {
    courses.value = await academyService.listCourses()
  } catch (e) {
    console.error('Failed to load courses')
  } finally {
    loading.value = false
  }
  
  // Listen for progress updates
  window.addEventListener('progress-updated', async () => {
    courses.value = await academyService.listCourses()
  })
})
</script>

<template>
  <LaunchBlocker v-if="isBeforeLaunch" :deadline="launchDeadline" />
  <div v-else class="dashboard-view">
    <section class="stats">
      <div class="stat-card stat-card--progress">
        <span class="stat-card__value">{{ totalProgress }}%</span>
        <span class="stat-card__label">Progreso general</span>
        <div class="stat-card__bar"><div class="stat-card__fill" :style="{ width: `${totalProgress}%` }" /></div>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">{{ courses.length }}</span>
        <span class="stat-card__label">Cursos disponibles</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">{{ dashboardStore.completedAchievements.length }}</span>
        <span class="stat-card__label">Logros desbloqueados</span>
      </div>
      <div class="stat-card" :class="`stat-card--${accessState}`">
        <span class="stat-card__value">{{ subscriptionStatusLabel }}</span>
        <span class="stat-card__label">{{ expiresAtLabel }}</span>
      </div>
    </section>

    <section class="section">
      <div class="section__header">
        <h2 class="section__title">Continúa aprendiendo</h2>
        <RouterLink :to="{ name: 'courses' }" class="section__link">Ver todos los cursos</RouterLink>
      </div>
      <div v-if="loading" class="course-grid" aria-busy="true" aria-label="Cargando cursos">
        <div v-for="n in 3" :key="n" class="course-card course-card--skeleton" />
      </div>
      <div v-else-if="!recentCourses.length" class="empty">
        <i class="fa-solid fa-graduation-cap" aria-hidden="true" />
        <p class="empty__title">Todavía no hay cursos publicados</p>
        <p class="empty__text">Te avisaremos por correo cuando se publique el primero.</p>
      </div>
      <div v-else class="course-grid">
        <RouterLink
          v-for="course in recentCourses"
          :key="course._id"
          :to="{ name: 'course-detail', params: { courseId: course._id } }"
          class="course-card"
        >
          <div class="course-card__thumb">
            <img v-if="course.cover" :src="course.cover.deliveryUrl || course.cover.publicId" :alt="course.title" />
            <div v-else class="course-card__placeholder"><i class="fa-solid fa-graduation-cap" /></div>
            <span class="course-card__category">{{ course.lessons?.length || 0 }} clases</span>
          </div>
          <div class="course-card__body">
            <h3 class="course-card__title">{{ course.title }}</h3>
            <p class="course-card__subtitle">{{ course.summary }}</p>
            <div v-if="course.progress" class="course-card__progress">
              <div class="course-card__progress-bar"><div class="course-card__progress-fill" :style="{ width: `${course.progress.percent}%` }" /></div>
              <span class="course-card__progress-value">{{ course.progress.percent }}%</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="section">
      <div class="section__header">
        <h2 class="section__title">Últimos logros</h2>
        <RouterLink :to="{ name: 'achievements' }" class="section__link">Ver todos</RouterLink>
      </div>
      <div class="achievements-row">
        <div
          v-for="achievement in dashboardStore.achievements.slice(0, 4)"
          :key="achievement.id"
          class="achievement-badge"
          :class="{ 'achievement-badge--locked': achievement.isLocked }"
        >
          <div class="achievement-badge__icon">
            <i :class="achievement.isLocked ? 'fa-solid fa-lock' : 'fa-solid fa-medal'" aria-hidden="true" />
          </div>
          <span class="achievement-badge__title">{{ achievement.title }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-view { display: flex; flex-direction: column; gap: 2rem; padding-top: 16px; }
.empty { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; padding: 2.5rem 1.5rem; text-align: center; background: $white; border: 1px dashed $gray-300; border-radius: 1rem; color: $gray-600;
  i { font-size: 1.75rem; color: $bakano-pink; margin-bottom: 0.5rem; }
  &__title { margin: 0; font-family: $font-sans; font-weight: 700; color: $bakano-dark; }
  &__text { margin: 0; font-size: 0.9rem; }
}
.course-card--skeleton { min-height: 260px; background: linear-gradient(90deg, rgba($bakano-dark, 0.05) 25%, rgba($bakano-dark, 0.09) 50%, rgba($bakano-dark, 0.05) 75%); background-size: 200% 100%; animation: dashboard-shimmer 1.4s ease-in-out infinite; }
@keyframes dashboard-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 1rem; }
@media (min-width: 1100px) { .stats { grid-template-columns: repeat(4, 1fr); } }

.stat-card { min-width: 0; background: $white; border: 1px solid $gray-200; border-radius: 1rem; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;
  &__value { font-family: $font-display; font-size: 1.75rem; font-weight: 700; color: $bakano-dark; }
  &__label { font-family: $font-sans; font-size: 0.85rem; color: $gray-600; }
  &__bar { height: 6px; background: $gray-200; border-radius: 999px; margin-top: 0.5rem; overflow: hidden; }
  &__fill { height: 100%; background: linear-gradient(90deg, $bakano-pink, $bakano-purple); border-radius: 999px; transition: width 0.6s cubic-bezier(0.2, 0.7, 0, 1); }
  &--active &__value { color: $bakano-green; }
  &--inactive &__value { color: $gray-600; }
  &--pending &__value { color: $alert-warning; }
  &--none &__value { color: $gray-500; }
}

.section { display: flex; flex-direction: column; gap: 1rem; }
.section__header { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; flex-wrap: wrap; row-gap: 0.25rem; }
.section__title { font-family: $font-display; font-size: 1.35rem; font-weight: 700; color: $bakano-dark; margin: 0; }
.section__link { font-family: $font-mono; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; color: $bakano-pink; &:hover { text-decoration: underline; } }

.course-grid { display: flex; flex-wrap: wrap; gap: 1rem; }

.course-card { flex: 1 1 calc(33.333% - 1rem); min-width: 280px; max-width: calc(33.333% - 1rem); background: $white; border: 1px solid $gray-200; border-radius: 1rem; overflow: hidden; transition: transform 0.25s ease, box-shadow 0.25s ease; text-decoration: none; color: inherit;
  &:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba($bakano-dark, 0.12); }
  &__thumb { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: linear-gradient(135deg, $bakano-dark 0%, $bakano-purple 100%);
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  &__placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: rgba(255,255,255,0.25); }
  &__category { position: absolute; top: 0.75rem; left: 0.75rem; background: $white; color: $bakano-dark; font-family: $font-mono; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.35rem 0.6rem; border-radius: 999px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  &__body { padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
  &__title { font-family: $font-display; font-size: 1.1rem; font-weight: 600; margin: 0; color: $bakano-dark; }
  &__subtitle { font-family: $font-sans; font-size: 0.85rem; color: $gray-600; margin: 0; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  &__progress { display: flex; align-items: center; gap: 0.6rem; margin-top: 0.25rem; }
  &__progress-bar { flex: 1 1 auto; height: 6px; background: $gray-200; border-radius: 999px; overflow: hidden; }
  &__progress-fill { height: 100%; background: linear-gradient(90deg, $bakano-pink, $bakano-purple); border-radius: 999px; }
  &__progress-value { font-family: $font-mono; font-size: 0.7rem; color: $bakano-pink; font-weight: 600; }
}

.achievements-row { display: flex; flex-wrap: wrap; gap: 1rem; }

.achievement-badge { flex: 1 1 calc(25% - 1rem); min-width: 150px; background: $white; border: 1px solid $gray-200; border-radius: 1rem; padding: 1.25rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.5rem;
  &__icon { width: 44px; height: 44px; border-radius: 50%; background: rgba($bakano-pink, 0.1); color: $bakano-pink; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
  &__title { font-family: $font-sans; font-size: 0.9rem; font-weight: 600; color: $bakano-dark; }
  &--locked { opacity: 0.5; .achievement-badge__icon { background: $gray-200; color: $gray-500; } }
}

@media (max-width: 1200px) { .stat-card { flex-basis: calc(50% - 1rem); } .course-card { flex-basis: calc(50% - 1rem); max-width: calc(50% - 1rem); } .achievement-badge { flex-basis: calc(50% - 1rem); } }
@media (max-width: 720px) { .stat-card { flex-basis: 100%; } .course-card { flex-basis: 100%; max-width: 100%; } .achievement-badge { flex-basis: calc(50% - 1rem); } }
</style>
