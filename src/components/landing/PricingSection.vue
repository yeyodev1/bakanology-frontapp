<script setup lang="ts">
import { usePricingModal } from '@/composables/usePricingModal'

const { open } = usePricingModal()

const monthlyFeatures = [
  { label: 'Acceso a todos los cursos', included: true },
  { label: 'Nuevos cursos cada mes', included: true },
  { label: 'Soporte continuo del equipo', included: true },
  { label: 'Cancela cuando quieras', included: true },
  { label: 'CRM Bakanology incluido', included: false },
  { label: 'Telegram VIP incluido', included: false },
]

const annualFeatures = [
  { label: 'Acceso a todos los cursos', included: true },
  { label: 'Nuevos cursos cada mes', included: true },
  { label: 'Soporte continuo del equipo', included: true },
  { label: '12 meses al precio de 6', included: true },
  { label: 'CRM Bakanology incluido', included: true },
  { label: 'Telegram VIP incluido', included: true },
]
</script>

<template>
  <section class="pricing" id="planes">
    <div class="pricing__inner">
      <span class="pricing__eyebrow">⚠️ Oferta de lanzamiento por tiempo limitado</span>
      <h2 class="pricing__title">¿Por qué esta es una oportunidad matemática?</h2>
      <p class="pricing__lede">
        Suscríbete por $47 al mes, o llévate 12 meses al precio de 6. Los números hablan solos:
      </p>

      <div class="pricing__comparison">
        <article class="pricing__column pricing__column--subscriber">
          <span class="pricing__badge pricing__badge--outline">Plan mensual</span>
          <h3 class="pricing__column-title">Flexibilidad total</h3>
          <div class="pricing__price">
            <span class="pricing__currency">$</span>
            <span class="pricing__amount">47</span>
            <span class="pricing__period">/ mes</span>
          </div>
          <p class="pricing__note">$564 al año · sin permanencia</p>
          <ul class="pricing__features">
            <li v-for="(f, i) in monthlyFeatures" :key="i" :class="{ 'pricing__feature--missing': !f.included }">
              <i :class="f.included ? 'fa-solid fa-check' : 'fa-solid fa-xmark'" aria-hidden="true" />
              <span v-if="!f.included" class="sr-only">No incluido:</span>
              {{ f.label }}
            </li>
          </ul>
          <button type="button" class="pricing__column-btn" @click="open('monthly')">
            Quiero el plan mensual
          </button>
        </article>

        <article class="pricing__column pricing__column--founder">
          <span class="pricing__badge pricing__badge--highlight">Mejor inversión</span>
          <h3 class="pricing__column-title">Plan anual</h3>
          <p class="pricing__spots">6 meses gratis por lanzamiento</p>
          <div class="pricing__price">
            <span class="pricing__old">$564</span>
            <span class="pricing__currency">$</span>
            <span class="pricing__amount">282</span>
            <span class="pricing__period">/ año</span>
          </div>
          <p class="pricing__note">Equivale a $23.50 al mes · ahorras $282</p>
          <ul class="pricing__features">
            <li v-for="(f, i) in annualFeatures" :key="i">
              <i class="fa-solid fa-check" aria-hidden="true" />
              {{ f.label }}
            </li>
          </ul>
          <button type="button" class="pricing__cta" @click="open('annual')">
            Quiero 6 meses gratis
            <i class="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
          <p class="pricing__secure">
            <i class="fa-solid fa-lock" aria-hidden="true" />
            Pago 100% seguro vía Stripe
          </p>
        </article>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.pricing {
  scroll-margin-top: 5.5rem;
  padding-block: clamp(4rem, 8vw, 6rem);
  background: $bakano-light;
  color: $bakano-dark;
}

.pricing__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.pricing__eyebrow {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba($alert-warning, 0.15);
  color: #b45309;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  font-weight: 700;
}

.pricing__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
  margin: 0;
}

.pricing__lede {
  font-family: $font-sans;
  font-size: 1rem;
  color: $gray-600;
  margin: 0;
  max-width: 54ch;
}

.pricing__comparison {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1rem;

  @media (min-width: 720px) {
    flex-direction: row;
    align-items: stretch;

    > * {
      flex: 1 1 0;
    }
  }
}

.pricing__column {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;

  &--founder {
    order: -1;
    border: 2px solid $bakano-pink;
    box-shadow: 0 16px 48px rgba($bakano-pink, 0.14);
  }

  @media (min-width: 720px) {
    padding: 2.5rem 2rem;

    &--founder {
      order: 0;
    }
  }
}

.pricing__badge {
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;

  &--outline {
    border: 1px solid $gray-300;
    color: $gray-600;
  }

  &--highlight {
    background: $bakano-pink;
    color: $white;
  }
}

.pricing__column-title {
  font-family: $font-sans;
  font-size: 1rem;
  font-weight: 700;
  color: $bakano-dark;
  margin: 0;
}

.pricing__spots {
  font-family: $font-mono;
  font-size: 0.7rem;
  color: $bakano-pink;
  font-weight: 700;
  margin: 0;
}

.pricing__price {
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  margin-top: 0.5rem;
}

.pricing__currency {
  font-family: $font-sans;
  font-size: 1.4rem;
  font-weight: 700;
  color: $gray-600;
}

.pricing__amount {
  font-family: $font-display;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1;
  color: $bakano-dark;
}

.pricing__period {
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $gray-600;
}

.pricing__note {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $gray-500;
  margin: -0.25rem 0 0.5rem;
}

.pricing__features {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  text-align: left;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: $font-sans;
    font-size: 0.9rem;
    color: $gray-700;

    i {
      font-size: 0.85rem;
      width: 1rem;
      color: $bakano-green;
    }
  }
}

.pricing__feature--missing {
  color: $gray-400;

  i {
    color: $gray-400 !important;
  }
}

.pricing__column-btn {
  width: 100%;
  padding: 0.85rem;
  margin-top: auto;
  background: transparent;
  color: $bakano-dark;
  border: 1.5px solid $gray-300;
  border-radius: 999px;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: $bakano-dark;
    background: $gray-100;
    transform: translateY(-2px);
  }
}

.pricing__old {
  align-self: center;
  margin-right: 0.5rem;
  font-family: $font-sans;
  font-size: 1.1rem;
  color: $gray-400;
  text-decoration: line-through;
}

.pricing__cta {
  width: 100%;
  padding: 1rem;
  margin-top: auto;
  background: linear-gradient(90deg, $bakano-pink, $bakano-pink-dark);
  color: $white;
  border: none;
  border-radius: 999px;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba($bakano-pink, 0.4);
  }

  i {
    transition: transform 0.25s ease;
  }

  &:hover i {
    transform: translateX(4px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.pricing__secure {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: $font-mono;
  font-size: 0.7rem;
  color: $gray-500;
  margin: 0;

  i {
    font-size: 0.75rem;
  }
}
</style>
