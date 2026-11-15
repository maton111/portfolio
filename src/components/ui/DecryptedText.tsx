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

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion) return

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
  }, [text, speed, charSet, prefersReducedMotion])

  // Assistive tech reads the real text once; the scramble is purely visual.
  return (
    <span className={className}>
      <span aria-hidden="true">{prefersReducedMotion ? text : display}</span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

export default DecryptedText

