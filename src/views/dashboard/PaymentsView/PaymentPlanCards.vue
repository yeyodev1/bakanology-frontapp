<script setup lang="ts">
defineProps<{
  loading: boolean
  annualPrice: number
}>()

const emit = defineEmits<{
  (e: 'pay-annual'): void
}>()
</script>

<template>
  <section class="plans">
    <h3 class="plans__title">Plan disponible</h3>
    <div class="plans__list">
      <div class="plan plan--featured">
        <div class="plan__badge plan__badge--featured">Recomendado</div>

        <div class="plan__header">
          <span class="plan__name">Anualidad</span>
        </div>
        <div class="plan__pricing">
          <span class="plan__price">USD {{ annualPrice }}</span>
          <span class="plan__year">/ año</span>
        </div>

        <div class="plan__deal">
          <div class="plan__deal-icon">
            <i class="fa-solid fa-arrow-right-arrow-left" />
          </div>
          <div class="plan__deal-cols">
            <div class="plan__deal-col">
              <span class="plan__deal-label">Pagas</span>
              <span class="plan__deal-value">6 meses</span>
            </div>
            <div class="plan__deal-arrow"><i class="fa-solid fa-arrow-right-long" /></div>
            <div class="plan__deal-col">
              <span class="plan__deal-label">Recibes</span>
              <span class="plan__deal-value plan__deal-value--highlight">12 meses</span>
            </div>
          </div>
        </div>

        <div class="plan__compare">
          <div class="plan__compare-row">
            <span class="plan__compare-label">Valor regular</span>
            <span class="plan__compare-old">USD 470</span>
          </div>
          <div class="plan__compare-row">
            <span class="plan__compare-label">Preventa</span>
            <span class="plan__compare-new">USD {{ annualPrice }}</span>
          </div>
          <div class="plan__compare-divider" />
          <div class="plan__compare-row plan__compare-row--total">
            <span class="plan__compare-label">Ahorras</span>
            <span class="plan__compare-save">USD {{ 470 - annualPrice }}</span>
          </div>
        </div>

        <button class="plan__cta" :disabled="loading" @click="emit('pay-annual')">
          <i class="fa-regular fa-credit-card" />
          {{ loading ? 'Preparando…' : 'Pagar con tarjeta' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.plans {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.plans__title {
  font-family: $font-display;
  font-size: 1.25rem;
  font-weight: 600;
  color: $bakano-dark;
  margin: 0;
}

.plans__list {
  max-width: 450px;
}

.plan {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: $light;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem 1.5rem;

  &--featured {
    border-color: $bakano-green;
    box-shadow: 0 12px 32px rgba($bakano-green, 0.1);
  }
}

.plan__badge {
  position: absolute;
  top: -0.6rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  white-space: nowrap;

  &--featured { background: $bakano-green; color: $white; }
}

.plan__header {
  margin-top: 0.5rem;
}

.plan__name {
  font-family: $font-display;
  font-size: 1.15rem;
  font-weight: 600;
  color: $bakano-dark;
}

.plan__pricing {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.plan__price {
  font-family: $font-display;
  font-size: 2.4rem;
  font-weight: 600;
  color: $bakano-green;
  line-height: 1.1;
}

.plan__year {
  font-family: $font-mono;
  font-size: 0.7rem;
  color: $gray-500;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.plan__deal {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, rgba($bakano-pink, 0.08) 0%, rgba($bakano-pink, 0.03) 100%);
  border: 1px solid rgba($bakano-pink, 0.15);
  border-radius: 0.75rem;
}

.plan__deal-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bakano-pink;
  border-radius: 50%;
  flex-shrink: 0;
  color: $white;
  font-size: 1rem;
}

.plan__deal-cols {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.plan__deal-col {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.plan__deal-label {
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $gray-500;
}

.plan__deal-value {
  font-family: $font-display;
  font-size: 1.1rem;
  font-weight: 600;
  color: $bakano-dark;

  &--highlight {
    color: $bakano-green;
  }
}

.plan__deal-arrow {
  color: $gray-500;
  font-size: 1rem;
}

.plan__compare {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.85rem 1rem;
  background: var(--cream);
  border-radius: 0.75rem;
}

.plan__compare-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &--total { padding-top: 0.35rem; }
}

.plan__compare-label {
  font-family: $font-sans;
  font-size: 0.8rem;
  color: $gray-600;
}

.plan__compare-old {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $gray-500;
  text-decoration: line-through;
}

.plan__compare-new {
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 700;
  color: $bakano-green;
}

.plan__compare-divider {
  height: 1px;
  background: var(--border);
  margin: 0.15rem 0;
}

.plan__compare-save {
  font-family: $font-mono;
  font-size: 0.85rem;
  font-weight: 700;
  color: $bakano-green;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.plan__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: $bakano-green;
  color: $white;
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.9rem 1.25rem;
  border: none;
  border-radius: 999px;
  transition: background 0.2s ease, opacity 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) { background: darken(#3bb77e, 8%); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

@media (max-width: 900px) {
  .plan__badge {
    position: static;
    transform: none;
    width: fit-content;
  }

  .plan__header { margin-top: 0; }
}
</style>
