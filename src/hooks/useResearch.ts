'use client'

import { useState, useCallback } from 'react'
import { research as apiResearch } from '@/lib/api'
import type { ResearchResponse } from '@/types'

interface UseResearchReturn {
  companyName: string
  setCompanyName: (name: string) => void
  forceRefresh: boolean
  setForceRefresh: (v: boolean) => void
  data: ResearchResponse | null
  loading: boolean
  error: string | null
  execute: (token: string) => Promise<void>
  clear: () => void
}

export function useResearch(): UseResearchReturn {
  const [companyName, setCompanyName] = useState('')
  const [forceRefresh, setForceRefresh] = useState(false)
  const [data, setData] = useState<ResearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (token: string) => {
      if (!companyName.trim()) {
        setError('Please enter a company name')
        return
      }

      setLoading(true)
      setError(null)
      setData(null)

      try {
        const result = await apiResearch(companyName.trim(), token, forceRefresh)
        if (result.error) {
          setError(result.error)
        } else {
          setData(result)
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'An unexpected error occurred'
        setError(message)
      } finally {
        setLoading(false)
      }
    },
    [companyName, forceRefresh],
  )

  const clear = useCallback(() => {
    setData(null)
    setError(null)
    setCompanyName('')
    setForceRefresh(false)
  }, [])

  return {
    companyName,
    setCompanyName,
    forceRefresh,
    setForceRefresh,
    data,
    loading,
    error,
    execute,
    clear,
  }
}
