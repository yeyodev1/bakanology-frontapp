<script setup lang="ts">
import { usePricingModal } from '@/composables/usePricingModal'

const { open } = usePricingModal()

const subscriberFeatures = [
  { label: 'Acceso a todos los cursos', included: true },
  { label: 'CRM propio incluido', included: true },
  { label: 'Soporte continuo del equipo', included: true },
  { label: 'Nuevos cursos cada mes', included: true },
  { label: 'Auditoría 1 a 1 si no tienes resultados', included: false },
  { label: 'Acceso de por vida', included: false },
]

const founderFeatures = [
  { label: 'Acceso a todos los cursos', included: true },
  { label: 'CRM propio incluido', included: true },
  { label: 'Soporte continuo del equipo', included: true },
  { label: 'Nuevos cursos cada mes', included: true },
  { label: 'Auditoría 1 a 1 si no tienes resultados', included: true },
  { label: 'Acceso de por vida', included: true },
]
</script>

<template>
  <section class="pricing" id="planes">
    <div class="pricing__inner">
      <span class="pricing__eyebrow">⚠️ El modelo cambia pronto</span>
      <h2 class="pricing__title">¿Por qué esta es una oportunidad matemática?</h2>
      <p class="pricing__lede">
        Pronto pasaremos a un modelo de suscripción mensual. Los números hablan solos:
      </p>

      <div class="pricing__comparison">
        <article class="pricing__column pricing__column--subscriber">
          <span class="pricing__badge pricing__badge--outline">Cliente suscriptor</span>
          <h3 class="pricing__column-title">A partir del próximo mes</h3>
          <div class="pricing__price">
            <span class="pricing__currency">$</span>
            <span class="pricing__amount">564</span>
            <span class="pricing__period">/ año</span>
          </div>
          <p class="pricing__note">($47 al mes)</p>
          <ul class="pricing__features">
            <li v-for="(f, i) in subscriberFeatures" :key="i" :class="{ 'pricing__feature--missing': !f.included }">
              <i :class="f.included ? 'fa-solid fa-check' : 'fa-solid fa-xmark'" />
              {{ f.label }}
            </li>
          </ul>
        </article>

        <article class="pricing__column pricing__column--founder">
          <span class="pricing__badge pricing__badge--highlight">Mejor inversión</span>
          <h3 class="pricing__column-title">Miembro fundador</h3>
          <p class="pricing__spots">Solo 30 cupos restantes</p>
          <div class="pricing__price">
            <span class="pricing__currency">$</span>
            <span class="pricing__amount">297</span>
            <span class="pricing__period">/ único pago</span>
          </div>
          <p class="pricing__note">Acceso de por vida</p>
          <ul class="pricing__features">
            <li v-for="(f, i) in founderFeatures" :key="i">
              <i class="fa-solid fa-check" />
              {{ f.label }}
            </li>
          </ul>
          <p class="pricing__savings">Ahorro: $267 USD cada año</p>
        </article>
      </div>

      <div class="pricing__card">
        <span class="pricing__card-badge">Mejor oferta disponible</span>
        <h3 class="pricing__card-title">Be founder</h3>
        <p class="pricing__card-subtitle">Acceso de por vida a toda Bakanology Academy</p>
        <div class="pricing__card-price">
          <span class="pricing__card-old">$564</span>
          <div>
            <span class="pricing__card-currency">$</span>
            <span class="pricing__card-amount">297</span>
            <span class="pricing__card-period">USD</span>
          </div>
        </div>

        <ul class="pricing__card-features">
          <li><i class="fa-solid fa-check" /> Acceso a todos los cursos</li>
          <li><i class="fa-solid fa-check" /> CRM propio incluido</li>
          <li><i class="fa-solid fa-check" /> Comunidad privada de dueños</li>
          <li><i class="fa-solid fa-check" /> Actualizaciones de por vida</li>
        </ul>

        <button
          type="button"
          class="pricing__card-btn"
          @click="open"
        >
          Quiero este precio
          <i class="fa-solid fa-arrow-right" />
        </button>

        <p class="pricing__secure">
          <i class="fa-solid fa-lock" />
          Pago 100% seguro vía Stripe
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.pricing {
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
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-top: 1rem;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
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
    border-color: $bakano-pink;
    box-shadow: 0 8px 32px rgba($bakano-pink, 0.12);
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
  margin: 0;
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

.pricing__savings {
  font-family: $font-sans;
  font-size: 0.85rem;
  font-weight: 700;
  color: $bakano-green;
  margin: 0.5rem 0 0;
}

.pricing__card {
  width: 100%;
  max-width: 420px;
  background: $white;
  border: 2px solid $bakano-pink;
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 16px 48px rgba($bakano-pink, 0.14);
  margin-top: 1rem;
}

.pricing__card-badge {
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff8a65, $bakano-pink);
  color: $white;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
}

.pricing__card-title {
  font-family: $font-display;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  margin: 0;
}

.pricing__card-subtitle {
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $gray-600;
  margin: -0.5rem 0 0;
}

.pricing__card-price {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.pricing__card-old {
  font-family: $font-sans;
  font-size: 1.3rem;
  color: $gray-400;
  text-decoration: line-through;
}

.pricing__card-currency {
  font-family: $font-sans;
  font-size: 1.6rem;
  font-weight: 700;
  color: $gray-600;
}

.pricing__card-amount {
  font-family: $font-display;
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  color: $bakano-dark;
}

.pricing__card-period {
  font-family: $font-sans;
  font-size: 1rem;
  color: $gray-600;
}

.pricing__card-features {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: $font-sans;
    font-size: 0.92rem;
    color: $gray-700;

    i {
      color: $bakano-green;
      font-size: 0.85rem;
      width: 1rem;
    }
  }
}

.pricing__card-btn {
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
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
