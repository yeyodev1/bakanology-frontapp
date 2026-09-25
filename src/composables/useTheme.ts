import { ref, computed } from 'vue'
import { userService } from '@/services/userService'

export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

// Debe coincidir con el script inline de index.html
const STORAGE_KEY = 'bakanology-theme'
const LIGHT_ONLY_PATHS = ['/', '/politicas-privacidad', '/aviso-legal']

function readStored(): ThemePreference {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

function writeStored(value: ThemePreference) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {}
}

function hasSession() {
  try {
    return !!localStorage.getItem('access_token')
  } catch {
    return false
  }
}

const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null
const preference = ref<ThemePreference>(readStored())
const systemDark = ref(media?.matches ?? false)
const currentPath = ref(typeof window !== 'undefined' ? window.location.pathname : '/')

const resolved = computed<ResolvedTheme>(() => {
  if (LIGHT_ONLY_PATHS.includes(currentPath.value)) return 'light'
  if (preference.value === 'system') return systemDark.value ? 'dark' : 'light'
  return preference.value
})

function paint(animate: boolean) {
  const root = document.documentElement
  const next = resolved.value
  if (root.dataset.theme === next) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const swap = () => {
    root.dataset.theme = next
  }

  if (!animate || reduceMotion) {
    swap()
    return
  }

  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  if (doc.startViewTransition) {
    doc.startViewTransition(swap)
    return
  }

  root.classList.add('theme-transition')
  swap()
  window.setTimeout(() => root.classList.remove('theme-transition'), 300)
}

media?.addEventListener('change', (event) => {
  systemDark.value = event.matches
  if (preference.value === 'system') paint(true)
})

export function useTheme() {
  function setPreference(value: ThemePreference, options: { sync?: boolean; animate?: boolean } = {}) {
    const { sync = true, animate = true } = options
    preference.value = value
    writeStored(value)
    paint(animate)
    if (sync && hasSession()) userService.updateThemePreference(value).catch(() => {})
  }

  // Al navegar: el home público siempre es claro, sin animación
  function setPath(path: string) {
    currentPath.value = path
    paint(false)
  }

  return { preference, resolved, setPreference, setPath }
}
