import { useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import type { User } from '../types/auth'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'hikehub:user'

const isUser = (value: unknown): value is User =>
  typeof value === 'object' && value !== null && 'name' in value && 'email' in value

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStorage(STORAGE_KEY, isUser))

  const signIn = (next: User) => {
    setUser(next)
    writeStorage(STORAGE_KEY, next)
  }

  const signOut = () => {
    setUser(null)
    writeStorage(STORAGE_KEY, null)
  }

  return <AuthContext value={{ user, signIn, signOut }}>{children}</AuthContext>
}
