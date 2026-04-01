import './GlitchTransition.css'

function GlitchTransition() {
    return (
        <div className="glitch-transition" aria-hidden="true">
            <div className="glitch-layer glitch-layer-a"/>
            <div className="glitch-layer glitch-layer-b"/>
            <div className="glitch-scan"/>
        </div>
    )
}

export default GlitchTransition

