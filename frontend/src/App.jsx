import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import anime from 'animejs'
import * as THREE from 'three'
import { Search, Menu, ArrowRight, ArrowLeft, ChevronRight, ChevronDown, Instagram, Youtube, Twitter, Compass } from 'lucide-react'
import { IMG, CATS, GRID, LIVING, DETAIL, fetchIslands } from './data'
gsap.registerPlugin(ScrollTrigger)

function Img({ src, className = '', alt = '', ...p }) {
  const [ok, setOk] = useState(true)
  return <img src={ok ? src : undefined} alt={alt} loading="lazy" onError={() => setOk(false)} className={`photo object-cover ${className}`} {...p} />
}

function Dust() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current, w = el.clientWidth, h = el.clientHeight
    const r = new THREE.WebGLRenderer({ alpha: true, antialias: true }); r.setSize(w, h); r.setPixelRatio(Math.min(devicePixelRatio, 2)); el.appendChild(r.domElement)
    const cam = new THREE.PerspectiveCamera(50, w / h, 0.1, 100); cam.position.z = 8
    const sc = new THREE.Scene(), n = 380, pos = new Float32Array(n * 3)
    for (let i = 0; i < n * 3; i += 3) { pos[i] = (Math.random() - .5) * 22; pos[i + 1] = (Math.random() - .5) * 11; pos[i + 2] = (Math.random() - .5) * 8 }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0x6b4a36, size: .035, transparent: true, opacity: .55 })); sc.add(pts)
    let mx = 0, my = 0; const mm = (e) => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5 }
    addEventListener('mousemove', mm)
    const tick = (t) => { pts.rotation.y = t * 0.00004 + mx * .25; pts.rotation.x = my * .15; pts.position.y = Math.sin(t * .0003) * .15; r.render(sc, cam); id = requestAnimationFrame(tick) }
    let id = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(id); removeEventListener('mousemove', mm); r.dispose(); el.removeChild(r.domElement) }
  }, [])
  return <div ref={ref} className="pointer-events-none absolute inset-0" />
}

const PATHS = {
  Sumatra: 'M40 120 L110 150 L200 235 L235 275 L200 290 L120 235 L60 170Z',
  Kalimantan: 'M330 150 L400 105 L470 130 L505 205 L470 275 L400 285 L340 240Z',
  Sulawesi: 'M545 170 L590 185 L565 225 L610 258 L575 285 L548 240 L525 205Z',
  Jawa: 'M270 335 L420 348 L520 352 L510 368 L400 368 L280 352Z',
  Bali: 'M532 356 L552 353 L554 367 L534 369Z',
  'Nusa Tenggara': 'M572 360 L700 346 L722 360 L582 373Z',
  Maluku: 'M655 170 L695 190 L682 232 L650 212Z',
  Papua: 'M725 200 L825 190 L905 240 L885 305 L800 292 L760 262 L732 240Z',
}
const CALL = [
  { n: 'Candi Prambanan', s: 'Jawa', img: IMG.prambanan, x: '55%', y: '9%' },
  { n: 'Rumah Gadang', s: 'Sumatra', img: IMG.gadang, x: '20%', y: '30%' },
  { n: 'Angklung', s: 'West Papua', img: IMG.angklung, x: '85%', y: '34%' },
  { n: 'Rendang', s: 'Sumatra', img: IMG.rendang, x: '3%', y: '70%' },
  { n: 'Tari Kecak', s: 'Bali', img: IMG.barong, x: '33%', y: '82%' },
]

