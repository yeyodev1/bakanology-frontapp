<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="coming-soon" aria-labelledby="coming-soon-title">
    <div class="coming-soon__icon" aria-hidden="true">
      <i class="fa-solid fa-calendar-days" />
    </div>
    <span class="coming-soon__badge">Próximamente</span>
    <h2 id="coming-soon-title" class="coming-soon__title">Muy pronto abriremos el horario</h2>
    <p class="coming-soon__text">
      Estamos preparando el calendario semanal de actividades de Bakanology. Te avisaremos por correo cuando esté disponible.
    </p>
    <RouterLink :to="{ name: 'courses' }" class="coming-soon__link">Mientras tanto, sigue con tus cursos</RouterLink>
  </section>
</template>

<style lang="scss" scoped>
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 34rem;
  margin: 2rem auto;
  padding: 2.5rem 1.5rem;
  text-align: center;
  background: var(--c-surface);
  border: 1px dashed var(--c-border-strong);
  border-radius: 1.25rem;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: rgb(var(--c-accent-fill-rgb) / 0.12);
    color: var(--c-accent-text);
    font-size: 1.4rem;
  }

  &__badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgb(var(--c-text-rgb) / 0.08);
    color: var(--c-text-2);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__title {
    margin: 0;
    font-family: $font-display;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--c-text);
  }

  &__text {
    margin: 0;
    font-family: $font-sans;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--c-text-2);
  }

  &__link {
    margin-top: 0.5rem;
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--c-accent-text);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
