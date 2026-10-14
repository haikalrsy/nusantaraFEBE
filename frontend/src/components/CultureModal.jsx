import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles, BookOpen, Layers } from 'lucide-react'
import ImageSlot from './ImageSlot'

export default function CultureModal({ culture: c, onClose }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    setActiveImg(0)
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && c?.gallery) {
        setActiveImg(prev => (prev + 1) % c.gallery.length)
      }
      if (e.key === 'ArrowLeft' && c?.gallery) {
        setActiveImg(prev => (prev - 1 + c.gallery.length) % c.gallery.length)
      }
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = 'unset'
    }
  }, [c, onClose])

  if (!c) return null
  const gallery = c.gallery || [{ src: c.src, caption: c.title }]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-paper text-ink rounded-2xl shadow-2xl border border-rule z-10 flex flex-col [scrollbar-width:thin]"
        >
          {/* Header Action */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-paper/95 backdrop-blur-sm border-b border-rule">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-clay/10 text-clay border border-clay/20">
                {c.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-ink-soft">
                <MapPin size={13} className="text-clay" /> {c.place}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup jendela rincian"
              className="p-1.5 rounded-full bg-paper-deep hover:bg-rule/80 text-ink transition-colors cursor-pointer border-0"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Galeri Interaktif Minimal 3 Foto */}
            <div>
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-ink shadow-md border border-rule">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <ImageSlot
                      src={gallery[activeImg]?.src}
                      alt={gallery[activeImg]?.caption || c.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Caption Gambar */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-paper">
                  <p className="text-xs sm:text-sm font-sans m-0 drop-shadow-sm">
                    {gallery[activeImg]?.caption || c.title}
                  </p>
                </div>

                {/* Tombol Geser Prev/Next */}
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Foto sebelumnya"
                      onClick={() => setActiveImg(prev => (prev - 1 + gallery.length) % gallery.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-paper/85 backdrop-blur-sm text-ink grid place-items-center cursor-pointer border border-rule hover:bg-paper transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label="Foto berikutnya"
                      onClick={() => setActiveImg(prev => (prev + 1) % gallery.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-paper/85 backdrop-blur-sm text-ink grid place-items-center cursor-pointer border border-rule hover:bg-paper transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 [scrollbar-width:none]">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImg(idx)}
                    className={`relative shrink-0 w-20 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden border-2 cursor-pointer p-0 transition-all ${
                      activeImg === idx ? 'border-clay shadow-md ring-2 ring-clay/20' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ImageSlot src={img.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Judul & Narasi Detail */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-clay m-0 mb-3 tracking-wide">
                {c.title}
              </h2>
              <p className="font-text text-sm sm:text-base leading-relaxed text-ink/90 font-medium">
                {c.summary || c.description}
              </p>
              {c.description && c.summary && (
                <p className="font-text text-xs sm:text-sm leading-relaxed text-ink-soft mt-3">
                  {c.description}
                </p>
              )}
            </div>

            {/* Fakta Menarik & Keunikan */}
            {c.funFacts && c.funFacts.length > 0 && (
              <div className="p-5 sm:p-6 rounded-xl bg-paper-deep/70 border border-rule space-y-3">
                <div className="flex items-center gap-2 text-clay font-medium text-sm">
                  <Sparkles size={16} /> Keunikan & Fakta Menarik
                </div>
                <ul className="space-y-2 m-0 pl-5 text-xs sm:text-sm text-ink-soft leading-relaxed font-text">
                  {c.funFacts.map((fact, idx) => (
                    <li key={idx}>
                      <span className="text-ink font-normal">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="sticky bottom-0 z-10 px-6 py-4 bg-paper/95 backdrop-blur-sm border-t border-rule flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-clay text-paper text-xs font-medium cursor-pointer border-0 hover:bg-clay/90 transition-colors shadow-sm"
            >
              Tutup Rincian
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
