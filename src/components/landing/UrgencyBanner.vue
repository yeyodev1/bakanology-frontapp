<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { usePricingModal } from '@/composables/usePricingModal'

const { open } = usePricingModal()

const deadlineStr = import.meta.env.VITE_PRESALE_DEADLINE as string
const targetDate = computed(() => new Date(deadlineStr))
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

const diff = computed(() => {
  const target = targetDate.value.getTime()
  return Number.isFinite(target) ? Math.max(0, target - now.value) : 0
})
const expired = computed(() => diff.value === 0)
const pad = (n: number) => n.toString().padStart(2, '0')

const days = computed(() => pad(Math.floor(diff.value / 86400000)))
const hours = computed(() => pad(Math.floor((diff.value % 86400000) / 3600000)))
const minutes = computed(() => pad(Math.floor((diff.value % 3600000) / 60000)))
const seconds = computed(() => pad(Math.floor((diff.value % 60000) / 1000)))

onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <div class="urgency-banner" role="region" aria-label="Oferta especial">
    <div class="urgency-banner__inner">
      <p class="urgency-banner__text">
        <span class="urgency-banner__chip">Oferta especial</span>
        <span class="urgency-banner__copy">
          12 meses al precio de 6<span v-if="!expired"> · la oferta termina con el contador</span><span v-else> en el plan anual</span>
        </span>
      </p>

      <div class="urgency-banner__countdown" v-if="!expired">
        <div class="urgency-banner__timer" role="timer" aria-label="Tiempo restante de la oferta">
          <div class="urgency-banner__unit">
            <span class="urgency-banner__value">{{ days }}</span>
            <span class="urgency-banner__unit-label">Días</span>
          </div>
          <span class="urgency-banner__sep">:</span>
          <div class="urgency-banner__unit">
            <span class="urgency-banner__value">{{ hours }}</span>
            <span class="urgency-banner__unit-label">Hrs</span>
          </div>
          <span class="urgency-banner__sep">:</span>
          <div class="urgency-banner__unit">
            <span class="urgency-banner__value">{{ minutes }}</span>
            <span class="urgency-banner__unit-label">Min</span>
          </div>
          <span class="urgency-banner__sep">:</span>
          <div class="urgency-banner__unit">
            <span class="urgency-banner__value">{{ seconds }}</span>
            <span class="urgency-banner__unit-label">Seg</span>
          </div>
        </div>
      </div>

      <div class="urgency-banner__actions">
        <button type="button" class="urgency-banner__cta" @click="open">
          Asegurar cupo
        </button>
        <RouterLink :to="{ name: 'login' }" class="urgency-banner__login">
          Entrar
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.urgency-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  background: linear-gradient(90deg, #c62828 0%, #d84315 50%, #ef6c00 100%);
  color: var(--c-on-accent);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.urgency-banner__inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.55rem clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 760px) {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.6rem 1rem;
    padding-block: 0.65rem;
  }
}

.urgency-banner__text {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: $font-sans;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 760px) {
    grid-column: 1 / -1;
    font-size: 0.78rem;
  }
}

.urgency-banner__copy {
  min-width: 0;
}

.urgency-banner__chip {
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: rgb(var(--c-on-accent-rgb) / 0.18);
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  white-space: nowrap;
}

.urgency-banner__countdown {
  margin-left: auto;

  @media (max-width: 760px) {
    margin-left: 0;
  }
}

.urgency-banner__timer {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.urgency-banner__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 2rem;
  font-variant-numeric: tabular-nums;

  @media (max-width: 420px) {
    min-width: 1.55rem;
  }
}

.urgency-banner__value {
  font-family: $font-display;
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1;

  @media (max-width: 420px) {
    font-size: 0.95rem;
  }
}

.urgency-banner__unit-label {
  font-family: $font-mono;
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.85;
}

.urgency-banner__sep {
  font-family: $font-display;
  font-size: 0.85rem;
  font-weight: 700;
  opacity: 0.6;
  margin-top: -0.4rem;
}

.urgency-banner__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 760px) {
    justify-content: flex-end;
    gap: 0.6rem;
  }
}

.urgency-banner__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--c-surface);
  color: #c62828;
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1rem;
  font-family: $font-sans;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;

  @media (max-width: 420px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    outline: 2px solid var(--c-surface);
    outline-offset: 3px;
  }
}

.urgency-banner__login {
  font-family: $font-sans;
  font-size: 0.75rem;
  color: rgb(var(--c-on-accent-rgb) / 0.85);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
  white-space: nowrap;

  display: inline-flex;
  align-items: center;

  &:hover {
    color: var(--c-on-accent);
  }

  &:focus-visible {
    outline: 2px solid var(--c-surface);
    outline-offset: 3px;
    border-radius: 4px;
  }
}
</style>
