# AI Investment Research Agent — Frontend

A production-ready Next.js 14 (App Router) frontend for the AI Investment Research Agent backend. Neo-brutalist design with TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **🔐 JWT Authentication** — signup, login, and session management
- **🔍 AI-Powered Research** — search any public company and get an Invest/Pass decision
- **📊 Dynamic Data Rendering** — auto-formatted financial metrics, news summaries, and free-form supporting data
- **📁 Research History** — paginated browsing, search, and deletion of past analyses
- **💼 Portfolio Tracking** — create portfolios, add/remove holdings, track decisions
- **🌙 Dark Mode** — toggle between light, dark, and system theme
- **📱 Responsive** — fully responsive with sidebar on desktop, stacked on mobile
- **🎨 Neo-Brutalist UI** — bold borders, hard shadows, uppercase typography, high contrast
- **✨ Animations** — scroll-triggered reveals and transitions with Framer Motion
- **🏠 Landing Page** — hero with live mockup, stats bar, features grid, how-it-works, FAQ accordion, CTA

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| next-themes | Dark mode |
| clsx + tailwind-merge | Class utilities |

## Prerequisites

- Node.js 18+
- The backend API running (see `../README_Backend.md`)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local if your backend runs on a different URL

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | Backend API base URL |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (Inter font, ThemeProvider)
│   ├── page.tsx              # Landing page (hero, features, FAQ, CTA)
│   ├── globals.css           # Tailwind + neo-brutalist utilities
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Signup page
│   └── research/page.tsx     # Research dashboard (main app)
├── components/
│   ├── ui/                   # Button, Input, Card, Skeleton, Badge, Alert
│   ├── landing/              # HeroSection, StatsSection, FeaturesSection,
│   │                         # HowItWorksSection, FAQSection, CTASection, Footer
│   ├── Header.tsx            # Branded navbar with theme toggle + logout
│   ├── SearchSection.tsx     # Company name search input
│   ├── ResultCard.tsx        # Dynamic decision card with smart formatting
│   ├── LoadingSpinner.tsx    # Animated loading state
│   ├── ThemeToggle.tsx       # Dark/light mode switch
│   ├── AuthForm.tsx          # Email/password form for login & signup
│   ├── AuthGuard.tsx         # Route protection wrapper
│   ├── HistoryPanel.tsx      # Paginated research history sidebar
│   ├── PortfolioPanel.tsx    # Portfolio list/detail sidebar
│   └── AddToPortfolioModal.tsx
├── hooks/
│   ├── useAuth.ts            # Auth state (token, login, signup, logout)
│   ├── useResearch.ts        # Research logic (loading, data, error, forceRefresh)
│   ├── useHistory.ts         # Paginated history CRUD
│   └── usePortfolios.ts      # Portfolio + holding CRUD
├── lib/
│   ├── api.ts                # HTTP client (all endpoints)
│   └── constants.ts          # API_BASE_URL, endpoints
├── types/
│   └── index.ts              # All TypeScript interfaces
└── utils/
    └── cn.ts                 # className merge utility
```

## API Integration

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/auth/signup` | POST | No | Create account |
| `/auth/login` | POST | No | Sign in |
| `/research` | POST | Bearer | Research a company (optional `force_refresh`) |
| `/research/history` | GET | Bearer | Paginated research history |
| `/research/history/{id}` | GET/DELETE | Bearer | Get or delete a history item |
| `/portfolios` | GET/POST | Bearer | List or create portfolios |
| `/portfolios/{id}` | GET/DELETE | Bearer | Get or delete portfolio with holdings |
| `/portfolios/{id}/holdings` | GET/POST | Bearer | List or add holdings |
| `/portfolios/{id}/holdings/{hid}` | DELETE | Bearer | Remove a holding |

## Deployment (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/ai-investment-agent)

### Option 1: Deploy via Git (Recommended)

```bash
# 1. Initialize git in the frontend directory
cd frontend
git init
git add .
git commit -m "Initial commit"

# 2. Push to your GitHub/GitLab/Bitbucket repository
git remote add origin https://github.com/your-username/ai-investment-agent.git
git push -u origin main
```

Then in Vercel:
1. Import the repository
2. Set **Root Directory** to `frontend/` (if using a monorepo)
3. Add environment variable: `NEXT_PUBLIC_API_BASE_URL` = your deployed backend URL
4. Deploy

### Option 2: Direct Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Environment Variables on Vercel

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `https://your-backend.vercel.app` or your custom domain |

The frontend will automatically detect the environment variable and route API calls accordingly.

## Backend

See [`../README_Backend.md`](../README_Backend.md) for backend setup, API reference, and local development.
