<script setup lang="ts">
import BrandWordmark from '@/components/ui/BrandWordmark.vue'

defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section class="auth-layout">
    <div class="auth-layout__card">
      <RouterLink :to="{ name: 'home' }" class="auth-layout__brand">
        <BrandWordmark size="sm" />
      </RouterLink>
      <h1 class="auth-layout__title">{{ title }}</h1>
      <p v-if="subtitle" class="auth-layout__subtitle">{{ subtitle }}</p>
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 2rem);
  background:
    radial-gradient(60rem 30rem at 50% -10%, rgb(var(--c-accent-fill-rgb) / 0.08), transparent 70%),
    var(--c-bg);
}

.auth-layout__card {
  width: 100%;
  max-width: 420px;
  background: var(--c-surface);
  border: 1px solid rgb(var(--c-text-rgb) / 0.06);
  border-radius: 1.5rem;
  padding: clamp(1.75rem, 6vw, 3rem);
  box-shadow:
    0 1px 2px rgb(var(--c-shadow-rgb) / 0.04),
    0 24px 64px rgb(var(--c-shadow-rgb) / 0.08);
}

.auth-layout__brand {
  display: inline-flex;
  margin-bottom: 1.5rem;
  color: var(--c-text);
}

.auth-layout__title {
  font-family: $font-display;
  font-size: clamp(1.6rem, 5vw, 2rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-wrap: balance;
  margin: 0 0 0.5rem;
  color: var(--c-text);
}

.auth-layout__subtitle {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--c-text-2);
  text-wrap: pretty;
  margin: 0 0 1.75rem;
}
</style>
