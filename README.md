# Lumina Shop

A modern e-commerce storefront built with Next.js 16, featuring a performant App Router architecture, PostgreSQL persistence via Prisma, and Stripe payments.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js v4 (Google, GitHub OAuth)
- **Payments**: Stripe
- **Animations**: Framer Motion
- **State**: Zustand
- **Validation**: Zod

## Project Structure

```
src/
├── app/
│   ├── (shop)/          # Public storefront routes
│   │   ├── cart/        # Shopping cart
│   │   ├── checkout/    # Checkout flow
│   │   ├── collections/ # Product collections
│   │   └── products/    # Product listings & detail pages
│   ├── (auth)/          # Auth routes (login, register)
│   ├── (user)/          # User account pages
│   ├── (admin)/         # Admin dashboard
│   └── api/             # API routes (webhooks, auth)
├── middleware.ts        # Auth & routing middleware
└── types/               # Shared TypeScript types
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_SECRET` | Secret for NextAuth session encryption |
| `NEXTAUTH_URL` | Your app URL (dev: `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth app client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `DATABASE_URL` | PostgreSQL connection string |

### 3. Set up the database

Push the Prisma schema to your database:

```bash
npx prisma db push
```

### 4. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

## Common Tasks

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Deploy

Deploy to Vercel with the Vercel CLI:

```bash
vercel deploy
```

Set up environment variables in the Vercel dashboard or via CLI:

```bash
vercel env add NEXTAUTH_SECRET
vercel env add DATABASE_URL
# ... add other required variables
```
