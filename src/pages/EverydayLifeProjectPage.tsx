import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GlitchTransition from '../components/overlays/GlitchTransition'
import './ProjectNotesPage.css'
import './EverydayLifeProjectPage.css'

type ModuleStatus = 'done' | 'partial' | 'pending'

const backendStack = [
  'ASP.NET Core 8', 'Entity Framework Core 8', 'PostgreSQL 16', 'Npgsql',
  'Firebase Admin SDK', 'AutoMapper', 'FluentValidation', 'Serilog',
  'OpenTelemetry / Prometheus', 'MailKit / Gmail SMTP', 'Asp.Versioning', 'Docker',
]

const mobileStack = [
  'Flutter 3.10+', 'Dart 3.10+', 'flutter_riverpod', 'dio', 'firebase_auth',
  'firebase_messaging (FCM)', 'google_sign_in', 'web_socket_channel',
  'flutter_secure_storage (AES-GCM)', 'geolocator', 'flutter_map + maplibre_gl',
  'flutter_local_notifications', 'qr_flutter', 'app_links (deep links)',
  'open_filex (APK install)', 'lottie', 'skeletonizer',
]

function StatusDot({ status, labels }: { status: ModuleStatus; labels: { done: string; partial: string; pending: string } }) {
  const map: Record<ModuleStatus, { label: string; cls: string }> = {
    done:    { label: labels.done,    cls: 'edlc-dot edlc-dot--done' },
    partial: { label: labels.partial, cls: 'edlc-dot edlc-dot--partial' },
    pending: { label: labels.pending, cls: 'edlc-dot edlc-dot--pending' },
  }
  const { label, cls } = map[status]
  return <span className={cls} title={label} aria-label={label} />
}

function EverydayLifeProjectPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLeaving, setIsLeaving] = useState(false)

  const navigateWithGlitch = (target: string) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { navigate(target); return }
    setIsLeaving(true)
    window.setTimeout(() => navigate(target), 180)
  }

  const statusLabels = {
    done: t('everydayLife.statusDone'),
    partial: t('everydayLife.statusPartial'),
    pending: t('everydayLife.statusPending'),
  }

  const modules: { nameKey: string; descKey: string; backendStatus: ModuleStatus; mobileStatus: ModuleStatus; highlightKey?: string }[] = [
    { nameKey: 'mod1Name', descKey: 'mod1Desc', backendStatus: 'done', mobileStatus: 'done' },
    { nameKey: 'mod2Name', descKey: 'mod2Desc', backendStatus: 'done', mobileStatus: 'done', highlightKey: 'mod2Highlight' },
    { nameKey: 'mod3Name', descKey: 'mod3Desc', backendStatus: 'done', mobileStatus: 'done', highlightKey: 'mod3Highlight' },
    { nameKey: 'mod4Name', descKey: 'mod4Desc', backendStatus: 'done', mobileStatus: 'partial' },
    { nameKey: 'mod5Name', descKey: 'mod5Desc', backendStatus: 'done', mobileStatus: 'pending', highlightKey: 'mod5Highlight' },
    { nameKey: 'mod6Name', descKey: 'mod6Desc', backendStatus: 'done', mobileStatus: 'done' },
    { nameKey: 'mod7Name', descKey: 'mod7Desc', backendStatus: 'done', mobileStatus: 'done', highlightKey: 'mod7Highlight' },
    { nameKey: 'mod8Name', descKey: 'mod8Desc', backendStatus: 'done', mobileStatus: 'done', highlightKey: 'mod8Highlight' },
    { nameKey: 'mod9Name', descKey: 'mod9Desc', backendStatus: 'done', mobileStatus: 'done' },
    { nameKey: 'mod10Name', descKey: 'mod10Desc', backendStatus: 'done', mobileStatus: 'pending' },
    { nameKey: 'mod11Name', descKey: 'mod11Desc', backendStatus: 'done', mobileStatus: 'done', highlightKey: 'mod11Highlight' },
  ]

  const backendItems: { key: string; status: ModuleStatus }[] = [
    { key: 'be1', status: 'done' }, { key: 'be2', status: 'done' }, { key: 'be3', status: 'done' },
    { key: 'be4', status: 'done' }, { key: 'be5', status: 'done' }, { key: 'be6', status: 'done' },
    { key: 'be7', status: 'done' }, { key: 'be8', status: 'done' }, { key: 'be9', status: 'done' },
    { key: 'be10', status: 'done' }, { key: 'be11', status: 'done' }, { key: 'be12', status: 'done' },
    { key: 'be13', status: 'partial' }, { key: 'be14', status: 'pending' },
    { key: 'be15', status: 'pending' }, { key: 'be16', status: 'pending' },
  ]

  const mobileItems: { key: string; status: ModuleStatus }[] = [
    { key: 'mob1', status: 'done' }, { key: 'mob2', status: 'done' }, { key: 'mob3', status: 'done' },
    { key: 'mob4', status: 'done' }, { key: 'mob5', status: 'partial' }, { key: 'mob6', status: 'pending' },
    { key: 'mob7', status: 'done' }, { key: 'mob8', status: 'done' }, { key: 'mob9', status: 'done' },
    { key: 'mob10', status: 'done' }, { key: 'mob11', status: 'done' }, { key: 'mob12', status: 'pending' },
    { key: 'mob13', status: 'done' }, { key: 'mob14', status: 'done' }, { key: 'mob15', status: 'done' },
    { key: 'mob16', status: 'done' }, { key: 'mob17', status: 'partial' }, { key: 'mob18', status: 'pending' },
  ]

  const backlogItems: { key: string; priority: 'high' | 'medium' | 'low' }[] = [
    { key: 'bl1', priority: 'high' }, { key: 'bl2', priority: 'high' }, { key: 'bl3', priority: 'high' },
    { key: 'bl4', priority: 'high' }, { key: 'bl5', priority: 'high' }, { key: 'bl6', priority: 'medium' },
    { key: 'bl7', priority: 'medium' }, { key: 'bl8', priority: 'medium' }, { key: 'bl9', priority: 'medium' },
    { key: 'bl10', priority: 'low' }, { key: 'bl11', priority: 'low' }, { key: 'bl12', priority: 'low' },
    { key: 'bl13', priority: 'low' },
  ]

  const engSections: { titleKey: string; lines: string[] }[] = [
    { titleKey: 'eng1Title', lines: ['eng1L1', 'eng1L2', 'eng1L3', 'eng1L4'] },
    { titleKey: 'eng2Title', lines: ['eng2L1', 'eng2L2', 'eng2L3', 'eng2L4', 'eng2L5'] },
    { titleKey: 'eng3Title', lines: ['eng3L1', 'eng3L2', 'eng3L3', 'eng3L4', 'eng3L5'] },
    { titleKey: 'eng4Title', lines: ['eng4L1', 'eng4L2', 'eng4L3', 'eng4L4', 'eng4L5'] },
    { titleKey: 'eng5Title', lines: ['eng5L1', 'eng5L2', 'eng5L3', 'eng5L4'] },
    { titleKey: 'eng6Title', lines: ['eng6L1', 'eng6L2', 'eng6L3', 'eng6L4', 'eng6L5'] },
  ]

  const doneCount = modules.filter((m) => m.backendStatus === 'done' && m.mobileStatus === 'done').length
  const partialCount = modules.filter((m) => m.backendStatus !== 'done' || m.mobileStatus !== 'done').length

  const el = (key: string) => t(`everydayLife.${key}`)

  return (
    <main className="project-notes-page terminal-bg" aria-labelledby="edlc-title">
      <section className="project-notes-shell">

        {/* HERO */}
        <header className="project-notes-hero">
          <div className="project-notes-hero-copy">
            <small>{el('heroBadge')}</small>
            <h1 id="edlc-title">{el('heroTitle')}</h1>
            <p>{el('heroDesc')}</p>
            <div className="project-notes-hero-meta">
              <span>{el('heroRoleLabel')}</span>
              <span>{el('heroStackLabel')}</span>
              <span>{el('heroStatusLabel')}</span>
            </div>
            <div className="project-notes-actions">
              <button type="button" onClick={() => navigateWithGlitch('/#projects')}>
                {el('backBtn')}
              </button>
              <button className="primary" type="button" onClick={() => navigateWithGlitch('/#contact')}>
                {el('contactBtn')}
              </button>
            </div>
          </div>

          <div className="project-notes-hero-visual edlc-hero-visual" aria-hidden="true">
            <div className="edlc-hero-stat">
              <span className="edlc-hero-stat-number">{modules.length}</span>
              <span className="edlc-hero-stat-label">{el('statModules')}</span>
            </div>
            <div className="edlc-hero-stat">
              <span className="edlc-hero-stat-number edlc-stat-green">{doneCount}</span>
              <span className="edlc-hero-stat-label">{el('statDone')}</span>
            </div>
            <div className="edlc-hero-stat">
              <span className="edlc-hero-stat-number edlc-stat-orange">{partialCount}</span>
              <span className="edlc-hero-stat-label">{el('statWip')}</span>
            </div>
            <div className="edlc-hero-divider" />
            <div className="edlc-hero-infra">
              <span className="edlc-infra-label">INFRA</span>
              <span>VPS Ubuntu · Cloudflare Tunnel</span>
              <span>everydaylifecore.com</span>
            </div>
          </div>
        </header>

        {/* CONTEXT + CHALLENGE */}
        <section className="project-notes-grid" aria-label="Overview">
          <article className="project-notes-panel">
            <h2>{el('contextTitle')}</h2>
            <p>{el('contextP1')}</p>
            <p>{el('contextP2')}</p>
          </article>

          <article className="project-notes-panel">
            <h2>{el('challengeTitle')}</h2>
            <p>{el('challengeIntro')}</p>
            <ul>
              {['challengeL1','challengeL2','challengeL3','challengeL4','challengeL5'].map((k) => (
                <li key={k}>{el(k)}</li>
              ))}
            </ul>
          </article>
        </section>

        {/* ARCHITECTURE */}
        <article className="project-notes-panel edlc-arch-panel">
          <h2>{el('archTitle')}</h2>
          <div className="edlc-arch-grid">
            <div className="edlc-arch-col">
              <h3 className="edlc-arch-col-title">{el('archClientLayer')}</h3>
              <div className="edlc-arch-node edlc-arch-node--primary">
                {el('archFlutterMobile')}
                <span>{el('archFlutterSub')}</span>
              </div>
              <div className="edlc-arch-node edlc-arch-node--future">
                {el('archWebApp')}
                <span>{el('archWebSub')}</span>
              </div>
            </div>

            <div className="edlc-arch-arrow">
              <span>HTTPS / WSS</span>
              <span className="edlc-arch-arrow-line">→</span>
              <span>Cloudflare Tunnel</span>
            </div>

            <div className="edlc-arch-col">
              <h3 className="edlc-arch-col-title">{el('archBackendLayer')}</h3>
              <div className="edlc-arch-node edlc-arch-node--primary">
                ASP.NET Core 8
                <span>REST API · WebSocket Presence · Health · Metrics</span>
              </div>
              <div className="edlc-arch-node">
                PostgreSQL 16
                <span>Docker containerizzato</span>
              </div>
            </div>

            <div className="edlc-arch-arrow">
              <span>SDK / API</span>
              <span className="edlc-arch-arrow-line">→</span>
              <span>{el('archExternalSub')}</span>
            </div>

            <div className="edlc-arch-col">
              <h3 className="edlc-arch-col-title">{el('archServicesLayer')}</h3>
              <div className="edlc-arch-node">
                Firebase Auth + FCM
                <span>Autenticazione · Push Notifications</span>
              </div>
              <div className="edlc-arch-node">
                Gmail SMTP
                <span>Email transazionali</span>
              </div>
              <div className="edlc-arch-node">
                GitHub API
                <span>Releases APK per OTA update</span>
              </div>
            </div>
          </div>
        </article>

        {/* MODULES GRID */}
        <section aria-label={el('modulesTitle')}>
          <div className="edlc-section-header">
            <h2 className="edlc-section-title">{el('modulesTitle')}</h2>
            <div className="edlc-legend">
              <span><span className="edlc-dot edlc-dot--done" /> {el('legendDone')}</span>
              <span><span className="edlc-dot edlc-dot--partial" /> {el('legendPartial')}</span>
              <span><span className="edlc-dot edlc-dot--pending" /> {el('legendPending')}</span>
            </div>
          </div>

          <div className="edlc-modules-grid">
            {modules.map((mod) => (
              <article key={mod.nameKey} className="edlc-module-card">
                <header className="edlc-module-header">
                  <span className="edlc-module-name">{el(mod.nameKey)}</span>
                  <span className="edlc-module-status-pair" aria-label="stato backend / mobile">
                    <StatusDot status={mod.backendStatus} labels={statusLabels} />
                    <StatusDot status={mod.mobileStatus} labels={statusLabels} />
                  </span>
                </header>
                <p className="edlc-module-desc">{el(mod.descKey)}</p>
                {mod.highlightKey ? (
                  <span className="edlc-module-highlight">{el(mod.highlightKey)}</span>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* IMPLEMENTATION STATUS */}
        <section className="project-notes-grid" aria-label="Stato implementazione">
          <article className="project-notes-panel">
            <h2>{el('backendStatusTitle')}</h2>
            <div className="edlc-status-list">
              {backendItems.map(({ key, status }) => (
                <div key={key} className="edlc-status-row">
                  <StatusDot status={status} labels={statusLabels} />
                  <span>{el(key)}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="project-notes-panel">
            <h2>{el('mobileStatusTitle')}</h2>
            <div className="edlc-status-list">
              {mobileItems.map(({ key, status }) => (
                <div key={key} className="edlc-status-row">
                  <StatusDot status={status} labels={statusLabels} />
                  <span>{el(key)}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* ENGINEERING DECISIONS */}
        <section className="project-notes-sections" aria-label="Decisioni ingegneristiche">
          {engSections.map((section) => (
            <article key={section.titleKey} className="project-notes-panel">
              <h2>{el(section.titleKey)}</h2>
              <ul>
                {section.lines.map((lineKey) => (
                  <li key={lineKey}>{el(lineKey)}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {/* STACK */}
        <section className="project-notes-grid" aria-label="Stack tecnologico">
          <article className="project-notes-panel">
            <h2>{el('stackBackendTitle')}</h2>
            <div className="project-notes-tags">
              {backendStack.map((item) => (<span key={item}>{item}</span>))}
            </div>
          </article>
          <article className="project-notes-panel">
            <h2>{el('stackMobileTitle')}</h2>
            <div className="project-notes-tags">
              {mobileStack.map((item) => (<span key={item}>{item}</span>))}
            </div>
          </article>
        </section>

        {/* ROADMAP + OUTCOMES */}
        <section className="project-notes-grid" aria-label="Roadmap e risultati">
          <article className="project-notes-panel">
            <h2>{el('roadmapTitle')}</h2>
            <div className="edlc-backlog">
              {backlogItems.map(({ key, priority }) => (
                <div key={key} className={`edlc-backlog-item edlc-backlog-item--${priority}`}>
                  <span className="edlc-backlog-dot" />
                  <span>{el(key)}</span>
                </div>
              ))}
            </div>
            <div className="edlc-backlog-legend">
              <span className="edlc-backlog-item--high">● {el('priorityHigh')}</span>
              <span className="edlc-backlog-item--medium">● {el('priorityMedium')}</span>
              <span className="edlc-backlog-item--low">● {el('priorityLow')}</span>
            </div>
          </article>

          <article className="project-notes-panel">
            <h2>{el('outcomesTitle')}</h2>
            <ul>
              {['oc1','oc2','oc3','oc4','oc5','oc6'].map((k) => (
                <li key={k}>{el(k)}</li>
              ))}
            </ul>

            <h2 style={{ marginTop: '20px' }}>{el('learnedTitle')}</h2>
            <ul>
              {['lrn1','lrn2','lrn3','lrn4'].map((k) => (
                <li key={k}>{el(k)}</li>
              ))}
            </ul>
          </article>
        </section>

      </section>

      {isLeaving ? <GlitchTransition /> : null}
    </main>
  )
}

export default EverydayLifeProjectPage
