import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { motion, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowLeft, MapPin,BookOpen,Sparkles, ChevronLeft, ChevronRight, Share2, Compass } from 'lucide-react'
import ImageSlot from '../../components/ImageSlot'
import SectionLabel from '../../components/SectionLabel'
import { useNusantara } from '../../context/NusantaraContext'

// Filter foto galeri. Dua keadaan (redup -> terang) dianimasikan halus lewat transition,
// jadi brightness, contrast, saturate & sepia berubah pelan, bukan langsung loncat.
// Tanda "!" dipakai supaya menimpa filter bawaan class .grade di ImageSlot.
// Perubahan warna (redup -> terang) lewat CSS transition singkat.
// Zoom TIDAK lewat CSS, tapi lewat spring di komponen ZoomFrame (lebih hidup & mengikuti kursor).
const EASE = '![transition:filter_700ms_cubic-bezier(.4,0,.2,1)]'
const DIM = '![filter:sepia(.4)_saturate(.85)_contrast(.92)_brightness(.88)]'
const BRIGHT_HOVER = 'group-hover:![filter:sepia(0)_saturate(1.08)_contrast(1.12)_brightness(1.04)]'
const BRIGHT_ACTIVE = '![filter:sepia(0)_saturate(1.05)_contrast(1.08)_brightness(1.02)]'

const STYLE = `@keyframes culture-fade { from { opacity: 0 } to { opacity: 1 } }`

// Bingkai foto dengan zoom berbasis spring: membesar dengan pegas lembut saat kursor masuk,
// dan fotonya ikut bergeser pelan mengikuti arah kursor (parallax). Keluar = kembali dengan pegas juga.
function ZoomFrame({ image, children, className = '', zoom = 1.1 }) {
  const reduced = useReducedMotion()
  const scale = useSpring(1, { stiffness: 55, damping: 12, mass: 1 })
  const x = useSpring(0, { stiffness: 45, damping: 16, mass: 1 })
  const y = useSpring(0, { stiffness: 45, damping: 16, mass: 1 })
  const usable = (e) => e.pointerType === 'mouse' && !reduced

  const onEnter = (e) => { if (usable(e)) scale.set(zoom) }
  const onLeave = () => { scale.set(1); x.set(0); y.set(0) }
  const onMove = (e) => {
    if (!usable(e)) return
    const r = e.currentTarget.getBoundingClientRect()
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2
    scale.set(zoom)
    x.set(-nx * ((zoom - 1) / 2) * r.width * 0.85)
    y.set(-ny * ((zoom - 1) / 2) * r.height * 0.85)
  }

  return (
    <div
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      <motion.div style={{ scale, x, y }} className="h-full w-full will-change-transform">
        {image}
      </motion.div>
      {children}
    </div>
  )
}

