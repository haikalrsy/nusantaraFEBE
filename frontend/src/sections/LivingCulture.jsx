import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import FlexCarousel from '../components/FlexCarousel'
import ImageSlot from '../components/ImageSlot'
import SectionLabel from '../components/SectionLabel'
import Ornament from '../components/Ornament'
import { livingCulture } from '../data/livingCulture'
import { useNusantara } from '../context/NusantaraContext'
import { corsSafe } from '../lib/corsImage'

function hasWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

// 'sm' (<640), 'md' (640-1023), 'lg' (>=1024)
function useBreakpoint() {
  const read = () => {
    if (typeof window === 'undefined') return 'lg'
    const w = window.innerWidth
    return w < 640 ? 'sm' : w < 1024 ? 'md' : 'lg'
  }
  const [bp, setBp] = useState(read)
  useEffect(() => {
    const on = () => setBp(read())
    addEventListener('resize', on)
    return () => removeEventListener('resize', on)
  }, [])
  return bp
}

// Pengaturan carousel per ukuran layar
const CONFIG = {
  sm: { fit: 'portrait', cardHeight: 0.46, gap: 10, radius: 12, reach: 0.6, bend: 0.2, lensWidth: 1.1, lensHeight: 1.6, dispersion: 0.25 },
  md: { fit: 'natural', cardHeight: 0.5, gap: 12, radius: 14, reach: 0.5 },
  lg: { fit: 'natural', cardHeight: 0.5, gap: 12, radius: 14, reach: 0.48 },
}

// Latar hangat: gradasi diagonal, pekat di kiri atas, memudar ke warna kertas di kanan bawah
const WARM_BG =
  'linear-gradient(125deg, #d8b894 0%, #dcc09f 36%, #f1e4d1 62%, #faf6f0 86%)'

// Motif batik kawung sederhana (garis cokelat), diulang tiap 80px
const BATIK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" stroke="#6b3a1e" stroke-width="1.3"><ellipse cx="40" cy="24" rx="9" ry="16"/><ellipse cx="40" cy="56" rx="9" ry="16"/><ellipse cx="24" cy="40" rx="16" ry="9"/><ellipse cx="56" cy="40" rx="16" ry="9"/><circle cx="40" cy="40" r="2.6" fill="#6b3a1e"/><circle cx="0" cy="0" r="2" fill="#6b3a1e"/><circle cx="80" cy="0" r="2" fill="#6b3a1e"/><circle cx="0" cy="80" r="2" fill="#6b3a1e"/><circle cx="80" cy="80" r="2" fill="#6b3a1e"/></g></svg>`
const BATIK_URL = `url("data:image/svg+xml,${encodeURIComponent(BATIK_SVG)}")`

// Batik paling jelas di kiri atas, hilang ke kanan bawah (searah gradasi)
const BATIK_MASK = 'linear-gradient(125deg, #000 0%, #000 30%, transparent 78%)'

