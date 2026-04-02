import edlc1 from '../assets/edlc1.png'
import edlc2 from '../assets/edlc2.png'
import edlc3 from '../assets/edlc3.png'
import '../sections/ProjectsSection.css'

export function ElcCompositeVisual() {
  return (
    <div className="elc-composite-wrapper">
      <div className="elc-composite-backdrop" />
      <div className="elc-composite-grid" />

      <div className="elc-composite-container">
        <div className="elc-composite-item">
          <img src={edlc1} alt="ELC Component 1" />
        </div>

        <div className="elc-composite-item">
          <img src={edlc2} alt="ELC Component 2" />
        </div>

        <div className="elc-composite-item">
          <img src={edlc3} alt="ELC Component 3" />
        </div>
      </div>
    </div>
  )
}

