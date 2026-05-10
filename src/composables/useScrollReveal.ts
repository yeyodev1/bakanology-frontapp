import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, type Ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  selector?: string
  y?: number
  stagger?: number
  duration?: number
  start?: string
  once?: boolean
}

/**
 * Reveal helper: anima elementos con `[data-reveal]` o un selector custom
 * cuando entran al viewport. Limpia los triggers al desmontar.
 */
export const useScrollReveal = (
  scope: Ref<HTMLElement | null>,
  options: RevealOptions = {},
) => {
  const {
    selector = '[data-reveal]',
    y = 48,
    stagger = 0.08,
    duration = 0.95,
    start = 'top 85%',
    once = true,
  } = options

  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (!scope.value) return
    ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector)
      if (!targets.length) return
      gsap.set(targets, { opacity: 0, y })
      targets.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          ease: 'power3.out',
          delay: (i % 3) * stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        })
      })
    }, scope.value)
  })

  onBeforeUnmount(() => {
    ctx?.revert()
  })
}

export { gsap, ScrollTrigger }
