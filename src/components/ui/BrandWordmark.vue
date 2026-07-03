<script setup lang="ts">
defineProps<{ size?: 'sm' | 'md' | 'lg'; variant?: 'full' | 'mono' }>()
</script>

<template>
  <span class="wordmark" :class="[`wordmark--${size ?? 'md'}`, `wordmark--${variant ?? 'full'}`]" aria-label="Bakanology Academy">
    <div v-if="variant !== 'mono'" class="wordmark__full">
      <span class="wordmark__name wordmark__name--bold">Bakanology</span>
      <span class="wordmark__tag">Academy</span>
    </div>
    <div v-else class="wordmark__mono">
      <i class="fa-solid fa-rocket wordmark__rocket" aria-hidden="true"></i>
      <span class="wordmark__initials">Bk</span>
    </div>
  </span>
</template>

<style lang="scss" scoped>
.wordmark {
  display: inline-flex;
  align-items: center;
  color: currentColor;
  white-space: nowrap;
}

.wordmark__full {
  display: flex;
  flex-direction: column;
  position: relative;
  line-height: 1;
}

.wordmark__name {
  font-family: $font-display;
  letter-spacing: -0.02em;

  &--bold {
    font-weight: 800;
  }
}

.wordmark__tag {
  font-family: $font-mono;
  font-size: 0.55em;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-top: 0.15em;
}

.wordmark__mono {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
  gap: 2px;
}

.wordmark__rocket {
  font-size: 0.6em;
  opacity: 0.8;
  color: $bakano-green;
}

.wordmark__initials {
  font-family: $font-display;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.wordmark--sm {
  .wordmark__name { font-size: 1.1rem; }
  .wordmark__initials { font-size: 1.1rem; }
}

.wordmark--md {
  .wordmark__name { font-size: 1.5rem; }
  .wordmark__initials { font-size: 1.8rem; }
}

.wordmark--lg {
  .wordmark__name { font-size: 2.8rem; }
  .wordmark__initials { font-size: 3.2rem; }
}
</style>
