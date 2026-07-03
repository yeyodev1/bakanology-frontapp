<script setup lang="ts">
import UserAvatar from '@/components/ui/UserAvatar.vue'

const props = defineProps<{
  currentPicture: string | null
  userName: string
  userLastName: string
  previewUrl: string | null
  hasFile: boolean
  loading: boolean
  deleting: boolean
  error: string
  message: string
}>()

const emit = defineEmits<{
  (e: 'select', file: File): void
  (e: 'upload'): void
  (e: 'delete'): void
}>()

function onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const f = target.files?.[0]
  if (!f) return
  if (!f.type.startsWith('image/')) return
  if (f.size > 5 * 1024 * 1024) return
  emit('select', f)
}

function displayUrl() {
  return props.previewUrl || props.currentPicture
}
</script>

<template>
  <section class="card">
    <h2 class="card__title">Foto de perfil</h2>
    <div class="profile">
      <UserAvatar :name="userName" :last-name="userLastName" :picture="displayUrl()" size="xl" />
      <div class="profile__controls">
        <label class="profile__upload" for="pic-input">Seleccionar foto</label>
        <input id="pic-input" type="file" accept="image/*" class="profile__input" @change="onFileSelected" />
        <div class="profile__actions">
          <button v-if="hasFile" class="profile__save" type="button" :disabled="loading" @click="$emit('upload')">
            {{ loading ? 'Subiendo...' : 'Guardar foto' }}
          </button>
          <button v-if="!hasFile && currentPicture" class="profile__delete" type="button" :disabled="deleting" @click="$emit('delete')">
            {{ deleting ? 'Eliminando...' : 'Eliminar foto' }}
          </button>
        </div>
        <p v-if="error" class="profile__error">{{ error }}</p>
        <p v-if="message" class="profile__success">{{ message }}</p>
        <p class="profile__hint">JPG, PNG o Webp. Máximo 5 MB. Se recortará en formato cuadrado.</p>
      </div>
    </div>
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

.profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.profile__controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.profile__upload {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: $bakano-dark;
  color: $white;
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover { background: $bakano-green; }
}

.profile__input {
  position: absolute;
  width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

.profile__actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.profile__save {
  background: $bakano-green;
  color: $bakano-dark;
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  transition: background 0.2s ease;

  &:hover:not(:disabled) { background: $bakano-green; color: $white; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.profile__delete {
  background: transparent;
  color: $alert-error;
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  border: 1px solid $alert-error;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) { background: $alert-error; color: $white; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.profile__hint, .profile__error, .profile__success {
  font-family: $font-sans;
  font-size: 0.8rem;
  margin: 0;
}
.profile__hint { color: $gray-500; }
.profile__error { color: $alert-error; }
.profile__success { color: $bakano-green; }

@media (max-width: 640px) {
  .profile { flex-direction: column; align-items: flex-start; }
}
</style>
