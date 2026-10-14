import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import {
  ArrowUpRight, CupSoda, Drum, Landmark, MapPin, Scissors, Search, Star, Utensils, X, Check,
} from 'lucide-react'
import Ornament from '../components/Ornament'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { CATEGORIES, PLACE_TYPES, POPULAR, REGIONS } from '../data/recomendation'

// Alamat halaman hasil (harus sama dengan route yang kamu daftarkan).
// Form ini hanya mengirim: ?daerah=...&kategori=...&jenis=... (jenis hanya untuk Tempat Wisata)
const FEATURE_PATH = '/rekomendasi'

const ICONS = { Utensils, CupSoda, Drum, Landmark, Scissors }
const GREEN = '#1f3d2f'
const EASE = [0.22, 1, 0.36, 1]

const POINTS = [
  'Pilih daerah dan kategori, hasilnya langsung disaring untukmu',
  'Rating dan ulasan wisatawan diambil dari TripAdvisor',
  'Dari kuliner sampai kerajinan, satu tempat pencarian',
]

/* ---------- pola kawung halus untuk latar panel hijau ---------- */
function KawungPattern() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]">
      <defs>
        <pattern id="kawung" width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#f5efe6" strokeWidth="1.2">
            <ellipse cx="16" cy="16" rx="10" ry="15" />
            <ellipse cx="48" cy="16" rx="10" ry="15" />
            <ellipse cx="16" cy="48" rx="10" ry="15" />
            <ellipse cx="48" cy="48" rx="10" ry="15" />
            <ellipse cx="32" cy="32" rx="15" ry="10" />
            <circle cx="32" cy="32" r="2.2" fill="#f5efe6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kawung)" />
    </svg>
  )
}

/* ---------- foto polaroid yang berganti sesuai kategori ---------- */
const Polaroid = forwardRef(function Polaroid({ cat, reduced }, ref) {
  const [failed, setFailed] = useState({})
  const Icon = ICONS[cat.icon]
  const showImg = cat.photo && !failed[cat.key]
  return (
    <motion.figure
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 26, rotate: -9, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotate: -4, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20, rotate: 6, scale: 0.96 }}
      transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
      className="absolute inset-0 m-0 flex flex-col bg-[#fffdf9] p-2.5 pb-3 shadow-[0_22px_40px_-14px_rgba(0,0,0,0.55)]"
    >
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[3deg] bg-[#e9d9b4]/90 shadow-sm"
      />
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#2a4a3a]">
        {showImg ? (
          <img
            src={cat.photo}
            alt={cat.caption}
            loading="lazy"
            onError={() => setFailed((f) => ({ ...f, [cat.key]: true }))}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={cat.caption}
            className="grid h-full w-full place-items-center"
            style={{ background: 'linear-gradient(150deg,#c9742f 0%,#8a3a1d 100%)' }}
          >
            <Icon size={54} strokeWidth={1.1} className="text-[#fbe9d0]" />
          </div>
        )}
      </div>
      <figcaption className="font-serif pt-2.5 text-center text-[13px] italic text-[#4a3a2d]">
        {cat.caption}
      </figcaption>
    </motion.figure>
  )
})

