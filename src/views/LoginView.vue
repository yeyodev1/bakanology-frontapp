<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { authService } from '@/services/authService'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthInput from '@/components/auth/AuthInput.vue'
import AuthSubmit from '@/components/auth/AuthSubmit.vue'
import AuthError from '@/components/auth/AuthError.vue'
import AuthToggle from '@/components/auth/AuthToggle.vue'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    const { data } = await authService.login({
      email: email.value.trim(),
      password: password.value,
    })
    userStore.setToken(data.data.token)
    userStore.setUser({
      id: data.data.user.id,
      name: data.data.user.name,
      lastName: data.data.user.lastName,
      email: data.data.user.email,
      profilePicture: data.data.user.profilePicture,
      role: data.data.user.role,
      isVerified: data.data.user.isVerified,
      subscriptionStatus: data.data.user.subscriptionStatus,
      accessUntil: data.data.user.accessUntil,
      foundingMember: data.data.user.foundingMember,
    })

    if (data.data.user.role === 'admin') {
      router.push({ name: 'admin-users' })
    } else if (userStore.hasActiveAccess) {
      router.push({ name: 'dashboard' })
    } else {
      router.push({ name: 'payments' })
    }
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al iniciar sesión. Verifica tus datos.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout title="Bienvenida de nuevo" subtitle="Ingresa para continuar con tu proceso.">
    <form class="auth-form" @submit.prevent="onSubmit">
      <AuthError :message="error" />
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
        placeholder="••••••••"
        autocomplete="current-password"
      />
      <AuthSubmit :loading="loading">Iniciar sesión</AuthSubmit>
      <RouterLink to="/recuperar-contrasena" class="auth-form__link">
        ¿Olvidaste tu contraseña?
      </RouterLink>
    </form>
    <AuthToggle to="/registro" prompt="¿No tienes cuenta?" action="Regístrate" />
  </AuthLayout>
</template>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form__link {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $gray-500;
  text-align: center;
  text-decoration: none;

  &:hover {
    color: $bakano-green;
    text-decoration: underline;
  }
}
</style>
