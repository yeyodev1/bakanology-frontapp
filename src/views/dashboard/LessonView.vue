<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { academyService, type Course, type Lesson, type MediaAsset } from '@/services/academyService'
import { renderRichText } from '@/utils/richText'

const route = useRoute()
const router = useRouter()

const course = ref<Course | null>(null)
const lesson = ref<Lesson | null>(null)
const videoUrl = ref('')
const loading = ref(true)
const error = ref('')
const watchedSeconds = ref(0)
const saveInterval = ref<number | null>(null)
const isCompleted = ref(false)

const lessonIndex = computed(() => {
  if (!course.value || !lesson.value) return -1
  return course.value.lessons?.findIndex((l) => l._id === lesson.value?._id) ?? -1
})

const nextLesson = computed(() => {
  if (!course.value || lessonIndex.value === -1 || !course.value.lessons) return null
  return course.value.lessons[lessonIndex.value + 1] || null
})

const prevLesson = computed(() => {
  if (!course.value || lessonIndex.value === -1 || !course.value.lessons) return null
  return course.value.lessons[lessonIndex.value - 1] || null
})

const storageKey = computed(() => lesson.value ? `lesson-progress-${lesson.value._id}` : null)

function loadSavedProgress() {
  if (!storageKey.value) return 0
  try {
    const saved = localStorage.getItem(storageKey.value)
    const seconds = saved ? parseInt(saved, 10) : 0
    const completedKey = `${storageKey.value}-completed`
    if (localStorage.getItem(completedKey) === 'true') {
      isCompleted.value = true
    }
    return seconds
  } catch {
    return 0
  }
}

function saveProgress() {
  if (!storageKey.value || !lesson.value) return
  try {
    localStorage.setItem(storageKey.value, String(watchedSeconds.value))
    academyService.updateProgress(lesson.value._id, watchedSeconds.value, false).catch(() => {})
  } catch {}
}

