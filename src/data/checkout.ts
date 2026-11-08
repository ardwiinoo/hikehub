import gosend from '../assets/brands/gosend.svg'
import jne from '../assets/brands/jne.webp'
import jnt from '../assets/brands/jnt.svg'
import mastercard from '../assets/brands/mastercard.svg'
import paypal from '../assets/brands/paypal.svg'

export const FREE_SHIPPING_MIN = 500_000

export const SHIPPING_METHODS = [
  {
    value: 'jne',
    label: 'JNE Reguler',
    eta: '2–3 hari kerja',
    price: 20_000,
    logo: jne,
    freeEligible: true,
  },
  {
    value: 'jnt',
    label: 'J&T Express',
    eta: '2–4 hari kerja',
    price: 18_000,
    logo: jnt,
    freeEligible: true,
  },
  {
    value: 'gosend',
    label: 'GoSend Same Day',
    eta: 'Tiba hari ini',
    price: 35_000,
    logo: gosend,
    freeEligible: false,
  },
] as const

export const PAYMENT_METHODS = [
  { value: 'card', label: 'Kartu Kredit / Debit', logo: mastercard },
  { value: 'paypal', label: 'PayPal', logo: paypal },
  { value: 'transfer', label: 'Transfer Bank / Virtual Account', logo: null },
] as const

export const PROVINCES = [
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'DI Yogyakarta',
  'Jawa Timur',
  'Banten',
  'Bali',
  'Sumatera Utara',
  'Sumatera Barat',
  'Sulawesi Selatan',
  'Kalimantan Timur',
  'Nusa Tenggara Barat',
] as const
