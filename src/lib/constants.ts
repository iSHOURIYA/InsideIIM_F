export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export const ENDPOINTS = {
  signup: '/auth/signup',
  login: '/auth/login',
  research: '/research',
  researchHistory: '/research/history',
  researchHistoryItem: (id: number) => `/research/history/${id}`,
  portfolios: '/portfolios',
  portfolioItem: (id: number) => `/portfolios/${id}`,
  portfolioHoldings: (portfolioId: number) => `/portfolios/${portfolioId}/holdings`,
  portfolioHoldingItem: (portfolioId: number, holdingId: number) =>
    `/portfolios/${portfolioId}/holdings/${holdingId}`,
  health: '/health',
} as const
