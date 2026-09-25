<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  prompt: string
  action: string
}>()
</script>

<template>
  <p class="auth-toggle">
    {{ prompt }}
    <RouterLink :to="to" class="auth-toggle__link">{{ action }}</RouterLink>
  </p>
</template>

<style lang="scss" scoped>
.auth-toggle {
  text-align: center;
  font-family: $font-sans;
  font-size: 0.9rem;
  color: var(--c-text-2);
  margin: 1.5rem 0 0;
}

.auth-toggle__link {
  color: var(--c-accent-text);
  font-weight: 700;
  text-decoration: none;
  text-underline-offset: 3px;
  transition: color 0.2s ease;

  &:hover {
    color: var(--c-accent-text);
    text-decoration: underline;
  }
}
</style>
