<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="pfm-fade">
      <div
        v-if="open"
        class="pfm"
        role="dialog"
        aria-modal="true"
        @click.self="$emit('cancel')"
      >
        <div class="pfm__panel">
          <h2 class="pfm__title">Acceso requerido</h2>
          <p class="pfm__message">
            Primero debes elegir un plan de pago para acceder al contenido de la academia.
          </p>
          <div class="pfm__actions">
            <button class="pfm__btn pfm__btn--secondary" @click="$emit('cancel')">
              Cancelar
            </button>
            <button class="pfm__btn pfm__btn--primary" @click="$emit('confirm')">
              Ir a pagos
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.pfm {
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

.pfm__panel {
  width: 100%;
  max-width: 400px;
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 24px 60px rgba($bakano-dark, 0.2);
}

.pfm__title {
  font-family: $font-display;
  font-size: 1.3rem;
  font-weight: 400;
  color: $bakano-dark;
  margin: 0 0 0.5rem;
}

.pfm__message {
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $gray-600;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.pfm__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.pfm__btn {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, opacity 0.2s ease;

  &--primary {
    background: $bakano-dark;
    color: $white;

    &:hover {
      background: $bakano-green;
    }
  }

  &--secondary {
    background: transparent;
    color: $gray-600;
    border: 1px solid var(--border);

    &:hover {
      background: var(--cream);
    }
  }
}

.pfm-fade-enter-active,
.pfm-fade-leave-active {
  transition: opacity 0.25s ease;
}

.pfm-fade-enter-from,
.pfm-fade-leave-to {
  opacity: 0;
}
</style>