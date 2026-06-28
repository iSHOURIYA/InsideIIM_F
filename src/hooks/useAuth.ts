'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { signup as apiSignup, login as apiLogin } from '@/lib/api'
import type { AuthCredentials } from '@/types'

const TOKEN_KEY = 'ai_research_token'

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) {
      setToken(stored)
    }
    setInitialLoading(false)
  }, [])

  const handleSignup = useCallback(async (credentials: AuthCredentials) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiSignup(credentials)
      localStorage.setItem(TOKEN_KEY, res.access_token)
      setToken(res.access_token)
      router.push('/research')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Signup failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogin = useCallback(async (credentials: AuthCredentials) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiLogin(credentials)
      localStorage.setItem(TOKEN_KEY, res.access_token)
      setToken(res.access_token)
      router.push('/research')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [router])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    router.push('/login')
  }, [router])

  const isAuthenticated = token !== null

  return {
    token,
    isAuthenticated,
    initialLoading,
    loading,
    error,
    signup: handleSignup,
    login: handleLogin,
    logout,
  }
}
