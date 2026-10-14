import { useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import ImageSlot from '../components/ImageSlot'
import IslandNavigation from '../components/IslandNavigation'
import CultureFilters from '../components/CultureFilters'
import CultureCard from '../components/CultureCard'
import VideoModal from '../components/VideoModal'
import MagneticButton from '../components/MagneticButton'
import { useNusantara } from '../context/NusantaraContext'
import { useIslandState } from '../hooks/useIslandState'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToId } from '../lib/lenis'
import { paperSheet } from '../animations/paperTransition'
import { soundFX } from '../lib/sound'

export default function IslandExplorer() {
  const { islands, cultures } = useNusantara()
  const [slug, setSlug] = useIslandState()
  const [cat, setCat] = useState('Semua')
  const [showVideo, setShowVideo] = useState(false)
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const row = useRef(null)
  const [atEnd, setAtEnd] = useState(false)

  const island = islands.find(i => i.slug === slug) || islands[0] || {}
  const list = useMemo(() => cultures.filter(c => c.island === slug && (cat === 'Semua' || c.category === cat)), [cultures, slug, cat])
  const cover = island?.image || (cultures.find(c => c.island === slug && c.src)?.src ?? null)
  const dur = reduced ? 0 : 0.6

  const slide = () => {
    const el = row.current
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' })
  }
  const onScroll = (e) => {
    const el = e.currentTarget
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  const handleIslandChange = (newSlug) => {
    soundFX.playSelect()
    const target = islands.find(i => i.slug === newSlug)
    if (target?.narration) {
      soundFX.speak(target.narration)
    }
    setSlug(newSlug)
  }

  // Klik kartu -> pindah ke halaman detail budaya (bukan pop up)
  const openCulture = (culture) => {
    navigate({ to: '/culture/$slug', params: { slug: culture.slug } })
  }

  return (
    <section id="islands" className="scroll-mt-14 transition-colors duration-500">
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-9 pt-16 pb-6 overflow-hidden">
        <SectionLabel>Eksplorasi Wilayah Nusantara</SectionLabel>
        <div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-clay m-0">The Islands</h2>
          <p className="font-text text-sm text-ink-soft mt-2 mb-0">
            Pilih pulau di bawah atau di peta untuk membedah kebudayaan & cerita secara lengkap dan rinci.
          </p>
        </div>
      </div>

      {/* Navigasi Tab Semua Pulau */}
      <IslandNavigation active={slug} onChange={handleIslandChange} />

      {/* Panel Eksplorasi Rinci Pulau yang Dipilih */}
      <div id="island-panel" role="tabpanel" aria-labelledby={'tab-' + slug} className="mx-auto max-w-[1440px] px-6 md:px-9 py-8">
        <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-8 items-start">

          {/* Kolom Kiri: Kartu Hero Pulau dengan Rincian Mendalam */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={slug}
              {...paperSheet(dur)}
              className="relative min-h-[460px] lg:min-h-[520px] rounded-2xl bg-ink text-paper overflow-hidden flex flex-col justify-end shadow-xl border border-rule/30"
            >
              <ImageSlot src={cover} alt={`Budaya ${island.name}`} className="absolute inset-0 w-full h-full scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />

              {/* Badge Informasi & Statistik Pulau */}
              <div className="relative p-6 md:p-9 z-10">

                <h3 className="text-[clamp(2.4rem,5vw,3.6rem)] tracking-[.04em] uppercase m-0 leading-none font-serif text-paper">
                  {island.name}
                </h3>
                <p className="font-text text-sm md:text-base text-amber-200/90 mt-2 mb-3 max-w-[42ch] font-medium leading-relaxed">
                  {island.tagline}
                </p>

                {/* Poin-Poin Ikonik */}
                {island.highlights && (
                  <div className="mb-6">
                    <p className="text-[11px] text-paper/60 uppercase tracking-widest mb-2 font-medium">Ikon Kebudayaan Khas:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {island.highlights.map(h => (
                        <span key={h} className="text-[11px] px-2.5 py-1 rounded-md bg-paper/15 backdrop-blur text-paper border border-paper/10">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-paper/20">
                  <MagneticButton
                    onClick={() => setShowVideo(true)}
                    className="inline-flex items-center gap-2 bg-clay text-paper rounded-full border-0 px-5 py-2.5 text-xs cursor-pointer hover:bg-clay/90 shadow-md font-medium"
                  >
                    <Play size={13} fill="currentColor" /> Tonton Video Kesenian {island.name}
                  </MagneticButton>
                  <button
                    type="button"
                    onClick={() => scrollToId('cultures')}
                    className="inline-flex items-center gap-1.5 bg-paper/20 backdrop-blur-sm text-paper rounded-full border border-paper/30 px-4 py-2 text-xs cursor-pointer hover:bg-paper/30 transition-colors"
                  >
                    Galeri Budaya <ArrowRight size={12} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Kolom Kanan: Filter & Daftar Budaya Pulau ini */}
          <div className="min-w-0 bg-paper-deep/30 p-5 md:p-7 rounded-2xl border border-rule">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-ink-soft font-medium">Koleksi Budaya {island.name}</span>
              <span className="text-xs text-clay font-medium">{list.length} Warisan Budaya</span>
            </div>

            <CultureFilters value={cat} onChange={setCat} />

            <div className="relative mt-6">
              {/* UBAH: hanya className <ul> ini yang ditambah efek hover foto (zoom halus + sedikit cerah) */}
              <ul
                ref={row}
                onScroll={onScroll}
                aria-live="polite"
                className="flex gap-4 overflow-x-auto snap-x p-0 m-0 [scrollbar-width:none] pb-4
                  [&_li]:cursor-pointer
                  [&_li_img]:transition-all [&_li_img]:duration-700 [&_li_img]:ease-[cubic-bezier(0.22,1,0.36,1)] [&_li_img]:will-change-transform
                  [&_li:hover_img]:scale-110 [&_li:hover_img]:brightness-110 [&_li:hover_img]:saturate-110"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {list.map(c => (
                    <CultureCard key={c.slug} culture={c} onClick={openCulture} />
                  ))}
                </AnimatePresence>
              </ul>

              {list.length === 0 && (
                <div className="py-12 text-center text-sm text-ink-soft bg-paper/60 rounded-xl border border-rule/50 p-6">
                  <p className="m-0 mb-3">Belum ada item untuk kategori <strong>{cat}</strong> di pulau {island.name}.</p>
                  <button
                    type="button"
                    onClick={() => setCat('Semua')}
                    className="px-4 py-2 rounded-full bg-clay text-paper text-xs cursor-pointer border-0"
                  >
                    Tampilkan Semua Budaya {island.name}
                  </button>
                </div>
              )}

              {list.length > 2 && (
                <button
                  type="button"
                  onClick={slide}
                  aria-label={atEnd ? 'Kembali ke awal' : 'Geser kartu berikutnya'}
                  className="absolute -right-3 top-[32%] size-9 rounded-full bg-paper border border-rule shadow-md grid place-items-center cursor-pointer hover:border-clay hover:text-clay transition-all z-10"
                >
                  {atEnd ? <ChevronLeft size={16} strokeWidth={1.8} /> : <ChevronRight size={16} strokeWidth={1.8} />}
                </button>
              )}
            </div>

            {/* Fakta Singkat & Sejarah Pulau */}
            <div className="mt-6 pt-5 border-t border-rule/80 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-paper p-3 rounded-lg border border-rule/50">
                <div className="text-ink-soft text-[10px] uppercase">Ikon Utama</div>
                <div className="font-serif text-clay text-sm font-medium mt-1">{island.stats?.ikon || 'Cagar Budaya'}</div>
              </div>
              <div className="bg-paper p-3 rounded-lg border border-rule/50">
                <div className="text-ink-soft text-[10px] uppercase">Kekayaan Adat</div>
                <div className="font-serif text-clay text-sm font-medium mt-1">{island.stats?.budaya || 'Beragam'}</div>
              </div>
              <div className="bg-paper p-3 rounded-lg border border-rule/50 col-span-2 md:col-span-1">
                <div className="text-ink-soft text-[10px] uppercase">Luas Wilayah</div>
                <div className="font-serif text-clay text-sm font-medium mt-1">{island.stats?.wilayah || '-'}</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Modal Popup Video Dokumenter Kesenian Daerah */}
      {showVideo && (
        <VideoModal island={island} onClose={() => setShowVideo(false)} />
      )}
    </section>
  )
}