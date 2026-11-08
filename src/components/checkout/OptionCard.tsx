import type { ReactNode } from 'react'

interface OptionCardProps {
  name: string
  value: string
  checked: boolean
  onSelect: () => void
  children: ReactNode
}

/** Radio input styled as a selectable card. */
export function OptionCard({ name, value, checked, onSelect, children }: OptionCardProps) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition ${
        checked ? 'border-zinc-900 ring-1 ring-zinc-900' : 'border-zinc-300 hover:border-zinc-500'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        className="size-4 shrink-0 accent-zinc-900"
      />
      {children}
    </label>
  )
}
