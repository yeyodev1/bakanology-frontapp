<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { commentService, type AdminComment } from '@/services/commentService'
import { relativeTime, fullDate } from '@/utils/relativeTime'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'

type Filter = '' | 'published' | 'rejected'

const comments = ref<AdminComment[]>([])
const filter = ref<Filter>('')
const page = ref(1)
const totalPages = ref(1)
const loading = ref(true)
const error = ref('')
const busyId = ref('')
const deleteTarget = ref<AdminComment | null>(null)

const filters: Array<{ value: Filter; label: string }> = [
  { value: '', label: 'Todos' },
  { value: 'published', label: 'Visibles' },
  { value: 'rejected', label: 'Ocultos' },
]

async function load() {
  loading.value = true
  error.value = ''
  try {
    const result = await commentService.adminList(page.value, filter.value || undefined)
    comments.value = result.comments
    totalPages.value = result.pagination.totalPages || 1
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudieron cargar los comentarios.'
  } finally {
    loading.value = false
  }
}

function setFilter(value: Filter) {
  filter.value = value
  page.value = 1
  load()
}

function goTo(next: number) {
  page.value = next
  load()
}

async function toggleVisibility(comment: AdminComment) {
  busyId.value = comment._id
  const next = comment.status === 'rejected' ? 'published' : 'rejected'
  try {
    await commentService.adminSetStatus(comment._id, next)
    comment.status = next
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudo actualizar el comentario.'
  } finally {
    busyId.value = ''
  }
}

async function confirmDelete() {
  const target = deleteTarget.value
  if (!target) return
  busyId.value = target._id
  try {
    await commentService.adminRemove(target._id)
    comments.value = comments.value.filter((item) => item._id !== target._id)
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudo eliminar el comentario.'
  } finally {
    busyId.value = ''
    deleteTarget.value = null
  }
}

onMounted(load)
</script>

<template>
  <div class="admin-comments">
    <header class="admin-comments__header">
      <div>
        <h1>Comentarios</h1>
        <p>Lo que escriben los alumnos en las clases. Oculta lo que no deba verse o elimínalo.</p>
      </div>
      <div class="admin-comments__filters" role="group" aria-label="Filtrar comentarios">
        <button
          v-for="item in filters"
          :key="item.value"
          type="button"
          :aria-pressed="filter === item.value"
          @click="setFilter(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </header>

    <p v-if="error" class="admin-comments__error" role="alert">{{ error }}</p>

    <p v-if="loading" class="admin-comments__state">Cargando comentarios…</p>
    <p v-else-if="!comments.length" class="admin-comments__state">No hay comentarios con este filtro.</p>

    <ul v-else class="admin-comments__list">
      <li v-for="comment in comments" :key="comment._id" class="admin-comments__item" :class="{ 'admin-comments__item--hidden': comment.status === 'rejected' }">
        <UserAvatar :name="comment.user?.name" :last-name="comment.user?.lastName" :picture="comment.user?.profilePicture" size="md" />
        <div class="admin-comments__body">
          <div class="admin-comments__meta">
            <strong>{{ comment.user ? `${comment.user.name} ${comment.user.lastName}` : 'Usuario eliminado' }}</strong>
            <span v-if="comment.user?.role === 'admin'" class="admin-comments__badge">Equipo Bakano</span>
            <span v-if="comment.parent" class="admin-comments__tag">Respuesta</span>
            <span v-if="comment.status === 'rejected'" class="admin-comments__tag admin-comments__tag--hidden">Oculto</span>
            <time :datetime="comment.createdAt" :title="fullDate(comment.createdAt)">{{ relativeTime(comment.createdAt) }}</time>
          </div>
          <p class="admin-comments__text">{{ comment.body }}</p>
          <RouterLink
            v-if="comment.lesson?.course"
            class="admin-comments__where"
            :to="{ name: 'lesson', params: { courseId: comment.lesson.course._id, lessonId: comment.lesson._id } }"
          >
            {{ comment.lesson.course.title }} · {{ comment.lesson.title }}
          </RouterLink>
          <div class="admin-comments__actions">
            <button type="button" :disabled="busyId === comment._id" @click="toggleVisibility(comment)">
              {{ comment.status === 'rejected' ? 'Mostrar' : 'Ocultar' }}
            </button>
            <button type="button" class="admin-comments__danger" :disabled="busyId === comment._id" @click="deleteTarget = comment">
              Eliminar
            </button>
          </div>
        </div>
      </li>
    </ul>

    <nav v-if="totalPages > 1" class="admin-comments__pages" aria-label="Páginas">
      <button type="button" :disabled="page <= 1" @click="goTo(page - 1)">Anterior</button>
      <span>Página {{ page }} de {{ totalPages }}</span>
      <button type="button" :disabled="page >= totalPages" @click="goTo(page + 1)">Siguiente</button>
    </nav>

    <ConfirmModal
      :open="!!deleteTarget"
      title="Eliminar comentario"
      message="Se eliminará el comentario y sus respuestas. Esta acción no se puede deshacer."
      action-label="Eliminar"
      danger
      :loading="!!busyId"
      @confirm="confirmDelete"
      @cancel="deleteTarget = null"
    />
  </div>
</template>

<style lang="scss" scoped src="./_admin-comments.scss"></style>
