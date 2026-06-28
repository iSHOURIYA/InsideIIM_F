'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Alert } from './ui/Alert'
import { Skeleton } from './ui/Skeleton'
import type { PortfolioItem, PortfolioDetail } from '@/types'

interface PortfolioPanelProps {
  token: string
  portfolios: PortfolioItem[]
  selected: PortfolioDetail | null
  loading: boolean
  error: string | null
  onFetchList: (token: string) => Promise<void>
  onFetchDetail: (token: string, id: number) => Promise<void>
  onCreate: (token: string, name: string) => Promise<void>
  onDelete: (token: string, id: number) => Promise<void>
  onRemoveHolding: (token: string, portfolioId: number, holdingId: number) => Promise<void>
  onClearSelected: () => void
}

function PortfolioPanel({
  token,
  portfolios,
  selected,
  loading,
  error,
  onFetchList,
  onFetchDetail,
  onCreate,
  onDelete,
  onRemoveHolding,
  onClearSelected,
}: PortfolioPanelProps) {
  const [newName, setNewName] = useState('')

  useEffect(() => {
    onFetchList(token)
  }, [token, onFetchList])

  const handleCreate = async () => {
    if (!newName.trim()) return
    await onCreate(token, newName.trim())
    setNewName('')
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>PORTFOLIOS</CardTitle>
          {selected ? (
            <Button variant="ghost" size="sm" onClick={onClearSelected}>
              ← BACK
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {error ? <Alert variant="error">{error}</Alert> : null}

        {loading && portfolios.length === 0 ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : selected ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-surface-900 dark:text-surface-100">
                {selected.name}
              </h4>
              <Badge variant="info" size="sm">
                {selected.holdings.length} HOLDINGS
              </Badge>
            </div>

            {selected.holdings.length === 0 ? (
              <p className="text-xs font-bold uppercase tracking-wider text-surface-400">
                No holdings yet. Research a company and add it here.
              </p>
            ) : (
              <div className="max-h-60 space-y-2 overflow-y-auto">
                {selected.holdings.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between border-2 border-nb-black bg-white p-3 dark:border-surface-600 dark:bg-surface-800"
                    style={{ boxShadow: '2px 2px 0px 0px #0f172a' }}
                  >
                    <div>
                      <p className="text-sm font-extrabold text-surface-900 dark:text-surface-100">
                        {h.ticker}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-surface-500">
                        {h.company_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {h.decision ? (
                        <Badge
                          variant={h.decision === 'Invest' ? 'success' : 'danger'}
                          size="sm"
                        >
                          {h.decision}
                        </Badge>
                      ) : null}
                      <button
                        onClick={() => onRemoveHolding(token, selected.id, h.id)}
                        className="flex h-7 w-7 items-center justify-center border-2 border-nb-black bg-white hover:bg-red-100 dark:border-surface-600 dark:bg-surface-700"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  placeholder="New portfolio name..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  className="w-full border-2 border-nb-black bg-white px-3 py-2 text-sm font-bold outline-none transition-all duration-150 focus:translate-x-[1px] focus:translate-y-[1px] dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
                  style={{ boxShadow: '2px 2px 0px 0px #0f172a' }}
                />
              </div>
              <Button size="sm" onClick={handleCreate} disabled={!newName.trim()}>
                + NEW
              </Button>
            </div>

            {portfolios.length === 0 ? (
              <p className="text-xs font-bold uppercase tracking-wider text-surface-400">
                No portfolios yet. Create one to start tracking.
              </p>
            ) : (
              <div className="max-h-72 space-y-2 overflow-y-auto">
                {portfolios.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between border-2 border-nb-black bg-white transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] dark:border-surface-600 dark:bg-surface-800"
                    style={{ boxShadow: '2px 2px 0px 0px #0f172a' }}
                  >
                    <button
                      className="flex-1 p-3 text-left"
                      onClick={() => onFetchDetail(token, p.id)}
                    >
                      <p className="text-sm font-extrabold text-surface-900 dark:text-surface-100">
                        {p.name}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-surface-500">
                        {p.holding_count} holding{p.holding_count !== 1 ? 's' : ''}
                      </p>
                    </button>
                    <button
                      onClick={() => onDelete(token, p.id)}
                      className="mr-2 flex h-7 w-7 items-center justify-center border-2 border-nb-black bg-white hover:bg-red-100 dark:border-surface-600 dark:bg-surface-700"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export { PortfolioPanel }
