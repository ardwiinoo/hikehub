import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PRODUCTS } from '../../data/products'
import { RECENT_BUYERS } from '../../data/social-proof'
import type { Product } from '../../types/product'
import { ProductArt } from '../product/ProductArt'

const FIRST_DELAY_MS = 6_000
const VISIBLE_MS = 5_000
const INTERVAL_MS = 18_000

interface Purchase {
  buyer: (typeof RECENT_BUYERS)[number]
  product: Product
  minutesAgo: number
}

const pick = <T,>(list: readonly T[]): T => {
  const item = list[Math.floor(Math.random() * list.length)]
  if (item === undefined) throw new Error('Cannot pick from an empty list')
  return item
}

const randomPurchase = (): Purchase => ({
  buyer: pick(RECENT_BUYERS),
  product: pick(PRODUCTS),
  minutesAgo: 1 + Math.floor(Math.random() * 14),
})

interface RecentPurchaseToastProps {
  onSelect: (product: Product) => void
}

/** Social-proof toast with dummy data, cycling while the landing page is open. */
export function RecentPurchaseToast({ onSelect }: RecentPurchaseToastProps) {
  const [purchase, setPurchase] = useState<Purchase | null>(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    let hideTimer: ReturnType<typeof setTimeout> | undefined

    const show = () => {
      setPurchase(randomPurchase())
      setVisible(true)
      hideTimer = setTimeout(() => {
        setVisible(false)
      }, VISIBLE_MS)
    }

    const firstTimer = setTimeout(show, FIRST_DELAY_MS)
    const interval = setInterval(show, INTERVAL_MS)
    return () => {
      clearTimeout(firstTimer)
      clearTimeout(hideTimer)
      clearInterval(interval)
    }
  }, [dismissed])

  if (!purchase || dismissed) return null
  const { buyer, product, minutesAgo } = purchase

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-x-4 bottom-4 z-30 transition duration-500 sm:right-auto sm:left-6 sm:w-80 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <div className="relative flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 pr-9 shadow-xl">
        <button
          type="button"
          onClick={() => {
            onSelect(product)
            setVisible(false)
          }}
          className="flex min-w-0 items-center gap-3 text-left"
        >
          <span className="size-14 shrink-0 rounded-lg bg-zinc-100">
            <ProductArt
              category={product.category}
              color={product.color}
              className="size-full p-1.5"
            />
          </span>
          <span className="min-w-0 text-sm">
            <span className="block text-zinc-600">
              <span className="font-semibold text-zinc-900">{buyer.name}</span> dari {buyer.city}{' '}
              baru saja membeli
            </span>
            <span className="block truncate font-semibold">{product.name}</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="size-1.5 rounded-full bg-green-500" aria-hidden />
              {minutesAgo} menit lalu
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setDismissed(true)
          }}
          aria-label="Tutup notifikasi"
          className="absolute top-2 right-2 rounded p-1 text-zinc-400 hover:text-zinc-900"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
