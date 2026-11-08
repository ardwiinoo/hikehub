import { useEffect, useRef, useState } from 'react'

/** True while the element crosses the given viewport line (default: the vertical middle). */
export function useInView<T extends Element>(rootMargin = '-50% 0px -50% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false)
      },
      { rootMargin },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [rootMargin])

  return [ref, inView] as const
}
