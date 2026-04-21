import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { blogPosts, TONE_VAR } from '../data/blogPosts'
import GlitchTransition from '../components/overlays/GlitchTransition'
import './BlogSection.css'

function BlogSection() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const [hoverIdx, setHoverIdx] = useState<string | number | null>(null)
  const [isLeaving, setIsLeaving] = useState(false)
  const sectionRef = useReveal<HTMLElement>()
  const isIT = i18n.language === 'it'

  const featured = blogPosts.find(p => p.featured)!
  const rest = blogPosts.filter(p => !p.featured)

  const navigateWithGlitch = (targetPath: string) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) { navigate(targetPath); return }
    setIsLeaving(true)
    window.setTimeout(() => { navigate(targetPath) }, 180)
  }

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
          onClick={() => navigateWithGlitch(`/blog/${featured.slug}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateWithGlitch(`/blog/${featured.slug}`) }}
          aria-label={`Read: ${isIT ? featured.titleIT : featured.titleEN}`}
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
                onClick={() => navigateWithGlitch(`/blog/${p.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateWithGlitch(`/blog/${p.slug}`) }}
                aria-label={`Read: ${isIT ? p.titleIT : p.titleEN}`}
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

          <button className="blog-archive-btn" type="button" onClick={() => navigateWithGlitch('/blog')}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>inventory_2</span>
            {isIT ? 'Archivio completo' : 'Full archive'}
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>north_east</span>
          </button>
        </div>
      </div>

      {isLeaving ? <GlitchTransition /> : null}
    </section>
  )
}

export default BlogSection
