import {type CSSProperties} from 'react'
import {useTranslation} from 'react-i18next'
import {useReveal} from '../hooks/useReveal'
import MagicBentoCard from '../components/ui/MagicBentoCard'
import './AboutSection.css'

const originCards = [
  { icon: 'shield', titleKey: 'about.card1Title', descKey: 'about.card1Desc' },
  { icon: 'sync_alt', titleKey: 'about.card2Title', descKey: 'about.card2Desc' },
  { icon: 'rocket_launch', titleKey: 'about.card3Title', descKey: 'about.card3Desc' },
]

const metadataRows = [
  { labelKey: 'about.meta1Label', valueKey: 'about.meta1Value' },
  { labelKey: 'about.meta2Label', valueKey: 'about.meta2Value' },
  { labelKey: 'about.meta3Label', valueKey: 'about.meta3Value' },
  { labelKey: 'about.meta4Label', valueKey: 'about.meta4Value' },
  { labelKey: 'about.meta5Label', valueKey: 'about.meta5Value' },
]

function AboutSection() {
  const { t } = useTranslation()
  const headerRevealRef = useReveal<HTMLElement>()
  const narrativeRevealRef = useReveal<HTMLDivElement>(0.06)
  const hudRevealRef = useReveal<HTMLDivElement>(0.08)

  const scannerItems = [
    t('about.scanner1'), t('about.scanner2'), t('about.scanner3'),
    t('about.scanner4'), t('about.scanner5'), t('about.scanner6'),
  ]

  return (
    <section className="about-page" id="about" aria-labelledby="about-title">
      <div className="about-content">

        <header ref={headerRevealRef} className="about-header reveal-target">
          <div className="about-eyebrow">
            <div className="reveal-bar" />
            <span>{t('about.eyebrow')}</span>
          </div>
          <h2 id="about-title" className="reveal-heading">
            {t('about.titleLine1')}
            <br />
            <span>{t('about.titleLine2')}</span>
          </h2>
          <p>{t('about.intro')}</p>
        </header>

        <div className="about-layout">

          {/* LEFT — narrative */}
          <div ref={narrativeRevealRef} className="about-narrative reveal-target">
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
              {originCards.map((card, i) => (
                <MagicBentoCard
                  key={card.icon}
                  className="about-origin-card stagger-child"
                  style={{ '--stagger-i': i } as CSSProperties}
                >
                  <span className="material-symbols-outlined about-origin-icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h4>{t(card.titleKey)}</h4>
                  <p>{t(card.descKey)}</p>
                </MagicBentoCard>
              ))}
            </section>

            <MagicBentoCard
              className="about-philosophy stagger-child"
              style={{ '--stagger-i': 3 } as CSSProperties}
            >
              <small className="about-philosophy-eyebrow">{t('about.philosophyTitle')}</small>
              <blockquote>{t('about.philosophy')}</blockquote>
            </MagicBentoCard>
          </div>

          {/* RIGHT — OS_KERNEL_STABLE */}<div ref={hudRevealRef} className="about-hud reveal-target about-hud-fade">
            <div className="about-kernel-card">
              <div
                className="about-kernel-header stagger-child"
                style={{ '--stagger-i': 0 } as CSSProperties}
              >
                <span className="about-kernel-pretitle">{t('about.metadata')}</span>
                <h2 className="about-kernel-title">{t('about.kernelTitle')}</h2>
              </div>

              <div className="about-kernel-rows">
                {metadataRows.map((row, i) => (
                  <div
                    key={row.labelKey}
                    className="about-kernel-row stagger-child"
                    style={{ '--stagger-i': i + 1 } as CSSProperties}
                  >
                    <small>{t(row.labelKey)}</small>
                    <strong>{t(row.valueKey)}</strong>
                  </div>
                ))}
              </div>

              <div
                className="about-kernel-footer stagger-child"
                style={{ '--stagger-i': 6 } as CSSProperties}
              >
                <span className="material-symbols-outlined" aria-hidden="true">radar</span>
                <span>{t('about.kernelNode')}</span>
              </div>

              <div className="about-hud-corner about-hud-corner-tr" aria-hidden="true" />
              <div className="about-hud-corner about-hud-corner-bl" aria-hidden="true" />
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
