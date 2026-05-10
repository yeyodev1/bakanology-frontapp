<script setup lang="ts">
defineProps<{ size?: 'sm' | 'md' | 'lg'; variant?: 'full' | 'mono' }>()
</script>

<template>
  <span class="wordmark" :class="[`wordmark--${size ?? 'md'}`, `wordmark--${variant ?? 'full'}`]" aria-label="Luisa Pita Bejarano">
    <svg v-if="variant !== 'mono'" viewBox="0 0 720 96" fill="none" role="img" aria-hidden="true" class="wordmark__svg">
      <text x="0" y="64" font-family="Fraunces, 'Cormorant Garamond', Georgia, serif" font-style="italic" font-weight="400" font-size="64" letter-spacing="-1.3" fill="currentColor">Luisa Pita </text>
      <text x="252" y="64" font-family="Fraunces, 'Cormorant Garamond', Georgia, serif" font-weight="600" font-size="64" letter-spacing="-0.6" fill="currentColor">Bejarano</text>
      <line x1="0" y1="86" x2="720" y2="86" stroke="currentColor" stroke-width="1.25" opacity="0.35" stroke-linecap="round" />
    </svg>
    <svg v-else viewBox="0 0 120 120" fill="none" role="img" aria-hidden="true" class="wordmark__svg">
      <circle cx="60" cy="60" r="56" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5" />
      <text x="60" y="78" text-anchor="middle" font-family="Fraunces, 'Cormorant Garamond', Georgia, serif" font-style="italic" font-weight="500" font-size="58" letter-spacing="-2" fill="currentColor">LpB</text>
    </svg>
  </span>
</template>

<style lang="scss" scoped>
.wordmark {
  display: inline-flex;
  color: currentColor;
}

.wordmark__svg {
  display: block;
  width: auto;
  height: 100%;
}

.wordmark--sm .wordmark__svg { height: 22px; }
.wordmark--md .wordmark__svg { height: 30px; }
.wordmark--lg .wordmark__svg { height: 56px; }

.wordmark--mono.wordmark--sm .wordmark__svg { height: 28px; aspect-ratio: 1; }
.wordmark--mono.wordmark--md .wordmark__svg { height: 44px; aspect-ratio: 1; }
.wordmark--mono.wordmark--lg .wordmark__svg { height: 88px; aspect-ratio: 1; }
</style>
