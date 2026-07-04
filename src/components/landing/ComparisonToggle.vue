<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePricingModal } from '@/composables/usePricingModal'

const { open } = usePricingModal()
const active = ref(false)

const before = {
  label: 'Negocio Promedio',
  metrics: [
    { label: 'Costo primo (ads + labor)', value: '65%', note: 'Te estás comiendo la ganancia' },
    { label: 'Ventas mensuales', value: '$10,000', note: 'Esperando clientes pasivamente' },
    { label: 'Estado del dueño', value: 'Crítico', note: 'Bombero operativo' },
  ],
}

const after = {
  label: 'Modo Bakanology',
  metrics: [
    { label: 'Costo primo (ads + labor)', value: '35%', note: 'Márgenes sanos y predecibles' },
    { label: 'Ventas mensuales', value: '$25,000+', note: 'Clientes con sistema de adquisición' },
    { label: 'Estado del dueño', value: 'En control', note: 'Dueño, no empleado de su negocio' },
  ],
}

const current = computed(() => (active.value ? after : before))
</script>

<template>
  <section class="comparison" id="ingenieria">
    <div class="comparison__inner">
      <span class="comparison__eyebrow">No es suerte. Es ingeniería.</span>
      <h2 class="comparison__title">
        Desliza el interruptor para ver<br />
        <span class="comparison__highlight">la diferencia real</span>
      </h2>
      <p class="comparison__lede">
        La misma operación, con y sin el sistema de marketing y ventas que enseñamos en Bakanology Academy.
      </p>

      <div class="comparison__toggle">
        <button
          type="button"
          class="comparison__toggle-btn"
          :class="{ 'comparison__toggle-btn--active': !active }"
          @click="active = false"
        >
          {{ before.label }}
        </button>
        <button
          type="button"
          class="comparison__toggle-switch"
          :class="{ 'comparison__toggle-switch--active': active }"
          @click="active = !active"
          aria-label="Cambiar modo"
        >
          <span />
        </button>
        <button
          type="button"
          class="comparison__toggle-btn"
          :class="{ 'comparison__toggle-btn--active': active }"
          @click="active = true"
        >
          {{ after.label }}
        </button>
      </div>

      <div class="comparison__card" :class="{ 'comparison__card--active': active }">
        <div class="comparison__metrics">
          <div
            v-for="(metric, i) in current.metrics"
            :key="i"
            class="comparison__metric"
          >
            <span class="comparison__metric-label">{{ metric.label }}</span>
            <strong class="comparison__metric-value">{{ metric.value }}</strong>
            <span class="comparison__metric-note">{{ metric.note }}</span>
          </div>
        </div>
      </div>

      <p class="comparison__disclaimer">
        *Datos basados en los resultados reales de clientes de bakano.ec.
      </p>

      <button type="button" class="comparison__cta" @click="open">
        Reservar mi cupo
        <i class="fa-solid fa-heart" />
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.comparison {
  padding-block: clamp(4rem, 8vw, 6rem);
  background: linear-gradient(180deg, $bakano-dark 0%, #0f0d18 100%);
  color: $white;
}

.comparison__inner {
  max-width: 900px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.comparison__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 700;
}

.comparison__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
  margin: 0;
}

.comparison__highlight {
  color: $bakano-pink;
}

.comparison__lede {
  font-family: $font-sans;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba($white, 0.7);
  margin: 0;
  max-width: 56ch;
}

.comparison__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba($white, 0.08);
  padding: 0.4rem;
  border-radius: 999px;
  margin-top: 0.5rem;
}

.comparison__toggle-btn {
  background: none;
  border: none;
  color: rgba($white, 0.6);
  font-family: $font-sans;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 999px;
  transition: all 0.25s ease;

  &--active {
    background: $white;
    color: $bakano-dark;
  }
}

.comparison__toggle-switch {
  width: 3rem;
  height: 1.6rem;
  border-radius: 999px;
  background: rgba($white, 0.15);
  border: none;
  position: relative;
  cursor: pointer;
  transition: background 0.25s ease;

  span {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: $white;
    transition: transform 0.25s ease;
  }

  &--active {
    background: $bakano-pink;

    span {
      transform: translateX(1.4rem);
    }
  }
}

.comparison__card {
  width: 100%;
  background: rgba($white, 0.04);
  border: 1px solid rgba($white, 0.1);
  border-radius: 1.25rem;
  padding: 2rem;
  transition: border-color 0.3s ease;

  &--active {
    border-color: rgba($bakano-green, 0.4);
  }
}

.comparison__metrics {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.comparison__metric {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.comparison__metric-label {
  font-family: $font-mono;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba($white, 0.5);
}

.comparison__metric-value {
  font-family: $font-display;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 800;
  color: $white;

  .comparison__card--active & {
    color: $bakano-green;
  }
}

.comparison__metric-note {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: rgba($white, 0.65);
}

.comparison__disclaimer {
  font-family: $font-sans;
  font-size: 0.75rem;
  color: rgba($white, 0.4);
  margin: 0;
}

.comparison__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: $bakano-green;
  color: $white;
  border: none;
  border-radius: 999px;
  padding: 1rem 1.75rem;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba($bakano-green, 0.35);
  }
}
</style>
