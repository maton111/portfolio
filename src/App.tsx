import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import TimelineSection from './sections/TimelineSection'
import BlogSection from './sections/BlogSection'
import ContactSection from './sections/ContactSection'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import CommandPalette from './components/overlays/CommandPalette'
import GlitchTransition from './components/overlays/GlitchTransition'
import InitialHudLoader from './components/overlays/InitialHudLoader'
import { useInitialBoot } from './hooks/useInitialBoot'
import { useDocumentMeta } from './hooks/useDocumentMeta'
import { SECTION_IDS, type SectionId } from './data/sectionNavigation'
import { scrollToSection } from './hooks/useSectionScroll'

// Secondary routes ship in their own chunks: the home page never pays for them.
const ProjectNotesPage = lazy(() => import('./pages/ProjectNotesPage'))
const EverydayLifeProjectPage = lazy(() => import('./pages/EverydayLifeProjectPage'))
const LifeWrappedProjectPage = lazy(() => import('./pages/LifeWrappedProjectPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const BlogArchivePage = lazy(() => import('./pages/BlogArchivePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function HomePage({ isPageGlitching }: { isPageGlitching: boolean }) {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) {
      return
    }

    const sectionId = location.hash.replace('#', '')

    if (SECTION_IDS.includes(sectionId as SectionId)) {
      scrollToSection(sectionId as SectionId)
    }
  }, [location.hash, location.pathname])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <BlogSection />
      <ContactSection />
      <SiteFooter />
      {isPageGlitching ? <GlitchTransition /> : null}
    </>
  )
}

function SkipLink() {
  const { t } = useTranslation()

  const focusMain = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const main = document.querySelector<HTMLElement>('main')
    if (!main) return
    event.preventDefault()
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
    main.focus({ preventScroll: true })
    main.scrollIntoView()
  }

  return (
    <a className="skip-link" href="#home" onClick={focusMain}>
      {t('a11y.skipToContent')}
    </a>
  )
}

function App() {
  const location = useLocation()
  const { isBootVisible, isPageGlitching, progress, activeLabel, logs, skipBoot } = useInitialBoot()

  useDocumentMeta()
  const isHome = location.pathname === '/'

  // The boot sequence is a home-page intro: deep links open straight on their content.
  if (isBootVisible && isHome) {
    return <InitialHudLoader progress={progress} activeLabel={activeLabel} logs={logs} onSkip={skipBoot} />
  }

  return (
    <>
      <SkipLink />
      {isHome ? null : <SiteHeader />}
      <Suspense fallback={<div className="route-fallback" role="status" aria-label="Loading" />}>
        <Routes>
          <Route path="/" element={<HomePage isPageGlitching={isPageGlitching} />} />
          <Route path="/projects/everyday-life-core" element={<EverydayLifeProjectPage />} />
          <Route path="/projects/life-wrapped" element={<LifeWrappedProjectPage />} />
          <Route path="/projects/:slug" element={<ProjectNotesPage />} />
          <Route path="/blog" element={<BlogArchivePage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {isHome ? null : <SiteFooter />}
      <CommandPalette />
    </>
  )
}

export default App
