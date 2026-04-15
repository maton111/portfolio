import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import HeroHudCard from '../components/ui/HeroHudCard'
import DecryptedText from '../components/ui/DecryptedText'
import cvFile from '../assets/CV - Mattia Archinà.pdf'
import logoFile from '../assets/logo.png'
import {scrollToSection} from '../hooks/useSectionScroll'
import './HeroSection.css'

function calcAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
  return age
}

const BIRTH_DATE = new Date(2000, 2, 31)

function HeroSection() {
  const { t, i18n } = useTranslation()
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact']

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.28

      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => {
    void i18n.changeLanguage(i18n.language === 'it' ? 'en' : 'it')
  }

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

  return (
    <div className="hero-page">
      <header className="topbar">
        <nav>
          <button className="logo" type="button" aria-label={t('navbar.logoAriaLabel')} onClick={() => scrollToSection('home')}>
            <img src={logoFile} alt="Logo Mattia Archina" />
          </button>
          <ul>
            <li><button type="button" className={activeSection === 'home' ? 'nav-active' : ''} onClick={() => scrollToSection('home')}>{t('navbar.home')}</button></li>
            <li><button type="button" className={activeSection === 'about' ? 'nav-active' : ''} onClick={() => scrollToSection('about')}>{t('navbar.about')}</button></li>
            <li><button type="button" className={activeSection === 'skills' ? 'nav-active' : ''} onClick={() => scrollToSection('skills')}>{t('navbar.skills')}</button></li>
            <li><button type="button" className={activeSection === 'projects' ? 'nav-active' : ''} onClick={() => scrollToSection('projects')}>{t('navbar.projects')}</button></li>
            <li><button type="button" className={activeSection === 'contact' ? 'nav-active' : ''} onClick={() => scrollToSection('contact')}>{t('navbar.contact')}</button></li>
          </ul>
          <div className="topbar-actions">
            <span className="availability-chip">
              <span className="availability-dot" aria-hidden="true" />
              <span className="availability-label">{t('hero.availability')}</span>
            </span>
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
        <div className="glow glow-green" aria-hidden="true" />
        <div className="glow glow-orange" aria-hidden="true" />

        <section className="hero-grid">
          <div className="hero-copy">
            <p>{t('hero.eyebrow')}</p>
            <h1>
              <DecryptedText text={t('hero.title')} /> <br />
              <span>
                <DecryptedText text={t('hero.subtitle')} />
              </span>
            </h1>
            <p className="hero-intro">{t('hero.intro')}</p>
            <div className="hero-ctas">
              <button className="btn btn-primary" type="button" onClick={() => scrollToSection('projects')}>
                {t('hero.ctaPrimary')}
                <span className="material-symbols-outlined" aria-hidden="true">
                  north_east
                </span>
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => scrollToSection('contact')}>
                {t('hero.ctaSecondary')}
              </button>
            </div>
            <div className="hero-trust">
              <span className="material-symbols-outlined" aria-hidden="true">
                terminal
              </span>
              {t('hero.trust')}
            </div>
          </div>

          <HeroHudCard
            name="Mattia Archinà"
            role="Builder Dev"
            level={`LVL ${calcAge(BIRTH_DATE)}`}
            status={t('hero.hudStatus')}
            stats={stats}
            quests={quests}
            tags={tags}
          />
        </section>
      </main>

      <div className="status-scanner" aria-label={t('hero.statusScannerAriaLabel')}>
        <div className="scanner-track">
          <div className="scanner-group">
            {scannerItems.map((item) => (
              <span className={item.highlighted ? 'highlighted' : ''} key={item.text}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {item.icon}
                </span>
                {item.text}
              </span>
            ))}
          </div>
          <div className="scanner-group" aria-hidden="true">
            {scannerItems.map((item, index) => (
              <span className={item.highlighted ? 'highlighted' : ''} key={`${item.text}-${index}`}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {item.icon}
                </span>
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
