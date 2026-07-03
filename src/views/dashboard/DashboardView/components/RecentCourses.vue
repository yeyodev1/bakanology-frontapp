<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Course {
  id: string
  thumbnail: string
  title: string
  subtitle: string
  category: string
  progress: number
}

defineProps<{
  courses: Course[]
}>()
</script>

<template>
  <section class="section">
    <div class="section__header">
      <h2 class="section__title">Continúa aprendiendo</h2>
      <RouterLink :to="{ name: 'courses' }" class="section__link">Ver todos los cursos</RouterLink>
    </div>
    <div class="grid">
      <RouterLink
        v-for="course in courses"
        :key="course.id"
        :to="{ name: 'course-detail', params: { courseId: course.id } }"
        class="card"
      >
        <div class="card__thumb">
          <img :src="course.thumbnail" :alt="course.title" />
          <span class="card__category">{{ course.category }}</span>
        </div>
        <div class="card__body">
          <h3 class="card__title">{{ course.title }}</h3>
          <p class="card__subtitle">{{ course.subtitle }}</p>
          <div class="card__progress">
            <div class="card__progress-bar"><div class="card__progress-fill" :style="{ width: `${course.progress}%` }" /></div>
            <span class="card__progress-value">{{ course.progress }}%</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.section__title {
  font-family: $font-display;
  font-size: 1.35rem;
  font-weight: 400;
  color: $bakano-dark;
  margin: 0;
}

.section__link {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $bakano-green;

  &:hover { text-decoration: underline; }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
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

    img { width: 100%; height: 100%; object-fit: cover; }
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

  &__body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.1rem;
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
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 720px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
