import { useEffect, useMemo, useState } from 'react'

type DecryptedTextProps = {
  text: string
  speed?: number
  scrambleChars?: string
  className?: string
}

function randomChar(chars: string): string {
  const index = Math.floor(Math.random() * chars.length)
  return chars[index] ?? ' '
}

function DecryptedText({
  text,
  speed = 28,
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  className,
}: DecryptedTextProps) {
  const [display, setDisplay] = useState(text)

  const charSet = useMemo(() => {
    return scrambleChars.length > 0 ? scrambleChars : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  }, [scrambleChars])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        setDisplay(text)
        return
      }
    }

    let current = 0
    const target = text

    const tick = () => {
      const next = target
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < current) return char
          return randomChar(charSet)
        })
        .join('')

      setDisplay(next)
      current += 1

      if (current > target.length) {
        setDisplay(target)
        return true
      }

      return false
    }

    const timer = window.setInterval(() => {
      const done = tick()
      if (done) window.clearInterval(timer)
    }, Math.max(10, speed))

    return () => window.clearInterval(timer)
  }, [text, speed, charSet])

  return <span className={className}>{display}</span>
}

export default DecryptedText

