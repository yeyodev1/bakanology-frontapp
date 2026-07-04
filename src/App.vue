<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import TheNav from '@/components/layout/TheNav.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import StickyOfferBar from '@/components/presale/StickyOfferBar.vue'

useSmoothScroll()

const route = useRoute()
const userStore = useUserStore()

const isDashboard = computed(() => route.path.startsWith('/app') || route.path.startsWith('/admin'))
const showStickyBar = computed(() => !isDashboard.value && !userStore.isAuthenticated)
</script>

<template>
  <div class="app" :class="{ 'app--sticky': showStickyBar }">
    <StickyOfferBar v-if="showStickyBar" />
    <TheNav v-if="!isDashboard" />
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

.app--sticky {
  padding-top: 48px;
  --sticky-offset: 48px;
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
