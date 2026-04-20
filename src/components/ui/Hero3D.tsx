import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import logoFile from '../../assets/logo.png'

interface Hero3DProps {
  theme?: string
}

export default function Hero3D({ theme = 'dark' }: Hero3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<{ applyTheme?: () => void; pulseT?: number }>({})

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = () => mount.clientWidth
    const H = () => mount.clientHeight

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      const pick = (name: string, fallback: string) => new THREE.Color(cs.getPropertyValue(name).trim() || fallback)
      return {
        fog:   pick('--hero-fog',        '#0b0f0c'),
        grid:  pick('--hero-grid-major', '#00ff88'),
        grid2: pick('--hero-grid-minor', '#42e09c'),
        pA:    pick('--hero-particle-a', '#00ff88'),
        pB:    pick('--hero-particle-b', '#42e09c'),
        pC:    pick('--hero-particle-c', '#ff7a00'),
      }
    }

    let C = readColors()

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(C.fog.getHex(), 0.038)

    const camera = new THREE.PerspectiveCamera(52, W() / H(), 0.1, 120)
    camera.position.set(0, 0.8, 14)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W(), H())
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // 1. Scrolling terrain grid floor
    const gridGeom = new THREE.PlaneGeometry(60, 60, 60, 60)
    const gridMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime:   { value: 0 },
        uColor:  { value: new THREE.Color(C.grid) },
        uColor2: { value: new THREE.Color(C.grid2) },
        uPulse:  { value: 0 },
      },
      vertexShader: `
        uniform float uTime, uPulse;
        varying float vH; varying vec2 vUv;
        void main() {
          vec3 p = position;
          float d = length(p.xy);
          float h = sin(p.x*0.25+uTime*0.8)*0.4 + cos(p.y*0.3-uTime*0.7)*0.4 + sin(d*0.4-uTime*1.2)*0.3;
          float ring = sin(d*1.1-uPulse*10.0)*exp(-d*0.08)*uPulse;
          p.z = h + ring*1.4; vH = p.z; vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor, uColor2;
        varying float vH; varying vec2 vUv;
        void main() {
          vec2 g = abs(fract(vUv*60.0-0.5)-0.5)/fwidth(vUv*60.0);
          float line = 1.0 - min(min(g.x,g.y),1.0);
          vec3 col = mix(uColor2, uColor, smoothstep(-0.4,0.6,vH));
          float edge = smoothstep(0.5,0.35,length(vUv-0.5));
          gl_FragColor = vec4(col, line*(0.55+vH*0.15)*edge*0.75);
        }
      `,
      wireframe: true,
      depthWrite: false,
    })
    const grid = new THREE.Mesh(gridGeom, gridMat)
    grid.rotation.x = -Math.PI * 0.5
    grid.position.set(0, -5.5, 0)
    scene.add(grid)

    // 2. Core wireframe icosahedron + rings
    const coreGeom = new THREE.IcosahedronGeometry(1.8, 1)
    const coreMat = new THREE.MeshBasicMaterial({ color: C.grid.getHex(), wireframe: true, transparent: true, opacity: 0.35 })
    const core = new THREE.Mesh(coreGeom, coreMat)
    scene.add(core)

    const torusGeom = new THREE.TorusGeometry(3.2, 0.015, 8, 160)
    const torusMat = new THREE.MeshBasicMaterial({ color: C.grid2.getHex(), transparent: true, opacity: 0.55 })
    const torus = new THREE.Mesh(torusGeom, torusMat)
    torus.rotation.x = Math.PI * 0.5 - 0.35
    scene.add(torus)

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(4.4, 0.012, 8, 200),
      new THREE.MeshBasicMaterial({ color: C.pC.getHex(), transparent: true, opacity: 0.32 })
    )
    torus2.rotation.set(Math.PI * 0.5 - 0.6, 0.4, 0.2)
    scene.add(torus2)

    // 3. Logo-shaped particle cloud
    const particleCount = 6800
    const positions = new Float32Array(particleCount * 3)
    const targets   = new Float32Array(particleCount * 3)
    const randoms   = new Float32Array(particleCount * 3)
    const colors    = new Float32Array(particleCount * 3)
    const sizes     = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const r = 6 + Math.random() * 2
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      targets[i*3]   = r * Math.sin(ph) * Math.cos(th)
      targets[i*3+1] = r * Math.sin(ph) * Math.sin(th)
      targets[i*3+2] = r * Math.cos(ph) * 0.4
      positions[i*3] = targets[i*3]; positions[i*3+1] = targets[i*3+1]; positions[i*3+2] = targets[i*3+2]
      randoms[i*3] = Math.random()*2-1; randoms[i*3+1] = Math.random()*2-1; randoms[i*3+2] = Math.random()*2-1
      const t = Math.random()
      const col = t < 0.72 ? C.pA : t < 0.92 ? C.pB : C.pC
      colors[i*3] = col.r; colors[i*3+1] = col.g; colors[i*3+2] = col.b
      sizes[i] = 0.04 + Math.random() * 0.06
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('aTarget',  new THREE.BufferAttribute(targets,   3))
    geom.setAttribute('aRandom',  new THREE.BufferAttribute(randoms,   3))
    geom.setAttribute('aColor',   new THREE.BufferAttribute(colors,    3))
    geom.setAttribute('aSize',    new THREE.BufferAttribute(sizes,     1))

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = logoFile
    img.onload = () => {
      const TW = 180, TH = 180
      const cnv = document.createElement('canvas')
      cnv.width = TW; cnv.height = TH
      const ctx = cnv.getContext('2d')!
      ctx.drawImage(img, 0, 0, TW, TH)
      const data = ctx.getImageData(0, 0, TW, TH).data
      const pts: [number, number][] = []
      for (let y = 0; y < TH; y++) for (let x = 0; x < TW; x++)
        if (data[(y * TW + x) * 4 + 3] > 120) pts.push([x, y])
      if (!pts.length) return
      const ta = geom.getAttribute('aTarget') as THREE.BufferAttribute
      for (let i = 0; i < particleCount; i++) {
        const [px, py] = pts[(Math.random() * pts.length) | 0]
        ta.array[i*3]   =  (px - TW/2) / TW * 9.2
        ta.array[i*3+1] = -(py - TH/2) / TH * 9.2
        ta.array[i*3+2] = (Math.random() - 0.5) * 0.8
      }
      ta.needsUpdate = true
    }

    const pMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:    { value: 0 }, uMorph:   { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uRepel:   { value: 0 }, uPulse:   { value: 0 },
      },
      vertexShader: `
        attribute vec3 aTarget, aRandom, aColor; attribute float aSize;
        uniform float uTime, uMorph, uRepel, uPulse; uniform vec2 uPointer;
        varying vec3 vColor; varying float vGlow;
        void main() {
          vec3 chaos = position + vec3(sin(uTime*0.6+aRandom.x*6.2)*0.35,cos(uTime*0.5+aRandom.y*6.2)*0.35,sin(uTime*0.7+aRandom.z*6.2)*0.35);
          vec3 logoP = aTarget + vec3(sin(uTime*1.1+aRandom.x*6.2)*0.04,cos(uTime*1.2+aRandom.y*6.2)*0.04,sin(uTime*0.9+aRandom.z*6.2)*0.28);
          vec3 p = mix(chaos, logoP, uMorph);
          vec2 dxy = p.xy - uPointer; float d = length(dxy)+0.0001;
          float push = exp(-d*d*0.5)*uRepel;
          p.xy += normalize(dxy)*push*1.6; p.z += push*0.8;
          float ring = sin((d*1.6-uPulse*6.0))*exp(-d*0.6);
          p.z += ring*uPulse*0.6;
          vec4 mv = modelViewMatrix*vec4(p,1.0);
          gl_Position = projectionMatrix*mv;
          gl_PointSize = aSize*120.0*(1.0+push*2.0+abs(ring)*uPulse*1.5)/-mv.z;
          vColor = aColor; vGlow = push+abs(ring)*uPulse;
        }
      `,
      fragmentShader: `
        varying vec3 vColor; varying float vGlow;
        void main() {
          vec2 uv = gl_PointCoord-0.5; float d = length(uv);
          float a = smoothstep(0.5,0.0,d); float core = smoothstep(0.25,0.0,d);
          gl_FragColor = vec4(vColor+core*vec3(0.6,0.8,0.6)+vGlow*vec3(1.0,0.8,0.3), a);
        }
      `,
    })

    const points = new THREE.Points(geom, pMat)
    scene.add(points)

    // 4. Satellite shards
    type ShardDef = { r: number; s: number; y: number; ph: number; col: THREE.Color }
    const shardDefs: ShardDef[] = [
      { r: 5.2, s: 0.32, y:  0.8, ph: 0.0, col: C.grid },
      { r: 6.1, s: 0.26, y: -1.1, ph: 1.7, col: C.pC   },
      { r: 5.6, s: 0.18, y:  1.7, ph: 3.2, col: C.grid2 },
      { r: 6.6, s: 0.22, y: -0.6, ph: 4.6, col: C.grid  },
      { r: 5.9, s: 0.28, y:  0.3, ph: 5.9, col: C.pC   },
    ]
    const shards = new THREE.Group()
    type ShardMeta = { def: ShardDef; wire: THREE.LineSegments; tick: THREE.LineSegments; mat: THREE.LineBasicMaterial; tickMat: THREE.LineBasicMaterial; geom: THREE.BoxGeometry; edges: THREE.EdgesGeometry; tickGeom: THREE.BufferGeometry }
    const shardMeta: ShardMeta[] = shardDefs.map(def => {
      const g = new THREE.BoxGeometry(0.28, 0.28, 0.28)
      const e = new THREE.EdgesGeometry(g)
      const m = new THREE.LineBasicMaterial({ color: def.col.getHex(), transparent: true, opacity: 0.75 })
      const w = new THREE.LineSegments(e, m)
      shards.add(w)
      const tG = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([-0.6,0,0, 0.6,0,0, 0,-0.6,0, 0,0.6,0], 3))
      const tM = new THREE.LineBasicMaterial({ color: def.col.getHex(), transparent: true, opacity: 0.25 })
      const tick = new THREE.LineSegments(tG, tM)
      shards.add(tick)
      return { def, wire: w, tick, mat: m, tickMat: tM, geom: g, edges: e, tickGeom: tG }
    })
    scene.add(shards)

    const scanGeom = new THREE.PlaneGeometry(30, 0.06)
    const scanMat = new THREE.MeshBasicMaterial({ color: C.grid.getHex(), transparent: true, opacity: 0, depthWrite: false })
    const scan = new THREE.Mesh(scanGeom, scanMat)
    scan.rotation.x = -Math.PI * 0.5
    scan.position.y = -5.4
    scene.add(scan)

    // Interaction
    const ptr = { x: 0, y: 0 }; let repel = 0
    const pWorld = new THREE.Vector3()

    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect()
      ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1
      ptr.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
      pWorld.set(ptr.x, ptr.y, 0.5).unproject(camera)
      const dir = pWorld.sub(camera.position).normalize()
      const world = camera.position.clone().add(dir.multiplyScalar(-camera.position.z / dir.z))
      pMat.uniforms.uPointer.value.set(world.x, world.y)
    }
    const onEnter = () => { repel = 1 }
    const onLeave = () => { repel = 0 }
    const onClick = () => { apiRef.current.pulseT = 1.0 }

    mount.addEventListener('pointermove', onMove)
    mount.addEventListener('pointerenter', onEnter)
    mount.addEventListener('pointerleave', onLeave)
    mount.addEventListener('click', onClick)

    const ro = new ResizeObserver(() => {
      renderer.setSize(W(), H())
      camera.aspect = W() / H()
      camera.updateProjectionMatrix()
    })
    ro.observe(mount)

    apiRef.current.applyTheme = () => {
      C = readColors()
      if (scene.fog instanceof THREE.FogExp2) scene.fog.color.set(C.fog)
      gridMat.uniforms.uColor.value.set(C.grid)
      gridMat.uniforms.uColor2.value.set(C.grid2)
      ;(coreMat as THREE.MeshBasicMaterial).color.set(C.grid)
      ;(torusMat as THREE.MeshBasicMaterial).color.set(C.grid2)
      ;(torus2.material as THREE.MeshBasicMaterial).color.set(C.pC)
      scanMat.color.set(C.grid)
      const palette = [C.pA, C.pA, C.pA, C.pB, C.pC]
      const arr = (geom.getAttribute('aColor') as THREE.BufferAttribute).array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const col = palette[(Math.random() * palette.length) | 0]
        arr[i*3] = col.r; arr[i*3+1] = col.g; arr[i*3+2] = col.b
      }
      ;(geom.getAttribute('aColor') as THREE.BufferAttribute).needsUpdate = true
      shardMeta.forEach(sm => {
        const col = sm.def.col === C.grid ? C.grid : sm.def.col === C.pC ? C.pC : C.grid2
        sm.mat.color.set(col); sm.tickMat.color.copy(sm.mat.color)
      })
    }

    let morphTarget = 0
    setTimeout(() => { morphTarget = 1 }, 500)

    const clock = new THREE.Clock()
    let raf: number
    const animate = () => {
      const dt = clock.getDelta(), t = clock.getElapsedTime()
      const api = apiRef.current

      pMat.uniforms.uMorph.value += (morphTarget - pMat.uniforms.uMorph.value) * Math.min(1, dt * 0.8)
      pMat.uniforms.uRepel.value += (repel - pMat.uniforms.uRepel.value) * Math.min(1, dt * 6)
      api.pulseT = (api.pulseT ?? 0) * Math.pow(0.001, dt)
      pMat.uniforms.uPulse.value   = api.pulseT
      gridMat.uniforms.uPulse.value = api.pulseT
      pMat.uniforms.uTime.value    = t
      gridMat.uniforms.uTime.value  = t

      camera.position.x += (ptr.x * 1.6 - camera.position.x) * 0.05
      camera.position.y += (0.8 + ptr.y * 1.0 - camera.position.y) * 0.05
      camera.lookAt(0, 0.3, 0)

      core.rotation.x = t * 0.25; core.rotation.y = t * 0.4
      torus.rotation.z = t * 0.2; torus2.rotation.z = -t * 0.12
      points.rotation.y = Math.sin(t * 0.15) * 0.1 + ptr.x * 0.15
      points.rotation.x = Math.cos(t * 0.12) * 0.05 + ptr.y * 0.1

      shardMeta.forEach((sm, i) => {
        const a = t * sm.def.s + sm.def.ph
        sm.wire.position.set(Math.cos(a) * sm.def.r, sm.def.y + Math.sin(t * 0.7 + i) * 0.3, Math.sin(a) * sm.def.r * 0.6)
        sm.wire.rotation.set(t * 0.3 + i, t * 0.2 + i * 0.7, 0)
        sm.tick.position.copy(sm.wire.position)
        sm.tick.rotation.z = t * 0.4 + i
      })

      const sweep = (t * 1.2) % 8 - 4
      scan.position.z = sweep
      scanMat.opacity = 0.55 * Math.max(0, 1 - Math.abs(sweep) / 4)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mount.removeEventListener('pointermove', onMove)
      mount.removeEventListener('pointerenter', onEnter)
      mount.removeEventListener('pointerleave', onLeave)
      mount.removeEventListener('click', onClick)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
      ;[geom, gridGeom, coreGeom, torusGeom, scanGeom].forEach(g => g.dispose())
      ;[pMat, gridMat, coreMat, torusMat, scanMat].forEach(m => m.dispose())
      ;(torus2.geometry as THREE.BufferGeometry).dispose()
      ;(torus2.material as THREE.Material).dispose()
      shardMeta.forEach(sm => { sm.geom.dispose(); sm.edges.dispose(); sm.tickGeom.dispose(); sm.mat.dispose(); sm.tickMat.dispose() })
    }
  }, [])

  useEffect(() => {
    apiRef.current.applyTheme?.()
  }, [theme])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
      aria-hidden="true"
    />
  )
}
