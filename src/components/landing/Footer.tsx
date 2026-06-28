'use client'

import Link from 'next/link'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Research', href: '/research' },
      { label: 'History', href: '/research' },
      { label: 'Portfolios', href: '/research' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', href: '/login' },
      { label: 'Sign Up', href: '/signup' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'API Docs', href: '#' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Support', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t-2 border-nb-black bg-surface-900 dark:bg-surface-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border-2 border-primary-800 bg-primary-600">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-sm font-extrabold text-white">AI Investment Agent</span>
            </div>
            <p className="text-[11px] font-bold leading-relaxed text-surface-400">
              AI-powered investment research for everyone.
              Make smarter decisions with data-driven analysis.
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-surface-400">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-bold text-surface-300 underline decoration-2 underline-offset-2 decoration-transparent hover:decoration-surface-300 transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t-2 border-surface-700 pt-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-surface-500">
            &copy; {new Date().getFullYear()} AI Investment Research Agent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
