<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { gsap } from '@/composables/useScrollReveal'

const props = defineProps<{
  text: string
  tag?: string
  delay?: number
  stagger?: number
  duration?: number
  splitBy?: 'word' | 'char'
}>()

const tag = computed(() => props.tag ?? 'span')
const splitBy = computed(() => props.splitBy ?? 'word')

const root = ref<HTMLElement | null>(null)

const tokens = computed(() => {
  if (splitBy.value === 'char') {
    return Array.from(props.text)
  }
  return props.text.split(/(\s+)/)
})

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    const targets = root.value!.querySelectorAll<HTMLElement>('.reveal-text__token')
    gsap.set(targets, { yPercent: 120, opacity: 0 })
    gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: props.duration ?? 1.1,
      ease: 'expo.out',
      stagger: props.stagger ?? 0.05,
      delay: props.delay ?? 0,
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <component :is="tag" ref="root" class="reveal-text" :aria-label="text">
    <span
      v-for="(t, i) in tokens"
      :key="i"
      class="reveal-text__mask"
      aria-hidden="true"
    >
      <span class="reveal-text__token">{{ t }}</span>
    </span>
  </component>
</template>

<style lang="scss" scoped>
.reveal-text {
  display: inline-block;
  vertical-align: top;
}

.reveal-text__mask {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  line-height: inherit;
  // permite que los espacios se rendericen
  white-space: pre;
}

.reveal-text__token {
  display: inline-block;
  will-change: transform, opacity;
}
</style>
