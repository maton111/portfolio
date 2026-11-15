import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { SECTION_IDS, type SectionId } from '../../data/sectionNavigation'
import { useTheme } from '../../hooks/useTheme'
import { openCommandPalette } from '../../utils/commandPalette'
import logoFile from '../../assets/logo.webp'
import './SiteHeader.css'

const IS_APPLE = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

/**
 * Header for project and blog routes. It reuses the home header's classes, so the
 * bar looks identical everywhere; links lead back to the matching home section.
 */
function SiteHeader() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const isDark = theme === 'dark'
  const lang = i18n.language === 'it' ? 'it' : 'en'

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const current: SectionId | null = pathname.startsWith('/blog')
    ? 'blog'
    : pathname.startsWith('/projects')
      ? 'projects'
      : null

  const goTo = (id: SectionId) => navigate(id === 'home' ? '/' : `/#${id}`)

  return (
    <header className={`topbar topbar--subpage${isScrolled ? ' is-scrolled' : ''}`}>
      <nav aria-label={t('navbar.mainNavAriaLabel')}>
        <button className="logo" type="button" aria-label={t('navbar.logoAriaLabel')} onClick={() => goTo('home')}>
          <img src={logoFile} alt="" width={34} height={34} />
          <div className="logo-label">
            <span className="logo-name">maton11</span>
            <span className="logo-role">Builder Dev</span>
          </div>
        </button>
        <ul>
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <button
                type="button"
                className={current === id ? 'nav-active' : ''}
                aria-current={current === id ? 'page' : undefined}
                onClick={() => goTo(id)}
              >
                {t(`navbar.${id}`)}
                <span className="nav-underline" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <div className="topbar-actions">
          <button
            className="palette-trigger"
            type="button"
            onClick={openCommandPalette}
            aria-label={t('palette.open')}
            title={t('palette.open')}
          >
            <span className="material-symbols-outlined" aria-hidden="true">search</span>
            <kbd>{IS_APPLE ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button
            className="theme-toggle-btn"
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t('navbar.themeToLight') : t('navbar.themeToDark')}
            title={isDark ? t('navbar.themeToLight') : t('navbar.themeToDark')}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            className="lang-chip"
            type="button"
            onClick={() => void i18n.changeLanguage(lang === 'it' ? 'en' : 'it')}
            aria-label={t('hero.langSwitchAriaLabel')}
          >
            <span className="material-symbols-outlined" aria-hidden="true">translate</span>
            <span className="lang-chip-label">{lang === 'it' ? 'IT' : 'EN'}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader
