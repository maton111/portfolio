import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import GlitchTransition from './components/GlitchTransition'
import InitialHudLoader from './components/InitialHudLoader'
import { useInitialBoot } from './hooks/useInitialBoot'

function App() {
  const { isBootVisible, isPageGlitching, progress, activeLabel, logs } = useInitialBoot()

  if (isBootVisible) {
    return <InitialHudLoader progress={progress} activeLabel={activeLabel} logs={logs} />
  }

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

export default App
