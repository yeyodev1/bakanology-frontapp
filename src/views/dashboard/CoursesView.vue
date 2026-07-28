<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { academyService, type Course } from '@/services/academyService'

const courses = ref<Course[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    console.log('Fetching courses...')
    const result = await academyService.listCourses()
    console.log('Courses loaded:', result)
    courses.value = result
  } catch (e: unknown) {
    console.error('Error loading courses:', e)
    const err = e as { message?: string; status?: number }
    if (err.status === 401) {
      error.value = 'Debes iniciar sesión para ver los cursos.'
    } else {
      error.value = err.message || 'No se pudieron cargar los cursos.'
    }
  } finally {
    loading.value = false
    console.log('Loading state:', loading.value, 'Courses:', courses.value.length)
  }
  
  // Listen for progress updates
  window.addEventListener('progress-updated', async () => {
    try {
      courses.value = await academyService.listCourses()
    } catch (e) {
      // Silently fail
    }
  })
})

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}
</script>

<template>
  <div class="courses-view">
    <div v-if="loading" class="loading">
      <div class="loading-spinner" />
      <span>Cargando cursos...</span>
    </div>
    <div v-else-if="error" class="error">
      <i class="fa-solid fa-triangle-exclamation" />
      <p>{{ error }}</p>
    </div>
    <div v-else-if="!courses.length" class="empty">
      <div class="empty__icon"><i class="fa-solid fa-graduation-cap" /></div>
      <h3>No hay cursos disponibles aún</h3>
      <p>Próximamente añadiremos nuevo contenido.</p>
    </div>
    <div v-else class="course-list">
      <RouterLink
        v-for="course in courses"
        :key="course._id"
        :to="{ name: 'course-detail', params: { courseId: course._id } }"
        class="course-card"
      >
        <div class="course-card__thumb">
          <img v-if="course.cover" :src="course.cover.deliveryUrl || course.cover.publicId" :alt="course.title" />
          <div v-else class="course-card__placeholder"><i class="fa-solid fa-graduation-cap" /></div>
          <span class="course-card__category">{{ course.status === 'published' ? 'Disponible' : 'Próximamente' }}</span>
          <span v-if="course.progress && course.progress.percent === 100" class="course-card__badge">Completado</span>
        </div>
        <div class="course-card__body">
          <h3 class="course-card__title">{{ course.title }}</h3>
          <p class="course-card__subtitle">{{ course.summary }}</p>
          <div class="course-card__meta">
            <span><i class="fa-solid fa-play-circle" /> {{ course.progress?.totalLessons || 0 }} clases</span>
            <span v-if="course.lessons"><i class="fa-solid fa-clock" /> {{ formatDuration(course.lessons.reduce((acc, l) => acc + (l.durationSeconds || 0), 0)) }}</span>
          </div>
          <div v-if="course.progress" class="course-card__progress">
            <div class="course-card__progress-bar"><div class="course-card__progress-fill" :style="{ width: `${course.progress.percent}%` }" /></div>
            <span class="course-card__progress-value">{{ course.progress.percent }}%</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.courses-view { display: flex; flex-direction: column; gap: 1.5rem; }

.loading { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 4rem 1rem; color: $gray-500;
  &-spinner { width: 40px; height: 40px; border: 3px solid rgba($bakano-dark, 0.1); border-top-color: $bakano-pink; border-radius: 50%; animation: spin 0.8s linear infinite; }
}
@keyframes spin { to { transform: rotate(360deg); } }

.error { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; padding: 3rem 1rem; color: $alert-error;
  i { font-size: 2rem; }
}

.empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; padding: 4rem 1rem; text-align: center;
  &__icon { font-size: 4rem; color: rgba($bakano-dark, 0.15); margin-bottom: 0.5rem; }
  h3 { font-family: $font-display; font-size: 1.3rem; color: $bakano-dark; margin: 0 0 0.5rem; }
  p { margin: 0; color: $gray-600; }
}

.course-list { display: flex; flex-wrap: wrap; gap: 1.25rem; }

.course-card {
  flex: 1 1 calc(33.333% - 1.25rem);
  min-width: 280px;
  max-width: calc(33.333% - 1.25rem);
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba($bakano-dark, 0.12);
  }

  &__thumb {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: linear-gradient(135deg, $bakano-dark 0%, $bakano-purple 100%);

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  &__placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem; color: rgba(255,255,255,0.25);
  }

  &__category {
    position: absolute; top: 0.75rem; left: 0.75rem;
    background: $white; color: $bakano-dark;
    font-family: $font-mono; font-size: 0.65rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.35rem 0.6rem; border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  &__badge {
    position: absolute; top: 0.75rem; right: 0.75rem;
    background: $bakano-green; color: $white;
    font-family: $font-mono; font-size: 0.65rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.35rem 0.6rem; border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  &__body {
    padding: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem;
  }

  &__title {
    font-family: $font-display; font-size: 1.15rem; font-weight: 600; margin: 0; color: $bakano-dark;
  }

  &__subtitle {
    font-family: $font-sans; font-size: 0.85rem; color: $gray-600; margin: 0;
    line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }

  &__meta {
    display: flex; gap: 1rem; font-family: $font-mono; font-size: 0.7rem; color: $gray-500;
    i { margin-right: 0.3rem; color: $bakano-pink; }
  }

  &__progress {
    display: flex; align-items: center; gap: 0.6rem; margin-top: 0.25rem;
  }

  &__progress-bar {
    flex: 1 1 auto; height: 6px; background: $gray-200; border-radius: 999px; overflow: hidden;
  }

  &__progress-fill { height: 100%; background: linear-gradient(90deg, $bakano-pink, $bakano-purple); border-radius: 999px; transition: width 0.6s ease; }

  &__progress-value { font-family: $font-mono; font-size: 0.7rem; color: $bakano-pink; font-weight: 600; }
}

@media (max-width: 1200px) {
  .course-card { flex-basis: calc(50% - 1.25rem); max-width: calc(50% - 1.25rem); }
}

@media (max-width: 720px) {
  .course-card { flex-basis: 100%; max-width: 100%; }
}
</style>
