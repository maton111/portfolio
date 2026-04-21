import { useEffect, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { skillsModules } from '../data/skillsContent'
import { fetchRepoInfo } from '../utils/api'
import { useReveal } from '../hooks/useReveal'
import './SkillsSection.css'

function SkillsSection() {
  const { t } = useTranslation()
  const [activeModuleId, setActiveModuleId] = useState('BE-2026')
  const [lastUpdate, setLastUpdate] = useState(t('skills.loading'))
  const headerRevealRef = useReveal<HTMLElement>()
  const sectionRevealRef = useReveal<HTMLDivElement>(0.05)

  useEffect(() => {
    let isMounted = true

    const loadRepoInfo = async () => {
      try {
        const repoInfo = await fetchRepoInfo()
        if (isMounted) {
          setLastUpdate(repoInfo.lastCommitDate || t('skills.unavailable'))
        }
      } catch {
        if (isMounted) {
          setLastUpdate(t('skills.unavailable'))
        }
      }
    }

    void loadRepoInfo()
    return () => {
      isMounted = false
    }
  }, [t])

  const activeModule = skillsModules.find((m) => m.moduleId === activeModuleId) ?? skillsModules[0]!

  return (
    <section className="skills-page" id="skills" aria-labelledby="skills-title">
      <div className="skills-content">
        <header ref={headerRevealRef} className="skills-header reveal-target">
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">terminal</span>
            <p>{t('skills.eyebrow')}</p>
          </div>
          <h2 id="skills-title" className="reveal-heading">
            {t('skills.titleStart')} <span>{t('skills.titleAccent')}</span> {t('skills.titleEnd')}
          </h2>
        </header>

        <div ref={sectionRevealRef} className="skills-tabbed-layout reveal-target reveal-delay-1">
          <div className="skills-module-list" role="tablist" aria-label={t('skills.eyebrow')}>
            {skillsModules.map((module) => {
              const isActive = module.moduleId === activeModuleId
              const tone = module.borderTone ?? 'green'
              return (
                <button
                  key={module.moduleId}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`skills-module-btn tone-${tone}${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveModuleId(module.moduleId)}
                >
                  <div>
                    <span className="skills-module-id">{module.moduleId}</span>
                    <span className="skills-module-title">{t(module.titleKey)}</span>
                  </div>
                  <span className={`skills-module-status tone-${module.statusTone ?? 'green'}`}>
                    {t(module.statusKey)}
                  </span>
                </button>
              )
            })}
          </div>

          <div
            key={activeModule.moduleId}
            className={`skills-detail-panel tone-${activeModule.borderTone ?? 'green'}`}
            role="tabpanel"
          >
            <span className="skills-corner-tr" aria-hidden="true" />
            <span className="skills-corner-bl" aria-hidden="true" />

            <header className="skills-detail-header">
              <div>
                <span className="skills-detail-eyebrow">Module {activeModule.moduleId}</span>
                <h3>{t(activeModule.titleKey)}</h3>
              </div>
              <div className="skills-heartbeat">
                <span className="material-symbols-outlined" aria-hidden="true">monitor_heart</span>
                <span>Uptime 99.7%</span>
              </div>
            </header>

            <div className="skills-metrics-grid">
              {activeModule.metrics.map((metric, i) => (
                <div key={metric.label} className="skills-metric-row">
                  <div className="skills-metric-label-row">
                    <span>{metric.label}</span>
                    <span className="skills-metric-value">{metric.value}</span>
                  </div>
                  <div className="skills-metric-bar-track">
                    <span
                      className="skills-metric-bar-fill"
                      style={{ width: `${metric.value}%`, animationDelay: `${i * 70}ms` } as CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="skills-tags-row">
              {activeModule.tags.map((tag) => (
                <span key={tag.label} className="skills-tag-chip">{tag.label}</span>
              ))}
            </div>
          </div>
        </div>

        <section className="skills-bottom" aria-label={t('skills.neuralLinkAriaLabel')}>
          <div>
            <div>
              <span className="material-symbols-outlined" aria-hidden="true">psychology</span>
            </div>
            <div>
              <p>{t('skills.bottomTitle')}</p>
              <small>{t('skills.bottomDesc')}</small>
            </div>
          </div>
          <div>
            <div>
              <p>{t('skills.lastUpdate')}</p>
              <strong>{lastUpdate}</strong>
            </div>
            <i aria-hidden="true" />
            <div>
              <p>{t('skills.globalUptime')}</p>
              <strong>{t('skills.uptime')}</strong>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default SkillsSection
