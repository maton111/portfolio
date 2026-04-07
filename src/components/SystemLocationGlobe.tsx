import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

type SystemLocationGlobeProps = {
  locationLabel: string
  fallbackImage: string
}

function SystemLocationGlobe({ locationLabel, fallbackImage }: SystemLocationGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    let size = 0
    let phi = 0
    let pulse = 0
    let frameId = 0

    const updateSize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      size = Math.max(0, Math.floor(Math.min(rect.width, rect.height)))
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    try {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width: size * 2,
        height: size * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.25,
        mapSamples: 12000,
        mapBrightness: 5,
        baseColor: [0.06, 0.2, 0.12],
        markerColor: [0.3, 1, 0.62],
        glowColor: [0.08, 0.32, 0.18],
        markers: [{ location: [45.0703, 7.6869], size: 0.09 }],
      })

      const render = () => {
        phi += 0.005
        pulse += 0.03

        globe.update({
          width: size * 2,
          height: size * 2,
          phi,
          theta: 0.3 + Math.sin(pulse) * 0.035,
          scale: 1 + Math.sin(pulse) * 0.01,
        })

        frameId = window.requestAnimationFrame(render)
      }

      frameId = window.requestAnimationFrame(render)

      return () => {
        window.removeEventListener('resize', updateSize)
        window.cancelAnimationFrame(frameId)
        globe.destroy()
      }
    } catch {
      setHasError(true)
      window.removeEventListener('resize', updateSize)
    }

    return undefined
  }, [])

  return (
    <div className="location-map" aria-hidden="true">
      {hasError ? (
        <img src={fallbackImage} alt="" className="location-map-fallback" />
      ) : (
        <canvas ref={canvasRef} className="location-globe-canvas" />
      )}
      <div className="location-map-grid" />
      <p>{locationLabel}</p>
    </div>
  )
}

export default SystemLocationGlobe



