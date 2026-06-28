'use client'

import { useCallback, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useResearch } from '@/hooks/useResearch'
import { useHistory } from '@/hooks/useHistory'
import { usePortfolios } from '@/hooks/usePortfolios'
import { AuthGuard } from '@/components/AuthGuard'
import { Header } from '@/components/Header'
import { SearchSection } from '@/components/SearchSection'
import { ResultCard } from '@/components/ResultCard'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Alert } from '@/components/ui/Alert'
import { HistoryPanel } from '@/components/HistoryPanel'
import { PortfolioPanel } from '@/components/PortfolioPanel'
import { AddToPortfolioModal } from '@/components/AddToPortfolioModal'

export default function ResearchPage() {
  const { token, isAuthenticated, initialLoading, logout } = useAuth()
  const {
    companyName,
    setCompanyName,
    data,
    loading,
    error,
    execute,
    clear,
  } = useResearch()

  const history = useHistory()
  const portfolios = usePortfolios()

  const [companyToAdd, setCompanyToAdd] = useState<string | null>(null)

  const handleResearch = () => {
    if (token) execute(token)
  }

  const handleChange = (name: string) => {
    setCompanyName(name)
    if (data || error) clear()
  }

  const handleAddToPortfolio = useCallback(
    async (portfolioId: number) => {
      if (!token || !companyToAdd) return

      const ticker =
        (data?.supporting_data?.ticker as string) ||
        (data?.supporting_data?.symbol as string) ||
        companyToAdd

      await portfolios.addHoldingToPortfolio(token, portfolioId, {
        ticker,
        company_name: companyToAdd,
      })
      setCompanyToAdd(null)
    },
    [token, companyToAdd, data, portfolios],
  )

  const handleCreatePortfolioAndAdd = useCallback(
    async (name: string) => {
      if (!token) return
      await portfolios.create(token, name)
      const newPortfolio = portfolios.portfolios.find((p) => p.name === name)
      if (newPortfolio && companyToAdd) {
        const ticker =
          (data?.supporting_data?.ticker as string) ||
          (data?.supporting_data?.symbol as string) ||
          companyToAdd
        await portfolios.addHoldingToPortfolio(token, newPortfolio.id, {
          ticker,
          company_name: companyToAdd,
        })
        setCompanyToAdd(null)
      }
    },
    [token, companyToAdd, data, portfolios],
  )

  return (
    <AuthGuard token={token} initialLoading={initialLoading}>
      <div className="flex min-h-screen flex-col">
        <Header isAuthenticated={isAuthenticated} onLogout={logout} />

        <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 pb-10 pt-10 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black uppercase tracking-tight text-surface-900 dark:text-white sm:text-5xl">
                Research
              </h2>
              <p className="mt-3 text-sm font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                Enter a company name &amp; get an AI-powered Invest / Pass decision
              </p>
            </div>

            <SearchSection
              companyName={companyName}
              onCompanyNameChange={handleChange}
              onSubmit={handleResearch}
              loading={loading}
              className="mb-10"
            />

            {error && !loading ? (
              <Alert
                variant="error"
                className="mx-auto mb-8 max-w-2xl"
                onClose={() => clear()}
              >
                {error}
              </Alert>
            ) : null}

            {loading ? (
              <LoadingSpinner label="Analyzing company data..." />
            ) : null}

            {data && !loading ? (
              <ResultCard
                data={data}
                companyName={companyName}
                onAddToPortfolio={(name) => {
                  portfolios.fetchList(token!)
                  setCompanyToAdd(name)
                }}
              />
            ) : null}

            {!data && !loading && !error ? (
              <div className="mx-auto mt-12 max-w-md text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border-2 border-nb-black bg-white dark:border-surface-600 dark:bg-surface-800">
                  <svg className="h-8 w-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider text-surface-700 dark:text-surface-300">
                  Ready to Research
                </h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-surface-500">
                  Type a company name above and click Research to get started.
                </p>
              </div>
            ) : null}
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden w-80 shrink-0 flex-col gap-6 xl:flex">
            <HistoryPanel
              token={token!}
              items={history.items}
              total={history.total}
              page={history.page}
              limit={history.limit}
              loading={history.loading}
              error={history.error}
              selected={history.selected}
              onFetch={history.fetch}
              onSelect={history.select}
              onDelete={history.remove}
              onPageChange={history.setPage}
            />
            <PortfolioPanel
              token={token!}
              portfolios={portfolios.portfolios}
              selected={portfolios.selected}
              loading={portfolios.loading}
              error={portfolios.error}
              onFetchList={portfolios.fetchList}
              onFetchDetail={portfolios.fetchDetail}
              onCreate={portfolios.create}
              onDelete={portfolios.remove}
              onRemoveHolding={portfolios.removeHolding}
              onClearSelected={portfolios.clearSelected}
            />
          </aside>
        </div>

        {/* Mobile Panels */}
        <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-10 xl:hidden sm:px-6 lg:px-8">
          <HistoryPanel
            token={token!}
            items={history.items}
            total={history.total}
            page={history.page}
            limit={history.limit}
            loading={history.loading}
            error={history.error}
            selected={history.selected}
            onFetch={history.fetch}
            onSelect={history.select}
            onDelete={history.remove}
            onPageChange={history.setPage}
          />
          <PortfolioPanel
            token={token!}
            portfolios={portfolios.portfolios}
            selected={portfolios.selected}
            loading={portfolios.loading}
            error={portfolios.error}
            onFetchList={portfolios.fetchList}
            onFetchDetail={portfolios.fetchDetail}
            onCreate={portfolios.create}
            onDelete={portfolios.remove}
            onRemoveHolding={portfolios.removeHolding}
            onClearSelected={portfolios.clearSelected}
          />
        </div>
      </div>

      {/* Add to Portfolio Modal */}
      {companyToAdd ? (
        <AddToPortfolioModal
          companyName={companyToAdd}
          portfolios={portfolios.portfolios}
          loading={portfolios.loading}
          error={portfolios.error}
          onAdd={handleAddToPortfolio}
          onCreatePortfolio={handleCreatePortfolioAndAdd}
          onClose={() => setCompanyToAdd(null)}
        />
      ) : null}
    </AuthGuard>
  )
}
