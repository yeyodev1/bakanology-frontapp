<script setup lang="ts">
defineProps<{
  isActive: boolean
  isCanceled: boolean
  cancelLoading: boolean
  accessUntilLabel: string
}>()

const emit = defineEmits<{
  (e: 'cancel-subscription'): void
}>()
</script>

<template>
  <section v-if="isActive && !isCanceled" class="cancel">
    <div class="cancel__content">
      <div>
        <h3 class="cancel__title">Cancelar suscripción</h3>
        <p class="cancel__text">
          Puedes cancelar para que no se renueve automáticamente. Seguirás con acceso hasta el final de tu período pagado. <strong>No aplicamos reembolsos.</strong>
        </p>
      </div>
      <button class="cancel__btn" :disabled="cancelLoading" @click="emit('cancel-subscription')">
        {{ cancelLoading ? 'Procesando…' : 'Cancelar suscripción' }}
      </button>
    </div>
  </section>

  <section v-else-if="isCanceled" class="cancel cancel--canceled">
    <p>
      <i class="fa-solid fa-circle-info" />
      Tu suscripción está cancelada. Seguirás con acceso hasta el {{ accessUntilLabel }}.
    </p>
  </section>
</template>

<style lang="scss" scoped>
.cancel {
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;

  &--canceled {
    font-family: $font-sans;
    font-size: 0.9rem;
    color: $gray-600;
    background: var(--cream);

    i {
      color: $bakano-pink;
      margin-right: 0.35rem;
    }
  }
}

.cancel__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.cancel__title {
  font-family: $font-display;
  font-size: 1.15rem;
  font-weight: 400;
  color: $bakano-dark;
  margin: 0;
}

.cancel__text {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $gray-600;
  margin: 0.25rem 0 0;
  max-width: 60ch;

  strong {
    color: $bakano-dark;
  }
}

.cancel__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba($alert-error, 0.3);
  background: $white;
  color: $alert-error;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: $alert-error;
    color: $white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
