<script setup lang="ts">
import { ref } from 'vue'

const faqs = [
  { q: '¿Por qué no ofrecen reembolso?', a: 'Porque Bakanology no es un curso para "ver", es un sistema para "implementar". Entregamos propiedad intelectual, herramientas y estrategias que usamos en nuestros propios negocios. Buscamos dueños comprometidos, no curiosos.' },
  { q: '¿Qué garantía tengo de que esto funciona?', a: 'Nuestra garantía son nuestros resultados y clientes. Si aplicas la metodología, ves todos los cursos y demuestras que no mejoraste en 30 días, te regalamos una auditoría 1 a 1 para ajustar tu operación.' },
  { q: '¿Qué pasa si me trabo o no entiendo algo?', a: 'No te dejamos solo. Como Miembro Fundador tienes acceso a soporte directo del equipo de bakano.ec y a la comunidad privada de dueños.' },
  { q: '¿Sirve para mi tipo de negocio?', a: 'La metodología está pensada para gastronomía y servicios que facturan desde $10,000/mes. Los principios de adquisición, CRM y control de números aplican a cualquier modelo de venta.' },
]

const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="faq">
    <div class="faq__inner">
      <span class="faq__eyebrow">Preguntas frecuentes</span>
      <h2 class="faq__title">Todo lo que necesitas saber</h2>
      <div class="faq__list">
        <article
          v-for="(faq, i) in faqs"
          :key="i"
          class="faq__item"
          :class="{ 'faq__item--open': openIndex === i }"
        >
          <button type="button" class="faq__question" @click="toggle(i)">
            <span>{{ faq.q }}</span>
            <span class="faq__toggle">{{ openIndex === i ? '−' : '+' }}</span>
          </button>
          <div class="faq__answer" v-if="openIndex === i">
            <p>{{ faq.a }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.faq {
  padding-block: clamp(4rem, 8vw, 6rem);
  background: $bakano-light;
}

.faq__inner {
  max-width: 760px;
  margin: 0 auto;
  padding-inline: clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.faq__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 700;
}

.faq__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: $bakano-dark;
  margin: 0;
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
}

.faq__item {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 1rem;
  overflow: hidden;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 4px 18px rgba($bakano-dark, 0.06);
  }

  &--open {
    border-color: rgba($bakano-pink, 0.4);
  }
}

.faq__question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1rem;
  color: $bakano-dark;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  span:first-child {
    flex: 1;
  }
}

.faq__toggle {
  font-family: $font-display;
  font-size: 1.3rem;
  color: $bakano-pink;
  line-height: 1;
  width: 1.5rem;
  text-align: center;
}

.faq__answer {
  padding: 0 1.5rem 1.25rem;

  p {
    font-family: $font-sans;
    font-size: 0.95rem;
    line-height: 1.65;
    color: $gray-600;
    margin: 0;
  }
}
</style>
