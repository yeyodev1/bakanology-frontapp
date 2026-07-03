<script setup lang="ts">
interface Props {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  modelValue: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: true,
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="auth-input">
    <label :for="id" class="auth-input__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      class="auth-input__field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style lang="scss" scoped>
.auth-input {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.auth-input__label {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $gray-700;
}

.auth-input__field {
  font-family: $font-sans;
  font-size: 1rem;
  color: $bakano-dark;
  background: $light;
  border: 1px solid rgba($bakano-dark, 0.08);
  border-radius: 0.75rem;
  padding: 0.85rem 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: rgba($gray-500, 0.6);
  }

  &:focus {
    outline: none;
    border-color: $bakano-green;
    box-shadow: 0 0 0 3px rgba($bakano-green, 0.15);
  }
}
</style>
