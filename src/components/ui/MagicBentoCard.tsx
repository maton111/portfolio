import { forwardRef, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import './MagicBentoCard.css'

export interface MagicBentoCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  enableTilt?: boolean
  tiltStrength?: number
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const DEFAULT_TILT_STRENGTH = 10

const MagicBentoCard = forwardRef<HTMLDivElement, MagicBentoCardProps>(function MagicBentoCard(
  { children, className = '', style, enableTilt = true, tiltStrength = DEFAULT_TILT_STRENGTH },
  forwardedRef,
) {
  const localRef = useRef<HTMLDivElement | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updateMotionPreference()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMotionPreference)
      return () => { mediaQuery.removeEventListener('change', updateMotionPreference) }
    }

    mediaQuery.addListener(updateMotionPreference)
    return () => { mediaQuery.removeListener(updateMotionPreference) }
  }, [])

  const setRefs = (node: HTMLDivElement | null) => {
    localRef.current = node

    if (typeof forwardedRef === 'function') {
      forwardedRef(node)
      return
    }

    if (forwardedRef) {
      forwardedRef.current = node
    }
  }

  const resetTilt = () => {
    const element = localRef.current
    if (!element) return

    element.style.setProperty('--magic-tilt-x', '0deg')
    element.style.setProperty('--magic-tilt-y', '0deg')
    element.style.setProperty('--magic-glow-x', '50%')
    element.style.setProperty('--magic-glow-y', '50%')
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enableTilt || prefersReducedMotion) return

    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const relativeX = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0.5
    const relativeY = rect.height > 0 ? (event.clientY - rect.top) / rect.height : 0.5

    const rotateY = (relativeX - 0.5) * tiltStrength * 2
    const rotateX = (0.5 - relativeY) * tiltStrength * 2

    element.style.setProperty('--magic-tilt-x', `${rotateX.toFixed(2)}deg`)
    element.style.setProperty('--magic-tilt-y', `${rotateY.toFixed(2)}deg`)
    element.style.setProperty('--magic-glow-x', `${Math.round(relativeX * 100)}%`)
    element.style.setProperty('--magic-glow-y', `${Math.round(relativeY * 100)}%`)
  }

  return (
    <div
      ref={setRefs}
      className={`magic-bento-card ${className}`.trim()}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      {children}
    </div>
  )
})

export default MagicBentoCard
