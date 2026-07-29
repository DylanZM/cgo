import { useEffect, useRef, useState, type RefObject } from 'react'

export function useInView<T extends Element = HTMLDivElement>(
  options?: IntersectionObserverInit & { once?: boolean }
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)
  const { once = true, ...observerOptions } = options ?? {}

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...observerOptions }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, observerOptions])

  return [ref, isInView]
}
