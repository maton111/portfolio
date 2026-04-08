import {useEffect, useMemo, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import GlitchTransition from '../components/GlitchTransition'
import OpcmProfileCard from '../components/OpcmProfileCard'
import {getProjectNotesBySlug, projectCards} from '../data/projectsContent'
import opcmHubImage from '../assets/opcm_hub.png'
import './ProjectNotesPage.css'

type ProjectNotesPageProps = {
  forcedSlug?: string
}

function resolveBackgroundImage(backgroundImage?: string | { default: string }) {
  if (!backgroundImage) {
    return undefined
  }

  return typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.default
}

function ProjectNotesPage({ forcedSlug }: ProjectNotesPageProps) {
  const { slug: routeSlug } = useParams()
  const slug = forcedSlug ?? routeSlug
  const navigate = useNavigate()
  const [isLeaving, setIsLeaving] = useState(false)

  const projectCard = useMemo(() => projectCards.find((card) => card.slug === slug), [slug])
  const notes = useMemo(() => getProjectNotesBySlug(slug), [slug])

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
    window.setTimeout(() => {
      navigate(targetPath)
    }, 180)
  }

  if (!projectCard || !notes) {
    return (
      <main className="project-notes-page">
        <section className="project-notes-shell project-notes-not-found">
          <small>Notes_Not_Found</small>
          <h1>Project notes non disponibili</h1>
          <p>Non ho trovato un progetto associato a questo slug. Torna alla sezione progetti per continuare la navigazione.</p>
          <button type="button" onClick={() => navigateWithGlitch('/#projects')}>
            Torna ai Projects
          </button>
        </section>
        {isLeaving ? <GlitchTransition /> : null}
      </main>
    )
  }

  const heroImage = projectCard.slug === 'opcm' ? opcmHubImage : resolveBackgroundImage(projectCard.backgroundImage)

  return (
    <main className="project-notes-page" aria-labelledby="project-notes-title">
      <section className="project-notes-shell">
        <header className="project-notes-hero">
          <div className="project-notes-hero-copy">
            <small>
              {projectCard.id} // {projectCard.difficulty}
            </small>
            <h1 id="project-notes-title">{projectCard.title}</h1>
            <p>{notes.headline}</p>
            <div className="project-notes-hero-meta">
              <span>Role: {notes.role}</span>
              <span>Stack focus: {notes.stack.slice(0, 3).join(' · ')}</span>
            </div>
            <div className="project-notes-actions">
              <button type="button" onClick={() => navigateWithGlitch('/#projects')}>
                Back to Projects
              </button>
              <button className="primary" type="button" onClick={() => navigateWithGlitch('/#contact')}>
                Contact
              </button>
            </div>
          </div>
          <div
            className="project-notes-hero-visual"
            style={
              heroImage
                ? {
                    backgroundImage: `url('${heroImage}')`,
                    ...(projectCard.slug === 'opcm'
                        ? { backgroundSize: 'contain',backgroundRepeat: 'no-repeat', }
                        : {}),                  }
                : undefined
            }
          />
        </header>

        {projectCard.slug === 'opcm' ? (
          <section className="project-notes-grid project-notes-grid-top" aria-label="Project notes details">
            <div className="project-notes-top-left">
              <article className="project-notes-panel">
                <h2>Context</h2>
                <p>{notes.context}</p>
              </article>

              <article className="project-notes-panel">
                <h2>Challenge</h2>
                <p>{notes.challenge}</p>
              </article>

              <article className="project-notes-panel">
                <h2>Timeline</h2>
                <ul>
                  {notes.timeline.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="project-notes-panel">
                <h2>Stack</h2>
                <div className="project-notes-tags">
                  {notes.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
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
              <h2>Context</h2>
              <p>{notes.context}</p>
            </article>

            <article className="project-notes-panel">
              <h2>Challenge</h2>
              <p>{notes.challenge}</p>
            </article>

            <article className="project-notes-panel">
              <h2>Timeline</h2>
              <ul>
                {notes.timeline.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="project-notes-panel">
              <h2>Stack</h2>
              <div className="project-notes-tags">
                {notes.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </section>
        )}

        <section className="project-notes-sections" aria-label="Engineering notes">
          {notes.sections.map((section) => (
            <article key={section.title} className="project-notes-panel">
              <h2>{section.title}</h2>
              <ul>
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="project-notes-grid" aria-label="Outcomes and next steps">
          <article className="project-notes-panel">
            <h2>Outcomes</h2>
            <ul>
              {notes.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="project-notes-panel">
            <h2>What I would improve next</h2>
            <ul>
              {notes.nextSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </section>

      {isLeaving ? <GlitchTransition /> : null}
    </main>
  )
}

export default ProjectNotesPage

