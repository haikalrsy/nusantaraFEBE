import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useNusantara } from '../context/NusantaraContext'
export default function SearchDialog({ open, onClose }) {
  const { cultures } = useNusantara()
  const [q, setQ] = useState(''), ref = useRef(null)
  useEffect(() => { if (!open) return; setQ(''); ref.current?.focus(); const k = (e) => e.key === 'Escape' && onClose(); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [open, onClose])
  const res = useMemo(() => q.trim() ? cultures.filter(c => (c.title + c.category + c.place).toLowerCase().includes(q.toLowerCase())) : cultures.slice(0, 5), [cultures, q])
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Cari budaya" className="fixed inset-0 z-50 bg-paper/95 px-6 pt-20"
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}>
          <div className="mx-auto max-w-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center border-b border-ink">
              <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari budaya, mis. Batik" className="flex-1 bg-transparent border-0 outline-none font-serif text-3xl py-3 placeholder:text-ink-soft/60" />
              <button aria-label="Tutup pencarian" onClick={onClose} className="bg-transparent border-0 cursor-pointer"><X size={18} strokeWidth={1.5} /></button>
            </div>
            <ul className="list-none p-0 mt-4">
              {res.length === 0 && <li className="py-4 text-sm text-ink-soft">Tidak ada budaya yang cocok dengan "{q}".</li>}
              {res.map(c => (
                <li key={c.slug} className="border-b border-rule">
                  <Link to="/culture/$slug" params={{ slug: c.slug }} onClick={onClose} className="flex justify-between py-3 no-underline">
                    <span className="font-serif text-xl">{c.title}</span><span className="text-xs text-ink-soft self-center">{c.category}, {c.place}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
