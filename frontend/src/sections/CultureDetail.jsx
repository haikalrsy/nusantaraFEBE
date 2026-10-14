import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronUp, Layers, MapPin } from 'lucide-react'
import ImageSlot from '../components/ImageSlot'
import Ornament from '../components/Ornament'
import { islandFeatured, featured as fallbackFeatured } from '../data/featured'
import { useIslandState } from '../hooks/useIslandState'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToId } from '../lib/lenis'
import { parallax, staggerIn } from '../animations/reveal'
import { wipeDown } from '../animations/paperTransition'

// Viewer 360 dimuat belakangan supaya tidak menambah ukuran bundle halaman lain
const PanoramaViewer = lazy(() => import('../components/PanoramaViewer'))

gsap.registerPlugin(ScrollTrigger)
const icons = { origin:MapPin, material:Layers, meaning:BookOpen }

export default function CultureDetail() {
  const [islandSlug] = useIslandState()
  const f = islandFeatured[islandSlug] || fallbackFeatured

  // Daftar slide = panorama 360 (satu atau lebih) di urutan pertama + galeri foto biasa.
  // Data memakai f.panoramas (daftar, masing-masing bisa punya hotSpots)
  // atau f.panorama (satu panorama: string path atau objek). Item galeri juga bisa pano: true.
  const slides = useMemo(() => {
    const base = f.gallery.map(g => (g.pano ? { ...g, pano: true } : g))
    const list = (Array.isArray(f.panoramas) ? f.panoramas : [f.panorama]).filter(Boolean)
    const pans = list.map((p, k) => {
      const o = typeof p === 'string' ? { src: p } : p
      return { alt: `Panorama 360° ${f.title}${list.length > 1 ? ` (${k + 1})` : ''}`, ...o, pano: true }
    })
    return [...pans, ...base]
  }, [f])

  const [i, setI] = useState(0), root = useRef(null), tabsRef = useRef(null), reduced = useReducedMotion(), n = slides.length
  const go = (k) => setI((k + n) % n)
  const k0 = i < n ? i : 0 // jaga-jaga saat pulau berganti dan jumlah slide berbeda
  const cur = slides[k0]
  const photo = slides.find(s => !s.pano)

  useEffect(() => {
    setI(0)
  }, [islandSlug])
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      parallax('[data-detail-img]', root.current, 5)
      staggerIn('[data-detail-info] > *', root.current)
    }, root)
    return () => ctx.revert()
  }, [reduced])

  // Di layar kecil strip thumbnail horizontal: geser agar thumbnail aktif terlihat di tengah
  useEffect(() => {
    const list = tabsRef.current
    const el = list?.children[k0]
    if (!list || !el) return
    if (getComputedStyle(list).flexDirection !== 'row') return
    list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.clientWidth) / 2, behavior: reduced ? 'auto' : 'smooth' })
  }, [k0, reduced])

  const onKey = (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) } if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) } }
  return (
    <section ref={root} aria-label={`${f.title}, sorotan budaya`} className="bg-paper-deep/60 border-y border-rule">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-9 py-10 sm:py-14 md:py-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] gap-6 sm:gap-8 lg:gap-10 items-start">
        <div className="relative lg:pl-12 order-1 min-w-0">
          <div className="hidden lg:block absolute left-0 top-0 w-7 h-[80%] bg-clay" />
          <Ornament className="hidden lg:block absolute left-0 bottom-0 w-7 h-[18%]" />
          {/* Mobile lebih tinggi supaya panorama dan titik info nyaman disentuh */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] min-h-[240px] overflow-hidden bg-ink">
            {/* Lapisan foto biasa (dengan parallax) */}
            <div data-detail-img className="absolute inset-x-0 -top-[6%] h-[112%]">
              <AnimatePresence initial={false}>
                {!cur.pano && (
                  <motion.div key={k0} className="absolute inset-0" {...wipeDown(reduced ? 0 : .9)}>
                    <ImageSlot src={cur.src} alt={cur.alt} className="w-full h-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Lapisan panorama 360 (tanpa parallax, supaya tidak bergeser saat digeser) */}
            <AnimatePresence initial={false}>
              {cur.pano && (
                <motion.div
                  key={`pano-${k0}`}
                  className="absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : .5 }}
                >
                  <Suspense fallback={<div className="absolute inset-0 grid place-items-center bg-ink text-[11px] tracking-[.2em] uppercase text-paper/70">Memuat panorama 360°</div>}>
                    <PanoramaViewer
                      src={cur.src}
                      alt={cur.alt}
                      yaw={cur.yaw}
                      pitch={cur.pitch}
                      hfov={cur.hfov}
                      hotSpots={cur.hotSpots}
                      fallback={photo ? <ImageSlot src={photo.src} alt={photo.alt} className="w-full h-full" /> : null}
                    />
                  </Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div data-detail-info className="order-3 lg:order-2 min-w-0">
          <button type="button" onClick={() => scrollToId('cultures')} className="inline-flex items-center gap-2 bg-transparent border-0 p-0 py-1 text-xs text-ink-soft cursor-pointer hover:text-ink"><ArrowLeft size={13} strokeWidth={1.5} /> Kembali</button>
          <h3 className="text-xl sm:text-2xl md:text-3xl tracking-[.06em] mt-3 sm:mt-4 break-words">{f.title}</h3>
          <p className="text-xs text-ink-soft mt-1 mb-4">{f.place}, {f.kind}</p>
          <p className="font-text text-[13px] leading-[1.8] text-ink-soft m-0">{f.description}</p>
          <dl className="m-0 mt-5 grid gap-3">
            {f.meta.map(m => { const Icon = icons[m.icon]; return (
              <div key={m.label} className="grid grid-cols-[1.25rem_4.75rem_1fr] sm:grid-cols-[1.25rem_5.5rem_1fr] items-start gap-2 text-xs">
                <Icon size={14} strokeWidth={1.4} className="mt-px text-clay" /><dt className="font-normal">{m.label}</dt><dd className="m-0 text-ink-soft">{m.value}</dd>
              </div>) })}
          </dl>
          <button type="button" onClick={() => scrollToId('islands')} className="mt-6 sm:mt-7 inline-flex items-center justify-center gap-2 bg-clay text-paper rounded-full border-0 px-5 py-3 sm:py-2.5 text-xs cursor-pointer w-full sm:w-auto">Jelajahi Budaya Lainnya <ArrowRight size={13} strokeWidth={1.5} /></button>
        </div>
        <div className="order-2 lg:order-3 flex lg:flex-col items-center gap-2 min-w-0 w-full lg:w-auto">
          <p className="hidden lg:block text-[11px] text-ink-soft m-0 mb-1" aria-live="polite">{k0 + 1} / {n}</p>
          <button type="button" aria-label="Foto sebelumnya" onClick={() => go(i - 1)} className="hidden lg:grid size-6 place-items-center bg-transparent border-0 cursor-pointer text-ink-soft hover:text-ink"><ChevronUp size={15} strokeWidth={1.5} /></button>
          <div ref={tabsRef} role="tablist" aria-label="Galeri foto" aria-orientation="vertical" onKeyDown={onKey} className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible max-w-full snap-x lg:snap-none pb-1 lg:pb-0">
            {slides.map((g, k) => (
              <button key={k} role="tab" aria-selected={k === k0} aria-label={`${g.pano ? 'Panorama 360°' : `Foto ${k + 1}`}: ${g.alt}`} tabIndex={k === k0 ? 0 : -1} onClick={() => setI(k)}
                className={`relative shrink-0 snap-center w-16 h-12 lg:w-14 lg:h-11 p-0 border cursor-pointer overflow-hidden transition-opacity ${k === k0 ? 'border-clay opacity-100' : 'border-transparent opacity-55 hover:opacity-90'}`}>
                <ImageSlot src={g.src} alt="" className="w-full h-full" />
                {g.pano && <span className="absolute right-0 bottom-0 px-1 py-px bg-clay text-paper text-[9px] leading-none tracking-wide">360°</span>}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Foto berikutnya" onClick={() => go(i + 1)} className="hidden lg:grid size-6 place-items-center bg-transparent border-0 cursor-pointer text-ink-soft hover:text-ink"><ChevronDown size={15} strokeWidth={1.5} /></button>
        </div>
      </div>
    </section>
  )
}