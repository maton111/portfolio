import { useEffect, useRef, type RefObject } from 'react'

/**
 * Returns a ref that triggers a reveal animation when the element
 * enters the viewport. Attaches `is-visible` to the element, which
 * pairs with the `.reveal-target` CSS class defined in index.css.
 *
 * Usage:
 *   const ref = useReveal<HTMLElement>()
 *   <header ref={ref} className="reveal-target">…</header>
 */
export function useReveal<T extends HTMLElement>(threshold = 0.08): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced-motion preference — reveal immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }

    // Already visible (e.g. above fold on first render)
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}