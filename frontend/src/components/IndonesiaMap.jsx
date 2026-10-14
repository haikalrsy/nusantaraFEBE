import { useRef, useState } from 'react'
import { useIslandState } from '../hooks/useIslandState'
import { scrollToId } from '../lib/lenis'

// Area klik/hover tiap pulau (tidak terlihat, hanya penanda zona)
const ISLAND_FRAMES = [
  { slug: 'sumatra',       name: 'Sumatra',       left: '2%',  top: '12%', width: '28%', height: '56%' },
  { slug: 'kalimantan',    name: 'Kalimantan',    left: '28%', top: '10%', width: '24%', height: '46%' },
  { slug: 'jawa',          name: 'Jawa',          left: '22%', top: '54%', width: '24%', height: '28%' },
  { slug: 'bali',          name: 'Bali',          left: '43%', top: '70%', width: '9%',  height: '18%' },
  { slug: 'nusa-tenggara', name: 'Nusa Tenggara', left: '50%', top: '70%', width: '18%', height: '20%' },
  { slug: 'sulawesi',      name: 'Sulawesi',      left: '47%', top: '26%', width: '17%', height: '42%' },
  { slug: 'maluku',        name: 'Maluku',        left: '63%', top: '32%', width: '19%', height: '33%' },
  { slug: 'papua',         name: 'Papua',         left: '78%', top: '38%', width: '20%', height: '42%' },
]

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

// Supaya pusat sorotan bisa meluncur mulus antar pulau
const CSS_PROPS = `
@property --cx { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
@property --cy { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
`

const centerOf = (f) => ({
  cx: parseFloat(f.left) + parseFloat(f.width) / 2,
  cy: parseFloat(f.top) + parseFloat(f.height) / 2,
})

export default function IndonesiaMap() {
  const [, setActive] = useIslandState()
  const [hover, setHover] = useState(null) // slug yang sedang terbuka
  const [last, setLast] = useState(ISLAND_FRAMES[0]) // pulau terakhir, agar isi kartu tidak kosong saat menutup
  const [focus, setFocus] = useState({ cx: 50, cy: 50 })
  const closeTimer = useRef(null)

  const isOpen = hover !== null

  const select = (slug) => {
    setActive(slug)
    scrollToId('islands', -40)
  }

  const openCard = (f) => {
    clearTimeout(closeTimer.current)
    setFocus(centerOf(f))
    setLast(f)
    setHover(f.slug)
  }

  // Jeda kecil sebelum menutup agar tidak berkedip
  // saat kursor pindah dari pulau ke kartu
  const closeCard = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setHover(null), 160)
  }

  const closeNow = () => {
    clearTimeout(closeTimer.current)
    setHover(null)
  }

  return (
    <div className="relative w-full select-none">
      <style>{CSS_PROPS}</style>

      {/* Klik area kosong peta = tutup kartu (penting untuk layar sentuh) */}
      <div
        onClick={closeNow}
        className="relative aspect-[16/9] w-full overflow-hidden select-none"
      >
        {/* Latar peta */}
        <img
          src="/images/indonesia-diorama-hd.jpg"
          alt="Peta Indonesia"
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        />

        {/* Awan lembut */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-35 mix-blend-screen">
          <div className="cloud-layer-1 absolute -inset-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.7)_0%,transparent_60%)]" />
          <div className="cloud-layer-2 absolute -inset-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.6)_0%,transparent_65%)]" />
        </div>

        {/* Peredup di sekitar pulau yang dipilih (lebih gelap) */}
        <div
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{
            '--cx': `${focus.cx}%`,
            '--cy': `${focus.cy}%`,
            background:
              'radial-gradient(ellipse 30% 40% at var(--cx) var(--cy), transparent 0%, transparent 25%, rgba(28,16,10,0.68) 100%)',
            opacity: isOpen ? 1 : 0,
            transition: `opacity 600ms ${EASE}, --cx 700ms ${EASE}, --cy 700ms ${EASE}`,
          }}
        />

        {/* Sorotan cahaya hangat di pulau yang dipilih */}
        <div
          className="pointer-events-none absolute inset-0 z-[16]"
          style={{
            '--cx': `${focus.cx}%`,
            '--cy': `${focus.cy}%`,
            background:
              'radial-gradient(ellipse 20% 28% at var(--cx) var(--cy), rgba(255,238,205,0.22) 0%, transparent 100%)',
            opacity: isOpen ? 1 : 0,
            transition: `opacity 600ms ${EASE}, --cx 700ms ${EASE}, --cy 700ms ${EASE}`,
          }}
        />

        {/* Zona pulau: transparan, hanya penangkap hover/tap */}
        {ISLAND_FRAMES.map((f) => (
          <div
            key={f.slug}
            onMouseEnter={() => openCard(f)}
            onMouseLeave={closeCard}
            onClick={(e) => {
              e.stopPropagation()
              openCard(f) // layar sentuh: tap = munculkan kartu
            }}
            style={{ left: f.left, top: f.top, width: f.width, height: f.height }}
            className="absolute z-20 cursor-pointer select-none"
          />
        ))}

        {/* Satu kartu untuk semua pulau.
            clamp() menjaga kartu tetap di dalam peta di layar sempit. */}
        <div
          onMouseEnter={() => clearTimeout(closeTimer.current)}
          onMouseLeave={closeCard}
          onClick={(e) => e.stopPropagation()}
          className="absolute z-40"
          style={{
            left: `clamp(84px, ${focus.cx}%, calc(100% - 84px))`,
            top: `max(92px, ${focus.cy}%)`,
            transform: `translate(-50%, ${isOpen ? 'calc(-100% - 10px)' : 'calc(-100% + 2px)'}) scale(${isOpen ? 1 : 0.94})`,
            transformOrigin: '50% 100%',
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: isOpen
              ? `left 600ms ${EASE}, top 600ms ${EASE}, transform 520ms ${EASE}, opacity 320ms ease-out, visibility 0s`
              : `transform 320ms ${EASE}, opacity 240ms ease-in, visibility 0s linear 320ms`,
            willChange: 'transform, opacity, left, top',
          }}
        >
          <div className="flex flex-col items-center gap-1.5 rounded-xl border border-ink/10 bg-paper/90 px-3 py-2 text-ink shadow-[0_14px_36px_-12px_rgba(42,26,18,0.5)] backdrop-blur-md sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3">
            <span
              key={`name-${last.slug}`}
              className="whitespace-nowrap font-serif text-xs tracking-wider sm:text-sm"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(4px)',
                transition: `opacity 400ms ease-out ${isOpen ? '90ms' : '0ms'}, transform 500ms ${EASE} ${isOpen ? '90ms' : '0ms'}`,
              }}
            >
              {last.name}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                select(last.slug)
              }}
              className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink/10 px-3 py-1 text-[10px] font-medium text-ink hover:bg-ink/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 sm:text-[11px]"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
                transition: `opacity 400ms ease-out ${isOpen ? '160ms' : '0ms'}, transform 500ms ${EASE} ${isOpen ? '160ms' : '0ms'}, background-color 300ms ease`,
              }}
            >
              Lihat penjelasan
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Koordinat */}
        <div className="pointer-events-none absolute bottom-2 right-3 z-30 font-serif text-[9px] text-ink-soft/75 sm:bottom-4 sm:right-6 sm:text-[11px]">
          0.7893° S • 113.9213° E
        </div>
      </div>
    </div>
  )
}