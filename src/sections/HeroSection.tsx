import HeroHudCard from '../components/HeroHudCard'
import { heroContent } from '../data/heroContent'
import './HeroSection.css'

function HeroSection() {
  return (
    <div className="hero-page">
      <header className="topbar">
        <nav>
          <a className="logo" href="#home" aria-label="Torna all'inizio">
            MA
          </a>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <span>{heroContent.availability}</span>
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
              <a className="btn btn-primary" href="#projects">
                {heroContent.ctas.primary}
                <span className="material-symbols-outlined" aria-hidden="true">
                  north_east
                </span>
              </a>
              <a className="btn btn-secondary" href="#contact">
                {heroContent.ctas.secondary}
              </a>
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
          {[...heroContent.scannerItems, ...heroContent.scannerItems].map((item, index) => (
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
  )
}

export default HeroSection
