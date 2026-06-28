'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  token: string | null
  initialLoading: boolean
  children: React.ReactNode
}

function AuthGuard({ token, initialLoading, children }: AuthGuardProps) {
  const router = useRouter()

  useEffect(() => {
    if (!initialLoading && token === null) {
      router.push('/login')
    }
  }, [token, initialLoading, router])

  if (initialLoading) {
    return null
  }

  if (token === null) {
    return null
  }

  return <>{children}</>
}

export { AuthGuard }
