import { Check, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { COLORS } from '../../data/catalog'
import { useCart } from '../../hooks/useCart'
import { formatPrice, getCategoryLabel } from '../../lib/catalog'
import type { Product } from '../../types/product'
import { ProductArt } from './ProductArt'

const GENDER_LABEL: Record<Product['gender'], string> = {
  men: 'Pria',
  women: 'Wanita',
  unisex: 'Unisex',
}

const revealOnHover =
  'md:translate-y-2 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [picking, setPicking] = useState(false)
  const [added, setAdded] = useState(false)
  const { name, category, gender, color, sizes, price, originalPrice, isNew } = product
  const colorLabel = COLORS.find((c) => c.value === color)?.label
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => {
      setAdded(false)
    }, 1500)
    return () => {
      clearTimeout(timer)
    }
  }, [added])

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100">
        <ProductArt
          category={category}
          color={color}
          className="size-full p-6 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {isNew && (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold">Baru</span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>

        {picking ? (
          <div className="absolute inset-x-2 bottom-2 rounded-lg bg-white p-3 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold">Pilih ukuran</p>
              <button
                type="button"
                onClick={() => {
                  setPicking(false)
                }}
                aria-label="Batal"
                className="rounded p-0.5 text-zinc-500 hover:text-zinc-900"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    addItem(product, size)
                    setPicking(false)
                    setAdded(true)
                  }}
                  className="min-w-9 rounded-md border border-zinc-300 px-2 py-1.5 text-xs font-medium hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setPicking(true)
            }}
            className={`absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-white shadow-lg transition ${
              added ? 'bg-green-600' : `bg-zinc-900 hover:bg-zinc-700 ${revealOnHover}`
            }`}
          >
            {added ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <ShoppingBag className="size-4" aria-hidden />
            )}
            {added ? 'Ditambahkan' : 'Tambah'}
          </button>
        )}
      </div>

      <div className="mt-3 space-y-0.5 text-sm">
        <h3 className="font-semibold text-zinc-900">{name}</h3>
        <p className="text-zinc-500">
          {getCategoryLabel(category)} · {GENDER_LABEL[gender]}
        </p>
        <p className="text-zinc-500">
          {colorLabel} · {sizes.length} ukuran
        </p>
        <p className="pt-1">
          <span className="font-semibold text-zinc-900">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="ml-2 text-zinc-400 line-through">{formatPrice(originalPrice)}</span>
          )}
        </p>
      </div>
    </article>
  )
}
