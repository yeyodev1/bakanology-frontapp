<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const seconds = ref(5)
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(() => {
    seconds.value -= 1
    if (seconds.value <= 0) {
      router.push({ name: 'dashboard' })
    }
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="no-permission">
    <div class="no-permission__panel">
      <div class="no-permission__icon">
        <i class="fa-solid fa-lock" aria-hidden="true" />
      </div>
      <h1 class="no-permission__title">No tienes permiso para estar aquí</h1>
      <p class="no-permission__message">
        Esta sección es exclusiva para administradores. Yendo hacia la academia en
        <strong>{{ seconds }}</strong>…
      </p>
      <RouterLink :to="{ name: 'dashboard' }" class="no-permission__cta">
        Ir ahora
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-permission {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: var(--cream);
}

.no-permission__panel {
  max-width: 420px;
  width: 100%;
  text-align: center;
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 24px 60px rgba($bakano-dark, 0.08);
}

.no-permission__icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba($bakano-pink, 0.12);
  color: $bakano-pink;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1.25rem;
}

.no-permission__title {
  font-family: $font-display;
  font-size: 1.6rem;
  font-weight: 400;
  color: $bakano-dark;
  margin: 0 0 0.75rem;
}

.no-permission__message {
  font-family: $font-sans;
  font-size: 1rem;
  color: $gray-600;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.no-permission__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
</style>
