<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- Next.js **16.3.1** (App Router), React 19, TypeScript 5
- Prisma **7.9.1** with `@prisma/adapter-mariadb` — client is generated to `generated/prisma/` (gitignored)
- **better-auth** for email/password auth (not NextAuth)
- **shadcn/ui** (radix-rhea style, lucide icons) — components in `src/components/ui/`
- Tailwind CSS v4 via PostCSS plugin (no `tailwind.config` file)
- Zustand for client state (`src/lib/cart-store.ts`)
- Zod v4 for validation

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint only (no typecheck script)
- `npx prisma generate` — regenerate Prisma client after schema changes
- `npx prisma migrate dev` — run migrations

**No test suite exists.** There is no test script, no test framework, and no test files.

## Prisma

Schema is at `prisma/schema.prisma`. The generated client lives at `generated/prisma/` (gitignored — must regenerate after schema changes). The app uses a **MariaDB adapter** (`@prisma/adapter-mariadb`) in `src/lib/prisma.ts`, not the native Prisma driver. The schema declares `provider = "mysql"` but the runtime adapter is MariaDB.

## Auth

Uses `better-auth` (not NextAuth). Config in `src/lib/auth.ts`. API routes in `src/app/api/auth/`. Auth-dependent route group: `src/app/(auth)/` (login, signup).

## Path Alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).

## Route Groups

- `src/app/(auth)/` — login, signup (auth-required pages)
- `src/app/(front)/` — public-facing pages (home, product, cart, course, about, contact)
- `src/app/api/auth/` — better-auth API endpoints
