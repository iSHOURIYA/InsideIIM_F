'use client'

import { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Skeleton } from './ui/Skeleton'
import { Alert } from './ui/Alert'
import type { ResearchHistoryItem } from '@/types'

interface HistoryPanelProps {
  token: string
  items: ResearchHistoryItem[]
  total: number
  page: number
  limit: number
  loading: boolean
  error: string | null
  selected: ResearchHistoryItem | null
  onFetch: (token: string, page?: number) => Promise<void>
  onSelect: (token: string, id: number) => Promise<void>
  onDelete: (token: string, id: number) => Promise<void>
  onPageChange: (page: number) => void
}

function HistoryPanel({
  token,
  items,
  total,
  page,
  limit,
  loading,
  error,
  selected,
  onFetch,
  onSelect,
  onDelete,
  onPageChange,
}: HistoryPanelProps) {
  useEffect(() => {
    onFetch(token)
  }, [token, onFetch])

  const totalPages = Math.ceil(total / limit)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>HISTORY</CardTitle>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-surface-500">
            {total} total
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {error ? <Alert variant="error">{error}</Alert> : null}

        {loading && items.length === 0 ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-xs font-bold uppercase tracking-wider text-surface-400">
            No research history yet.
          </p>
        ) : (
          <>
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(token, item.id)}
                  className={`w-full border-2 p-3 text-left transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] ${
                    selected?.id === item.id
                      ? 'border-primary-600 bg-primary-50 dark:border-primary-500 dark:bg-primary-900/20'
                      : 'border-nb-black bg-white dark:border-surface-600 dark:bg-surface-800'
                  }`}
                  style={
                    selected?.id === item.id
                      ? { boxShadow: '3px 3px 0px 0px #4f46e5' }
                      : { boxShadow: '2px 2px 0px 0px #0f172a' }
                  }
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-extrabold text-surface-900 dark:text-surface-100">
                      {item.company_name}
                    </span>
                    <Badge
                      variant={item.decision === 'Invest' ? 'success' : 'danger'}
                      size="sm"
                    >
                      {item.decision}
                    </Badge>
                  </div>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-surface-500">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
                    {item.ticker ? ` · ${item.ticker}` : ''}
                  </p>
                </button>
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="flex items-center justify-between border-t-2 border-dashed border-surface-300 pt-3 dark:border-surface-600">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => onPageChange(page - 1)}
                >
                  ← PREV
                </Button>
                <span className="text-[10px] font-extrabold text-surface-500">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => onPageChange(page + 1)}
                >
                  NEXT →
                </Button>
              </div>
            ) : null}

            {selected ? (
              <div className="border-t-2 border-dashed border-surface-300 pt-3 dark:border-surface-600">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-surface-600 dark:text-surface-400">
                    {selected.company_name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(token, selected.id)}
                  >
                    DELETE
                  </Button>
                </div>
                <p className="line-clamp-3 text-xs font-medium text-surface-500">
                  {selected.reasoning}
                </p>
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export { HistoryPanel }
