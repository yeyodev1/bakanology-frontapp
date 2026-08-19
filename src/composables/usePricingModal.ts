import { ref } from 'vue'
import type { PlanId } from '@/config/plans'

const isOpen = ref(false)
const selectedPlan = ref<PlanId>('annual')

export const usePricingModal = () => ({
  isOpen,
  selectedPlan,
  // Callers may bind `open` directly to @click, so ignore anything not a PlanId.
  open: (plan?: PlanId | Event) => {
    if (plan === 'monthly' || plan === 'annual') selectedPlan.value = plan
    isOpen.value = true
  },
  close: () => { isOpen.value = false },
})
