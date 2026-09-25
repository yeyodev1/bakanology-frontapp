<script setup lang="ts">
import { ref, computed } from 'vue'
import type { LessonComment } from '@/services/commentService'
import { relativeTime, fullDate } from '@/utils/relativeTime'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import CommentComposer from './CommentComposer.vue'

defineOptions({ name: 'CommentItem' })

const props = defineProps<{
  comment: LessonComment
  isAdmin: boolean
  isReply?: boolean
  reply: (parentId: string, body: string) => Promise<void>
  edit: (comment: LessonComment, body: string) => Promise<void>
  remove: (comment: LessonComment) => void
}>()

const mode = ref<'view' | 'edit' | 'reply'>('view')

const authorName = computed(() =>
  [props.comment.author.name, props.comment.author.lastName].filter(Boolean).join(' '),
)
const canDelete = computed(() => props.comment.isOwn || props.isAdmin)

async function submitReply(body: string) {
  await props.reply(props.comment.id, body)
  mode.value = 'view'
}

async function submitEdit(body: string) {
  await props.edit(props.comment, body)
  mode.value = 'view'
}
</script>

<template>
  <article class="comment" :class="{ 'comment--reply': isReply, 'comment--team': comment.author.isTeam }">
    <UserAvatar
      :name="comment.author.name"
      :last-name="comment.author.lastName"
      :picture="comment.author.profilePicture"
      :size="isReply ? 'sm' : 'md'"
    />

    <div class="comment__main">
      <header class="comment__head">
        <span class="comment__name">{{ authorName }}</span>
        <span v-if="comment.author.isTeam" class="comment__badge">Equipo Bakano</span>
        <time class="comment__time" :datetime="comment.createdAt" :title="fullDate(comment.createdAt)">
          {{ relativeTime(comment.createdAt) }}<template v-if="comment.edited"> · editado</template>
        </time>
      </header>

      <CommentComposer
        v-if="mode === 'edit'"
        :submit="submitEdit"
        :initial-value="comment.body"
        :show-avatar="false"
        label="Editar comentario"
        submit-label="Guardar"
        autofocus
        cancellable
        @cancel="mode = 'view'"
      />
      <p v-else class="comment__body">{{ comment.body }}</p>

      <div v-if="mode === 'view'" class="comment__actions">
        <button v-if="!isReply" type="button" class="comment__action" @click="mode = 'reply'">
          <i class="fa-regular fa-comment" aria-hidden="true" /> Responder
        </button>
        <button v-if="comment.isOwn" type="button" class="comment__action" @click="mode = 'edit'">
          Editar
        </button>
        <button v-if="canDelete" type="button" class="comment__action comment__action--danger" @click="remove(comment)">
          Eliminar
        </button>
      </div>

      <div v-if="mode === 'reply'" class="comment__reply-box">
        <CommentComposer
          :submit="submitReply"
          :label="`Responder a ${authorName}`"
          :placeholder="`Responde a ${comment.author.name}…`"
          submit-label="Responder"
          autofocus
          cancellable
          @cancel="mode = 'view'"
        />
      </div>

      <div v-if="comment.replies?.length" class="comment__replies">
        <CommentItem
          v-for="child in comment.replies"
          :key="child.id"
          :comment="child"
          :is-admin="isAdmin"
          :reply="reply"
          :edit="edit"
          :remove="remove"
          is-reply
        />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.comment {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;

  &__main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.4rem; }

  &__head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.25rem 0.6rem; }

  &__name {
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--c-text);
  }

  &__badge {
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    background: rgb(var(--c-accent-fill-rgb) / 0.1);
    color: var(--c-accent-text);
    font-family: $font-sans;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  &__time {
    font-family: $font-sans;
    font-size: 0.75rem;
    color: var(--c-text-muted);
  }

  &__body {
    margin: 0;
    font-family: $font-sans;
    font-size: 0.93rem;
    line-height: 1.6;
    color: var(--c-text-2);
    white-space: pre-line;
    overflow-wrap: anywhere;
  }

  &--team > &__main > &__body {
    padding: 0.75rem 0.9rem;
    border-left: 3px solid var(--c-accent);
    border-radius: 0 0.6rem 0.6rem 0;
    background: rgb(var(--c-accent-fill-rgb) / 0.04);
    color: var(--c-text);
  }

  &__actions { display: flex; gap: 1rem; }

  &__action {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.2rem 0;
    background: none;
    border: 0;
    font-family: $font-sans;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--c-text-muted);
    cursor: pointer;

    &:hover { color: var(--c-accent-text); }
    &--danger:hover { color: var(--c-error); }
  }

  &__reply-box { margin-top: 0.5rem; }

  &__replies {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.75rem;
    padding-left: 0.9rem;
    border-left: 2px solid var(--c-border);
  }
}
</style>
