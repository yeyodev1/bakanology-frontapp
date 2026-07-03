<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '@/services/authService'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthInput from '@/components/auth/AuthInput.vue'
import AuthSubmit from '@/components/auth/AuthSubmit.vue'
import AuthError from '@/components/auth/AuthError.vue'
import AuthToggle from '@/components/auth/AuthToggle.vue'

const email = ref('')
const loading = ref(false)
const error = ref('')
const sent = ref(false)

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await authService.forgotPassword(email.value.trim())
    sent.value = true
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al solicitar el restablecimiento. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout
    title="Recuperar acceso"
    subtitle="Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña."
  >
    <div v-if="sent" class="auth-success">
      <p>Revisa tu correo. Si la cuenta existe, recibirás un enlace para crear una nueva contraseña.</p>
    </div>
    <form v-else class="auth-form" @submit.prevent="onSubmit">
      <AuthError :message="error" />
      <AuthInput
        id="email"
        label="Correo electrónico"
        type="email"
        v-model="email"
        placeholder="tu@email.com"
        autocomplete="email"
      />
      <AuthSubmit :loading="loading">Enviar enlace</AuthSubmit>
    </form>
    <AuthToggle to="/login" prompt="¿Ya recordaste tu contraseña?" action="Inicia sesión" />
  </AuthLayout>
</template>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-success {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.5;
  color: $gray-600;
  background: $alert-success-bg;
  border: 1px solid rgba($alert-success, 0.15);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;

  p {
    margin: 0;
  }
}
</style>