function Hero({ onEnter }) {
  const [hov, setHov] = useState(null), [co, setCo] = useState([0.7893, 113.9213]), compass = useRef()
  useEffect(() => { anime({ targets: compass.current, rotate: '1turn', duration: 40000, easing: 'linear', loop: true }) }, [])
  const mv = (e) => { const b = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height
    setCo([(y * 22 - 11).toFixed(4), (95 + x * 46).toFixed(4)]) }
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-24 md:px-12" onMouseMove={mv}>
      <Dust />
      <div className="relative">
        <p className="label" data-hero>EXPLORE THE DIVERSE CULTURE OF</p>
        <h1 data-hero className="font-serif text-[clamp(3.5rem,10vw,7.5rem)] font-medium leading-none text-cocoa">NUSANTARA</h1>
        <p data-hero className="mt-3 max-w-xs font-serif text-lg leading-snug text-cocoa/80">More than islands,<br />it's a thousand stories.</p>
        <div data-hero className="absolute right-0 top-0 hidden max-w-[210px] text-[11px] leading-relaxed text-ink/70 md:block">
          Dari Sabang sampai Merauke, setiap pulau di Indonesia menyimpan keindahan budaya yang unik. Mari jelajahi kekayaan tradisi, kuliner, arsitektur, musik, dan kehidupan masyarakatnya.
          <div className="my-4 h-px w-6 bg-cocoa" />
          <button onClick={onEnter} className="inline-flex items-center gap-2 text-cocoa">Mulai Jelajahi <ArrowRight size={14} /></button>
        </div>
        <div className="relative mx-auto mt-6 aspect-[1000/440] w-full max-w-[1250px]">
          <svg viewBox="0 0 1000 440" className="absolute inset-0 h-full w-full" aria-label="Peta Indonesia">
            <defs><filter id="rough"><feTurbulence baseFrequency=".035" numOctaves="4" seed="3" /><feDisplacementMap in="SourceGraphic" scale="22" />
              <feDropShadow dx="6" dy="9" stdDeviation="6" floodColor="#4a2316" floodOpacity=".3" /></filter>
              <pattern id="tex" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#3d2d24" /><circle cx="4" cy="4" r="2" fill="#8a7566" /><circle cx="11" cy="10" r="1.4" fill="#cbbba9" /></pattern></defs>
            <g filter="url(#rough)">
              {Object.entries(PATHS).map(([k, d]) => (
                <motion.path key={k} d={d} fill="url(#tex)" stroke="#e9ddd0" strokeWidth="1.5" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }} transition={{ duration: .9, delay: Object.keys(PATHS).indexOf(k) * .1 }} style={{ transformBox: 'fill-box', transformOrigin: 'center', cursor: 'pointer' }}
                  onMouseEnter={() => setHov(k)} onMouseLeave={() => setHov(null)} onClick={() => onEnter(k)} />
              ))}
            </g>
          </svg>
          {CALL.map((c) => (
            <motion.div key={c.n} whileHover={{ y: -4 }} className="absolute flex items-end gap-2 text-[10px] leading-tight text-cocoa" style={{ left: c.x, top: c.y }}>
              <Img src={c.img} className="h-14 w-16 md:h-[72px] md:w-[78px]" /><span>{c.n}<br /><span className="text-ink/60">{c.s}</span></span>
            </motion.div>
          ))}
          <AnimatePresence>{hov && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-cocoa px-4 py-1.5 text-[11px] text-cream">{hov}</motion.div>}</AnimatePresence>
        </div>
        <div className="absolute bottom-0 right-0 flex items-center gap-3 text-[9px] text-ink/60">
          <Compass ref={compass} size={44} strokeWidth={1} className="text-cocoa" /><div>{co[0]}° S<br />{co[1]}° E</div>
        </div>
      </div>
    </section>
  )
}

function Statement() {
  const num = useRef()
  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: num.current, start: 'top 85%', once: true, onEnter: () => {
      const o = { v: 0 }; anime({ targets: o, v: 7, round: 1, duration: 1400, easing: 'easeOutExpo', update: () => (num.current.textContent = o.v) }) } })
    return () => st.kill()
  }, [])
  return (
    <section className="bg-paper px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div data-reveal>
          <h2 className="font-serif text-3xl leading-tight text-cocoa md:text-4xl">INDONESIA IS MORE<br />THAN AN ARCHIPELAGO.</h2>
          <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-ink/75">Setiap pulau menyimpan cara manusia membangun rumah, memasak makanan, memainkan musik, merayakan kehidupan, dan mewariskan cerita.</p>
          <div className="my-6 h-px w-6 bg-cocoa" />
          <p className="font-serif text-xl text-cocoa"><span ref={num}>0</span> ISLANDS.<br />THOUSANDS OF STORIES.</p>
        </div>
        <div className="relative overflow-hidden"><Img data-parallax src={IMG.dancer} className="h-[340px] w-full scale-110 md:h-[400px]" /></div>
      </div>
    </section>
  )
}

