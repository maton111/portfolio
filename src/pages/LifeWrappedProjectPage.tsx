import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GlitchTransition from '../components/overlays/GlitchTransition'
import './ProjectNotesPage.css'
import './LifeWrappedProjectPage.css'

const frontendStack = [
  'Next.js 16 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS v4',
  'Framer Motion v12', 'Space Grotesk (next/font)', '@vercel/og (Edge Runtime)',
  'Web Share API', 'Vercel (auto-deploy)',
]

const backendStack = [
  'ASP.NET Core 8', '.NET 8 (C#)', 'Entity Framework Core', 'PostgreSQL (JSONB)',
  'Npgsql', 'CsvHelper', 'System.IO.Compression', 'HttpClientFactory',
  'ASP.NET Core Rate Limiter', 'Railway (Docker)',
]

const platforms = [
  {
    key: 'platform1',
    color: '#4285f4',
    bgClass: 'lw-platform--google',
    statsKeys: ['platform1Stat1', 'platform1Stat2', 'platform1Stat3', 'platform1Stat4'],
  },
  {
    key: 'platform2',
    color: '#e1306c',
    bgClass: 'lw-platform--instagram',
    statsKeys: ['platform2Stat1', 'platform2Stat2', 'platform2Stat3', 'platform2Stat4'],
  },
  {
    key: 'platform3',
    color: '#1db954',
    bgClass: 'lw-platform--spotify',
    statsKeys: ['platform3Stat1', 'platform3Stat2', 'platform3Stat3'],
  },
  {
    key: 'platform4',
    color: '#e50914',
    bgClass: 'lw-platform--netflix',
    statsKeys: ['platform4Stat1', 'platform4Stat2', 'platform4Stat3'],
  },
  {
    key: 'platform5',
    color: '#c7d5e0',
    bgClass: 'lw-platform--steam',
    statsKeys: ['platform5Stat1', 'platform5Stat2', 'platform5Stat3'],
  },
]

const engSections: { titleKey: string; lines: string[] }[] = [
  { titleKey: 'eng1Title', lines: ['eng1L1', 'eng1L2', 'eng1L3', 'eng1L4'] },
  { titleKey: 'eng2Title', lines: ['eng2L1', 'eng2L2', 'eng2L3', 'eng2L4'] },
  { titleKey: 'eng3Title', lines: ['eng3L1', 'eng3L2', 'eng3L3', 'eng3L4'] },
  { titleKey: 'eng4Title', lines: ['eng4L1', 'eng4L2', 'eng4L3', 'eng4L4'] },
  { titleKey: 'eng5Title', lines: ['eng5L1', 'eng5L2', 'eng5L3', 'eng5L4'] },
  { titleKey: 'eng6Title', lines: ['eng6L1', 'eng6L2', 'eng6L3', 'eng6L4'] },
]

function LifeWrappedProjectPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const navigateWithGlitch = (target: string) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { navigate(target); return }
    setIsLeaving(true)
    window.setTimeout(() => navigate(target), 180)
  }

  const lw = (key: string) => t(`lifeWrapped.${key}`)

  return (
    <main className="project-notes-page terminal-bg" aria-labelledby="lw-title">
      <section className="project-notes-shell">

        {/* HERO */}
        <header className="project-notes-hero">
          <div className="project-notes-hero-copy">
            <small>{lw('heroBadge')}</small>
            <h1 id="lw-title">{lw('heroTitle')}</h1>
            <p>{lw('heroDesc')}</p>
            <div className="project-notes-hero-meta">
              <span>{lw('heroRoleLabel')}</span>
              <span>{lw('heroStackLabel')}</span>
              <span>{lw('heroStatusLabel')}</span>
            </div>
            <div className="project-notes-actions">
              <button type="button" onClick={() => navigateWithGlitch('/#projects')}>
                {lw('backBtn')}
              </button>
              <a
                href="https://github.com/maton111/lifewrapped"
                target="_blank"
                rel="noopener noreferrer"
                className="project-notes-action-link"
              >
                {lw('githubBtn')}
              </a>
              <button className="primary" type="button" onClick={() => navigateWithGlitch('/#contact')}>
                {lw('contactBtn')}
              </button>
            </div>
          </div>

          <div className="project-notes-hero-visual lw-hero-visual" aria-hidden="true">
            <div className="lw-hero-stat">
              <span className="lw-hero-stat-number">5</span>
              <span className="lw-hero-stat-label">{lw('statPlatforms')}</span>
            </div>
            <div className="lw-hero-stat">
              <span className="lw-hero-stat-number lw-stat-purple">12</span>
              <span className="lw-hero-stat-label">{lw('statSharing')}</span>
            </div>
            <div className="lw-hero-stat">
              <span className="lw-hero-stat-number lw-stat-green">0</span>
              <span className="lw-hero-stat-label">{lw('statPrivacy')}</span>
            </div>
            <div className="lw-hero-divider" />
            <div className="lw-hero-infra">
              <span className="lw-infra-label">{lw('infraLabel')}</span>
              <span>{lw('infraStack')}</span>
              <span>github.com/maton111/lifewrapped</span>
            </div>
          </div>
        </header>

        {/* CONTEXT + CHALLENGE */}
        <section className="project-notes-grid" aria-label="Context and challenges">
          <article className="project-notes-panel">
            <h2>{lw('contextTitle')}</h2>
            <p>{lw('contextP1')}</p>
            <p>{lw('contextP2')}</p>
          </article>

          <article className="project-notes-panel">
            <h2>{lw('challengeTitle')}</h2>
            <p>{lw('challengeIntro')}</p>
            <ul>
              {['challengeL1','challengeL2','challengeL3','challengeL4','challengeL5'].map((k) => (
                <li key={k}>{lw(k)}</li>
              ))}
            </ul>
          </article>
        </section>

        {/* PLATFORMS GRID */}
        <section aria-label={lw('platformsTitle')}>
          <div className="lw-section-header">
            <h2 className="lw-section-title">{lw('platformsTitle')}</h2>
          </div>
          <div className="lw-platforms-grid">
            {platforms.map((p) => (
              <article key={p.key} className={`lw-platform-card ${p.bgClass}`}>
                <header className="lw-platform-header">
                  <span className="lw-platform-dot" style={{ background: p.color }} />
                  <span className="lw-platform-name" style={{ color: p.color }}>{lw(`${p.key}Name`)}</span>
                </header>
                <div className="lw-platform-input">
                  <span className="lw-platform-input-label">{lw('platformInput')}</span>
                  <code>{lw(`${p.key}Input`)}</code>
                </div>
                <div className="lw-platform-stats">
                  <span className="lw-platform-stats-label">{lw('platformStats')}</span>
                  <ul>
                    {p.statsKeys.map((sk) => (
                      <li key={sk}>{lw(sk)}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE */}
        <article className="project-notes-panel lw-arch-panel">
          <h2>{lw('archTitle')}</h2>
          <div className="lw-arch-grid">
            <div className="lw-arch-col">
              <h3 className="lw-arch-col-title">{lw('archClientLayer')}</h3>
              <div className="lw-arch-node lw-arch-node--primary">
                {lw('archClientNode')}
                <span>{lw('archClientSub')}</span>
              </div>
              <div className="lw-arch-node lw-arch-node--deploy">
                {lw('archDeployFrontend')}
              </div>
            </div>

            <div className="lw-arch-arrow">
              <span>{lw('archArrow1')}</span>
              <span className="lw-arch-arrow-line">→</span>
            </div>

            <div className="lw-arch-col">
              <h3 className="lw-arch-col-title">{lw('archBackendLayer')}</h3>
              <div className="lw-arch-node lw-arch-node--primary">
                {lw('archBackendNode')}
                <span>{lw('archBackendSub')}</span>
              </div>
              <div className="lw-arch-node">
                {lw('archDbNode')}
                <span>{lw('archDbSub')}</span>
              </div>
              <div className="lw-arch-node lw-arch-node--deploy">
                {lw('archDeployBackend')}
              </div>
            </div>

            <div className="lw-arch-arrow">
              <span>{lw('archArrow2')}</span>
              <span className="lw-arch-arrow-line">→</span>
            </div>

            <div className="lw-arch-col">
              <h3 className="lw-arch-col-title">{lw('archExternalLayer')}</h3>
              <div className="lw-arch-node">
                {lw('archSteamNode')}
                <span>{lw('archSteamSub')}</span>
              </div>
              <div className="lw-arch-node">
                {lw('archVercelOgNode')}
                <span>{lw('archVercelOgSub')}</span>
              </div>
            </div>
          </div>
        </article>

        {/* ENGINEERING DECISIONS */}
        <section className="project-notes-sections" aria-label={lw('engTitle')}>
          {engSections.map((section) => (
            <article key={section.titleKey} className="project-notes-panel">
              <h2>{lw(section.titleKey)}</h2>
              <ul>
                {section.lines.map((lineKey) => (
                  <li key={lineKey}>{lw(lineKey)}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {/* TECH STACK */}
        <section className="project-notes-grid" aria-label="Technology stack">
          <article className="project-notes-panel">
            <h2>{lw('stackFrontendTitle')}</h2>
            <div className="project-notes-tags">
              {frontendStack.map((item) => (<span key={item}>{item}</span>))}
            </div>
          </article>
          <article className="project-notes-panel">
            <h2>{lw('stackBackendTitle')}</h2>
            <div className="project-notes-tags">
              {backendStack.map((item) => (<span key={item}>{item}</span>))}
            </div>
          </article>
        </section>

        {/* PRIVACY + OUTCOMES */}
        <section className="project-notes-grid" aria-label="Privacy and outcomes">
          <article className="project-notes-panel lw-privacy-panel">
            <h2>{lw('privacyTitle')}</h2>
            <ul>
              {['privacyL1','privacyL2','privacyL3','privacyL4','privacyL5'].map((k) => (
                <li key={k}>{lw(k)}</li>
              ))}
            </ul>
          </article>

          <article className="project-notes-panel">
            <h2>{lw('outcomesTitle')}</h2>
            <ul>
              {['oc1','oc2','oc3','oc4','oc5','oc6'].map((k) => (
                <li key={k}>{lw(k)}</li>
              ))}
            </ul>
          </article>
        </section>

      </section>

      {isLeaving ? <GlitchTransition /> : null}
    </main>
  )
}

export default LifeWrappedProjectPage
