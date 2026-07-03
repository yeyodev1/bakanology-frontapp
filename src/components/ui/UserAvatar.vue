<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  name?: string | null
  lastName?: string | null
  picture?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  lastName: '',
  picture: null,
  size: 'md',
})

const imgError = ref(false)

const initials = computed(() => {
  const first = props.name?.[0] ?? ''
  const last = props.lastName?.[0] ?? ''
  return (first + last).toUpperCase() || 'U'
})

const showImage = computed(() => props.picture && !imgError.value)

const safeSrc = computed(() => props.picture || undefined)

const sizeClass = computed(() => `user-avatar--${props.size}`)

function onImgError() {
  imgError.value = true
}
</script>

<template>
  <div class="user-avatar" :class="sizeClass">
    <img
      v-if="showImage"
      :src="safeSrc"
      :alt="`Foto de ${name || 'usuario'} ${lastName || ''}`"
      class="user-avatar__image"
      @error="onImgError"
    />
    <span v-else class="user-avatar__initials">{{ initials }}</span>
  </div>
</template>

<style lang="scss" scoped>
.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, $bakano-green 0%, $bakano-green 100%);
  color: $bakano-dark;
  font-family: $font-mono;
  font-weight: 700;
}

.user-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar__initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.user-avatar--sm {
  width: 28px;
  height: 28px;
  font-size: 0.65rem;
}

.user-avatar--md {
  width: 38px;
  height: 38px;
  font-size: 0.8rem;
}

.user-avatar--lg {
  width: 56px;
  height: 56px;
  font-size: 1rem;
}

.user-avatar--xl {
  width: 96px;
  height: 96px;
  font-size: 1.5rem;
}
</style>