function Islands({ forced }) {
  const { data = [] } = useQuery({ queryKey: ['islands'], queryFn: fetchIslands })
  const [id, setId] = useState('Sumatra'), [cat, setCat] = useState('Semua'), row = useRef()
  useEffect(() => { if (forced) setId(forced) }, [forced])
  const cur = data.find((i) => i.id === id) || data[0]
  if (!cur) return <section id="islands" className="h-96" />
  const items = cur.items.filter((x) => cat === 'Semua' || x.c === cat)
  return (
    <section id="islands" className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="label">EXPLORE</p><h2 className="font-serif text-4xl text-cocoa">The Islands</h2>
        <p className="mt-2 text-[12px] text-ink/70">Pilih pulau untuk menjelajahi kekayaan budayanya.</p>
        <div className="mt-8 flex gap-1 overflow-x-auto border-b border-sand/40">
          {data.map((i) => (
            <button key={i.id} onClick={() => { setId(i.id); setCat('Semua') }} className={`relative flex min-w-[100px] flex-1 flex-col items-center gap-2 pb-3 pt-2 text-[10px] tracking-widest ${id === i.id ? 'text-cocoa' : 'text-ink/50 hover:text-cocoa'}`}>
              <svg viewBox="0 0 100 40" className="h-7 w-14"><path d={PATHS[i.id]} transform="scale(.1) translate(0,-100)" fill="currentColor" style={{ transform: 'scale(.28) translate(-30px,-100px)' }} /></svg>
              {i.id.toUpperCase()}{id === i.id && <motion.span layoutId="tab" className="absolute inset-x-0 bottom-0 h-[2px] bg-cocoa" />}
            </button>))}
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_1.4fr]">
          <AnimatePresence mode="wait">
            <motion.div key={cur.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: .45 }} className="relative min-h-[360px] overflow-hidden">
              <Img src={cur.img} className="absolute inset-0 h-full w-full" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-7 text-cream"><div className="mb-3 h-px w-5 bg-cream" /><h3 className="font-serif text-4xl">{cur.id.toUpperCase()}</h3>
                <p className="mt-2 text-[12px]">{cur.d}</p><button className="btn mt-5 bg-cocoa/90">Jelajahi Budaya <ArrowRight size={12} /></button></div>
            </motion.div>
          </AnimatePresence>
          <div>
            <p className="mb-3 text-[12px] text-cocoa">Jenis Budaya</p>
            <div className="mb-6 grid grid-cols-4 gap-2">{CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`chip ${cat === c ? 'bg-cocoa text-cream border-cocoa' : 'text-cocoa hover:bg-cocoa/10'}`}>{c}</button>))}</div>
            <div className="relative">
              <motion.div layout ref={row} className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
                <AnimatePresence mode="popLayout">{items.length ? items.map((x) => (
                  <motion.figure layout key={x.n} initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .92 }} whileHover={{ y: -5 }} className="w-[150px] shrink-0 cursor-pointer md:w-[170px]">
                    <Img src={x.img} className="h-[140px] w-full" /><figcaption className="mt-2 text-[11px] text-cocoa">{x.n}<br /><span className="text-ink/60">{x.c}</span></figcaption></motion.figure>))
                  : <p className="py-10 text-[12px] text-ink/60">Belum ada budaya {cat.toLowerCase()} untuk pulau ini.</p>}</AnimatePresence>
              </motion.div>
              <button aria-label="Geser" onClick={() => row.current.scrollBy({ left: 200, behavior: 'smooth' })} className="absolute -right-3 top-[60px] grid h-8 w-8 place-items-center rounded-full bg-cream shadow-md"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Discover({ pick }) {
  return (
    <section className="bg-paper/60 px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between"><div><p className="label">CULTURAL DISCOVERY</p><h2 className="font-serif text-4xl leading-tight text-cocoa">Jelajahi<br />Setiap Keunikan</h2></div>
          <div className="hidden max-w-[180px] text-[11px] text-ink/70 md:block">Setiap budaya memiliki cerita, setiap cerita adalah bagian dari identitas kita.<div className="mt-3 h-px w-6 bg-cocoa" /></div></div>
        <div className="grid auto-rows-[190px] grid-cols-2 gap-3 md:grid-cols-6">
          {GRID.map((g, i) => (
            <motion.button key={g.n} whileHover="h" onClick={() => pick(g)} className={`group relative overflow-hidden text-left ${i === 0 ? 'md:col-span-2 md:row-span-2' : i < 3 ? 'md:col-span-2' : 'md:col-span-2'}`}>
              <motion.div variants={{ h: { scale: 1.07 } }} transition={{ duration: .6 }} className="h-full w-full"><Img src={g.img} className="h-full w-full" /></motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-cream"><div className="font-serif text-lg">{g.n}</div><div className="text-[10px] opacity-80">{g.s}</div></div>
              <span className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full border border-cream/70 text-cream transition-colors group-hover:bg-cream group-hover:text-cocoa"><ArrowRight size={12} /></span>
            </motion.button>))}
        </div>
      </div>
    </section>
  )
}

