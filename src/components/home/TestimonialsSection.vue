<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/composables/useScrollReveal'
import cliente1 from '@/assets/testimonios/cliente1.png'
import cliente2 from '@/assets/testimonios/cliente2.png'
import cliente3 from '@/assets/testimonios/cliente3.png'

interface Testimonial {
  quote: string
  name: string
  role: string
  photo?: string
}

const items: Testimonial[] = [
  {
    quote: 'Entrenar 3 veces por semana durante los últimos 3 años ha cambiado mi vida. Hoy me siento súper tonificada, fuerte y en mi mejor momento físico. Lo mejor de todo es el bienestar integral: hormonalmente me siento increíble y con una estabilidad emocional enorme. ¡Me siento totalmente regia!',
    name: 'Irene Icaza',
    role: 'Independiente',
    photo: cliente1,
  },
  {
    quote: 'Llevar las riendas de Fritega, viajar por trabajo y ser mamá de tres no es fácil, pero mi salud es prioridad. Entrenar 5 veces por semana desde hace 3 años me mantiene fuerte, regia y súper tonificada. Es mi momento del día para mí misma.',
    name: 'Cristina Vargas',
    role: 'Empresaria y Mamá de 3 hijos',
    photo: cliente2,
  },
  {
    quote: 'Ser mamá de cuatro y trabajar a tiempo completo no me impidió cambiar mi vida. ¡He bajado casi 40 libras! Al principio requirió esfuerzo, pero ver mis propios cambios cada semana se convirtió en mi mayor motivación. Hoy me siento más fuerte, activa y segura de mí misma que nunca.',
    name: 'Blanka Zurita',
    role: 'Mamá de 4 hijos y Trabajadora',
    photo: cliente3,
  },
]

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    gsap.from(root.value!.querySelectorAll('.testimonials__card'), {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '.testimonials__cards', start: 'top 78%' },
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section class="testimonials" id="historias" ref="root">
    <div class="testimonials__inner">
      <header class="testimonials__header">
        <span class="eyebrow eyebrow--green">Historias</span>
        <h2 class="testimonials__title display-lg">
          Lo que cuentan<br />
          <span class="testimonials__title--italic">las que llegaron al final.</span>
        </h2>
      </header>

      <div class="testimonials__cards">
        <article v-for="(t, i) in items" :key="i" class="testimonials__card">
          <span class="testimonials__num">{{ String(i + 1).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}</span>
          <blockquote class="testimonials__quote">
            <p>“{{ t.quote }}”</p>
          </blockquote>
          <div class="testimonials__author">
            <img v-if="t.photo" :src="t.photo" :alt="t.name" class="testimonials__photo" loading="lazy" />
            <div v-else class="testimonials__avatar" aria-hidden="true">{{ t.name.charAt(0) }}</div>
            <div>
              <span class="testimonials__name">{{ t.name }}</span>
              <span class="testimonials__role">{{ t.role }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.testimonials {
  position: relative;
  background: $bakano-dark;
  color: $white;
  width: 100%;
}

.testimonials__inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 4rem);
  padding-block: clamp(4rem, 8vw, 6rem);
  padding-inline: clamp(2.5rem, 9vw, 9rem);

  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: 0.55fr 1.45fr;
    align-items: start;
    gap: clamp(2rem, 4vw, 4rem);
  }
}

.testimonials__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 1000px) {
    position: sticky;
    top: 7rem;
    padding-top: 1rem;
  }

  @media (max-width: 1000px) {
    align-items: center;
    text-align: center;
  }
}

.testimonials__title {
  margin: 0;
  color: $white;
}

.testimonials__title--italic {
  font-style: italic;
  color: $bakano-green;
}

.testimonials__cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 880px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(1rem, 1.5vw, 1.5rem);
  }

  @media (max-width: 880px) {
    gap: 1rem;
  }
}

.testimonials__card {
  position: relative;
  flex: 0 0 auto;
  background: $bakano-dark;
  border: 1px solid rgba($white, 0.08);
  border-radius: 12px;
  padding: clamp(1.5rem, 2.5vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  will-change: transform;

  @media (max-width: 880px) {
    width: 100%;
    border-radius: 8px;
  }

  @media (min-width: 880px) {
    transition: transform 0.4s cubic-bezier(0.2, 0.7, 0, 1), border-color 0.3s ease, box-shadow 0.4s ease;

    &:hover {
      transform: translateY(-6px);
      border-color: rgba($bakano-green, 0.3);
      box-shadow: 0 24px 48px -20px rgba($bakano-green, 0.25);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, $bakano-green, $bakano-pink, $bakano-green);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 12px 12px 0 0;
  }

  @media (min-width: 880px) {
    &:hover::after {
      opacity: 1;
    }
  }
}

.testimonials__num {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: $bakano-pink;
}

.testimonials__quote {
  margin: 0;
  flex: 1;

  p {
    font-family: $font-display;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    line-height: 1.4;
    color: $white;
    margin: 0;
    text-wrap: balance;
  }
}

.testimonials__author {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  border-top: 1px solid rgba($white, 0.08);
  padding-top: 0.85rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
}

.testimonials__photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
}

.testimonials__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-display;
  font-size: 1.1rem;
  font-weight: 500;
  flex-shrink: 0;
  background: linear-gradient(135deg, $bakano-green, $bakano-pink);
  color: $white;
}

.testimonials__name {
  font-family: $font-sans;
  font-weight: 600;
  font-size: 0.9rem;
  color: $white;
}

.testimonials__role {
  font-family: $font-mono;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba($white, 0.55);
}
</style>
