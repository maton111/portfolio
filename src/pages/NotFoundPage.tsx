import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { openCommandPalette } from '../utils/commandPalette'
import './NotFoundPage.css'

function NotFoundPage() {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <main className="nf-page terminal-bg" id="main-content" aria-labelledby="nf-title">
      <section className="nf-shell">
        <p className="nf-eyebrow">ERR_ROUTE_NOT_FOUND // 0x0404</p>
        <h1 id="nf-title" className="nf-code" data-text="404">404</h1>
        <p className="nf-title">{t('notFound.title')}</p>
        <p className="nf-desc">{t('notFound.desc')}</p>

        <pre className="nf-log" aria-hidden="true">
          <span>&gt; GET {location.pathname}</span>
          <span className="nf-log-err">[ FAIL ] route.resolve() → null</span>
          <span>&gt; fallback --to=/ <i className="nf-caret" /></span>
        </pre>

        <div className="nf-actions">
          <Link className="nf-btn nf-btn-primary" to="/">
            <span className="material-symbols-outlined" aria-hidden="true">home</span>
            {t('notFound.home')}
          </Link>
          <Link className="nf-btn" to="/#projects">
            {t('notFound.projects')}
          </Link>
          <button type="button" className="nf-btn nf-btn-ghost" onClick={openCommandPalette}>
            <span className="material-symbols-outlined" aria-hidden="true">search</span>
            {t('notFound.search')}
          </button>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
