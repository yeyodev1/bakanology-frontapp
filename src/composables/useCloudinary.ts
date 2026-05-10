import { CLOUDINARY_CDN } from '@/config/site'

interface ImgOpts {
  w?: number
  h?: number
  ar?: string         // ej. '4:5' '16:9'
  crop?: 'fill' | 'fit' | 'thumb' | 'scale'
  gravity?: 'face' | 'auto' | 'center'
  quality?: 'auto' | number
  format?: 'auto' | 'avif' | 'webp' | 'jpg'
  dpr?: number | 'auto'
  blur?: number
}

const build = (opts: ImgOpts): string => {
  const parts: string[] = []
  if (opts.w) parts.push(`w_${opts.w}`)
  if (opts.h) parts.push(`h_${opts.h}`)
  if (opts.ar) parts.push(`ar_${opts.ar.replace(':', '_')}`)
  if (opts.crop) parts.push(`c_${opts.crop}`)
  if (opts.gravity) parts.push(`g_${opts.gravity}`)
  parts.push(`q_${opts.quality ?? 'auto'}`)
  parts.push(`f_${opts.format ?? 'auto'}`)
  if (opts.dpr) parts.push(`dpr_${opts.dpr}`)
  if (opts.blur) parts.push(`e_blur:${opts.blur}`)
  return parts.join(',')
}

export const useCloudinary = () => {
  const img = (publicId: string, opts: ImgOpts = {}) =>
    `${CLOUDINARY_CDN}/${build(opts)}/${publicId}`

  const luisa = (variant: number, opts: ImgOpts = {}) =>
    img(`luisa-pita/luisa-${variant}.jpg`, opts)

  return { img, luisa, build }
}

// Fallback estático para SSR-friendly templates: srcSet construido
export const buildSrcSet = (publicId: string, widths: number[], opts: Omit<ImgOpts, 'w'> = {}) =>
  widths
    .map((w) => {
      const t = build({ ...opts, w })
      return `${CLOUDINARY_CDN}/${t}/${publicId} ${w}w`
    })
    .join(', ')
