<script setup lang="ts">
import { usePricingModal } from '@/composables/usePricingModal'

const { open } = usePricingModal()

const brands = [
  { name: 'Bakano', abbr: 'BK' },
  { name: 'Taz Taz', abbr: 'TZ' },
  { name: 'Sweet Glase', abbr: 'SG' },
  { name: 'Nicole Pastry Arts', abbr: 'NP' },
  { name: 'Sucree', abbr: 'SC' },
]

const results = [
  { icon: 'fa-solid fa-cash-register', label: 'Ventas en punto de venta', value: '$23,000+', body: 'Facturación mensual generada con estrategia de tráfico y conversión en local.', },
  { icon: 'fa-solid fa-motorcycle', label: 'Dark kitchen & delivery', value: '$3,000+', body: 'Creación de producto estrella e identificación de mercado para product-market fit.', },
  { icon: 'fa-solid fa-crown', label: 'Marca & branding', value: 'Top of Mind', body: 'Posicionamiento como marca premium y alta fidelización de clientes recurrentes.', },
]
</script>

<template>
  <section class="results" id="resultados">
    <div class="results__inner">
      <span class="results__eyebrow">Resultados reales, no teoría</span>
      <h2 class="results__title">El sistema detrás de las marcas que conoces</h2>

      <div class="results__brands">
        <div v-for="(brand, i) in brands" :key="i" class="results__brand">
          <span class="results__brand-abbr">{{ brand.abbr }}</span>
          <span class="results__brand-name">{{ brand.name }}</span>
        </div>
      </div>

      <div class="results__grid">
        <article v-for="(r, i) in results" :key="i" class="results__card">
          <div class="results__icon"><i :class="r.icon" /></div>
          <div class="results__meta">
            <span class="results__label">{{ r.label }}</span>
            <strong class="results__value">{{ r.value }}</strong>
            <p class="results__body">{{ r.body }}</p>
          </div>
          <span class="results__verified"><i class="fa-solid fa-check" /> Resultado verificado</span>
        </article>
      </div>

      <button type="button" class="results__cta" @click="open">
        Necesito la fórmula
        <i class="fa-solid fa-glasses" />
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.results {
  padding-block: clamp(4rem, 8vw, 6rem);
  background: $bakano-dark;
  color: $white;
}

.results__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
}

.results__eyebrow {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 700;
}

.results__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
  margin: 0;
}

.results__brands {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.results__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba($white, 0.06);
  border: 1px solid rgba($white, 0.1);
  border-radius: 999px;
  padding: 0.45rem 1rem 0.45rem 0.45rem;
  transition: background 0.25s ease;

  &:hover {
    background: rgba($white, 0.1);
  }
}

.results__brand-abbr {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: $bakano-pink;
  color: $white;
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.results__brand-name {
  font-family: $font-sans;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba($white, 0.9);
}

.results__grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.results__card {
  background: rgba($white, 0.04);
  border: 1px solid rgba($white, 0.08);
  border-radius: 1.25rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: rgba($bakano-pink, 0.35);
    transform: translateY(-4px);
  }
}

.results__icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: rgba($bakano-pink, 0.15);
  color: $bakano-pink;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.results__meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.results__label {
  font-family: $font-mono;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba($white, 0.5);
}

.results__value {
  font-family: $font-display;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: $white;
}

.results__body {
  font-family: $font-sans;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba($white, 0.7);
  margin: 0;
}

.results__verified {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: $font-mono;
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $bakano-green;
  margin-top: auto;

  i {
    font-size: 0.7rem;
  }
}

.results__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: $white;
  border: 1px solid rgba($white, 0.3);
  border-radius: 999px;
  padding: 0.95rem 1.75rem;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: $white;
    color: $bakano-dark;
    border-color: $white;
  }
}
</style>
