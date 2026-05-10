// Centralized site config: URLs, copy hub, redes.
// Cualquier CTA hacia el funnel VIP debe usar `buildVipUrl(placement)` para tagging UTM.

export const SITE_URL = 'https://luisapitabejarano.com'
export const VIP_URL = 'https://vip.luisapitabejarano.com'
export const INSTAGRAM_URL = 'https://www.instagram.com/luisapitabejarano/'
export const INSTAGRAM_HANDLE = '@luisapitabejarano'

export const buildVipUrl = (placement: string): string => {
  const params = new URLSearchParams({
    utm_source: 'site',
    utm_medium: 'cta',
    utm_campaign: 'community',
    utm_content: placement,
  })
  return `${VIP_URL}?${params.toString()}`
}

export const CLOUDINARY_CDN = 'https://res.cloudinary.com/dkosgkjpq/image/upload'

/** Helper para URLs de Cloudinary con transformaciones */
export const cld = (
  publicId: string,
  transform = 'q_auto,f_auto',
): string => `${CLOUDINARY_CDN}/${transform}/${publicId}`

export const SITE_COPY = {
  brand: 'Luisa Pita Bejarano',
  brandShort: 'Luisa Pita',
  tagline: 'Un año contigo, un año cerca de Luisa.',
  ctaPrimary: 'Únete a la comunidad',
  ctaPrimaryShort: 'Únete',
  ctaSecondary: 'Solicitar invitación',
} as const
