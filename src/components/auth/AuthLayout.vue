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
  padding: 2rem;
  background: $light;
}

.auth-layout__card {
  width: 100%;
  max-width: 420px;
  background: $white;
  border: 1px solid rgba($bakano-dark, 0.06);
  border-radius: 1.5rem;
  padding: clamp(2rem, 6vw, 3rem);
  box-shadow: 0 24px 80px rgba($bakano-dark, 0.06);
}

.auth-layout__brand {
  display: inline-flex;
  margin-bottom: 1.5rem;
  color: $bakano-dark;
}

.auth-layout__title {
  font-family: $font-display;
  font-size: clamp(1.6rem, 5vw, 2rem);
  font-weight: 400;
  margin: 0 0 0.5rem;
  color: $bakano-dark;
}

.auth-layout__subtitle {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.5;
  color: $gray-500;
  margin: 0 0 1.75rem;
}
</style>
