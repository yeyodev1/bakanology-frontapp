<script setup lang="ts">
import { ref, computed, nextTick, onMounted, useId } from 'vue'
import { useUserStore } from '@/stores/user'
import { userService } from '@/services/userService'
import UserAvatar from '@/components/ui/UserAvatar.vue'

const MAX_LENGTH = 2000

const props = withDefaults(defineProps<{
  submit: (body: string) => Promise<void>
  label?: string
  placeholder?: string
  submitLabel?: string
  initialValue?: string
  showAvatar?: boolean
  autofocus?: boolean
  cancellable?: boolean
}>(), {
  label: 'Escribe un comentario',
  placeholder: 'Comparte una duda o lo que te llevas de esta clase…',
  submitLabel: 'Publicar',
  initialValue: '',
  showAvatar: true,
  autofocus: false,
  cancellable: false,
})

const emit = defineEmits<{ cancel: [] }>()

const userStore = useUserStore()
const fieldId = useId()
const body = ref(props.initialValue)
const sending = ref(false)
const error = ref('')
const status = ref('')
const textarea = ref<HTMLTextAreaElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const uploadingPhoto = ref(false)

const remaining = computed(() => MAX_LENGTH - body.value.length)
const canSend = computed(() => body.value.trim().length > 0 && remaining.value >= 0 && !sending.value)

onMounted(async () => {
  if (!props.autofocus) return
  await nextTick()
  textarea.value?.focus()
})

async function send() {
  if (!canSend.value) return
  sending.value = true
  error.value = ''
  status.value = ''
  try {
    await props.submit(body.value.trim())
    body.value = ''
    status.value = 'Comentario publicado.'
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudo publicar. Inténtalo de nuevo.'
  } finally {
    sending.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    send()
  }
  if (event.key === 'Escape' && props.cancellable) emit('cancel')
}

async function onPhotoSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploadingPhoto.value = true
  error.value = ''
  try {
    const { data } = await userService.uploadProfilePicture(file)
    userStore.setUser({ profilePicture: data.data.user.profilePicture })
    status.value = 'Foto de perfil actualizada.'
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudo subir la foto. Usa JPG, PNG o WebP de hasta 5 MB.'
  } finally {
    uploadingPhoto.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}
</script>

<template>
  <form class="composer" :class="{ 'composer--bare': !showAvatar }" @submit.prevent="send">
    <div v-if="showAvatar" class="composer__avatar">
      <UserAvatar :name="userStore.name" :last-name="userStore.lastName" :picture="userStore.profilePicture" size="md" />
      <button
        v-if="!userStore.profilePicture"
        type="button"
        class="composer__photo"
        :disabled="uploadingPhoto"
        @click="fileInput?.click()"
      >
        {{ uploadingPhoto ? 'Subiendo…' : 'Agregar foto' }}
      </button>
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        class="composer__file"
        tabindex="-1"
        aria-hidden="true"
        @change="onPhotoSelected"
      >
    </div>

    <div class="composer__body">
      <label :for="fieldId" class="composer__label">{{ label }}</label>
      <textarea
        :id="fieldId"
        ref="textarea"
        v-model="body"
        class="composer__input"
        :placeholder="placeholder"
        :maxlength="MAX_LENGTH"
        rows="3"
        @keydown="onKeydown"
      />
      <div class="composer__footer">
        <span class="composer__hint" :class="{ 'composer__hint--warn': remaining < 100 }">
          {{ remaining < 200 ? `${remaining} caracteres restantes` : 'Ctrl + Enter para publicar' }}
        </span>
        <div class="composer__actions">
          <button v-if="cancellable" type="button" class="composer__btn composer__btn--ghost" @click="emit('cancel')">
            Cancelar
          </button>
          <button type="submit" class="composer__btn" :disabled="!canSend">
            {{ sending ? 'Publicando…' : submitLabel }}
          </button>
        </div>
      </div>
      <p v-if="error" class="composer__error" role="alert">{{ error }}</p>
      <p class="composer__status" aria-live="polite">{{ status }}</p>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.composer {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;

  &__avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
  }

  &__photo {
    background: none;
    border: 0;
    padding: 0;
    font-family: $font-sans;
    font-size: 0.7rem;
    font-weight: 600;
    color: $bakano-pink;
    cursor: pointer;
    white-space: nowrap;

    &:hover { text-decoration: underline; }
    &:disabled { color: $gray-400; cursor: progress; }
  }

  &__file { display: none; }

  &__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.5rem; }

  &__label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  &__input {
    width: 100%;
    min-height: 5.5rem;
    padding: 0.875rem 1rem;
    border: 1px solid $gray-200;
    border-radius: 0.875rem;
    background: $gray-100;
    font-family: $font-sans;
    font-size: 0.95rem;
    line-height: 1.55;
    color: $bakano-dark;
    resize: vertical;
    transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;

    &::placeholder { color: $gray-400; }

    &:focus {
      outline: none;
      background: $white;
      border-color: $bakano-pink;
      box-shadow: 0 0 0 3px rgba($bakano-pink, 0.15);
    }
  }

  &__footer { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }

  &__hint {
    font-family: $font-sans;
    font-size: 0.75rem;
    color: $gray-500;

    &--warn { color: $alert-error; }
  }

  &__actions { display: flex; gap: 0.5rem; margin-left: auto; }

  &__btn {
    padding: 0.6rem 1.25rem;
    border: 0;
    border-radius: 999px;
    background: $bakano-pink;
    color: $white;
    font-family: $font-sans;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, opacity 0.15s ease;

    &:hover:not(:disabled) { background: $bakano-pink-dark; }
    &:disabled { opacity: 0.45; cursor: not-allowed; }

    &--ghost {
      background: transparent;
      color: $gray-600;

      &:hover:not(:disabled) { background: $gray-100; }
    }
  }

  &__error {
    margin: 0;
    font-family: $font-sans;
    font-size: 0.8rem;
    color: $alert-error;
  }

  &__status {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .composer__input, .composer__btn { transition: none; }
}
</style>
