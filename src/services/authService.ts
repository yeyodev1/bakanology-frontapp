import APIBase from './httpBase'

export interface ApiResponse<T> {
  data: T
  message: string
}

export interface RegisterPayload {
  name: string
  lastName: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    lastName: string
    email: string
    profilePicture: string | null
    role: 'user' | 'admin'
    isVerified: boolean
    subscriptionStatus: 'none' | 'pending' | 'active' | 'canceled'
    accessUntil: string | null
    foundingMember: boolean
    themePreference?: 'light' | 'dark' | 'system'
  }
}

export interface MeResponse {
  id: string
  name: string
  lastName: string
  email: string
  profilePicture: string | null
  role: 'user' | 'admin'
  isVerified: boolean
  subscriptionStatus: 'none' | 'pending' | 'active' | 'canceled'
  accessUntil: string | null
  foundingMember: boolean
  themePreference?: 'light' | 'dark' | 'system'
}

class AuthService extends APIBase {
  async register(payload: RegisterPayload) {
    return this.post<ApiResponse<{ email: string }>>('auth/register', payload)
  }

  async login(payload: LoginPayload) {
    return this.post<ApiResponse<AuthResponse>>('auth/login', payload)
  }

  async verify(token: string) {
    return this.get<ApiResponse<AuthResponse>>('auth/verify', undefined, {
      params: { token },
    })
  }

  async me() {
    return this.get<ApiResponse<{ user: MeResponse }>>('auth/me')
  }

  async forgotPassword(email: string) {
    return this.post<ApiResponse<{ email: string }>>('auth/forgot-password', { email })
  }

  async resetPassword(token: string, newPassword: string) {
    return this.post<ApiResponse<{ email: string }>>('auth/reset-password', { token, newPassword })
  }
}

export const authService = new AuthService()
export default AuthService
