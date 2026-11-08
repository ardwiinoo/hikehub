import { delay } from '../lib/delay'
import type { CartItem } from '../types/cart'
import type { OrderPayload } from '../types/checkout'

// TODO: replace with POST /api/orders
export async function placeOrder(
  payload: OrderPayload & { items: CartItem[] },
): Promise<{ orderId: string }> {
  if (payload.items.length === 0) throw new Error('Cart is empty')
  await delay(1000)
  return { orderId: `HH-${Date.now().toString(36).toUpperCase()}` }
}
