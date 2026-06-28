'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '10,000+', label: 'Companies Analyzed' },
  { value: '94.7%', label: 'Decision Accuracy' },
  { value: '< 3s', label: 'Analysis Speed' },
  { value: '50,000+', label: 'Users Trust Us' },
]

export function StatsSection() {
  return (
    <section className="border-b-2 border-nb-black bg-primary-600 dark:bg-primary-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-black text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
