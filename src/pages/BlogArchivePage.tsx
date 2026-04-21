import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import GlitchTransition from '../components/overlays/GlitchTransition'
import { blogPosts, TONE_VAR } from '../data/blogPosts'
import './BlogArchivePage.css'

function BlogArchivePage() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const [isLeaving, setIsLeaving] = useState(false)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const isIT = i18n.language === 'it'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const navigateWithGlitch = (targetPath: string) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) { navigate(targetPath); return }
    setIsLeaving(true)
    window.setTimeout(() => { navigate(targetPath) }, 180)
  }

  return (
    <main className="blog-archive-page" aria-labelledby="blog-archive-title">
      <section className="blog-archive-shell">

        <header className="blog-archive-header">
          <button
            type="button"
            className="blog-archive-back"
            onClick={() => navigateWithGlitch('/#blog')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_back</span>
            {isIT ? 'Torna al blog' : 'Back to Blog'}
          </button>

          <p className="blog-archive-eyebrow">
            {isIT ? 'Archivio // Log entries' : 'Archive // Log entries'}
          </p>
          <h1 id="blog-archive-title" className="blog-archive-title">
            {isIT
              ? <>Tutti i <span className="accent-green">log</span>.</>
              : <>All <span className="accent-green">logs</span>.</>}
          </h1>
          <span className="blog-archive-count">
            {blogPosts.length} {isIT ? 'entries' : 'entries'}
          </span>
        </header>

        <div className="blog-archive-list" role="list">
          {blogPosts.map((post) => {
            const tone = TONE_VAR[post.tone]
            return (
              <article
                key={post.id}
                className="blog-archive-card"
                style={{ borderLeftColor: tone }}
                role="listitem"
                tabIndex={0}
                onMouseEnter={() => setHoverId(post.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => navigateWithGlitch(`/blog/${post.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') navigateWithGlitch(`/blog/${post.slug}`)
                }}
                aria-label={`Read: ${isIT ? post.titleIT : post.titleEN}`}
              >
                {/* Icon cover */}
                <div className="blog-archive-card-visual" aria-hidden="true">
                  <div
                    className="blog-archive-card-pattern"
                    style={{
                      background: `
                        repeating-linear-gradient(0deg, color-mix(in oklab, ${tone} 6%, transparent) 0px, color-mix(in oklab, ${tone} 6%, transparent) 1px, transparent 1px, transparent 28px),
                        repeating-linear-gradient(90deg, color-mix(in oklab, ${tone} 6%, transparent) 0px, color-mix(in oklab, ${tone} 6%, transparent) 1px, transparent 1px, transparent 28px)
                      `,
                    }}
                  />
                  <div className="blog-archive-card-glyph">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 36, color: tone }}
                    >
                      {post.icon}
                    </span>
                  </div>
                </div>

                {/* Text body */}
                <div className="blog-archive-card-body">
                  <div className="blog-archive-meta-row">
                    <span className="blog-archive-id" style={{ color: tone }}>
                      // {post.id}
                    </span>
                    <span className="blog-archive-date">{post.date}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span
                      className="blog-archive-tag"
                      style={{ color: tone, borderColor: tone }}
                    >
                      {isIT ? post.tagIT : post.tagEN}
                    </span>
                    {post.featured && (
                      <span
                        className="blog-archive-featured-badge"
                        style={{ color: tone, borderColor: tone }}
                      >
                        {isIT ? 'IN EVIDENZA' : 'FEATURED'}
                      </span>
                    )}
                  </div>

                  <h2 className="blog-archive-card-title">
                    {isIT ? post.titleIT : post.titleEN}
                  </h2>
                  <p className="blog-archive-card-excerpt">
                    {isIT ? post.excerptIT : post.excerptEN}
                  </p>

                  <div className="blog-archive-read-row">
                    <span className="blog-archive-read-time">
                      <span className="material-symbols-outlined" style={{ fontSize: 13, color: 'var(--text-muted)' }}>schedule</span>
                      {isIT ? post.readIT : post.readEN} {isIT ? 'di lettura' : 'read'}
                    </span>
                    <span
                      className="blog-archive-cta"
                      style={{ color: hoverId === post.id ? tone : 'var(--accent-green)' }}
                    >
                      {isIT ? 'Leggi log' : 'Read log'}
                      <span className="material-symbols-outlined" style={{ fontSize: 13 }}>arrow_forward</span>
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </section>

      {isLeaving ? <GlitchTransition /> : null}
    </main>
  )
}

export default BlogArchivePage
