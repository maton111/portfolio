import {useEffect, useRef, useState} from 'react'
import createGlobe from 'cobe'

type SystemLocationGlobeProps = {
  locationLabel?: string
  fallbackImage: string
}

function SystemLocationGlobe({ locationLabel, fallbackImage }: SystemLocationGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    let size = 0
    let phi = 0
    let pulse = 0
    let frameId = 0
    let resizeObserver: ResizeObserver | undefined

    const getDpr = () => Math.min(window.devicePixelRatio || 1, 2)

    const updateSize = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      size = Math.max(0, Math.floor(Math.min(rect.width, rect.height)))
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    if (containerRef.current && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateSize)
      resizeObserver.observe(containerRef.current)
    }

    try {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: getDpr(),
        width: size * getDpr(),
        height: size * getDpr(),
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
          width: size * getDpr(),
          height: size * getDpr(),
          phi,
          theta: 0.3 + Math.sin(pulse) * 0.035,
          scale: 1 + Math.sin(pulse) * 0.01,
        })

        frameId = window.requestAnimationFrame(render)
      }

      frameId = window.requestAnimationFrame(render)

      return () => {
        window.removeEventListener('resize', updateSize)
        resizeObserver?.disconnect()
        window.cancelAnimationFrame(frameId)
        globe.destroy()
      }
    } catch {
      setHasError(true)
      window.removeEventListener('resize', updateSize)
      resizeObserver?.disconnect()
    }

    return undefined
  }, [])

  return (
    <div ref={containerRef} className="location-map" aria-hidden="true">
      {hasError ? (
        <img src={fallbackImage} alt="" className="location-map-fallback" />
      ) : (
        <canvas ref={canvasRef} className="location-globe-canvas" />
      )}
      <div className="location-map-grid" />
      {locationLabel ? <p>{locationLabel}</p> : null}
    </div>
  )
}

export default SystemLocationGlobe