function Detail({ item, back }) {
  const d = DETAIL, [i, setI] = useState(0)
  const imgs = item.img ? [item.img, ...d.imgs] : d.imgs
  useEffect(() => setI(0), [item])
  return (
    <section id="detail" className="px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.4fr_1.2fr_60px]">
        <div className="relative"><div className="absolute -left-4 top-0 hidden h-3/4 w-10 bg-cocoa md:block" />
          <AnimatePresence mode="wait"><motion.div key={imgs[i]} initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }} exit={{ opacity: 0 }} transition={{ duration: .7 }} className="md:ml-8">
            <Img src={imgs[i]} className="h-[340px] w-full" /></motion.div></AnimatePresence></div>
        <div>
          <button onClick={back} className="mb-4 flex items-center gap-1 text-[10px] text-ink/60 hover:text-cocoa"><ArrowLeft size={12} /> Kembali</button>
          <h3 className="font-serif text-3xl uppercase text-cocoa">{item.n || d.n}</h3>
          <p className="mt-1 text-[11px] text-ink/60">{item.s || `${d.s} • ${d.t}`}</p>
          <p className="mt-5 text-[12px] leading-relaxed text-ink/75">{d.p}</p>
          <dl className="mt-5 space-y-2 text-[11px]">{d.meta.map(([k, v]) => <div key={k} className="grid grid-cols-[90px_1fr]"><dt className="text-cocoa">{k}</dt><dd className="text-ink/75">: {v}</dd></div>)}</dl>
          <button className="btn mt-6">Jelajahi Budaya Lainnya <ArrowRight size={12} /></button>
        </div>
        <div className="flex flex-row items-start gap-2 md:flex-col">
          <span className="text-[10px] text-ink/60">{i + 1} / {imgs.length}</span>
          {imgs.map((m, k) => <button key={k} onClick={() => setI(k)} className={`h-12 w-14 overflow-hidden ${k === i ? 'ring-1 ring-cocoa ring-offset-2 ring-offset-cream' : 'opacity-70'}`}><Img src={m} className="h-full w-full" /></button>)}
          <ChevronDown size={14} className="hidden text-ink/50 md:block" />
        </div>
      </div>
    </section>
  )
}

