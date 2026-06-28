'use client'

import { HeroSection } from '@/components/landing/HeroSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-nb-cream dark:bg-surface-950">
        {/* Top navigation bar */}
        <nav className="sticky top-0 z-50 border-b-2 border-nb-black bg-white dark:bg-surface-900">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-primary-800 bg-primary-600 shadow-nb-sm">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-extrabold uppercase tracking-tight text-surface-900 dark:text-white">
                  AI Investment Agent
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden text-xs font-extrabold uppercase tracking-wider text-surface-600 underline decoration-2 underline-offset-2 decoration-transparent hover:decoration-surface-600 transition-all sm:block dark:text-surface-400"
              >
                Sign In
              </Link>
              <Link href="/signup">
                <button
                  className="border-2 border-nb-black bg-primary-600 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px]"
                  style={{ boxShadow: '2px 2px 0px 0px #0f172a' }}
                >
                  Get Started
                </button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Sections */}
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
  )
}
