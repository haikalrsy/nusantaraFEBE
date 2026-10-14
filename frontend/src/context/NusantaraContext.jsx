import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getIslands, getCultures } from '../lib/api'
import { islands as fallbackIslands } from '../data/islands'
import { cultures as fallbackCultures } from '../data/cultures'

const NusantaraContext = createContext(null)

export function NusantaraProvider({ children }) {
  // Query islands from Laravel API (staleTime 5 menit)
  const {
    data: islandsData,
    isLoading: islandsLoading,
    isError: islandsError,
  } = useQuery({
    queryKey: ['islands'],
    queryFn: getIslands,
    staleTime: 1000 * 60 * 5,
  })

  // Query all cultures from Laravel API
  const {
    data: culturesData,
    isLoading: culturesLoading,
    isError: culturesError,
  } = useQuery({
    queryKey: ['cultures', 'all'],
    queryFn: () => getCultures(),
    staleTime: 1000 * 60 * 5,
  })

  const islands = islandsData || fallbackIslands
  const cultures = culturesData || fallbackCultures

  return (
    <NusantaraContext.Provider
      value={{
        islands,
        cultures,
        isLoading: islandsLoading || culturesLoading,
        isError: islandsError || culturesError,
      }}
    >
      {children}
    </NusantaraContext.Provider>
  )
}

export function useNusantara() {
  const ctx = useContext(NusantaraContext)
  if (!ctx) {
    return {
      islands: fallbackIslands,
      cultures: fallbackCultures,
      isLoading: false,
      isError: false,
    }
  }
  return ctx
}
