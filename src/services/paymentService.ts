import APIBase from './httpBase'
import type { ApiResponse } from './authService'

export interface CheckoutSessionResponse {
  url: string
  sessionId: string
  isNewUser: boolean
  plainPassword?: string
  clientTransactionId: string
}

export interface ConfirmPaymentResponse {
  status: string
  isNewUser?: boolean
  plainPassword?: string
  email?: string
  stripePaymentStatus?: string
}

class PaymentService extends APIBase {
  async createCheckoutSession(data: { email: string; name: string; lastName: string; origin?: string }) {
    return this.post<ApiResponse<CheckoutSessionResponse>>('stripe/create-session', data)
  }

  async verifyPayment(sessionId: string) {
    return this.get<ApiResponse<ConfirmPaymentResponse>>(`stripe/verify/${sessionId}`)
  }

  async resendWelcomeEmail(sessionId: string) {
    return this.post<ApiResponse<{ resent: boolean; email: string }>>('stripe/resend-email', { sessionId })
  }

  async history() {
    return this.get<ApiResponse<{ hasActiveStripeSubscription: boolean; history: Array<{
      id: string
      type: 'manual' | 'stripe'
      plan: 'monthly' | 'annual' | 'lifetime'
      amount: number
      currency: 'USD'
      status: string
      clientTransactionId?: string
      createdAt: string
    }> }>>('payments/history')
  }

  async cancelPending() {
    return this.post<ApiResponse<{ canceled: number }>>('payments/cancel-pending', {})
  }

  async cancelSubscription() {
    return this.post<ApiResponse<{
      email: string
      subscriptionStatus: 'canceled'
      stripeSubscriptionStatus: 'canceled'
      canceledAt: string
      accessUntil: string | null
    }>>('payments/cancel-subscription', {})
  }
}

export const paymentService = new PaymentService()
export default PaymentService
