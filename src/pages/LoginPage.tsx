import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import poster from '../assets/videos/login-poster.webp'
import video from '../assets/videos/login.mp4'
import { AuthLayout } from '../components/auth/AuthLayout'
import { GoogleButton } from '../components/auth/GoogleButton'
import { PasswordField } from '../components/ui/PasswordField'
import { Spinner } from '../components/ui/Spinner'
import { TextField } from '../components/ui/TextField'
import { useAuth } from '../hooks/useAuth'
import { getField } from '../lib/form'
import { safeRedirect } from '../lib/redirect'
import { login } from '../services/auth'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = safeRedirect(searchParams.get('redirect'))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setSubmitting(true)
    setError('')
    try {
      const user = await login({
        email: getField(form, 'email'),
        password: getField(form, 'password'),
      })
      signIn(user)
      await navigate(redirect, { replace: true })
    } catch {
      setError('Email atau kata sandi salah. Silakan coba lagi.')
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Selamat datang kembali"
      subtitle="Masuk untuk melanjutkan belanja dan melacak pesananmu."
      video={video}
      poster={poster}
      tagline="Setiap pendakian dimulai dari satu langkah."
    >
      <GoogleButton label="Masuk dengan Google" />

      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
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
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input type="checkbox" name="remember" className="size-4 accent-zinc-900" />
            Ingat saya
          </label>
          <a href="#" className="font-medium hover:underline">
            Lupa kata sandi?
          </a>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-60"
        >
          {submitting && <Spinner />}
          {submitting ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-600">
        Belum punya akun?{' '}
        <Link
          to={`/register?redirect=${encodeURIComponent(redirect)}`}
          className="font-semibold text-zinc-900 hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </AuthLayout>
  )
}
