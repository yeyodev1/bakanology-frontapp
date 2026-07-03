<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { adminService, type ManualPayment } from '@/services/adminService'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import PaymentStats from './PaymentStats.vue'
import PaymentsTable from './PaymentsTable.vue'
import CreatePaymentModal from './CreatePaymentModal.vue'

const payments = ref<ManualPayment[]>([])
const loading = ref(false)
const initialLoading = ref(true)
const error = ref('')
const success = ref('')
const showModal = ref(false)
const deleteTarget = ref<ManualPayment | null>(null)

const filters = reactive({
  userId: '',
  search: '',
})

const hasFilters = computed(() => filters.userId !== '' || filters.search !== '')

async function loadPayments() {
  if (!initialLoading.value) loading.value = true
  error.value = ''
  try {
    const { data } = await adminService.listPayments({
      userId: filters.userId || undefined,
      search: filters.search || undefined,
    })
    payments.value = data.data.payments
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al cargar pagos'
  } finally {
    loading.value = false
    initialLoading.value = false
  }
}

function resetFilters() {
  filters.userId = ''
  filters.search = ''
  loadPayments()
}

async function searchStudents(query: string) {
  if (!query.trim()) return []
  try {
    const { data } = await adminService.listUsers({
      role: 'user',
      search: query.trim(),
      limit: 20,
    })
    return data.data.users.map((s) => ({
      value: s.id,
      label: `${s.name} ${s.lastName} — ${s.email}`,
      raw: s,
    }))
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al buscar alumnos'
    return []
  }
}

function onUserChange(value: string | number) {
  filters.userId = String(value)
  filters.search = ''
  loadPayments()
}

async function createPayment(payload: FormData) {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await adminService.createPayment(payload)
    success.value = 'Pago registrado y acceso activado correctamente'
    showModal.value = false
    await loadPayments()
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al registrar pago'
  } finally {
    loading.value = false
  }
}

function confirmDelete(payment: ManualPayment) {
  deleteTarget.value = payment
}

async function deletePayment() {
  if (!deleteTarget.value) return
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await adminService.deletePayment(deleteTarget.value.id)
    success.value = 'Pago eliminado correctamente'
    deleteTarget.value = null
    await loadPayments()
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al eliminar pago'
  } finally {
    loading.value = false
  }
}

onMounted(loadPayments)
</script>

<template>
  <div class="admin-payments">
    <header class="admin-payments__top">
      <div class="admin-payments__titles">
        <h1 class="admin-payments__page-title">Pagos manuales</h1>
        <p class="admin-payments__page-subtitle">
          Registra pagos por transferencia y activa el acceso de los alumnos.
        </p>
      </div>
      <button class="admin-payments__btn admin-payments__btn--primary" @click="showModal = true">
        <i class="fa-solid fa-plus" />
        Registrar pago
      </button>
    </header>

    <Transition name="slide-down" appear>
      <div v-if="error || success" class="admin-payments__alerts">
        <div v-if="error" class="admin-payments__alert admin-payments__alert--error">
          <i class="fa-solid fa-circle-exclamation" />
          {{ error }}
        </div>
        <div v-if="success" class="admin-payments__alert admin-payments__alert--success">
          <i class="fa-solid fa-circle-check" />
          {{ success }}
        </div>
      </div>
    </Transition>

    <section class="admin-payments__toolbar">
      <div class="admin-payments__filters">
        <div class="admin-payments__filter">
          <i class="fa-solid fa-user admin-payments__filter-icon" />
          <AppSelect
            :model-value="filters.userId"
            :options="[]"
            placeholder="Buscar alumno…"
            remote
            :search-fn="searchStudents"
            @change="onUserChange"
          />
        </div>
        <button
          v-if="hasFilters"
          class="admin-payments__btn admin-payments__btn--ghost"
          @click="resetFilters"
        >
          Limpiar
        </button>
      </div>
      <span class="admin-payments__count">
        {{ payments.length }} {{ payments.length === 1 ? 'pago' : 'pagos' }}
      </span>
    </section>

    <PaymentStats :payments="payments" />

    <PaymentsTable
      :payments="payments"
      :initial-loading="initialLoading"
      @register="showModal = true"
      @delete="confirmDelete"
    />

    <CreatePaymentModal
      :open="showModal"
      :loading="loading"
      @close="showModal = false"
      @submit="createPayment"
    />

    <ConfirmModal
      :open="!!deleteTarget"
      title="Eliminar pago"
      :message="`¿Estás segura de eliminar el pago de ${deleteTarget?.user.name} ${deleteTarget?.user.lastName}? Se borrará también el comprobante de Cloudinary y esta acción es irreversible.`"
      action-label="Eliminar"
      confirm-text="eliminar"
      danger
      @confirm="deletePayment"
      @cancel="deleteTarget = null"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/admin-shared.scss';

.admin-payments {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1400px;
}

.admin-payments__top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.admin-payments__titles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-payments__page-title {
  font-family: $font-display;
  font-size: 1.85rem;
  font-weight: 400;
  color: $bakano-dark;
  margin: 0;
}

.admin-payments__page-subtitle {
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $gray-500;
  margin: 0;
}

.admin-payments__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.admin-payments__filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.admin-payments__filter {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .app-select {
    min-width: 280px;
  }
}

.admin-payments__filter-icon {
  color: $gray-500;
  font-size: 0.85rem;
}

.admin-payments__count {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $gray-500;
}

.admin-payments__alerts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.admin-payments__alert {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  border-radius: 0.85rem;
  font-family: $font-sans;
  font-size: 0.9rem;

  &--error {
    background: $alert-error-bg;
    color: $alert-error;
  }

  &--success {
    background: $alert-success-bg;
    color: $bakano-green;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 720px) {
  .admin-payments__top,
  .admin-payments__toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .admin-payments__filter {
    width: 100%;

    .app-select {
      min-width: 0;
      width: 100%;
    }
  }
}
</style>
