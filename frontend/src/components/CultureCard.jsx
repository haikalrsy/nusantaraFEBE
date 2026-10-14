import { forwardRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import ImageSlot from './ImageSlot'

const CultureCard = forwardRef(function CultureCard({ culture: c, onClick }, ref) {
  const content = (
    <div className="group block no-underline text-left cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
      {/* UBAH: bayangan & border lebih lembut, transisi 700ms ease-in-out, tambah relative untuk lapisan cahaya */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-ink shadow-sm border border-rule/50 transform-gpu isolate transition-[box-shadow,border-color] duration-700 ease-in-out group-hover:shadow-[0_14px_30px_-12px_rgba(60,30,15,0.35)] group-hover:border-clay/30">
        <div
          className="w-full h-full transform-gpu transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          style={{ willChange: 'transform' }}
        >
          {/* UBAH: filter pada <img> diberi transisi halus agar perubahan warna tidak tiba-tiba */}
          <ImageSlot src={c.src} alt={c.title} className="w-full h-full object-cover !transition-[filter] !duration-[900ms] !ease-in-out" />
        </div>
        {/* UBAH: lapisan cahaya lembut, fade in saat hover & fade out saat keluar */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[800ms] ease-in-out group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
      </div>
      <p className="text-xs font-normal mt-2.5 mb-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-clay font-serif text-ink">{c.title}</p>
      <p className="text-[11px] text-ink-soft m-0 mt-0.5">{c.category} • {c.place}</p>
    </div>
  )

  return (
    <motion.li ref={ref} layout initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:.45, ease:[.22,1,.36,1] }}
      className="snap-start shrink-0 w-[46%] sm:w-[32%] md:w-[28%] list-none">
      {onClick ? (
        <button type="button" onClick={() => onClick(c)} className="w-full bg-transparent border-0 p-0 text-left cursor-pointer">
          {content}
        </button>
      ) : (
        <Link to="/culture/$slug" params={{ slug:c.slug }} className="no-underline">
          {content}
        </Link>
      )}
    </motion.li>
  )
})
export default CultureCard  