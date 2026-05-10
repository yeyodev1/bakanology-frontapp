<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCloudinary } from '@/composables/useCloudinary'
import { gsap } from '@/composables/useScrollReveal'

const { luisa } = useCloudinary()

// Variantes Cloudinary verificadas: 2 y 11. Fallback: usar mismas en distintos crops.
const shots = [
  { src: luisa(2, { w: 900, h: 1200, crop: 'fill', gravity: 'face' }), label: 'Disciplina', span: 'tall' },
  { src: luisa(11, { w: 1100, h: 800, crop: 'fill', gravity: 'face' }), label: 'Presencia', span: 'wide' },
  { src: luisa(2, { w: 800, h: 800, crop: 'fill', gravity: 'face' }), label: 'Cuerpo', span: 'square' },
  { src: luisa(11, { w: 900, h: 1400, crop: 'fill', gravity: 'face' }), label: 'Editorial', span: 'tallest' },
]

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    const items = root.value!.querySelectorAll('.gallery__item')
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: (i % 3) * 0.05,
          scrollTrigger: { trigger: el, start: 'top 90%' },
        },
      )
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section class="gallery" id="historias" ref="root">
    <div class="container">
      <header class="gallery__header">
        <span class="eyebrow">Editorial</span>
        <h2 class="gallery__title display-md">
          La estética de quien se decide.
        </h2>
      </header>
    </div>

    <div class="gallery__grid container">
      <figure
        v-for="(s, i) in shots"
        :key="i"
        class="gallery__item"
        :class="`gallery__item--${s.span}`"
      >
        <div class="gallery__img-wrap">
          <img :src="s.src" :alt="`Luisa Pita — ${s.label}`" loading="lazy" />
        </div>
        <figcaption>
          <span class="gallery__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="gallery__label">{{ s.label }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.gallery {
  background: $lpb-paper;
  color: $lpb-black;
  padding-block: clamp(5rem, 11vw, 8rem);
}

.gallery__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
  max-width: 760px;
  margin-inline: auto;
}

.gallery__title {
  margin: 0;
  font-style: italic;
}

.gallery__grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 720px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 1.25rem;
    grid-auto-rows: minmax(180px, auto);
  }
}

.gallery__item {
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  @media (max-width: 720px) {
    aspect-ratio: 4 / 5;
  }
}

.gallery__img-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  flex: 1 1 auto;
  background: rgba($lpb-black, 0.06);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform .8s cubic-bezier(.2,.7,0,1), filter .8s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba($lpb-black, 0.3) 100%);
    opacity: 0.6;
    transition: opacity .4s ease;
  }
}

.gallery__item:hover .gallery__img-wrap img {
  transform: scale(1.05);
  filter: contrast(1.06);
}

.gallery__item:hover .gallery__img-wrap::after {
  opacity: 0.3;
}

@media (min-width: 720px) {
  .gallery__item--tall    { grid-column: span 2; grid-row: span 3; aspect-ratio: 3 / 4; }
  .gallery__item--wide    { grid-column: span 4; grid-row: span 2; aspect-ratio: 16 / 11; }
  .gallery__item--square  { grid-column: span 2; grid-row: span 2; aspect-ratio: 1 / 1; }
  .gallery__item--tallest { grid-column: span 4; grid-row: span 3; aspect-ratio: 4 / 5; }
}

.gallery__item figcaption {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.4rem;
}

.gallery__num {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: $lpb-graphite;
}

.gallery__label {
  font-family: $font-display;
  font-style: italic;
  font-size: 0.95rem;
  color: $lpb-black;
}
</style>
