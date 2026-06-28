'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'AI-Powered Analysis',
    description:
      'Our LLM analyzes financial data, news sentiment, and market trends to deliver a clear Invest or Pass verdict with detailed reasoning.',
    color: 'primary',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Real-Time Financial Data',
    description:
      'Live stock prices, market caps, P/E ratios, revenue growth, dividend yields, and 52-week ranges sourced directly from financial markets.',
    color: 'emerald',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Portfolio Tracking',
    description:
      'Build and manage investment portfolios. Add researched companies as holdings, track decisions, and manage your watchlist in one place.',
    color: 'amber',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Research History',
    description:
      'Every analysis is saved to your history. Browse past research, revisit decisions, and track how your investment thesis evolves over time.',
    color: 'blue',
  },
]

const colorMap: Record<string, { border: string; bg: string; icon: string; shadow: string }> = {
  primary: {
    border: 'border-primary-800',
    bg: 'bg-primary-50 dark:bg-primary-900/20',
    icon: 'bg-primary-600 text-white',
    shadow: '#4f46e5',
  },
  emerald: {
    border: 'border-emerald-800',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    icon: 'bg-emerald-600 text-white',
    shadow: '#059669',
  },
  amber: {
    border: 'border-amber-800',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    icon: 'bg-amber-600 text-white',
    shadow: '#d97706',
  },
  blue: {
    border: 'border-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'bg-blue-600 text-white',
    shadow: '#2563eb',
  },
}

export function FeaturesSection() {
  return (
    <section className="border-b-2 border-nb-black bg-white dark:bg-surface-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mx-auto mb-4 inline-block border-2 border-nb-black bg-surface-100 px-4 py-2 dark:bg-surface-800">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Why Choose Us</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-wider text-surface-500">
            Everything you need for smarter investment research
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const c = colorMap[feature.color]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`group border-2 ${c.border} ${c.bg} p-6 transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]`}
                style={{ boxShadow: `5px 5px 0px 0px ${c.shadow}` }}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center border-2 ${c.border} ${c.icon}`}>
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-base font-extrabold text-surface-900 dark:text-surface-100">
                  {feature.title}
                </h3>
                <p className="text-xs font-medium leading-relaxed text-surface-500 dark:text-surface-400">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
