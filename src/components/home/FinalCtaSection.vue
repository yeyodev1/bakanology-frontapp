<script setup lang="ts">
const scrollToPlans = () => {
  const el = document.getElementById('planes')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="final-cta">
    <div class="final-cta__inner">
      <span class="final-cta__eyebrow">30 cupos disponibles</span>
      <h2 class="final-cta__title">Asegura tu lugar como<br><span class="final-cta__highlight">miembro fundador</span></h2>
      <p class="final-cta__lede">
        $297 — Pago único, acceso de por vida.<br>
        Incluye todas las actualizaciones futuras.
      </p>
      <div class="final-cta__actions">
        <button type="button" class="final-cta__btn final-cta__btn--primary" @click="scrollToPlans">
          Quiero ser miembro fundador
        </button>
      </div>
      <div class="final-cta__legal">
        <p>Oferta válida hasta el 31 de julio de 2026. 30 cupos límite.</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.final-cta {
  padding-block: 5rem;
  background: $bakano-dark;
  position: relative;
  overflow: hidden;
}

.final-cta__inner {
  max-width: 640px;
  margin: 0 auto;
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.final-cta__eyebrow {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $bakano-pink;
  font-weight: 600;
}

.final-cta__title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.15;
  color: $white;
  margin: 0;
}

.final-cta__highlight {
  color: $bakano-pink;
}

.final-cta__lede {
  font-family: $font-sans;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba($white, 0.8);
  margin: 0;
}

.final-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.final-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2.5rem;
  border-radius: 0.5rem;
  font-family: $font-sans;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all .25s ease;
  border: none;
  text-decoration: none;
}

.final-cta__btn--primary {
  background: $bakano-pink;
  color: $white;

  &:hover {
    background: $bakano-pink-dark;
    transform: translateY(-1px);
  }
}

.final-cta__legal {
  margin-top: 1rem;
}

.final-cta__legal p {
  font-family: $font-sans;
  font-size: 0.8rem;
  color: rgba($white, 0.4);
  margin: 0;
}
</style>
