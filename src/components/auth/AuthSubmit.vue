<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <button type="submit" class="auth-submit" :disabled="loading">
    <span v-if="loading" class="auth-submit__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.auth-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 999px;
  background: $bakano-dark;
  color: $white;
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;

  &:hover:not(:disabled) {
    background: $bakano-green;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.auth-submit__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba($white, 0.3);
  border-top-color: $white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
