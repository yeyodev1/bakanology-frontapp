<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'
import { useUserStore } from '@/stores/user'
import UserAvatar from '@/components/ui/UserAvatar.vue'

const route = useRoute()
const dashboardStore = useDashboardStore()
const userStore = useUserStore()

const course = computed(() => dashboardStore.courseById(route.params.courseId as string))
const lesson = computed(() =>
  dashboardStore.lessonById(route.params.courseId as string, route.params.lessonId as string),
)

const newComment = ref('')

const lessonIndex = computed(() => {
  if (!course.value || !lesson.value) return -1
  return course.value.lessons.findIndex((l) => l.id === lesson.value?.id)
})

const nextLesson = computed(() => {
  if (!course.value || lessonIndex.value === -1) return null
  return course.value.lessons[lessonIndex.value + 1] || null
})

const prevLesson = computed(() => {
  if (!course.value || lessonIndex.value === -1) return null
  return course.value.lessons[lessonIndex.value - 1] || null
})

function markCompleted() {
  if (course.value && lesson.value) {
    dashboardStore.completeLesson(course.value.id, lesson.value.id)
  }
}

function submitComment() {
  if (!newComment.value.trim()) return
  dashboardStore.addComment(
    newComment.value.trim(),
    userStore.fullName,
    userStore.profilePicture,
  )
  newComment.value = ''
}

