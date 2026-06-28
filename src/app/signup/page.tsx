'use client'

import { useAuth } from '@/hooks/useAuth'
import { AuthForm } from '@/components/AuthForm'
import Link from 'next/link'

export default function SignupPage() {
  const { signup, loading, error } = useAuth()

  const handleSignup = async (email: string, password: string) => {
    await signup({ email, password })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border-2 border-primary-800 bg-primary-600 shadow-nb-sm">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-surface-900 dark:text-white">
            Create Account
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-surface-500">
            Get started with the AI Investment Research Agent
          </p>
        </div>

        <div
          className="border-2 border-nb-black bg-white p-6 dark:border-surface-600 dark:bg-surface-800"
          style={{ boxShadow: '6px 6px 0px 0px #0f172a' }}
        >
          <AuthForm mode="signup" onSubmit={handleSignup} loading={loading} error={error} />
        </div>

        <p className="mt-6 text-center text-xs font-bold uppercase tracking-wider text-surface-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary-600 underline decoration-2 underline-offset-2 hover:text-primary-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
