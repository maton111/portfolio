import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import TimelineSection from './sections/TimelineSection'
import BlogSection from './sections/BlogSection'
import ContactSection from './sections/ContactSection'
import GlitchTransition from './components/overlays/GlitchTransition'
import InitialHudLoader from './components/overlays/InitialHudLoader'
import {useInitialBoot} from './hooks/useInitialBoot'
import ProjectNotesPage from './pages/ProjectNotesPage'
import EverydayLifeProjectPage from './pages/EverydayLifeProjectPage'
import BlogPostPage from './pages/BlogPostPage'
import BlogArchivePage from './pages/BlogArchivePage'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {useEffect} from 'react'
import {SECTION_IDS, type SectionId} from './data/sectionNavigation'
import {scrollToSection} from './hooks/useSectionScroll'

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
  }, [location.hash, location.pathname, scrollToSection])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <BlogSection />
      <ContactSection />
      <footer style={{ padding: '40px 24px 70px', textAlign: 'center', fontFamily: 'var(--font-headline)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        © 2026 · maton11 · Built in Torino · Do. Learn. Level up.
      </footer>
      {isPageGlitching ? <GlitchTransition /> : null}
    </>
  )
}

function App() {
  const { isBootVisible, isPageGlitching, progress, activeLabel, logs } = useInitialBoot()

  if (isBootVisible) {
    return <InitialHudLoader progress={progress} activeLabel={activeLabel} logs={logs} />
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage isPageGlitching={isPageGlitching} />} />
      <Route path="/projects/everyday-life-core" element={<EverydayLifeProjectPage />} />
      <Route path="/projects/:slug" element={<ProjectNotesPage />} />
      <Route path="/blog" element={<BlogArchivePage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
