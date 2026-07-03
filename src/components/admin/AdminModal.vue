<script setup lang="ts">
withDefaults(
  defineProps<{
    open: boolean
    title: string
    description?: string
    size?: 'default' | 'small'
  }>(),
  {
    description: '',
    size: 'default',
  },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="admin-modal" @click="onOverlayClick">
        <div class="admin-modal__panel" :class="{ 'admin-modal__panel--small': size === 'small' }">
          <div class="admin-modal__header">
            <h2 class="admin-modal__title">{{ title }}</h2>
            <button class="admin-modal__close" type="button" @click="emit('close')">
              <i class="fa-solid fa-xmark" />
            </button>
          </div>
          <p v-if="description" class="admin-modal__description">
            {{ description }}
          </p>
          <slot />
          <div v-if="$slots.footer" class="admin-modal__actions">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.admin-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
  overflow-y: auto;
  background: rgba($bakano-dark, 0.5);
  backdrop-filter: blur(6px);
  -webkit-overflow-scrolling: touch;
}

.admin-modal__panel {
  width: 100%;
  max-width: 520px;
  margin: auto 0;
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 24px 80px rgba($bakano-dark, 0.25);

  &--small {
    max-width: 400px;
  }
}

.admin-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.admin-modal__title {
  font-family: $font-display;
  font-size: 1.5rem;
  font-weight: 400;
  color: $bakano-dark;
  margin: 0;
}

.admin-modal__close {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $gray-500;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--cream);
    color: $bakano-dark;
  }
}

.admin-modal__description {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $gray-700;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.admin-modal__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

:deep(.admin-modal__form) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(.admin-modal__grid) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

:deep(.admin-modal__field) {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

:deep(.admin-modal__label) {
  font-family: $font-sans;
  font-size: 0.85rem;
  font-weight: 500;
  color: $gray-700;
}

:deep(.admin-modal__optional) {
  font-weight: 400;
  color: $gray-500;
  font-size: 0.8rem;
}

:deep(.admin-modal__input) {
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $bakano-dark;
  background: var(--cream);
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  padding: 0.8rem 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: $bakano-green;
    box-shadow: 0 0 0 3px rgba($bakano-green, 0.12);
  }

  &::placeholder {
    color: $gray-500;
  }
}

@media (max-width: 720px) {
  :deep(.admin-modal__grid) {
    grid-template-columns: 1fr;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .admin-modal__panel,
.modal-leave-active .admin-modal__panel {
  transition: transform 0.3s cubic-bezier(0.2, 0.7, 0, 1), opacity 0.25s ease;
}

.modal-enter-from .admin-modal__panel,
.modal-leave-to .admin-modal__panel {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
</style>
