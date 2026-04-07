import {useEffect, useRef, useState} from 'react'
import profileFrontImg from '../assets/profilo1.jpeg'
import profileBackImg from '../assets/profilo2.png'
import {aboutHeader, aboutMetadata, aboutOriginCards, aboutPhilosophy, aboutQuests, aboutScanner, aboutStats,} from '../data/aboutContent'
import './AboutSection.css'

const SEGMENTS = 10
const STAT_ANIMATION_DURATION_MS = 1300
const STAT_TRIGGER_THRESHOLD = 0.35

function AboutSegmentBar({value, tone}: { value: number; tone: 'green' | 'mint' | 'orange' }) {
    const activeSegments = Math.max(0, Math.round((value / 100) * SEGMENTS))

    return (
        <div className="about-segment-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
            {Array.from({length: SEGMENTS}).map((_, index) => (
                <span key={`${tone}-${index}`} className={index < activeSegments ? `is-active ${tone}` : ''}/>
            ))}
        </div>
    )
}

function AboutSection() {
    const [isProfileFlipped, setIsProfileFlipped] = useState(false)
    const statsCardRef = useRef<HTMLDivElement | null>(null)
    const [hasStartedStatsAnimation, setHasStartedStatsAnimation] = useState(false)
    const [displayedStats, setDisplayedStats] = useState<number[]>(() => aboutStats.map(() => 0))

    useEffect(() => {
        const cardNode = statsCardRef.current

        if (!cardNode || hasStartedStatsAnimation) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStartedStatsAnimation(true)
                    observer.disconnect()
                }
            },
            {threshold: STAT_TRIGGER_THRESHOLD},
        )

        observer.observe(cardNode)

        return () => {
            observer.disconnect()
        }
    }, [hasStartedStatsAnimation])

    useEffect(() => {
        if (!hasStartedStatsAnimation) {
            return
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
            setDisplayedStats(aboutStats.map((stat) => stat.value))
            return
        }

        let animationFrameId = 0
        let startTime: number | null = null

        const animate = (timestamp: number) => {
            if (startTime === null) {
                startTime = timestamp
            }

            const elapsed = timestamp - startTime
            const progress = Math.min(1, elapsed / STAT_ANIMATION_DURATION_MS)
            const easedProgress = 1 - Math.pow(1 - progress, 3)

            setDisplayedStats(aboutStats.map((stat) => Math.round(stat.value * easedProgress)))

            if (progress < 1) {
                animationFrameId = window.requestAnimationFrame(animate)
                return
            }

            setDisplayedStats(aboutStats.map((stat) => stat.value))
        }

        animationFrameId = window.requestAnimationFrame(animate)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [hasStartedStatsAnimation])

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }

    return (
        <section className="about-page" id="about" aria-labelledby="about-title">
            <div className="about-content">
                <header className="about-header">
                    <div className="about-eyebrow">
                        <div/>
                        <span>{aboutHeader.eyebrow}</span>
                    </div>
                    <h2 id="about-title">
                        {aboutHeader.titleTop} <br/>
                        <span>{aboutHeader.titleAccent}</span>
                    </h2>
                    <p>{aboutHeader.intro}</p>
                    <div className="about-ctas">
                        <button className="about-btn primary" type="button" onClick={() => scrollToSection('projects')}>
                            Entra nel mio mondo
                        </button>
                        <button className="about-btn secondary" type="button" onClick={() => scrollToSection('contact')}>
                            Contattami
                        </button>
                    </div>
                </header>

                <div className="about-layout">
                    <div className="about-narrative">
                        <section>
                            <div className="about-section-head">
                                <span>ENV</span>
                                <div/>
                                <h3>Career Snapshot</h3>
                            </div>
                            <div className="about-copy">
                                <p>
                                    Lavoro su backend enterprise in .NET presso TeamSystem, dove sviluppo, mantengo e
                                    rifattorizzo sistemi complessi con API REST e logiche di business pensate per restare
                                    stabili, manutenibili e scalabili nel tempo.
                                </p>
                                <p>
                                    Accanto al lavoro porto avanti <strong>Everyday Life Core</strong>, un progetto personale full
                                    stack con React, Flutter e .NET che mi permette di esplorare realtime, notifiche,
                                    architetture moderne e AI-assisted development.
                                </p>
                            </div>
                        </section>

                        <section className="about-origin-grid">
                            {aboutOriginCards.map((card) => (
                                <article key={card.index} className="about-origin-card">
                                    <strong>{card.index}</strong>
                                    <h4>{card.title}</h4>
                                    <p>{card.description}</p>
                                </article>
                            ))}
                        </section>

                        <section className="about-philosophy">
                            <div className="about-terminal-icon" aria-hidden="true">
                                <span className="material-symbols-outlined">terminal</span>
                            </div>
                            <h3>MANUAL_OVERRIDE: PHILOSOPHY</h3>
                            <blockquote>{aboutPhilosophy}</blockquote>
                        </section>
                    </div>

                    <div className="about-hud">
                        <div ref={statsCardRef} className="about-hud-card glow-primary">
                            <div className="about-level-row">
                                <div>
                                    <span>MATON11</span>
                                    <strong>LVL 26</strong>
                                </div>
                                <button
                                    className={`about-avatar ${isProfileFlipped ? 'is-flipped' : ''}`}
                                    type="button"
                                    onClick={() => setIsProfileFlipped((prev) => !prev)}
                                    aria-pressed={isProfileFlipped}
                                    aria-label={isProfileFlipped ? 'Mostra profilo 1' : 'Mostra profilo 2'}
                                    title={isProfileFlipped ? 'Mostra profilo 1' : 'Mostra profilo 2'}
                                >
                                    <span className="about-avatar-stack" aria-hidden="true">
                                        <img className="about-avatar-face about-avatar-front" alt="Profilo frontale" src={profileFrontImg}/>
                                        <img className="about-avatar-face about-avatar-back" alt="Profilo secondario" src={profileBackImg}/>
                                    </span>
                                </button>
                            </div>

                            <div className="about-stats">
                                {aboutStats.map((stat, index) => {
                                    const displayedValue = displayedStats[index] ?? 0

                                    return (
                                    <div key={stat.label}>
                                        <div className="about-stat-head">
                                            <span>{stat.label}</span>
                                            <strong className={stat.tone}>{displayedValue}%</strong>
                                        </div>
                                        <AboutSegmentBar value={displayedValue} tone={stat.tone}/>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="about-quests-card">
                            <h3>
                <span className="material-symbols-outlined" aria-hidden="true">
                  military_tech
                </span>
                                MISSION_LOG: LIFE_QUESTS
                            </h3>
                            <ul>
                                {aboutQuests.map((quest) => (
                                    <li key={quest.title} className={quest.active ? 'is-active' : 'is-inactive'}>
                                        <div>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {quest.active ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                                        </div>
                                        <div>
                                            <small>{quest.status}</small>
                                            <strong>{quest.title}</strong>
                                            <p>{quest.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="about-meta-card">
                            {aboutMetadata.map((item) => (
                                <div key={item.label}>
                                    <small>{item.label}</small>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="about-scanner" aria-label="Status Scanner">
                    <div className="about-scanner-track">
                        <div className="about-scanner-group">
                            {aboutScanner.map((item, index) => (
                                <span key={`a-${index}`}>
                  <span className="dot" aria-hidden="true"/>
                                    {item}
                </span>
                            ))}
                        </div>
                        <div className="about-scanner-group" aria-hidden="true">
                            {aboutScanner.map((item, index) => (
                                <span key={`b-${index}`}>
                  <span className="dot" aria-hidden="true"/>
                                    {item}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection

