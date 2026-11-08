import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { CategoryShowcase } from '../components/home/CategoryShowcase'
import { Hero } from '../components/home/Hero'
import { Partners } from '../components/home/Partners'
import { Perks } from '../components/home/Perks'
import { RecentPurchaseToast } from '../components/home/RecentPurchaseToast'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { ProductShop } from '../components/product/ProductShop'
import { PRODUCTS } from '../data/products'
import { useInView } from '../hooks/useInView'
import { useProductFilters } from '../hooks/useProductFilters'
import { getCategoriesByGroup, scrollToShop } from '../lib/catalog'
import type { CategoryGroup, Product } from '../types/product'

export default function HomePage() {
  const shop = useProductFilters(PRODUCTS)
  const { hash } = useLocation()
  const [shopRef, shopInView] = useInView<HTMLElement>()

  // Support links like "/#shop" coming from other pages.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  const selectGroup = (group: CategoryGroup) => {
    shop.applyPreset({ categories: getCategoriesByGroup(group) })
    scrollToShop()
  }

  const showProduct = (product: Product) => {
    shop.applyPreset({ search: product.name })
    scrollToShop()
  }

  return (
    <>
      <title>HikeHub — Perlengkapan Hiking &amp; Outdoor</title>
      <Header shop={shop} hideSearch={shopInView} />
      <main>
        <Hero />
        <Perks />
        <CategoryShowcase onSelectGroup={selectGroup} />
        <ProductShop ref={shopRef} shop={shop} />
        <Partners />
      </main>
      <Footer />
      <RecentPurchaseToast onSelect={showProduct} />
    </>
  )
}
