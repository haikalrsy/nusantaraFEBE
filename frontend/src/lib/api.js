import { islands as fallbackIslands } from '../data/islands'
import { cultures as fallbackCultures } from '../data/cultures'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

/**
 * Fetch all islands from Laravel API with fallback to static data
 */
export async function getIslands() {
  try {
    const res = await fetch(`${API_BASE}/islands`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) && data.length > 0 ? data : fallbackIslands
  } catch (err) {
    console.warn('[API] Failed to fetch islands, using fallback data:', err.message)
    return fallbackIslands
  }
}

/**
 * Fetch single island by slug from Laravel API with fallback to static data
 */
export async function getIslandBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/islands/${slug}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return data || fallbackIslands.find((i) => i.slug === slug)
  } catch (err) {
    console.warn(`[API] Failed to fetch island ${slug}, using fallback data:`, err.message)
    return fallbackIslands.find((i) => i.slug === slug)
  }
}

/**
 * Fetch all cultures with optional filters from Laravel API with fallback
 */
export async function getCultures(params = {}) {
  try {
    const query = new URLSearchParams()
    if (params.island && params.island !== 'Semua') query.append('island', params.island)
    if (params.category && params.category !== 'Semua') query.append('category', params.category)
    if (params.search) query.append('search', params.search)

    const url = `${API_BASE}/cultures${query.toString() ? '?' + query.toString() : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) && data.length > 0 ? data : filterFallbackCultures(params)
  } catch (err) {
    console.warn('[API] Failed to fetch cultures, using fallback data:', err.message)
    return filterFallbackCultures(params)
  }
}

/**
 * Fetch single culture by slug from Laravel API with fallback
 */
export async function getCultureBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/cultures/${slug}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return data || fallbackCultures.find((c) => c.slug === slug)
  } catch (err) {
    console.warn(`[API] Failed to fetch culture ${slug}, using fallback data:`, err.message)
    return fallbackCultures.find((c) => c.slug === slug)
  }
}

function filterFallbackCultures(params = {}) {
  let list = fallbackCultures
  if (params.island && params.island !== 'Semua') {
    list = list.filter((c) => c.island === params.island)
  }
  if (params.category && params.category !== 'Semua') {
    list = list.filter((c) => c.category === params.category)
  }
  if (params.search) {
    const q = params.search.toLowerCase()
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.place.toLowerCase().includes(q) ||
        (c.summary && c.summary.toLowerCase().includes(q))
    )
  }
  return list
}
