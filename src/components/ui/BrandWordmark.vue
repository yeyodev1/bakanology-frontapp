<script setup lang="ts">
import type { PropType } from 'vue'
import logoLargo from '@/assets/logo/logo-largo.png'
import logoCorto from '@/assets/logo/logo-corto.png'

const props = defineProps({
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    required: false,
    default: 'md'
  },
  variant: {
    type: String as PropType<'full' | 'mono'>,
    required: false,
    default: 'full'
  }
})
</script>

<template>
  <span class="wordmark" :class="[`wordmark--${size}`, `wordmark--${variant}`]" aria-label="Bakanology Academy">
    <img
      v-if="variant !== 'mono'"
      :src="logoLargo"
      alt="Bakanology Academy"
      class="wordmark__image wordmark__image--largo"
    />
    <img
      v-else
      :src="logoCorto"
      alt="Bakanology"
      class="wordmark__image wordmark__image--corto"
    />
  </span>
</template>

<style lang="scss" scoped>
.wordmark {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.wordmark__image {
  display: block;
  width: auto;
  object-fit: contain;
}

.wordmark--sm {
  .wordmark__image--largo {
    height: 28px;
  }
  .wordmark__image--corto {
    height: 28px;
  }
}

.wordmark--md {
  .wordmark__image--largo {
    height: 38px;
  }
  .wordmark__image--corto {
    height: 38px;
  }
}

.wordmark--lg {
  .wordmark__image--largo {
    height: 56px;
  }
  .wordmark__image--corto {
    height: 56px;
  }
}
</style>
