import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GlitchTransition from '../components/overlays/GlitchTransition'
import { blogPosts, getBlogPostBySlug, TONE_VAR } from '../data/blogPosts'
import './BlogPostPage.css'

type BlogSection = { title: string; p1: string; p2: string }
type BlogContent = { intro: string; sections: BlogSection[]; takeaway: string }

function useBlogContent(slug: string | undefined): BlogContent | null {
  const { t } = useTranslation()

  if (!slug) return null

  const prefixMap: Record<string, string> = {
    'modernizing-legacy-code':  'lc',
    'elc-week-14':              'elc14',
    'integration-tests':        'int',
    'from-backend-to-fullstack':'fbs',
  }

  const prefix = prefixMap[slug]
  if (!prefix) return null

  const p = `blogPost.${prefix}_`

  return {
    intro: t(`${p}intro`),
    sections: [1, 2, 3].map((n) => ({
      title: t(`${p}s${n}title`),
      p1:    t(`${p}s${n}p1`),
      p2:    t(`${p}s${n}p2`),
    })),
    takeaway: t(`${p}takeaway`),
  }
}

function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [isLeaving, setIsLeaving] = useState(false)

  const post = getBlogPostBySlug(slug)
  const content = useBlogContent(slug)
  const isIT = i18n.language === 'it'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  const navigateWithGlitch = (targetPath: string) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) { navigate(targetPath); return }
    setIsLeaving(true)
    window.setTimeout(() => { navigate(targetPath) }, 180)
  }

  if (!post || !content) {
    return (
      <main className="blog-post-page" aria-labelledby="blog-post-404-title">
        <section className="blog-post-shell blog-post-not-found">
          <small>Log_Not_Found</small>
          <h1 id="blog-post-404-title">{t('blogPost.notFound')}</h1>
          <p>{t('blogPost.notFoundDesc')}</p>
          <button type="button" onClick={() => navigateWithGlitch('/#blog')}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_back</span>
            {t('blogPost.backBtn')}
          </button>
        </section>
        {isLeaving ? <GlitchTransition /> : null}
      </main>
    )
  }

  const toneColor = TONE_VAR[post.tone]
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <main className="blog-post-page" aria-labelledby="blog-post-title">
      <section className="blog-post-shell">

        {/* Hero */}
        <header
          className="blog-post-hero"
          style={{ borderLeftColor: toneColor }}
        >
          <div className="blog-post-hero-copy">
            <small style={{ color: toneColor }}>
              {post.id} // {post.date}
            </small>
            <span
              className="blog-post-tag"
              style={{ color: toneColor, borderColor: toneColor }}
            >
              {isIT ? post.tagIT : post.tagEN}
            </span>
            <h1 id="blog-post-title">{isIT ? post.titleIT : post.titleEN}</h1>
            <div className="blog-post-hero-meta">
              <span style={{ borderLeftColor: toneColor, color: toneColor }}>
                {isIT ? post.readIT : post.readEN} {isIT ? 'di lettura' : 'read'}
              </span>
              <span style={{ borderLeftColor: toneColor, color: toneColor }}>
                Mattia Archinà
              </span>
            </div>
            <div className="blog-post-actions">
              <button
                type="button"
                style={{ color: toneColor }}
                onClick={() => navigateWithGlitch('/#blog')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_back</span>
                {t('blogPost.backBtn')}
              </button>
            </div>
          </div>

          {/* Dot-grid + icon visual */}
          <div className="blog-post-hero-visual">
            <div
              className="blog-post-cover-pattern"
              style={{
                background: `
                  repeating-linear-gradient(0deg, color-mix(in oklab, ${toneColor} 6%, transparent) 0px, color-mix(in oklab, ${toneColor} 6%, transparent) 1px, transparent 1px, transparent 28px),
                  repeating-linear-gradient(90deg, color-mix(in oklab, ${toneColor} 6%, transparent) 0px, color-mix(in oklab, ${toneColor} 6%, transparent) 1px, transparent 1px, transparent 28px)
                `,
              }}
            />
            <div className="blog-post-cover-glyph">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 96, color: toneColor }}
                aria-hidden="true"
              >
                {post.icon}
              </span>
            </div>
          </div>
        </header>

        {/* Intro paragraph */}
        <article
          className="blog-post-panel blog-post-panel--intro"
          style={{ borderLeftColor: toneColor }}
        >
          <p>{content.intro}</p>
        </article>

        {/* Content sections */}
        <section
          className="blog-post-sections"
          aria-label={t('blogPost.contentAriaLabel')}
        >
          {content.sections.map((s) => (
            <article
              key={s.title}
              className="blog-post-panel"
              style={{ borderLeftColor: toneColor }}
            >
              <h2 style={{ color: toneColor }}>{s.title}</h2>
              <p>{s.p1}</p>
              <p>{s.p2}</p>
            </article>
          ))}
        </section>

        {/* Takeaway */}
        <article
          className="blog-post-panel blog-post-panel--takeaway"
          style={{ borderLeftColor: toneColor }}
        >
          <span className="blog-post-takeaway-label" style={{ color: toneColor }}>
            {t('blogPost.takeawayLabel')}
          </span>
          <p>{content.takeaway}</p>
        </article>

        {/* Navigation footer */}
        {otherPosts.length > 0 && (
          <nav
            className="blog-post-nav"
            aria-label={t('blogPost.navAriaLabel')}
          >
            <span className="blog-post-nav-label">
              {isIT ? '// Altri log entries' : '// More log entries'}
            </span>
            {otherPosts.map((p) => (
              <button
                key={p.id}
                type="button"
                className="blog-post-nav-item"
                style={{ borderLeftColor: TONE_VAR[p.tone] }}
                onClick={() => navigateWithGlitch(`/blog/${p.slug}`)}
              >
                <span
                  className="blog-post-nav-id"
                  style={{ color: TONE_VAR[p.tone] }}
                >
                  {p.id}
                </span>
                <span className="blog-post-nav-title">
                  {isIT ? p.titleIT : p.titleEN}
                </span>
                <span
                  className="material-symbols-outlined blog-post-nav-arrow"
                  style={{ fontSize: 14 }}
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </button>
            ))}
          </nav>
        )}

      </section>

      {isLeaving ? <GlitchTransition /> : null}
    </main>
  )
}

export default BlogPostPage
