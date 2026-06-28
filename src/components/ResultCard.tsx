'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import type { ResearchResponse } from '@/types'

function formatCurrency(value: unknown): string {
  if (typeof value !== 'number') return 'N/A'
  if (Math.abs(value) >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`
  if (Math.abs(value) >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatNumber(value: unknown): string {
  if (typeof value !== 'number') return 'N/A'
  return value.toFixed(2)
}

function formatPercent(value: unknown): string {
  if (typeof value !== 'number') return 'N/A'
  return `${(value * 100).toFixed(1)}%`
}

function smartFormat(key: string, value: unknown): string {
  const lowerKey = key.toLowerCase()
  if (lowerKey.includes('yield') || lowerKey.includes('growth')) return formatPercent(value)
  if (lowerKey.includes('price') || lowerKey.includes('cap') || lowerKey.includes('high') || lowerKey.includes('low'))
    return formatCurrency(value)
  if (lowerKey.includes('ratio')) return formatNumber(value)
  if (typeof value === 'number') return formatNumber(value)
  if (typeof value === 'string') return value
  return String(value)
}

function formatLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

interface FlatEntry {
  key: string
  value: unknown
}

function flattenObject(obj: Record<string, unknown>, prefix = ''): FlatEntry[] {
  const entries: FlatEntry[] = []
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      entries.push(...flattenObject(v as Record<string, unknown>, fullKey))
    } else {
      entries.push({ key: fullKey, value: v })
    }
  }
  return entries
}

const DECISION_ICONS = {
  Invest: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Pass: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
}

interface ResultCardProps {
  data: ResearchResponse
  companyName?: string
  onAddToPortfolio?: (companyName: string) => void
}

function ResultCard({ data, companyName, onAddToPortfolio }: ResultCardProps) {
  const isInvest = data.decision === 'Invest'

  const flatEntries = useMemo(() => flattenObject(data.supporting_data), [data.supporting_data])

  const textBlocks = useMemo(
    () => flatEntries.filter((e) => typeof e.value === 'string' && e.value.length > 80),
    [flatEntries],
  )

  const metricEntries = useMemo(
    () => flatEntries.filter((e) => !(typeof e.value === 'string' && e.value.length > 80)),
    [flatEntries],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto w-full max-w-3xl space-y-6"
    >
      {/* Decision Banner */}
      <div
        className={`border-2 p-6 ${
          isInvest
            ? 'border-emerald-900 bg-emerald-100 dark:border-emerald-600 dark:bg-emerald-950/40'
            : 'border-red-900 bg-red-100 dark:border-red-600 dark:bg-red-950/40'
        }`}
        style={{
          boxShadow: isInvest
            ? '6px 6px 0px 0px #059669'
            : '6px 6px 0px 0px #dc2626',
        }}
      >
        <div className="flex items-center gap-5">
          <div
            className={`flex h-16 w-16 items-center justify-center border-2 ${
              isInvest
                ? 'border-emerald-900 bg-emerald-500 text-white'
                : 'border-red-900 bg-red-500 text-white'
            }`}
          >
            {DECISION_ICONS[data.decision]}
          </div>
          <div className="flex-1">
            <p className="text-xs font-extrabold uppercase tracking-widest text-surface-600 dark:text-surface-400">
              Decision
            </p>
            <h2
              className={`text-4xl font-black uppercase tracking-tight ${
                isInvest ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'
              }`}
            >
              {data.decision}
            </h2>
          </div>
          <Badge variant={isInvest ? 'success' : 'danger'} size="md">
            {isInvest ? 'BUY SIGNAL' : 'AVOID'}
          </Badge>
        </div>
      </div>

      {/* Reasoning */}
      <Card>
        <CardHeader>
          <CardTitle>REASONING</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed font-medium text-surface-700 dark:text-surface-300 whitespace-pre-line">
            {data.reasoning}
          </p>
        </CardContent>
      </Card>

      {/* Financial Metrics */}
      {metricEntries.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>FINANCIAL METRICS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {metricEntries.map((entry) => (
                <div key={entry.key}>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-surface-500 dark:text-surface-400">
                    {formatLabel(entry.key)}
                  </p>
                  <p className="mt-1 text-lg font-black text-surface-900 dark:text-surface-100">
                    {smartFormat(entry.key, entry.value)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Text blocks */}
      {textBlocks.map((block) => (
        <Card key={block.key}>
          <CardHeader>
            <CardTitle>{formatLabel(block.key)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed font-medium text-surface-600 dark:text-surface-300 whitespace-pre-line">
              {block.value as string}
            </p>
          </CardContent>
        </Card>
      ))}

      {/* Add to Portfolio */}
      {onAddToPortfolio && companyName ? (
        <div className="flex justify-center border-t-2 border-dashed border-surface-300 pt-6 dark:border-surface-600">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onAddToPortfolio(companyName)}
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            ADD TO PORTFOLIO
          </Button>
        </div>
      ) : null}
    </motion.div>
  )
}

export { ResultCard }
