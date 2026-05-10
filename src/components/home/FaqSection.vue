<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/composables/useScrollReveal'

const faq = [
  {
    q: '¿Cuánto cuesta la comunidad anual?',
    a: 'El precio se anuncia el día que abre la preventa. Por ahora confirmamos que es capital tres cifras (USD) y cubre la comunidad un año entero. Las registradas en la lista VIP reciben un descuento exclusivo que el público general no ve.',
  },
  {
    q: '¿Cuándo abre la preventa?',
    a: 'No tenemos fecha pública aún. Las registradas en la lista VIP reciben aviso 24 horas antes de que abra. Si no estás en la lista, te enteras al mismo tiempo que el resto.',
  },
  {
    q: '¿Por qué un año entero y no un programa corto?',
    a: 'Porque transformar un cuerpo y un estilo de vida toma tiempo. Programas cortos dan resultados que se evaporan. Esta comunidad está hecha para lograr cambios que se sostengan en tu vida real.',
  },
  {
    q: '¿Para quién es y para quién no es?',
    a: 'Es para mujeres ocupadas y dueñas de negocio dispuestas a comprometerse un año entero. No es para quienes buscan dietas restrictivas, atajos o resultados en 8 semanas. La estructura asume que tu vida sigue mientras transformas tu cuerpo.',
  },
  {
    q: '¿Tengo que vivir en Ecuador?',
    a: 'No. La comunidad funciona online. Mujeres en Ecuador, Latinoamérica, USA y Europa pueden participar.',
  },
  {
    q: '¿Y si me registro pero no califico?',
    a: 'No pasa nada. Solo significa que esta cohorte no es para ti hoy. Podrás aplicar a una próxima edición cuando estés lista.',
  },
]

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    gsap.from(root.value!.querySelectorAll('.faq__item'), {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '.faq__list', start: 'top 80%' },
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section class="faq" ref="root">
    <div class="container faq__inner">
      <header class="faq__header">
        <span class="eyebrow">Preguntas frecuentes</span>
        <h2 class="faq__title display-md">
          Lo que las decididas <span class="italic-accent">suelen preguntar.</span>
        </h2>
      </header>

      <div class="faq__list">
        <details v-for="(item, i) in faq" :key="i" class="faq__item">
          <summary>
            <span class="faq__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="faq__q">{{ item.q }}</span>
            <span class="faq__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </span>
          </summary>
          <div class="faq__answer">
            <p>{{ item.a }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.faq {
  background: $lpb-paper;
  color: $lpb-black;
  padding-block: clamp(5rem, 12vw, 9rem);
}

.faq__inner {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 4rem);
}

.faq__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 720px;
}

.faq__title {
  margin: 0;
  font-style: normal;
}

.faq__list {
  border-top: 1px solid rgba($lpb-black, 0.15);
}

.faq__item {
  border-bottom: 1px solid rgba($lpb-black, 0.15);
  padding-block: 0.2rem;

  &[open] {
    .faq__icon svg path:nth-child(2) {
      opacity: 0;
    }
    .faq__icon {
      transform: rotate(180deg);
    }
  }

  summary {
    cursor: pointer;
    list-style: none;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1.25rem;
    padding-block: clamp(1.2rem, 2.5vw, 1.75rem);

    &::-webkit-details-marker {
      display: none;
    }
  }
}

.faq__num {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: $lpb-graphite;
}

.faq__q {
  font-family: $font-display;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  line-height: 1.25;
  color: $lpb-black;
  letter-spacing: -0.01em;
  text-wrap: balance;
}

.faq__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba($lpb-black, 0.2);
  color: $lpb-black;
  transition: transform .4s cubic-bezier(.2,.7,0,1), background .25s ease, color .25s ease;

  &:hover {
    background: $lpb-black;
    color: $lpb-green;
  }
}

.faq__answer {
  padding: 0 0 1.5rem calc(0.75rem + 2.2rem); // alineado debajo del título (skip num + gap)
  max-width: 70ch;

  p {
    font-family: $font-sans;
    color: $lpb-graphite;
    line-height: 1.65;
    margin: 0;
  }
}
</style>
