import { useSyncExternalStore } from 'react'
let current = 'sumatra'; const subs = new Set()
export const setIsland = (v) => { current = v; subs.forEach(f => f()) }
export function useIslandState() {
  const v = useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f) }, () => current)
  return [v, setIsland]
}
