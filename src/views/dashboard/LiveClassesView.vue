<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const sortedClasses = computed(() => {
  return [...dashboardStore.liveClasses].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`)
    const dateB = new Date(`${b.date}T${b.time}`)
    return dateA.getTime() - dateB.getTime()
  })
})

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' })
}

function isUpcoming(dateStr: string, timeStr: string) {
  const date = new Date(`${dateStr}T${timeStr}`)
  return date > new Date()
}
</script>

<template>
  <div class="live-classes-view">
    <section class="next-live" v-if="dashboardStore.nextLiveClass">
      <div class="next-live__label">Próxima clase</div>
      <h2 class="next-live__title">{{ dashboardStore.nextLiveClass.title }}</h2>
      <p class="next-live__meta">
        {{ formatDate(dashboardStore.nextLiveClass.date) }} · {{ dashboardStore.nextLiveClass.time }} · {{ dashboardStore.nextLiveClass.duration }}
      </p>
      <a :href="dashboardStore.nextLiveClass.zoomUrl" class="next-live__cta" target="_blank" rel="noopener">
        Unirme ahora
      </a>
    </section>

    <section class="live-list">
      <h2 class="live-list__title">Calendario de clases</h2>
      <div class="live-cards">
        <div
          v-for="live in sortedClasses"
          :key="live.id"
          class="live-card"
          :class="{ 'live-card--past': !isUpcoming(live.date, live.time) }"
        >
          <div class="live-card__date">
            <span class="live-card__day">{{ new Date(live.date).getDate() }}</span>
            <span class="live-card__month">{{ new Date(live.date).toLocaleDateString('es-EC', { month: 'short' }) }}</span>
          </div>
          <div class="live-card__info">
            <h3 class="live-card__title">{{ live.title }}</h3>
            <p class="live-card__coach">{{ live.coach }}</p>
            <p class="live-card__time">{{ live.time }} · {{ live.duration }}</p>
          </div>
          <a
            v-if="isUpcoming(live.date, live.time)"
            :href="live.zoomUrl"
            class="live-card__link"
            target="_blank"
            rel="noopener"
          >
            Unirme
          </a>
          <span v-else class="live-card__badge">Finalizada</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.live-classes-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.next-live {
  background: linear-gradient(135deg, $bakano-green 0%, $bakano-green 100%);
  color: $bakano-dark;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;

  &__label {
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  &__title {
    font-family: $font-display;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 400;
    margin: 0;
  }

  &__meta {
    font-family: $font-sans;
    font-size: 1rem;
    margin: 0;
    opacity: 0.9;
  }

  &__cta {
    margin-top: 0.75rem;
    background: $bakano-dark;
    color: $white;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.85rem 1.5rem;
    border-radius: 999px;
    transition: background 0.2s ease;

    &:hover {
      background: $bakano-dark;
    }
  }
}

.live-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    font-family: $font-display;
    font-size: 1.35rem;
    font-weight: 400;
    color: $bakano-dark;
    margin: 0;
  }
}

.live-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.live-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.25rem;

  &--past {
    opacity: 0.6;
  }

  &__date {
    width: 64px;
    height: 64px;
    border-radius: 0.75rem;
    background: var(--cream);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__day {
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 400;
    color: $bakano-dark;
    line-height: 1;
  }

  &__month {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $gray-500;
  }

  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__title {
    font-family: $font-sans;
    font-size: 1.05rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0;
  }

  &__coach {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $gray-600;
    margin: 0;
  }

  &__time {
    font-family: $font-mono;
    font-size: 0.7rem;
    color: $gray-500;
    margin: 0;
  }

  &__link {
    flex-shrink: 0;
    background: $bakano-green;
    color: $bakano-dark;
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    transition: background 0.2s ease;

    &:hover {
      background: $bakano-green;
      color: $white;
    }
  }

  &__badge {
    flex-shrink: 0;
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $gray-500;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    background: rgba($bakano-dark, 0.05);
  }
}

@media (max-width: 640px) {
  .live-card {
    flex-wrap: wrap;
  }

  .live-card__link,
  .live-card__badge {
    width: 100%;
    text-align: center;
  }
}
</style>