function formatDate(iso: string) {
  const date = new Date(iso)
  return date.toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div v-if="course && lesson" class="lesson-view">
    <nav class="breadcrumbs">
      <RouterLink :to="{ name: 'courses' }" class="breadcrumbs__link">Cursos</RouterLink>
      <span class="breadcrumbs__sep">/</span>
      <RouterLink :to="{ name: 'course-detail', params: { courseId: course.id } }" class="breadcrumbs__link">{{ course.title }}</RouterLink>
      <span class="breadcrumbs__sep">/</span>
      <span class="breadcrumbs__current">{{ lesson.title }}</span>
    </nav>

    <div class="video-player">
      <div class="video-player__screen">
        <button class="video-player__play" type="button" aria-label="Reproducir clase">
          <i class="fa-solid fa-play" aria-hidden="true" />
        </button>
        <span class="video-player__duration">
          <i class="fa-regular fa-clock" aria-hidden="true" />
          {{ lesson.duration }}
        </span>
      </div>
      <div class="video-player__controls">
        <button class="video-player__control" type="button" aria-label="Reproducir">
          <i class="fa-solid fa-play" aria-hidden="true" />
        </button>
        <div class="video-player__track">
          <div class="video-player__progress" :style="{ width: lesson.isCompleted ? '100%' : '12%' }" />
        </div>
        <button class="video-player__control" type="button" aria-label="Pantalla completa">
          <i class="fa-solid fa-expand" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="lesson-meta">
      <div>
        <h1 class="lesson-meta__title">{{ lesson.title }}</h1>
        <p class="lesson-meta__description">{{ lesson.description }}</p>
      </div>
      <button
        v-if="!lesson.isCompleted"
        class="lesson-meta__complete"
        type="button"
        @click="markCompleted"
      >
        Marcar como completada
      </button>
      <span v-else class="lesson-meta__completed">✓ Clase completada</span>
    </div>

    <div class="lesson-nav">
      <RouterLink
        v-if="prevLesson"
        :to="{ name: 'lesson', params: { courseId: course.id, lessonId: prevLesson.id } }"
        class="lesson-nav__link lesson-nav__link--prev"
      >
        <span class="lesson-nav__label">Anterior</span>
        <span class="lesson-nav__title">{{ prevLesson.title }}</span>
      </RouterLink>
      <div v-else />
      <RouterLink
        v-if="nextLesson"
        :to="{ name: 'lesson', params: { courseId: course.id, lessonId: nextLesson.id } }"
        class="lesson-nav__link lesson-nav__link--next"
      >
        <span class="lesson-nav__label">Siguiente</span>
        <span class="lesson-nav__title">{{ nextLesson.title }}</span>
      </RouterLink>
    </div>

    <section class="comments">
      <h2 class="comments__title">Comentarios de la comunidad</h2>
      <div class="comments__list">
        <div v-for="comment in dashboardStore.comments" :key="comment.id" class="comment">
          <UserAvatar
            v-if="comment.authorPicture"
            :name="comment.author"
            :picture="comment.authorPicture"
            size="md"
          />
          <div v-else class="comment__avatar">{{ comment.avatar }}</div>
          <div class="comment__body">
            <div class="comment__header">
              <span class="comment__author">{{ comment.author }}</span>
              <span class="comment__date">{{ formatDate(comment.date) }}</span>
            </div>
            <p class="comment__content">{{ comment.content }}</p>
            <button class="comment__like" type="button">♡ {{ comment.likes }}</button>
          </div>
        </div>
      </div>
      <form class="comments__form" @submit.prevent="submitComment">
        <textarea
          v-model="newComment"
          class="comments__input"
          rows="3"
          placeholder="Escribe un comentario..."
        />
        <button class="comments__submit" type="submit">Comentar</button>
      </form>
    </section>
  </div>

  <div v-else class="empty-state">
    <h1 class="empty-state__title">Clase no encontrada</h1>
    <RouterLink :to="{ name: 'courses' }" class="empty-state__link">Volver a mis cursos</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.lesson-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $gray-500;

  a {
    color: $bakano-green;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__current {
    color: $bakano-dark;
  }
}

.video-player {
  background: $bakano-dark;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__screen {
    position: relative;
    aspect-ratio: 16 / 9;
    background: linear-gradient(135deg, lighten($bakano-dark, 5%) 0%, $bakano-dark 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__play {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: rgba($white, 0.95);
    color: $bakano-dark;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    padding-left: 0.25rem;
    cursor: pointer;
    transition: transform 0.25s ease, background 0.25s ease;
    box-shadow: 0 12px 40px rgba($bakano-dark, 0.35);

    &:hover {
      transform: scale(1.06);
      background: $bakano-green;
    }
  }

  &__duration {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba($bakano-dark, 0.65);
    color: $white;
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    backdrop-filter: blur(6px);
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba($white, 0.03);
    border-top: 1px solid rgba($white, 0.08);
  }

  &__control {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    background: rgba($white, 0.08);
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba($white, 0.18);
    }
  }

  &__track {
    flex: 1 1 auto;
    height: 5px;
    background: rgba($white, 0.18);
    border-radius: 999px;
    overflow: hidden;
    cursor: pointer;
  }

  &__progress {
    height: 100%;
    background: $bakano-green;
    border-radius: 999px;
    transition: width 0.3s ease;
  }
}

.lesson-meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  background: $light;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;

  &__title {
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0;
  }

  &__description {
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $gray-600;
    margin: 0.5rem 0 0;
    max-width: 720px;
    line-height: 1.6;
  }

  &__complete {
    flex-shrink: 0;
    background: $bakano-green;
    color: $white;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.85rem 1.25rem;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: darken(#3bb77e, 10%);
    }
  }

  &__completed {
    flex-shrink: 0;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $bakano-green;
    padding: 0.85rem 1.25rem;
    border-radius: 999px;
    background: rgba($bakano-green, 0.12);
  }
}

.lesson-nav {
  display: flex;
  gap: 1rem;

  > * {
    flex: 1;
  }

  &__link {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    background: $light;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
      background: var(--cream);
    }

    &--next {
      text-align: right;
      align-items: flex-end;
    }
  }

  &__label {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $gray-500;
  }

  &__title {
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 600;
    color: $bakano-dark;
  }
}

.comments {
  background: $light;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    font-family: $font-display;
    font-size: 1.25rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__input {
    width: 100%;
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $bakano-dark;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 0.85rem 1rem;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: $bakano-green;
      box-shadow: 0 0 0 3px rgba($bakano-green, 0.15);
    }
  }

  &__submit {
    align-self: flex-end;
    background: $bakano-dark;
    color: $white;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: $bakano-green;
    }
  }
}

.comment {
  display: flex;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  &__avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: $bakano-green;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  &__body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__author {
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 600;
    color: $bakano-dark;
  }

  &__date {
    font-family: $font-mono;
    font-size: 0.65rem;
    color: $gray-500;
  }

  &__content {
    font-family: $font-sans;
    font-size: 0.9rem;
    color: $gray-600;
    margin: 0;
    line-height: 1.5;
  }

  &__like {
    align-self: flex-start;
    font-family: $font-mono;
    font-size: 0.7rem;
    color: $gray-500;
    padding: 0.25rem 0;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      color: $bakano-green;
    }
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
    color: $white;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
    text-decoration: none;
  }
}
</style>
