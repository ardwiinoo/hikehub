import gosend from '../../assets/brands/gosend.svg'
import jne from '../../assets/brands/jne.webp'
import jnt from '../../assets/brands/jnt.svg'
import mastercard from '../../assets/brands/mastercard.svg'
import paypal from '../../assets/brands/paypal.svg'
import logoLight from '../../assets/images/logo-light.webp'

const LINK_GROUPS = [
  { title: 'Belanja', links: ['Pria', 'Wanita', 'Pakaian', 'Sepatu', 'Promo'] },
  { title: 'Bantuan', links: ['Status Pesanan', 'Pengiriman', 'Pengembalian', 'Panduan Ukuran'] },
  { title: 'Tentang', links: ['Tentang HikeHub', 'Karier', 'Toko Kami', 'Kontak'] },
]

const SHIPPING = [
  { name: 'GoSend', logo: gosend },
  { name: 'J&T Express', logo: jnt },
  { name: 'JNE', logo: jne },
]

const PAYMENTS = [
  { name: 'Mastercard', logo: mastercard },
  { name: 'PayPal', logo: paypal },
]

function LogoChips({ title, items }: { title: string; items: { name: string; logo: string }[] }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{title}</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex h-10 w-20 items-center justify-center rounded bg-white p-1.5"
          >
            <img src={item.logo} alt={item.name} loading="lazy" className="max-h-full max-w-full" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-white">
            <img src={logoLight} alt="" width={40} height={35} className="h-8 w-auto" />
            <span className="text-lg font-extrabold tracking-tight">HikeHub</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
            Perlengkapan hiking dan outdoor untuk setiap petualangan — dari jalur akhir pekan hingga
            ekspedisi puncak.
          </p>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-10">
            <LogoChips title="Pengiriman" items={SHIPPING} />
            <LogoChips title="Pembayaran" items={PAYMENTS} />
          </div>
        </div>

        {LINK_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-sm font-semibold text-white">{group.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-zinc-800">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-zinc-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} HikeHub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