export default function LivingCulture() {
  const { cultures } = useNusantara()
  const navigate = useNavigate()
  const webgl = useMemo(hasWebGL2, [])
  const bp = useBreakpoint()
  const cfg = CONFIG[bp]

  // true saat ada gambar yang sedang di-hover (efek spotlight)
  const [spot, setSpot] = useState(false)
  useEffect(() => {
    setSpot(false)
  }, [bp])

  // Posisi kursor untuk pusat spotlight (lewat CSS variable, tanpa re-render)
  const sectionRef = useRef(null)
  const onMove = (e) => {
    const el = sectionRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${e.clientX - r.left}px`)
    el.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }

  // Hanya budaya yang ada di data dan punya foto
  const entries = useMemo(
    () =>
      livingCulture
        .map((l) => ({ l, c: cultures.find((x) => x.slug === l.slug) }))
        .filter((x) => x.c && x.c.src),
    [cultures]
  )

  const items = useMemo(
    () =>
      entries.map(({ l, c }) => ({
        src: corsSafe(c.src),
        alt: `${l.title} - ${c.title}`,
        title: l.title,
        subtitle: l.type,
        slug: l.slug,
      })),
    [entries]
  )

  return (
    <section
      id="living"
      ref={sectionRef}
      onPointerMove={onMove}
      className="relative overflow-hidden py-14 md:py-20"
      style={{ background: WARM_BG }}
    >
      {/* Batik cokelat, opacity rendah, memudar searah gradasi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.16]"
        style={{
          backgroundImage: BATIK_URL,
          backgroundSize: '80px 80px',
          WebkitMaskImage: BATIK_MASK,
          maskImage: BATIK_MASK,
        }}
      />

      {/* Spotlight hangat: terang di sekitar kursor, cokelat lembut di pinggir */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${
          spot ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle 560px at var(--sx, 50%) var(--sy, 50%), rgba(74,38,18,0) 0%, rgba(74,38,18,0.22) 50%, rgba(74,38,18,0.5) 100%)',
        }}
      />

      <Ornament className="hidden xl:block absolute left-0 bottom-24 h-32 w-16" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-9">
        <div className="mb-4 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Living Culture</SectionLabel>
            <h2
              className={`text-[clamp(1.8rem,3.6vw,2.7rem)] transition-colors duration-500 ${
                spot ? 'text-paper-deep' : 'text-clay'
              }`}
            >
              Budaya yang Masih Hidup
            </h2>
          </div>
          <p
            className={`font-text m-0 text-[13px] leading-relaxed transition-colors duration-500 md:max-w-[220px] ${
              spot ? 'text-paper-deep/80' : 'text-ink-soft'
            }`}
          >
            Bukan hanya untuk dilihat, tetapi untuk dirasakan dan dilestarikan.
          </p>
        </div>
      </div>

      {webgl && items.length > 0 ? (
        // pb-24 di mobile memberi ruang supaya judul & nomor tidak tertimpa dock
        <div
          className={`relative z-10 w-full pb-24 transition-colors duration-500 sm:pb-0 ${
            spot ? 'text-paper' : 'text-ink'
          }`}
        >
          <div className="h-[380px] w-full sm:h-[520px] md:h-[600px]">
            <FlexCarousel
              key={bp}
              items={items}
              preset="liquid"
              intro="rise"
              squeeze={0.2}
              focusOnClick={false}
              captions
              captureWheel={false}
              spotlight
              dimAmount={0.45}
              onHover={(i) => setSpot(i !== null)}
              onSelect={(i, item) =>
                navigate({ to: '/culture/$slug', params: { slug: item.slug } })
              }
              {...cfg}
            />
          </div>
        </div>
      ) : (
        // Cadangan kalau browser tidak mendukung WebGL2
        <ul className="relative z-10 m-0 flex list-none snap-x gap-3 overflow-x-auto p-0 px-6 pb-24 [scrollbar-width:none] md:px-9 md:pb-0 md:[&:hover>li:not(:hover)]:opacity-25">
          {entries.map(({ l, c }, k) => (
            <li
              key={l.slug}
              className="h-[260px] min-w-[72%] snap-start transition-opacity duration-300 md:min-w-0 md:flex-1"
            >
              <Link
                to="/culture/$slug"
                params={{ slug: l.slug }}
                className="group relative block h-full w-full overflow-hidden rounded-2xl no-underline text-paper"
              >
                <ImageSlot
                  src={c.src}
                  alt={l.title}
                  className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10" />
                <div className="absolute bottom-4 left-4 right-14">
                  <p className="m-0 text-[11px] opacity-80">{String(k + 1).padStart(2, '0')}</p>
                  <p className="m-0 text-sm font-normal">{l.title}</p>
                  <p className="m-0 text-[11px] opacity-80">{l.type}</p>
                </div>
                <span className="absolute bottom-4 right-4 grid size-8 place-items-center rounded-full border border-paper/70">
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}