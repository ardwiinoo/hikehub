import { Link } from 'react-router'
import { Logo } from '../components/ui/Logo'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <title>Halaman Tidak Ditemukan — HikeHub</title>
      <Logo />
      <p className="mt-10 text-6xl font-extrabold">404</p>
      <h1 className="mt-3 text-xl font-semibold">Jalur ini tidak ditemukan</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Halaman yang kamu cari tidak ada atau sudah dipindah.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
      >
        Kembali ke Beranda
      </Link>
    </main>
  )
}
