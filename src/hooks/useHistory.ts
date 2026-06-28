'use client'

import { useState, useCallback } from 'react'
import {
  listHistory,
  deleteHistory,
  getHistory,
} from '@/lib/api'
import type { ResearchHistoryItem, ResearchHistoryList } from '@/types'

interface UseHistoryReturn {
  items: ResearchHistoryItem[]
  total: number
  page: number
  limit: number
  loading: boolean
  error: string | null
  selected: ResearchHistoryItem | null
  fetch: (token: string, pageNum?: number) => Promise<void>
  select: (token: string, id: number) => Promise<void>
  remove: (token: string, id: number) => Promise<void>
  setPage: (p: number) => void
}

export function useHistory(): UseHistoryReturn {
  const [items, setItems] = useState<ResearchHistoryItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<ResearchHistoryItem | null>(null)

  const fetch = useCallback(
    async (token: string, pageNum?: number) => {
      const p = pageNum ?? page
      setLoading(true)
      setError(null)
      try {
        const res: ResearchHistoryList = await listHistory(token, {
          page: p,
          limit,
        })
        setItems(res.items)
        setTotal(res.total)
        setPage(res.page)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load history')
      } finally {
        setLoading(false)
      }
    },
    [page, limit],
  )

  const select = useCallback(async (token: string, id: number) => {
    setLoading(true)
    setError(null)
    try {
      const item = await getHistory(id, token)
      setSelected(item)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load item')
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(
    async (token: string, id: number) => {
      try {
        await deleteHistory(id, token)
        setItems((prev) => prev.filter((i) => i.id !== id))
        setTotal((prev) => prev - 1)
        if (selected?.id === id) setSelected(null)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to delete')
      }
    },
    [selected],
  )

  return {
    items,
    total,
    page,
    limit,
    loading,
    error,
    selected,
    fetch,
    select,
    remove,
    setPage,
  }
}
