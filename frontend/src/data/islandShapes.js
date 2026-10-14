// Siluet SVG buatan tangan (disederhanakan). viewBox 1000 x 440.
export const MAP_W = 1000, MAP_H = 440
export const islandShapes = [
  { slug:'sumatra', d:'M40,70 L90,50 L150,100 L215,160 L270,240 L290,290 L255,300 L195,250 L120,190 L60,130 Z' },
  { slug:'jawa', d:'M310,332 L420,312 L520,318 L562,338 L500,348 L400,344 L320,350 Z' },
  { slug:'kalimantan', d:'M330,90 L390,50 L450,60 L490,110 L500,170 L470,230 L410,250 L350,230 L320,170 L310,120 Z' },
  { slug:'sulawesi', d:'M580,100 L620,90 L630,130 L670,150 L700,140 L690,172 L650,176 L640,220 L620,262 L600,230 L610,190 L585,160 L570,130 Z' },
  { slug:'bali', d:'M574,346 L596,340 L600,356 L578,360 Z' },
  { slug:'nusa-tenggara', d:'M612,352 L680,345 L742,350 L736,364 L670,364 L614,366 Z' },
  { slug:'maluku', d:'M740,150 L765,140 L776,176 L750,186 Z M792,200 L816,194 L822,236 L796,242 Z' },
  { slug:'papua', d:'M830,122 L900,100 L960,130 L982,172 L932,202 L902,252 L862,272 L832,232 L852,202 L812,162 Z' },
]
// viewBox pas untuk satu siluet (hanya perintah M/L/Z).
export function viewBoxOf(d, pad = 6) {
  const n = d.match(/-?\d+\.?\d*/g).map(Number), xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1)
  const x = Math.min(...xs) - pad, y = Math.min(...ys) - pad
  return `${x} ${y} ${Math.max(...xs) + pad - x} ${Math.max(...ys) + pad - y}`
}
