import { useEffect, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import './InitialHudLoader.css'

type InitialHudLoaderProps = {
  progress: number
  activeLabel: string
  logs: string[]
  onSkip: () => void
}

const TICKS = 40
const VISIBLE_LOGS = 5

function InitialHudLoader({ progress, activeLabel, logs, onSkip }: InitialHudLoaderProps) {
  const { t } = useTranslation()
  const isComplete = progress >= 100
  const counter = String(progress).padStart(3, '0')

  // Never hold a visitor hostage: Esc, Enter or Space skips the intro.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSkip()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onSkip])

  return (
    <div
      className={`boot-screen${isComplete ? ' is-complete' : ''}`}
      style={{ '--boot-progress': `${progress}%`, '--boot-ratio': progress / 100 } as CSSProperties}
      role="status"
      aria-live="polite"
      aria-label={t('boot.screenAriaLabel')}
    >
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-scanlines" aria-hidden="true" />
      <div className="boot-vignette" aria-hidden="true" />
      <div className="boot-sweep" aria-hidden="true" />

      <main className="boot-shell">
        <p className="boot-eyebrow">
          <span className="boot-eyebrow-dot" aria-hidden="true" />
          MATON11_OS // BOOT_SEQUENCE
        </p>

        <div className="boot-counter-row">
          <p className="boot-counter" data-text={counter} aria-hidden="true">
            {counter}
          </p>
          <div className="boot-counter-side" aria-hidden="true">
            <span className="boot-percent">%</span>
            <span className="boot-build">v1.1.0</span>
          </div>
        </div>

        <p className="boot-status">
          <span className="boot-status-prefix" aria-hidden="true">&gt;</span>
          {activeLabel}
          <i className="boot-caret" aria-hidden="true" />
        </p>

        <div
          className="boot-meter"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-valuetext={`${progress}% ${t('boot.progressComplete')}`}
        >
          <div className="boot-meter-fill" />
          <div className="boot-meter-ticks" aria-hidden="true">
            {Array.from({ length: TICKS }).map((_, index) => (
              <span key={index} className={(index / TICKS) * 100 < progress ? 'is-on' : ''} />
            ))}
          </div>
        </div>

        <div className="boot-log" aria-label={t('boot.logsAriaLabel')}>
          {logs.slice(-VISIBLE_LOGS).map((line, index) => (
            <p key={`${line}-${index}`} className={line.includes('[ OK ]') ? 'is-ok' : ''}>
              {line}
            </p>
          ))}
        </div>

        <footer className="boot-footer">
          <span className="boot-identity">Mattia Archinà · Builder Dev</span>
          <button type="button" className="boot-skip" onClick={onSkip}>
            {t('boot.skip')}
            <kbd>esc</kbd>
          </button>
        </footer>
      </main>
    </div>
  )
}

export default InitialHudLoader