onMounted(async () => {
  try {
    const courseId = String(route.params.courseId)
    course.value = await academyService.getCourse(courseId)
    lesson.value = course.value.lessons?.find((l) => l._id === route.params.lessonId) ?? null

    if (lesson.value?.video) {
      const savedSeconds = loadSavedProgress()
      videoUrl.value = getVideoDeliveryUrl(lesson.value.video, savedSeconds)
      
      if (lesson.value.progress?.completed) {
        isCompleted.value = true
        watchedSeconds.value = lesson.value.durationSeconds || 0
      } else if (lesson.value.progress?.watchedSeconds) {
        watchedSeconds.value = lesson.value.progress.watchedSeconds
      } else {
        watchedSeconds.value = savedSeconds
      }
      
      saveInterval.value = window.setInterval(saveProgress, 15000)
    } else if (lesson.value) {
      if (lesson.value.progress?.completed) {
        isCompleted.value = true
      }
    }
  } catch (e) {
    error.value = 'No se pudo cargar la clase.'
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  if (saveInterval.value) {
    clearInterval(saveInterval.value)
    saveProgress()
  }
})

function getVideoDeliveryUrl(video: MediaAsset, startTime = 0) {
  if (video.provider === 'bunny' && video.publicId) {
    const libraryId = '714808'
    const startTimeParam = startTime > 0 ? `&start_time=${startTime}` : ''
    return `https://iframe.mediadelivery.net/embed/${libraryId}/${video.publicId}?preload=true&responsive=true&autoplay=false${startTimeParam}`
  }
  return video.deliveryUrl || ''
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function openLesson(lessonItem: Lesson) {
  if (course.value) {
    saveProgress()
    router.push({ name: 'lesson', params: { courseId: course.value._id, lessonId: lessonItem._id } })
  }
}

function getCourseLessons() {
  return course.value?.lessons || []
}

function markCompleted() {
  if (lesson.value) {
    isCompleted.value = true
    academyService.updateProgress(lesson.value._id, lesson.value.durationSeconds, true).catch(() => {})
    if (storageKey.value) {
      localStorage.setItem(storageKey.value, String(lesson.value.durationSeconds))
      localStorage.setItem(`${storageKey.value}-completed`, 'true')
    }
    window.dispatchEvent(new CustomEvent('progress-updated'))
  }
}
</script>

<template>
  <div v-if="loading" class="loading">Cargando clase...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else-if="course && lesson" class="lesson-view">
    <div class="lesson-header">
      <nav class="breadcrumbs">
        <RouterLink :to="{ name: 'courses' }" class="breadcrumbs__link">Cursos</RouterLink>
        <span class="breadcrumbs__sep">/</span>
        <RouterLink :to="{ name: 'course-detail', params: { courseId: course._id } }" class="breadcrumbs__link">{{ course.title }}</RouterLink>
        <span class="breadcrumbs__sep">/</span>
        <span class="breadcrumbs__current">{{ lesson.title }}</span>
      </nav>
      <button class="complete-btn" :class="{ 'complete-btn--completed': isCompleted }" type="button" @click="markCompleted">
        <i :class="isCompleted ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle-check'" />
        <span>{{ isCompleted ? 'Completada' : 'Marcar como completada' }}</span>
      </button>
    </div>

    <div class="video-player">
      <div v-if="videoUrl" class="video-player__container">
        <iframe
          :src="videoUrl"
          :title="lesson.title"
          class="video-player__iframe"
          allow="autoplay; fullscreen; encrypted-media"
          allowfullscreen
          sandbox="allow-same-origin allow-scripts allow-popups"
        />
      </div>
      <div v-else class="video-player__placeholder">
        <i class="fa-solid fa-video-slash" />
        <p>Video no disponible</p>
      </div>
      <div class="video-player__duration">
        <i class="fa-regular fa-clock" />
        {{ formatDuration(lesson.durationSeconds) }}
      </div>
    </div>

    <div class="lesson-meta">
      <h1 class="lesson-meta__title">{{ lesson.title }}</h1>
      <p v-if="lesson.summary" class="lesson-meta__description">{{ lesson.summary }}</p>
      <div v-if="lesson.content" class="lesson-content" v-html="renderRichText(lesson.content)" />
    </div>

    <div class="lesson-nav">
      <div v-if="prevLesson" class="lesson-nav__link" @click="openLesson(prevLesson)">
        <span class="lesson-nav__label"><i class="fa-solid fa-arrow-left" /> Anterior</span>
        <span class="lesson-nav__title">{{ prevLesson.title }}</span>
      </div>
      <div v-else />
      <div v-if="nextLesson" class="lesson-nav__link lesson-nav__link--next" @click="openLesson(nextLesson)">
        <span class="lesson-nav__label">Siguiente <i class="fa-solid fa-arrow-right" /></span>
        <span class="lesson-nav__title">{{ nextLesson.title }}</span>
      </div>
    </div>

    <div v-if="getCourseLessons().length" class="lesson-sidebar">
      <h2><i class="fa-solid fa-list-ol" /> Contenido del curso</h2>
      <div
        v-for="(l, index) in getCourseLessons()"
        :key="l._id"
        class="lesson-sidebar__item"
        :class="{ 'lesson-sidebar__item--active': l._id === lesson?._id, 'lesson-sidebar__item--completed': l.progress?.completed }"
        @click="openLesson(l)"
      >
        <span class="lesson-sidebar__number">
          <i v-if="l.progress?.completed" class="fa-solid fa-check"></i>
          <span v-else>{{ index + 1 }}</span>
        </span>
        <div class="lesson-sidebar__info">
          <span class="lesson-sidebar__title">{{ l.title }}</span>
          <span class="lesson-sidebar__duration">{{ formatDuration(l.durationSeconds) }}</span>
        </div>
        <i v-if="l._id === lesson?._id" class="fa-solid fa-play-circle lesson-sidebar__playing" />
      </div>
    </div>
  </div>

  <div v-else class="empty-state">
    <h1 class="empty-state__title">Clase no encontrada</h1>
    <RouterLink :to="{ name: 'courses' }" class="empty-state__link">Volver a mis cursos</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.lesson-view { display: flex; flex-direction: column; gap: 1.5rem; }
.loading, .error { text-align: center; padding: 4rem 1rem; color: $gray-500; }
.error { color: $alert-error; }

.lesson-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }

.breadcrumbs { display: flex; align-items: center; gap: 0.5rem; font-family: $font-sans; font-size: 0.85rem; color: $gray-500; flex: 1;
  a { color: $bakano-pink; text-decoration: none; &:hover { text-decoration: underline; } }
  &__current { color: $bakano-dark; font-weight: 600; }
}

.complete-btn {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.85rem 1.5rem;
  background: $white;
  border: 2px solid $bakano-pink;
  border-radius: 999px;
  color: $bakano-dark;
  font-family: $font-sans;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  white-space: nowrap;

  i { color: $bakano-pink; font-size: 1.2rem; transition: transform 0.2s ease; }

  &:hover {
    background: $bakano-pink;
    color: $white;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba($bakano-pink, 0.25);
    i { color: $white; transform: scale(1.1); }
  }

  &:active { transform: translateY(0); }

  &--completed {
    background: $bakano-green;
    border-color: $bakano-green;
    color: $white;
    pointer-events: none;
    i { color: $white; }
  }
}

.video-player { background: $bakano-dark; border-radius: 1rem; overflow: hidden; position: relative;
  &__container { position: relative; aspect-ratio: 16 / 9; }
  &__iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
  &__placeholder { aspect-ratio: 16 / 9; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: rgba(255,255,255,0.3); font-size: 3rem;
    p { font-size: 1rem; font-family: $font-sans; }
  }
  &__duration { position: absolute; bottom: 1rem; right: 1rem; display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(0,0,0,0.65); color: $white; font-family: $font-mono; font-size: 0.7rem; font-weight: 600; padding: 0.4rem 0.75rem; border-radius: 999px; backdrop-filter: blur(6px); }
}

.lesson-meta { background: $white; border: 1px solid $gray-200; border-radius: 1rem; padding: 1.5rem;
  &__title { font-family: $font-display; font-size: 1.5rem; font-weight: 700; margin: 0 0 0.75rem; color: $bakano-dark; }
  &__description { font-family: $font-sans; font-size: 0.95rem; color: $gray-600; margin: 0 0 1rem; line-height: 1.6; }
}

.lesson-content { font-family: $font-sans; font-size: 0.95rem; line-height: 1.7; color: $gray-700;
  :deep(h2), :deep(h3) { font-family: $font-display; margin: 1.5rem 0 0.75rem; }
  :deep(strong) { color: $bakano-dark; }
}

.lesson-nav { display: flex; gap: 1rem;
  > * { flex: 1; }
  &__link { display: flex; flex-direction: column; gap: 0.25rem; padding: 1rem; background: $white; border: 1px solid $gray-200; border-radius: 0.75rem; cursor: pointer; transition: all 0.2s;
    &:hover { border-color: $bakano-pink; background: rgba($bakano-pink, 0.03); }
    &--next { text-align: right; align-items: flex-end; }
  }
  &__label { font-family: $font-mono; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: $gray-500;
    i { margin: 0 0.3rem; }
  }
  &__title { font-family: $font-sans; font-size: 0.9rem; font-weight: 600; color: $bakano-dark; }
}

.lesson-sidebar { background: $white; border: 1px solid $gray-200; border-radius: 1rem; padding: 1.5rem;
  h2 { font-family: $font-display; font-size: 1.2rem; font-weight: 700; margin: 0 0 1rem; color: $bakano-dark; i { margin-right: 0.5rem; color: $bakano-pink; } }
  &__item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s;
    &:hover { background: rgba($bakano-pink, 0.05); }
    &--active { background: rgba($bakano-pink, 0.08); border: 1px solid rgba($bakano-pink, 0.2); }
    &--completed { opacity: 0.7; }
  }
  &__number { width: 2rem; height: 2rem; border-radius: 50%; background: linear-gradient(135deg, $bakano-dark, $bakano-purple); color: $white; display: flex; align-items: center; justify-content: center; font-family: $font-mono; font-size: 0.7rem; font-weight: 600; flex-shrink: 0;
    .lesson-sidebar__item--completed & { background: $bakano-green; }
  }
  &__info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  &__title { font-family: $font-sans; font-size: 0.85rem; font-weight: 600; color: $bakano-dark; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  &__duration { font-family: $font-mono; font-size: 0.7rem; color: $gray-500; }
  &__playing { color: $bakano-pink; font-size: 1.2rem; }
}

.empty-state { text-align: center; padding: 4rem 1rem;
  &__title { font-family: $font-display; font-size: 1.5rem; color: $bakano-dark; }
  &__link { display: inline-block; margin-top: 1rem; background: $bakano-pink; color: $white; font-family: $font-mono; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.75rem 1.25rem; border-radius: 999px; text-decoration: none; }
}

@media (max-width: 768px) {
  .lesson-header { flex-direction: column; align-items: flex-start; }
  .complete-btn { width: 100%; justify-content: center; }
}
</style>
