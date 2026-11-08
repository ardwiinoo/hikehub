import { createContext } from 'react'
import type { User } from '../types/auth'

export interface AuthContextValue {
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
