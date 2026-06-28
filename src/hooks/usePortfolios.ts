'use client'

import { useState, useCallback } from 'react'
import {
  listPortfolios,
  createPortfolio,
  getPortfolio,
  deletePortfolio,
  addHolding,
  deleteHolding,
} from '@/lib/api'
import type {
  PortfolioItem,
  PortfolioDetail,
  HoldingCreate,
} from '@/types'

interface UsePortfoliosReturn {
  portfolios: PortfolioItem[]
  selected: PortfolioDetail | null
  loading: boolean
  error: string | null
  fetchList: (token: string) => Promise<void>
  fetchDetail: (token: string, id: number) => Promise<void>
  create: (token: string, name: string) => Promise<void>
  remove: (token: string, id: number) => Promise<void>
  addHoldingToPortfolio: (
    token: string,
    portfolioId: number,
    data: HoldingCreate,
  ) => Promise<void>
  removeHolding: (
    token: string,
    portfolioId: number,
    holdingId: number,
  ) => Promise<void>
  clearSelected: () => void
}

export function usePortfolios(): UsePortfoliosReturn {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([])
  const [selected, setSelected] = useState<PortfolioDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchList = useCallback(async (token: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await listPortfolios(token)
      setPortfolios(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolios')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchDetail = useCallback(async (token: string, id: number) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPortfolio(id, token)
      setSelected(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }, [])

  const create = useCallback(async (token: string, name: string) => {
    setLoading(true)
    setError(null)
    try {
      const item = await createPortfolio({ name }, token)
      setPortfolios((prev) => [...prev, item])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create portfolio')
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(async (token: string, id: number) => {
    setLoading(true)
    setError(null)
    try {
      await deletePortfolio(id, token)
      setPortfolios((prev) => prev.filter((p) => p.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete portfolio')
    } finally {
      setLoading(false)
    }
  }, [selected])

  const addHoldingToPortfolio = useCallback(
    async (token: string, portfolioId: number, data: HoldingCreate) => {
      setError(null)
      try {
        const holding = await addHolding(portfolioId, data, token)
        if (selected?.id === portfolioId) {
          setSelected({
            ...selected,
            holdings: [...selected.holdings, holding],
          })
        }
        setPortfolios((prev) =>
          prev.map((p) =>
            p.id === portfolioId
              ? { ...p, holding_count: p.holding_count + 1 }
              : p,
          ),
        )
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Failed to add holding',
        )
      }
    },
    [selected],
  )

  const removeHolding = useCallback(
    async (token: string, portfolioId: number, holdingId: number) => {
      setError(null)
      try {
        await deleteHolding(portfolioId, holdingId, token)
        if (selected?.id === portfolioId) {
          setSelected({
            ...selected,
            holdings: selected.holdings.filter((h) => h.id !== holdingId),
          })
        }
        setPortfolios((prev) =>
          prev.map((p) =>
            p.id === portfolioId
              ? { ...p, holding_count: p.holding_count - 1 }
              : p,
          ),
        )
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Failed to remove holding',
        )
      }
    },
    [selected],
  )

  const clearSelected = useCallback(() => {
    setSelected(null)
  }, [])

  return {
    portfolios,
    selected,
    loading,
    error,
    fetchList,
    fetchDetail,
    create,
    remove,
    addHoldingToPortfolio,
    removeHolding,
    clearSelected,
  }
}
