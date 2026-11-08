/** Simulates network latency until the real API exists. */
export const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
