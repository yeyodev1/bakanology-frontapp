import type { Router } from 'vue-router'

export function resolveSafeRedirect(router: Router, value: unknown): string | null {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return null
  }

  const resolved = router.resolve(value)
  if (!resolved.matched.length || resolved.name === 'login') return null

  return resolved.fullPath
}
