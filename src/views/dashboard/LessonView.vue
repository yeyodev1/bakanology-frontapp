<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { academyService, type Course, type Lesson, type MediaAsset } from '@/services/academyService'
import { renderRichText } from '@/utils/richText'
import LessonPlaylist from '@/components/lesson/LessonPlaylist.vue'
import LessonComments from '@/components/lesson/LessonComments.vue'

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
const activeTab = ref<'about' | 'comments'>('comments')
const commentCount = ref<number | null>(null)

const lessons = computed(() => course.value?.lessons ?? [])
const lessonIndex = computed(() => lessons.value.findIndex((l) => l._id === lesson.value?._id))
const prevLesson = computed(() => (lessonIndex.value > 0 ? lessons.value[lessonIndex.value - 1] : null))
const nextLesson = computed(() => (lessonIndex.value >= 0 ? lessons.value[lessonIndex.value + 1] ?? null : null))
const hasAbout = computed(() => !!(lesson.value?.summary || lesson.value?.content))

const storageKey = computed(() => (lesson.value ? `lesson-progress-${lesson.value._id}` : null))

function loadSavedProgress() {
  if (!storageKey.value) return 0
  try {
    const saved = localStorage.getItem(storageKey.value)
    if (localStorage.getItem(`${storageKey.value}-completed`) === 'true') isCompleted.value = true
    return saved ? parseInt(saved, 10) : 0
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

function stopTracking() {
  if (saveInterval.value) {
    clearInterval(saveInterval.value)
    saveInterval.value = null
    saveProgress()
  }
}

async function loadLesson() {
  stopTracking()
  loading.value = !course.value
  error.value = ''
  isCompleted.value = false
  videoUrl.value = ''
  commentCount.value = null
  try {
    const courseId = String(route.params.courseId)
    if (!course.value || course.value._id !== courseId) {
      course.value = await academyService.getCourse(courseId)
    }
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
    } else if (lesson.value?.progress?.completed) {
      isCompleted.value = true
    }
  } catch {
    error.value = 'No se pudo cargar la clase. Revisa tu conexión y recarga la página.'
  } finally {
    loading.value = false
  }
}

watch(() => [route.params.courseId, route.params.lessonId], loadLesson, { immediate: true })
onBeforeUnmount(stopTracking)

function getVideoDeliveryUrl(video: MediaAsset, startTime = 0) {
  if (video.provider === 'bunny' && video.publicId) {
    const libraryId = '714808'
    const startTimeParam = startTime > 0 ? `&start_time=${startTime}` : ''
    return `https://iframe.mediadelivery.net/embed/${libraryId}/${video.publicId}?preload=true&responsive=true&autoplay=false${startTimeParam}`
  }
  return video.deliveryUrl || ''
}

function openLesson(target: Lesson) {
  if (!course.value) return
  router.push({ name: 'lesson', params: { courseId: course.value._id, lessonId: target._id } })
}

function markCompleted() {
  if (!lesson.value) return
  isCompleted.value = true
  const current = course.value?.lessons?.find((l) => l._id === lesson.value?._id)
  if (current) current.progress = { ...(current.progress ?? { watchedSeconds: 0, percent: 0 }), completed: true, percent: 100 }
  academyService.updateProgress(lesson.value._id, lesson.value.durationSeconds, true).catch(() => {})
  if (storageKey.value) {
    localStorage.setItem(storageKey.value, String(lesson.value.durationSeconds))
    localStorage.setItem(`${storageKey.value}-completed`, 'true')
  }
  window.dispatchEvent(new CustomEvent('progress-updated'))
}
</script>

<template>
  <div v-if="loading" class="lesson-state">Cargando clase…</div>
  <div v-else-if="error" class="lesson-state lesson-state--error" role="alert">{{ error }}</div>
  <div v-else-if="course && lesson" class="lesson">
    <nav class="lesson__crumbs" aria-label="Ruta">
      <RouterLink :to="{ name: 'courses' }">Cursos</RouterLink>
      <span aria-hidden="true">/</span>
      <RouterLink :to="{ name: 'course-detail', params: { courseId: course._id } }">{{ course.title }}</RouterLink>
    </nav>

    <div class="lesson__layout">
      <div class="lesson__main">
        <div class="lesson__player">
          <iframe
            v-if="videoUrl"
            :key="videoUrl"
            :src="videoUrl"
            :title="lesson.title"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowfullscreen
            sandbox="allow-same-origin allow-scripts allow-popups"
          />
          <div v-else class="lesson__no-video">
            <i class="fa-solid fa-video-slash" aria-hidden="true" />
            <p>Esta clase no tiene video.</p>
          </div>
        </div>

        <header class="lesson__head">
          <div class="lesson__heading">
            <p class="lesson__eyebrow">Clase {{ lessonIndex + 1 }} de {{ lessons.length }}</p>
            <h1 class="lesson__title">{{ lesson.title }}</h1>
          </div>
          <button
            type="button"
            class="lesson__complete"
            :class="{ 'lesson__complete--done': isCompleted }"
            :disabled="isCompleted"
            @click="markCompleted"
          >
            <i :class="isCompleted ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle-check'" aria-hidden="true" />
            {{ isCompleted ? 'Clase completada' : 'Marcar como completada' }}
          </button>
        </header>

        <div class="lesson__nav">
          <button v-if="prevLesson" type="button" class="lesson__step" @click="openLesson(prevLesson)">
            <small><i class="fa-solid fa-arrow-left" aria-hidden="true" /> Anterior</small>
            <span>{{ prevLesson.title }}</span>
          </button>
          <button v-if="nextLesson" type="button" class="lesson__step lesson__step--next" @click="openLesson(nextLesson)">
            <small>Siguiente <i class="fa-solid fa-arrow-right" aria-hidden="true" /></small>
            <span>{{ nextLesson.title }}</span>
          </button>
        </div>

        <div class="lesson__playlist-mobile">
          <LessonPlaylist :lessons="lessons" :current-id="lesson._id" :current-completed="isCompleted" @open="openLesson" />
        </div>

        <div class="lesson__panel">
          <div class="lesson__tabs" role="tablist" aria-label="Contenido de la clase">
            <button
              id="tab-comments"
              type="button"
              role="tab"
              :aria-selected="activeTab === 'comments'"
              aria-controls="panel-comments"
              @click="activeTab = 'comments'"
            >
              Comentarios<template v-if="commentCount !== null"> ({{ commentCount }})</template>
            </button>
            <button
              v-if="hasAbout"
              id="tab-about"
              type="button"
              role="tab"
              :aria-selected="activeTab === 'about'"
              aria-controls="panel-about"
              @click="activeTab = 'about'"
            >
              Descripción
            </button>
          </div>

          <div v-show="activeTab === 'comments'" id="panel-comments" role="tabpanel" aria-labelledby="tab-comments">
            <LessonComments :lesson-id="lesson._id" @count="commentCount = $event" />
          </div>
          <div v-if="hasAbout" v-show="activeTab === 'about'" id="panel-about" role="tabpanel" aria-labelledby="tab-about" class="lesson__about">
            <p v-if="lesson.summary && lesson.summary !== lesson.title" class="lesson__summary">{{ lesson.summary }}</p>
            <div v-if="lesson.content" class="lesson__content" v-html="renderRichText(lesson.content)" />
            <p v-if="!lesson.content && lesson.summary === lesson.title" class="lesson__summary">{{ course.summary }}</p>
          </div>
        </div>
      </div>

      <div class="lesson__playlist-desktop">
        <LessonPlaylist :lessons="lessons" :current-id="lesson._id" :current-completed="isCompleted" @open="openLesson" />
      </div>
    </div>
  </div>

  <div v-else class="lesson-state">
    <p>No encontramos esta clase.</p>
    <RouterLink :to="{ name: 'courses' }" class="lesson-state__link">Volver a mis cursos</RouterLink>
  </div>
</template>

<style lang="scss" scoped src="./_lesson-view.scss"></style>
