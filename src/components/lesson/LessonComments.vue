<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { commentService, type LessonComment } from '@/services/commentService'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import CommentComposer from './CommentComposer.vue'
import CommentItem from './CommentItem.vue'

const props = defineProps<{ lessonId: string }>()
const emit = defineEmits<{ count: [number] }>()

const userStore = useUserStore()
const isAdmin = computed(() => userStore.role === 'admin')

const comments = ref<LessonComment[]>([])
const total = ref(0)
const page = ref(1)
const totalPages = ref(1)
const loading = ref(true)
const loadingMore = ref(false)
const error = ref('')
const deleteTarget = ref<LessonComment | null>(null)
const deleting = ref(false)

function setTotal(value: number) {
  total.value = Math.max(0, value)
  emit('count', total.value)
}

async function load(reset = true) {
  if (reset) {
    loading.value = true
    page.value = 1
  } else {
    loadingMore.value = true
  }
  error.value = ''
  try {
    const result = await commentService.list(props.lessonId, page.value)
    comments.value = reset ? result.comments : [...comments.value, ...result.comments]
    totalPages.value = result.pagination.totalPages
    setTotal(result.total)
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudieron cargar los comentarios.'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

function loadMore() {
  page.value += 1
  load(false)
}

watch(() => props.lessonId, () => load(true), { immediate: true })

async function publish(body: string) {
  const created = await commentService.create(props.lessonId, body)
  comments.value = [created, ...comments.value]
  setTotal(total.value + 1)
}

async function reply(parentId: string, body: string) {
  const created = await commentService.create(props.lessonId, body, parentId)
  const parent = comments.value.find((comment) => comment.id === parentId)
  if (parent) parent.replies = [...(parent.replies ?? []), created]
  setTotal(total.value + 1)
}

async function edit(target: LessonComment, body: string) {
  const updated = await commentService.update(target.id, body)
  target.body = updated.body
  target.updatedAt = updated.updatedAt
  target.edited = true
}

async function confirmDelete() {
  const target = deleteTarget.value
  if (!target) return
  deleting.value = true
  try {
    await commentService.remove(target.id)
    if (target.parent) {
      const parent = comments.value.find((comment) => comment.id === target.parent)
      if (parent) parent.replies = parent.replies.filter((item) => item.id !== target.id)
      setTotal(total.value - 1)
    } else {
      comments.value = comments.value.filter((item) => item.id !== target.id)
      setTotal(total.value - 1 - (target.replies?.length ?? 0))
    }
    deleteTarget.value = null
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudo eliminar el comentario.'
    deleteTarget.value = null
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <section class="comments" aria-labelledby="comments-title">
    <h2 id="comments-title" class="comments__title">
      Comentarios <span class="comments__count">{{ total }}</span>
    </h2>

    <CommentComposer :submit="publish" />

    <div v-if="loading" class="comments__skeleton" aria-hidden="true">
      <div v-for="n in 3" :key="n" class="comments__skeleton-row">
        <span class="comments__skeleton-avatar" />
        <span class="comments__skeleton-lines"><span /><span /></span>
      </div>
    </div>

    <div v-else-if="error && !comments.length" class="comments__state" role="alert">
      <p>{{ error }}</p>
      <button type="button" class="comments__retry" @click="load(true)">Reintentar</button>
    </div>

    <div v-else-if="!comments.length" class="comments__state">
      <i class="fa-regular fa-comments" aria-hidden="true" />
      <p><strong>Nadie ha comentado esta clase todavía.</strong><br>Deja tu duda o lo que aplicarás en tu negocio: el equipo de Bakano lee cada comentario.</p>
    </div>

    <div v-else class="comments__list">
      <p v-if="error" class="comments__inline-error" role="alert">{{ error }}</p>
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :is-admin="isAdmin"
        :reply="reply"
        :edit="edit"
        :remove="(target) => (deleteTarget = target)"
      />
      <button v-if="page < totalPages" type="button" class="comments__more" :disabled="loadingMore" @click="loadMore">
        {{ loadingMore ? 'Cargando…' : 'Ver comentarios anteriores' }}
      </button>
    </div>

    <ConfirmModal
      :open="!!deleteTarget"
      title="Eliminar comentario"
      :message="deleteTarget?.replies?.length ? 'Se eliminará el comentario y sus respuestas. Esta acción no se puede deshacer.' : 'Se eliminará el comentario. Esta acción no se puede deshacer.'"
      action-label="Eliminar"
      danger
      :loading="deleting"
      @confirm="confirmDelete"
      @cancel="deleteTarget = null"
    />
  </section>
</template>

<style lang="scss" scoped>
.comments {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-family: $font-display;
    font-size: 1.15rem;
    font-weight: 700;
    color: $bakano-dark;
  }

  &__count {
    min-width: 1.6rem;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    background: $gray-100;
    font-family: $font-sans;
    font-size: 0.75rem;
    font-weight: 700;
    color: $gray-600;
    text-align: center;
  }

  &__list { display: flex; flex-direction: column; gap: 1.5rem; }

  &__state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 2rem 1rem;
    border: 1px dashed $gray-200;
    border-radius: 1rem;
    text-align: center;
    font-family: $font-sans;
    font-size: 0.9rem;
    line-height: 1.6;
    color: $gray-500;

    i { font-size: 1.75rem; color: rgba($bakano-pink, 0.6); }
    p { margin: 0; max-width: 38ch; }
    strong { color: $bakano-dark; }
  }

  &__retry,
  &__more {
    align-self: center;
    padding: 0.6rem 1.25rem;
    border: 1px solid $gray-200;
    border-radius: 999px;
    background: $white;
    font-family: $font-sans;
    font-size: 0.85rem;
    font-weight: 600;
    color: $bakano-dark;
    cursor: pointer;

    &:hover:not(:disabled) { border-color: $bakano-pink; color: $bakano-pink; }
    &:disabled { opacity: 0.6; cursor: progress; }
  }

  &__inline-error { margin: 0; font-family: $font-sans; font-size: 0.85rem; color: $alert-error; }

  &__skeleton { display: flex; flex-direction: column; gap: 1.25rem; }
  &__skeleton-row { display: flex; gap: 0.875rem; }
  &__skeleton-avatar { width: 2.5rem; height: 2.5rem; border-radius: 50%; background: $gray-100; flex-shrink: 0; }
  &__skeleton-lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.25rem;

    span { height: 0.7rem; border-radius: 999px; background: $gray-100; }
    span:first-child { width: 30%; }
    span:last-child { width: 80%; }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .comments__skeleton-avatar,
  .comments__skeleton-lines span { animation: pulse 1.4s ease-in-out infinite; }
}

@keyframes pulse {
  50% { opacity: 0.5; }
}
</style>
