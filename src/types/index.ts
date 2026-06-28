export interface ResearchRequest {
  company_name: string
  force_refresh?: boolean
}

export interface ResearchResponse {
  decision: 'Invest' | 'Pass'
  reasoning: string
  supporting_data: Record<string, unknown>
  error?: string | null
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface ResearchHistoryItem {
  id: number
  company_name: string
  ticker: string | null
  decision: string
  reasoning: string
  financial_metrics: Record<string, unknown> | null
  news_snapshot: string | null
  supporting_data: Record<string, unknown> | null
  created_at: string | null
}

export interface ResearchHistoryList {
  items: ResearchHistoryItem[]
  total: number
  page: number
  limit: number
}

export interface PortfolioItem {
  id: number
  name: string
  created_at: string | null
  holding_count: number
}

export interface PortfolioDetail {
  id: number
  name: string
  created_at: string | null
  holdings: HoldingItem[]
}

export interface PortfolioCreate {
  name: string
}

export interface HoldingItem {
  id: number
  ticker: string
  company_name: string
  decision: string | null
  notes: string | null
  added_at: string | null
  last_research: ResearchHistoryItem | null
}

export interface HoldingCreate {
  ticker: string
  company_name: string
  notes?: string | null
}

export interface PaginationParams {
  page?: number
  limit?: number
}
