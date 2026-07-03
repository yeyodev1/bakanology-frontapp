export const SITE_URL = 'https://bakanology.bakano.ec'
export const INSTAGRAM_URL = 'https://www.instagram.com/bakano.ec/'
export const INSTAGRAM_HANDLE = '@bakano.ec'

export const CLOUDINARY_CDN = 'https://res.cloudinary.com/mrp1wwq1/image/upload'

export const cld = (
  publicId: string,
  transform = 'q_auto,f_auto',
): string => `${CLOUDINARY_CDN}/${transform}/${publicId}`

export const SITE_COPY = {
  brand: 'Bakanology Academy',
  brandShort: 'Bakanology',
  tagline: 'Marketing de performance sin pagar una agencia.',
  ctaPrimary: 'Quiero ser miembro fundador',
  ctaPrimaryShort: 'Quiero ser miembro',
  ctaSecondary: 'Ver el plan',
} as const
