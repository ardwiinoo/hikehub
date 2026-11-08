import type { Product, Size } from './product'

export interface CartItem {
  productId: string
  size: Size
  quantity: number
}

export interface CartLine extends CartItem {
  product: Product
  lineTotal: number
}
