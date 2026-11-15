import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './InitialHudLoader.css'

type InitialHudLoaderProps = {
  progress: number
  activeLabel: string
  logs: string[]
  onSkip: () => void
}

const SEGMENTS = 12

function InitialHudLoader({ progress, activeLabel, logs, onSkip }: InitialHudLoaderProps) {
  const { t } = useTranslation()

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
  const filledSegments = Math.round((progress / 100) * SEGMENTS)

  return (
    <div className="boot-screen" role="status" aria-live="polite" aria-label={t('boot.screenAriaLabel')}>
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-scanlines" aria-hidden="true" />
      <div className="boot-vignette" aria-hidden="true" />

      <main className="boot-main">
        <header className="boot-header">
          <div>
            <span />
            <small>OS_KERNEL_STABLE</small>
            <span />
          </div>
          <h1>MATTIA_ARCHINA_OS</h1>
        </header>

        <section className="boot-module">
          <div className="boot-module-head">
            <div>
              <p>{t('boot.statusLabel')}</p>
              <strong>{activeLabel}</strong>
            </div>
            <b>{progress}%</b>
          </div>

          <div
            className="boot-segments"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={`${progress}% ${t('boot.progressComplete')}`}
          >
            {Array.from({ length: SEGMENTS }).map((_, index) => (
              <span className={index < filledSegments ? 'filled' : ''} key={index} />
            ))}
          </div>

          <div className="boot-log" aria-label={t('boot.logsAriaLabel')}>
            {logs.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
            <div aria-hidden="true" />
          </div>
        </section>

        <footer className="boot-footer">
          <div>
            <i />
            <small>BUILD_VERSION: 1.1.0 // STATUS: INITIALIZING</small>
          </div>
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


