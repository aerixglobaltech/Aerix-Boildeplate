# Enterprise Frontend Boilerplate

A production-ready, scalable Next.js starter template designed for enterprise SaaS applications — dashboards, admin panels, and internal tools.

---

## Architecture Overview

This boilerplate follows a **modular, feature-based architecture** optimized for multi-team scalability:

```
┌─────────────────────────────────────────────────────────┐
│                     App Layer (src/app)                  │
│         Routes, Layouts, Pages (thin orchestration)      │
├─────────────────────────────────────────────────────────┤
│                  Modules Layer (src/modules)             │
│    Feature modules: auth, dashboard, users, etc.         │
│    Each module owns: api, components, hooks, store, types│
├─────────────────────────────────────────────────────────┤
│                 Shared Layer (src/components)            │
│         Reusable UI components, layouts, common          │
├─────────────────────────────────────────────────────────┤
│                Infrastructure Layer                      │
│    services/ (API client), lib/ (auth, utils),           │
│    store/ (global state), config/ (env, routes)          │
└─────────────────────────────────────────────────────────┘
```

### Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **App Router** | Server Components, nested layouts, streaming — the future of Next.js |
| **Modular feature folders** | Teams own entire modules independently; reduces merge conflicts |
| **Centralized API client** | Consistent auth, error handling, interceptors across all services |
| **Zustand over Redux** | Minimal boilerplate, TypeScript-first, no providers needed |
| **React Query for data** | Server state ≠ client state; automatic caching, retries, deduplication |
| **NextAuth v5** | SSO-ready, JWT sessions, middleware-native route protection |
| **Zod + React Hook Form** | Runtime validation + performant forms, schema-first approach |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14+ | React framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client with interceptors |
| Zustand | Global client state management |
| TanStack React Query | Server state / data fetching |
| React Hook Form + Zod | Form handling + validation |
| NextAuth v5 | Authentication (credentials + SSO) |
| ESLint + Prettier | Code quality |
| Lucide React | Icon library |

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth route group (login, SSO)
│   │   ├── login/page.tsx
│   │   ├── sso/page.tsx
│   │   └── layout.tsx      # Centered auth layout
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── users/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── layout.tsx      # Sidebar + navbar layout
│   │   └── page.tsx
│   ├── api/auth/[...nextauth]/ # NextAuth API routes
│   ├── layout.tsx          # Root layout (providers)
│   ├── page.tsx            # Landing page
│   ├── error.tsx           # Global error boundary
│   └── not-found.tsx       # 404 page
│
├── modules/                # Feature modules (domain-driven)
│   ├── auth/               # Authentication module
│   │   ├── api/            # Auth API service calls
│   │   ├── components/     # Login form, SSO buttons
│   │   ├── hooks/          # useAuth hook
│   │   ├── store/          # Zustand auth store
│   │   └── types/          # Auth type definitions
│   ├── dashboard/          # Dashboard module
│   │   └── components/     # Stats cards, charts
│   └── users/              # Users module
│       ├── api/            # User CRUD service
│       ├── components/     # Users table, forms
│       ├── hooks/          # React Query hooks
│       └── types/
│
├── components/             # Shared reusable components
│   ├── ui/                 # Primitives: Button, Input, Modal, Card, Loader
│   ├── layout/             # Sidebar, Navbar, PageWrapper
│   └── common/             # Providers, ErrorBoundary
│
├── services/               # Infrastructure services
│   └── api-client.ts       # Axios instance with interceptors
│
├── store/                  # Global Zustand stores (barrel exports)
│
├── hooks/                  # Global shared hooks
│   ├── useMediaQuery.ts
│   └── useDebounce.ts
│
├── lib/                    # Core libraries
│   ├── auth.ts             # NextAuth configuration
│   └── utils.ts            # Utility functions (cn, formatDate, etc.)
│
├── config/                 # Application configuration
│   ├── env.ts              # Typed environment variables
│   └── routes.ts           # Centralized route paths
│
├── types/                  # Global TypeScript types
│   ├── index.ts            # ApiResponse, PaginatedResponse, etc.
│   └── auth.ts             # User, LoginCredentials, AuthState
│
├── styles/                 # Additional styles (if needed)
│
└── middleware.ts            # Route protection middleware
```

### Folder Purposes

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js routes, layouts, and pages. Thin orchestration layer — delegates to modules. |
| `modules/` | Self-contained feature modules. Each module owns its API calls, components, hooks, state, and types. |
| `components/ui/` | Design system primitives (Button, Input, Modal, Card, Loader). |
| `components/layout/` | Page structure components (Sidebar, Navbar, PageWrapper). |
| `components/common/` | Cross-cutting components (Providers, ErrorBoundary). |
| `services/` | HTTP client and infrastructure services. |
| `store/` | Barrel exports for Zustand stores. |
| `hooks/` | Shared hooks used across modules. |
| `lib/` | Core libraries (auth config, utilities). |
| `config/` | Environment variables, route definitions. |
| `types/` | Global TypeScript type definitions. |
| `styles/` | Additional CSS files beyond Tailwind. |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url> my-project
cd my-project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Lint and auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
| `npm run type-check` | TypeScript type checking |

### Default Dev Credentials

```
Email:    admin@company.com
Password: password
```

---

## How to Extend

### Adding a New Module

1. Create the module folder structure:

```
src/modules/orders/
├── api/
│   └── order.service.ts    # API calls
├── components/
│   └── OrdersList.tsx       # UI components
├── hooks/
│   └── useOrders.ts         # React Query hooks
├── store/
│   └── order.store.ts       # Zustand store (if needed)
└── types/
    └── index.ts             # Type definitions
