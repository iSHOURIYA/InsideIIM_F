'use client'

import { useState } from 'react'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { Alert } from './ui/Alert'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
  loading: boolean
  error: string | null
}

function AuthForm({ mode, onSubmit, loading, error }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!email.trim()) {
      setLocalError('Email is required')
      return
    }
    if (!password) {
      setLocalError('Password is required')
      return
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }

    await onSubmit(email.trim(), password)
  }

  const displayError = localError || error

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {displayError ? (
        <Alert variant="error">{displayError}</Alert>
      ) : null}

      <Input
        id="email"
        label="EMAIL"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        disabled={loading}
      />

      <Input
        id="password"
        label="PASSWORD"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        disabled={loading}
      />

      <Button type="submit" className="w-full" size="lg" isLoading={loading}>
        {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
      </Button>
    </form>
  )
}

export { AuthForm }
