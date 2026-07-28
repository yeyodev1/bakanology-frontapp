import APIBase from './httpBase'
import type { ApiResponse } from './authService'

export interface PurchasedProduct {
  slug: string
  name: string
  type: string
  description: string
  purchasedAt: string
  amount: number
  currency: string
}

class ProductService extends APIBase {
  async purchased() {
    return this.get<ApiResponse<{ products: PurchasedProduct[] }>>('products/purchased')
  }

  async read(slug: string) {
    return this.get<Blob>(`products/${encodeURIComponent(slug)}/read`, undefined, {
      responseType: 'blob',
    })
  }
}

export const productService = new ProductService()
export default ProductService
