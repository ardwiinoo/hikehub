import { useEffect, useState, type ReactNode } from 'react'
import { findProduct } from '../lib/catalog'
import { readStorage, writeStorage } from '../lib/storage'
import type { CartItem, CartLine } from '../types/cart'
import type { Size } from '../types/product'
import { CartContext, MAX_QUANTITY, type CartContextValue } from './cart-context'

const STORAGE_KEY = 'hikehub:cart'

const isCartItems = (value: unknown): value is CartItem[] =>
  Array.isArray(value) &&
  value.every(
    (item: unknown) =>
      typeof item === 'object' && item !== null && 'productId' in item && 'size' in item,
  )

const sameLine = (item: CartItem, productId: string, size: Size) =>
  item.productId === productId && item.size === size

/** Adds quantity to an existing line or appends a new one. */
const mergeItem = (items: CartItem[], next: CartItem) => {
  const existing = items.find((i) => sameLine(i, next.productId, next.size))
  if (!existing) return [...items, next]
  return items.map((i) =>
    i === existing ? { ...i, quantity: Math.min(i.quantity + next.quantity, MAX_QUANTITY) } : i,
  )
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStorage(STORAGE_KEY, isCartItems) ?? [])

  useEffect(() => {
    writeStorage(STORAGE_KEY, items)
  }, [items])

  const lines = items.flatMap((item): CartLine[] => {
    const product = findProduct(item.productId)
    return product ? [{ ...item, product, lineTotal: product.price * item.quantity }] : []
  })

  const value: CartContextValue = {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
    addItem: (product, size) => {
      setItems((prev) => mergeItem(prev, { productId: product.id, size, quantity: 1 }))
    },
    setQuantity: (productId, size, quantity) => {
      const qty = Math.max(1, Math.min(quantity, MAX_QUANTITY))
      setItems((prev) =>
        prev.map((i) => (sameLine(i, productId, size) ? { ...i, quantity: qty } : i)),
      )
    },
    changeSize: (productId, from, to) => {
      setItems((prev) => {
        const current = prev.find((i) => sameLine(i, productId, from))
        if (!current || from === to) return prev
        const rest = prev.filter((i) => i !== current)
        return mergeItem(rest, { ...current, size: to })
      })
    },
    removeItem: (productId, size) => {
      setItems((prev) => prev.filter((i) => !sameLine(i, productId, size)))
    },
    clear: () => {
      setItems([])
    },
  }

  return <CartContext value={value}>{children}</CartContext>
}
