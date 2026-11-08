import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useRef, type Ref } from 'react'
import { COLORS, GENDERS, SORT_OPTIONS } from '../../data/catalog'
import type { ProductFiltersApi } from '../../hooks/useProductFilters'
import { getCategoryLabel } from '../../lib/catalog'
import type { SortOption } from '../../types/product'
import { FilterPanel } from './FilterPanel'
import { ProductCard } from './ProductCard'

interface ProductShopProps {
  shop: ProductFiltersApi
  ref?: Ref<HTMLElement>
}

const isSortOption = (value: string): value is SortOption =>
  SORT_OPTIONS.some((option) => option.value === value)

function ActiveChips({ shop }: { shop: ProductFiltersApi }) {
  const { filters, toggle, setSearch, reset, activeCount } = shop
  const chips = [
    ...filters.genders.map((v) => ({
      key: `g-${v}`,
      label: GENDERS.find((g) => g.value === v)?.label ?? v,
      remove: () => {
        toggle('genders', v)
      },
    })),
    ...filters.categories.map((v) => ({
      key: `c-${v}`,
      label: getCategoryLabel(v),
      remove: () => {
        toggle('categories', v)
      },
    })),
    ...filters.colors.map((v) => ({
      key: `w-${v}`,
      label: COLORS.find((c) => c.value === v)?.label ?? v,
      remove: () => {
        toggle('colors', v)
      },
    })),
    ...filters.sizes.map((v) => ({
      key: `s-${v}`,
      label: `Ukuran ${v}`,
      remove: () => {
        toggle('sizes', v)
      },
    })),
  ]
  if (filters.search) {
    chips.unshift({
      key: 'q',
      label: `“${filters.search}”`,
      remove: () => {
        setSearch('')
      },
    })
  }
  if (chips.length === 0) return null

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.remove}
          className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-sm hover:bg-zinc-200"
        >
          {chip.label}
          <X className="size-3.5" aria-label="Hapus filter" />
        </button>
      ))}
      {(activeCount > 0 || filters.search) && (
        <button type="button" onClick={reset} className="ml-1 text-sm font-medium underline">
          Hapus semua
        </button>
      )}
    </div>
  )
}

export function ProductShop({ shop, ref }: ProductShopProps) {
  const { filters, results, activeCount, toggle, setSearch, setSort, reset } = shop
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <section
      ref={ref}
      id="shop"
      className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {filters.search ? `Hasil untuk “${filters.search}”` : 'Semua Produk'}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">{results.length} produk ditemukan</p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-500"
              aria-hidden
            />
            <input
              type="search"
              value={filters.search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              placeholder="Cari di katalog..."
              aria-label="Cari di katalog"
              className="w-full rounded-full border border-zinc-300 bg-white py-2 pr-4 pl-10 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            />
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium lg:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filter{activeCount > 0 && ` (${String(activeCount)})`}
          </button>
          <label className="flex items-center gap-2 text-sm">
            <span className="hidden text-zinc-500 sm:inline">Urutkan:</span>
            <select
              value={filters.sort}
              onChange={(e) => {
                if (isSortOption(e.target.value)) setSort(e.target.value)
              }}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 font-medium"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex gap-10">
        <aside className="hidden w-64 shrink-0 lg:block" aria-label="Filter produk">
          <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
            <FilterPanel filters={filters} toggle={toggle} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <ActiveChips shop={shop} />

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-zinc-50 px-6 py-20 text-center">
              <p className="font-semibold">Produk tidak ditemukan</p>
              <p className="mt-1 text-sm text-zinc-500">
                Coba kurangi filter atau ubah kata kunci.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Reset filter
              </button>
            </div>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Filter produk"
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-white p-0 backdrop:bg-black/40"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
            <p className="text-lg font-semibold">Filter</p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Tutup filter"
              className="rounded-full p-2 hover:bg-zinc-100"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5">
            <FilterPanel filters={filters} toggle={toggle} />
          </div>
          <div className="flex gap-3 border-t border-zinc-200 p-5">
            <button
              type="button"
              onClick={reset}
              className="flex-1 rounded-full border border-zinc-300 py-3 text-sm font-semibold"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex-1 rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white"
            >
              Lihat {results.length} produk
            </button>
          </div>
        </div>
      </dialog>
    </section>
  )
}
