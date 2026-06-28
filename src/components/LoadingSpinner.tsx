'use client'

import { cn } from '@/utils/cn'

interface LoadingSpinnerProps {
  className?: string
  label?: string
}

function LoadingSpinner({ className, label = 'Analyzing company data...' }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-5 py-16', className)}>
      <div className="relative">
        <div className="h-16 w-16 border-2 border-nb-black bg-white dark:border-surface-600 dark:bg-surface-800" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 border-2 border-nb-black bg-primary-600 animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-extrabold uppercase tracking-wider text-surface-700 dark:text-surface-300">
          {label}
        </p>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500">
          Gathering financial data &amp; news
        </p>
      </div>
    </div>
  )
}

export { LoadingSpinner }
