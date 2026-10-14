import anime from 'animejs'
export const drawLines = (targets, { delay = 0, stagger = 140, duration = 1200 } = {}) =>
  anime({ targets, strokeDashoffset:[anime.setDashoffset, 0], duration, delay:anime.stagger(stagger, { start:delay }), easing:'easeInOutSine' })
export const popMarkers = (targets, { delay = 0, stagger = 140 } = {}) =>
  anime({ targets, opacity:[0, 1], scale:[0, 1], duration:500, delay:anime.stagger(stagger, { start:delay }), easing:'easeOutBack' })
// Menggambar semua <path> di dalam el sekali, saat pertama terlihat. Mengembalikan fungsi pembersih.
export function drawOnView(el) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return; io.disconnect()
    drawLines(el.querySelectorAll('path'), { stagger:120, duration:1800 })
  }, { threshold:.4 })
  io.observe(el); return () => io.disconnect()
}
