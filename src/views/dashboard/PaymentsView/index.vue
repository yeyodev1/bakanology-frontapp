<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { paymentService } from '@/services/paymentService'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import PaymentAlerts from './PaymentAlerts.vue'
import PaymentHero from './PaymentHero.vue'
import PendingBanner from './PendingBanner.vue'
import PaymentPlanCards from './PaymentPlanCards.vue'
import CancelSection from './CancelSection.vue'
import PaymentHistory from './PaymentHistory.vue'
import type { PaymentItem } from './PaymentHistory.vue'

const userStore = useUserStore()

const loading = ref(false)
const cancelLoading = ref(false)
const cancelPendingLoading = ref(false)
const error = ref('')
const success = ref('')
const showCancelSubModal = ref(false)
const showCancelPendingModal = ref(false)

const history = ref<PaymentItem[]>([])
const hasActiveStripeSubscription = ref(false)

const annualPrice = Number(import.meta.env.VITE_ANNUAL_PRICE) || 297

const isActive = computed(() => {
  if (!userStore.accessUntil) return false
  return new Date(userStore.accessUntil) > new Date()
})

const isCanceled = computed(() => userStore.subscriptionStatus === 'canceled')

const accessUntilDate = computed(() => {
  if (!userStore.accessUntil) return null
  return new Date(userStore.accessUntil)
})

const currentPlan = computed(() => {
  const approved = history.value
    .filter((h) => h.status === 'approved')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return approved[0]?.plan || null
})

const planLabel = computed(() => {
  if (userStore.foundingMember || currentPlan.value === 'lifetime') return 'Miembro Fundador'
  if (currentPlan.value === 'monthly') return 'Suscripción Mensual'
  if (currentPlan.value === 'annual') return 'Plan Anual'
  return 'Sin plan activo'
})

const pendingPayments = computed(() =>
  history.value.filter((h) => h.status === 'pending'),
)

const visibleHistory = computed(() =>
  history.value.filter((h) => h.status !== 'pending'),
)

const accessUntilLabel = computed(() => {
  if (!accessUntilDate.value) return 'Sin acceso activo'
  return accessUntilDate.value.toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

async function loadHistory() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await paymentService.history()
    history.value = data.data.history
    hasActiveStripeSubscription.value = data.data.hasActiveStripeSubscription
    if (hasActiveStripeSubscription.value && userStore.subscriptionStatus !== 'active') {
      userStore.setUser({ subscriptionStatus: 'active' })
    }
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al cargar historial'
  } finally {
    loading.value = false
  }
}

async function payAnnual() {
  loading.value = true
  error.value = ''
  try {
    const user = userStore
    const { data } = await paymentService.createCheckoutSession({
      email: user.email || '',
      name: user.name || '',
      lastName: user.lastName || '',
    })
    const url = data.data.url
    if (url) {
      window.location.href = url
    } else {
      error.value = 'No se pudo iniciar el pago. Intenta de nuevo.'
    }
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al preparar el pago'
  } finally {
    loading.value = false
  }
}

async function cancelSubscription() {
  cancelLoading.value = true
  error.value = ''
  success.value = ''
  try {
    const { data } = await paymentService.cancelSubscription()
    userStore.setUser({ subscriptionStatus: 'canceled' })
    hasActiveStripeSubscription.value = false
    const confirmedUntil = data.data.accessUntil
      ? new Date(data.data.accessUntil).toLocaleDateString('es-EC', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      : accessUntilLabel.value
    success.value = `Cancelación confirmada por Stripe. No habrá nuevas renovaciones. Conservas acceso hasta el ${confirmedUntil}.`
    showCancelSubModal.value = false
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al cancelar la suscripción'
  } finally {
    cancelLoading.value = false
  }
}

async function cancelPending() {
  cancelPendingLoading.value = true
  error.value = ''
  success.value = ''
  try {
    const { data } = await paymentService.cancelPending()
    success.value = `${data.data.canceled} pago(s) pendiente(s) cancelado(s).`
    showCancelPendingModal.value = false
    await loadHistory()
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al cancelar pagos pendientes'
  } finally {
    cancelPendingLoading.value = false
  }
}

function goToPaymentPage() {
  const el = document.querySelector('.plans')
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(loadHistory)
</script>

<template>
  <div class="payments">
    <PaymentAlerts :error="error" :success="success" />

    <PaymentHero
      :is-active="isActive"
      :plan-label="planLabel"
      :is-founding-member="userStore.foundingMember"
      :access-until-label="accessUntilLabel"
      :access-until-date="accessUntilDate"
      :annual-price="annualPrice"
      @go-to-payment-page="goToPaymentPage"
    />

    <PendingBanner
      :pending-count="pendingPayments.length"
      :loading="cancelPendingLoading"
      @cancel-pending="showCancelPendingModal = true"
    />

    <PaymentPlanCards
      v-if="!isActive"
      :loading="loading"
      :annual-price="annualPrice"
      @pay-annual="payAnnual"
    />

    <CancelSection
      :has-active-subscription="hasActiveStripeSubscription"
      :is-canceled="isCanceled"
      :cancel-loading="cancelLoading"
      :access-until-label="accessUntilLabel"
      @cancel-subscription="showCancelSubModal = true"
    />

    <PaymentHistory :loading="loading" :items="visibleHistory" />

    <ConfirmModal
      :open="showCancelSubModal"
      title="Cancelar suscripción"
      message="¿Estás seguro de cancelar tu suscripción mensual? No volverá a renovarse. No se realizan reembolsos y conservarás el acceso hasta el final del período pagado."
      action-label="Sí, cancelar"
      confirm-text="cancelar"
      danger
      @confirm="cancelSubscription"
      @cancel="showCancelSubModal = false"
    />

    <ConfirmModal
      :open="showCancelPendingModal"
      title="Cancelar pagos pendientes"
      :message="`¿Estás seguro de cancelar ${pendingPayments.length} pago(s) pendiente(s)? Esta acción no se puede deshacer.`"
      action-label="Sí, cancelar"
      confirm-text="cancelar"
      danger
      @confirm="cancelPending"
      @cancel="showCancelPendingModal = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.payments {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 16px;
}
</style>
