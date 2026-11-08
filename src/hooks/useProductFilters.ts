import { useState } from 'react'
import { matchesSearch } from '../lib/catalog'
import type { Product, ProductFilters } from '../types/product'

export const INITIAL_FILTERS: ProductFilters = {
  search: '',
  categories: [],
  colors: [],
  sizes: [],
  genders: [],
  sort: 'featured',
}

type ListKey = 'categories' | 'colors' | 'sizes' | 'genders'

const toggleValue = <T>(list: T[], value: T) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

const matches = (product: Product, filters: ProductFilters) => {
  const { search, categories, colors, sizes, genders } = filters
  if (search && !matchesSearch(product, search)) return false
  if (categories.length && !categories.includes(product.category)) return false
  if (colors.length && !colors.includes(product.color)) return false
  if (sizes.length && !product.sizes.some((size) => sizes.includes(size))) return false
  if (genders.length && product.gender !== 'unisex' && !genders.includes(product.gender)) {
    return false
  }
  return true
}

const sortProducts = (products: Product[], sort: ProductFilters['sort']) => {
  switch (sort) {
    case 'price-asc':
      return products.toSorted((a, b) => a.price - b.price)
    case 'price-desc':
      return products.toSorted((a, b) => b.price - a.price)
    case 'newest':
      return products.toSorted((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false))
    case 'featured':
      return products
  }
}

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>(INITIAL_FILTERS)

  const toggle = <K extends ListKey>(key: K, value: ProductFilters[K][number]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: toggleValue<ProductFilters[K][number]>(prev[key], value),
    }))
  }

  /** Replace only the given fields, clearing the other list filters. Used by nav shortcuts. */
  const applyPreset = (preset: Partial<ProductFilters>) => {
    setFilters({ ...INITIAL_FILTERS, sort: filters.sort, ...preset })
  }

  const setSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const setSort = (sort: ProductFilters['sort']) => {
    setFilters((prev) => ({ ...prev, sort }))
  }

  const reset = () => {
    setFilters(INITIAL_FILTERS)
  }

  const activeCount =
    filters.categories.length +
    filters.colors.length +
    filters.sizes.length +
    filters.genders.length

  const results = sortProducts(
    products.filter((product) => matches(product, filters)),
    filters.sort,
  )

  return { filters, results, activeCount, toggle, applyPreset, setSearch, setSort, reset }
}

export type ProductFiltersApi = ReturnType<typeof useProductFilters>
