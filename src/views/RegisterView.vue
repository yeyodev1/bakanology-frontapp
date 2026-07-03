<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '@/services/authService'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthInput from '@/components/auth/AuthInput.vue'
import AuthSubmit from '@/components/auth/AuthSubmit.vue'
import AuthError from '@/components/auth/AuthError.vue'
import AuthToggle from '@/components/auth/AuthToggle.vue'

const name = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await authService.register({
      name: name.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value,
    })
    success.value = true
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al crear la cuenta. Inténtalo de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout
    v-if="!success"
    title="Crear cuenta"
    subtitle="Regístrate para asegurar tu cupo en la comunidad anual."
  >
    <form class="auth-form" @submit.prevent="onSubmit">
      <AuthError :message="error" />
      <AuthInput
        id="name"
        label="Nombre"
        type="text"
        v-model="name"
        placeholder="Tu nombre"
        autocomplete="given-name"
      />
      <AuthInput
        id="lastName"
        label="Apellido"
        type="text"
        v-model="lastName"
        placeholder="Tu apellido"
        autocomplete="family-name"
      />
      <AuthInput
        id="email"
        label="Correo electrónico"
        type="email"
        v-model="email"
        placeholder="tu@email.com"
        autocomplete="email"
      />
      <AuthInput
        id="password"
        label="Contraseña"
        type="password"
        v-model="password"
        placeholder="Mínimo 8 caracteres"
        autocomplete="new-password"
      />
      <AuthSubmit :loading="loading">Crear cuenta</AuthSubmit>
    </form>
    <AuthToggle to="/login" prompt="¿Ya tienes cuenta?" action="Inicia sesión" />
  </AuthLayout>

  <AuthLayout
    v-else
    title="¡Cuenta creada!"
    subtitle="Te enviamos un correo para verificar tu cuenta. Haz clic en el enlace y automáticamente te llevaremos a elegir tu plan."
  >
    <RouterLink :to="{ name: 'login' }" class="register-success__link">
      Iniciar sesión
    </RouterLink>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.register-success__link {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 999px;
  background: $bakano-dark;
  color: $white;
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background: $bakano-green;
  }
}

.register-success__countdown {
  font-family: $font-sans;
  font-size: 0.7rem;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  opacity: 0.85;
  margin-top: 0.25rem;
}

.register-success__secondary {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $gray-500;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: $bakano-dark;
  }
}
</style>
