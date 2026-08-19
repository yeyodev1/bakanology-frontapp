export type PlanId = 'monthly' | 'annual' | 'lifetime'

export interface PlanOption {
  id: PlanId
  label: string
  price: number
  period: string
  note: string
  badge?: string
  highlight?: boolean
}

export const MONTHLY_PRICE = 47
export const ANNUAL_PRICE = 282
export const LIFETIME_PRICE = 297
export const YEARLY_EQUIVALENT = MONTHLY_PRICE * 12

const LIFETIME_OPTION: PlanOption = {
  id: 'lifetime',
  label: 'De por vida',
  price: LIFETIME_PRICE,
  period: 'único pago',
  note: 'Oferta fundador · acceso para siempre',
  badge: 'Mejor inversión',
}

export const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'monthly',
    label: 'Mensual',
    price: MONTHLY_PRICE,
    period: '/ mes',
    note: 'Cancela cuando quieras',
  },
  {
    id: 'annual',
    label: 'Anual',
    price: ANNUAL_PRICE,
    period: '/ año',
    note: '12 meses al precio de 6 · incluye CRM y Telegram VIP',
    badge: '6 meses gratis',
    highlight: true,
  },
  LIFETIME_OPTION,
]

export const getPlan = (id: PlanId): PlanOption =>
  PLAN_OPTIONS.find((plan) => plan.id === id) ?? LIFETIME_OPTION
