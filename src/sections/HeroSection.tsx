import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import HeroHudCard from '../components/ui/HeroHudCard'
import DecryptedText from '../components/ui/DecryptedText'
import Hero3D from '../components/ui/Hero3D'
import cvFile from '../assets/CV - Mattia Archinà.pdf'
import logoFile from '../assets/logo.png'
import {scrollToSection} from '../hooks/useSectionScroll'
import type {SectionId} from '../data/sectionNavigation'
import './HeroSection.css'
import AnimatedContent from '../components/ui/AnimatedContent.tsx'

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
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return (localStorage.getItem('maton11_theme') ?? 'dark') as 'dark' | 'light' }
    catch { return 'dark' }
  })
  const [tagIdx, setTagIdx] = useState(0)
  const [tagKey, setTagKey] = useState(0)

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('maton11_theme', theme) } catch {}
  }, [theme])

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

  // Active section detection
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'timeline', 'blog', 'contact']
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.28
      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => { void i18n.changeLanguage(i18n.language === 'it' ? 'en' : 'it') }
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

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

  const navItems = [
    { id: 'home',     label: t('navbar.home') },
    { id: 'about',    label: t('navbar.about') },
    { id: 'skills',   label: t('navbar.skills') },
    { id: 'projects', label: t('navbar.projects') },
    { id: 'timeline', label: t('navbar.timeline') },
    { id: 'blog',     label: t('navbar.blog') },
    { id: 'contact',  label: t('navbar.contact') },
  ]

  const isDark = theme === 'dark'

  return (
    <div className="hero-page">
      <header className="topbar">
        <nav>
          <button className="logo" type="button" aria-label={t('navbar.logoAriaLabel')} onClick={() => scrollToSection('home')}>
            <img src={logoFile} alt="Logo Mattia Archina" />
          </button>
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  type="button"
                  className={activeSection === item.id ? 'nav-active' : ''}
                  onClick={() => scrollToSection(item.id as SectionId)}
                >
                  {item.label}
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
              className="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="lang-chip" type="button" onClick={toggleLang} aria-label={t('hero.langSwitchAriaLabel')}>
              <span className="material-symbols-outlined" aria-hidden="true">translate</span>
              <span className="lang-chip-label">{t('navbar.langSwitch')}</span>
            </button>
            <a
              className="cv-btn"
              href={cvFile}
              download="Mattia-Archina-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('navbar.downloadCvAriaLabel')}
            >
              {t('navbar.downloadCv')}
            </a>
          </div>
        </nav>
      </header>

      <main className="hero-main" id="home">
        {/* 3D interactive background */}
        <div className="hero-canvas-wrap" aria-hidden="true">
          <Hero3D theme={theme} />
          <div className="hero-scrim" />
        </div>

        <section className="hero-grid">
          <div className="hero-copy">
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
                  className="hero-tag-dot"
                  style={{
                    background: i === tagIdx ? 'var(--accent-green)' : 'color-mix(in oklab, var(--text-main) 18%, transparent)',
                    width: i === tagIdx ? 18 : 6,
                  }}
                />
              ))}
            </div>

            <p className="hero-intro">{t('hero.intro')}</p>
            <div className="hero-ctas">
              <button className="btn btn-primary" type="button" onClick={() => scrollToSection('projects')}>
                {t('hero.ctaPrimary')}
                <span className="material-symbols-outlined" aria-hidden="true">north_east</span>
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => scrollToSection('contact')}>
                {t('hero.ctaSecondary')}
              </button>
            </div>
            <div className="hero-trust">
              <span className="material-symbols-outlined" aria-hidden="true">terminal</span>
              {t('hero.trust')}
            </div>
            <div className="hero-hint" aria-hidden="true">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>touch_app</span>
              {lang === 'it' ? 'Muovi il mouse · Clicca per l\'onda' : 'Move your mouse · Click to pulse'}
            </div>
          </div>

          <AnimatedContent
            distance={500}
            direction="horizontal"
            reverse={false}
            duration={1.6}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity={false}
            scale={1}
            threshold={0.1}
            delay={0}
          >
            <HeroHudCard
              name="Mattia Archinà"
              role="Builder Dev"
              level={`LVL ${calcAge(BIRTH_DATE)}`}
              status={t('hero.hudStatus')}
              stats={stats}
              quests={quests}
              tags={tags}
            />
          </AnimatedContent>
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
