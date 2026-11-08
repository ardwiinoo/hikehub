import { ArrowRight } from 'lucide-react'
import hero1600 from '../../assets/images/hero-1600.webp'
import hero800 from '../../assets/images/hero-800.webp'
import { scrollToShop } from '../../lib/catalog'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-zinc-900">
      <img
        src={hero1600}
        srcSet={`${hero800} 800w, ${hero1600} 1600w`}
        sizes="100vw"
        alt="Pendaki dengan ransel menyusuri bukit hijau menuju pegunungan"
        width={1600}
        height={1607}
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-cover object-[center_45%]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/35 to-transparent" />

      <div className="mx-auto flex h-[78vh] max-h-[760px] min-h-[560px] max-w-7xl flex-col justify-end px-4 pt-32 pb-16 sm:px-6 md:justify-center lg:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
          Koleksi Musim Ini
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl">
          Siap Melangkah ke Setiap Puncak
        </h1>
        <p className="mt-5 max-w-lg text-base text-white/80 sm:text-lg">
          Jaket, sepatu, dan perlengkapan hiking yang dirancang untuk cuaca tak menentu dan jalur
          yang menantang.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={scrollToShop}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-brand"
          >
            Belanja Sekarang
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <a
            href="#categories"
            className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Lihat Kategori
          </a>
        </div>
      </div>
    </section>
  )
}
