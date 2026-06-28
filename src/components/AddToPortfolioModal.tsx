'use client'

import { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Alert } from './ui/Alert'
import type { PortfolioItem } from '@/types'

interface AddToPortfolioModalProps {
  companyName: string
  portfolios: PortfolioItem[]
  loading: boolean
  error: string | null
  onAdd: (portfolioId: number) => Promise<void>
  onCreatePortfolio: (name: string) => Promise<void>
  onClose: () => void
}

function AddToPortfolioModal({
  companyName,
  portfolios,
  loading,
  error,
  onAdd,
  onCreatePortfolio,
  onClose,
}: AddToPortfolioModalProps) {
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')

  const handleCreate = async () => {
    if (!newName.trim()) return
    await onCreatePortfolio(newName.trim())
    setNewName('')
    setShowCreate(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="w-full max-w-sm border-2 border-nb-black bg-white dark:border-surface-600 dark:bg-surface-800"
        style={{ boxShadow: '8px 8px 0px 0px #0f172a' }}
      >
        <div className="flex items-center justify-between border-b-2 border-nb-black px-5 py-4 dark:border-surface-600">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-surface-900 dark:text-surface-100">
            Add to Portfolio
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center border-2 border-nb-black bg-white hover:bg-surface-100 dark:border-surface-600 dark:bg-surface-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="mb-4 text-sm font-bold text-surface-600 dark:text-surface-400">
            Add <span className="text-surface-900 dark:text-surface-100">{companyName}</span> to:
          </p>

          {error ? <Alert variant="error" className="mb-4">{error}</Alert> : null}

          {showCreate ? (
            <div className="space-y-3">
              <input
                placeholder="Portfolio name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                className="w-full border-2 border-nb-black bg-white px-4 py-3 text-sm font-bold outline-none transition-all duration-150 focus:translate-x-[1px] focus:translate-y-[1px] dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
                style={{ boxShadow: '3px 3px 0px 0px #0f172a' }}
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleCreate}
                  disabled={!newName.trim() || loading}
                  isLoading={loading}
                >
                  CREATE & ADD
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>
                  CANCEL
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {portfolios.length === 0 ? (
                <p className="text-xs font-bold uppercase tracking-wider text-surface-400">
                  No portfolios yet.
                </p>
              ) : (
                portfolios.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAdd(p.id)}
                    disabled={loading}
                    className="w-full border-2 border-nb-black bg-white p-3 text-left transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] disabled:opacity-50 dark:border-surface-600 dark:bg-surface-800"
                    style={{ boxShadow: '3px 3px 0px 0px #0f172a' }}
                  >
                    <p className="text-sm font-extrabold text-surface-900 dark:text-surface-100">
                      {p.name}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-surface-500">
                      {p.holding_count} holding{p.holding_count !== 1 ? 's' : ''}
                    </p>
                  </button>
                ))
              )}
              <div className="pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowCreate(true)}>
                  + NEW PORTFOLIO
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { AddToPortfolioModal }
