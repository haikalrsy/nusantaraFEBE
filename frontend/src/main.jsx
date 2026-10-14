import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { queryClient } from './lib/queryClient'
import Layout from './sections/routes/Layout'
import Home from './sections/routes/Home'
import CulturePage from './sections/routes/CulturePage'
import RecommendationPage from './sections/routes/RecommendationPage'
import { NusantaraProvider } from './context/NusantaraContext'
import './styles/index.css'
const root = createRootRoute({ component: Layout })
const index = createRoute({ getParentRoute: () => root, path: '/', component: Home })
const culture = createRoute({ getParentRoute: () => root, path: '/culture/$slug', component: CulturePage })
const rekomendasi = createRoute({ getParentRoute: () => root, path: '/rekomendasi', component: RecommendationPage })
const router = createRouter({ routeTree: root.addChildren([index, culture, rekomendasi]), defaultPreload: 'intent', scrollRestoration: true })
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NusantaraProvider>
      <RouterProvider router={router} />
    </NusantaraProvider>
  </QueryClientProvider>
)