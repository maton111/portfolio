import { useTranslation } from 'react-i18next'
import { type ProjectCard, projectCards } from '../data/projectCards'
import { ElcCompositeVisual } from '../components/ui/ElcCompositeVisual'
import { useNavigate } from 'react-router-dom'
import { scrollToSection } from '../hooks/useSectionScroll'
import './ProjectsSection.css'

import teamsystemSvg from '../assets/teamsystem_enterprise_backend_hero.svg'
import legacySvg from '../assets/legacy_refactoring_hero.svg'
import opcmHeroBannerSvg from '../assets/opcm_hero_banner.svg'
import neuroscopeSvg from '../assets/neuroscope_svg_image.svg'

function ProjectVisual({ visual, backgroundImage }: { visual: ProjectCard['visual']; backgroundImage?: string | { default: string } }) {
  const { t } = useTranslation()

  if (visual === 'kernel') {
    return <ElcCompositeVisual />
  }

  const style = backgroundImage
    ? {
        backgroundImage: `url('${typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.default}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined

  const isPlaceholder = !backgroundImage

  return (
    <div className={`project-visual visual-${visual}${isPlaceholder ? ' visual-placeholder' : ''}`} style={style} aria-hidden="true">
      {isPlaceholder ? <span className="project-visual-placeholder-label">{t('projects.imageSlot')}</span> : null}
    </div>
  )
}

function ProjectsSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const openProjectNotes = (slug: string) => {
    navigate(`/projects/${slug}`)
  }

  const systemLogs = [
    { date: t('projects.log1Date'), title: t('projects.log1Title'), note: t('projects.log1Note'), tone: 'green' as const },
    { date: t('projects.log2Date'), title: t('projects.log2Title'), note: t('projects.log2Note'), tone: 'secondary' as const },
    { date: t('projects.log3Date'), title: t('projects.log3Title'), note: t('projects.log3Note'), tone: 'orange' as const },
    { date: t('projects.log4Date'), title: t('projects.log4Title'), note: t('projects.log4Note'), tone: 'muted' as const },
  ]

  const repoStatus = {
    efficiency: t('projects.repoEfficiency'),
    filledBars: 44,
    totalBars: 50,
  }

  // Map project slugs to translated content and images
  const translatedCards = projectCards.map((project) => {
    const titleMap: Record<string, string> = {
      'teamsystem-enterprise-backend': t('projects.proj1Title'),
      'legacy-refactoring-program': t('projects.proj2Title'),
      'neuro-scope': t('projects.proj3Title'),
      'opcm': t('projects.proj4Title'),
      'everyday-life-core': t('projects.proj5Title'),
    }
    const descMap: Record<string, string> = {
      'teamsystem-enterprise-backend': t('projects.proj1Desc'),
      'legacy-refactoring-program': t('projects.proj2Desc'),
      'neuro-scope': t('projects.proj3Desc'),
      'opcm': t('projects.proj4Desc'),
      'everyday-life-core': t('projects.proj5Desc'),
    }
    const imageMap: Record<string, string | undefined> = {
      'teamsystem-enterprise-backend': teamsystemSvg,
      'legacy-refactoring-program': legacySvg,
      'neuro-scope': neuroscopeSvg,
      'opcm': opcmHeroBannerSvg,
      'everyday-life-core': undefined,
    }
    return {
      ...project,
      title: titleMap[project.slug] ?? project.slug,
      description: descMap[project.slug] ?? '',
      backgroundImage: imageMap[project.slug],
    }
  })

  return (
    <section className="projects-page" id="projects" aria-labelledby="projects-title">
      <div className="projects-content">
        <header className="projects-header">
          <div>
            <span />
            <p>{t('projects.eyebrow')}</p>
          </div>
          <h2 id="projects-title">
            {t('projects.titleTop')}
            <br />
            {t('projects.titleBottom')}
          </h2>
          <p>{t('projects.intro')}</p>
        </header>

        <div className="projects-layout">
          <div>
            <div className="projects-grid-two">
              {translatedCards.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-icon" aria-hidden="true">
                    <span className="material-symbols-outlined">{project.icon}</span>
                  </div>
                  <div className="project-head">
                    <div>
                      <small>ID: {project.id}</small>
                      <h3>{project.title}</h3>
                    </div>
                    <span className={project.tone === 'orange' ? 'tone-orange' : ''}>
                      {t('projects.scopeLabel')}: {project.difficulty}
                    </span>
                  </div>

                  <ProjectVisual visual={project.visual} backgroundImage={project.backgroundImage} />
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <div className="project-actions-left">
                      {project.githubUrl ? (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <span className="material-symbols-outlined" aria-hidden="true">code</span>
                          GitHub
                        </a>
                      ) : (
                        <button type="button" className="repo-private-badge" onClick={() => scrollToSection('contact')}>
                          <span className="material-symbols-outlined" aria-hidden="true">lock</span>
                          {t('projects.repoPrivate')}
                        </button>
                      )}
                      {project.demoUrl ? (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <span className="material-symbols-outlined" aria-hidden="true">open_in_new</span>
                          {t('projects.liveDemo')}
                        </a>
                      ) : null}
                      {project.featured ? (
                        <span className="demo-wip-badge">
                          <span className="material-symbols-outlined" aria-hidden="true">construction</span>
                          {t('projects.liveDemoWip')}
                        </span>
                      ) : null}
                    </div>
                    <button className="primary" type="button" onClick={() => openProjectNotes(project.slug)}>
                      {project.featured ? t('projects.productRoadmap') : t('projects.projectNotes')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="projects-sidebar">
            <div>
              <div className="sidebar-head">
                <span className="material-symbols-outlined" aria-hidden="true">history_edu</span>
                <h4>{t('projects.careerTimeline')}</h4>
              </div>

              <div className="log-list">
                {systemLogs.map((log) => (
                  <article key={`${log.date}-${log.title}`} className={`log-item tone-${log.tone ?? 'green'}`}>
                    <small>{log.date}</small>
                    <p>{log.title}</p>
                    <span>{log.note}</span>
                  </article>
                ))}
              </div>

              <div className="repo-status">
                <div>
                  <small>Repo_Status</small>
                  <small>{repoStatus.efficiency}</small>
                </div>
                <div>
                  {Array.from({ length: repoStatus.totalBars }).map((_, index) => (
                    <span key={index} className={index < repoStatus.filledBars ? 'is-filled' : ''} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