function Living() {
  return (
    <section className="px-6 pb-16 md:px-12"><div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-end justify-between"><div><p className="label">LIVING CULTURE</p><h2 className="font-serif text-3xl text-cocoa">Budaya yang Masih Hidup</h2></div>
        <p className="hidden max-w-[170px] text-[10px] text-ink/70 md:block">Bukan hanya untuk dilihat, tapi untuk dirasakan, dijalani, dan dilestarikan.</p></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{LIVING.map((l, i) => (
        <motion.div key={l.n} whileHover="h" className="group relative h-[190px] cursor-pointer overflow-hidden">
          <motion.div variants={{ h: { scale: 1.08 } }} transition={{ duration: .6 }} className="h-full"><Img src={l.img} className="h-full w-full" /></motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-3 left-3 text-cream"><div className="text-[10px] opacity-70">0{i + 1}</div><div className="font-serif text-[15px]">{l.n}</div><div className="text-[10px] opacity-80">{l.s}</div></div>
          <span className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full border border-cream/70 text-cream group-hover:bg-cream group-hover:text-cocoa"><ArrowRight size={12} /></span>
        </motion.div>))}</div></div></section>
  )
}

export default function App() {
  const [forced, setForced] = useState(), [item, setItem] = useState({}), [active, setActive] = useState('Home'), root = useRef()
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => {
    const lenis = new Lenis({ lerp: .09 }); lenis.on('scroll', ScrollTrigger.update)
    const f = (t) => lenis.raf(t * 1000); gsap.ticker.add(f); gsap.ticker.lagSmoothing(0)
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', { y: 50, opacity: 0, duration: 1.1, stagger: .12, ease: 'power3.out' })
      gsap.utils.toArray('[data-reveal]').forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }))
      gsap.utils.toArray('[data-parallax]').forEach((el) => gsap.to(el, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, scrub: true } }))
    }, root)
    return () => { ctx.revert(); gsap.ticker.remove(f); lenis.destroy() }
  }, [])
  const nav = [['Home', 'top'], ['Islands', 'islands'], ['Cultures', 'cultures'], ['About', 'about']]
  return (
    <div ref={root} id="top">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-cream/80 px-6 py-4 backdrop-blur md:px-12">
        <span className="font-serif text-lg tracking-wide text-cocoa">NUSANTARA</span>
        <nav className="hidden gap-10 text-[11px] md:flex">{nav.map(([n, id]) => (
          <button key={n} onClick={() => { setActive(n); go(id) }} className="relative pb-1 text-cocoa">{n}{active === n && <motion.span layoutId="nav" className="absolute inset-x-0 bottom-0 h-px bg-cocoa" />}</button>))}</nav>
        <div className="flex gap-5 text-cocoa"><button aria-label="Cari"><Search size={16} /></button><button aria-label="Menu"><Menu size={18} /></button></div>
      </header>
      <Hero onEnter={(k) => { if (typeof k === 'string') setForced(k); go('islands') }} />
      <Statement />
      <Islands forced={forced} />
      <div id="cultures"><Discover pick={(g) => { setItem(g); go('detail') }} /></div>
      <Detail item={item} back={() => go('cultures')} />
      <Living />
      <footer id="about" className="px-6 py-14 md:px-12"><div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-4">
        <div><div className="font-serif text-2xl text-cocoa">NUSANTARA</div><p className="mt-2 max-w-[190px] font-serif text-sm text-cocoa/80">Stories from an archipelago of thousands of cultures.</p></div>
        <ul className="space-y-1 text-[11px] text-ink/70"><li className="text-cocoa">Explore</li>{['Islands', 'Cultures', 'About'].map((x) => <li key={x}>{x}</li>)}</ul>
        <svg viewBox="0 0 1000 440" className="h-24 w-full opacity-25">{Object.values(PATHS).map((d, i) => <path key={i} d={d} fill="#4a2316" />)}</svg>
        <div className="flex flex-col items-end gap-4"><div className="flex gap-3 text-cocoa"><Instagram size={16} /><Youtube size={16} /><Twitter size={16} /></div><p className="text-[9px] text-ink/50">© 2026 NUSANTARA. All rights reserved.</p></div>
      </div></footer>
    </div>
  )
}
