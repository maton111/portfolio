import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useReveal} from '../hooks/useReveal'
import './TimelineSection.css'

const timelineEntries = [

  {
    year: '2026',
    kind: 'MILESTONE',
    tone: 'green' as const,
    icon: 'verified',
    titleIT: '5 anni in .NET Enterprise',
    titleEN: '5 years in .NET Enterprise',
    orgIT:   'Checkpoint di carriera',
    orgEN:   'Career checkpoint',
    copyIT:  'Cinque anni di API di produzione. Focus consolidato su architettura pulita, ingegneria della qualità e modernizzazione di legacy senza downtime.',
    copyEN:  'Five years of production APIs in the rearview. Consolidated focus on clean architecture, quality engineering, and zero-downtime legacy modernization.',
    stack:   ['Clean Arch', 'Testing', 'DDD'],
  },
  {
    year: '2025',
    kind: 'LAUNCH',
    tone: 'orange' as const,
    icon: 'rocket_launch',
    titleIT: 'Everyday Life Core — MVP interno',
    titleEN: 'Everyday Life Core — internal MVP',
    orgIT:   'Progetto personale · Full stack',
    orgEN:   'Personal project · Full stack',
    copyIT:  'Prima release usabile del sistema full-stack personale per la gestione della vita quotidiana. React + Flutter sul frontend, .NET + PostgreSQL dietro, WebSocket per i pannelli live.',
    copyEN:  'First usable release of my personal full-stack life-management system. React + Flutter on the front, .NET + PostgreSQL behind, WebSocket for the live panels.',
    stack:   ['React', 'Flutter', '.NET', 'WebSocket'],
  },
  {
    year: '2024',
    kind: 'REFACTOR',
    tone: 'mint' as const,
    icon: 'build_circle',
    titleIT: 'Legacy Refactor — modulo business-critical',
    titleEN: 'Legacy Refactor — business-critical module',
    orgIT:   'Enterprise · .NET + Clean Architecture',
    orgEN:   'Enterprise · .NET + Clean Architecture',
    copyIT:  'Rifattorizzazione di un modulo legacy con anni di storia. Introdotti livelli netti, test di integrazione affidabili e rollout graduale. Zero downtime, nessuna regressione visibile all\'utente.',
    copyEN:  'Refactor of a legacy module with years of history. Introduced clean layers, reliable integration tests, and a gradual rollout. Zero downtime, no user-visible regressions.',
    stack:   ['.NET', 'Clean Arch', 'xUnit', 'EF Core'],
  },
  {
    year: '2023',
    kind: 'WORK',
    tone: 'green' as const,
    icon: 'business_center',
    titleIT: 'Backend Developer · TeamSystem Enterprise',
    titleEN: 'Backend Developer · TeamSystem Enterprise',
    orgIT:   'Bologna, IT · Full-time · In corso',
    orgEN:   'Bologna, IT · Full-time · Ongoing',
    copyIT:  'Manutenzione e rifattorizzazione di API business-critical in .NET. Architettura pulita, test affidabili, review serie. Modernizzo codice legacy senza rompere ciò che funziona.',
    copyEN:  'Maintaining and refactoring business-critical .NET APIs. Clean architecture, reliable tests, serious reviews. I modernize legacy code without breaking what already works.',
    stack:   ['.NET', 'ASP.NET Core', 'C#', 'PostgreSQL'],
  },
  {
    year: '2022',
    kind: 'PRODUCT',
    tone: 'orange' as const,
    icon: 'style',
    titleIT: 'One Piece Card Market',
    titleEN: 'One Piece Card Market',
    orgIT:   'Side project · ASP.NET Core 8 + PostgreSQL',
    orgEN:   'Side project · ASP.NET Core 8 + PostgreSQL',
    copyIT:  'Marketplace per carte OPCG. Backend EF Core, REST API modellate sul dominio reale dei collezionisti, client WinForms.',
    copyEN:  'Marketplace for OPCG cards. EF Core backend, REST APIs shaped around real collector workflows, WinForms client.',
    stack:   ['ASP.NET Core 8', 'EF Core', 'PostgreSQL'],
  },
  {
    year: '2021',
    kind: 'WORK',
    tone: 'green' as const,
    icon: 'work_history',
    titleIT: 'Backend Developer · Sincon',
    titleEN: 'Backend Developer · Sincon',
    orgIT:   'Primo ruolo full-time · .NET enterprise',
    orgEN:   'First full-time role · .NET enterprise',
    copyIT:  'Entrata nel mondo enterprise vero. Qui ho imparato cosa vuol dire mantenere codice di produzione, prendermi responsabilità su flussi business-critical e lavorare in team con review serie.',
    copyEN:  'Stepping into the real enterprise world. This is where I learned what production maintenance actually means, owned business-critical flows, and worked in teams with serious reviews.',
    stack:   ['.NET', 'C#', 'SQL Server', 'REST APIs'],
  },
  {
    year: '2020',
    kind: 'EDU',
    tone: 'mint' as const,
    icon: 'school',
    titleIT: 'Inizio percorso backend',
    titleEN: 'Backend journey begins',
    orgIT:   'Torino · Primo stack .NET',
    orgEN:   'Torino · First .NET stack',
    copyIT:  'Dai fondamentali C# alla prima API deployata. Scelgo il backend perché mi piacciono i sistemi che reggono, non solo gli schermi che brillano.',
    copyEN:  'From C# fundamentals to the first deployed API. I pick backend because I like systems that hold up, not just screens that shine.',
    stack:   ['C#', '.NET Framework', 'SQL Server'],
  },
]

