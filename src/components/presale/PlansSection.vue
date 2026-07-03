<script setup lang="ts">
import { ref, computed } from 'vue'
import { paymentService } from '@/services/paymentService'

const email = ref('')
const name = ref('')
const lastName = ref('')
const loading = ref(false)
const error = ref('')

const isValid = computed(() => email.value && name.value && lastName.value)

async function payWithStripe() {
  if (!isValid.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await paymentService.createCheckoutSession({
      email: email.value,
      name: name.value,
      lastName: lastName.value,
      origin: window.location.origin,
    })
    if (res.data?.data?.url) {
      window.location.href = res.data.data.url
    } else {
      error.value = 'Error al crear la sesión de pago'
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message || e?.message || 'Error al procesar el pago'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section id="planes" class="plans">
    <div class="plans__inner">
      <span class="plans__eyebrow">Precio de lanzamiento</span>
      <h2 class="plans__title">Asegura tu acceso de por vida</h2>
      <p class="plans__lede">
        <strong>30 cupos</strong> disponibles para miembros fundadores.
        Este precio es por tiempo limitado y nunca volverá a estar disponible.
      </p>

      <div class="plans__card">
        <div class="plans__card-badge">Miembro fundador</div>
        <h3 class="plans__card-name">Acceso de por vida</h3>
        <p class="plans__card-desc">Paga una sola vez y accede para siempre a Bakanology Academy</p>
        <div class="plans__card-price">
          <span class="plans__card-currency">$</span>
          <span class="plans__card-amount">297</span>
        </div>
        <span class="plans__card-period">Pago único — Sin renovaciones</span>
        <ul class="plans__card-features">
          <li><i class="fa-solid fa-check" /> Cursos de marketing de performance</li>
          <li><i class="fa-solid fa-check" /> CRM propio incluido</li>
          <li><i class="fa-solid fa-check" /> Soporte continuo del equipo</li>
          <li><i class="fa-solid fa-check" /> Certificación al completar</li>
          <li><i class="fa-solid fa-check" /> Todas las actualizaciones futuras</li>
        </ul>

        <div class="plans__form">
          <input
            v-model="name"
            type="text"
            placeholder="Nombre"
            class="plans__input"
            :disabled="loading"
          />
          <input
            v-model="lastName"
            type="text"
            placeholder="Apellido"
            class="plans__input"
            :disabled="loading"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Correo electrónico"
            class="plans__input"
            :disabled="loading"
          />
        </div>

        <button
          type="button"
          class="plans__card-btn"
          :disabled="loading || !isValid"
          @click="payWithStripe"
        >
          <span v-if="loading">Procesando...</span>
          <span v-else>Pagar $297 — Acceso de por vida</span>
        </button>
        <p v-if="error" class="plans__card-error">{{ error }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.plans {
  padding-block: 5rem 4rem;
  background: $bakano-light;
}

.plans__inner {
  max-width: 720px;
  margin: 0 auto;
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.plans__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 600;
}

.plans__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: $bakano-dark;
  margin: 0;
}

.plans__lede {
  font-family: $font-sans;
  color: $gray-600;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 540px;
  margin: 0;
}

.plans__card {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  box-shadow: 0 4px 24px rgba($bakano-dark, 0.06);
}

.plans__card-badge {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: $bakano-pink;
  color: $white;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-weight: 600;
}

.plans__card-name {
  font-family: $font-display;
  font-weight: 700;
  font-size: 1.5rem;
  color: $bakano-dark;
  margin: 0;
}

.plans__card-desc {
  font-family: $font-sans;
  color: $gray-500;
  font-size: 0.9rem;
  margin: 0;
}

.plans__card-price {
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
}

.plans__card-currency {
  font-family: $font-sans;
  font-size: 1.5rem;
  color: $gray-600;
  font-weight: 600;
}

.plans__card-amount {
  font-family: $font-display;
  font-weight: 800;
  font-size: 3.5rem;
  color: $bakano-dark;
  line-height: 1;
}

.plans__card-period {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: $gray-500;
  text-transform: uppercase;
  margin-top: -0.5rem;
}

.plans__card-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  margin: 0;
  width: 100%;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $gray-700;

    i {
      color: $bakano-green;
      font-size: 0.85rem;
      width: 1rem;
    }
  }
}

.plans__form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.plans__input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid $gray-300;
  border-radius: 0.5rem;
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $bakano-dark;
  background: $white;
  transition: border-color 0.2s;
  outline: none;

  &::placeholder {
    color: $gray-400;
  }

  &:focus {
    border-color: $bakano-pink;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.plans__card-btn {
  width: 100%;
  padding: 1rem;
  background: $bakano-pink;
  color: $white;
  border: none;
  border-radius: 0.5rem;
  font-family: $font-sans;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background .25s ease;

  &:hover:not(:disabled) {
    background: $bakano-pink-dark;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.plans__card-error {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $alert-error;
  margin: 0;
}
</style>
