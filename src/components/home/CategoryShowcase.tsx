import { ArrowUpRight } from 'lucide-react'
import clothing from '../../assets/images/clothing.webp'
import equipment from '../../assets/images/equipment.webp'
import footwear from '../../assets/images/footwear.webp'
import { getCategoriesByGroup } from '../../lib/catalog'
import type { CategoryGroup } from '../../types/product'

interface CategoryShowcaseProps {
  onSelectGroup: (group: CategoryGroup) => void
}

const TILES = [
  { title: 'Pakaian', subtitle: 'Jaket, windbreaker & vest', image: clothing, group: 'clothing' },
  { title: 'Sepatu', subtitle: 'Hiking & casual', image: footwear, group: 'footwear' },
  { title: 'Peralatan', subtitle: 'Segera hadir', image: equipment, group: null },
] as const

export function CategoryShowcase({ onSelectGroup }: CategoryShowcaseProps) {
  return (
    <section id="categories" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Belanja per Kategori</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {TILES.map((tile) => {
          const content = (
            <>
              <img
                src={tile.image}
                alt=""
                width={800}
                height={1000}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-left text-white">
                <div>
                  <h3 className="text-xl font-bold">{tile.title}</h3>
                  <p className="text-sm text-white/80">
                    {tile.group
                      ? `${tile.subtitle} · ${String(getCategoriesByGroup(tile.group).length)} kategori`
                      : tile.subtitle}
                  </p>
                </div>
                {tile.group && (
                  <span className="rounded-full bg-white p-2 text-zinc-900 transition group-hover:bg-brand">
                    <ArrowUpRight className="size-5" aria-hidden />
                  </span>
                )}
              </div>
            </>
          )

          const className =
            'group relative block aspect-16/10 overflow-hidden rounded-xl bg-zinc-200 sm:aspect-3/4'

          const { group } = tile
          return group ? (
            <button
              key={tile.title}
              type="button"
              onClick={() => {
                onSelectGroup(group)
              }}
              className={className}
            >
              {content}
            </button>
          ) : (
            <div key={tile.title} className={className}>
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
