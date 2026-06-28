'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  return (
    <section className="border-b-2 border-nb-black bg-primary-600 dark:bg-primary-800">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto mb-6 inline-block border-2 border-primary-900 bg-primary-700 px-4 py-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/80">
              Start Now — It&apos;s Free
            </span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Ready to Make Smarter
            <br />
            Investment Decisions?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm font-bold leading-relaxed text-white/70">
            Join thousands of investors using AI-powered analysis.
            No credit card required. Start researching in seconds.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button
                size="lg"
                className="border-2 border-nb-black bg-white text-surface-900 hover:bg-surface-100 px-10 text-sm"
                style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                GET STARTED FREE
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-primary-700 px-10 text-sm"
              >
                SIGN IN →
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
