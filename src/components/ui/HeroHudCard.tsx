import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type HeroStat = {
  label: string
  value: number
  colorClass: string
}

type HeroQuest = {
  icon: string
  text: string
}

type HeroHudCardProps = {
  name: string
  role: string
  level: number
  stats: HeroStat[]
  quests: HeroQuest[]
  tags: string[]
}

function HeroHudCard({ name, role, level, stats, quests, tags }: HeroHudCardProps) {
  const { t } = useTranslation()
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setFilled(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <article className="hud-card" aria-label={t('hud.personalDashboardAriaLabel')}>
      <span className="hud-corner hud-corner-tr" aria-hidden="true" />
      <span className="hud-corner hud-corner-bl" aria-hidden="true" />

      <header className="hud-head">
        <div className="hud-head-info">
          <span className="hud-eyebrow">Character Sheet // v1</span>
          <h2 className="hud-name">{name}</h2>
          <span className="hud-class">Class: {role}</span>
        </div>
        <div className="hud-lvl-badge">
          <span className="hud-lvl-label">LVL</span>
          <span className="hud-lvl-number">{level}</span>
          <span className="hud-lvl-sub">Leveling up</span>
        </div>
      </header>

      <div className="hud-stats">
        {stats.map((stat, i) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-row">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}/100</span>
            </div>
            <div
              className="stat-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={stat.value}
              aria-valuetext={`${stat.label} ${stat.value} percent`}
            >
              <span
                className={stat.colorClass}
                style={{
                  width: filled ? `${stat.value}%` : '0%',
                  transition: `width 900ms var(--ease-out-emphasized) ${i * 110}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="hud-quests">
        <span className="hud-quest-eyebrow">{t('hud.questLog')}</span>
        {quests.map((quest) => (
          <div className="hud-quest-item" key={quest.text}>
            <span className="material-symbols-outlined" aria-hidden="true">{quest.icon}</span>
            <span>{quest.text}</span>
          </div>
        ))}
      </div>

      <div className="hud-tags" aria-label={t('hud.tagsAriaLabel')}>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  )
}

export default HeroHudCard