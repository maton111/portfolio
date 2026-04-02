import heroImg from '../assets/profilo.png'
import {aboutHeader, aboutMetadata, aboutOriginCards, aboutPhilosophy, aboutQuests, aboutScanner, aboutStats,} from '../data/aboutContent'
import './AboutSection.css'

const SEGMENTS = 10

function AboutSegmentBar({value, tone}: { value: number; tone: 'green' | 'mint' | 'orange' }) {
    const activeSegments = Math.max(1, Math.round((value / 100) * SEGMENTS))

    return (
        <div className="about-segment-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
            {Array.from({length: SEGMENTS}).map((_, index) => (
                <span key={`${tone}-${value}-${index}`} className={index < activeSegments ? `is-active ${tone}` : ''}/>
            ))}
        </div>
    )
}

function AboutSection() {
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
                        <a className="about-btn primary" href="#projects">
                            Entra nel mio mondo
                        </a>
                        <a className="about-btn secondary" href="#contact">
                            Contattami
                        </a>
                    </div>
                </header>

                <div className="about-layout">
                    <div className="about-narrative">
                        <section>
                            <div className="about-section-head">
                                <span>01</span>
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
                        <div className="about-hud-card glow-primary">
                            <div className="about-level-row">
                                <div>
                                    <span>CHARACTER_LEVEL</span>
                                    <strong>LVL 26</strong>
                                </div>
                                <div className="about-avatar">
                                    <img className="profile-img" alt="Profile HUD" src={heroImg}/>
                                </div>
                            </div>

                            <div className="about-stats">
                                {aboutStats.map((stat) => (
                                    <div key={stat.label}>
                                        <div className="about-stat-head">
                                            <span>{stat.label}</span>
                                            <strong className={stat.tone}>{stat.value}%</strong>
                                        </div>
                                        <AboutSegmentBar value={stat.value} tone={stat.tone}/>
                                    </div>
                                ))}
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

