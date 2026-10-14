import { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollDock from '../../components/ScrollDock'
import SplashScreen from '../../components/SplashScreen'
import { useLenis } from '../../hooks/useLenis'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getLenis, scrollToId } from '../../lib/lenis'

export default function Layout() {
  useLenis()
  const reduced = useReducedMotion()
  const navigate = useNavigate()
  const path = useRouterState({ select: (st) => st.location.pathname })

  // Splash: tampil saat pertama buka dan setiap pindah halaman
  const [prev, setPrev] = useState(path)
  const [show, setShow] = useState(true)
  const first = useRef(true)
  if (prev !== path) {
    setPrev(path)
    setShow(true)
  }
  const hold = first.current ? 1.5 : 1

  useEffect(() => {
    if (!show) return
    const lenis = getLenis()
    lenis?.stop()
    if (!first.current) {
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true })
    }
    const t = setTimeout(() => {
      first.current = false
      setShow(false)
      getLenis()?.start()
    }, reduced ? 300 : hold * 1000)
    return () => clearTimeout(t)
  }, [show, path, reduced, hold])

  useEffect(() => {
    const h = (e) => { navigate({ to: '/' }); setTimeout(() => scrollToId(e.detail), 500) }
    addEventListener('go-home', h)
    return () => removeEventListener('go-home', h)
  }, [navigate])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-paper focus:p-2">Lewati ke konten</a>
      <Navbar />
      <main id="main" className="pt-14"><Outlet /></main>
      <Footer />
      <ScrollDock />
      <SplashScreen show={show} instant={first.current} reduced={reduced} hold={hold} />
    </>
  )
}