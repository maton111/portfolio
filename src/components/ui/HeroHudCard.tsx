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
  level: string
  status: string
  stats: HeroStat[]
  quests: HeroQuest[]
  tags: string[]
}

function HeroHudCard({ name, role, level, status, stats, quests, tags }: HeroHudCardProps) {
  const { t } = useTranslation()

  return (
    <div className="hud-wrap">
      <article className="hud-card" aria-label={t('hud.personalDashboardAriaLabel')}>
        <div className="hud-head">
          <div>
            <h2>{name}</h2>
            <div className="hud-meta">
              <div>
                <span>{t('hud.classLabel')}</span>
                <strong>{role}</strong>
              </div>
              <i aria-hidden="true" />
              <div>
                <span>{t('hud.levelLabel')}</span>
                <strong>{level}</strong>
              </div>
            </div>
          </div>
          <div className="hud-status">
            <span>{t('hud.statusLabel')} </span>
            <p>
              <em aria-hidden="true" />
              {status}
            </p>
          </div>
        </div>

        <div className="hud-stats">
          {stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}/100</strong>
              </div>
              <div
                className="stat-bar"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={stat.value}
                aria-valuetext={`${stat.label} ${stat.value} percent`}
              >
                <span className={stat.colorClass} style={{ width: `${stat.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="hud-bottom">
          <div>
            <h3>{t('hud.questLog')}</h3>
            {quests.map((quest) => (
              <p key={quest.text}>
                <span className="material-symbols-outlined" aria-hidden="true">{quest.icon}</span>
                {quest.text}
              </p>
            ))}
          </div>
          <div className="hud-tags" aria-label={t('hud.tagsAriaLabel')}>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <small>X-044 // SYSTEM_STABLE</small>
      </article>
      <div className="hud-shadow" aria-hidden="true" />
    </div>
  )
}

export default HeroHudCard
