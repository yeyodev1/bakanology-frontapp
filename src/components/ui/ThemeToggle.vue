<script setup lang="ts">
import { useTheme, type ThemePreference } from '@/composables/useTheme'

const { preference, setPreference } = useTheme()

const options: Array<{ value: ThemePreference; label: string; icon: string }> = [
  { value: 'light', label: 'Tema claro', icon: 'fa-sun' },
  { value: 'dark', label: 'Tema oscuro', icon: 'fa-moon' },
  { value: 'system', label: 'Usar el tema del sistema', icon: 'fa-desktop' },
]
</script>

<template>
  <div class="theme-toggle" role="group" aria-label="Tema de la interfaz">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="theme-toggle__option"
      :aria-pressed="preference === option.value"
      :aria-label="option.label"
      :title="option.label"
      @click="setPreference(option.value)"
    >
      <i class="fa-solid" :class="option.icon" aria-hidden="true" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.theme-toggle {
  display: inline-flex;
  gap: 0.2rem;
  padding: 0.2rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;
  background: var(--c-surface-2);

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--c-text-muted);
    font-size: 0.85rem;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover { color: var(--c-text); }

    &[aria-pressed='true'] {
      background: var(--c-surface);
      color: var(--c-accent-text);
      box-shadow: 0 1px 3px rgb(var(--c-shadow-rgb) / 0.15);
    }

    &:focus-visible {
      outline: 2px solid var(--c-accent);
      outline-offset: 2px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle__option { transition: none; }
}
</style>
