import { ArrowRight, Search } from 'lucide-react'
import { useId, useState } from 'react'
import { PRODUCTS } from '../../data/products'
import { formatPrice, getCategoryLabel, matchesSearch } from '../../lib/catalog'
import { ProductArt } from '../product/ProductArt'

interface SearchBoxProps {
  /** Apply the query to the catalog (filter + scroll). */
  onSearch: (query: string) => void
}

const MAX_SUGGESTIONS = 5

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const listId = useId()

  const trimmed = query.trim()
  const results = trimmed ? PRODUCTS.filter((p) => matchesSearch(p, trimmed)) : []
  const showDropdown = open && trimmed.length > 0

  const submit = (value: string) => {
    if (!value) return
    onSearch(value)
    setQuery('')
    setOpen(false)
  }

  return (
    <div
      className="relative"
      onBlur={(e) => {
        // Close only when focus leaves the whole search box (input + dropdown).
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          submit(trimmed)
        }}
      >
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-500"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            setOpen(true)
          }}
          placeholder="Cari jaket, sepatu..."
          aria-label="Cari produk"
          aria-expanded={showDropdown}
          aria-controls={listId}
          autoComplete="off"
          className="w-full rounded-full bg-zinc-100 py-2.5 pr-4 pl-10 text-sm outline-none focus:bg-zinc-200/70 focus:ring-2 focus:ring-zinc-300"
        />
      </form>

      {showDropdown && (
        <div
          id={listId}
          className="absolute top-full right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl lg:w-96"
        >
          {results.length > 0 ? (
            <>
              <p className="px-4 pt-3 pb-1 text-xs font-semibold text-zinc-500">Produk</p>
              <ul>
                {results.slice(0, MAX_SUGGESTIONS).map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => {
                        submit(product.name)
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-zinc-50 focus:bg-zinc-50 focus:outline-none"
                    >
                      <span className="size-12 shrink-0 rounded-md bg-zinc-100">
                        <ProductArt
                          category={product.category}
                          color={product.color}
                          className="size-full p-1"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{product.name}</span>
                        <span className="block text-xs text-zinc-500">
                          {getCategoryLabel(product.category)}
                        </span>
                      </span>
                      <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  submit(trimmed)
                }}
                className="flex w-full items-center justify-between border-t border-zinc-200 px-4 py-3 text-sm font-semibold hover:bg-zinc-50 focus:bg-zinc-50 focus:outline-none"
              >
                Lihat semua {results.length} hasil untuk “{trimmed}”
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-zinc-500">
              Tidak ada produk untuk “{trimmed}”.
              <br />
              Coba kata lain, mis. “jaket”, “sepatu”, atau “hitam”.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
