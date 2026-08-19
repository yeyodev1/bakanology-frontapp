import { ref } from 'vue'
import type { PlanId } from '@/config/plans'

const isOpen = ref(false)
const selectedPlan = ref<PlanId>('lifetime')

export const usePricingModal = () => ({
  isOpen,
  selectedPlan,
  // Callers may bind `open` directly to @click, so ignore anything not a PlanId.
  open: (plan?: PlanId | Event) => {
    if (plan === 'monthly' || plan === 'annual' || plan === 'lifetime') selectedPlan.value = plan
    isOpen.value = true
  },
  close: () => { isOpen.value = false },
})
