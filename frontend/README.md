# Nusantara

    npm install
    npm run dev      # pengembangan
    npm run build    # produksi (folder dist)

## Memasang foto
- Foto: taruh file di `public/images/` sesuai `DAFTAR-FOTO.txt` (mis. `batik.jpg`). Override URL: `src/data/images.js`.
- Galeri Rumah Gadang: `src/data/featured.js`.
Slug tanpa foto tampil sebagai blok cadangan. Pastikan lisensi tiap foto sebelum dipakai.

## Struktur
`sections/` blok halaman, `components/` komponen berulang, `data/` konten, `hooks/` state & motion, `lib/` Lenis & util.
GSAP memegang transform berbasis scroll, Framer Motion memegang layout/hover, Anime.js untuk garis SVG, Three.js hanya di hero.
