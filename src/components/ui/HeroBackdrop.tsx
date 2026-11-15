import { useEffect, useRef } from 'react'
import './HeroBackdrop.css'

/**
 * Hero background: a living topographic map rendered by one WebGL2 fragment shader.
 * A slowly flowing height field is drawn as glowing contour lines with relief shading;
 * the pointer raises the terrain under it and every click sends a shockwave through it.
 * No 3D library: a single full-screen triangle and ~100 lines of GLSL.
 */

const MAX_RIPPLES = 4

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform vec2 uRes;
uniform float uTime;
uniform float uIntro;
uniform vec2 uPointer;
uniform float uHover;
uniform vec3 uRipples[${MAX_RIPPLES}];
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;
uniform float uStrength;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

const mat2 ROT = mat2(0.8, -0.6, 0.6, 0.8);

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = ROT * p * 2.03 + 11.7;
    amplitude *= 0.42;
  }
  return value;
}

// Screen → ground plane. The plane is tilted away from the viewer, so the map
// recedes towards the top of the hero and reads as a landscape, not a flat texture.
vec2 ground(vec2 s) {
  float depth = 1.0 + (s.y + 0.5) * 1.25;
  return vec2(s.x * depth, (s.y + 0.5) * depth * 1.5 - 0.6);
}

float terrain(vec2 p) {
  float t = uTime * 0.04;
  vec2 q = p * 1.25;
  vec2 warp = vec2(fbm(q + vec2(0.0, t)), fbm(q + vec2(5.2, -t * 1.3)));
  float h = fbm(q + 1.7 * warp + vec2(t * 0.7, 0.0));

  // The pointer lifts the ground under it.
  vec2 toPointer = p - ground(uPointer);
  h += uHover * 0.2 * exp(-dot(toPointer, toPointer) * 7.0);

  // Click shockwaves: an expanding, decaying ring.
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    float age = uTime - uRipples[i].z;
    if (age > 0.0 && age < 4.0) {
      float wave = length(p - ground(uRipples[i].xy)) - age * 0.7;
      h += 0.085 * sin(wave * 24.0) * exp(-wave * wave * 26.0) * exp(-age * 0.9);
    }
  }
  return h;
}

