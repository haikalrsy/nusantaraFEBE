import { useEffect } from 'react'
import { startLenis, stopLenis } from '../lib/lenis'
import { useReducedMotion } from './useReducedMotion'
export function useLenis() {
  const reduced = useReducedMotion()
  useEffect(() => { if (reduced) return; startLenis(); return stopLenis }, [reduced])
}
