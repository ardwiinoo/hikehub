import type { ReactNode } from 'react'
import { Logo } from '../ui/Logo'
import { AuthVideo } from './AuthVideo'

interface AuthLayoutProps {
  title: string
  subtitle: string
  video: string
  poster: string
  tagline: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, video, poster, tagline, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-zinc-900 lg:block">
        <AuthVideo src={video} poster={poster} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-black/30" />
        <div className="absolute inset-x-0 top-0 p-10">
          <Logo light />
        </div>
        <p className="absolute inset-x-0 bottom-0 max-w-lg p-10 text-3xl leading-tight font-bold text-white">
          {tagline}
        </p>
      </div>

      <div className="flex flex-col px-4 py-8 sm:px-6">
        <div className="lg:hidden">
          <Logo />
        </div>
        <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <title>{`${title} — HikeHub`}</title>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
