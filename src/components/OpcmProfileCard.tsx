import {type PointerEvent, useMemo, useRef, useState} from 'react'
import profileImage from '../assets/sfondo_card_opcm.png'
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

	card.style.setProperty('--opcm-tilt-x', `${(y - 0.5) * -9}deg`)
	card.style.setProperty('--opcm-tilt-y', `${(x - 0.5) * 12}deg`)
	card.style.setProperty('--opcm-glow-x', `${Math.round(x * 100)}%`)
	card.style.setProperty('--opcm-glow-y', `${Math.round(y * 100)}%`)
  }

  const resetTilt = () => {
	const card = cardRef.current
	if (!card) return

	card.style.setProperty('--opcm-tilt-x', '0deg')
	card.style.setProperty('--opcm-tilt-y', '0deg')
	card.style.setProperty('--opcm-glow-x', '50%')
	card.style.setProperty('--opcm-glow-y', '20%')
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

		<span className="opcm-card-face opcm-card-back" aria-hidden="true">
		  <span className="opcm-back-orbit" />
		  <span className="opcm-back-orbit opcm-back-orbit-inner" />
		  <span className="opcm-back-center">OPCM</span>
		  <small>CARD GAME</small>
		</span>

		<span className="opcm-card-face opcm-card-front">
		  <span className="opcm-front-shell" aria-hidden="true">
			<span className="opcm-card-shell-bg" />
			<span className="opcm-card-map" />
			<span className="opcm-card-shimmer" />
			<span className="opcm-outer-border" />
			<span className="opcm-inner-border" />
		  </span>

		  <span className="opcm-artwork-area" aria-hidden="true">
			<img src={profileImage} alt="" />
		  </span>

		  <span className="opcm-power-badge" aria-hidden="true">
			<strong>9000</strong>
			<span>DEPLOY</span>
		  </span>

		  <span className="opcm-cost-badge" aria-hidden="true">
			<strong>3</strong>
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

		  <span className="opcm-life-badge" aria-hidden="true">
			<span>5</span>
		  </span>

		  <span className="opcm-bottom-bar" aria-hidden="true">
			<span>OP-DEV-001</span>
			<span className="opcm-bottom-label">PORTFOLIO CARD</span>
		  </span>

		  <span className="opcm-handle" aria-hidden="true">@{handle}</span>
		  <span className="opcm-status" aria-hidden="true">{status}</span>
		</span>
	  </button>
	</div>
  )
}

export default OpcmProfileCard