```

2. Create the API service (`order.service.ts`):

```typescript
import { apiClient } from '@/services/api-client';

export const orderService = {
  async getOrders(page = 1) {
    const response = await apiClient.get('/orders', { params: { page } });
    return response.data;
  },
};
```

3. Create React Query hooks (`useOrders.ts`):

```typescript
import { useQuery } from '@tanstack/react-query';
import { orderService } from '../api/order.service';

export function useOrders(page = 1) {
  return useQuery({
    queryKey: ['orders', 'list', page],
    queryFn: () => orderService.getOrders(page),
  });
}
```

4. Create the page route (`src/app/dashboard/orders/page.tsx`):

```typescript
import { PageWrapper } from '@/components/layout/PageWrapper';
import { OrdersList } from '@/modules/orders/components/OrdersList';

export default function OrdersPage() {
  return (
    <PageWrapper title="Orders">
      <OrdersList />
    </PageWrapper>
  );
}
```

5. Add the route to `src/config/routes.ts` and sidebar navigation in `src/components/layout/Sidebar.tsx`.

### Adding a New Page

1. Create the page file under `src/app/dashboard/<page-name>/page.tsx`
2. Use `PageWrapper` for consistent layout
3. Add the route to `src/config/routes.ts`
4. Add navigation link to `src/components/layout/Sidebar.tsx`

### Adding a New API Service

1. Create the service file in the relevant module: `src/modules/<module>/api/<name>.service.ts`
2. Use the centralized `apiClient` for all HTTP requests
3. Create React Query hooks for data fetching
4. Type all request/response payloads

### Integrating Backend APIs

1. Set `NEXT_PUBLIC_API_URL` in `.env.local` to your backend URL
2. Replace mock implementations in service files with real API calls
3. Update the auth flow in `src/lib/auth.ts` to call your actual auth API
4. Remove mock data from components

---

## Authentication

### Credentials Login

The default setup uses NextAuth's Credentials provider. To connect to your real backend:

1. Edit `src/lib/auth.ts` → `authorize()` function
2. Replace the mock check with an API call using `authService.login()`
3. Return the user object from your API response

### Enabling SSO Providers

To enable an SSO provider (e.g., Google):

1. Set environment variables in `.env.local`:
   ```
   AUTH_GOOGLE_ID=your-client-id
   AUTH_GOOGLE_SECRET=your-client-secret
   ```

2. Uncomment the provider in `src/lib/auth.ts`:
   ```typescript
   import Google from 'next-auth/providers/google';
   
   // In the providers array:
   Google({
     clientId: process.env.AUTH_GOOGLE_ID!,
     clientSecret: process.env.AUTH_GOOGLE_SECRET!,
   }),
   ```

3. Set `NEXT_PUBLIC_ENABLE_SSO=true` in `.env.local`

Supported SSO providers (ready to uncomment):
- **Google** — `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`
- **Microsoft Azure AD** — `AUTH_AZURE_AD_CLIENT_ID`, `AUTH_AZURE_AD_CLIENT_SECRET`, `AUTH_AZURE_AD_TENANT_ID`
- **Okta** — `AUTH_OKTA_CLIENT_ID`, `AUTH_OKTA_CLIENT_SECRET`, `AUTH_OKTA_ISSUER`
- **Auth0** — `AUTH_AUTH0_CLIENT_ID`, `AUTH_AUTH0_CLIENT_SECRET`, `AUTH_AUTH0_ISSUER`

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |
| `NEXT_PUBLIC_APP_URL` | Yes | Frontend app URL |
| `NEXTAUTH_URL` | Yes | NextAuth callback URL (same as APP_URL) |
| `NEXTAUTH_SECRET` | Yes | NextAuth encryption secret |
| `NEXT_PUBLIC_ENABLE_SSO` | No | Enable SSO buttons on login page |
| `NEXT_PUBLIC_ENABLE_MOCK_API` | No | Show dev credentials on login page |
| `AUTH_GOOGLE_ID` | No | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | No | Google OAuth client secret |

---

## Code Quality

- **ESLint** — Enforces code quality rules, import ordering, and TypeScript best practices
- **Prettier** — Consistent code formatting (100 char width, single quotes, trailing commas)
- **TypeScript strict mode** — Catches type errors at compile time
- **Consistent type imports** — `import type { T }` enforced by ESLint

---

## License

MIT
