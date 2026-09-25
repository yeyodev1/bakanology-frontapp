<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  subscriptionStatus: string
  accessUntilLabel: string
  foundingMember: boolean
}>()

function statusLabel(s: string) {
  switch (s) {
    case 'active': return 'Activa'
    case 'pending': return 'Pendiente'
    case 'canceled': return 'Cancelada'
    default: return 'Sin suscripción activa'
  }
}

function isActive(s: string) {
  return s === 'active'
}
</script>

<template>
  <section class="card">
    <h2 class="card__title">Información de suscripción</h2>

    <template v-if="isActive(subscriptionStatus)">
      <div class="grid">
        <div class="item">
          <span class="item__label">Estado</span>
          <span class="item__value item__value--active">{{ statusLabel(subscriptionStatus) }}</span>
        </div>
        <div class="item">
          <span class="item__label">Acceso hasta</span>
          <span class="item__value">{{ accessUntilLabel }}</span>
        </div>
        <div v-if="foundingMember" class="item">
          <span class="item__label">Miembro fundador</span>
          <span class="item__value item__value--active">Sí</span>
        </div>
      </div>
    </template>

    <template v-else>
      <p class="none">Aún no tienes una suscripción activa.</p>
      <p class="none__sub">Elige un plan y obtén acceso completo a la plataforma.</p>
      <RouterLink :to="{ name: 'payments' }" class="none__cta">Ver suscripciones</RouterLink>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.card {
  background: var(--c-surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &__title {
    font-family: $font-display;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--c-text);
    margin: 0;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background: var(--cream);
  border-radius: 0.75rem;

  &__label {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--c-text-muted);
  }

  &__value {
    font-family: $font-sans;
    font-size: 1rem;
    font-weight: 600;
    color: var(--c-text);

    &--active { color: var(--c-success-text); }
  }
}

.none {
  font-family: $font-sans;
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text-2);
  margin: 0;

  &__sub {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: var(--c-text-muted);
    margin: 0;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    background: var(--c-ink);
    color: var(--c-on-accent);
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.85rem 1.5rem;
    border-radius: 999px;
    transition: background 0.2s ease;

    &:hover { background: var(--c-success-fill); }
  }
}
</style>
