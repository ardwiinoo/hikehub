import { PRODUCTS } from '../data/products'
import { CATEGORIES, COLORS, GENDERS } from '../data/catalog'
import type { Category, CategoryGroup, Color, Product } from '../types/product'

export const getCategory = (value: Category) => CATEGORIES.find((c) => c.value === value)

export const getCategoryLabel = (value: Category) => getCategory(value)?.label ?? value

export const getColorHex = (value: Color) => COLORS.find((c) => c.value === value)?.hex ?? '#000'

export const getCategoriesByGroup = (group: CategoryGroup): Category[] =>
  CATEGORIES.filter((c) => c.group === group).map((c) => c.value)

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export const formatPrice = (value: number) => rupiah.format(value)

export const scrollToShop = () => {
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
}

export const findProduct = (id: string) => PRODUCTS.find((p) => p.id === id)

const searchText = (product: Product) => {
  const category = getCategory(product.category)
  const color = COLORS.find((c) => c.value === product.color)
  const gender = GENDERS.find((g) => g.value === product.gender)
  return [
    product.name,
    category?.label,
    category?.keywords,
    color?.label,
    color?.value,
    gender?.label,
  ]
    .join(' ')
    .toLowerCase()
}

/** Every word in the query must appear somewhere (name, category, color, gender). */
export const matchesSearch = (product: Product, query: string) => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const text = searchText(product)
  return words.every((word) => text.includes(word))
}
