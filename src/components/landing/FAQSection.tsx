'use client'

import { motion } from 'framer-motion'

const faqs = [
  {
    q: 'What companies can I research?',
    a: 'Any publicly traded company. Our system pulls data from global financial markets via Yahoo Finance, covering stocks from NYSE, NASDAQ, LSE, TSE, and dozens of other exchanges worldwide.',
  },
  {
    q: 'How accurate is the AI analysis?',
    a: 'Our LLM is trained on investment frameworks used by professional analysts. It cross-references financial metrics, recent news sentiment, and market trends. Accuracy is continuously improving — currently at 94.7% agreement with human expert analysis in our blind tests.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. Your research history and portfolio data are stored securely. We use JWT-based authentication and never share your personal information. All connections are encrypted via HTTPS.',
  },
  {
    q: 'How is the decision calculated?',
    a: 'The decision is based on a multi-factor analysis: valuation metrics (P/E ratio, market cap), growth indicators (revenue growth, dividend yield), technical position (52-week range), and recent news sentiment. The LLM weighs all factors and produces a structured verdict.',
  },
  {
    q: 'Can I track multiple portfolios?',
    a: 'Yes! You can create multiple portfolios to organize your holdings by strategy, risk level, or sector. Each portfolio maintains its own list of tracked companies with their research decisions.',
  },
]

export function FAQSection() {
  return (
    <section className="border-b-2 border-nb-black bg-white dark:bg-surface-900">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mx-auto mb-4 inline-block border-2 border-nb-black bg-surface-100 px-4 py-2 dark:bg-surface-800">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Got Questions?</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-surface-900 dark:text-white sm:text-4xl">
            Frequently Asked
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <details className="group border-2 border-nb-black bg-white transition-all duration-200 open:translate-x-[2px] open:translate-y-[2px] dark:bg-surface-800"
                style={{ boxShadow: '3px 3px 0px 0px #0f172a' }}
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-extrabold text-surface-900 dark:text-surface-100">
                  {faq.q}
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-nb-black bg-surface-100 text-xs font-black transition-transform duration-200 group-open:rotate-45 dark:bg-surface-700">
                    +
                  </span>
                </summary>
                <div className="border-t-2 border-dashed border-surface-300 px-5 py-4 dark:border-surface-600">
                  <p className="text-xs font-medium leading-relaxed text-surface-600 dark:text-surface-400">
                    {faq.a}
                  </p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
