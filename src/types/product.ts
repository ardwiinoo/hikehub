import type {
  APPAREL_SIZES,
  CATEGORIES,
  COLORS,
  GENDERS,
  SHOE_SIZES,
  SORT_OPTIONS,
} from '../data/catalog'

export type Category = (typeof CATEGORIES)[number]['value']
export type CategoryGroup = (typeof CATEGORIES)[number]['group']
export type Color = (typeof COLORS)[number]['value']
export type Size = (typeof APPAREL_SIZES)[number] | (typeof SHOE_SIZES)[number]
export type Gender = (typeof GENDERS)[number]['value']
export type SortOption = (typeof SORT_OPTIONS)[number]['value']

/** Shape is kept JSON-friendly so it can be swapped for an API response later. */
export interface Product {
  id: string
  name: string
  category: Category
  gender: Gender | 'unisex'
  color: Color
  sizes: Size[]
  price: number
  originalPrice?: number
  isNew?: boolean
}

export interface ProductFilters {
  search: string
  categories: Category[]
  colors: Color[]
  sizes: Size[]
  genders: Gender[]
  sort: SortOption
}
