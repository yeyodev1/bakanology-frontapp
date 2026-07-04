import { ref } from 'vue'

const isOpen = ref(false)

export const usePricingModal = () => ({
  isOpen,
  open: () => { isOpen.value = true },
  close: () => { isOpen.value = false },
})
