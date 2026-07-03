<script setup lang="ts">
import type { ManualPayment } from '@/services/adminService'

defineProps<{
  payments: ManualPayment[]
}>()
</script>

<template>
  <section class="admin-payments__stats">
    <div class="admin-payments__stat">
      <span class="admin-payments__stat-value">{{ payments.length }}</span>
      <span class="admin-payments__stat-label">Pagos registrados</span>
    </div>
    <div class="admin-payments__stat admin-payments__stat--approved">
      <span class="admin-payments__stat-value">
        {{ payments.filter((p) => p.status === 'approved').length }}
      </span>
      <span class="admin-payments__stat-label">Aprobados</span>
    </div>
    <div class="admin-payments__stat admin-payments__stat--amount">
      <span class="admin-payments__stat-value">
        USD {{ payments.reduce((sum, p) => sum + p.amount, 0) }}
      </span>
      <span class="admin-payments__stat-label">Total registrado</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/admin-shared.scss';

.admin-payments__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.admin-payments__stat {
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  &--approved {
    background: rgba($bakano-green, 0.08);
    border-color: rgba($bakano-green, 0.2);
  }

  &--amount {
    background: rgba($bakano-pink, 0.08);
    border-color: rgba($bakano-pink, 0.25);
  }
}

.admin-payments__stat-value {
  font-family: $font-display;
  font-size: 1.65rem;
  color: $bakano-dark;
}

.admin-payments__stat-label {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $gray-500;
}

@media (max-width: 720px) {
  .admin-payments__stats {
    grid-template-columns: 1fr;
  }
}
</style>
