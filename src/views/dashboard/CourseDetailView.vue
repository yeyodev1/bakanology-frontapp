<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { academyService, type Course, type Lesson } from '@/services/academyService'
import { renderRichText } from '@/utils/richText'

const route = useRoute()
const router = useRouter()
const course = ref<Course | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    course.value = await academyService.getCourse(String(route.params.courseId))
  } catch (e) {
    error.value = 'No se pudo cargar el curso.'
  } finally {
    loading.value = false
  }
})

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function openLesson(lesson: Lesson) {
  router.push({ name: 'lesson', params: { courseId: course.value?._id, lessonId: lesson._id } })
}
</script>

<template>
  <div v-if="loading" class="loading">Cargando curso...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else-if="course" class="course-detail">
    <div class="course-header">
      <RouterLink to="/app/cursos" class="back-link">
        <i class="fa-solid fa-arrow-left"></i>
        <span>Volver a cursos</span>
      </RouterLink>
      
      <div class="course-info">
        <div class="course-badge">{{ course.lessons?.length || 0 }} clases</div>
        <h1>{{ course.title }}</h1>
        <p class="course-summary">{{ course.summary }}</p>
      </div>
      
      <div v-if="course.progress" class="course-progress">
        <div class="progress-header">
          <span>Tu progreso</span>
          <span class="progress-percent">{{ course.progress.percent }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${course.progress.percent}%` }"></div>
        </div>
        <span class="progress-text">{{ course.progress.completedLessons }} de {{ course.progress.totalLessons }} completadas</span>
      </div>
    </div>

    <div v-if="course.description" class="course-description">
      <h2><i class="fa-solid fa-book-open"></i> Descripción del curso</h2>
      <div class="course-description__body" v-html="renderRichText(course.description)"></div>
    </div>

    <div class="lessons-section">
      <h2><i class="fa-solid fa-list-ol"></i> Contenido del curso</h2>
      <div class="lessons-list">
        <div
          v-for="(lesson, index) in course.lessons"
          :key="lesson._id"
          class="lesson-item"
          :class="{ 'lesson-item--completed': lesson.progress?.completed }"
          @click="openLesson(lesson)"
        >
          <div class="lesson-number">
            <span v-if="lesson.progress?.completed"><i class="fa-solid fa-check"></i></span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="lesson-info">
            <h3>{{ lesson.title }}</h3>
            <p v-if="lesson.summary">{{ lesson.summary }}</p>
            <div class="lesson-meta">
              <span class="lesson-duration"><i class="fa-regular fa-clock"></i> {{ formatDuration(lesson.durationSeconds) }}</span>
              <span v-if="lesson.progress?.completed" class="lesson-status lesson-status--completed">
                <i class="fa-solid fa-circle-check"></i> Completada
              </span>
              <span v-else class="lesson-status lesson-status--pending">
                <i class="fa-regular fa-circle"></i> Pendiente
              </span>
            </div>
          </div>
          <div class="lesson-action">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course-detail { display: flex; flex-direction: column; gap: 2rem; }
.loading, .error { text-align: center; padding: 4rem 1rem; color: $gray-500; }
.error { color: $alert-error; }

.course-header {
  background: linear-gradient(135deg, $bakano-dark 0%, $bakano-purple 100%);
  border-radius: 1.25rem;
  padding: 2rem;
  color: $white;
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba($white, 0.8);
    text-decoration: none;
    font-family: $font-mono;
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
    transition: color 0.2s;
    
    &:hover { color: $white; }
  }
}

.course-info { margin-bottom: 1.5rem; }

.course-badge {
  display: inline-block;
  background: rgba($white, 0.15);
  backdrop-filter: blur(10px);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.course-header h1 {
  font-family: $font-display;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  line-height: 1.2;
}

.course-summary {
  font-family: $font-sans;
  font-size: 1rem;
  color: rgba($white, 0.8);
  margin: 0;
  line-height: 1.6;
  max-width: 600px;
}

.course-progress {
  background: rgba($white, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-family: $font-sans;
    font-size: 0.85rem;
    
    .progress-percent {
      font-family: $font-mono;
      font-weight: 700;
      font-size: 1rem;
      color: $bakano-green;
    }
  }
  
  .progress-bar {
    height: 8px;
    background: rgba($white, 0.2);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $bakano-green, #5dd8a1);
    border-radius: 999px;
    transition: width 0.6s ease;
  }
  
  .progress-text {
    font-family: $font-mono;
    font-size: 0.7rem;
    color: rgba($white, 0.6);
  }
}

.course-description {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 1rem;
  padding: 1.5rem;
  
  h2 {
    font-family: $font-display;
    font-size: 1.2rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0 0 1rem;
    
    i {
      color: $bakano-pink;
      margin-right: 0.5rem;
    }
  }
  
  &__body {
    max-width: 68ch;
    font-family: $font-sans;
    font-size: 0.95rem;
    line-height: 1.75;
    color: $gray-600;
  }

  :deep(p) {
    margin: 0 0 1rem;

    &:last-child { margin-bottom: 0; }
  }

  :deep(strong) {
    color: $bakano-dark;
    font-weight: 600;
  }

  :deep(ul),
  :deep(ol) {
    margin: 0 0 1rem;
    padding-left: 1.25rem;
  }

  :deep(li) {
    margin-bottom: 0.5rem;

    &::marker { color: $bakano-pink; }
  }
}

.lessons-section {
  h2 {
    font-family: $font-display;
    font-size: 1.35rem;
    font-weight: 700;
    color: $bakano-dark;
    margin: 0 0 1rem;
    
    i {
      color: $bakano-pink;
      margin-right: 0.5rem;
    }
  }
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: $bakano-pink;
    box-shadow: 0 4px 12px rgba($bakano-pink, 0.1);
    transform: translateX(4px);
  }
  
  &--completed {
    border-color: $bakano-green;
    background: rgba($bakano-green, 0.03);
    
    &:hover {
      border-color: $bakano-green;
      box-shadow: 0 4px 12px rgba($bakano-green, 0.1);
    }
  }
}

.lesson-number {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: linear-gradient(135deg, $bakano-dark, $bakano-purple);
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
  
  .lesson-item--completed & {
    background: linear-gradient(135deg, $bakano-green, #5dd8a1);
  }
}

.lesson-info {
  flex: 1;
  min-width: 0;
  
  h3 {
    font-family: $font-sans;
    font-size: 1rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0 0 0.25rem;
  }
  
  p {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $gray-500;
    margin: 0 0 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.lesson-duration {
  font-family: $font-mono;
  font-size: 0.7rem;
  color: $gray-500;
  
  i { margin-right: 0.25rem; }
}

.lesson-status {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  
  i { margin-right: 0.25rem; }
  
  &--completed {
    color: $bakano-green;
  }
  
  &--pending {
    color: $gray-400;
  }
}

.lesson-action {
  color: $bakano-pink;
  font-size: 1.25rem;
  transition: transform 0.2s;
  
  .lesson-item:hover & {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .course-header { padding: 1.5rem; }
  .course-header h1 { font-size: 1.35rem; }
  .lesson-item { padding: 1rem; }
  .lesson-number { width: 2.25rem; height: 2.25rem; font-size: 0.75rem; }
}
</style>
