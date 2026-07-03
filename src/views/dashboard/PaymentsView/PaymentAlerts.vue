<script setup lang="ts">
defineProps<{
  error: string
  success: string
}>()
</script>

<template>
  <div v-if="error || success" class="alerts">
    <div v-if="error" class="alerts__item alerts__item--error">{{ error }}</div>
    <div v-if="success" class="alerts__item alerts__item--success">{{ success }}</div>
  </div>
</template>

<style lang="scss" scoped>
.alerts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.alerts__item {
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  font-family: $font-sans;
  font-size: 0.9rem;

  &--error {
    background: $alert-error-bg;
    color: $alert-error;
  }

  &--success {
    background: $alert-success-bg;
    color: $bakano-green;
  }
}
</style>
