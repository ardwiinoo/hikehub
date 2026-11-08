import { Check, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { APPAREL_SIZES, CATEGORIES, COLORS, GENDERS, SHOE_SIZES } from '../../data/catalog'
import type { ProductFiltersApi } from '../../hooks/useProductFilters'
import type { Size } from '../../types/product'

type FilterPanelProps = Pick<ProductFiltersApi, 'filters' | 'toggle'>

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open className="group border-b border-zinc-200 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  )
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-zinc-700 hover:text-zinc-900">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex size-5 items-center justify-center rounded border border-zinc-300 peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-400">
        {checked && <Check className="size-3.5 text-white" strokeWidth={3} aria-hidden />}
      </span>
      {label}
    </label>
  )
}

function SizeButtons<T extends Size>({
  sizes,
  selected,
  onToggle,
}: {
  sizes: readonly T[]
  selected: readonly Size[]
  onToggle: (size: T) => void
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {sizes.map((size) => {
        const active = selected.includes(size)
        return (
          <button
            key={size}
            type="button"
            aria-pressed={active}
            onClick={() => {
              onToggle(size)
            }}
            className={`rounded-md border py-2 text-sm font-medium transition ${
              active
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-300 text-zinc-700 hover:border-zinc-900'
            }`}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}

export function FilterPanel({ filters, toggle }: FilterPanelProps) {
  return (
    <div>
      <FilterGroup title="Gender">
        {GENDERS.map((g) => (
          <CheckboxRow
            key={g.value}
            label={g.label}
            checked={filters.genders.includes(g.value)}
            onChange={() => {
              toggle('genders', g.value)
            }}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Kategori">
        {CATEGORIES.map((c) => (
          <CheckboxRow
            key={c.value}
            label={c.label}
            checked={filters.categories.includes(c.value)}
            onChange={() => {
              toggle('categories', c.value)
            }}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Warna">
        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {COLORS.map((c) => {
            const active = filters.colors.includes(c.value)
            return (
              <button
                key={c.value}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  toggle('colors', c.value)
                }}
                className="flex flex-col items-center gap-1.5 text-xs text-zinc-600"
              >
                <span
                  className={`flex size-7 items-center justify-center rounded-full border border-black/10 ring-offset-2 transition ${
                    active ? 'ring-2 ring-zinc-900' : 'hover:ring-2 hover:ring-zinc-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {active && (
                    <Check
                      className={`size-4 ${c.value === 'white' || c.value === 'beige' || c.value === 'yellow' ? 'text-zinc-900' : 'text-white'}`}
                      strokeWidth={3}
                      aria-hidden
                    />
                  )}
                </span>
                {c.label}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Ukuran">
        <p className="mb-2 text-xs text-zinc-500">Pakaian</p>
        <SizeButtons
          sizes={APPAREL_SIZES}
          selected={filters.sizes}
          onToggle={(size) => {
            toggle('sizes', size)
          }}
        />
        <p className="mt-4 mb-2 text-xs text-zinc-500">Sepatu (EU)</p>
        <SizeButtons
          sizes={SHOE_SIZES}
          selected={filters.sizes}
          onToggle={(size) => {
            toggle('sizes', size)
          }}
        />
      </FilterGroup>
    </div>
  )
}
