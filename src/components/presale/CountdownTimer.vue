<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  deadline: string
}>()

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | null = null

const target = computed(() => new Date(props.deadline).getTime())
const diff = computed(() => Math.max(0, target.value - now.value))
const expired = computed(() => diff.value === 0)

const pad = (n: number) => n.toString().padStart(2, '0')

const days = computed(() => pad(Math.floor(diff.value / (1000 * 60 * 60 * 24))))
const hours = computed(() => pad(Math.floor((diff.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))))
const minutes = computed(() => pad(Math.floor((diff.value % (1000 * 60 * 60)) / (1000 * 60))))
const seconds = computed(() => pad(Math.floor((diff.value % (1000 * 60)) / 1000)))

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="countdown" :class="{ 'countdown--expired': expired }">
    <template v-if="!expired">
      <div class="countdown__unit">
        <span class="countdown__value">{{ days }}</span>
        <span class="countdown__label">Días</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__value">{{ hours }}</span>
        <span class="countdown__label">Horas</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__value">{{ minutes }}</span>
        <span class="countdown__label">Min</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__value">{{ seconds }}</span>
        <span class="countdown__label">Seg</span>
      </div>
    </template>
    <p v-else class="countdown__closed">Preventa cerrada</p>
  </div>
</template>

<style lang="scss" scoped>
.countdown {
  display: flex;
  gap: clamp(0.75rem, 2vw, 1.25rem);
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 3.5rem;
}

.countdown__value {
  font-family: $font-display;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  line-height: 1;
  color: $white;
}

.countdown__label {
  font-family: $font-mono;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba($white, 0.7);
}

.countdown__closed {
  font-family: $font-display;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-style: italic;
  color: $bakano-pink;
  margin: 0;
}
</style>
