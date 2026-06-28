'use client'

import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-bold text-surface-700 dark:text-surface-300"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={id}
          className={cn(
            'nb-input w-full border-2 bg-white px-4 py-3 text-surface-900 placeholder-surface-400 outline-none transition-all duration-150',
            'focus:translate-x-[2px] focus:translate-y-[2px]',
            'dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 dark:placeholder-surface-500',
            error
              ? 'border-red-600 focus:border-red-600'
              : 'border-nb-black dark:border-surface-600',
            className,
          )}
          style={{
            boxShadow: error
              ? '3px 3px 0px 0px #dc2626'
              : '3px 3px 0px 0px #0f172a',
          }}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-sm font-bold text-red-600">{error}</p>
        ) : null}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
export type { InputProps }
