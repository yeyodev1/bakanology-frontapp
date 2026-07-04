<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { paymentService } from '@/services/paymentService'
import { usePricingModal } from '@/composables/usePricingModal'

const { isOpen, close } = usePricingModal()

const email = ref('')
const name = ref('')
const lastName = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const isValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return name.value.trim().length >= 2 && lastName.value.trim().length >= 2 && emailRegex.test(email.value)
})

const canSubmit = computed(() => isValid.value && !loading.value)

async function handleSubmit() {
  if (!canSubmit.value) return
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const res = await paymentService.createCheckoutSession({
      email: email.value,
      name: name.value,
      lastName: lastName.value,
      origin: window.location.origin,
    })
    if (res.data?.data?.url) {
      success.value = true
      setTimeout(() => {
        window.location.href = res.data.data.url
      }, 600)
    } else {
      error.value = 'Error al crear la sesión de pago'
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message || e?.message || 'Error al procesar el pago'
  } finally {
    loading.value = false
  }
}

function onClose() {
  if (loading.value) return
  close()
  setTimeout(() => {
    email.value = ''
    name.value = ''
    lastName.value = ''
    error.value = ''
    success.value = false
  }, 300)
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) onClose()
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) onClose()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div v-if="isOpen" class="pricing-modal" @click="handleBackdropClick" role="dialog" aria-modal="true" aria-labelledby="pricing-modal-title">
        <Transition name="modal-card" appear>
          <div class="pricing-modal__card" v-if="isOpen">
            <button type="button" class="pricing-modal__close" @click="onClose" aria-label="Cerrar" :disabled="loading">
              <i class="fa-solid fa-xmark" />
            </button>

            <div class="pricing-modal__header">
              <span class="pricing-modal__eyebrow">Oferta por tiempo limitado</span>
              <h2 id="pricing-modal-title" class="pricing-modal__title">
                Asegura tu acceso de por vida
              </h2>
              <p class="pricing-modal__subtitle">
                Completa tus datos y continúa al pago seguro.
              </p>
            </div>

            <div class="pricing-modal__price">
              <span class="pricing-modal__old">$564</span>
              <div>
                <span class="pricing-modal__currency">$</span>
                <span class="pricing-modal__amount">297</span>
                <span class="pricing-modal__period">USD</span>
              </div>
              <span class="pricing-modal__badge">único pago</span>
            </div>

            <form class="pricing-modal__form" @submit.prevent="handleSubmit">
              <div class="pricing-modal__field">
                <label for="pm-name">Nombre</label>
                <input
                  id="pm-name"
                  v-model="name"
                  type="text"
                  placeholder="Tu nombre"
                  :disabled="loading"
                  autocomplete="given-name"
                />
              </div>

              <div class="pricing-modal__field">
                <label for="pm-lastname">Apellido</label>
                <input
                  id="pm-lastname"
                  v-model="lastName"
                  type="text"
                  placeholder="Tu apellido"
                  :disabled="loading"
                  autocomplete="family-name"
                />
              </div>

              <div class="pricing-modal__field">
                <label for="pm-email">Correo electrónico</label>
                <input
                  id="pm-email"
                  v-model="email"
                  type="email"
                  placeholder="tu@email.com"
                  :disabled="loading"
                  autocomplete="email"
                />
              </div>

              <button
                type="submit"
                class="pricing-modal__submit"
                :disabled="!canSubmit"
              >
                <Transition name="btn-text" mode="out-in">
                  <span v-if="loading" key="loading">
                    <i class="fa-solid fa-circle-notch fa-spin" />
                    Creando pago seguro...
                  </span>
                  <span v-else-if="success" key="success">
                    <i class="fa-solid fa-check" />
                    Redirigiendo...
                  </span>
                  <span v-else key="cta">
                    Quiero este precio
                    <i class="fa-solid fa-arrow-right" />
                  </span>
                </Transition>
              </button>

              <Transition name="fade-error">
                <p v-if="error" class="pricing-modal__error">{{ error }}</p>
              </Transition>
            </form>

            <p class="pricing-modal__secure">
              <i class="fa-solid fa-lock" />
              Pago 100% seguro vía Stripe · Sin renovaciones
            </p>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.pricing-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba($bakano-dark, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  @media (max-width: 480px) {
    padding: 1rem;
    align-items: flex-end;
  }
}

