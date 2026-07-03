<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const deadlineStr = import.meta.env.VITE_PRESALE_DEADLINE as string

const targetDate = computed(() => new Date(deadlineStr))

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

const diff = computed(() => Math.max(0, targetDate.value.getTime() - now.value))
const expired = computed(() => diff.value === 0)

const pad = (n: number) => n.toString().padStart(2, '0')

const days = computed(() => pad(Math.floor(diff.value / 86400000)))
const hours = computed(() => pad(Math.floor((diff.value % 86400000) / 3600000)))
const minutes = computed(() => pad(Math.floor((diff.value % 3600000) / 60000)))
const seconds = computed(() => pad(Math.floor((diff.value % 60000) / 1000)))

onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <div class="hero__bg" />

    <div class="hero__inner">
      <span class="hero__eyebrow">Bakanology Academy</span>

      <h1 class="hero__title">
        Marketing de performance<br>
        <span class="hero__highlight">sin pagar una agencia</span>
      </h1>

      <div class="hero__pricing">
        <span class="hero__price-label">Precio especial de lanzamiento</span>
        <strong class="hero__price">$297 USD</strong>
        <span class="hero__price-desc">Pago único — Acceso de por vida</span>
        <span class="hero__price-desc">Sin renovaciones. Incluye todas las actualizaciones futuras.</span>
      </div>

      <div class="hero__offer" v-if="!expired">
        <span class="hero__offer-label">⚡ Oferta válida hasta el 31 de julio</span>
        <div class="hero__countdown">
          <div class="hero__countdown-unit">
            <span class="hero__countdown-value">{{ days }}</span>
            <span class="hero__countdown-label">Días</span>
          </div>
          <span class="hero__countdown-sep">:</span>
          <div class="hero__countdown-unit">
            <span class="hero__countdown-value">{{ hours }}</span>
            <span class="hero__countdown-label">Horas</span>
          </div>
          <span class="hero__countdown-sep">:</span>
          <div class="hero__countdown-unit">
            <span class="hero__countdown-value">{{ minutes }}</span>
            <span class="hero__countdown-label">Min</span>
          </div>
          <span class="hero__countdown-sep">:</span>
          <div class="hero__countdown-unit">
            <span class="hero__countdown-value">{{ seconds }}</span>
            <span class="hero__countdown-label">Seg</span>
          </div>
        </div>
      </div>

      <div class="hero__actions">
        <button type="button" class="hero__btn hero__btn--primary" @click="scrollTo('vsl')">
          Ver video
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button type="button" class="hero__btn hero__btn--ghost" @click="scrollTo('planes')">
          Ver planes
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: $bakano-dark;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba($bakano-pink, 0.12) 0%, transparent 70%),
    radial-gradient(ellipse 60% 50% at 50% 100%, rgba($bakano-purple, 0.08) 0%, transparent 60%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  padding: 6rem 2rem 4rem;
  max-width: 720px;
}

.hero__eyebrow {
  font-family: $font-mono;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 600;
}

.hero__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
  color: $white;
  margin: 0;
}

.hero__highlight {
  color: $bakano-pink;
}

.hero__pricing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 1.5rem 2.25rem;
  border: 1px solid rgba($bakano-pink, 0.3);
  border-radius: 1rem;
  background: rgba($bakano-pink, 0.06);
}

.hero__price-label {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba($white, 0.5);
}

.hero__price {
  font-family: $font-display;
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 800;
  line-height: 1;
  color: $white;
}

.hero__price-desc {
  font-family: $font-sans;
  font-size: 0.88rem;
  color: rgba($white, 0.65);
  line-height: 1.4;
}

.hero__offer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.hero__offer-label {
  font-family: $font-sans;
  font-size: 0.85rem;
  font-weight: 600;
  color: $alert-warning;
}

.hero__countdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hero__countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  min-width: 3rem;
}

.hero__countdown-value {
  font-family: $font-display;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  line-height: 1;
  color: $white;
}

.hero__countdown-label {
  font-family: $font-mono;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba($white, 0.55);
}

.hero__countdown-sep {
  font-family: $font-display;
  font-size: 1.6rem;
  font-weight: 700;
  color: rgba($white, 0.25);
  margin-top: -1.25rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-family: $font-sans;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all .25s ease;
  border: none;
  text-decoration: none;
}

.hero__btn--primary {
  background: $bakano-pink;
  color: $white;

  &:hover {
    background: $bakano-pink-dark;
    transform: translateY(-1px);
  }
}

.hero__btn--ghost {
  background: transparent;
  color: rgba($white, 0.8);
  border: 1px solid rgba($white, 0.25);

  &:hover {
    color: $white;
    border-color: $white;
  }
}
</style>
