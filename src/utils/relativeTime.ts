const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
]

const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

// "hace 5 minutos", "ayer", "hace 2 semanas"
export function relativeTime(value: string | Date): string {
  const seconds = Math.round((new Date(value).getTime() - Date.now()) / 1000)
  if (Math.abs(seconds) < 45) return 'ahora mismo'
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size || unit === 'minute') {
      return formatter.format(Math.round(seconds / size), unit)
    }
  }
  return ''
}

export function fullDate(value: string | Date): string {
  return new Date(value).toLocaleString('es-EC', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}
