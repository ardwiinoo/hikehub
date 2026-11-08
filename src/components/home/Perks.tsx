import { RotateCcw, ShieldCheck, Truck } from 'lucide-react'

const PERKS = [
  { icon: Truck, title: 'Gratis Ongkir', text: 'Min. belanja Rp500.000' },
  { icon: RotateCcw, title: 'Retur 30 Hari', text: 'Tukar ukuran tanpa ribet' },
  { icon: ShieldCheck, title: 'Garansi Resmi', text: '1 tahun untuk semua produk' },
]

export function Perks() {
  return (
    <section className="border-b border-zinc-200">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
        {PERKS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 sm:justify-center">
            <Icon className="size-6 shrink-0" strokeWidth={1.5} aria-hidden />
            <div className="text-sm">
              <p className="font-semibold">{title}</p>
              <p className="text-zinc-500">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
