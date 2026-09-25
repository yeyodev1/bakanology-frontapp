import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/user'
import AppSelect from '@/components/ui/AppSelect.vue'
import '@/styles/global.scss'
import { useTheme } from '@/composables/useTheme'

const app = createApp(App)
app.component('AppSelect', AppSelect)

const pinia = createPinia()
app.use(pinia)

const userStore = useUserStore()
userStore.hydrate()

app.use(router)

const theme = useTheme()
router.afterEach((to) => theme.setPath(to.path))

router.isReady().then(() => {
  app.mount('#app')
})
