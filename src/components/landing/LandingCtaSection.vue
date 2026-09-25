<script setup lang="ts">
import { usePricingModal } from '@/composables/usePricingModal'

const { open } = usePricingModal()
</script>

<template>
  <section class="final-cta" id="cta-final">
    <div class="final-cta__inner">
      <span class="final-cta__eyebrow">Oferta por tiempo limitado</span>
      <h2 class="final-cta__title">
        Llévate 12 meses<br />
        <span class="final-cta__highlight">al precio de 6</span>
      </h2>
      <p class="final-cta__lede">
        Un año completo de Bakanology Academy con CRM y Telegram VIP incluidos. O empieza con el plan mensual de $47 y cancela cuando quieras.
      </p>
      <div class="final-cta__price">
        <span class="final-cta__old">$564</span>
        <div>
          <span class="final-cta__currency">$</span>
          <span class="final-cta__amount">282</span>
          <span class="final-cta__period">/ año</span>
        </div>
      </div>
      <div class="final-cta__actions">
        <button type="button" class="final-cta__btn" @click="open('annual')">
          Quiero 6 meses gratis
          <i class="fa-solid fa-arrow-right" />
        </button>
      </div>
      <div class="final-cta__legal">
        <p>Oferta de lanzamiento válida por tiempo limitado.</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.final-cta {
  padding-block: clamp(4rem, 8vw, 6rem);
  background: var(--c-ink);
  position: relative;
  overflow: hidden;
}

.final-cta__inner {
  max-width: 640px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.final-cta__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--c-accent-text);
  font-weight: 700;
}

.final-cta__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
  color: var(--c-on-accent);
  margin: 0;
}

.final-cta__highlight {
  color: var(--c-accent-text);
}

.final-cta__lede {
  font-family: $font-sans;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgb(var(--c-on-accent-rgb) / 0.75);
  margin: 0;
  max-width: 52ch;
}

.final-cta__price {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-top: 0.5rem;
}

.final-cta__old {
  font-family: $font-sans;
  font-size: 1.4rem;
  color: rgb(var(--c-on-accent-rgb) / 0.35);
  text-decoration: line-through;
}

.final-cta__currency {
  font-family: $font-sans;
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(var(--c-on-accent-rgb) / 0.7);
}

.final-cta__amount {
  font-family: $font-display;
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  color: var(--c-on-accent);
}

.final-cta__period {
  font-family: $font-sans;
  font-size: 1.1rem;
  color: rgb(var(--c-on-accent-rgb) / 0.7);
}

.final-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.final-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1.1rem 2.25rem;
  border-radius: 999px;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  text-decoration: none;
  background: linear-gradient(90deg, var(--c-accent-fill), var(--c-accent-fill-hover));
  color: var(--c-on-accent);
  box-shadow: 0 10px 32px rgb(var(--c-accent-rgb) / 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 40px rgb(var(--c-accent-rgb) / 0.5);
  }
}

.final-cta__legal {
  margin-top: 0.5rem;

  p {
    font-family: $font-sans;
    font-size: 0.8rem;
    color: rgb(var(--c-on-accent-rgb) / 0.35);
    margin: 0;
  }
}
</style>
