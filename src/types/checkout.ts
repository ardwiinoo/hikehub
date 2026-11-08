import type { PAYMENT_METHODS, SHIPPING_METHODS } from '../data/checkout'

export type ShippingMethod = (typeof SHIPPING_METHODS)[number]['value']
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]['value']

export interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
}

export interface OrderPayload {
  email: string
  address: ShippingAddress
  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod
}
