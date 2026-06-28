'use client'

import { type FormEvent } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/utils/cn'

interface SearchSectionProps {
  companyName: string
  onCompanyNameChange: (name: string) => void
  onSubmit: () => void
  loading: boolean
  className?: string
}

function SearchSection({
  companyName,
  onCompanyNameChange,
  onSubmit,
  loading,
  className,
}: SearchSectionProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('mx-auto w-full max-w-2xl', className)}
    >
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-surface-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            placeholder="Search any public company... (e.g., Tesla, Apple, Microsoft)"
            disabled={loading}
            className="nb-input w-full border-2 border-nb-black bg-white py-4 pl-12 pr-4 text-base font-bold text-surface-900 placeholder-surface-400 outline-none transition-all duration-150 focus:translate-x-[2px] focus:translate-y-[2px] dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 dark:placeholder-surface-500"
            style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}
          />
        </div>
        <Button type="submit" size="lg" isLoading={loading} disabled={loading}>
          RESEARCH
        </Button>
      </div>
    </form>
  )
}

export { SearchSection }
