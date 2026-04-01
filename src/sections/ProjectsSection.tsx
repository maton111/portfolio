import {
  projectCards,
  projectsHeader,
  repoStatus,
  systemLogs,
  type ProjectCard,
} from '../data/projectsContent'
import './ProjectsSection.css'

function ProjectVisual({ visual }: { visual: ProjectCard['visual'] }) {
  return <div className={`project-visual visual-${visual}`} aria-hidden="true" />
}

function ProjectsSection() {
  const standardCards = projectCards.filter((card) => !card.featured)
  const featuredCard = projectCards.find((card) => card.featured)

  return (
    <section className="projects-page" id="projects" aria-labelledby="projects-title">
      <div className="projects-content">
        <header className="projects-header">
          <div>
            <span />
            <p>{projectsHeader.eyebrow}</p>
          </div>
          <h2 id="projects-title">
            {projectsHeader.titleTop}
            <br />
            {projectsHeader.titleBottom}
          </h2>
          <p>{projectsHeader.intro}</p>
        </header>

        <div className="projects-layout">
          <div>
            <div className="projects-grid-two">
              {standardCards.map((project) => (
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
                      Quest: {project.difficulty}
                    </span>
                  </div>

                  <ProjectVisual visual={project.visual} />
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button type="button">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        code
                      </span>
                      View Source
                    </button>
                    <button className="primary" type="button">
                      Launch_Module
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {featuredCard ? (
              <article className="project-card featured-card">
                <div className="featured-copy">
                  <div className="project-head">
                    <div>
                      <small>ID: {featuredCard.id}</small>
                      <h3>{featuredCard.title}</h3>
                    </div>
                    <span className="tone-orange">Quest: {featuredCard.difficulty}</span>
                  </div>

                  <p>{featuredCard.description}</p>

                  <div className="project-tags">
                    {featuredCard.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button className="primary" type="button">
                      Initiate Deployment
                    </button>
                    <button type="button">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        description
                      </span>
                      Whitepaper.pdf
                    </button>
                  </div>
                </div>
                <ProjectVisual visual={featuredCard.visual} />
              </article>
            ) : null}
          </div>

          <aside className="projects-sidebar">
            <div>
              <div className="sidebar-head">
                <span className="material-symbols-outlined" aria-hidden="true">
                  history_edu
                </span>
                <h4>System_Log</h4>
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

