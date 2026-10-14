const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

async function get(path, params = {}) {
  const url = new URL(`${API}${path}`, window.location.origin)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== '') url.searchParams.set(k, v)
  })
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || 'Terjadi kesalahan, coba lagi.')
  }
  return res.json()
}

export const fetchPlaceOptions = () => get('/places/options')
export const searchPlaces = ({ region, category, type }) =>
  get('/places/search', { region, category, type })