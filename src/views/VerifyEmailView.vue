<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { authService } from '@/services/authService'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthSubmit from '@/components/auth/AuthSubmit.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('')

  onMounted(async () => {
  const token = route.query.token
  if (!token || typeof token !== 'string') {
    status.value = 'error'
    message.value = 'El enlace de verificación no es válido o ha expirado.'
    return
  }

  try {
    const { data } = await authService.verify(token)
    if (data.data.token) {
      userStore.setToken(data.data.token)
    }
    if (data.data.user) {
      userStore.setUser(data.data.user)
    }
    status.value = 'success'
    const hasAccess = userStore.hasActiveAccess
    message.value = data.message || (hasAccess
      ? 'Tu correo ha sido verificado correctamente. Redirigiendo a tu cuenta...'
      : 'Tu correo ha sido verificado. Redirigiendo a la página de pago...')
    setTimeout(() => {
      if (hasAccess) {
        router.push({ name: 'dashboard' })
      } else {
        router.push({ name: 'payments' })
      }
    }, 1500)
  } catch (err: unknown) {
    status.value = 'error'
    const e = err as { message?: string }
    message.value = e.message || 'No pudimos verificar tu correo. El enlace puede haber expirado.'
  }
})

const goToApp = () => router.push({ name: 'dashboard' })
</script>

<template>
  <AuthLayout title="Verificación de correo" :subtitle="message || 'Estamos verificando tu enlace...'">
    <div class="verify-state">
      <div v-if="status === 'loading'" class="verify-state__spinner" aria-hidden="true" />
      <div v-else-if="status === 'success'" class="verify-state__icon verify-state__icon--success">
        <i class="fa-solid fa-check" />
      </div>
      <div v-else class="verify-state__icon verify-state__icon--error">
        <i class="fa-solid fa-xmark" />
      </div>

      <AuthSubmit v-if="status !== 'loading'" :loading="false" @click="goToApp">
        Ir a mi cuenta
      </AuthSubmit>
    </div>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.verify-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.verify-state__spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid rgba($bakano-green, 0.2);
  border-top-color: $bakano-green;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.verify-state__icon {
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

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
