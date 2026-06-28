'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b-2 border-nb-black bg-white dark:bg-surface-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-36 lg:pt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-5"
          >
            <div className="mb-6 inline-block border-2 border-primary-800 bg-primary-100 px-4 py-2 dark:bg-primary-900/40">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary-800 dark:text-primary-300">
                — Next-Gen Investment Analysis
              </span>
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-surface-900 dark:text-white sm:text-6xl lg:text-7xl">
              AI Investment
              <br />
              <span className="text-primary-600">Research</span>
              <br />
              Agent
            </h1>

            <p className="mt-6 text-base font-bold leading-relaxed text-surface-500 dark:text-surface-400 sm:text-lg">
              Make smarter investment decisions with AI-powered company analysis.
              Get instant Invest / Pass verdicts backed by real financial data and news intelligence.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto px-8 text-sm">
                  <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  GET STARTED FREE
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 text-sm">
                  SIGN IN
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-surface-400">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                No credit card
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Real-time data
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                LLM-powered
              </span>
            </div>
          </motion.div>

          {/* Mockup Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-12 lg:col-span-6 lg:mt-0 xl:col-span-7"
          >
            <div className="relative">
              {/* Main result card mockup */}
              <div
                className="relative border-2 border-nb-black bg-white p-6 dark:bg-surface-800"
                style={{
                  boxShadow: '10px 10px 0px 0px #0f172a',
                }}
              >
                {/* Decision Banner Mock */}
                <div className="mb-6 border-2 border-emerald-900 bg-emerald-100 p-5 dark:bg-emerald-950/40"
                  style={{ boxShadow: '5px 5px 0px 0px #059669' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center border-2 border-emerald-900 bg-emerald-500 text-white">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-surface-500">Decision</p>
                      <p className="text-3xl font-black text-emerald-800 dark:text-emerald-300">INVEST</p>
                    </div>
                    <span className="ml-auto border-2 border-emerald-800 bg-emerald-200 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 dark:border-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
                      BUY SIGNAL
                    </span>
                  </div>
                </div>

                {/* Metrics Grid Mock */}
                <div className="mb-6 grid grid-cols-4 gap-4">
                  {[
                    ['Current Price', '$283.78'],
                    ['Market Cap', '$4.16T'],
                    ['P/E Ratio', '34.36'],
                    ['Revenue Growth', '16.6%'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-surface-400">{label}</p>
                      <p className="mt-1 text-lg font-black text-surface-900 dark:text-surface-100">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Reasoning Mock */}
                <div className="border-t-2 border-dashed border-surface-300 pt-4 dark:border-surface-600">
                  <p className="text-[11px] font-bold leading-relaxed text-surface-500">
                    Apple remains a fundamentally strong company with robust revenue growth and a healthy balance sheet.
                    The services segment continues to drive margin expansion...
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -right-4 -top-4 rotate-6 border-2 border-nb-black bg-amber-200 px-4 py-2 text-xs font-black uppercase tracking-wider dark:bg-amber-800"
                style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}
              >
                ⚡ Live Demo
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