float isoline(float v, float width) {
  float fw = fwidth(v);
  return 1.0 - smoothstep(0.0, width * fw, abs(fract(v - 0.5) - 0.5));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 world = ground(uv);
  float h = terrain(world);

  // Contours: thin lines every level, a heavier index line every fifth.
  float levels = h * 26.0;
  float minor = isoline(levels, 1.2);
  float major = isoline(levels * 0.2, 2.0);

  // Relief shading from the screen-space gradient of the height field.
  vec2 grad = vec2(dFdx(h), dFdy(h)) * uRes.y;
  vec3 normal = normalize(vec3(-grad * 0.55, 1.0));
  float light = clamp(dot(normal, normalize(vec3(-0.55, 0.65, 0.5))), 0.0, 1.0);

  vec2 fromPointer = world - ground(uPointer);
  float pointerGlow = uHover * exp(-dot(fromPointer, fromPointer) * 3.5);

  // A slow diagonal scan that makes the lines flare as it passes.
  float scanPos = fract(uTime * 0.055) * 3.6 - 1.8;
  float scan = exp(-pow((uv.x * 0.85 + uv.y * 0.5 - scanPos) * 5.0, 2.0));

  float peak = smoothstep(0.62, 0.78, h);
  vec3 lineColor = mix(uColB, uColA, smoothstep(0.28, 0.6, h));
  lineColor = mix(lineColor, uColC, peak);

  float lineAlpha = (minor * 0.34 + major * 0.7) * (0.4 + 0.6 * light);
  lineAlpha *= 1.0 + 2.4 * pointerGlow + 1.5 * scan;

  // Soft fill: lit slopes glow faintly, so the map reads as a surface and not only as lines.
  float fillAlpha = pow(light, 4.0) * 0.05 + pointerGlow * 0.12 + peak * 0.05;
  vec3 fillColor = mix(uColA, uColC, peak);

  // Sparse survey nodes that blink on a grid.
  vec2 cellUv = world * 9.0;
  vec2 cell = floor(cellUv);
  float seed = hash(cell);
  float node = smoothstep(0.075, 0.03, length(fract(cellUv) - 0.5));
  float blink = smoothstep(0.55, 1.0, sin(uTime * (0.6 + seed * 1.6) + seed * 40.0));
  float nodeAlpha = node * step(0.86, seed) * (0.2 + 0.8 * blink);

  float alpha = clamp(lineAlpha, 0.0, 1.0);
  vec3 color = lineColor * alpha;
  color += fillColor * fillAlpha;
  alpha += fillAlpha;
  color += uColA * nodeAlpha;
  alpha += nodeAlpha;

  // Intro: the map is revealed by a ring expanding from the right-hand side.
  float aspect = uRes.x / uRes.y;
  float reach = length(uv - vec2(0.22 * aspect, 0.0));
  float front = uIntro * (aspect + 0.6);
  float reveal = smoothstep(front, front - 0.35, reach);
  float edge = exp(-pow((reach - front) * 9.0, 2.0)) * (1.0 - uIntro);
  color += uColA * edge * 0.5;
  alpha += edge * 0.5;

  // Dissolve into the page at the bottom edge, and into haze towards the horizon.
  float fade = smoothstep(-0.5, -0.3, uv.y) * mix(1.0, 0.3, smoothstep(0.05, 0.5, uv.y));

  float mask = reveal * fade * uStrength;
  fragColor = vec4(color * mask, clamp(alpha, 0.0, 1.0) * mask);
}`

type Rgb = [number, number, number]

function readColor(name: string, fallback: Rgb): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const match = /^#([0-9a-f]{6})$/i.exec(raw)
  if (!match) return fallback
  const value = parseInt(match[1], 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[HeroBackdrop] shader compile failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

type HeroBackdropProps = {
  theme: 'dark' | 'light'
}

function HeroBackdrop({ theme }: HeroBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const applyThemeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: true, powerPreference: 'high-performance' })
    if (!gl) return // The CSS fallback behind the canvas stays visible.

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!vertex || !fragment || !program) return

    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[HeroBackdrop] program link failed:', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // One oversized triangle covers the viewport.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uniform = (name: string) => gl.getUniformLocation(program, name)
    const uRes = uniform('uRes')
    const uTime = uniform('uTime')
    const uIntro = uniform('uIntro')
    const uPointer = uniform('uPointer')
    const uHover = uniform('uHover')
    const uRipples = uniform('uRipples')
    const uColA = uniform('uColA')
    const uColB = uniform('uColB')
    const uColC = uniform('uColC')
    const uStrength = uniform('uStrength')

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ripples = new Float32Array(MAX_RIPPLES * 3).fill(-100)
    let rippleIndex = 0

    const pointer = { x: 0.3, y: 0, targetX: 0.3, targetY: 0, hover: 0, targetHover: 0 }
    let width = 1
    let height = 1

    const applyTheme = () => {
      const light = document.documentElement.getAttribute('data-theme') === 'light'
      gl.uniform3fv(uColA, readColor('--hero-grid-major', [0, 1, 0.53]))
      gl.uniform3fv(uColB, readColor('--hero-grid-minor', [0.26, 0.88, 0.61]))
      gl.uniform3fv(uColC, readColor('--hero-particle-c', [1, 0.48, 0]))
      gl.uniform1f(uStrength, light ? 0.8 : 1)
      if (!running) draw()
    }
    applyThemeRef.current = applyTheme

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, rect.width < 700 ? 1.25 : 1.5)
      width = Math.max(1, Math.round(rect.width * dpr))
      height = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, width, height)
      gl.uniform2f(uRes, width, height)
      if (!running) draw()
    }

    // Client coordinates → the shader's aspect-corrected space (origin at the centre, y up).
    const toShaderSpace = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: (clientX - rect.left - rect.width / 2) / rect.height,
        y: -(clientY - rect.top - rect.height / 2) / rect.height,
        inside: clientY >= rect.top && clientY <= rect.bottom,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const point = toShaderSpace(event.clientX, event.clientY)
      pointer.targetX = point.x
      pointer.targetY = point.y
      pointer.targetHover = point.inside ? 1 : 0
    }

    const onPointerDown = (event: PointerEvent) => {
      const point = toShaderSpace(event.clientX, event.clientY)
      if (!point.inside) return
      ripples.set([point.x, point.y, time], rippleIndex * 3)
      rippleIndex = (rippleIndex + 1) % MAX_RIPPLES
    }

    const onPointerLeave = () => {
      pointer.targetHover = 0
    }

    let time = reducedMotion ? 24 : 0
    let intro = reducedMotion ? 1 : 0
    let last = 0
    let frame = 0
    let running = false

    function draw() {
      gl!.uniform1f(uTime, time)
      gl!.uniform1f(uIntro, intro)
      gl!.uniform2f(uPointer, pointer.x, pointer.y)
      gl!.uniform1f(uHover, pointer.hover)
      gl!.uniform3fv(uRipples, ripples)
      gl!.clearColor(0, 0, 0, 0)
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }

    const tick = (now: number) => {
      if (!running) return
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016)
      last = now
      time += dt
      intro = Math.min(1, intro + dt / 2.4)

      const ease = Math.min(1, dt * 5)
      pointer.x += (pointer.targetX - pointer.x) * ease
      pointer.y += (pointer.targetY - pointer.y) * ease
      pointer.hover += (pointer.targetHover - pointer.hover) * Math.min(1, dt * 3)

      draw()
      frame = requestAnimationFrame(tick)
    }

    // Render only while the hero is on screen and the tab is visible.
    let inView = true
    const syncLoop = () => {
      const shouldRun = !reducedMotion && inView && !document.hidden
      if (shouldRun === running) return
      running = shouldRun
      if (running) {
        last = 0
        frame = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(frame)
      }
    }

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncLoop()
    })
    intersection.observe(canvas)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    resize()
    applyTheme()
    canvas.classList.add('is-ready')

    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerdown', onPointerDown, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
    }
    document.addEventListener('visibilitychange', syncLoop)
    syncLoop()

    return () => {
      running = false
      cancelAnimationFrame(frame)
      intersection.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', syncLoop)
      applyThemeRef.current = null
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    }
  }, [])

  useEffect(() => {
    applyThemeRef.current?.()
  }, [theme])

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-backdrop-canvas" />
    </div>
  )
}

export default HeroBackdrop