export default function RecommendationCTA() {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const uid = useId()
  const listId = `${uid}-list`

  const [catKey, setCatKey] = useState(CATEGORIES[0].key)
  const [daerah, setDaerah] = useState('')
  const [types, setTypes] = useState([])
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(-1)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const inputRef = useRef(null)
  const boxRef = useRef(null)
  const shake = useAnimationControls()

  const cat = CATEGORIES.find((c) => c.key === catKey)
  const isWisata = catKey === 'wisata'

  const suggestions = useMemo(() => {
    const q = daerah.trim().toLowerCase()
    if (!q) return POPULAR
    const starts = REGIONS.filter((r) => r.toLowerCase().startsWith(q))
    const has = REGIONS.filter((r) => !r.toLowerCase().startsWith(q) && r.toLowerCase().includes(q))
    return [...starts, ...has].slice(0, 7)
  }, [daerah])

  // tutup daftar saran saat klik di luar
  useEffect(() => {
    const down = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', down)
    return () => document.removeEventListener('pointerdown', down)
  }, [])

  const choose = (name) => {
    setDaerah(name); setOpen(false); setHi(-1); setError('')
  }

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setHi((h) => (h + 1) % suggestions.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setOpen(true); setHi((h) => (h <= 0 ? suggestions.length - 1 : h - 1)) }
    else if (e.key === 'Enter' && open && hi >= 0) { e.preventDefault(); choose(suggestions[hi]) }
    else if (e.key === 'Escape') { setOpen(false); setHi(-1) }
  }

  const toggleType = (t) => setTypes((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))

  const submit = (e) => {
    e.preventDefault()
    const value = daerah.trim()
    if (!value) {
      setError('Isi daerahnya dulu, misalnya Yogyakarta.')
      inputRef.current?.focus()
      if (!reduced) shake.start({ x: [0, -9, 8, -6, 4, 0], transition: { duration: 0.42 } })
      return
    }
    setBusy(true)
    const search = { daerah: value, kategori: catKey }
    if (isWisata && types.length) search.jenis = types.join(',')
    navigate({ to: FEATURE_PATH, search })
  }

  const summary = `${cat.label.toLowerCase() === 'tempat wisata' ? 'tempat wisata' : cat.label.toLowerCase()} di ${daerah.trim() || 'daerah pilihanmu'}`

  return (
    <section
      id="rekomendasi"
      className="relative overflow-hidden border-t border-clay/10 px-4 py-14 pb-24 md:px-9 md:py-24 md:pb-32"
      style={{ background: '#faf6f0' }}
    >
      <Ornament className="hidden xl:block absolute right-0 top-16 h-32 w-16" />

      <div className="relative z-10 mx-auto max-w-[1180px] overflow-hidden rounded-[28px] bg-[#fffdf9] shadow-[0_30px_70px_-30px_rgba(60,30,15,0.45)] ring-1 ring-clay/10 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        {/* ============ FORM ============ */}
        <form onSubmit={submit} noValidate className="relative px-6 py-9 sm:px-10 md:py-12">
          <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.15] text-clay">
            Cari budaya di daerahmu
          </h2>
          <p className="font-text m-0 mt-2 max-w-[44ch] text-[13px] leading-relaxed text-ink-soft">
            Pilih apa yang ingin kamu temukan, lalu tulis daerahnya.
          </p>

          {/* kategori */}
          <div role="radiogroup" aria-label="Kategori" className="mt-7 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const Icon = ICONS[c.icon]
              const on = c.key === catKey
              return (
                <button
                  key={c.key}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setCatKey(c.key)}
                  className={`font-text relative flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-clay/50 ${
                    on ? 'border-transparent text-white' : 'border-clay/20 bg-transparent text-ink-soft hover:border-clay/45 hover:text-clay'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId={`${uid}-pill`}
                      className="absolute inset-0 rounded-full bg-clay shadow-[0_8px_18px_-8px_rgba(120,45,20,0.7)]"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <Icon size={15} strokeWidth={1.6} className="relative" />
                  <span className="relative">{c.label}</span>
                </button>
              )
            })}
          </div>

          {/* daerah */}
          <motion.div animate={shake} className="relative mt-6" ref={boxRef}>
            <label
              htmlFor={`${uid}-daerah`}
              className={`group block cursor-text rounded-2xl border bg-white px-4 pb-2.5 pt-2 transition-[border-color,box-shadow] duration-200 ${
                error
                  ? 'border-[#c0392b] shadow-[0_0_0_4px_rgba(192,57,43,0.12)]'
                  : 'border-clay/20 focus-within:border-clay focus-within:shadow-[0_0_0_4px_rgba(138,58,29,0.12)]'
              }`}
            >
              <span className="font-text block text-[11px] text-ink-soft">Daerah</span>
              <span className="flex items-center gap-3">
                <MapPin size={18} strokeWidth={1.6} className="shrink-0 text-clay" />
                <input
                  id={`${uid}-daerah`}
                  ref={inputRef}
                  value={daerah}
                  autoComplete="off"
                  placeholder="Ketik kota atau provinsi"
                  role="combobox"
                  aria-expanded={open}
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-activedescendant={hi >= 0 ? `${uid}-opt-${hi}` : undefined}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${uid}-err` : undefined}
                  onChange={(e) => { setDaerah(e.target.value); setOpen(true); setHi(-1); setError('') }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={onInputKey}
                  className="font-text h-8 min-w-0 flex-1 border-0 bg-transparent p-0 text-[16px] text-ink outline-none placeholder:text-ink-soft/60"
                />
                {daerah && (
                  <button
                    type="button"
                    aria-label="Hapus daerah"
                    onClick={() => { setDaerah(''); inputRef.current?.focus() }}
                    className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-clay/10 text-clay"
                  >
                    <X size={13} strokeWidth={2} />
                  </button>
                )}
              </span>
            </label>

            <AnimatePresence>
              {open && suggestions.length > 0 && (
                <motion.ul
                  id={listId}
                  role="listbox"
                  aria-label="Saran daerah"
                  initial={reduced ? false : { opacity: 0, y: -6, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: reduced ? 0 : 0.18, ease: EASE }}
                  className="absolute inset-x-0 top-[calc(100%+8px)] z-30 m-0 max-h-[300px] list-none overflow-auto rounded-2xl border border-clay/15 bg-white p-1.5 shadow-[0_24px_44px_-18px_rgba(60,30,15,0.5)]"
                  data-lenis-prevent
                >
                  {!daerah.trim() && (
                    <li role="presentation" className="font-text px-3 pb-1 pt-1.5 text-[11px] text-ink-soft">
                      Sering dicari
                    </li>
                  )}
                  {suggestions.map((s, i) => (
                    <li
                      key={s}
                      id={`${uid}-opt-${i}`}
                      role="option"
                      aria-selected={i === hi}
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={() => choose(s)}
                      onMouseEnter={() => setHi(i)}
                      className={`font-text flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-ink ${i === hi ? 'bg-clay/10' : ''}`}
                    >
                      <MapPin size={15} strokeWidth={1.5} className="text-clay" />
                      {s}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          <div aria-live="polite" className="min-h-[20px]">
            {error && (
              <p id={`${uid}-err`} className="font-text m-0 mt-2 text-[12px] text-[#b3321f]">{error}</p>
            )}
          </div>

          {/* chip daerah populer */}
          {!error && (
            <div className="font-text -mt-3 mb-1 flex flex-wrap items-center gap-2 text-[12px] text-ink-soft">
              <span>Coba:</span>
              {POPULAR.slice(0, 4).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => choose(p)}
                  className={`cursor-pointer rounded-full border px-3 py-1 text-[12px] transition-colors ${
                    daerah === p ? 'border-clay bg-clay/10 text-clay' : 'border-clay/20 bg-transparent text-ink-soft hover:border-clay/50 hover:text-clay'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* jenis tempat wisata: hanya muncul untuk kategori Tempat Wisata */}
          <AnimatePresence initial={false}>
            {isWisata && (
              <motion.div
                key="jenis"
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <p id={`${uid}-jenis`} className="font-text m-0 mb-2.5 text-[12px] text-ink-soft">
                    Jenis tempat <span className="opacity-70">(boleh pilih lebih dari satu)</span>
                  </p>
                  <div role="group" aria-labelledby={`${uid}-jenis`} className="flex flex-wrap gap-2">
                    {PLACE_TYPES.map((t, i) => {
                      const on = types.includes(t)
                      return (
                        <motion.button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleType(t)}
                          initial={reduced ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: reduced ? 0 : 0.05 + i * 0.03, ease: EASE }}
                          whileTap={reduced ? undefined : { scale: 0.94 }}
                          className={`font-text flex h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-[13px] transition-colors ${
                            on ? 'border-clay bg-clay text-white' : 'border-clay/20 bg-transparent text-ink-soft hover:border-clay/50 hover:text-clay'
                          }`}
                        >
                          <AnimatePresence initial={false}>
                            {on && (
                              <motion.span
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 14, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="grid overflow-hidden"
                              >
                                <Check size={14} strokeWidth={2.2} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                          {t}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ringkasan + tombol */}
          <div className="mt-7 border-t border-clay/10 pt-6">
            <p className="font-text m-0 mb-4 text-[13px] text-ink-soft" aria-live="polite">
              Mencari <strong className="font-medium text-ink">{summary}</strong>
              {isWisata && types.length > 0 && <> ({types.length} jenis dipilih)</>}
            </p>
            <motion.button
              type="submit"
              disabled={busy}
              whileHover={reduced ? undefined : { y: -2 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              className="font-text group flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-0 bg-clay text-[15px] font-medium tracking-wide text-white shadow-[0_14px_28px_-12px_rgba(120,45,20,0.8)] outline-none transition-shadow hover:shadow-[0_18px_32px_-12px_rgba(120,45,20,0.9)] focus-visible:ring-4 focus-visible:ring-clay/30 disabled:cursor-wait disabled:opacity-80"
            >
              <Search size={18} strokeWidth={1.8} />
              {busy ? 'Membuka rekomendasi…' : 'Lihat rekomendasi'}
              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.button>
          </div>
        </form>

        {/* ============ PANEL KANAN ============ */}
        <aside
          className="relative overflow-hidden px-6 pb-10 pt-10 text-[#f5efe6] sm:px-10 lg:py-12"
          style={{ background: `linear-gradient(165deg, ${GREEN} 0%, #17301f 100%)` }}
        >
          <KawungPattern />
          <div className="relative z-10 flex h-full flex-col">
            <p
              className="font-serif m-0 text-[clamp(1.9rem,3.4vw,2.7rem)] italic leading-[1.1]"
              style={{ color: '#f1c987' }}
            >
              Temukan rasa dan cerita dari setiap daerah
            </p>

            <ul className="font-text m-0 mt-6 grid list-none gap-3 p-0 text-[13px] leading-relaxed text-[#e6ddcd]">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full bg-[#f1c987]/20 text-[#f1c987]">
                    <Check size={11} strokeWidth={2.6} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="relative mx-auto mt-9 aspect-[4/4.6] w-[min(78%,300px)] flex-none lg:mt-auto lg:mb-2">
              <AnimatePresence mode="popLayout" initial={false}>
                <Polaroid key={cat.key} cat={cat} reduced={reduced} />
              </AnimatePresence>
              <span className="font-text absolute -right-3 top-8 z-10 flex items-center gap-1.5 rounded-full bg-[#f1c987] px-3 py-1.5 text-[11px] font-medium text-[#3a2410] shadow-lg sm:-right-6 rotate-[4deg]">
                <Star size={12} strokeWidth={0} fill="currentColor" />
                Ulasan dari TripAdvisor
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}