import { LogOut, Menu, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import type { ProductFiltersApi } from '../../hooks/useProductFilters'
import { getCategoriesByGroup, scrollToShop } from '../../lib/catalog'
import type { ProductFilters } from '../../types/product'
import { Logo } from '../ui/Logo'
import { SearchBox } from './SearchBox'

interface HeaderProps {
  shop: ProductFiltersApi
  /** Hidden while the catalog (which has its own search) is on screen. */
  hideSearch?: boolean
}

const NAV_ITEMS: { label: string; preset: Partial<ProductFilters> }[] = [
  { label: 'Pria', preset: { genders: ['men'] } },
  { label: 'Wanita', preset: { genders: ['women'] } },
  { label: 'Pakaian', preset: { categories: getCategoriesByGroup('clothing') } },
  { label: 'Sepatu', preset: { categories: getCategoriesByGroup('footwear') } },
]

export function Header({ shop, hideSearch = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count: cartCount } = useCart()
  const { user, signOut } = useAuth()

  const goTo = (preset: Partial<ProductFilters>) => {
    shop.applyPreset(preset)
    setMenuOpen(false)
    scrollToShop()
  }

  const searchBox = (
    <SearchBox
      onSearch={(search) => {
        goTo({ search })
      }}
    />
  )

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <p className="bg-zinc-900 px-4 py-2 text-center text-xs font-medium text-white">
        Gratis ongkir ke seluruh Indonesia untuk pembelian di atas Rp500.000
      </p>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden flex-1 justify-center gap-8 md:flex" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                goTo(item.preset)
              }}
              className="text-sm font-semibold hover:text-zinc-500"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <div
            className={`hidden w-56 transition-opacity duration-300 lg:block ${hideSearch ? 'invisible opacity-0' : ''}`}
          >
            {searchBox}
          </div>
          {user ? (
            <div className="flex items-center gap-1">
              <span
                className="flex size-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white"
                title={user.email}
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="hidden text-sm font-medium xl:inline">Hai, {user.name}</span>
              <button
                type="button"
                onClick={signOut}
                aria-label="Keluar"
                title="Keluar"
                className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <LogOut className="size-4" aria-hidden />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full p-2 text-sm font-semibold hover:bg-zinc-100 sm:px-3"
            >
              <User className="size-5" aria-hidden />
              <span className="hidden sm:inline">Masuk</span>
            </Link>
          )}
          <Link
            to="/checkout"
            className="relative rounded-full p-2 hover:bg-zinc-100"
            aria-label={`Keranjang, ${String(cartCount)} item`}
          >
            <ShoppingBag className="size-5" aria-hidden />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-zinc-900">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => {
              setMenuOpen((open) => !open)
            }}
            className="rounded-full p-2 hover:bg-zinc-100 lg:hidden"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-b border-zinc-200 px-4 pt-4 pb-6 lg:hidden">
          {!hideSearch && searchBox}
          <nav className="mt-4 flex flex-col md:hidden" aria-label="Navigasi mobile">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  goTo(item.preset)
                }}
                className="py-3 text-left text-lg font-semibold"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
