<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  target: string | Date
  label?: string
}>()

const now = ref(new Date())
let interval: ReturnType<typeof setInterval> | null = null

const targetDate = computed(() => new Date(props.target))

const diff = computed(() => {
  const ms = targetDate.value.getTime() - now.value.getTime()
  return Math.max(0, ms)
})

const finished = computed(() => diff.value === 0)

const days = computed(() => Math.floor(diff.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((diff.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
const minutes = computed(() => Math.floor((diff.value % (1000 * 60 * 60)) / (1000 * 60)))
const seconds = computed(() => Math.floor((diff.value % (1000 * 60)) / 1000))

onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="countdown-timer">
    <span v-if="label" class="countdown-timer__label">{{ label }}</span>
    <div class="countdown-timer__display">
      <div class="countdown-timer__block">
        <span class="countdown-timer__value">{{ days }}</span>
        <span class="countdown-timer__unit">días</span>
      </div>
      <div class="countdown-timer__block">
        <span class="countdown-timer__value">{{ hours.toString().padStart(2, '0') }}</span>
        <span class="countdown-timer__unit">horas</span>
      </div>
      <div class="countdown-timer__block">
        <span class="countdown-timer__value">{{ minutes.toString().padStart(2, '0') }}</span>
        <span class="countdown-timer__unit">min</span>
      </div>
      <div class="countdown-timer__block">
        <span class="countdown-timer__value">{{ seconds.toString().padStart(2, '0') }}</span>
        <span class="countdown-timer__unit">seg</span>
      </div>
    </div>
    <span v-if="finished" class="countdown-timer__finished">Tiempo finalizado</span>
  </div>
</template>

<style lang="scss" scoped>
.countdown-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.countdown-timer__label {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $gray-500;
}

.countdown-timer__display {
  display: flex;
  gap: 0.75rem;
}

.countdown-timer__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 56px;
  padding: 0.75rem 0.5rem;
  background: rgba($bakano-dark, 0.04);
  border: 1px solid rgba($bakano-dark, 0.06);
  border-radius: 0.75rem;
}

.countdown-timer__value {
  font-family: $font-display;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  color: $bakano-dark;
}

.countdown-timer__unit {
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $gray-500;
  margin-top: 0.25rem;
}

.countdown-timer__finished {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $bakano-green;
  font-weight: 500;
}
</style>
