import APIBase from './httpBase'
import type { ApiResponse } from './authService'

export interface PresaleStatus {
  deadline: string
  isActive: boolean
  annualPrice: number
  monthlyPrice: number
}

class PresaleService extends APIBase {
  async getStatus() {
    return this.get<ApiResponse<PresaleStatus>>('presale/status')
  }
}

export const presaleService = new PresaleService()
export default PresaleService
