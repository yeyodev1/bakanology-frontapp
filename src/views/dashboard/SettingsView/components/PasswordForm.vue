<script setup lang="ts">
import { reactive } from 'vue'

defineProps<{
  error: string
  message: string
}>()

const emit = defineEmits<{
  (e: 'change', data: { current: string; new: string }): void
}>()

const form = reactive({
  current: '',
  new: '',
  confirm: '',
})

function submit() {
  if (!form.current || !form.new || !form.confirm) return
  if (form.new.length < 6) return
  if (form.new !== form.confirm) return
  emit('change', { current: form.current, new: form.new })
  form.current = ''
  form.new = ''
  form.confirm = ''
}
</script>

<template>
  <section class="card">
    <h2 class="card__title">Cambiar contraseña</h2>
    <form class="form" @submit.prevent="submit">
      <div class="form__field">
        <label for="pw-current" class="form__label">Contraseña actual</label>
        <input id="pw-current" v-model="form.current" type="password" class="form__input" autocomplete="current-password" />
      </div>
      <div class="form__field">
        <label for="pw-new" class="form__label">Nueva contraseña</label>
        <input id="pw-new" v-model="form.new" type="password" class="form__input" autocomplete="new-password" />
      </div>
      <div class="form__field">
        <label for="pw-confirm" class="form__label">Confirmar nueva contraseña</label>
        <input id="pw-confirm" v-model="form.confirm" type="password" class="form__input" autocomplete="new-password" />
      </div>
      <p v-if="error" class="form__error">{{ error }}</p>
      <p v-if="message" class="form__success">{{ message }}</p>
      <button type="submit" class="form__submit">Actualizar contraseña</button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.card {
  background: $white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &__title {
    font-family: $font-display;
    font-size: 1.25rem;
    font-weight: 400;
    color: $bakano-dark;
    margin: 0;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  &__label {
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $gray-600;
  }

  &__input {
    font-family: $font-sans;
    font-size: 1rem;
    color: $bakano-dark;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 0.85rem 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: $bakano-green;
      box-shadow: 0 0 0 3px rgba($bakano-green, 0.15);
    }
  }

  &__error {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $alert-error;
    margin: 0;
  }

  &__success {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $bakano-green;
    margin: 0;
  }

  &__submit {
    align-self: flex-start;
    background: $bakano-dark;
    color: $white;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.85rem 1.5rem;
    border-radius: 999px;
    transition: background 0.2s ease;

    &:hover { background: $bakano-green; }
  }
}
</style>
