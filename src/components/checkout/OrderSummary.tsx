import { Lock, Minus, Plus, Trash2 } from 'lucide-react'
import { MAX_QUANTITY } from '../../context/cart-context'
import { FREE_SHIPPING_MIN } from '../../data/checkout'
import { useCart } from '../../hooks/useCart'
import { formatPrice, getCategoryLabel } from '../../lib/catalog'
import type { Size } from '../../types/product'
import { ProductArt } from '../product/ProductArt'
import { Spinner } from '../ui/Spinner'

interface OrderSummaryProps {
  formId: string
  shippingCost: number
  submitting: boolean
}

export function OrderSummary({ formId, shippingCost, submitting }: OrderSummaryProps) {
  const { lines, subtotal, count, setQuantity, changeSize, removeItem } = useCart()
  const total = subtotal + shippingCost
  const remainingForFree = FREE_SHIPPING_MIN - subtotal

  return (
    <aside className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold">Ringkasan Pesanan ({count})</h2>

      <ul className="mt-5 divide-y divide-zinc-200">
        {lines.map(({ product, size, quantity, lineTotal }) => (
          <li key={`${product.id}-${size}`} className="flex gap-4 py-4 first:pt-0">
            <div className="size-20 shrink-0 rounded-lg bg-zinc-100">
              <ProductArt
                category={product.category}
                color={product.color}
                className="size-full p-2"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{product.name}</p>
                  <p className="text-xs text-zinc-500">{getCategoryLabel(product.category)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeItem(product.id, size)
                  }}
                  aria-label={`Hapus ${product.name}`}
                  className="self-start rounded p-1 text-zinc-400 hover:text-red-600"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <select
                    value={size}
                    onChange={(e) => {
                      const next = product.sizes.find((s) => s === e.target.value)
                      if (next) changeSize(product.id, size, next)
                    }}
                    aria-label="Ukuran"
                    className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
                  >
                    {product.sizes.map((s: Size) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center rounded-md border border-zinc-300">
                    <button
                      type="button"
                      onClick={() => {
                        setQuantity(product.id, size, quantity - 1)
                      }}
                      disabled={quantity <= 1}
                      aria-label="Kurangi jumlah"
                      className="p-1.5 disabled:opacity-30"
                    >
                      <Minus className="size-3" aria-hidden />
                    </button>
                    <span className="w-6 text-center text-xs font-medium" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setQuantity(product.id, size, quantity + 1)
                      }}
                      disabled={quantity >= MAX_QUANTITY}
                      aria-label="Tambah jumlah"
                      className="p-1.5 disabled:opacity-30"
                    >
                      <Plus className="size-3" aria-hidden />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold">{formatPrice(lineTotal)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <dl className="space-y-2 border-t border-zinc-200 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-zinc-600">Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-600">Ongkos kirim</dt>
          <dd>
            {shippingCost === 0 ? (
              <span className="text-green-700">Gratis</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </dd>
        </div>
        {remainingForFree > 0 && (
          <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Belanja {formatPrice(remainingForFree)} lagi untuk gratis ongkir (JNE/J&amp;T).
          </p>
        )}
        <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-bold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      <button
        type="submit"
        form={formId}
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-60"
      >
        {submitting ? <Spinner /> : <Lock className="size-4" aria-hidden />}
        {submitting ? 'Memproses pembayaran...' : `Bayar ${formatPrice(total)}`}
      </button>
      <p className="mt-3 text-center text-xs text-zinc-500">
        Transaksi aman & terenkripsi. Dengan membayar kamu menyetujui Syarat & Ketentuan HikeHub.
      </p>
    </aside>
  )
}
