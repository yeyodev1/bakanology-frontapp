<script setup lang="ts">
defineProps<{
  totalProgress: number
  courseCount: number
  achievementCount: number
  status: string
  expiresAtLabel: string
  statusLabel: string
}>()
</script>

<template>
  <section class="stats">
    <div class="stat-card stat-card--progress">
      <span class="stat-card__value">{{ totalProgress }}%</span>
      <span class="stat-card__label">Progreso general</span>
      <div class="stat-card__bar"><div class="stat-card__fill" :style="{ width: `${totalProgress}%` }" /></div>
    </div>
    <div class="stat-card">
      <span class="stat-card__value">{{ courseCount }}</span>
      <span class="stat-card__label">Cursos disponibles</span>
    </div>
    <div class="stat-card">
      <span class="stat-card__value">{{ achievementCount }}</span>
      <span class="stat-card__label">Logros desbloqueados</span>
    </div>
    <div class="stat-card" :class="`stat-card--${status}`">
      <span class="stat-card__value">{{ statusLabel }}</span>
      <span class="stat-card__label">Suscripción hasta {{ expiresAtLabel }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-card {
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  &__value {
    font-family: $font-display;
    font-size: 1.75rem;
    color: $bakano-dark;
  }

  &__label {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $gray-500;
  }

  &__bar {
    height: 6px;
    background: rgba($bakano-dark, 0.06);
    border-radius: 999px;
    margin-top: 0.5rem;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: $bakano-green;
    border-radius: 999px;
    transition: width 0.6s cubic-bezier(0.2, 0.7, 0, 1);
  }

  &--active &__value { color: $bakano-green; }
  &--pending &__value { color: $bakano-pink; }
  &--none &__value { color: $gray-500; }
}

@media (max-width: 1200px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 720px) {
  .stats { grid-template-columns: 1fr; }
}
</style>
