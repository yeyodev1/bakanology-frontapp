<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import TheNav from '@/components/layout/TheNav.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
useSmoothScroll()

const route = useRoute()

const isDashboard = computed(() => route.path.startsWith('/app') || route.path.startsWith('/admin'))
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <div class="app" :class="{ 'app--home': isHome }">
    <TheNav v-if="!isDashboard && !isHome" />
    <main class="app__main" :class="{ 'app__main--dashboard': isDashboard }">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <TheFooter v-if="!isDashboard" />
  </div>
</template>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

.app__main {
  flex: 1 1 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
