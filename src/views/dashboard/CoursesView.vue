<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()
</script>

<template>
  <div class="courses-view">
    <div class="course-grid">
      <RouterLink
        v-for="course in dashboardStore.courses"
        :key="course.id"
        :to="{ name: 'course-detail', params: { courseId: course.id } }"
        class="course-card"
      >
        <div class="course-card__thumb">
          <img :src="course.thumbnail" :alt="course.title" />
          <span class="course-card__category">{{ course.category }}</span>
          <span v-if="course.progress === 100" class="course-card__badge">Completado</span>
        </div>
        <div class="course-card__body">
          <h3 class="course-card__title">{{ course.title }}</h3>
          <p class="course-card__subtitle">{{ course.subtitle }}</p>
          <div class="course-card__meta">
            <span>{{ course.totalLessons }} clases</span>
            <span>{{ course.completedLessons }} completadas</span>
          </div>
          <div class="course-card__progress">
            <div class="course-card__progress-bar"><div class="course-card__progress-fill" :style="{ width: `${course.progress}%` }" /></div>
            <span class="course-card__progress-value">{{ course.progress }}%</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.courses-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.course-card {
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba($bakano-dark, 0.08);
  }

  &__thumb {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__category {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background: $light;
    color: $bakano-dark;
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
  }

  &__badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: $bakano-green;
    color: $bakano-dark;
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
  }

  &__body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.15rem;
    font-weight: 400;
    margin: 0;
    color: $bakano-dark;
  }

  &__subtitle {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $gray-500;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__meta {
    display: flex;
    gap: 1rem;
    font-family: $font-mono;
    font-size: 0.7rem;
    color: $gray-500;
  }

  &__progress {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.25rem;
  }

  &__progress-bar {
    flex: 1 1 auto;
    height: 6px;
    background: rgba($bakano-dark, 0.06);
    border-radius: 999px;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    background: $bakano-green;
    border-radius: 999px;
  }

  &__progress-value {
    font-family: $font-mono;
    font-size: 0.7rem;
    color: $gray-500;
  }
}

@media (max-width: 1200px) {
  .course-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 720px) {
  .course-grid { grid-template-columns: 1fr; }
}
</style>
