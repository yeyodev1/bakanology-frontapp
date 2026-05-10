<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/composables/useScrollReveal'

const pillars = [
  {
    n: '01',
    title: 'Entrenamiento',
    body: 'Rutinas para mujeres ocupadas, diseñadas por Luisa. En casa o en gimnasio, sin perder horas. Para tu agenda real, no para una imaginaria.',
  },
  {
    n: '02',
    title: 'Nutrición flexible',
    body: 'Hábitos sostenibles, no dietas restrictivas. Adaptada para que viajes, salgas a comer y sigas avanzando los doce meses.',
  },
  {
    n: '03',
    title: 'Mentalidad y comunidad',
    body: 'Sesiones grupales con Luisa, retos mensuales medibles y un círculo cerrado de mujeres que avanzan contigo. Sin curiosas, sin ruido.',
  },
]

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    gsap.from(root.value!.querySelectorAll('.method__title-mask > *'), {
      yPercent: 110,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: root.value, start: 'top 70%' },
    })
    gsap.from(root.value!.querySelectorAll('.method__card'), {
      opacity: 0,
      y: 60,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.method__grid', start: 'top 75%' },
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section class="method" id="metodologia" ref="root">
    <div class="method__inner container">
      <header class="method__header">
        <span class="eyebrow eyebrow--green">Metodología Luisa Pita Bejarano</span>
        <h2 class="method__title display-lg">
          <span class="method__title-mask"><span>Tres pilares.</span></span>
          <span class="method__title-mask"><span class="method__title--italic">Doce meses.</span></span>
        </h2>
        <p class="method__lede lede">
          Un sistema completo de coaching fitness anual: entrenamiento, nutrición flexible y
          comunidad. La diferencia entre transformaciones que duran y las que se evaporan en marzo.
        </p>
      </header>

      <div class="method__grid">
        <article v-for="p in pillars" :key="p.n" class="method__card">
          <span class="method__num">{{ p.n }}</span>
          <h3 class="method__card-title">{{ p.title }}</h3>
          <p class="method__card-body">{{ p.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.method {
  background: $lpb-black;
  color: $lpb-white;
  padding-block: clamp(5rem, 12vw, 9rem);
}

.method__header {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 760px;
  margin-inline: auto;
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.method__title {
  margin: 0;
  color: $lpb-white;
}

.method__title-mask {
  display: block;
  overflow: hidden;
}

.method__title--italic {
  font-style: italic;
  color: $lpb-green;
}

.method__lede {
  color: rgba($lpb-white, 0.7);
}

.method__grid {
  display: grid;
  gap: 1px;
  grid-template-columns: 1fr;
  background: rgba($lpb-white, 0.12);
  border-block: 1px solid rgba($lpb-white, 0.12);

  @media (min-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.method__card {
  position: relative;
  background: $lpb-black;
  padding: clamp(2rem, 3.5vw, 3rem) clamp(1.5rem, 2.5vw, 2.25rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background .35s ease;

  &:hover {
    background: $lpb-ink;
  }
}

.method__num {
  font-family: $font-mono;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  color: $lpb-green;
  align-self: flex-start;
  padding: 0.25rem 0.6rem;
  border: 1px solid rgba($lpb-green, 0.4);
  border-radius: 999px;
}

.method__card-title {
  font-family: $font-display;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.65rem, 2.6vw, 2.1rem);
  line-height: 1.1;
  letter-spacing: -0.015em;
  margin: 0;
}

.method__card-body {
  font-family: $font-sans;
  color: rgba($lpb-white, 0.7);
  font-size: 1rem;
  line-height: 1.55;
  margin: 0;
}
</style>
