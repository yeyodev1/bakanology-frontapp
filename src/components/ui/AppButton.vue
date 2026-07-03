<script setup lang="ts">
defineProps<{
  href?: string
  variant?: 'primary' | 'ghost' | 'outline-light'
  size?: 'md' | 'lg'
  target?: string
  disabled?: boolean
  loading?: boolean
}>()
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="target ?? '_blank'"
    rel="noopener"
    class="btn"
    :class="[`btn--${variant ?? 'primary'}`, `btn--${size ?? 'md'}`]"
  >
    <span class="btn__label"><slot /></span>
    <svg class="btn__arrow" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
  <button
    v-else
    type="button"
    class="btn"
    :class="[`btn--${variant ?? 'primary'}`, `btn--${size ?? 'md'}`]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <span class="btn__label"><slot /></span>
    <svg v-if="!loading" class="btn__arrow" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  border-radius: 999px;
  font-family: $font-mono;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background .25s ease, color .25s ease, border-color .25s ease, transform .25s ease, box-shadow .25s ease;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  width: max-content;

  &__arrow {
    transition: transform .35s cubic-bezier(.2,.7,0,1);
  }

  &:hover &__arrow {
    transform: translateX(4px);
  }

  &__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: btn-spin 0.75s linear infinite;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}

.btn--md {
  padding: 0.85rem 1.4rem;
  font-size: 0.8rem;
}

.btn--lg {
  padding: 1.15rem 1.95rem;
  font-size: 0.88rem;
}

.btn--primary {
  background: $bakano-green;
  color: $bakano-dark;
  box-shadow: 0 12px 32px rgba($bakano-green, 0.28);

  &:hover {
    background: $bakano-green;
    color: $white;
    transform: translateY(-2px);
    box-shadow: 0 18px 42px rgba($bakano-green, 0.38);
  }
}

.btn--ghost {
  background: $bakano-dark;
  color: $white;

  &:hover {
    background: $bakano-green;
    color: $bakano-dark;
    transform: translateY(-2px);
  }
}

.btn--outline-light {
  background: transparent;
  color: $white;
  border-color: rgba($white, 0.4);

  &:hover {
    background: $white;
    color: $bakano-dark;
    border-color: $white;
  }
}
</style>
