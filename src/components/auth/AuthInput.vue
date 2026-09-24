<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  modelValue: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: true,
})

const revealed = ref(false)
const inputType = computed(() =>
  props.type === 'password' && revealed.value ? 'text' : props.type,
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="auth-input">
    <label :for="id" class="auth-input__label">{{ label }}</label>
    <div class="auth-input__control">
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :autocomplete="autocomplete"
        class="auth-input__field"
        :class="{ 'auth-input__field--with-toggle': type === 'password' }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="auth-input__toggle"
        :aria-label="revealed ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        :aria-pressed="revealed"
        :aria-controls="id"
        @click="revealed = !revealed"
      >
        <i :class="revealed ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-input {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.auth-input__label {
  font-family: $font-sans;
  font-size: 0.85rem;
  font-weight: 600;
  color: $gray-800;
}

.auth-input__control {
  position: relative;
}

.auth-input__field {
  font-family: $font-sans;
  font-size: 1rem;
  color: $bakano-dark;
  background: $light;
  border: 1px solid rgba($bakano-dark, 0.08);
  border-radius: 0.75rem;
  padding: 0.85rem 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &--with-toggle {
    padding-right: 3rem;
  }

  &::placeholder {
    color: $gray-500;
  }

  &:hover {
    border-color: rgba($bakano-dark, 0.18);
  }

  &:focus {
    outline: none;
    background: $white;
    border-color: $bakano-pink;
    box-shadow: 0 0 0 3px rgba($bakano-pink, 0.15);
  }
}

.auth-input__toggle {
  position: absolute;
  top: 50%;
  right: 0.35rem;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  min-height: 0;
  border-radius: 0.6rem;
  color: $gray-600;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: $bakano-dark;
    background: rgba($bakano-dark, 0.05);
  }
}
</style>
