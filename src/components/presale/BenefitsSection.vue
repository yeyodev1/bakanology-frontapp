<script setup lang="ts">
const benefits = [
  { icon: 'fa-solid fa-graduation-cap', title: 'Cursos con metodología comprobada', description: 'La misma metodología que bacano.ec usa con más de 70 clientes. Aprende a identificar a quién venderle, qué venderle y cómo venderle.' },
  { icon: 'fa-solid fa-database', title: 'CRM propio incluido', description: 'Tu propia máquina de gestión de clientes. Conecta tus redes sociales, responde desde un solo canal y gestiona reuniones con una agenda integrada.' },
  { icon: 'fa-solid fa-headset', title: 'Soporte continuo', description: 'No solo tienes el Ferrari — tienes el conductor. Te guiamos paso a paso para que sepas gestionar tu CRM y aplicar la metodología.' },
  { icon: 'fa-solid fa-certificate', title: 'Certificación al finalizar', description: 'Al completar los cursos recibes un certificado que acredita que dominas la metodología bacano.ec de marketing de performance.' },
]
</script>

<template>
  <section id="beneficios" class="benefits">
    <div class="benefits__inner">
      <span class="benefits__eyebrow">¿Qué incluye?</span>
      <h2 class="benefits__title">Todo lo que necesitas para escalar tu negocio</h2>
      <div class="benefits__list">
        <article v-for="benefit in benefits" :key="benefit.title" class="benefit-card">
          <div class="benefit-card__icon"><i :class="benefit.icon" /></div>
          <h3 class="benefit-card__title">{{ benefit.title }}</h3>
          <p class="benefit-card__desc">{{ benefit.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.benefits {
  padding-block: 5rem;
  background: $white;
}

.benefits__inner {
  max-width: 960px;
  margin: 0 auto;
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.benefits__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 600;
}

.benefits__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: $bakano-dark;
  margin: 0;
  max-width: 600px;
}

.benefits__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1rem;
}

.benefit-card {
  background: $bakano-light;
  border: 1px solid $gray-200;
  border-radius: 0.75rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.benefit-card__icon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($bakano-pink, 0.1);
  border-radius: 0.75rem;
  font-size: 1.25rem;
  color: $bakano-pink;
}

.benefit-card__title {
  font-family: $font-display;
  font-weight: 700;
  font-size: 1.1rem;
  color: $bakano-dark;
  margin: 0;
}

.benefit-card__desc {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.6;
  color: $gray-600;
  margin: 0;
}
</style>
