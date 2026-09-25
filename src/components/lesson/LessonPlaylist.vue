<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Lesson } from '@/services/academyService'

const props = defineProps<{
  lessons: Lesson[]
  currentId: string
  currentCompleted: boolean
}>()

const emit = defineEmits<{ open: [Lesson] }>()

const expanded = ref(false)

function isDone(lesson: Lesson) {
  return lesson._id === props.currentId ? props.currentCompleted : !!lesson.progress?.completed
}

const completedCount = computed(() => props.lessons.filter(isDone).length)
const currentPosition = computed(() => props.lessons.findIndex((lesson) => lesson._id === props.currentId) + 1)

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(Math.round(seconds % 60)).padStart(2, '0')}`
}
</script>

<template>
  <aside class="playlist" aria-label="Clases del curso">
    <button
      type="button"
      class="playlist__toggle"
      :aria-expanded="expanded"
      aria-controls="playlist-items"
      @click="expanded = !expanded"
    >
      <span>
        <strong>Clase {{ currentPosition }} de {{ lessons.length }}</strong>
        <small>{{ completedCount }} completadas</small>
      </span>
      <i class="fa-solid fa-chevron-down" :class="{ 'playlist__chevron--open': expanded }" aria-hidden="true" />
    </button>

    <header class="playlist__head">
      <h2>Clases del curso</h2>
      <span>{{ completedCount }}/{{ lessons.length }}</span>
    </header>

    <ol id="playlist-items" class="playlist__items" :class="{ 'playlist__items--open': expanded }">
      <li v-for="(item, index) in lessons" :key="item._id">
        <button
          type="button"
          class="playlist__item"
          :class="{ 'playlist__item--current': item._id === currentId, 'playlist__item--done': isDone(item) }"
          :aria-current="item._id === currentId ? 'true' : undefined"
          @click="emit('open', item)"
        >
          <span class="playlist__marker" aria-hidden="true">
            <i v-if="item._id === currentId" class="fa-solid fa-play" />
            <i v-else-if="isDone(item)" class="fa-solid fa-check" />
            <template v-else>{{ index + 1 }}</template>
          </span>
          <span class="playlist__text">
            <span class="playlist__title">{{ item.title }}</span>
            <span class="playlist__meta">
              {{ formatDuration(item.durationSeconds) }}<template v-if="isDone(item)"> · Completada</template>
            </span>
          </span>
        </button>
      </li>
    </ol>
  </aside>
</template>

<style lang="scss" scoped>
.playlist {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 1rem;
  overflow: hidden;

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 1.25rem;
    background: none;
    border: 0;
    cursor: pointer;
    text-align: left;

    span { display: flex; flex-direction: column; gap: 0.15rem; }
    strong { font-family: $font-sans; font-size: 0.95rem; color: $bakano-dark; }
    small { font-family: $font-sans; font-size: 0.78rem; color: $gray-500; }
    i { color: $gray-500; transition: transform 0.2s ease; }
  }

  &__chevron--open { transform: rotate(180deg); }

  &__head {
    display: none;
    align-items: baseline;
    justify-content: space-between;
    padding: 1.25rem 1.25rem 0.75rem;

    h2 { margin: 0; font-family: $font-display; font-size: 1rem; font-weight: 700; color: $bakano-dark; }
    span { font-family: $font-mono; font-size: 0.75rem; color: $gray-500; }
  }

  &__items {
    display: none;
    flex-direction: column;
    margin: 0;
    padding: 0 0.5rem 0.75rem;
    list-style: none;

    &--open { display: flex; }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.7rem 0.75rem;
    background: none;
    border: 0;
    border-radius: 0.625rem;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover { background: $gray-100; }

    &--current {
      background: rgba($bakano-pink, 0.08);

      &:hover { background: rgba($bakano-pink, 0.12); }
    }
  }

  &__marker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1.5px solid $gray-300;
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    color: $gray-500;

    .playlist__item--done & { background: $bakano-green; border-color: $bakano-green; color: $white; }
    .playlist__item--current & { background: $bakano-pink; border-color: $bakano-pink; color: $white; font-size: 0.6rem; }
  }

  &__text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.1rem; }

  &__title {
    font-family: $font-sans;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.35;
    color: $bakano-dark;

    .playlist__item--current & { color: $bakano-pink-dark; }
  }

  &__meta { font-family: $font-sans; font-size: 0.72rem; color: $gray-500; }
}

@media (min-width: 1024px) {
  .playlist {
    position: sticky;
    top: 6.5rem;
    max-height: calc(100vh - 8rem);
    display: flex;
    flex-direction: column;

    &__toggle { display: none; }
    &__head { display: flex; }
    &__items { display: flex; overflow-y: auto; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .playlist__toggle i, .playlist__item { transition: none; }
}
</style>
