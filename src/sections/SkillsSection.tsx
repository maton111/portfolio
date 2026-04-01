import { skillsBottomPanel, skillsHeader, skillsModules, type SkillMetric } from '../data/skillsContent'
import './SkillsSection.css'

const SEGMENTS = 10

function SegmentedBar({ label, value, tone = 'green' }: SkillMetric) {
  const activeSegments = Math.max(1, Math.round((value / 100) * SEGMENTS))

  return (
    <div
      className="skills-segmented"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuetext={`${label} ${value} percent`}
    >
      {Array.from({ length: SEGMENTS }).map((_, index) => (
        <span key={`${value}-${index}`} className={index < activeSegments ? `is-${tone}` : ''} />
      ))}
    </div>
  )
}

function SkillsSection() {
  return (
    <section className="skills-page" id="skills" aria-labelledby="skills-title">
      <div className="skills-content">
        <header className="skills-header">
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">
              terminal
            </span>
            <p>{skillsHeader.eyebrow}</p>
          </div>
          <h2 id="skills-title">
            {skillsHeader.titleStart} <span>{skillsHeader.titleAccent}</span> {skillsHeader.titleEnd}
          </h2>
        </header>

        <div className="skills-grid">
          {skillsModules.map((module) => (
            <article
              key={module.moduleId}
              className={`skills-card col-${module.columns} tone-${module.borderTone ?? 'green'}`}
            >
              {module.icon ? (
                <div className="skills-card-icon" aria-hidden="true">
                  <span className="material-symbols-outlined">{module.icon}</span>
                </div>
              ) : null}

              <div className="skills-card-head">
                <div>
                  <h3>{module.title}</h3>
                  <p>Module_ID: {module.moduleId}</p>
                </div>
                <span className={`skills-status tone-${module.statusTone ?? 'green'}`}>{module.status}</span>
              </div>

              <div className="skills-metrics">
                {module.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div>
                      <span>{metric.label}</span>
                      <strong className={metric.tone === 'orange' ? 'tone-orange' : ''}>{metric.value}%</strong>
                    </div>
                    <SegmentedBar label={metric.label} value={metric.value} tone={metric.tone} />
                  </div>
                ))}
              </div>

              <div className="skills-tags">
                {module.tags.map((tag) => (
                  <span key={tag} className={module.borderTone === 'orange' ? 'tone-orange' : ''}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="skills-bottom" aria-label="Neural link panel">
          <div>
            <div>
              <span className="material-symbols-outlined" aria-hidden="true">
                psychology
              </span>
            </div>
            <div>
              <p>{skillsBottomPanel.title}</p>
              <small>{skillsBottomPanel.description}</small>
            </div>
          </div>
          <div>
            <div>
              <p>Last Update</p>
              <strong>{skillsBottomPanel.lastUpdate}</strong>
            </div>
            <i aria-hidden="true" />
            <div>
              <p>Global Uptime</p>
              <strong>{skillsBottomPanel.uptime}</strong>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default SkillsSection

