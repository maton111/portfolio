import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GlitchTransition from '../components/overlays/GlitchTransition'
import OpcmProfileCard from '../components/ui/OpcmProfileCard'
import { projectCards } from '../data/projectCards'
import opcmHubImage from '../assets/opcm_hub.png'
import './ProjectNotesPage.css'

function resolveBackgroundImage(backgroundImage?: string | { default: string }) {
  if (!backgroundImage) return undefined
  return typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.default
}

// Build project notes from translation keys
function useProjectNotes(slug: string | undefined) {
  const { t } = useTranslation()

  if (!slug) return null

  const prefixMap: Record<string, string> = {
    'teamsystem-enterprise-backend': 'ts',
    'legacy-refactoring-program': 'leg',
    'opcm': 'opcm',
    'neuro-scope': 'ns',
  }

  const prefix = prefixMap[slug]
  if (!prefix) return null

  const p = `projectNotes.${prefix}_`

  const sectionMap: Record<string, { s1: number; s2?: number; s3?: number; s4?: number }> = {
    ts: { s1: 3, s2: 3, s3: 3 },
    leg: { s1: 3, s2: 3, s3: 3 },
    opcm: { s1: 3, s2: 3, s3: 3 },
    ns: { s1: 4, s2: 3, s3: 4, s4: 4 },
  }

  const sectionCounts = sectionMap[prefix]
  const sections = Object.entries(sectionCounts).map(([sKey, count]) => ({
    title: t(`${p}${sKey}title`),
    points: Array.from({ length: count }, (_, i) => t(`${p}${sKey}p${i + 1}`)),
  }))

  const tlKeys = ['tl1', 'tl2', 'tl3', 'tl4', 'tl5'].filter((k) => {
    try { const v = t(`${p}${k}`, { defaultValue: '' }); return !!v } catch { return false }
  })

  const outcomeKeys = ['o1', 'o2', 'o3', 'o4', 'o5', 'o6'].filter((k) => {
    try { const v = t(`${p}${k}`, { defaultValue: '' }); return !!v } catch { return false }
  })

  const nextKeys = ['n1', 'n2', 'n3', 'n4'].filter((k) => {
    try { const v = t(`${p}${k}`, { defaultValue: '' }); return !!v } catch { return false }
  })

  return {
    slug,
    headline: t(`${p}headline`),
    role: slug === 'opcm' ? 'Full Stack Developer (Backend-first)' : slug === 'neuro-scope' ? 'Solo Developer (Frontend)' : 'Backend Developer',
    context: t(`${p}context`),
    challenge: t(`${p}challenge`),
    timeline: tlKeys.map((k) => t(`${p}${k}`)),
    stack: {
      'teamsystem-enterprise-backend': ['.NET 8', 'C#', 'REST API', 'SQL Server', 'xUnit/NUnit', 'CI pipeline'],
      'legacy-refactoring-program': ['C#', '.NET', 'Clean Architecture', 'xUnit', 'NUnit', 'SQL Server', 'CI quality checks'],
      'opcm': ['ASP.NET Core 8', 'Windows Forms', 'PostgreSQL', 'EF Core', 'AutoMapper', 'Swagger', 'N-Tier Architecture'],
      'neuro-scope': ['Next.js 15', 'TypeScript (strict)', 'Tailwind CSS v4', 'shadcn/ui', 'Framer Motion', 'Recharts', 'MediaPipe Tasks Vision', 'WebAssembly', 'Vercel'],
    }[slug] ?? [],
    sections,
    outcomes: outcomeKeys.map((k) => t(`${p}${k}`)),
    nextSteps: nextKeys.map((k) => t(`${p}${k}`)),
  }
}

function ProjectNotesPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLeaving, setIsLeaving] = useState(false)

  const projectCard = useMemo(() => projectCards.find((card) => card.slug === slug), [slug])
  const notes = useProjectNotes(slug)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  const navigateWithGlitch = (targetPath: string) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      navigate(targetPath)
      return
    }

    setIsLeaving(true)
    window.setTimeout(() => { navigate(targetPath) }, 180)
  }

  if (!projectCard || !notes) {
    return (
      <main className="project-notes-page terminal-bg">
        <section className="project-notes-shell project-notes-not-found">
          <small>Notes_Not_Found</small>
          <h1>{t('projectNotes.notFound')}</h1>
          <p>{t('projectNotes.notFoundDesc')}</p>
          <button type="button" onClick={() => navigateWithGlitch('/#projects')}>
            {t('projectNotes.backToProjects')}
          </button>
        </section>
        {isLeaving ? <GlitchTransition /> : null}
      </main>
    )
  }

  const heroImage = projectCard.slug === 'opcm' ? opcmHubImage : resolveBackgroundImage(projectCard.backgroundImage)

  const titleMap: Record<string, string> = {
    'teamsystem-enterprise-backend': t('projects.proj1Title'),
    'legacy-refactoring-program': t('projects.proj2Title'),
    'neuro-scope': t('projects.proj3Title'),
    'opcm': t('projects.proj4Title'),
    'everyday-life-core': t('projects.proj5Title'),
  }
  const displayTitle = titleMap[projectCard.slug] ?? projectCard.title

  return (
    <main className="project-notes-page terminal-bg" aria-labelledby="project-notes-title">
      <section className="project-notes-shell">
        <header className="project-notes-hero">
          <div className="project-notes-hero-copy">
            <small>
              {projectCard.id} // {projectCard.difficulty}
            </small>
            <h1 id="project-notes-title">{displayTitle}</h1>
            <p>{notes.headline}</p>
            <div className="project-notes-hero-meta">
              <span>{t('projectNotes.roleLabel')} {notes.role}</span>
              <span>{t('projectNotes.stackFocusLabel')} {notes.stack.slice(0, 3).join(' · ')}</span>
            </div>
            <div className="project-notes-actions">
              <button type="button" onClick={() => navigateWithGlitch('/#projects')}>
                {t('projectNotes.backBtn')}
              </button>
              {projectCard.githubUrl ? (
                <a href={projectCard.githubUrl} target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined" aria-hidden="true">code</span>
                  {t('projectNotes.github')}
                </a>
              ) : null}
              {projectCard.demoUrl ? (
                <a className="primary" href={projectCard.demoUrl} target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined" aria-hidden="true">open_in_new</span>
                  {t('projectNotes.liveDemo')}
                </a>
              ) : null}
              {!projectCard.demoUrl ? (
                <button className="primary" type="button" onClick={() => navigateWithGlitch('/#contact')}>
                  {t('projectNotes.contact')}
                </button>
              ) : null}
            </div>
          </div>
          <div
            className="project-notes-hero-visual"
            style={
              heroImage
                ? {
                    backgroundImage: `url('${heroImage}')`,
                    ...(projectCard.slug === 'opcm'
                      ? { backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }
                      : {}),
                  }
                : undefined
            }
          />
        </header>

        {projectCard.slug === 'opcm' ? (
          <section className="project-notes-grid project-notes-grid-top" aria-label="Project notes details">
            <div className="project-notes-top-left">
              <article className="project-notes-panel">
                <h2>{t('projectNotes.context')}</h2>
                <p>{notes.context}</p>
              </article>
              <article className="project-notes-panel">
                <h2>{t('projectNotes.challenge')}</h2>
                <p>{notes.challenge}</p>
              </article>
              <article className="project-notes-panel">
                <h2>{t('projectNotes.timeline')}</h2>
                <ul>
                  {notes.timeline.map((item) => (<li key={item}>{item}</li>))}
                </ul>
              </article>
              <article className="project-notes-panel">
                <h2>{t('projectNotes.stack')}</h2>
                <div className="project-notes-tags">
                  {notes.stack.map((item) => (<span key={item}>{item}</span>))}
                </div>
              </article>
            </div>
            <div className="project-notes-top-right-placeholder">
              <OpcmProfileCard name="Mattia Archinà" title="Full Stack Developer" handle="maton11" status="Available" />
            </div>
          </section>
        ) : (
          <section className="project-notes-grid" aria-label="Project notes details">
            <article className="project-notes-panel">
              <h2>{t('projectNotes.context')}</h2>
              <p>{notes.context}</p>
            </article>
            <article className="project-notes-panel">
              <h2>{t('projectNotes.challenge')}</h2>
              <p>{notes.challenge}</p>
            </article>
            <article className="project-notes-panel">
              <h2>{t('projectNotes.timeline')}</h2>
              <ul>
                {notes.timeline.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </article>
            <article className="project-notes-panel">
              <h2>{t('projectNotes.stack')}</h2>
              <div className="project-notes-tags">
                {notes.stack.map((item) => (<span key={item}>{item}</span>))}
              </div>
            </article>
          </section>
        )}

        <section className="project-notes-sections" aria-label="Engineering notes">
          {notes.sections.map((section) => (
            <article key={section.title} className="project-notes-panel">
              <h2>{section.title}</h2>
              <ul>
                {section.points.map((point) => (<li key={point}>{point}</li>))}
              </ul>
            </article>
          ))}
        </section>

        <section className="project-notes-grid" aria-label="Outcomes and next steps">
          <article className="project-notes-panel">
            <h2>{t('projectNotes.outcomes')}</h2>
            <ul>
              {notes.outcomes.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </article>
          <article className="project-notes-panel">
            <h2>{t('projectNotes.nextSteps')}</h2>
            <ul>
              {notes.nextSteps.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </article>
        </section>
      </section>

      {isLeaving ? <GlitchTransition /> : null}
    </main>
  )
}

export default ProjectNotesPage
