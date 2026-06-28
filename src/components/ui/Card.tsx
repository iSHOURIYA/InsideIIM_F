'use client'

import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'nb-card border-2 border-nb-black bg-white dark:border-surface-600 dark:bg-surface-800',
        hover && 'nb-card-hover',
        className,
      )}
      style={{
        boxShadow: '4px 4px 0px 0px #0f172a',
      }}
    >
      {children}
    </div>
  )
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'border-b-2 border-nb-black px-5 py-4 dark:border-surface-600',
        className,
      )}
    >
      {children}
    </div>
  )
}

function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-lg font-extrabold text-surface-900 dark:text-surface-100', className)}>
      {children}
    </h3>
  )
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-5 py-4', className)}>{children}</div>
}

export { Card, CardHeader, CardTitle, CardContent }
