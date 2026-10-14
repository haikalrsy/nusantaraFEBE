import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { navItems } from './Navbar'
export default function MobileMenu({ open, onClose, onGo }) {
  useEffect(() => { if (!open) return; const k = (e) => e.key === 'Escape' && onClose(); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 bg-paper z-50 px-6 pt-4"
          initial={{ clipPath:'inset(0 0 100% 0)' }} animate={{ clipPath:'inset(0 0 0% 0)' }} exit={{ clipPath:'inset(0 0 100% 0)' }} transition={{ duration:.5, ease:[.76,0,.24,1] }}>
          <div className="flex justify-between items-center h-10">
            <span className="font-serif text-lg">NUSANTARA</span>
            <button aria-label="Tutup menu" onClick={onClose} className="bg-transparent border-0 p-1 cursor-pointer"><X size={20} strokeWidth={1.5} /></button>
          </div>
          <ul className="list-none p-0 mt-16 grid gap-2">
            {navItems.map(n => (
              <li key={n.id} className="border-b border-rule">
                <a href={'#' + n.id} onClick={(e) => { e.preventDefault(); onGo(n.id) }} className="block py-4 font-serif text-4xl no-underline">{n.label}</a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
