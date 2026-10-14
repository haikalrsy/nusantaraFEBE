import { cultures } from '../data/cultures'
import { islands } from '../data/islands'

export const SUGGESTIONS = ['Makanan Kalimantan', 'Tari Bali', 'Tenun Sumba', 'Pakaian Papua', 'Rendang', 'Upacara adat']

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
const words = (s) => norm(s).split(' ').filter(Boolean)

const STOP = new Set([
  'di', 'dan', 'yang', 'dari', 'khas', 'budaya', 'untuk', 'apa', 'mau', 'kepoin', 'ke', 'pulau',
  'tanah', 'dengan', 'atau', 'the', 'of', 'nih', 'dong', 'tentang', 'cari', 'carikan', 'tolong',
  'ada', 'itu', 'ini', 'saja', 'aja',
])
const TOKEN_ALIAS = { tarian: 'tari' }

const ISLAND_ALIASES = {
  jawa: ['java'],
  sumatra: ['sumatera'],
  kalimantan: ['borneo'],
  sulawesi: ['celebes'],
  'nusa-tenggara': ['ntt', 'ntb'],
}
const ISLANDS = islands.map((i) => ({
  slug: i.slug,
  name: i.name,
  names: [...new Set([norm(i.name).replace(/ /g, ''), ...(ISLAND_ALIASES[i.slug] || [])])],
}))

const CATS = {
  Makanan: ['makanan', 'kuliner', 'masakan', 'makan', 'food', 'hidangan'],
  Pakaian: ['pakaian', 'busana', 'baju', 'kain', 'fashion', 'sandang', 'tekstil'],
  Tradisi: ['tradisi', 'upacara', 'ritual', 'festival'],
}

const thr = (n) => (n <= 4 ? 0 : n <= 7 ? 1 : 2)

// Jarak edit (Damerau-Levenshtein sederhana: huruf tertukar dihitung 1)
function osa(a, b) {
  const al = a.length, bl = b.length
  const d = Array.from({ length: al + 1 }, (_, i) => {
    const r = new Array(bl + 1).fill(0)
    r[0] = i
    return r
  })
  for (let j = 0; j <= bl; j++) d[0][j] = j
  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
      }
    }
  }
  return d[al][bl]
}

function matchEntity(t, names, prefixMin, fuzzyMin) {
  for (const n of names) {
    if (t === n) return true
    if (t.length >= prefixMin && n.startsWith(t)) return true
    if (t.length >= fuzzyMin) {
      const k = thr(t.length)
      if (k && Math.abs(t.length - n.length) <= k && osa(t, n) <= k) return true
    }
  }
  return false
}

function wordScore(t, w) {
  if (t === w) return 1
  if (t.length >= 2 && w.startsWith(t)) return 0.85
  if (t.length >= 3 && w.includes(t)) return 0.5
  if (t.length >= 4) {
    const k = thr(t.length)
    if (k) {
      if (Math.abs(t.length - w.length) <= k) {
        const d = osa(t, w)
        if (d <= k) return 0.65 - d * 0.1
      }
      if (w.length > t.length && osa(t, w.slice(0, t.length)) <= k) return 0.45
    }
  }
  return 0
}

const best = (t, list) => list.reduce((m, w) => Math.max(m, wordScore(t, w)), 0)
const bestLoose = (t, list) =>
  list.reduce((m, w) => Math.max(m, t === w ? 1 : t.length >= 3 && w.startsWith(t) ? 0.85 : 0), 0)

let INDEX
function getIndex() {
  if (!INDEX) {
    INDEX = cultures.map((c) => ({
      c,
      title: words(c.title),
      titleStr: norm(c.title),
      place: words(c.place),
      cat: words(c.category),
      body: [...new Set(words(`${c.summary} ${c.description}`))],
    }))
  }
  return INDEX
}

function scoreEntry(e, tokens, qStr, mode) {
  let total = 0
  let matched = 0
  for (const t of tokens) {
    const s = Math.max(
      best(t, e.title) * 3,
      best(t, e.place) * 1.5,
      best(t, e.cat) * 1.5,
      bestLoose(t, e.body) * 0.4
    )
    if (s > 0) { matched++; total += s }
    else if (mode === 'and') return 0
  }
  if (!matched) return 0
  if (e.titleStr.includes(qStr)) total += 3
  if (e.titleStr.startsWith(qStr)) total += 2
  return total
}

const EMPTY = { results: [], total: 0, filters: { islands: [], categories: [] } }

export function searchCultures(query, limit = 8) {
  const qStr = norm(query).replace(/nusa\s*teng+ara/g, 'nusatenggara')
  if (!qStr) return EMPTY
  const tokens = qStr
    .split(' ')
    .filter((t) => t.length >= 2 && !STOP.has(t))
    .map((t) => TOKEN_ALIAS[t] || t)
  if (!tokens.length) return EMPTY

  const islandSet = new Set()
  const catSet = new Set()
  const textTokens = []
  for (const t of tokens) {
    const isl = ISLANDS.find((i) => matchEntity(t, i.names, 3, 5))
    if (isl) { islandSet.add(isl.slug); continue }
    const cat = Object.keys(CATS).find((k) => matchEntity(t, CATS[k], 4, 5))
    if (cat) { catSet.add(cat); continue }
    textTokens.push(t)
  }

  const idx = getIndex()
  const run = (pool, toks) => {
    if (!toks.length) return pool.map((e) => ({ e, s: 1 }))
    let out = pool.map((e) => ({ e, s: scoreEntry(e, toks, qStr, 'and') })).filter((x) => x.s > 0)
    if (!out.length && toks.length > 1) {
      out = pool.map((e) => ({ e, s: scoreEntry(e, toks, qStr, 'or') })).filter((x) => x.s > 0)
    }
    return out
  }

  const pool = idx.filter(
    (e) => (!islandSet.size || islandSet.has(e.c.island)) && (!catSet.size || catSet.has(e.c.category))
  )
  let out = run(pool, textTokens)
  let usedIslands = islandSet
  let usedCats = catSet

  // Kalau filter terlalu ketat dan tidak ada hasil, ulangi dengan semua kata sebagai teks biasa
  if (!out.length && (islandSet.size || catSet.size)) {
    out = run(idx, tokens)
    usedIslands = new Set()
    usedCats = new Set()
  }

  out.sort((a, b) => b.s - a.s)
  return {
    results: out.slice(0, limit).map((x) => x.e.c),
    total: out.length,
    filters: {
      islands: ISLANDS.filter((i) => usedIslands.has(i.slug)).map((i) => i.name),
      categories: [...usedCats],
    },
  }
}