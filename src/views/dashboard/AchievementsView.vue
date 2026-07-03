<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const unlocked = computed(() => dashboardStore.achievements.filter((a) => !a.isLocked))
const locked = computed(() => dashboardStore.achievements.filter((a) => a.isLocked))

function formatDate(iso: string | null) {
  if (!iso) return ''
  const date = new Date(iso)
  return date.toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="achievements-view">
    <header class="summary-card">
      <div class="summary-card__text">
        <h2 class="summary-card__title">Logros</h2>
        <p class="summary-card__count">{{ unlocked.length }} / {{ unlocked.length + locked.length }} obtenidos</p>
      </div>
      <div class="summary-card__progress">
        <div
          class="summary-card__bar"
          :style="{ width: `${(unlocked.length / (unlocked.length + locked.length)) * 100}%` }"
        />
      </div>
    </header>

    <section v-if="unlocked.length" class="section">
      <h3 class="section__title">Desbloqueados</h3>
      <div class="grid">
        <div v-for="a in unlocked" :key="a.id" class="card card--unlocked">
          <div class="card__icon">
            <i :class="a.iconClass" />
          </div>
          <div class="card__info">
            <strong class="card__label">{{ a.title }}</strong>
            <span class="card__desc">{{ a.description }}</span>
          </div>
          <span class="card__date">{{ formatDate(a.unlockedAt) }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h3 class="section__title">Bloqueados</h3>
      <div class="grid">
        <div v-for="a in locked" :key="a.id" class="card card--locked">
          <div class="card__icon card__icon--dim">
            <i :class="a.iconClass" />
          </div>
          <div class="card__info">
            <strong class="card__label">{{ a.title }}</strong>
            <span class="card__desc">{{ a.description }}</span>
          </div>
          <span class="card__lock"><i class="fa-solid fa-lock" /></span>
        </div>
      </div>
    </section>

    <div v-if="unlocked.length === 0 && locked.length === 0" class="empty">
      <p>No hay logros disponibles.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.achievements-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: $light;
  border: 1px solid var(--border);
  border-radius: 1rem;

  &__text {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.35rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0;
  }

  &__count {
    font-family: $font-mono;
    font-size: 0.85rem;
    color: $gray-500;
    margin: 0;
  }

  &__progress {
    height: 6px;
    background: rgba($bakano-dark, 0.07);
    border-radius: 999px;
    overflow: hidden;
  }

  &__bar {
    height: 100%;
    background: $bakano-green;
    border-radius: 999px;
    transition: width 0.5s ease;
  }
}

.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $gray-500;
    margin: 0;
  }
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: $light;
  border: 1px solid var(--border);
  border-radius: 0.875rem;

  &--unlocked {
    background: rgba($bakano-green, 0.04);
    border-color: rgba($bakano-green, 0.12);
  }

  &--locked {
    opacity: 0.65;
  }

  &__icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $bakano-green;
    color: $white;
    border-radius: 50%;
    font-size: 1rem;
    flex-shrink: 0;

    &--dim {
      background: rgba($bakano-dark, 0.06);
      color: $gray-500;
    }
  }

  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  &__label {
    font-family: $font-sans;
    font-size: 0.95rem;
    font-weight: 600;
    color: $bakano-dark;
  }

  &__desc {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $gray-500;
  }

  &__date {
    font-family: $font-mono;
    font-size: 0.65rem;
    color: $gray-400;
    white-space: nowrap;
  }

  &__lock {
    color: $gray-400;
    font-size: 0.9rem;
  }
}

.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: $gray-500;
  font-family: $font-sans;
}
</style>
