<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'

const route = useRoute()
const dashboardStore = useDashboardStore()

const course = computed(() => dashboardStore.courseById(route.params.courseId as string))

function lockIcon(isLocked: boolean) {
  return isLocked ? '🔒' : '▶'
}
</script>

<template>
  <div v-if="course" class="course-detail">
    <div class="course-hero">
      <img class="course-hero__image" :src="course.thumbnail" :alt="course.title" />
      <div class="course-hero__overlay">
        <span class="course-hero__category">{{ course.category }}</span>
        <h1 class="course-hero__title">{{ course.title }}</h1>
        <p class="course-hero__subtitle">{{ course.subtitle }}</p>
        <div class="course-hero__progress">
          <div class="course-hero__progress-bar"><div class="course-hero__progress-fill" :style="{ width: `${course.progress}%` }" /></div>
          <span>{{ course.completedLessons }} de {{ course.totalLessons }} clases · {{ course.progress }}%</span>
        </div>
      </div>
    </div>

    <section class="lessons">
      <h2 class="lessons__title">Contenido del curso</h2>
      <div class="lessons__list">
        <RouterLink
          v-for="(lesson, index) in course.lessons"
          :key="lesson.id"
          :to="lesson.isLocked ? '' : { name: 'lesson', params: { courseId: course.id, lessonId: lesson.id } }"
          class="lesson-item"
          :class="{ 'lesson-item--locked': lesson.isLocked, 'lesson-item--completed': lesson.isCompleted }"
          @click.prevent="lesson.isLocked ? undefined : undefined"
        >
          <span class="lesson-item__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="lesson-item__info">
            <h3 class="lesson-item__title">{{ lesson.title }}</h3>
            <p class="lesson-item__duration">{{ lesson.duration }}</p>
          </div>
          <span class="lesson-item__status">{{ lesson.isCompleted ? '✓' : lockIcon(lesson.isLocked) }}</span>
        </RouterLink>
      </div>
    </section>
  </div>

  <div v-else class="empty-state">
    <h1 class="empty-state__title">Curso no encontrado</h1>
    <RouterLink :to="{ name: 'courses' }" class="empty-state__link">Volver a mis cursos</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.course-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.course-hero {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  min-height: 320px;
  display: flex;
  align-items: flex-end;

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: relative;
    width: 100%;
    padding: 2rem;
    background: linear-gradient(to top, rgba($bakano-dark, 0.9) 0%, rgba($bakano-dark, 0.4) 60%, transparent 100%);
    color: $white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__category {
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $bakano-green;
  }

  &__title {
    font-family: $font-display;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 400;
    margin: 0;
  }

  &__subtitle {
    font-family: $font-sans;
    font-size: 1rem;
    opacity: 0.85;
    margin: 0;
    max-width: 640px;
  }

  &__progress {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.75rem;
    font-family: $font-mono;
    font-size: 0.75rem;
  }

  &__progress-bar {
    width: 160px;
    height: 6px;
    background: rgba($white, 0.2);
    border-radius: 999px;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    background: $bakano-green;
    border-radius: 999px;
  }
}

.lessons {
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;

  &__title {
    font-family: $font-display;
    font-size: 1.35rem;
    font-weight: 400;
    color: $bakano-dark;
    margin: 0 0 1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: var(--cream);
  border: 1px solid transparent;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover:not(&--locked) {
    background: rgba($bakano-green, 0.08);
    border-color: rgba($bakano-green, 0.2);
  }

  &--locked {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &--completed &__status {
    color: $bakano-green;
  }

  &__number {
    font-family: $font-mono;
    font-size: 0.8rem;
    font-weight: 700;
    color: $gray-500;
    width: 28px;
    text-align: center;
  }

  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  &__title {
    font-family: $font-sans;
    font-size: 0.95rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0;
  }

  &__duration {
    font-family: $font-mono;
    font-size: 0.7rem;
    color: $gray-500;
    margin: 0;
  }

  &__status {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: $white;
    color: $bakano-dark;
    font-size: 0.85rem;
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;

  &__title {
    font-family: $font-display;
    font-size: 1.5rem;
    color: $bakano-dark;
  }

  &__link {
    display: inline-block;
    margin-top: 1rem;
    background: $bakano-green;
    color: $bakano-dark;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
  }
}
</style>
