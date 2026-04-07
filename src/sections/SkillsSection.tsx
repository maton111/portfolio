import {useEffect, useState} from 'react'
import {type SkillMetric, type SkillModule, skillsBottomPanel, skillsHeader, skillsModules} from '../data/skillsContent'
import './SkillsSection.css'

const SEGMENTS = 20

function SegmentedBar({ label, value, tone = 'green' }: SkillMetric) {
  const safeValue = Math.min(100, Math.max(0, value))
  const activeSegments = Math.round((safeValue / 100) * SEGMENTS)

  return (
    <div
      className="skills-segmented"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(safeValue)}
      aria-valuetext={`${label} ${Math.round(safeValue)} percent`}
    >
      {Array.from({ length: SEGMENTS }).map((_, index) => (
        <span key={`${value}-${index}`} className={index < activeSegments ? `is-${tone}` : 'is-off'} />
      ))}
    </div>
  )
}

type SkillChip = {
  id: string
  label: string
  value: number
}

function buildSkillChips(module: SkillModule): SkillChip[] {
  return [
    ...module.metrics.map((metric) => ({ id: `metric-${metric.label}`, label: metric.label, value: metric.value })),
    ...module.tags.map((tag) => ({ id: `tag-${tag.label}`, label: tag.label, value: tag.value })),
  ]
}

function getSkillTone(module: SkillModule, value: number): 'green' | 'orange' {
  if (module.title === 'AI-ASSISTED FULL STACK') {
    return 'orange'
  }

  return value < 70 ? 'orange' : 'green'
}

function getAnimationDurationMs(targetValue: number): number {
  const safeTarget = Math.min(100, Math.max(0, targetValue))
  const minDuration = 260
  const maxDuration = 700

  return Math.round(minDuration + ((maxDuration - minDuration) * safeTarget) / 100)
}

function SkillActiveMetric({ label, targetValue, tone }: { label: string; targetValue: number; tone: 'green' | 'orange' }) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const safeTarget = Math.min(100, Math.max(0, targetValue))

    if (reducedMotion) {
      setAnimatedValue(safeTarget)
      return
    }

    const durationMs = getAnimationDurationMs(safeTarget)
    const animationStart = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      const elapsed = now - animationStart
      const progress = Math.min(1, elapsed / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedValue(safeTarget * eased)

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick)
      } else {
        setAnimatedValue(safeTarget)
      }
    }

    setAnimatedValue(0)
    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [label, targetValue])

  return (
    <div className="skills-active-metric">
      <div>
        <span>{label}</span>
        <strong className={tone === 'orange' ? 'tone-orange' : ''}>{Math.round(animatedValue)}%</strong>
      </div>
      <SegmentedBar label={label} value={animatedValue} tone={tone} />
    </div>
  )
}

function SkillsSection() {
  const [lockedSkillByModule, setLockedSkillByModule] = useState<Record<string, string>>({})
  const [hoveredSkillByModule, setHoveredSkillByModule] = useState<Record<string, string | undefined>>({})

  const handleSkillHover = (moduleId: string, skillId: string) => {
    setHoveredSkillByModule((prev) => ({ ...prev, [moduleId]: skillId }))
  }

  const handleSkillLeave = (moduleId: string) => {
    // Opzione A: senza lock si torna sempre alla skill iniziale della card.
    setHoveredSkillByModule((prev) => ({ ...prev, [moduleId]: undefined }))
  }

  const handleSkillSelect = (moduleId: string, skillId: string) => {
    setLockedSkillByModule((prev) => ({ ...prev, [moduleId]: skillId }))
    setHoveredSkillByModule((prev) => ({ ...prev, [moduleId]: undefined }))
  }

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
          {skillsModules.map((module) => {
            const chips = buildSkillChips(module)
            const defaultSkill = chips[0]

            if (!defaultSkill) {
              return null
            }

            const lockedSkillId = lockedSkillByModule[module.moduleId]
            const hoveredSkillId = hoveredSkillByModule[module.moduleId]
            const activeSkillId = hoveredSkillId ?? lockedSkillId ?? defaultSkill.id
            const activeSkill = chips.find((chip) => chip.id === activeSkillId) ?? defaultSkill
            const tone = getSkillTone(module, activeSkill.value)

            return (
            <article
              key={module.moduleId}
              className={`skills-card col-${module.columns} tone-${module.borderTone ?? 'green'}`}
              onMouseLeave={() => handleSkillLeave(module.moduleId)}
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
                <SkillActiveMetric
                  key={`${module.moduleId}-${activeSkill.id}`}
                  label={activeSkill.label}
                  targetValue={activeSkill.value}
                  tone={tone}
                />
              </div>

              <div className="skills-tags">
                {chips.map((chip) => {
                  const chipTone = getSkillTone(module, chip.value)
                  const isActive = chip.id === activeSkill.id
                  const isLockedChip = chip.id === lockedSkillId

                  return (
                  <button
                    key={chip.id}
                    type="button"
                    className={[
                      'skills-chip',
                      chipTone === 'orange' ? 'tone-orange' : '',
                      isActive ? 'is-active' : '',
                      isLockedChip ? 'is-locked' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-pressed={isLockedChip}
                    onMouseEnter={() => handleSkillHover(module.moduleId, chip.id)}
                    onFocus={() => handleSkillHover(module.moduleId, chip.id)}
                    onClick={() => handleSkillSelect(module.moduleId, chip.id)}
                  >
                    <span>{chip.label}</span>
                  </button>
                  )
                })}
              </div>
            </article>
            )
          })}
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

