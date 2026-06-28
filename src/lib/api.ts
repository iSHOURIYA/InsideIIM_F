import { API_BASE_URL, ENDPOINTS } from './constants'
import type {
  AuthCredentials,
  AuthResponse,
  ResearchResponse,
  ResearchHistoryList,
  ResearchHistoryItem,
  PortfolioItem,
  PortfolioDetail,
  PortfolioCreate,
  HoldingItem,
  HoldingCreate,
  PaginationParams,
} from '@/types'

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`
    try {
      const body = await res.json()
      if (body.detail) {
        message =
          typeof body.detail === 'string'
            ? body.detail
            : body.detail[0]?.msg || message
      }
    } catch {
      // Use default message
    }
    throw new ApiError(message, res.status)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

function authHeader(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` }
}

// ---- Auth ----

export async function signup(
  credentials: AuthCredentials,
): Promise<AuthResponse> {
  return request<AuthResponse>(ENDPOINTS.signup, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function login(
  credentials: AuthCredentials,
): Promise<AuthResponse> {
  return request<AuthResponse>(ENDPOINTS.login, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

// ---- Research ----

export async function research(
  companyName: string,
  token: string,
  forceRefresh = false,
): Promise<ResearchResponse> {
  return request<ResearchResponse>(ENDPOINTS.research, {
    method: 'POST',
    body: JSON.stringify({
      company_name: companyName,
      force_refresh: forceRefresh,
    }),
    headers: authHeader(token),
  })
}

// ---- Research History ----

export async function listHistory(
  token: string,
  params?: PaginationParams,
): Promise<ResearchHistoryList> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  const qs = searchParams.toString()
  const endpoint = qs ? `${ENDPOINTS.researchHistory}?${qs}` : ENDPOINTS.researchHistory
  return request<ResearchHistoryList>(endpoint, {
    headers: authHeader(token),
  })
}

export async function getHistory(
  id: number,
  token: string,
): Promise<ResearchHistoryItem> {
  return request<ResearchHistoryItem>(ENDPOINTS.researchHistoryItem(id), {
    headers: authHeader(token),
  })
}

export async function deleteHistory(
  id: number,
  token: string,
): Promise<void> {
  return request<void>(ENDPOINTS.researchHistoryItem(id), {
    method: 'DELETE',
    headers: authHeader(token),
  })
}

// ---- Portfolios ----

export async function listPortfolios(
  token: string,
): Promise<PortfolioItem[]> {
  return request<PortfolioItem[]>(ENDPOINTS.portfolios, {
    headers: authHeader(token),
  })
}

export async function createPortfolio(
  data: PortfolioCreate,
  token: string,
): Promise<PortfolioItem> {
  return request<PortfolioItem>(ENDPOINTS.portfolios, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: authHeader(token),
  })
}

export async function getPortfolio(
  id: number,
  token: string,
): Promise<PortfolioDetail> {
  return request<PortfolioDetail>(ENDPOINTS.portfolioItem(id), {
    headers: authHeader(token),
  })
}

export async function deletePortfolio(
  id: number,
  token: string,
): Promise<void> {
  return request<void>(ENDPOINTS.portfolioItem(id), {
    method: 'DELETE',
    headers: authHeader(token),
  })
}

// ---- Holdings ----

export async function addHolding(
  portfolioId: number,
  data: HoldingCreate,
  token: string,
): Promise<HoldingItem> {
  return request<HoldingItem>(ENDPOINTS.portfolioHoldings(portfolioId), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: authHeader(token),
  })
}

export async function listHoldings(
  portfolioId: number,
  token: string,
): Promise<HoldingItem[]> {
  return request<HoldingItem[]>(ENDPOINTS.portfolioHoldings(portfolioId), {
    headers: authHeader(token),
  })
}

export async function deleteHolding(
  portfolioId: number,
  holdingId: number,
  token: string,
): Promise<void> {
  return request<void>(
    ENDPOINTS.portfolioHoldingItem(portfolioId, holdingId),
    {
      method: 'DELETE',
      headers: authHeader(token),
    },
  )
}

export { ApiError }
