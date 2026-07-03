<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { paymentService } from '@/services/paymentService'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthSubmit from '@/components/auth/AuthSubmit.vue'

const route = useRoute()
const router = useRouter()

const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('')
const sessionId = ref<string | null>(null)
const email = ref<string | null>(null)
const plainPassword = ref<string | null>(null)
const resending = ref(false)
const resent = ref(false)
const resendError = ref('')

onMounted(async () => {
  const sid = route.query.session_id

  if (!sid || typeof sid !== 'string') {
    status.value = 'error'
    message.value = 'No se encontró la sesión de pago.'
    return
  }

  sessionId.value = sid

  try {
    const { data } = await paymentService.verifyPayment(sid)
    const result = data.data

    status.value = result.status === 'approved' ? 'success' : 'error'
    message.value = result.status === 'approved'
      ? 'Tu pago fue procesado correctamente. Bienvenido a Bakanology Academy.'
      : 'No pudimos confirmar tu pago. Contacta a soporte si el cargo fue realizado.'

    if (result.email) {
      email.value = result.email
    }
    if (result.plainPassword) {
      plainPassword.value = result.plainPassword
    }
  } catch {
    status.value = 'error'
    message.value = 'Ocurrió un error al confirmar el pago.'
  }
})

const goLogin = () => router.push({ name: 'login' })

async function resendEmail() {
  if (!sessionId.value) return
  resending.value = true
  resendError.value = ''
  try {
    await paymentService.resendWelcomeEmail(sessionId.value)
    resent.value = true
  } catch {
    resendError.value = 'No se pudo reenviar. Intenta de nuevo o contacta a soporte.'
  } finally {
    resending.value = false
  }
}
</script>

<template>
  <AuthLayout title="Confirmación de pago" :subtitle="message || 'Estamos confirmando tu transacción...'">
    <div class="payment-state">
      <div v-if="status === 'loading'" class="payment-state__spinner" aria-hidden="true" />
      <div v-else-if="status === 'success'" class="payment-state__icon payment-state__icon--success">
        <i class="fa-solid fa-check" />
      </div>
      <div v-else class="payment-state__icon payment-state__icon--error">
        <i class="fa-solid fa-xmark" />
      </div>

      <div v-if="email" class="payment-state__email-info">
        <p class="payment-state__email-line">
          Te enviamos un correo de confirmación a <strong>{{ email }}</strong>
        </p>

        <div class="payment-state__spam-warning">
          <strong>📌 ¿No encuentras el correo?</strong><br>
          Revisa tu carpeta de <strong>Spam / Correo no deseado</strong>.<br>
          Si está ahí, márcalo como "No es spam" para asegurar la entrega.
        </div>

        <div class="payment-state__resend">
          <button
            v-if="!resent"
            type="button"
            class="payment-state__resend-btn"
            :disabled="resending"
            @click="resendEmail"
          >
            {{ resending ? 'Enviando...' : 'Reenviar correo' }}
          </button>
          <p v-else class="payment-state__resend-ok">✅ Correo reenviado correctamente</p>
          <p v-if="resendError" class="payment-state__resend-err">{{ resendError }}</p>
        </div>
      </div>

      <AuthSubmit v-if="status !== 'loading'" :loading="false" @click="goLogin">
        Iniciar sesión
      </AuthSubmit>
    </div>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.payment-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.payment-state__spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid rgba($bakano-pink, 0.2);
  border-top-color: $bakano-pink;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.payment-state__icon {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.5rem;

  &--success {
    background: $alert-success-bg;
    color: $alert-success;
  }

  &--error {
    background: $alert-error-bg;
    color: $alert-error;
  }
}

.payment-state__email-info {
  width: 100%;
  text-align: center;
}

.payment-state__email-line {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $gray-600;
  margin: 0 0 0.75rem;
}

.payment-state__spam-warning {
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-family: $font-sans;
  font-size: 0.8rem;
  color: #856404;
  line-height: 1.5;
  text-align: left;
}

.payment-state__resend {
  margin-top: 1rem;
}

.payment-state__resend-btn {
  font-family: $font-sans;
  font-size: 0.8rem;
  font-weight: 600;
  color: $bakano-pink;
  background: none;
  border: 1px solid $bakano-pink;
  padding: 0.5rem 1.25rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: $bakano-pink;
    color: $white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.payment-state__resend-ok {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $alert-success;
  margin: 0;
}

.payment-state__resend-err {
  font-family: $font-sans;
  font-size: 0.8rem;
  color: $alert-error;
  margin: 0.25rem 0 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
