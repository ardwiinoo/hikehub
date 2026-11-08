import { delay } from '../lib/delay'
import type { LoginPayload, RegisterPayload, User } from '../types/auth'

// TODO: replace with real API calls, e.g. POST /api/auth/login
export async function login({ email }: LoginPayload): Promise<User> {
  await delay(700)
  const name = email.split('@')[0] ?? 'Pendaki'
  return { name: name.charAt(0).toUpperCase() + name.slice(1), email }
}

// TODO: replace with POST /api/auth/register
export async function register({ name, email }: RegisterPayload): Promise<User> {
  await delay(900)
  return { name, email }
}
