import { cn } from '@/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
  className?: string
  size?: 'sm' | 'md'
}

function Badge({ children, variant = 'default', className, size = 'md' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border-2 font-extrabold uppercase tracking-wider',
        {
          'border-surface-400 bg-surface-100 text-surface-700 dark:border-surface-500 dark:bg-surface-700 dark:text-surface-300':
            variant === 'default',
          'border-emerald-800 bg-emerald-200 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300':
            variant === 'success',
          'border-red-800 bg-red-200 text-red-900 dark:border-red-600 dark:bg-red-900/40 dark:text-red-300':
            variant === 'danger',
          'border-amber-800 bg-amber-200 text-amber-900 dark:border-amber-600 dark:bg-amber-900/40 dark:text-amber-300':
            variant === 'warning',
          'border-blue-800 bg-blue-200 text-blue-900 dark:border-blue-600 dark:bg-blue-900/40 dark:text-blue-300':
            variant === 'info',
        },
        {
          'px-2 py-0.5 text-[10px]': size === 'sm',
          'px-3 py-1 text-xs': size === 'md',
        },
        className,
      )}
    >
      {children}
    </span>
  )
}

export { Badge }
