<script setup lang="ts">
defineProps<{
  pendingCount: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'cancel-pending'): void
}>()
</script>

<template>
  <section v-if="pendingCount > 0" class="banner">
    <div class="banner__content">
      <div>
        <h3 class="banner__title">Pago(s) pendiente(s)</h3>
        <p class="banner__text">
          Tienes {{ pendingCount }} pago(s) pendiente(s). Puedes cancelarlos para mantener tu historial limpio.
        </p>
      </div>
      <button class="banner__btn" :disabled="loading" @click="emit('cancel-pending')">
        {{ loading ? 'Cancelando…' : 'Cancelar pendientes' }}
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  background: $light;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
}

.banner__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.banner__title {
  font-family: $font-display;
  font-size: 1.15rem;
  font-weight: 600;
  color: $bakano-dark;
  margin: 0;
}

.banner__text {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $gray-600;
  margin: 0.25rem 0 0;
  max-width: 60ch;
}

.banner__btn {
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
  background: $light;
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
