import airbnb from '../../assets/brands/airbnb.svg'
import ayura from '../../assets/brands/ayura.svg'
import google from '../../assets/brands/google.svg'
import instagram from '../../assets/brands/instagram.svg'

const PARTNERS = [
  { name: 'Airbnb', logo: airbnb },
  { name: 'Google', logo: google },
  { name: 'Instagram', logo: instagram },
  { name: 'Ayura', logo: ayura },
]

export function Partners() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold tracking-widest text-zinc-500 uppercase">
          Partner Kami
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {PARTNERS.map((partner) => (
            <li key={partner.name}>
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="h-7 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
