import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'maton11_theme'
const listeners = new Set<() => void>()

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // Storage can be blocked (private mode): fall through to the default.
  }
  return 'dark'
}

let currentTheme: Theme = readInitialTheme()

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0b0f0c' : '#f2f4ee')
}

applyTheme(currentTheme)

export function setTheme(theme: Theme) {
  if (theme === currentTheme) return
  currentTheme = theme
  applyTheme(theme)
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Persisting is best-effort.
  }
  listeners.forEach((listener) => listener())
}

export function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark')
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = () => currentTheme

/** Shared theme state: the header toggle and the command palette stay in sync. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return { theme, setTheme, toggleTheme }
}
