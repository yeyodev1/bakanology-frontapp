<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCloudinary } from '@/composables/useCloudinary'
import { gsap } from '@/composables/useScrollReveal'

const { luisa } = useCloudinary()
const portrait = luisa(11, { w: 1200, h: 1500, crop: 'fill', gravity: 'face' })

const root = ref<HTMLElement | null>(null)
const photoEl = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    if (photoEl.value) {
      gsap.fromTo(
        photoEl.value.querySelector('img'),
        { yPercent: -10, scale: 1.08 },
        {
          yPercent: 10,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }

    const lines = root.value!.querySelectorAll('.manifesto__line')
    gsap.from(lines, {
      yPercent: 80,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: root.value, start: 'top 70%' },
    })

    gsap.from(root.value!.querySelectorAll('[data-fade]'), {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: root.value, start: 'top 65%' },
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section class="manifesto" id="filosofia" ref="root">
    <div class="manifesto__inner container">
      <div class="manifesto__content">
        <span class="eyebrow" data-fade>Filosofía de marca</span>
        <h2 class="manifesto__title display-lg">
          <span class="manifesto__mask"><span class="manifesto__line">Coaching anual</span></span>
          <span class="manifesto__mask"><span class="manifesto__line">para mujeres</span></span>
          <span class="manifesto__mask"><span class="manifesto__line manifesto__line--italic">empoderadas.</span></span>
        </h2>
        <p class="manifesto__copy lede" data-fade>
          Luisa Pita Bejarano es coach fitness y entrenadora personal especializada en mujeres
          ocupadas, dueñas de negocio y madres en Ecuador y Latinoamérica. No es una dieta de 30 días.
          Tampoco un reto de 8 semanas.
        </p>
        <p class="manifesto__copy lede" data-fade>
          Es la decisión de dedicarte un año entero — con una entrenadora que te empuja, una
          comunidad cerrada que te sostiene y una metodología probada por más de doscientas mujeres.
          <em>Lo que se construye en doce meses se queda contigo.</em>
        </p>
        <dl class="manifesto__stats" data-fade>
          <div>
            <dt>+200</dt>
            <dd>Mujeres acompañadas</dd>
          </div>
          <div>
            <dt>12</dt>
            <dd>Meses de comunidad</dd>
          </div>
          <div>
            <dt>0</dt>
            <dd>Dietas restrictivas</dd>
          </div>
        </dl>
      </div>

      <figure class="manifesto__photo" ref="photoEl">
        <div class="manifesto__photo-wrap">
          <img :src="portrait" alt="Retrato editorial de Luisa Pita Bejarano" loading="lazy" />
        </div>
        <figcaption>
          <span class="eyebrow">Luisa Pita Bejarano</span>
          <span class="manifesto__caption italic-accent">Coach · Ecuador</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.manifesto {
  position: relative;
  padding-block: clamp(5rem, 12vw, 9rem);
  background: $lpb-cream;
  color: $lpb-black;
}

.manifesto__inner {
  display: grid;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;

  @media (min-width: 960px) {
    grid-template-columns: 1.15fr 0.85fr;
  }
}

.manifesto__content {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.manifesto__title {
  margin: 0.5rem 0 0.5rem;
  font-weight: 400;
  line-height: 1.02;
}

.manifesto__mask {
  display: block;
  overflow: hidden;
}

.manifesto__line {
  display: block;
}

.manifesto__line--italic {
  font-style: italic;
  color: $lpb-green-dark;
}

.manifesto__copy {
  max-width: 52ch;
  margin-inline: auto;
  color: $lpb-graphite;

  em {
    font-family: $font-display;
    font-style: italic;
    font-weight: 500;
    color: $lpb-black;
  }
}

.manifesto__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 1rem 0 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba($lpb-black, 0.12);

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  dt {
    font-family: $font-display;
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 500;
    line-height: 1;
    color: $lpb-black;
  }

  dd {
    margin: 0;
    font-family: $font-mono;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $lpb-graphite;
  }
}

.manifesto__photo {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.manifesto__photo-wrap {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 30px 60px -30px rgba($lpb-black, 0.4);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
    will-change: transform;
  }
}

.manifesto__photo figcaption {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.manifesto__caption {
  font-size: 1.1rem;
  color: $lpb-black;
}
</style>
