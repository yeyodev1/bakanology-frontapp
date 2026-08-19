<script setup lang="ts">
import { PLAN_OPTIONS, type PlanId } from '@/config/plans'

defineProps<{
  modelValue: PlanId
  disabled?: boolean
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: PlanId): void }>()

function select(id: PlanId) {
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="plan-selector" role="radiogroup" aria-label="Elige tu plan">
    <button
      v-for="plan in PLAN_OPTIONS"
      :key="plan.id"
      type="button"
      class="plan-selector__option"
      :class="{
        'plan-selector__option--active': modelValue === plan.id,
        'plan-selector__option--highlight': plan.highlight,
      }"
      role="radio"
      :aria-checked="modelValue === plan.id"
      :disabled="disabled"
      @click="select(plan.id)"
    >
      <span class="plan-selector__radio" aria-hidden="true">
        <Transition name="radio-dot">
          <span v-if="modelValue === plan.id" class="plan-selector__radio-dot" />
        </Transition>
      </span>

      <span class="plan-selector__info">
        <span class="plan-selector__label-row">
          <span class="plan-selector__label">{{ plan.label }}</span>
          <Transition name="badge-pop" appear>
            <span v-if="plan.badge" class="plan-selector__badge">{{ plan.badge }}</span>
          </Transition>
        </span>
        <span class="plan-selector__note">{{ plan.note }}</span>
      </span>

      <span class="plan-selector__price">
        <span class="plan-selector__amount">${{ plan.price }}</span>
        <span class="plan-selector__period">{{ plan.period }}</span>
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.plan-selector {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.plan-selector__option {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  padding: 0.9rem 1rem;
  background: $white;
  border: 1.5px solid $gray-200;
  border-radius: 1rem;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease,
    background 0.25s ease;

  &:hover:not(:disabled) {
    border-color: $gray-400;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--active {
    border-color: $bakano-pink;
    background: rgba($bakano-pink, 0.04);
    box-shadow: 0 6px 20px rgba($bakano-pink, 0.15);

    &:hover:not(:disabled) {
      border-color: $bakano-pink;
    }
  }
}

.plan-selector__radio {
  flex-shrink: 0;
  width: 1.15rem;
  height: 1.15rem;
  border: 2px solid $gray-300;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.25s ease;

  .plan-selector__option--active & {
    border-color: $bakano-pink;
  }
}

.plan-selector__radio-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: $bakano-pink;
}

.plan-selector__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.plan-selector__label-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.plan-selector__label {
  font-family: $font-sans;
  font-size: 0.95rem;
  font-weight: 700;
  color: $bakano-dark;
}

.plan-selector__badge {
  font-family: $font-mono;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: $bakano-pink;
  color: $white;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.plan-selector__note {
  font-family: $font-sans;
  font-size: 0.75rem;
  color: $gray-500;
  line-height: 1.3;
}

.plan-selector__price {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
}

.plan-selector__amount {
  font-family: $font-display;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1;
  color: $bakano-dark;
}

.plan-selector__period {
  font-family: $font-sans;
  font-size: 0.7rem;
  color: $gray-500;
}

/* Transitions */
.radio-dot-enter-active,
.radio-dot-leave-active {
  transition: transform 0.2s cubic-bezier(0.2, 0.7, 0, 1.4), opacity 0.2s ease;
}

.radio-dot-enter-from,
.radio-dot-leave-to {
  transform: scale(0);
  opacity: 0;
}

.badge-pop-enter-active {
  transition: transform 0.3s cubic-bezier(0.2, 0.7, 0, 1.3), opacity 0.3s ease;
}

.badge-pop-enter-from {
  transform: scale(0.7);
  opacity: 0;
}
</style>
