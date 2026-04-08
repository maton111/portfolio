import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import GlitchTransition from './components/overlays/GlitchTransition'
import InitialHudLoader from './components/overlays/InitialHudLoader'
import {useInitialBoot} from './hooks/useInitialBoot'
import ProjectNotesPage from './pages/ProjectNotesPage'
import EverydayLifeProjectPage from './pages/EverydayLifeProjectPage'
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
      <ContactSection />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
