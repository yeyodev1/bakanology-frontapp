<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'

interface Props {
  open: boolean
  title: string
  message: string
  actionLabel: string
  confirmText?: string
  danger?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: '',
  danger: false,
  loading: false,
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const needsConfirm = computed(() => !!props.confirmText)
const isConfirmed = computed(() => !needsConfirm.value || inputValue.value.trim().toLowerCase() === props.confirmText.trim().toLowerCase())

watch(
  () => props.open,
  (open) => {
    if (open) {
      inputValue.value = ''
      nextTick(() => inputRef.value?.focus())
    }
  },
)

function onConfirm() {
  if (!isConfirmed.value) return
  emit('confirm')
}

function onCancel() {
  emit('cancel')
}

function onBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    onCancel()
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    onCancel()
  }
}
</script>

<script lang="ts">
export default { name: 'ConfirmModal' }
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="confirm-modal"
        role="dialog"
        aria-modal="true"
        @click="onBackdropClick"
        @keydown="onKeydown"
      >
        <div class="confirm-modal__panel" tabindex="-1">
          <h2 class="confirm-modal__title">{{ title }}</h2>
          <p class="confirm-modal__message">{{ message }}</p>

          <form class="confirm-modal__form" @submit.prevent="onConfirm">
            <template v-if="needsConfirm">
              <label for="confirm-input" class="confirm-modal__label">
                Escribe <strong>"{{ confirmText }}"</strong> para continuar
              </label>
              <input
                id="confirm-input"
                ref="inputRef"
                v-model="inputValue"
                type="text"
                class="confirm-modal__input"
                :class="{ 'confirm-modal__input--valid': isConfirmed }"
                autocomplete="off"
                :placeholder="confirmText"
              />
              <p class="confirm-modal__hint">
                Esta acción requiere que confirmes escribiendo la palabra exacta.
              </p>
            </template>

            <div class="confirm-modal__actions">
              <button type="button" class="confirm-modal__btn confirm-modal__btn--secondary" @click="onCancel">
                Cancelar
              </button>
              <button
                type="submit"
                class="confirm-modal__btn"
                :class="danger ? 'confirm-modal__btn--danger' : 'confirm-modal__btn--primary'"
                :disabled="!isConfirmed || loading"
              >
                <span v-if="loading" class="confirm-modal__spinner" aria-hidden="true" />
                {{ actionLabel }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.confirm-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba($bakano-dark, 0.55);
  backdrop-filter: blur(6px);
}

.confirm-modal__panel {
  width: 100%;
  max-width: 420px;
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 24px 60px rgba($bakano-dark, 0.2);
}

.confirm-modal__title {
  font-family: $font-display;
  font-size: 1.4rem;
  font-weight: 400;
  color: $bakano-dark;
  margin: 0 0 0.5rem;
}

.confirm-modal__message {
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $gray-600;
  margin: 0 0 1.25rem;
  line-height: 1.5;
}

.confirm-modal__form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.confirm-modal__label {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $gray-600;

  strong {
    color: $bakano-dark;
    text-transform: none;
    font-size: 0.85rem;
  }
}

.confirm-modal__input {
  font-family: $font-sans;
  font-size: 1rem;
  color: $bakano-dark;
  background: var(--cream);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.85rem 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: $bakano-green;
    box-shadow: 0 0 0 3px rgba($bakano-green, 0.15);
  }

  &--valid {
    border-color: $bakano-green;
    background: rgba($bakano-green, 0.06);
  }
}

.confirm-modal__hint {
  font-family: $font-sans;
  font-size: 0.8rem;
  color: $gray-500;
  margin: 0;
}

.confirm-modal__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.confirm-modal__btn {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  transition: background 0.2s ease, opacity 0.2s ease;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}

.confirm-modal__btn--primary {
  background: $bakano-dark;
  color: $white;

  &:hover:not(:disabled) {
    background: $bakano-green;
  }
}

.confirm-modal__btn--danger {
  background: $alert-error;
  color: $white;

  &:hover:not(:disabled) {
    background: darken($alert-error, 8%);
  }
}

.confirm-modal__btn--secondary {
  background: transparent;
  color: $gray-600;
  border: 1px solid var(--border);

  &:hover {
    background: var(--cream);
  }
}

.confirm-modal__spinner {
  width: 0.85rem;
  height: 0.85rem;
  border: 2px solid rgba($white, 0.3);
  border-top-color: $white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 0.4rem;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
