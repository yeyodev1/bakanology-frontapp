<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Achievement {
  id: string
  title: string
  isLocked: boolean
  unlockedAt: string | null
}

defineProps<{
  achievements: Achievement[]
}>()

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <section class="section">
    <div class="section__header">
      <h2 class="section__title">Últimos logros</h2>
      <RouterLink :to="{ name: 'achievements' }" class="section__link">Ver todos</RouterLink>
    </div>
    <div class="row">
      <div
        v-for="a in achievements"
        :key="a.id"
        class="badge"
        :class="{ 'badge--locked': a.isLocked }"
      >
        <div class="badge__icon">
          <i :class="a.isLocked ? 'fa-solid fa-lock' : 'fa-solid fa-medal'" aria-hidden="true" />
        </div>
        <span class="badge__title">{{ a.title }}</span>
        <span v-if="!a.isLocked && a.unlockedAt" class="badge__date">{{ formatDate(a.unlockedAt) }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.section__title {
  font-family: $font-display;
  font-size: 1.35rem;
  font-weight: 400;
  color: $bakano-dark;
  margin: 0;
}

.section__link {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $bakano-green;

  &:hover { text-decoration: underline; }
}

.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.badge {
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;

  &__icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba($bakano-green, 0.12);
    color: $bakano-green;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }

  &__title {
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 600;
    color: $bakano-dark;
  }

  &__date {
    font-family: $font-mono;
    font-size: 0.65rem;
    color: $gray-500;
  }

  &--locked {
    opacity: 0.55;

    .badge__icon {
      background: rgba($bakano-dark, 0.05);
      color: $gray-500;
    }
  }
}

@media (max-width: 1200px) {
  .row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 720px) {
  .row { grid-template-columns: repeat(2, 1fr); }
}
</style>
