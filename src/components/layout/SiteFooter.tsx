import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { directChannels, externalNodes } from '../../data/contactContent'
import { SECTION_IDS, type SectionId } from '../../data/sectionNavigation'
import { scrollToSection } from '../../hooks/useSectionScroll'
import { openCommandPalette } from '../../utils/commandPalette'
import './SiteFooter.css'

const BUILD_YEAR = new Date().getFullYear()

function SiteFooter() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const email = directChannels[0]

  // On the home page links scroll; elsewhere they route back to the section.
  const goTo = (id: SectionId) => {
    if (isHome) scrollToSection(id)
    else navigate(id === 'home' ? '/' : `/#${id}`)
  }

  return (
    <footer className={`site-footer${isHome ? '' : ' site-footer--subpage'}`}>
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-wordmark">
            maton11<span aria-hidden="true">_</span>
          </p>
          <p className="site-footer-tagline">{t('footer.tagline')}</p>
          {email ? (
            <a className="site-footer-mail" href={email.href}>
              {email.id}
              <span className="material-symbols-outlined" aria-hidden="true">north_east</span>
            </a>
          ) : null}
        </div>

        <nav className="site-footer-col" aria-label={t('footer.navLabel')}>
          <p className="site-footer-heading">{t('footer.navLabel')}</p>
          <ul>
            {SECTION_IDS.filter((id) => id !== 'home').map((id) => (
              <li key={id}>
                <button type="button" onClick={() => goTo(id)}>
                  {t(`navbar.${id}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer-col">
          <p className="site-footer-heading">{t('footer.elsewhereLabel')}</p>
          <ul>
            {externalNodes.map((node) => (
              <li key={node.label}>
                <a href={node.href} target="_blank" rel="noopener noreferrer">
                  {node.label.charAt(0) + node.label.slice(1).toLowerCase()}
                  <span className="site-footer-handle">{node.id}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer-bar">
        <p>
          © {BUILD_YEAR} Mattia Archinà · {t('footer.builtIn')}
        </p>
        <div className="site-footer-bar-actions">
          <button type="button" className="site-footer-kbd" onClick={openCommandPalette}>
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
            <span>{t('footer.paletteHint')}</span>
          </button>
          <button
            type="button"
            className="site-footer-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('footer.backToTop')}
            <span className="material-symbols-outlined" aria-hidden="true">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
