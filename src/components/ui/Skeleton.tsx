import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse border-2 border-nb-black bg-surface-200 dark:border-surface-600 dark:bg-surface-700',
        className,
      )}
    />
  )
}

function SkeletonCard() {
  return (
    <div className="nb-card border-2 border-nb-black bg-white p-5 dark:border-surface-600 dark:bg-surface-800">
      <Skeleton className="mb-4 h-8 w-1/3" />
      <Skeleton className="mb-3 h-4 w-full" />
      <Skeleton className="mb-3 h-4 w-5/6" />
      <Skeleton className="mb-6 h-4 w-2/3" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="mb-1 h-3 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  )
}

export { Skeleton, SkeletonCard }
