import { useTranslation } from 'react-i18next'
import './InitialHudLoader.css'

type InitialHudLoaderProps = {
  progress: number
  activeLabel: string
  logs: string[]
}

const SEGMENTS = 12

function InitialHudLoader({ progress, activeLabel, logs }: InitialHudLoaderProps) {
  const { t } = useTranslation()
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
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">
              terminal
            </span>
            <span className="material-symbols-outlined" aria-hidden="true">
              memory
            </span>
            <span className="material-symbols-outlined" aria-hidden="true">
              settings_input_component
            </span>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default InitialHudLoader


