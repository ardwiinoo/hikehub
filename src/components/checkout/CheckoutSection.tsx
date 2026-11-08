import type { ReactNode } from 'react'

interface CheckoutSectionProps {
  step: number
  title: string
  action?: ReactNode
  children: ReactNode
}

export function CheckoutSection({ step, title, action, children }: CheckoutSectionProps) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-lg font-semibold">
          <span className="flex size-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
            {step}
          </span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
