# ShortenIt

**The link shortener that pays you.** Shrink any URL into a branded short link, track every click in real time, and turn your traffic into revenue — all from one dashboard.

🔗 **Live app:** [shortenitpro.vercel.app](https://shortenitpro.vercel.app)

---

## What is ShortenIt?

ShortenIt is a full-stack, production SaaS link management platform. Creators, marketers, and businesses use it to shorten links, generate QR codes, track click analytics, and — uniquely — monetize their traffic through built-in ad-supported redirects. Free-tier links can route through a branded interstitial page that serves ads and pays the link owner per click; Pro subscribers get instant, ad-free redirects and a full analytics/branding suite.

## Product Features

### 🔗 Link Management
- Shorten any URL into a short, branded slug in seconds — no sign-up required to try it from the homepage
- Custom slugs, link expiration dates, and enable/disable toggles
- Bulk-friendly **My Links** dashboard with search, status badges, and one-click copy
- Two redirect modes per link: **Direct** (instant) or **Monetized** (a 5-second ad interstitial before redirecting)

### 📊 Real-Time Analytics
- Per-link and account-wide click tracking: total clicks, unique visitors, top countries, referrers, and device breakdown
- Time-series click charts on the dashboard home page and a dedicated Analytics page
- Earnings tracking per click for monetized links, with running totals and average CPM

### 🌐 Custom Domains
- Connect your own domain(s) for fully white-labeled short links
- Up to 3 custom domains on Pro, unlimited on Enterprise
- Domain verification flow built into the dashboard

### 📱 QR Code Generation
- Instant QR codes for any short link, rendered server-side (no external image APIs)
- Downloadable, print-ready output for offline and physical marketing campaigns

### 🔑 Developer API
- Full REST API for programmatic link creation and management
- API key generation and management from the dashboard (Pro plans: 100 req/s)
- Built for integrating link shortening into your own apps and workflows

### 💰 Monetization Engine
- Every free-tier redirect can route through a branded, countdown-gated interstitial page serving real ad inventory (Adsterra network integration)
- Per-click earnings are attributed and logged automatically
- Site-wide ad placements (banners, native ads, and in-flow skyscraper columns) fund the free tier without ever overlapping real page content — ads reserve their own layout space rather than floating over content
- **Pro subscribers get a fully ad-free experience**, both on their own redirects and throughout the dashboard

### 💳 Billing & Subscriptions
- Real subscription billing via **Razorpay**, with a self-serve billing portal
- Free plan: 50 links/month, basic analytics, standard QR codes
- Pro plan ($19/mo): unlimited links, advanced real-time analytics, 3 custom domains, API access, ad-free redirects
- Enterprise: custom limits, unlimited domains, dedicated support, uptime SLA
- Automatic plan-limit enforcement with graceful upgrade prompts when the free tier is exceeded

### 🔐 Authentication & Accounts
- Secure sign-up/sign-in powered by **Clerk**
- Lazy user provisioning — accounts sync into the app database on first authenticated request
- Per-user data isolation enforced at the database layer

### 📚 SEO & Content
- Server-rendered marketing pages, dynamic sitemap, and `robots.txt`
- Blog/Guides section with SEO-targeted long-form content on link management, QR codes, and campaign strategy
- Per-page metadata, Open Graph tags, and a dynamically generated favicon

### 🖥️ Polished, Responsive UI
- Fully responsive dashboard with a collapsible mobile navigation drawer
- Material-inspired design system with light theming throughout
- Live dashboard preview and interactive charts on the public homepage

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components & Actions) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first theming) |
| Database | [Neon](https://neon.tech) Serverless Postgres |
| ORM | [Drizzle ORM](https://orm.drizzle.team) |
| Auth | [Clerk](https://clerk.com) |
| Payments | [Razorpay](https://razorpay.com) Subscriptions |
| Caching | Upstash Redis |
| Charts | Recharts |
| QR Codes | `qrcode` (pure JS, no native deps) |
| Ads | Adsterra (Banner, Native Banner, iframe-isolated units) |
| Hosting | Vercel |

## Project Structure

```
src/
├── app/                  # Next.js App Router routes
│   ├── (marketing pages) # Homepage, pricing, blog, legal, contact
│   ├── dashboard/        # Authenticated app: links, analytics, QR, domains, API, billing, settings
│   ├── [slug]/           # Short-link redirect handler
│   └── api/               # REST API routes
├── components/
│   ├── ads/              # Ad units and layout-aware ad placement
│   ├── dashboard/        # Dashboard shell, sidebar, charts, stat cards
│   ├── marketing/        # Public site components
│   └── ui/                # Shared design-system primitives
├── db/                   # Drizzle schema and client
└── lib/                  # Auth, billing, analytics, and data-access helpers
```

## Getting Started

### Prerequisites
- Node.js 20+
- A [Neon](https://neon.tech) Postgres database
- A [Clerk](https://clerk.com) application
- A [Razorpay](https://razorpay.com) account (test mode is fine for local dev)

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables and fill in your own keys
cp .env.example .env.local

# Push the database schema
npm run db:push

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` / `DATABASE_URL_UNPOOLED` | Neon Postgres connection strings |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk authentication |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay billing |
| `RAZORPAY_PLAN_ID` / `RAZORPAY_WEBHOOK_SECRET` | Razorpay subscription plan and webhook verification |
| `NEXT_PUBLIC_APP_URL` | Canonical app URL, used for metadata and redirects |

### Scripts

```bash
npm run dev         # Start the dev server (Turbopack)
npm run build        # Production build
npm run start        # Start the production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Drizzle migrations
npm run db:push      # Push schema changes to the database
npm run db:studio    # Open Drizzle Studio
```

## Deployment

ShortenIt is built for [Vercel](https://vercel.com) and deploys automatically from `main`. Set all environment variables in the Vercel dashboard (Production and Preview environments), then push — no manual deploy step required.

## License

Private project. All rights reserved.
