'use client'

import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/Button'
import { cn } from '@/utils/cn'

interface HeaderProps {
  isAuthenticated?: boolean
  onLogout?: () => void
}

function Header({ isAuthenticated, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-nb-black bg-white dark:border-surface-600 dark:bg-surface-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-primary-800 bg-primary-600 shadow-nb-sm">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-extrabold uppercase tracking-tight text-surface-900 dark:text-white">
              AI Investment Agent
            </h1>
            <p className="hidden text-[10px] font-bold uppercase tracking-wider text-surface-500 sm:block">
              Intelligent Stock Analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated && onLogout ? (
            <Button variant="ghost" size="sm" onClick={onLogout}>
              LOGOUT
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export { Header }