type ToneName = 'green' | 'orange' | 'mint'
const TONE_VARS: Record<ToneName, string> = {
  green:  'var(--accent-green)',
  orange: 'var(--accent-orange)',
  mint:   'var(--accent-mint)',
}

function TimelineSection() {
  const { i18n } = useTranslation()
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useReveal<HTMLElement>()
  const isIT = i18n.language === 'it'

  return (
    <section id="timeline" ref={sectionRef} className="reveal-target tl-section">
      <p className="tl-eyebrow">
        {isIT ? 'Traccia neurale // Timeline' : 'Neural trace // Timeline'}
      </p>
      <h2 className="tl-h2">
        {isIT
          ? <>Percorso, <span className="accent-green">checkpoint per checkpoint</span>.</>
          : <>The path, <span className="accent-green">checkpoint by checkpoint</span>.</>}
      </h2>
      <p className="tl-sub">
        {isIT
          ? 'Ogni voce è un log: quando, dove, cosa ho spedito, e lo stack che l\'ha tenuto in piedi.'
          : "Each entry is a log: when, where, what I shipped, and the stack that held it up."}
      </p>

      <div className="tl-wrap">
        <div className="tl-line" aria-hidden="true">
          <div className="tl-line-pulse" />
        </div>

        {timelineEntries.map((e, i) => {
          const active = activeIdx === i
          const tone = TONE_VARS[e.tone]
          const isEven = i % 2 === 0

          return (
            <div
              key={i}
              className={`tl-row${isEven ? '' : ' tl-row--rev'}`}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <div className={`tl-year-side${isEven ? ' tl-year-side--right' : ' tl-year-side--left'}`}>
                <div className="tl-year" style={{ color: tone }}>{e.year}</div>
                <div className="tl-kind">{e.kind}</div>
              </div>

              <div className="tl-node-col">
                <div
                  className="tl-node"
                  style={{
                    borderColor: tone,
                    background: active ? tone : 'var(--bg-elevated)',
                    boxShadow: active ? `0 0 18px ${tone}, 0 0 2px ${tone}` : 'none',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18, color: active ? 'var(--on-accent)' : tone }}
                  >
                    {e.icon}
                  </span>
                </div>
              </div>

              <div className={`tl-card-side${isEven ? ' tl-card-side--left' : ' tl-card-side--right'}`}>
                <div
                  className="tl-card"
                  style={{
                    borderLeft:  isEven ? `3px solid ${tone}` : '1px solid color-mix(in oklab, var(--outline) 30%, transparent)',
                    borderRight: !isEven ? `3px solid ${tone}` : '1px solid color-mix(in oklab, var(--outline) 30%, transparent)',
                    transform: active ? 'translateY(-2px)' : 'none',
                    boxShadow: active ? 'var(--shadow-card-hover)' : 'none',
                  }}
                >
                  <div className="tl-card-header">
                    <span className="tl-card-id" style={{ color: tone }}>// {e.kind}_{String(i + 1).padStart(2, '0')}</span>
                    <span className="tl-card-entry">ENTRY_{e.year}</span>
                  </div>
                  <h3 className="tl-card-title">{isIT ? e.titleIT : e.titleEN}</h3>
                  <div className="tl-card-org" style={{ color: 'var(--accent-mint)' }}>{isIT ? e.orgIT : e.orgEN}</div>
                  <p className="tl-card-copy">{isIT ? e.copyIT : e.copyEN}</p>
                  <div className="tl-stack">
                    {e.stack.map(s => <span key={s} className="tl-chip">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TimelineSection
