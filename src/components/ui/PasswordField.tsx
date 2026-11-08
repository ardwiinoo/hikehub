import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { TextField } from './TextField'

type PasswordFieldProps = Omit<Parameters<typeof TextField>[0], 'type' | 'trailing'>

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? EyeOff : Eye

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => {
            setVisible((v) => !v)
          }}
          aria-label={visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          className="rounded-md p-2 text-zinc-500 hover:text-zinc-900"
        >
          <Icon className="size-4" aria-hidden />
        </button>
      }
    />
  )
}
