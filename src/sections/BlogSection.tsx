import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import './BlogSection.css'

const blogPosts = [
  {
    id: 'LOG_042',
    date: '2026.03.14',
    readEN: '8 min', readIT: '8 min',
    tagEN: 'ARCHITECTURE', tagIT: 'ARCHITETTURA',
    tone: 'green' as const,
    icon: 'architecture',
    featured: true,
    titleEN: 'Modernizing legacy code without breaking anyone',
    titleIT: 'Modernizzare codice legacy senza rompere nessuno',
    excerptEN: 'A practical framework for knowing where to cut and where to keep. Every 2000-line class has a story — throwing it away without listening costs double.',
    excerptIT: 'Un framework pratico per capire dove tagliare e dove tenere. Perché ogni classe di 2000 righe ha una storia, e buttarla via senza ascoltarla costa il doppio.',
  },
  {
    id: 'LOG_041',
    date: '2026.02.28',
    readEN: '5 min', readIT: '5 min',
    tagEN: 'DEVLOG', tagIT: 'DEVLOG',
    tone: 'mint' as const,
    icon: 'terminal',
    titleEN: 'Everyday Life Core — week 14',
    titleIT: 'Everyday Life Core — settimana 14',
    excerptEN: 'Live dashboard over WebSocket and reconnection logic that doesn\'t explode when the network throws a tantrum.',
    excerptIT: 'Dashboard live tramite WebSocket e reconnection logic che non esplode quando la rete fa i capricci.',
  },
  {
    id: 'LOG_040',
    date: '2026.02.11',
    readEN: '4 min', readIT: '4 min',
    tagEN: 'TESTING', tagIT: 'TESTING',
    tone: 'orange' as const,
    icon: 'science',
    titleEN: 'Integration tests that actually let you sleep',
    titleIT: 'Test di integrazione che fanno davvero dormire bene',
    excerptEN: 'When a test passes, it should mean it works — not just that it didn\'t crash. Subtle differences, concrete consequences.',
    excerptIT: 'Quando un test passa, deve voler dire che funziona — non solo che non crasha. Differenze sottili, rotture concrete.',
  },
  {
    id: 'LOG_039',
    date: '2026.01.23',
    readEN: '6 min', readIT: '6 min',
    tagEN: 'FULL STACK', tagIT: 'FULL STACK',
    tone: 'green' as const,
    icon: 'integration_instructions',
    titleEN: 'From pure backend to full stack in 18 months',
    titleIT: 'Da backend puro a full stack in 18 mesi',
    excerptEN: 'What I learned going from APIs only to React + Flutter. The easy parts, the parts that hurt, the parts that actually rewire how you think.',
    excerptIT: 'Cosa ho imparato passando da solo API a React + Flutter. Le parti facili, le parti che fanno male, le parti che cambiano davvero il modo di pensare.',
  },
]

type ToneName = 'green' | 'orange' | 'mint'
const TONE_VAR: Record<ToneName, string> = {
  green:  'var(--accent-green)',
  orange: 'var(--accent-orange)',
  mint:   'var(--accent-mint)',
}

