import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { projectCards } from '../data/projectCards'

const SITE_NAME = 'Mattia Archinà'

/** Keeps <html lang>, the tab title and the meta description in sync with route and language. */
export function useDocumentMeta() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const language = i18n.language === 'it' ? 'it' : 'en'

  useEffect(() => {
    document.documentElement.lang = language

    let title = t('meta.homeTitle')

    if (pathname === '/blog') {
      title = `${t('meta.blogTitle')} · ${SITE_NAME}`
    } else if (pathname.startsWith('/blog/')) {
      const post = blogPosts.find((item) => pathname === `/blog/${item.slug}`)
      title = `${post ? (language === 'it' ? post.titleIT : post.titleEN) : t('meta.notFoundTitle')} · ${SITE_NAME}`
    } else if (pathname.startsWith('/projects/')) {
      const project = projectCards.find((item) => pathname === `/projects/${item.slug}`)
      title = `${project ? project.title : t('meta.notFoundTitle')} · ${SITE_NAME}`
    } else if (pathname !== '/') {
      title = `${t('meta.notFoundTitle')} · ${SITE_NAME}`
    }

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
  }, [language, pathname, t])
}
