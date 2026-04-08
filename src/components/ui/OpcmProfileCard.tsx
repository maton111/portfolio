import {type PointerEvent, useMemo, useRef, useState} from 'react'
import profileImage from '../../assets/sfondo_card_opcm.png'
import './OpcmProfileCard.css'

type OpcmProfileCardProps = {
  name: string
  title: string
  handle: string
  status: string
}

function OpcmProfileCard({ name, title, handle, status }: OpcmProfileCardProps) {
  const cardRef = useRef<HTMLButtonElement | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const badges = useMemo(() => ['Activate: Main', 'Once Per Turn', 'On Deploy'], [])

  const updateTilt = (event: PointerEvent<HTMLButtonElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    card.style.setProperty('--opcm-tilt-x', `${(y - 0.5) * -22}deg`)
    card.style.setProperty('--opcm-tilt-y', `${(x - 0.5) * 28}deg`)
    card.style.setProperty('--opcm-glow-x', `${Math.round(x * 100)}%`)
    card.style.setProperty('--opcm-glow-y', `${Math.round(y * 100)}%`)

    const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI)
    card.style.setProperty('--opcm-foil-angle', `${angle}deg`)
    card.style.setProperty('--opcm-foil-opacity', '1')
    card.style.setProperty('--opcm-shimmer-angle', `${108 + (x - 0.5) * 40}deg`)
  }

  const resetTilt = () => {
    const card = cardRef.current
    if (!card) return

    card.style.setProperty('--opcm-tilt-x', '0deg')
    card.style.setProperty('--opcm-tilt-y', '0deg')
    card.style.setProperty('--opcm-glow-x', '50%')
    card.style.setProperty('--opcm-glow-y', '20%')
    card.style.setProperty('--opcm-foil-opacity', '0')
    card.style.setProperty('--opcm-shimmer-angle', '108deg')
  }

  return (
    <div className="opcm-card-scene">
      <button
        type="button"
        className={`opcm-card-shell${isFlipped ? ' is-flipped' : ''}`}
        ref={cardRef}
        onPointerMove={updateTilt}
        onPointerLeave={resetTilt}
        onClick={() => setIsFlipped((value) => !value)}
        aria-label="OPCM profile card"
      >
        <span className="opcm-card-edge edge-top" aria-hidden="true" />
        <span className="opcm-card-edge edge-bottom" aria-hidden="true" />
        <span className="opcm-card-edge edge-left" aria-hidden="true" />
        <span className="opcm-card-edge edge-right" aria-hidden="true" />

        {/* ── BACK ── */}
        <span className="opcm-card-face opcm-card-back" aria-hidden="true">
          <svg className="opcm-back-lines" viewBox="0 0 280 390" xmlns="http://www.w3.org/2000/svg">
            <line x1="0"   y1="90"  x2="280" y2="220" stroke="#c8a840" strokeWidth="0.5"/>
            <line x1="0"   y1="180" x2="280" y2="110" stroke="#c8a840" strokeWidth="0.5"/>
            <line x1="45"  y1="0"   x2="200" y2="390" stroke="#c8a840" strokeWidth="0.5"/>
            <line x1="140" y1="0"   x2="20"  y2="390" stroke="#c8a840" strokeWidth="0.5"/>
            <line x1="220" y1="0"   x2="280" y2="140" stroke="#c8a840" strokeWidth="0.5"/>
            <line x1="280" y1="200" x2="70"  y2="390" stroke="#c8a840" strokeWidth="0.5"/>
            <line x1="0"   y1="310" x2="220" y2="390" stroke="#c8a840" strokeWidth="0.5"/>
          </svg>

          <svg className="opcm-back-compass" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="72" fill="none" stroke="#c8a840" strokeWidth="2"/>
            <circle cx="80" cy="80" r="56" fill="none" stroke="#c8a840" strokeWidth="1"/>
            <circle cx="80" cy="80" r="44" fill="none" stroke="#c8a840" strokeWidth="0.5" strokeDasharray="2,2"/>
            <g stroke="#c8a840" strokeWidth="0.8">
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
                <line key={deg} x1="80" y1="10" x2="80" y2={i % 3 === 0 ? 19 : 16} transform={`rotate(${deg},80,80)`}/>
              ))}
            </g>
            <path d="M80,18 L88,80 L80,90 L72,80 Z" fill="#c8a840"/>
            <path d="M80,142 L88,80 L80,90 L72,80 Z" fill="#c8a840" opacity={0.5}/>
            <circle cx="80" cy="80" r="6" fill="#c8a840"/>
            <circle cx="80" cy="80" r="3" fill="#14195e"/>
          </svg>

          <span className="opcm-back-footer">
            <span className="opcm-back-logo">
              <span className="opcm-back-logo-icon">✕</span>PCMO
            </span>
            <small>CARD GAME</small>
          </span>
        </span>

        {/* ── FRONT ── */}
        <span className="opcm-card-face opcm-card-front">
          <span className="opcm-front-shell" aria-hidden="true">
            <span className="opcm-card-shell-bg" />
            <svg className="opcm-card-map-svg" viewBox="0 0 280 390" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g stroke="rgba(200,255,230,0.45)" strokeWidth="0.4" fill="none">
                <line x1="0" y1="65"  x2="280" y2="65"/>
                <line x1="0" y1="130" x2="280" y2="130"/>
                <line x1="0" y1="195" x2="280" y2="195"/>
                <line x1="0" y1="260" x2="280" y2="260"/>
                <line x1="0" y1="325" x2="280" y2="325"/>
                <line x1="70"  y1="0" x2="70"  y2="390"/>
                <line x1="140" y1="0" x2="140" y2="390"/>
                <line x1="210" y1="0" x2="210" y2="390"/>
              </g>
              <g fill="none" stroke="rgba(200,255,230,0.3)" strokeWidth="0.8">
                <path d="M20,90 Q50,70 90,80 Q112,86 100,112 Q88,132 55,126 Q22,118 20,90Z"/>
                <path d="M115,55 Q150,44 182,60 Q195,76 178,98 Q160,112 130,98 Q108,83 115,55Z"/>
              </g>
            </svg>
            <span className="opcm-card-shimmer" />
            <span className="opcm-outer-border" />
            <span className="opcm-inner-border" />
          </span>

          {/* Foil holographic overlay */}
          <span className="opcm-foil" aria-hidden="true" />

          <span className="opcm-artwork-area" aria-hidden="true">
            <img src={profileImage} alt="" />
            <span className="opcm-artwork-fade" />
          </span>

          {/* Power badge: dark box + blue kanji badge */}
          <span className="opcm-power-badge" aria-hidden="true">
            <strong>9000</strong>
            <span className="opcm-type-badge">
              <span className="opcm-kanji">開</span>
              <span className="opcm-romaji">DEPLOY</span>
            </span>
          </span>

          {/* Cost badge: SVG circle */}
          <span className="opcm-cost-badge" aria-hidden="true">
            <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
              <circle cx="19" cy="19" r="17" fill="rgba(15,25,45,0.95)" stroke="rgba(100,200,255,0.75)" strokeWidth="2"/>
              <text x="19" y="13" textAnchor="middle" fontSize="5.5" fill="rgba(180,220,255,0.8)" fontFamily="sans-serif" fontWeight="600" dominantBaseline="middle">COST</text>
              <text x="19" y="24" textAnchor="middle" fontSize="14" fill="white" fontFamily="Arial Black,sans-serif" fontWeight="900" dominantBaseline="middle">3</text>
            </svg>
          </span>

          <span className="opcm-effect-area">
            <span className="opcm-effect-tags">
              {badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </span>
            <span className="opcm-effect-text">
              If your tech stack has enough entropy, this card converts complexity into delivery speed, reduces friction in the sprint lane and keeps the project moving.
            </span>
          </span>

          <span className="opcm-type-strip" aria-hidden="true">
            <span className="opcm-type-line" />
            <span className="opcm-type-text">Leader</span>
            <span className="opcm-type-line" />
          </span>

          <span className="opcm-name-area">
            <strong>{name}</strong>
            <span>{title}</span>
          </span>

          {/* Life badge: SVG circle with LIFE label */}
          <svg className="opcm-life-badge" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="15" cy="15" r="13" fill="rgba(20,30,50,0.9)" stroke="rgba(100,200,255,0.7)" strokeWidth="1.5"/>
            <text x="15" y="11" textAnchor="middle" fontSize="4.5" fill="rgba(180,220,255,0.8)" fontFamily="sans-serif" fontWeight="600" dominantBaseline="middle">LIFE</text>
            <text x="15" y="20" textAnchor="middle" fontSize="11" fill="white" fontFamily="Arial Black,sans-serif" fontWeight="900" dominantBaseline="middle">5</text>
          </svg>

          {/* Bottom bar with SVG hexagon icon */}
          <span className="opcm-bottom-bar" aria-hidden="true">
            <span className="opcm-bottom-left">
              <svg width="18" height="20" viewBox="0 0 20 22" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,1 19,6 19,16 10,21 1,16 1,6" fill="none" stroke="rgba(200,240,220,0.4)" strokeWidth="1.2"/>
                <polygon points="10,4 16,7.5 16,14.5 10,18 4,14.5 4,7.5" fill="rgba(200,240,220,0.1)" stroke="rgba(200,240,220,0.25)" strokeWidth="0.8"/>
              </svg>
              <span>OP-DEV-001</span>
            </span>
            <span className="opcm-bottom-label">PORTFOLIO CARD</span>
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="6" fill="none" stroke="rgba(200,240,220,0.4)" strokeWidth="1"/>
              <text x="7" y="10" textAnchor="middle" fontSize="7" fill="rgba(200,240,220,0.6)" fontFamily="sans-serif" fontWeight="700">1</text>
            </svg>
          </span>

          <span className="opcm-handle" aria-hidden="true">@{handle}</span>
          <span className="opcm-status" aria-hidden="true">{status}</span>
        </span>
      </button>
    </div>
  )
}

export default OpcmProfileCard
