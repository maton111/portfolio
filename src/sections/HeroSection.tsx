import {lazy, Suspense, useEffect, useRef, useState, type CSSProperties} from 'react'
import {useTranslation} from 'react-i18next'
import HeroHudCard from '../components/ui/HeroHudCard'
import DecryptedText from '../components/ui/DecryptedText'
import {openCommandPalette} from '../utils/commandPalette'
import {useTheme} from '../hooks/useTheme'
import logoFile from '../assets/logo.webp'
import cvFile from '../assets/CV - Mattia Archinà.pdf'
import {scrollToSection} from '../hooks/useSectionScroll'
import {SECTION_IDS, type SectionId} from '../data/sectionNavigation'
import './HeroSection.css'
import './HeroHeader.css'

// three.js is the heaviest dependency: load it in its own chunk, in parallel with first paint.
const loadHero3D = () => import('../components/ui/Hero3D')
const Hero3D = lazy(loadHero3D)
void loadHero3D()

const IS_APPLE = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

function calcAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
  return age
}

const BIRTH_DATE = new Date(2000, 2, 31)

const TAGLINES: Record<'en' | 'it', string[]> = {
  en: [
    'I build, I learn, I keep growing.',
    'Systems that hold up, aesthetics done right.',
    'Backend that won\'t wake you up at night.',
    'Clean code, shipped to production.',
  ],
  it: [
    'Creo, imparo e continuo a crescere.',
    'Sistemi che reggono, estetica fatta bene.',
    'Backend che non ti sveglia la notte.',
    'Codice pulito, spedito in produzione.',
  ],
}

