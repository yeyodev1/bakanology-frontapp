<script setup lang="ts">
defineProps<{
  hasActiveSubscription: boolean
  isCanceled: boolean
  cancelLoading: boolean
  accessUntilLabel: string
}>()

const emit = defineEmits<{
  (e: 'cancel-subscription'): void
}>()
</script>

<template>
  <section v-if="hasActiveSubscription" class="cancel">
    <div class="cancel__content">
      <div>
        <span class="cancel__status"><i></i> Renovación automática activa</span>
        <h3 class="cancel__title">Cancelar suscripción mensual</h3>
        <p class="cancel__text">
          Cancela la renovación automática cuando quieras. No habrá nuevos cobros y seguirás con acceso hasta el final de tu período pagado. <strong>No aplicamos reembolsos.</strong>
        </p>
      </div>
      <button class="cancel__btn" :disabled="cancelLoading" @click="emit('cancel-subscription')">
        {{ cancelLoading ? 'Procesando…' : 'Cancelar suscripción' }}
      </button>
    </div>
  </section>

  <section v-else-if="isCanceled" class="cancel cancel--canceled">
    <span class="cancel__status cancel__status--canceled"><i></i> Cancelación confirmada por Stripe</span>
    <h3 class="cancel__title">Tu suscripción ya no se renovará</h3>
    <p>Stripe no realizará nuevos cobros. Conservas acceso a Bakanology hasta el <strong>{{ accessUntilLabel }}</strong>.</p>
  </section>

  <section v-else class="cancel cancel--inactive">
    <p>
      <i class="fa-solid fa-circle-check" />
      No tienes una suscripción mensual activa en Stripe ni cobros automáticos pendientes.
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

  &--inactive {
    color: $gray-600;
    background: var(--cream);

    i { color: $bakano-green; margin-right: 0.35rem; }
  }
}

.cancel__status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.45rem;
  color: $bakano-green;
  font-family: $font-mono;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  i { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: $bakano-green; }

  &--canceled { color: $gray-600; }
  &--canceled i { background: $gray-500; }
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
