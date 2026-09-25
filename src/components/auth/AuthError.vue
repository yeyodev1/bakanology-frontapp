<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div v-if="message" class="auth-error" role="alert">
    {{ message }}
  </div>
</template>

<style lang="scss" scoped>
.auth-error {
  font-family: $font-sans;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--c-error);
  background: $alert-error-bg;
  border: 1px solid rgb(var(--c-error-rgb) / 0.15);
  border-radius: 0.75rem;
  padding: 0.85rem 1rem;
}
</style>
