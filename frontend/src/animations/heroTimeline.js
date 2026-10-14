import gsap from 'gsap'
export const heroTitle = () => gsap.from('[data-hero-title]', { yPercent:105, duration:1.3, ease:'power4.out', delay:.1 })
// Pulau bergeser dari pusat peta ke posisi akhir, satu per satu.
export function assembleIslands(layer, W, H) {
  layer.querySelectorAll('[data-island]').forEach((g, i) => {
    const b = g.getBBox()
    gsap.from(g, { x:(b.x + b.width / 2 - W / 2) * .5, y:(b.y + b.height / 2 - H / 2) * .5 - 50, opacity:0, duration:2.2, ease:'power3.out', delay:.15 + i * .1 })
  })
}
export const annotationsFade = (sel) => gsap.from(sel, { opacity:0, duration:1, delay:1.8, stagger:.12 })