.pricing-modal__card {
  position: relative;
  width: 100%;
  max-width: 460px;
  background: $white;
  border-radius: 1.5rem;
  padding: clamp(1.75rem, 5vw, 2.5rem);
  box-shadow: 0 32px 80px rgba($bakano-dark, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow: hidden;

  @media (max-width: 480px) {
    border-radius: 1.25rem 1.25rem 0 0;
    max-height: 90vh;
    overflow-y: auto;
  }
}

.pricing-modal__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, $bakano-pink, $bakano-purple, $bakano-pink);
}

.pricing-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: none;
  background: $gray-100;
  color: $gray-600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background: $gray-200;
    color: $bakano-dark;
    transform: rotate(90deg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.pricing-modal__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.pricing-modal__eyebrow {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 700;
}

.pricing-modal__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.5rem, 4vw, 1.9rem);
  line-height: 1.1;
  color: $bakano-dark;
  margin: 0;
}

.pricing-modal__subtitle {
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $gray-600;
  margin: 0;
}

.pricing-modal__price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: $bakano-light;
  border-radius: 1rem;

  .pricing-modal__old {
    font-family: $font-sans;
    font-size: 1.2rem;
    color: $gray-400;
    text-decoration: line-through;
  }

  .pricing-modal__currency {
    font-family: $font-sans;
    font-size: 1.4rem;
    font-weight: 700;
    color: $gray-600;
  }

  .pricing-modal__amount {
    font-family: $font-display;
    font-size: clamp(2.5rem, 6vw, 3.2rem);
    font-weight: 800;
    line-height: 1;
    color: $bakano-dark;
  }

  .pricing-modal__period {
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $gray-600;
  }

  .pricing-modal__badge {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: $bakano-pink;
    color: $white;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
  }
}

.pricing-modal__form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.pricing-modal__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  label {
    font-family: $font-sans;
    font-size: 0.8rem;
    font-weight: 600;
    color: $bakano-dark;
  }

  input {
    width: 100%;
    padding: 0.95rem 1rem;
    border: 1px solid $gray-300;
    border-radius: 0.85rem;
    font-family: $font-sans;
    font-size: 1rem;
    color: $bakano-dark;
    background: $white;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: $gray-400;
    }

    &:focus {
      border-color: $bakano-pink;
      box-shadow: 0 0 0 4px rgba($bakano-pink, 0.1);
    }

    &:disabled {
      opacity: 0.6;
      background: $gray-100;
    }
  }
}

.pricing-modal__submit {
  width: 100%;
  padding: 1.05rem;
  margin-top: 0.35rem;
  background: linear-gradient(90deg, $bakano-pink, $bakano-pink-dark);
  color: $white;
  border: none;
  border-radius: 999px;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba($bakano-pink, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  i {
    font-size: 0.9rem;
  }
}

.pricing-modal__error {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $alert-error;
  text-align: center;
  margin: 0;
  padding: 0.5rem;
  background: $alert-error-bg;
  border-radius: 0.5rem;
}

.pricing-modal__secure {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: $font-mono;
  font-size: 0.7rem;
  color: $gray-500;
  margin: 0;

  i {
    font-size: 0.75rem;
  }
}

/* Transitions */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.35s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-card-enter-active,
.modal-card-leave-active {
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0, 1), opacity 0.35s ease;
}

.modal-card-enter-from,
.modal-card-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(20px);
}

.btn-text-enter-active,
.btn-text-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.btn-text-enter-from,
.btn-text-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-error-enter-active,
.fade-error-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-error-enter-from,
.fade-error-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