// Slider horizontal: semua budaya dari kepulauan yang sama. Panah muncul otomatis kalau isinya melebihi lebar.
function RelatedSlider({ items, island }) {
  const track = useRef(null)
  const [edge, setEdge] = useState({ prev: false, next: false })

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.scrollLeft = 0
    const update = () =>
      setEdge({
        prev: el.scrollLeft > 4,
        next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      })
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [items])

  const move = (dir) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  const arrow =
    'size-10 rounded-full border border-rule bg-paper text-ink grid place-items-center cursor-pointer transition-all duration-300 hover:bg-clay hover:text-paper hover:border-clay disabled:opacity-30 disabled:cursor-default disabled:hover:bg-paper disabled:hover:text-ink disabled:hover:border-rule'

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-serif text-ink m-0">Lanjut Menjelajah</h3>
          <div className="mt-1 text-[11px] text-ink-soft">
            <span className="uppercase tracking-widest">{island}</span>
            <span className="mx-2">•</span>
            <span>{items.length} budaya lainnya</span>
          </div>
        </div>
        {(edge.prev || edge.next) && (
          <div className="flex gap-2 shrink-0">
            <button type="button" aria-label="Geser ke kiri" disabled={!edge.prev} onClick={() => move(-1)} className={arrow}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label="Geser ke kanan" disabled={!edge.next} onClick={() => move(1)} className={arrow}>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={track}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(x => (
          <Link
            key={x.slug}
            to="/culture/$slug"
            params={{ slug: x.slug }}
            className="block shrink-0 snap-start no-underline text-ink w-[72%] sm:w-[calc((100%-2rem)/3)]"
          >
            <ZoomFrame
              className="aspect-[16/10] rounded-xl bg-ink border border-rule"
              image={
                <ImageSlot
                  src={x.src}
                  alt={x.title}
                  className={`w-full h-full object-cover ${DIM} ${EASE} ${BRIGHT_HOVER}`}
                />
              }
            />
            <div className="mt-2.5 text-[11px] uppercase tracking-widest text-ink-soft">{x.category}</div>
            <div className="font-serif text-lg text-clay leading-tight mt-0.5">{x.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function CulturePage() {
  const { cultures, isLoading } = useNusantara()
  const { slug } = useParams({ from: '/culture/$slug' })
  const c = cultures.find(x => x.slug === slug)
  const [activeImg, setActiveImg] = useState(0)

  if (!c) {
    if (isLoading) {
      return (
        <section className="mx-auto max-w-[1100px] px-6 py-32 text-center">
          <p className="text-ink-soft">Memuat data kebudayaan...</p>
        </section>
      )
    }
    return (
      <section className="mx-auto max-w-[1100px] px-6 py-32 text-center">
        <h1 className="text-4xl font-serif text-clay mb-4">Budaya Tidak Ditemukan</h1>
        <p className="text-ink-soft mb-8">Maaf, entri kebudayaan yang Anda cari tidak tersedia.</p>
        <Link to="/" className="inline-block px-6 py-2.5 rounded-full bg-clay text-paper no-underline text-xs">
          Kembali ke Beranda
        </Link>
      </section>
    )
  }

  const gallery = c.gallery && c.gallery.length >= 3 
    ? c.gallery 
    : [
        { src: c.src, caption: `${c.title} - Dokumentasi Utama` },
        { src: c.src, caption: `${c.title} - Warisan Leluhur` },
        { src: c.src, caption: `${c.title} - Detail Kesenian` }
      ]

  // Semua budaya lain dari kepulauan yang sama
  const related = cultures.filter(x => x.slug !== c.slug && x.island === c.island)

  const kisah = (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-ink m-0">Kisah & Filosofi Budaya</h2>
      <div className="font-text text-sm md:text-base leading-[1.8] text-ink-soft space-y-4">
        <p>{c.description || c.summary}</p>
        <p>
          Sebagai salah satu mahakarya kebudayaan dari {c.place}, {c.title} telah diwariskan turun-temurun dari generasi ke generasi. Setiap detail, ornamen, dan tradisi di dalamnya mencerminkan kearifan lokal masyarakat dalam menyelaraskan kehidupan dengan alam dan nilai-nilai spiritual luhur.
        </p>
      </div>
    </div>
  )

  return (
    <article className="min-h-screen pb-24 pt-8 bg-paper text-ink">
      <style>{STYLE}</style>
      <div className="mx-auto max-w-[1200px] px-6 md:px-9">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-ink-soft hover:text-ink no-underline transition-colors"
          >
            <ArrowLeft size={14} /> Kembali ke Jelajah Nusantara
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-ink-soft">
            <span className="uppercase tracking-widest">{c.island}</span>
            <span>•</span>
            <span>{c.category}</span>
          </div>
        </div>

        {/* Judul + Galeri: satu kolom di HP, dua kolom berdampingan di desktop */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14 lg:items-center mb-12">

          {/* Hero Title Header */}
          <div className="lg:order-2">
            <SectionLabel>Warisan Budaya {c.place}</SectionLabel>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-serif text-clay leading-tight m-0 mt-2">
              {c.title}
            </h1>
            <p className="font-text text-base md:text-lg text-ink/80 mt-3 max-w-[50ch] font-medium leading-relaxed">
              {c.summary || c.description}
            </p>

            {/* Desktop: Kisah & Filosofi langsung di bawah ringkasan */}
            <div className="hidden lg:block mt-8 pt-8 border-t border-rule">
              {kisah}
            </div>
          </div>

          {/* Galeri Interaktif Minimal 3 Foto */}
          <div className="lg:order-1">
            <ZoomFrame
              className="aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl bg-ink shadow-xl border border-rule"
              image={
                <ImageSlot
                  key={activeImg}
                  src={gallery[activeImg]?.src}
                  alt={gallery[activeImg]?.caption || c.title}
                  className={`w-full h-full object-cover animate-[culture-fade_700ms_ease-out] ${DIM} ${EASE} ${BRIGHT_HOVER}`}
                />
              }
            >
              
              {/* Gradient Overlay & Caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-paper">
                <p key={activeImg} className="text-sm font-sans m-0 drop-shadow animate-[culture-fade_700ms_ease-out]">
                  {gallery[activeImg]?.caption || c.title}
                </p>
              </div>

              {/* Tombol Panah Prev / Next */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Foto sebelumnya"
                    onClick={() => setActiveImg(prev => (prev - 1 + gallery.length) % gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-paper/85 backdrop-blur-sm text-ink grid place-items-center cursor-pointer border border-rule hover:bg-paper transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label="Foto berikutnya"
                    onClick={() => setActiveImg(prev => (prev + 1) % gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-paper/85 backdrop-blur-sm text-ink grid place-items-center cursor-pointer border border-rule hover:bg-paper transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </ZoomFrame>

            {/* Deretan Thumbnail */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 [scrollbar-width:none]">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImg(idx)}
                  className={`group relative shrink-0 w-24 sm:w-32 aspect-[4/3] rounded-xl overflow-hidden border-2 cursor-pointer p-0 transition-all duration-500 ${
                    activeImg === idx ? 'border-clay shadow-md ring-2 ring-clay/20' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageSlot
                    src={img.src}
                    alt=""
                    className={`w-full h-full object-cover ${EASE} ${activeImg === idx ? BRIGHT_ACTIVE : `${DIM} ${BRIGHT_HOVER}`}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HP: Kisah & Filosofi tetap di bawah galeri */}
        <div className="lg:hidden mb-10">
          {kisah}
        </div>

        {/* Fakta menarik + info ringkas, berdampingan */}
        <div className="grid lg:grid-cols-2 gap-6 mb-14">
          {c.funFacts && c.funFacts.length > 0 && (
            <div className="p-6 rounded-2xl bg-paper-deep/70 border border-rule">
              <div className="flex items-center gap-2 text-clay font-medium text-sm mb-4">
                <BookOpen size={16} /> Keunikan & Fakta Menarik
              </div>
              <ul className="space-y-3 m-0 pl-4 text-xs md:text-sm text-ink-soft leading-relaxed font-text">
                {c.funFacts.map((fact, idx) => (
                  <li key={idx} className="list-disc pl-1">
                    <span className="text-ink font-normal">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-paper border border-rule text-xs space-y-3">
              <div className="flex justify-between py-1.5 border-b border-rule/50">
                <span className="text-ink-soft">Wilayah Asal</span>
                <span className="font-medium text-ink">{c.place}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-rule/50">
                <span className="text-ink-soft">Kategori</span>
                <span className="font-medium text-ink">{c.category}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-soft">Kepulauan</span>
                <span className="font-medium text-clay uppercase">{c.island}</span>
              </div>
            </div>

            <div className="text-white">
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-clay text-paper no-underline text-xs font-medium hover:bg-clay/90 transition-colors shadow-sm"
              >
                Eksplorasi Budaya Lainnya
              </Link>
            </div>
          </div>
        </div>

        {/* Lanjut menjelajah: semua budaya dari daerah yang sama */}
        {related.length > 0 && <RelatedSlider items={related} island={c.island} />}

      </div>
    </article>
  )
}