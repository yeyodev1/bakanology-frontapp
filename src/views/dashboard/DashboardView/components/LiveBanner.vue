<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  title: string
  coach: string
  date: string
  time: string
  duration: string
}>()
</script>

<template>
  <section class="banner">
    <div class="banner__content">
      <span class="banner__eyebrow">Próxima clase en vivo</span>
      <h2 class="banner__title">{{ title }}</h2>
      <p class="banner__meta">{{ coach }} · {{ date }} a las {{ time }} · {{ duration }}</p>
    </div>
    <RouterLink :to="{ name: 'live-classes' }" class="banner__cta">Ver todas</RouterLink>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: linear-gradient(135deg, $bakano-green 0%, $bakano-green 100%);
  color: $bakano-dark;
  border-radius: 1rem;
  padding: 1.5rem 2rem;

  &__eyebrow {
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0.25rem 0 0;
  }

  &__meta {
    font-family: $font-sans;
    font-size: 0.9rem;
    margin: 0.35rem 0 0;
    opacity: 0.9;
  }

  &__cta {
    flex-shrink: 0;
    background: $bakano-dark;
    color: $white;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
    transition: background 0.2s ease;

    &:hover { background: $bakano-dark; }
  }
}

@media (max-width: 720px) {
  .banner { flex-direction: column; align-items: flex-start; }
}
</style>
