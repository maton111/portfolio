import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import profileFrontImg from '../assets/profilo1.jpeg'
import profileBackImg from '../assets/profilo2.png'
import { scrollToSection } from '../hooks/useSectionScroll'
import { useReveal } from '../hooks/useReveal'
import './AboutSection.css'

const SEGMENTS = 10
const STAT_ANIMATION_DURATION_MS = 1300
const STAT_TRIGGER_THRESHOLD = 0.35

const aboutStats = [
  { key: 'statBackend', value: 96, tone: 'green' as const },
  { key: 'statArch', value: 94, tone: 'mint' as const },
  { key: 'statTesting', value: 88, tone: 'orange' as const },
]

function AboutSegmentBar({ value, tone }: { value: number; tone: 'green' | 'mint' | 'orange' }) {
  const activeSegments = Math.max(0, Math.round((value / 100) * SEGMENTS))

  return (
    <div className="about-segment-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      {Array.from({ length: SEGMENTS }).map((_, index) => (
        <span key={`${tone}-${index}`} className={index < activeSegments ? `is-active ${tone}` : ''} />
      ))}
    </div>
  )
}

function AboutSection() {
  const { t } = useTranslation()
  const [isProfileFlipped, setIsProfileFlipped] = useState(false)
  const statsCardRef = useRef<HTMLDivElement | null>(null)
  const headerRevealRef = useReveal<HTMLElement>()
  const layoutRevealRef = useReveal<HTMLDivElement>(0.06)
  const [hasStartedStatsAnimation, setHasStartedStatsAnimation] = useState(false)
  const [displayedStats, setDisplayedStats] = useState<number[]>(() => aboutStats.map(() => 0))

  useEffect(() => {
    const cardNode = statsCardRef.current
    if (!cardNode || hasStartedStatsAnimation) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStartedStatsAnimation(true)
          observer.disconnect()
        }
      },
      { threshold: STAT_TRIGGER_THRESHOLD },
    )

    observer.observe(cardNode)
    return () => { observer.disconnect() }
  }, [hasStartedStatsAnimation])

  useEffect(() => {
    if (!hasStartedStatsAnimation) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayedStats(aboutStats.map((stat) => stat.value))
      return
    }

    let animationFrameId = 0
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(1, elapsed / STAT_ANIMATION_DURATION_MS)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setDisplayedStats(aboutStats.map((stat) => Math.round(stat.value * easedProgress)))

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate)
        return
      }
      setDisplayedStats(aboutStats.map((stat) => stat.value))
    }

    animationFrameId = window.requestAnimationFrame(animate)
    return () => { window.cancelAnimationFrame(animationFrameId) }
  }, [hasStartedStatsAnimation])

  const originCards = [
    { index: '01', titleKey: 'about.card1Title', descKey: 'about.card1Desc' },
    { index: '02', titleKey: 'about.card2Title', descKey: 'about.card2Desc' },
    { index: '03', titleKey: 'about.card3Title', descKey: 'about.card3Desc' },
  ]

  const quests = [
    { statusKey: 'about.quest1Status', titleKey: 'about.quest1Title', descKey: 'about.quest1Desc', active: true },
    { statusKey: 'about.quest2Status', titleKey: 'about.quest2Title', descKey: 'about.quest2Desc', active: false },
  ]

  const metadata = [
    { labelKey: 'about.meta1Label', valueKey: 'about.meta1Value' },
    { labelKey: 'about.meta2Label', valueKey: 'about.meta2Value' },
    { labelKey: 'about.meta3Label', valueKey: 'about.meta3Value' },
    { labelKey: 'about.meta4Label', valueKey: 'about.meta4Value' },
  ]

  const scannerItems = [
    t('about.scanner1'), t('about.scanner2'), t('about.scanner3'),
    t('about.scanner4'), t('about.scanner5'), t('about.scanner6'),
  ]

  return (
    <section className="about-page" id="about" aria-labelledby="about-title">
      <div className="about-content">
        <header ref={headerRevealRef} className="about-header reveal-target">
          <div className="about-eyebrow">
            <div />
            <span>{t('about.eyebrow')}</span>
          </div>
          <h2 id="about-title">
            MATTIA ARCHINÀ <br />
            <span>{t('about.titleAccent')}</span>
          </h2>
          <p>{t('about.intro')}</p>
          <div className="about-ctas">
            <button className="about-btn primary" type="button" onClick={() => scrollToSection('projects')}>
              {t('about.ctaPrimary')}
            </button>
            <button className="about-btn secondary" type="button" onClick={() => scrollToSection('contact')}>
              {t('about.ctaSecondary')}
            </button>
          </div>
        </header>

        <div ref={layoutRevealRef} className="about-layout reveal-target reveal-delay-1">
          <div className="about-narrative">
            <section>
              <div className="about-section-head">
                <span>ENV</span>
                <div />
                <h3>{t('about.careerSnapshotLabel')}</h3>
              </div>
              <div className="about-copy">
                <p>{t('about.careerP1')}</p>
                <p dangerouslySetInnerHTML={{ __html: t('about.careerP2') }} />
              </div>
            </section>

            <section className="about-origin-grid">
              {originCards.map((card) => (
                <article key={card.index} className="about-origin-card">
                  <strong>{card.index}</strong>
                  <h4>{t(card.titleKey)}</h4>
                  <p>{t(card.descKey)}</p>
                </article>
              ))}
            </section>

            <section className="about-philosophy">
              <div className="about-terminal-icon" aria-hidden="true">
                <span className="material-symbols-outlined">terminal</span>
              </div>
              <h3>{t('about.philosophyTitle')}</h3>
              <blockquote>{t('about.philosophy')}</blockquote>
            </section>
          </div>

          <div className="about-hud">
            <div ref={statsCardRef} className="about-hud-card glow-primary">
              <div className="about-level-row">
                <div>
                  <span>MATON11</span>
                  <strong>LVL {new Date().getFullYear() - 2000 - (new Date() < new Date(new Date().getFullYear(), 2, 31) ? 1 : 0)}</strong>
                </div>
                <button
                  className={`about-avatar ${isProfileFlipped ? 'is-flipped' : ''}`}
                  type="button"
                  onClick={() => setIsProfileFlipped((prev) => !prev)}
                  aria-pressed={isProfileFlipped}
                  aria-label={isProfileFlipped ? t('about.profileAriaFlip1') : t('about.profileAriaFlip2')}
                  title={isProfileFlipped ? t('about.profileAriaFlip1') : t('about.profileAriaFlip2')}
                >
                  <span className="about-avatar-stack" aria-hidden="true">
                    <img className="about-avatar-face about-avatar-front" alt={t('about.profileAlt1')} src={profileFrontImg} />
                    <img className="about-avatar-face about-avatar-back" alt={t('about.profileAlt2')} src={profileBackImg} />
                  </span>
                </button>
              </div>

              <div className="about-stats">
                {aboutStats.map((stat, index) => {
                  const displayedValue = displayedStats[index] ?? 0

                  return (
                    <div key={stat.key}>
                      <div className="about-stat-head">
                        <span>{t(`about.${stat.key}`)}</span>
                        <strong className={stat.tone}>{displayedValue}%</strong>
                      </div>
                      <AboutSegmentBar value={displayedValue} tone={stat.tone} />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="about-quests-card">
              <h3>
                <span className="material-symbols-outlined" aria-hidden="true">military_tech</span>
                {t('about.questsTitle')}
              </h3>
              <ul>
                {quests.map((quest) => (
                  <li key={quest.titleKey} className={quest.active ? 'is-active' : 'is-inactive'}>
                    <div>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {quest.active ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <div>
                      <small>{t(quest.statusKey)}</small>
                      <strong>{t(quest.titleKey)}</strong>
                      <p>{t(quest.descKey)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-meta-card">
              {metadata.map((item) => (
                <div key={item.labelKey}>
                  <small>{t(item.labelKey)}</small>
                  <strong>{t(item.valueKey)}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-scanner" aria-label={t('about.statusScannerAriaLabel')}>
          <div className="about-scanner-track">
            <div className="about-scanner-group">
              {scannerItems.map((item, index) => (
                <span key={`a-${index}`}>
                  <span className="dot" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <div className="about-scanner-group" aria-hidden="true">
              {scannerItems.map((item, index) => (
                <span key={`b-${index}`}>
                  <span className="dot" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
