// Transisi "lembar kertas": konten disapu masuk/keluar dengan clip-path.
const ease = [.76, 0, .24, 1]
export const paperSheet = (duration = .6) => ({
  initial:{ clipPath:'inset(0 0 0 100%)' }, animate:{ clipPath:'inset(0 0 0 0%)' }, exit:{ clipPath:'inset(0 100% 0 0)' }, transition:{ duration, ease } })
export const wipeDown = (duration = .9) => ({
  initial:{ clipPath:'inset(0 0 100% 0)' }, animate:{ clipPath:'inset(0 0 0% 0)' }, transition:{ duration, ease } })
