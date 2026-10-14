import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
const ease = (t) => 1 - Math.pow(1 - t, 3)
export default function HeroDepth({ shapes, pointer, live, W, H, onReady }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true, powerPreference:'low-power' }) } catch { return }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const cam = new THREE.OrthographicCamera(0, W, H, 0, -800, 800) // y ke atas; peta diputar balik lewat grup `flip`
    scene.add(new THREE.AmbientLight(0xfff1e0, 1.0))
    const sun = new THREE.DirectionalLight(0xffe9d2, 2.4)
    sun.position.set(-260, H + 360, 620); sun.target.position.set(W / 2, H / 2, 0)
    sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 7; sun.shadow.bias = -0.0004
    Object.assign(sun.shadow.camera, { left:-700, right:700, top:700, bottom:-700, near:1, far:2400 }); sun.shadow.camera.updateProjectionMatrix()
    scene.add(sun, sun.target)
    const glow = new THREE.PointLight(0xfff4e6, 1.1, 0, 0); glow.position.set(W / 2, H / 2, 160); scene.add(glow)
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.6, H * 1.6), new THREE.ShadowMaterial({ color:0x5a3524, opacity:0, transparent:true }))
    ground.position.set(W / 2, H / 2, -34); ground.receiveShadow = true; scene.add(ground)

    const root = new THREE.Group(); root.position.set(W / 2, H / 2, 0); scene.add(root)
    const flip = new THREE.Group(); flip.scale.set(1, -1, 1); flip.position.set(-W / 2, H / 2, 0); root.add(flip)
    const mats = [], geos = [], isl = [], loader = new SVGLoader()
    shapes.forEach((s) => {
      const mat = new THREE.MeshStandardMaterial({ color:0xcdbfae, roughness:.88, metalness:0, side:THREE.DoubleSide, transparent:true, opacity:0, emissive:0x5a3524, emissiveIntensity:0 })
      mats.push(mat)
      const g = new THREE.Group(); flip.add(g)
      loader.parse(`<svg xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="${s.d}"/></svg>`).paths.forEach(p => SVGLoader.createShapes(p).forEach(sh => {
        const geo = new THREE.ExtrudeGeometry(sh, { depth:22, bevelEnabled:true, bevelThickness:4, bevelSize:3, bevelSegments:3, curveSegments:8 }); geos.push(geo)
        const m = new THREE.Mesh(geo, mat); m.position.z = -26; m.castShadow = true; m.receiveShadow = true; g.add(m)
      }))
      const n = s.d.match(/-?\d+\.?\d*/g).map(Number), xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1)
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2
      isl.push({ slug:s.slug, g, mat, lift:0, ox:(cx - W / 2) * .5, oy:(cy - H / 2) * .5 - 50 })
    })
    // Tekstur dipasang setelah termuat; jika file hilang, pulau tetap tampil polos (tidak hitam).
    const tl = new THREE.TextureLoader(), texs = []
    const prep = (t, srgb) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1 / 380, 1 / 380); t.anisotropy = 4; if (srgb) t.colorSpace = THREE.SRGBColorSpace; texs.push(t); return t }
    tl.load('/textures/stone-color.jpg', (t) => { prep(t, true); mats.forEach(m => { m.map = t; m.needsUpdate = true }) })
    tl.load('/textures/stone-normal.jpg', (t) => { prep(t, false); mats.forEach(m => { m.normalMap = t; m.normalScale.set(1.5, 1.5); m.needsUpdate = true }) })

    const resize = () => renderer.setSize(el.clientWidth, el.clientHeight, false)
    resize(); const ro = new ResizeObserver(resize); ro.observe(el)
    const t0 = performance.now(); let raf = 0, visible = true, ready = false
    const loop = () => {
      if (!visible) { raf = 0; return }
      const now = (performance.now() - t0) / 1000; let sum = 0
      isl.forEach((o, i) => {
        const e = ease(Math.min(1, Math.max(0, (now - .15 - i * .1) / 2.2))); sum += e
        o.lift += ((live.current.hover === o.slug ? 1 : 0) - o.lift) * .12
        o.g.position.set(o.ox * (1 - e), o.oy * (1 - e) - o.lift * 9, o.lift * 18)
        o.mat.opacity = e
        if (o.mat.transparent !== e < 1) { o.mat.transparent = e < 1; o.mat.needsUpdate = true }
        o.mat.emissiveIntensity += ((live.current.active === o.slug ? .35 : 0) - o.mat.emissiveIntensity) * .1
      })
      ground.material.opacity = .4 * sum / isl.length
      root.rotation.y += (pointer.current.x * .12 - root.rotation.y) * .06
      root.rotation.x += (-pointer.current.y * .12 - root.rotation.x) * .06
      glow.position.x = (pointer.current.x * .5 + .5) * W; glow.position.y = H - (pointer.current.y * .5 + .5) * H
      renderer.render(scene, cam)
      if (!ready) { ready = true; onReady?.() }
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) loop() }); io.observe(el)
    loop()
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose()); texs.forEach(t => t.dispose()); ground.geometry.dispose(); ground.material.dispose(); renderer.dispose(); renderer.domElement.remove() }
  }, [shapes, pointer, live, W, H, onReady])
  return <div ref={ref} aria-hidden="true" className="absolute inset-0 pointer-events-none [&>canvas]:w-full [&>canvas]:h-full" />
}
