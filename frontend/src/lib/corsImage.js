// Host yang sudah mengirim header CORS, jadi aman dipakai langsung di WebGL
const SAFE = ['unsplash.com', 'wikimedia.org']

// Foto dari host lain dilewatkan proxy gambar (mengirim CORS + mengecilkan ukuran)
export function corsSafe(url) {
  if (!url) return url
  if (url.startsWith('/') || url.startsWith('data:') || url.startsWith('blob:')) return url
  try {
    const host = new URL(url).hostname
    if (SAFE.some((h) => host === h || host.endsWith('.' + h))) return url
  } catch {
    return url
  }
  return `https://images.weserv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//, ''))}&w=1200&q=80&output=jpg`
}