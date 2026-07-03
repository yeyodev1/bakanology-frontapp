<script setup lang="ts">
import { ref } from 'vue'

const faqs = [
  { q: '¿Qué es Bakanology Academy?', a: 'Es la plataforma de e-learning de marketing de performance creada por bakano.ec. Incluye cursos basados en nuestra metodología comprobada, un CRM propio para gestionar clientes y soporte continuo del equipo.' },
  { q: '¿Para quién es esta academia?', a: 'Para dueños de negocio que facturan menos de $15,000/mes (gastronomía) o $10,000/mes (servicios). Negocios que necesitan marketing de performance pero no pueden pagar una agencia.' },
  { q: '¿Qué incluye el plan anual?', a: 'Acceso completo a todos los cursos de la plataforma, CRM propio para gestión de clientes, soporte continuo del equipo de bakano.ec y certificación al completar los cursos.' },
  { q: '¿Necesito experiencia en marketing?', a: 'No. La metodología está diseñada para que任何人 la entienda y aplique. Los cursos son paso a paso y tienes soporte para resolver dudas.' },
  { q: '¿Qué es el CRM que incluye?', a: 'Es un sistema de gestión de clientes donde puedes conectar tus redes sociales a un solo canal, gestionar tu agenda de reuniones y dar seguimiento a tus prospectos.' },
  { q: '¿Hay soporte o es solo el curso?', a: 'Hay soporte. Como decimos en bakano.ec: te damos el Ferrari (la plataforma y el CRM) y el conductor (el soporte). Tú pones la gasolina (la pauta publicitaria).' },
  { q: '¿Cuánto cuesta después del lanzamiento?', a: 'El precio de lanzamiento es $297/año. Para los miembros fundadores (30 cupos) este precio se mantiene para siempre. Después del lanzamiento el precio será $120/mes.' },
]

const openIndex = ref<number | null>(null)

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
            <svg class="faq__chevron" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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
  padding-block: 5rem;
  background: $bakano-light;
}

.faq__inner {
  max-width: 720px;
  margin: 0 auto;
  padding-inline: 2rem;
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
  font-weight: 600;
}

.faq__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: $bakano-dark;
  margin: 0;
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
}

.faq__item {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: box-shadow .25s ease;

  &:hover {
    box-shadow: 0 2px 12px rgba($bakano-dark, 0.06);
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
  font-weight: 600;
  font-size: 0.98rem;
  color: $bakano-dark;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  span {
    flex: 1;
  }
}

.faq__chevron {
  flex-shrink: 0;
  color: $gray-400;
  transition: transform .3s ease;
}

.faq__item--open .faq__chevron {
  transform: rotate(180deg);
}

.faq__answer {
  padding: 0 1.5rem 1.25rem;
}

.faq__answer p {
  font-family: $font-sans;
  font-size: 0.93rem;
  line-height: 1.6;
  color: $gray-600;
  margin: 0;
}
</style>
