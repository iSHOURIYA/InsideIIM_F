import { cn } from '@/utils/cn'

interface AlertProps {
  children: React.ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  className?: string
  onClose?: () => void
}

function Alert({ children, variant = 'info', className, onClose }: AlertProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 border-2 p-4 text-sm font-bold',
        {
          'border-blue-900 bg-blue-100 text-blue-900 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-200':
            variant === 'info',
          'border-emerald-900 bg-emerald-100 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-200':
            variant === 'success',
          'border-amber-900 bg-amber-100 text-amber-900 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-200':
            variant === 'warning',
          'border-red-900 bg-red-100 text-red-900 dark:border-red-500 dark:bg-red-950 dark:text-red-200':
            variant === 'error',
        },
        className,
      )}
      role="alert"
    >
      <div className="flex-1">{children}</div>
      {onClose ? (
        <button
          onClick={onClose}
          className="-mt-1 -mr-1 rounded p-1 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ) : null}
    </div>
  )
}

export { Alert }
