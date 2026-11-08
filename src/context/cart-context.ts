import { createContext } from 'react'
import type { CartLine } from '../types/cart'
import type { Product, Size } from '../types/product'

export interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  addItem: (product: Product, size: Size) => void
  setQuantity: (productId: string, size: Size, quantity: number) => void
  changeSize: (productId: string, from: Size, to: Size) => void
  removeItem: (productId: string, size: Size) => void
  clear: () => void
}

export const MAX_QUANTITY = 10

export const CartContext = createContext<CartContextValue | null>(null)
