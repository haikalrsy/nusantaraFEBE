import { useEffect, useState } from 'react'
export function useReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)'
  const [r, set] = useState(() => typeof window !== 'undefined' && matchMedia(q).matches)
  useEffect(() => { const m = matchMedia(q), f = () => set(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  return r
}
