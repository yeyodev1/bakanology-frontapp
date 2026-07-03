<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{
  (e: 'save', data: { name: string; lastName: string; email: string }): void
}>()

const form = reactive({
  name: '',
  lastName: '',
  email: '',
})

const props = defineProps<{
  initialName: string
  initialLastName: string
  initialEmail: string
  error: string
  message: string
}>()

form.name = props.initialName
form.lastName = props.initialLastName
form.email = props.initialEmail

function submit() {
  if (!form.name.trim() || !form.lastName.trim() || !form.email.trim()) return
  emit('save', {
    name: form.name.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
  })
}
</script>

<template>
  <section class="card">
    <h2 class="card__title">Editar perfil</h2>
    <form class="form" @submit.prevent="submit">
      <div class="form__row">
        <div class="form__field">
          <label for="s-name" class="form__label">Nombre</label>
          <input id="s-name" v-model="form.name" type="text" class="form__input" autocomplete="given-name" />
        </div>
        <div class="form__field">
          <label for="s-last" class="form__label">Apellido</label>
          <input id="s-last" v-model="form.lastName" type="text" class="form__input" autocomplete="family-name" />
        </div>
      </div>
      <div class="form__field">
        <label for="s-email" class="form__label">Correo electrónico</label>
        <input id="s-email" v-model="form.email" type="email" class="form__input" autocomplete="email" />
      </div>
      <p v-if="error" class="form__error">{{ error }}</p>
      <p v-if="message" class="form__success">{{ message }}</p>
      <button type="submit" class="form__submit">Guardar cambios</button>
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

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

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

@media (max-width: 640px) {
  .form__row { grid-template-columns: 1fr; }
}
</style>
