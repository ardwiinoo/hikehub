import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import poster from '../assets/videos/signup-poster.webp'
import video from '../assets/videos/signup.mp4'
import { AuthLayout } from '../components/auth/AuthLayout'
import { GoogleButton } from '../components/auth/GoogleButton'
import { PasswordField } from '../components/ui/PasswordField'
import { Spinner } from '../components/ui/Spinner'
import { TextField } from '../components/ui/TextField'
import { useAuth } from '../hooks/useAuth'
import { getField } from '../lib/form'
import { safeRedirect } from '../lib/redirect'
import { register } from '../services/auth'

const MIN_PASSWORD = 8

export default function RegisterPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = safeRedirect(searchParams.get('redirect'))
  const [submitting, setSubmitting] = useState(false)
  const [confirmError, setConfirmError] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = getField(form, 'password')

    if (password !== getField(form, 'confirmPassword')) {
      setConfirmError('Kata sandi tidak sama.')
      return
    }

    setConfirmError('')
    setError('')
    setSubmitting(true)
    try {
      const user = await register({
        name: getField(form, 'name').trim(),
        email: getField(form, 'email'),
        password,
      })
      signIn(user)
      await navigate(redirect, { replace: true })
    } catch {
      setError('Pendaftaran gagal. Silakan coba lagi.')
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Buat akun"
      subtitle="Daftar untuk checkout lebih cepat dan dapatkan promo member."
      video={video}
      poster={poster}
      tagline="Jelajahi lebih jauh dengan perlengkapan yang tepat."
    >
      <GoogleButton label="Daftar dengan Google" />

      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <TextField
          label="Nama lengkap"
          name="name"
          autoComplete="name"
          placeholder="Nama kamu"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          required
        />
        <PasswordField
          label="Kata sandi"
          name="password"
          autoComplete="new-password"
          minLength={MIN_PASSWORD}
          hint={`Minimal ${String(MIN_PASSWORD)} karakter.`}
          required
        />
        <PasswordField
          label="Konfirmasi kata sandi"
          name="confirmPassword"
          autoComplete="new-password"
          error={confirmError}
          onChange={() => {
            setConfirmError('')
          }}
          required
        />
        <label className="flex items-start gap-2 text-sm text-zinc-600">
          <input type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-zinc-900" />
          <span>
            Saya setuju dengan{' '}
            <a href="#" className="font-medium text-zinc-900 underline">
              Syarat &amp; Ketentuan
            </a>{' '}
            dan{' '}
            <a href="#" className="font-medium text-zinc-900 underline">
              Kebijakan Privasi
            </a>
            .
          </span>
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-60"
        >
          {submitting && <Spinner />}
          {submitting ? 'Membuat akun...' : 'Daftar'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-600">
        Sudah punya akun?{' '}
        <Link
          to={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="font-semibold text-zinc-900 hover:underline"
        >
          Masuk
        </Link>
      </p>
    </AuthLayout>
  )
}
