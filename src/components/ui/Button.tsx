'use client'

import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center border-2 font-bold transition-all duration-150',
          'disabled:pointer-events-none disabled:opacity-50',
          'hover:translate-x-[2px] hover:translate-y-[2px]',
          {
            'bg-primary-600 text-white border-primary-800 hover:bg-primary-700':
              variant === 'primary',
            'bg-surface-200 text-surface-900 border-surface-400 hover:bg-surface-300 dark:bg-surface-700 dark:text-surface-100 dark:border-surface-500':
              variant === 'secondary',
            'bg-transparent text-surface-700 border-transparent hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800':
              variant === 'ghost',
            'bg-red-600 text-white border-red-800 hover:bg-red-700':
              variant === 'danger',
          },
          {
            'h-9 px-4 text-xs': size === 'sm',
            'h-11 px-5 text-sm': size === 'md',
            'h-13 px-7 text-base': size === 'lg',
          },
          !disabled && variant !== 'ghost' ? 'shadow-nb-sm' : '',
          className,
        )}
        style={!disabled && variant !== 'ghost' ? { boxShadow: '3px 3px 0px 0px #0f172a' } : undefined}
        {...props}
      >
        {isLoading ? (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
