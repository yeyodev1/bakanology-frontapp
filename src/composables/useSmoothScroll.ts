import Lenis from 'lenis'
import { onBeforeUnmount, onMounted } from 'vue'

let instance: Lenis | null = null

export const useSmoothScroll = () => {
  onMounted(() => {
    if (instance) return
    if (typeof window === 'undefined') return

    // Respeta prefers-reduced-motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    const raf = (time: number) => {
      instance?.raf(time)
      window.requestAnimationFrame(raf)
    }
    window.requestAnimationFrame(raf)
  })

  onBeforeUnmount(() => {
    instance?.destroy()
    instance = null
  })
}

export const getLenis = () => instance
