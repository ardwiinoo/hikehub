/** Only allow same-site relative paths to avoid open redirects via ?redirect=. */
export const safeRedirect = (value: string | null, fallback = '/') =>
  value?.startsWith('/') && !value.startsWith('//') ? value : fallback
