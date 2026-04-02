import HeroHudCard from '../components/HeroHudCard'
import {heroContent} from '../data/heroContent'
import cvFile from '../assets/CV - Mattia Archinà.pdf'
import './HeroSection.css'

function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="hero-page">
      <header className="topbar">
        <nav>
          <button className="logo" type="button" aria-label="Torna all'inizio" onClick={() => scrollToSection('home')}>
            MA
          </button>
          <ul>
            <li>
              <button type="button" onClick={() => scrollToSection('home')}>Home</button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('about')}>About</button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('skills')}>Skills</button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('projects')}>Projects</button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('contact')}>Contact</button>
            </li>
          </ul>
          <div className="topbar-actions">
            <span>{heroContent.availability}</span>
            <a
              className="cv-btn"
              href={cvFile}
              download="Mattia-Archina-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV in a new tab"
            >
              Download CV
            </a>
          </div>
        </nav>
      </header>

      <main className="hero-main" id="home">
        <div className="glow glow-green" aria-hidden="true" />
        <div className="glow glow-orange" aria-hidden="true" />

        <section className="hero-grid">
          <div className="hero-copy">
            <p>{heroContent.eyebrow}</p>
            <h1>
              {heroContent.title} <br />
              <span>{heroContent.subtitle}</span>
            </h1>
            <p className="hero-intro">{heroContent.intro}</p>
            <div className="hero-ctas">
              <button className="btn btn-primary" type="button" onClick={() => scrollToSection('projects')}>
                {heroContent.ctas.primary}
                <span className="material-symbols-outlined" aria-hidden="true">
                  north_east
                </span>
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => scrollToSection('contact')}>
                {heroContent.ctas.secondary}
              </button>
            </div>
            <div className="hero-trust">
              <span className="material-symbols-outlined" aria-hidden="true">
                terminal
              </span>
              {heroContent.trust}
            </div>
          </div>

          <HeroHudCard
            name={heroContent.hud.name}
            role={heroContent.hud.role}
            level={heroContent.hud.level}
            status={heroContent.hud.status}
            stats={heroContent.hud.stats}
            quests={heroContent.hud.quests}
            tags={heroContent.hud.tags}
          />
        </section>
      </main>

      <div className="status-scanner" aria-label="Status scanner">
        <div className="scanner-track">
          <div className="scanner-group">
            {heroContent.scannerItems.map((item) => (
              <span className={item.highlighted ? 'highlighted' : ''} key={item.text}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {item.icon}
                </span>
                {item.text}
              </span>
            ))}
          </div>
          <div className="scanner-group" aria-hidden="true">
            {heroContent.scannerItems.map((item, index) => (
              <span className={item.highlighted ? 'highlighted' : ''} key={`${item.text}-${index}`}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {item.icon}
                </span>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
