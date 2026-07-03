<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

type ScheduleItem = typeof dashboardStore.schedule[number]

const groupedSchedule = computed(() => {
  const grouped: Record<string, ScheduleItem[]> = {}
  days.forEach((day) => (grouped[day] = []))
  dashboardStore.schedule.forEach((item) => {
    const list = grouped[item.day] || []
    list.push(item)
    grouped[item.day] = list
  })
  Object.keys(grouped).forEach((day) => {
    const list = grouped[day]
    if (list) list.sort((a, b) => a.time.localeCompare(b.time))
  })
  return grouped
})

function typeLabel(type: string) {
  const labels: Record<string, string> = {
    live: 'En vivo',
    qa: 'Preguntas',
    workshop: 'Taller',
    review: 'Revisión',
  }
  return labels[type] || type
}

function typeClass(type: string) {
  return `schedule-card--${type}`
}
</script>

<template>
  <div class="schedule-view">
    <div class="schedule-grid">
      <div v-for="day in days" :key="day" class="day-column">
        <h2 class="day-column__title">{{ day }}</h2>
        <div class="day-column__items">
          <div
            v-for="item in (groupedSchedule[day] ?? [])"
            :key="item.id"
            class="schedule-card"
            :class="typeClass(item.type)"
          >
            <span class="schedule-card__time">{{ item.time }}</span>
            <h3 class="schedule-card__title">{{ item.title }}</h3>
            <span class="schedule-card__type">{{ typeLabel(item.type) }}</span>
          </div>
          <div v-if="(groupedSchedule[day] ?? []).length === 0" class="day-column__empty">Sin actividades</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.schedule-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
}

.day-column {
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 240px;

  &__title {
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $gray-500;
    margin: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  &__empty {
    font-family: $font-sans;
    font-size: 0.8rem;
    color: $gray-500;
    text-align: center;
    padding: 1rem 0;
  }
}

.schedule-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  border-radius: 0.6rem;
  background: var(--cream);
  border-left: 3px solid $bakano-green;

  &__time {
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    color: $gray-500;
  }

  &__title {
    font-family: $font-sans;
    font-size: 0.85rem;
    font-weight: 600;
    color: $bakano-dark;
    margin: 0;
  }

  &__type {
    font-family: $font-mono;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $gray-500;
  }

  &--live { border-left-color: $bakano-green; }
  &--qa { border-left-color: $bakano-pink; }
  &--workshop { border-left-color: $alert-info; }
  &--review { border-left-color: $bakano-pink; }
}

@media (max-width: 1200px) {
  .schedule-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 720px) {
  .schedule-grid { grid-template-columns: 1fr; }
}
</style>
