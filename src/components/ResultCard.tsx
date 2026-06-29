'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import type { ResearchResponse } from '@/types'

// ─── Formatters ──────────────────────────────────────────

function fmtCurr(v: unknown): string {
  if (typeof v !== 'number') return ''
  if (Math.abs(v) >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
  if (Math.abs(v) >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
  if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

function fmtNum(v: unknown): string {
  if (typeof v !== 'number') return ''
  return v.toFixed(2)
}

function fmtPct(v: unknown): string {
  if (typeof v !== 'number') return ''
  return `${(v * 100).toFixed(1)}%`
}

function smartVal(key: string, v: unknown): string {
  const k = key.toLowerCase()
  if (v == null || v === '') return ''
  if (typeof v === 'boolean') return v ? 'Yes' : 'No'
  if (typeof v === 'number') {
    if (k.includes('yield') || k.includes('growth') || k.includes('margin') || k.includes('roe') || k.includes('roa') || k.includes('ratio') && !k.includes('pe') && !k.includes('debt'))
      return fmtPct(v)
    if (k.includes('price') || k.includes('cap') || k.includes('debt') || k.includes('cash') || k.includes('income') || k.includes('revenue') || k.includes('profit') || k.includes('flow') || k.includes('ebitda'))
      return fmtCurr(v)
    return fmtNum(v)
  }
  return String(v)
}

function label(k: string): string {
  return k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function isUsable(v: unknown): boolean {
  if (v == null || v === '') return false
  if (typeof v === 'number' && isNaN(v)) return false
  if (typeof v === 'string') {
    const t = v.trim().toLowerCase()
    if (t === '' || t === 'n/a' || t === 'null' || t === 'none' || t === 'nan') return false
  }
  return true
}

// ─── Data grouping ───────────────────────────────────────

interface Entry { key: string; value: unknown; category: string; sub: string }
interface SearchResult { title: string; snippet: string }

function groupData(obj: Record<string, unknown>): {
  categories: Record<string, Entry[]>
  searchResults: SearchResult[]
  newsItems: string[]
  limitations: string[]
  otherTexts: { title: string; text: string }[]
} {
  const cats: Record<string, Entry[]> = {}
  const searchResults: SearchResult[] = []
  const newsItems: string[] = []
  const limitations: string[] = []
  const otherTexts: { title: string; text: string }[] = []

  const walk = (o: Record<string, unknown>, prefix = '') => {
    for (const [k, v] of Object.entries(o)) {
      const full = prefix ? `${prefix}.${k}` : k
      const low = full.toLowerCase()

      if (!isUsable(v)) continue

      if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
        walk(v as Record<string, unknown>, full)
        continue
      }

      const isLong = typeof v === 'string' && v.length > 60

      // ── News ──
      if (isLong && (low.includes('news') || low.includes('headline'))) {
        String(v).split(/[.,;]\s*/).filter(s => s.trim().length > 10).forEach(s => newsItems.push(s.trim()))
        continue
      }

      // ── Data limitations ──
      if (isLong && (low.includes('limitation') || low.includes('missing') || low.includes('incomplete') || low.includes('unreliable') || low.includes('misclassified'))) {
        limitations.push(String(v))
        continue
      }

      // ── Search summary → parse into title/snippet pairs ──
      if (isLong && low.includes('search')) {
        const raw = String(v)
        const parts = raw.split(/(?=Title:)/)
        for (const p of parts) {
          const t = p.match(/Title:\s*(.+?)(?:\n|$)/)
          const s = p.match(/Snippet:\s*(.+?)(?:\n|Title:|$)/)
          if (t) {
            searchResults.push({ title: t[1].trim(), snippet: s ? s[1].trim() : '' })
          }
        }
        continue
      }

      // ── Skip known long bloat fields ──
      if (isLong && (
        low.includes('description') ||
        low.includes('employees')
      )) {
        continue
      }

      // ── Other long text (collapsed) ──
      if (isLong) {
        otherTexts.push({ title: label(k), text: String(v) })
        continue
      }

      // ── Categorize short values ──
      const parts = full.split('.')
      const catName = parts.length > 1 ? label(parts[0]) : 'General'
      const subKey = parts.length > 1 ? parts.slice(1).join(' ') : k

      if (!cats[catName]) cats[catName] = []
      if (isUsable(v)) cats[catName].push({ key: subKey, value: v, category: catName, sub: subKey })
    }
  }

  walk(obj)
  return { categories: cats, searchResults, newsItems, limitations, otherTexts }
}

// ─── Sub-components ──────────────────────────────────────

function RangeBar({ low, high, current, lowLabel, highLabel }: {
  low: number; high: number; current: number; lowLabel?: string; highLabel?: string
}) {
  const pct = ((current - low) / (high - low)) * 100
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold text-surface-500">
        <span>{lowLabel || fmtCurr(low)}</span>
        <span>{highLabel || fmtCurr(high)}</span>
      </div>
      <div className="relative h-4 border-2 border-nb-black bg-surface-100 dark:bg-surface-700">
        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-surface-500">
          52-Week Range
        </div>
        <div
          className="absolute top-0 h-full w-0.5 bg-primary-600"
          style={{ left: `${Math.max(0, Math.min(100, pct))}%`, transform: 'translateX(-50%)' }}
        />
        <div
          className="absolute -top-1.5 h-6 w-6 border-2 border-nb-black bg-white dark:bg-surface-800 flex items-center justify-center"
          style={{ left: `${Math.max(0, Math.min(100, pct))}%`, transform: 'translateX(-50%)' }}
        >
          <span className="text-[7px] font-black">●</span>
        </div>
      </div>
    </div>
  )
}

function MarginBar({ value, label: lbl, negative }: { value: number; label: string; negative?: boolean }) {
  const pct = Math.min(100, Math.abs(value) * 100)
  const isNeg = value < 0 || negative
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-surface-600 dark:text-surface-400">{lbl}</span>
        <span className={isNeg ? 'text-red-600' : 'text-emerald-600'}>{fmtPct(value)}</span>
      </div>
      <div className="h-2.5 border-2 border-nb-black bg-surface-100 dark:bg-surface-700 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${isNeg ? 'bg-red-500' : 'bg-emerald-500'}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </div>
  )
}

function RatingGauge({ value, max = 5 }: { value: number; max?: number }) {
  const labels = ['', 'Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell']
  const idx = Math.round(value)
  const pct = (value / max) * 100
  const color = idx <= 2 ? 'bg-emerald-500' : idx === 3 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-surface-600 dark:text-surface-400">Analyst Consensus</span>
        <span className={color.replace('bg-', 'text-') + ' font-black'}>{labels[idx] || `Rating: ${value}`}</span>
      </div>
      <div className="h-4 border-2 border-nb-black bg-surface-100 dark:bg-surface-700 relative overflow-hidden">
        <div className={`h-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white mix-blend-difference">
          {value.toFixed(1)} / {max}
        </div>
      </div>
      <div className="flex justify-between text-[8px] font-bold text-surface-400">
        <span>Strong Buy</span>
        <span>Strong Sell</span>
      </div>
    </div>
  )
}

function NewsCard({ text, index }: { text: string; index: number }) {
  // Try to extract source from parentheses
  const sourceMatch = text.match(/\(([^)]+)\)$/)
  const source = sourceMatch ? sourceMatch[1] : null
  const clean = sourceMatch ? text.slice(0, sourceMatch.index).trim() : text
  const isNegative = /(down|drop|fall|decline|loss|sell|risk|cautious|pressure)/i.test(clean)

  return (
    <div className="flex gap-3 border-2 border-nb-black bg-white p-3 dark:bg-surface-800" style={{ boxShadow: '2px 2px 0px 0px #0f172a' }}>
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center border-2 border-nb-black text-xs font-black ${isNegative ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
        {index + 1}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold leading-snug text-surface-800 dark:text-surface-200">{clean}</p>
        {source ? (
          <span className="mt-1 inline-block border border-surface-300 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-surface-500 dark:border-surface-600 dark:text-surface-400">
            {source}
          </span>
        ) : null}
      </div>
    </div>
  )
}

function MetricCard({ label: lbl, value, sub }: { label: string; value: unknown; sub?: string }) {
  const val = smartVal(sub || lbl, value)
  if (!val) return null
  return (
    <div>
      <p className="text-[9px] font-extrabold uppercase tracking-widest text-surface-400">{lbl}</p>
      <p className="mt-0.5 text-base font-black text-surface-900 dark:text-surface-100">{val}</p>
    </div>
  )
}

function PriceTargetCard({ current, target }: { current: number; target: number }) {
  const upside = ((target - current) / current) * 100
  const isUp = upside >= 0
  return (
    <div className="border-2 border-nb-black bg-white p-4 dark:bg-surface-800" style={{ boxShadow: '3px 3px 0px 0px #0f172a' }}>
      <p className="text-[9px] font-extrabold uppercase tracking-widest text-surface-400">Price Target</p>
      <div className="mt-2 flex items-end gap-3">
        <div>
          <p className="text-xs font-bold text-surface-500">Current</p>
          <p className="text-xl font-black text-surface-900 dark:text-surface-100">{fmtCurr(current)}</p>
        </div>
        <div className="text-2xl font-black text-surface-300">→</div>
        <div>
          <p className="text-xs font-bold text-surface-500">Target</p>
          <p className="text-xl font-black text-surface-900 dark:text-surface-100">{fmtCurr(target)}</p>
        </div>
        <div className={`ml-auto border-2 px-3 py-1 text-xs font-black ${isUp ? 'border-emerald-800 bg-emerald-100 text-emerald-800' : 'border-red-800 bg-red-100 text-red-800'}`}>
          {isUp ? '+' : ''}{upside.toFixed(1)}%
        </div>
      </div>
      <div className="mt-3 h-3 border-2 border-nb-black bg-surface-100 dark:bg-surface-700 relative">
        <div className={`h-full ${isUp ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, Math.abs(upside))}%` }} />
      </div>
    </div>
  )
}

// ─── Collapsible text (for long paragraphs) ──────────────

function CollapsibleText({ text, maxChars = 200 }: { text: string; maxChars?: number }) {
  const [open, setOpen] = useState(false)
  const needsTrunc = text.length > maxChars
  return (
    <div>
      <p className="text-xs font-medium leading-relaxed text-surface-600 dark:text-surface-300 whitespace-pre-line">
        {needsTrunc && !open ? text.slice(0, maxChars) + '...' : text}
      </p>
      {needsTrunc ? (
        <button
          onClick={() => setOpen(!open)}
          className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-primary-600 hover:text-primary-500"
        >
          {open ? 'Show Less' : 'Show More'}
        </button>
      ) : null}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────

interface ResultCardProps {
  data: ResearchResponse
  companyName?: string
  onAddToPortfolio?: (name: string) => void
}

export function ResultCard({ data, companyName, onAddToPortfolio }: ResultCardProps) {
  const isInvest = data.decision === 'Invest'

  const { categories, searchResults, newsItems, limitations, otherTexts } = useMemo(
    () => groupData(data.supporting_data),
    [data.supporting_data],
  )

  // Extract key values for special widgets
  const fin = categories['Financial Metrics'] || []
  const general = categories['General'] || []

  const currentPrice = fin.find(e => e.sub.toLowerCase().includes('current_price') || e.sub.toLowerCase().includes('current price'))?.value as number
  const targetPrice = fin.find(e => e.sub.toLowerCase().includes('target_mean') || e.sub.toLowerCase().includes('target mean'))?.value as number
  const fiftyTwoHigh = fin.find(e => e.sub.toLowerCase().includes('fifty_two_week_high') || e.sub.toLowerCase().includes('52 week') && e.sub.toLowerCase().includes('high'))?.value as number
  const fiftyTwoLow = fin.find(e => e.sub.toLowerCase().includes('fifty_two_week_low') || e.sub.toLowerCase().includes('52 week') && e.sub.toLowerCase().includes('low'))?.value as number
  const recommendation = fin.find(e => e.sub.toLowerCase().includes('recommendation_mean') || e.sub.toLowerCase().includes('recommendation mean'))?.value as number
  const operatingMargin = fin.find(e => e.sub.toLowerCase().includes('operating_margin') || e.sub.toLowerCase().includes('operating margin'))?.value as number
  const profitMargin = fin.find(e => e.sub.toLowerCase().includes('profit_margin') || e.sub.toLowerCase().includes('profit margin'))?.value as number
  const roe = fin.find(e => e.sub.toLowerCase().includes('return_on_equity') || e.sub.toLowerCase().includes('return on equity'))?.value as number

  const showRange = typeof fiftyTwoLow === 'number' && typeof fiftyTwoHigh === 'number' && typeof currentPrice === 'number'
  const showRating = typeof recommendation === 'number'
  const showPriceTarget = typeof currentPrice === 'number' && typeof targetPrice === 'number'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto w-full max-w-4xl space-y-6"
    >
      {/* ── Decision Banner ── */}
      <div
        className={`border-2 p-6 ${isInvest ? 'border-emerald-900 bg-emerald-100 dark:border-emerald-600 dark:bg-emerald-950/40' : 'border-red-900 bg-red-100 dark:border-red-600 dark:bg-red-950/40'}`}
        style={{ boxShadow: isInvest ? '6px 6px 0px 0px #059669' : '6px 6px 0px 0px #dc2626' }}
      >
        <div className="flex items-center gap-5">
          <div className={`flex h-16 w-16 items-center justify-center border-2 ${isInvest ? 'border-emerald-900 bg-emerald-500 text-white' : 'border-red-900 bg-red-500 text-white'}`}>
            {isInvest ? (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-surface-500 dark:text-surface-400">Decision</p>
            <h2 className={`text-4xl font-black uppercase tracking-tight ${isInvest ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'}`}>
              {data.decision}
            </h2>
          </div>
          <Badge variant={isInvest ? 'success' : 'danger'} size="md">
            {isInvest ? 'BUY SIGNAL' : 'AVOID'}
          </Badge>
        </div>
      </div>

      {/* ── Reasoning ── */}
      <div className="border-2 border-nb-black bg-white p-5 dark:bg-surface-800" style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-surface-400 mb-3">Analysis</p>
        <p className="text-sm font-medium leading-relaxed text-surface-700 dark:text-surface-300 whitespace-pre-line">
          {data.reasoning}
        </p>
      </div>

      {/* ── Visual Widgets Row ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        {showRange ? (
          <div className="border-2 border-nb-black bg-white p-4 dark:bg-surface-800" style={{ boxShadow: '3px 3px 0px 0px #0f172a' }}>
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-surface-400 mb-3">52-Week Range</p>
            <RangeBar low={fiftyTwoLow} high={fiftyTwoHigh} current={currentPrice} />
          </div>
        ) : null}
        {showPriceTarget ? (
          <PriceTargetCard current={currentPrice} target={targetPrice} />
        ) : null}
      </div>

      {/* ── Margin Gauges ── */}
      {(typeof operatingMargin === 'number' || typeof profitMargin === 'number' || typeof roe === 'number') ? (
        <div className="border-2 border-nb-black bg-white p-5 dark:bg-surface-800" style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-surface-400 mb-4">Profitability</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {typeof operatingMargin === 'number' ? <MarginBar value={operatingMargin} label="Operating Margin" /> : null}
            {typeof profitMargin === 'number' ? <MarginBar value={profitMargin} label="Profit Margin" /> : null}
            {typeof roe === 'number' ? <MarginBar value={roe} label="Return on Equity" /> : null}
          </div>
        </div>
      ) : null}

      {/* ── Analyst Consensus ── */}
      {showRating ? (
        <div className="border-2 border-nb-black bg-white p-5 dark:bg-surface-800" style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}>
          <RatingGauge value={recommendation} />
        </div>
      ) : null}

      {/* ── Category Metric Cards ── */}
      {Object.entries(categories).map(([cat, entries]) => {
        if (cat === 'General' && entries.length === 0) return null
        if (entries.length === 0) return null
        return (
          <div key={cat} className="border-2 border-nb-black bg-white p-5 dark:bg-surface-800" style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-surface-400 mb-4">{cat}</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
              {entries.map(e => (
                <MetricCard key={e.key} label={label(e.key)} value={e.value} sub={e.sub} />
              ))}
            </div>
          </div>
        )
      })}

      {/* ── News Section ── */}
      {newsItems.length > 0 ? (
        <div className="border-2 border-nb-black bg-white p-5 dark:bg-surface-800" style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}>
          <div className="flex items-center gap-3 mb-4">
            <svg className="h-5 w-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-surface-400">Recent News</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {newsItems.slice(0, 6).map((item, i) => (
              <NewsCard key={i} text={item} index={i} />
            ))}
          </div>
        </div>
      ) : null}

      {/* ── Data Limitations ── */}
      {limitations.length > 0 ? (
        <div className="border-2 border-amber-800 bg-amber-50 p-5 dark:bg-amber-950/30 dark:border-amber-600" style={{ boxShadow: '4px 4px 0px 0px #d97706' }}>
          <div className="flex items-center gap-3 mb-3">
            <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">Data Quality Notice</p>
          </div>
          <ul className="space-y-1">
            {limitations.map((l, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-medium text-amber-800 dark:text-amber-300">
                <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* ── Search Results ── */}
      {searchResults.length > 0 ? (
        <div className="border-2 border-nb-black bg-white p-5 dark:bg-surface-800" style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}>
          <div className="flex items-center gap-3 mb-4">
            <svg className="h-5 w-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-surface-400">Web Search Results</p>
          </div>
          <div className="space-y-3">
            {searchResults.map((r, i) => (
              <div key={i} className="border-2 border-surface-200 bg-surface-50 p-3 dark:border-surface-700 dark:bg-surface-800/50">
                <p className="text-xs font-extrabold text-surface-900 dark:text-surface-100">{r.title}</p>
                {r.snippet ? <p className="mt-1 text-[11px] font-medium text-surface-500">{r.snippet}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* ── Other Text Blocks (collapsed) ── */}
      {otherTexts.map((block, i) => (
        <div key={i} className="border-2 border-nb-black bg-white p-5 dark:bg-surface-800" style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-surface-400 mb-3">{block.title}</p>
          <CollapsibleText text={block.text} maxChars={250} />
        </div>
      ))}

      {/* ── Add to Portfolio ── */}
      {onAddToPortfolio && companyName ? (
        <div className="flex justify-center border-t-2 border-dashed border-surface-300 pt-6 dark:border-surface-600">
          <Button variant="secondary" size="lg" onClick={() => onAddToPortfolio(companyName)}>
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