function HeroSection() {
  const { t, i18n } = useTranslation()
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const { theme, toggleTheme } = useTheme()
  const [tagIdx, setTagIdx] = useState(0)
  const [tagKey, setTagKey] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const progressRef = useRef<HTMLSpanElement>(null)

  // Rotating taglines
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const iv = setInterval(() => {
      setTagIdx(i => (i + 1) % 4)
      setTagKey(k => k + 1)
    }, 3800)
    return () => clearInterval(iv)
  }, [])

  // Active section detection + reading progress (one rAF-throttled scroll listener)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const marker = window.scrollY + window.innerHeight * 0.28
      let current: SectionId = 'home'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= marker) current = id
      }
      setActiveSection(current)
      setIsScrolled(window.scrollY > 12)

      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Mobile menu: lock scroll, close on Escape or when the viewport grows to desktop
  useEffect(() => {
    if (!isMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 900px)')
    const onChange = () => { if (desktop.matches) setIsMenuOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onChange)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onChange)
    }
  }, [isMenuOpen])

  const goTo = (id: SectionId) => {
    setIsMenuOpen(false)
    scrollToSection(id)
  }

  const toggleLang = () => { void i18n.changeLanguage(i18n.language === 'it' ? 'en' : 'it') }

  const lang = i18n.language === 'it' ? 'it' : 'en'
  const taglines = TAGLINES[lang]

  const stats = [
    { label: 'Backend_Stability', value: 93, colorClass: 'is-green' },
    { label: 'Frontend_Polish', value: 67, colorClass: 'is-mint' },
    { label: 'Discipline_Stat', value: 82, colorClass: 'is-soft' },
    { label: 'Curiosity_Engine', value: 98, colorClass: 'is-orange' },
  ]

  const quests = [
    { icon: 'rocket_launch', text: t('hero.hudQuestBuild') },
    { icon: 'task_alt', text: t('hero.hudQuestMain') },
  ]

  const tags = [t('hero.hudTag1'), t('hero.hudTag2'), t('hero.hudTag3')]

  const scannerItems = [
    { icon: 'radar', text: t('hero.scannerAvailable'), highlighted: true },
    { icon: 'memory', text: t('hero.scannerLoad'), highlighted: false },
    { icon: 'hub', text: t('hero.scannerNetwork'), highlighted: true },
    { icon: 'bolt', text: t('hero.scannerEnergy'), highlighted: false },
    { icon: 'shield', text: t('hero.scannerSecurity'), highlighted: true },
    { icon: 'update', text: t('hero.scannerUpdates'), highlighted: false },
    { icon: 'code', text: t('hero.scannerMode'), highlighted: true },
    { icon: 'terminal', text: t('hero.scannerConsole'), highlighted: false },
    { icon: 'cloud', text: t('hero.scannerCloud'), highlighted: true },
    { icon: 'bug_report', text: t('hero.scannerBugs'), highlighted: false },
    { icon: 'speed', text: t('hero.scannerPerf'), highlighted: true },
    { icon: 'schedule', text: t('hero.scannerResponse'), highlighted: false },
  ]

  const navItems = SECTION_IDS.map((id) => ({ id, label: t(`navbar.${id}`) }))

  const isDark = theme === 'dark'

  return (
    <div className="hero-page">
      <header className={`topbar${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}>
        <nav aria-label={t('navbar.mainNavAriaLabel')}>
          <button className="logo" type="button" aria-label={t('navbar.logoAriaLabel')} onClick={() => goTo('home')}>
            <img src={logoFile} alt="" width={34} height={34} />
            <div className="logo-label">
              <span className="logo-name">maton11</span>
              <span className="logo-role">Builder Dev</span>
            </div>
          </button>
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  type="button"
                  className={activeSection === item.id ? 'nav-active' : ''}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  onClick={() => goTo(item.id)}
                >
                  {item.label}
                  <span className="nav-underline" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div className="topbar-actions">
            <span className="availability-chip">
              <span className="availability-dot" aria-hidden="true" />
              <span className="availability-label">{t('hero.availability')}</span>
            </span>
            <button
              className="palette-trigger"
              type="button"
              onClick={openCommandPalette}
              aria-label={t('palette.open')}
              title={t('palette.open')}
            >
              <span className="material-symbols-outlined" aria-hidden="true">search</span>
              <kbd>{IS_APPLE ? '\u2318' : 'Ctrl'} K</kbd>
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
            <button className="lang-chip" type="button" onClick={toggleLang} aria-label={t('hero.langSwitchAriaLabel')}>
              <span className="material-symbols-outlined" aria-hidden="true">translate</span>
              <span className="lang-chip-label">{lang === 'it' ? 'IT' : 'EN'}</span>
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
              onClick={() => setIsMenuOpen(open => !open)}
            >
              <span className="menu-toggle-bars" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </nav>
        <span className="topbar-progress" ref={progressRef} aria-hidden="true" />
      </header>

      <div
        className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`}
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <ol className="mobile-menu-list">
          {navItems.map((item, index) => (
            <li key={item.id} style={{ '--stagger-i': index } as CSSProperties}>
              <button
                type="button"
                className={activeSection === item.id ? 'is-current' : ''}
                onClick={() => goTo(item.id)}
              >
                <span className="mobile-menu-index">{String(index).padStart(2, '0')}</span>
                {item.label}
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mobile-menu-footer">
          <span className="hero-avail">
            <span className="availability-dot" aria-hidden="true" />
            {t('hero.availability')}
          </span>
          <a className="btn btn-primary" href={cvFile} download="CV-Mattia-Archina.pdf">
            {t('hero.ctaPrimary')}
            <span className="material-symbols-outlined" aria-hidden="true">download</span>
          </a>
        </div>
      </div>

      <main className="hero-main" id="home" tabIndex={-1}>
        {/* 3D interactive background */}
        <div className="hero-canvas-wrap" aria-hidden="true">
          <Suspense fallback={null}>
            <Hero3D theme={theme} />
          </Suspense>
          <div className="hero-scrim" />
        </div>

        <section className="hero-grid">
          <div className="hero-copy">
            <span className="hero-avail">
              <span className="availability-dot" aria-hidden="true" />
              {t('hero.availability')}
            </span>
            <p className="hero-eyebrow">{t('hero.eyebrow')}</p>
            <h1>
              <DecryptedText text={lang === 'it' ? 'Ciao, sono' : "Hey, I'm"} />
              <br />
              <span className="hero-title-accent">
                <DecryptedText text="Mattia." />
              </span>
            </h1>

            {/* Rotating tagline */}
            <p className="hero-tagline">
              <DecryptedText key={tagKey} text={taglines[tagIdx]} speed={22} />
            </p>
            <div className="hero-tag-dots" aria-hidden="true">
              {taglines.map((_, i) => (
                <span
                  key={i}
                  className={`hero-tag-dot${i === tagIdx ? ' is-active' : ''}`}
                />
              ))}
            </div>

            <p className="hero-intro">{t('hero.intro')}</p>
            <div className="hero-ctas">
              <a
                className="btn btn-primary"
                href={cvFile}
                download="CV-Mattia-Archina.pdf"
                aria-label={t('navbar.downloadCvAriaLabel')}
              >
                {t('hero.ctaPrimary')}
                <span className="material-symbols-outlined" aria-hidden="true">download</span>
              </a>
              <button className="btn btn-secondary" type="button" onClick={() => scrollToSection('contact')}>
                {t('hero.ctaSecondary')}
                <span className="material-symbols-outlined" aria-hidden="true">mail</span>
              </button>
            </div>
            <div className="hero-trust">
              <span className="material-symbols-outlined" aria-hidden="true">code</span>
              {t('hero.trust')}
            </div>
            <div className="hero-hint" aria-hidden="true">
              <span className="material-symbols-outlined">touch_app</span>
              {lang === 'it' ? 'Muovi il mouse · Clicca per l\'onda' : 'Move your mouse · Click to pulse'}
            </div>
          </div>

          <div className="hud-slot">
            <HeroHudCard
              name="Mattia Archinà"
              role="Builder Dev"
              level={calcAge(BIRTH_DATE)}
              stats={stats}
              quests={quests}
              tags={tags}
            />
          </div>
        </section>
      </main>

      <div className="status-scanner" aria-label={t('hero.statusScannerAriaLabel')}>
        <div className="scanner-track">
          <div className="scanner-group">
            {scannerItems.map((item) => (
              <span className={item.highlighted ? 'highlighted' : ''} key={item.text}>
                <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
          <div className="scanner-group" aria-hidden="true">
            {scannerItems.map((item, index) => (
              <span className={item.highlighted ? 'highlighted' : ''} key={`${item.text}-${index}`}>
                <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
