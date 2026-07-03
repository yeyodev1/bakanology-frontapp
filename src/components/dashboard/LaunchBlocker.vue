<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import CountdownTimer from '@/components/ui/CountdownTimer.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { launchReminderService } from '@/services/launchReminderService'

const props = defineProps<{
  deadline: string
}>()

const router = useRouter()
const userStore = useUserStore()
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const message = ref('')

const isBeforeLaunch = computed(() => {
  return new Date().getTime() < new Date(props.deadline).getTime()
})

const email = computed(() => userStore.email || '')

function logout() {
  userStore.logout()
  router.push('/login')
}

async function setReminder() {
  if (!email.value) {
    status.value = 'error'
    message.value = 'No hay un correo disponible. Inicia sesión de nuevo.'
    return
  }

  status.value = 'loading'
  try {
    const response = await launchReminderService.create()
    status.value = 'success'
    message.value = response.data.alreadyRegistered
      ? 'Ya te habías registrado. Te avisamos en el lanzamiento.'
      : 'Listo. Te avisamos cuando abramos las puertas.'
  } catch (err: unknown) {
    status.value = 'error'
    const error = err as { message?: string }
    message.value = error.message || 'No se pudo guardar el recordatorio. Intenta de nuevo.'
  }
}
</script>

<template>
  <div v-if="isBeforeLaunch" class="launch-blocker">
    <div class="launch-blocker__card">
      <div class="launch-blocker__brand">
        <span class="launch-blocker__logo">Bakanology</span>
        <span class="launch-blocker__tag">Academy · bakano.ec</span>
      </div>

      <h1 class="launch-blocker__title">
        Estamos preparando<br />algo increíble para ti
      </h1>
      <p class="launch-blocker__subtitle">
        El contenido completo de la academia se abre el 31 de julio.
      </p>

      <CountdownTimer :target="deadline" label="Lanzamiento en" class="launch-blocker__timer" />

      <div class="launch-blocker__reminder">
        <p class="launch-blocker__reminder-text">
          ¿Quieres que te recordemos?
        </p>
        <AppButton
          :loading="status === 'loading'"
          :disabled="status === 'success'"
          @click="setReminder"
        >
          {{ status === 'success' ? 'Recordatorio guardado' : `Avísame a ${email}` }}
        </AppButton>
        <p
          v-if="message"
          class="launch-blocker__message"
          :class="{
            'launch-blocker__message--success': status === 'success',
            'launch-blocker__message--error': status === 'error',
          }"
        >
          {{ message }}
        </p>
      </div>

      <RouterLink :to="{ name: 'payments' }" class="launch-blocker__payments-link">
        Ver estado de mi pago
      </RouterLink>

      <button type="button" class="launch-blocker__logout" @click="logout">
        Cerrar sesión
      </button>

      <p class="launch-blocker__footer">
        Mientras tanto, tu acceso está reservado y tu pago está seguro.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.launch-blocker {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 180px);
  padding: 1.5rem 0;
}

.launch-blocker__card {
  width: 100%;
  max-width: 560px;
  padding: 2.5rem 2rem;
  background: $light;
  border-radius: 1.5rem;
  box-shadow: 0 24px 80px rgba($bakano-dark, 0.08);
  text-align: center;
}

.launch-blocker__brand {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1.75rem;
}

.launch-blocker__logo {
  font-family: $font-display;
  font-size: 1.5rem;
  font-weight: 800;
  color: $bakano-dark;
}

.launch-blocker__tag {
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: $bakano-pink;
}

.launch-blocker__title {
  font-family: $font-display;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.15;
  color: $bakano-dark;
  margin-bottom: 0.75rem;
}

.launch-blocker__subtitle {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.5;
  color: $gray-500;
  margin-bottom: 2rem;
}

.launch-blocker__timer {
  margin-bottom: 2rem;
}

.launch-blocker__reminder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  background: rgba($bakano-pink, 0.05);
  border: 1px solid rgba($bakano-pink, 0.12);
  border-radius: 1rem;
  margin-bottom: 1.25rem;
}

.launch-blocker__reminder-text {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $bakano-dark;
  margin: 0;
}

.launch-blocker__message {
  font-family: $font-sans;
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;

  &--success {
    color: $bakano-green;
  }

  &--error {
    color: $alert-error;
  }
}

.launch-blocker__payments-link {
  display: inline-block;
  font-family: $font-sans;
  font-size: 0.85rem;
  font-weight: 500;
  color: $bakano-pink;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.launch-blocker__logout {
  display: block;
  margin: 0 auto 1.25rem;
  padding: 0;
  background: transparent;
  border: none;
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $gray-500;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: $bakano-dark;
  }
}

.launch-blocker__footer {
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $gray-500;
  margin: 0;
}

@media (max-width: 600px) {
  .launch-blocker__card {
    padding: 2rem 1.25rem;
  }

  .launch-blocker__title {
    font-size: 1.6rem;
  }
}
</style>