function BlogSection() {
  const { i18n } = useTranslation()
  const [hoverIdx, setHoverIdx] = useState<string | number | null>(null)
  const sectionRef = useReveal<HTMLElement>()
  const isIT = i18n.language === 'it'

  const featured = blogPosts.find(p => p.featured)!
  const rest = blogPosts.filter(p => !p.featured)

  return (
    <section id="blog" ref={sectionRef} className="reveal-target blog-section">
      <p className="blog-eyebrow">
        {isIT ? 'Registro // Log entries' : 'Ship log // Log entries'}
      </p>
      <h2 className="blog-h2">
        {isIT
          ? <>Appunti dal <span className="accent-green">campo</span>.</>
          : <>Notes from the <span className="accent-green">field</span>.</>}
      </h2>
      <p className="blog-sub">
        {isIT
          ? 'Cose che imparo mentre spedisco. Tecniche, rotture, piccole vittorie. Scrivo per fissarle — magari aiutano anche te.'
          : 'Things I learn while shipping. Techniques, breakages, small wins. I write them down to pin them — maybe they help you too.'}
      </p>

      <div className="blog-grid">
        {/* Featured card */}
        <article
          className={`blog-featured${hoverIdx === 'featured' ? ' blog-card--hover' : ''}`}
          style={{ borderLeft: `4px solid ${TONE_VAR[featured.tone]}` }}
          onMouseEnter={() => setHoverIdx('featured')}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <div className="blog-featured-cover">
            <div
              className="blog-cover-pattern"
              style={{ background: `
                repeating-linear-gradient(0deg, color-mix(in oklab, ${TONE_VAR[featured.tone]} 6%, transparent) 0px, color-mix(in oklab, ${TONE_VAR[featured.tone]} 6%, transparent) 1px, transparent 1px, transparent 28px),
                repeating-linear-gradient(90deg, color-mix(in oklab, ${TONE_VAR[featured.tone]} 6%, transparent) 0px, color-mix(in oklab, ${TONE_VAR[featured.tone]} 6%, transparent) 1px, transparent 1px, transparent 28px)
              ` }}
            />
            <div className="blog-cover-glyph">
              <span className="material-symbols-outlined" style={{ fontSize: 96, color: TONE_VAR[featured.tone] }}>
                {featured.icon}
              </span>
            </div>
            <span className="blog-featured-badge" style={{ color: TONE_VAR[featured.tone], borderColor: TONE_VAR[featured.tone] }}>
              {isIT ? 'IN EVIDENZA' : 'FEATURED'}
            </span>
          </div>

          <div className="blog-featured-body">
            <div className="blog-meta-row">
              <span className="blog-id" style={{ color: TONE_VAR[featured.tone] }}>// {featured.id}</span>
              <span className="blog-date">{featured.date}</span>
            </div>
            <span className="blog-tag" style={{ color: TONE_VAR[featured.tone], borderColor: TONE_VAR[featured.tone] }}>
              {isIT ? featured.tagIT : featured.tagEN}
            </span>
            <h3 className="blog-featured-title">{isIT ? featured.titleIT : featured.titleEN}</h3>
            <p className="blog-excerpt">{isIT ? featured.excerptIT : featured.excerptEN}</p>
            <div className="blog-read-row">
              <span className="material-symbols-outlined blog-read-icon">schedule</span>
              <span className="blog-read-time">{isIT ? featured.readIT : featured.readEN} {isIT ? 'di lettura' : 'read'}</span>
              <span className="blog-cta">
                {isIT ? 'Leggi log' : 'Read log'}
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
              </span>
            </div>
          </div>
        </article>

        {/* Condensed list */}
        <div className="blog-list">
          {rest.map((p, i) => {
            const tone = TONE_VAR[p.tone]
            return (
              <article
                key={p.id}
                className={`blog-item${hoverIdx === i ? ' blog-card--hover' : ''}`}
                style={{ borderLeft: `3px solid ${tone}` }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              >
                <div className="blog-item-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: tone }}>{p.icon}</span>
                </div>
                <div className="blog-item-body">
                  <div className="blog-meta-row">
                    <span className="blog-id" style={{ color: tone }}>// {p.id}</span>
                    <span className="blog-date">{p.date}</span>
                  </div>
                  <span className="blog-tag" style={{ color: tone, borderColor: tone }}>
                    {isIT ? p.tagIT : p.tagEN}
                  </span>
                  <h4 className="blog-item-title">{isIT ? p.titleIT : p.titleEN}</h4>
                  <p className="blog-item-excerpt">{isIT ? p.excerptIT : p.excerptEN}</p>
                  <div className="blog-read-row">
                    <span className="blog-read-time">{isIT ? p.readIT : p.readEN} {isIT ? 'di lettura' : 'read'}</span>
                    <span className="blog-cta blog-cta--sm">
                      {isIT ? 'Leggi' : 'Read'}
                      <span className="material-symbols-outlined" style={{ fontSize: 13 }}>arrow_forward</span>
                    </span>
                  </div>
                </div>
              </article>
            )
          })}

          <button className="blog-archive-btn" type="button">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>inventory_2</span>
            {isIT ? 'Archivio completo' : 'Full archive'}
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>north_east</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
