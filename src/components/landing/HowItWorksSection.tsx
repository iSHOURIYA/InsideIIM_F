'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Enter Company Name',
    description:
      'Type any publicly traded company name into the search bar. Our system supports thousands of global companies from every major exchange.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Analyzes Data',
    description:
      'Our engine gathers real-time financial metrics, recent news, and market sentiment. An LLM analyzes all data using advanced investment frameworks.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Your Decision',
    description:
      'Receive a clear Invest or Pass verdict with detailed reasoning, key financial metrics, and a news summary — all in seconds.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export function HowItWorksSection() {
  return (
    <section className="border-b-2 border-nb-black bg-surface-50 dark:bg-surface-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mx-auto mb-4 inline-block border-2 border-nb-black bg-white px-4 py-2 dark:bg-surface-800">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Simple Process</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-wider text-surface-500">
            Three steps to smarter investing
          </p>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line (desktop) */}
          <div className="absolute left-1/2 top-20 hidden h-0.5 w-3/4 -translate-x-1/2 border-t-2 border-dashed border-surface-300 md:block dark:border-surface-600" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number */}
              <div
                className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center border-2 border-nb-black bg-white dark:bg-surface-800"
                style={{ boxShadow: '4px 4px 0px 0px #0f172a' }}
              >
                {step.icon}
              </div>

              {/* Number badge */}
              <div
                className="absolute top-0 right-1/2 translate-x-16 -translate-y-2 border-2 border-nb-black bg-primary-600 px-3 py-1 text-xs font-black text-white"
                style={{ boxShadow: '2px 2px 0px 0px #0f172a' }}
              >
                {step.number}
              </div>

              <h3 className="mb-3 text-lg font-extrabold text-surface-900 dark:text-surface-100">
                {step.title}
              </h3>
              <p className="max-w-xs text-xs font-medium leading-relaxed text-surface-500 dark:text-surface-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
