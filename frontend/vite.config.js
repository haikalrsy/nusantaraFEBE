import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
// Tailwind v4 diproses oleh plugin Vite. `postcss.plugins: []` mencegah postcss.config.js lama
// (Tailwind v3) ikut berjalan dan memicu error "@layer base ... @tailwind base".
export default defineConfig({ plugins: [react(), tailwind()], css: { postcss: { plugins: [] } } })
