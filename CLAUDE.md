# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint

# Database (Drizzle ORM)
npx drizzle-kit generate   # Generate migrations from schema changes
npx drizzle-kit migrate    # Apply pending migrations
```

## Environment

Requires a `DATABASE_URL` environment variable pointing to a PostgreSQL instance (see `.env`).

## Architecture

**Lead Collector** is a Next.js App Router application that captures prospect information via a web form and stores it in PostgreSQL.

**Data flow:**
1. `src/app/page.tsx` — landing page renders `<LeadForm />`
2. `src/components/lead-form.tsx` — client component (`"use client"`) POSTs form data to `/api/leads`
3. `src/app/api/leads/route.ts` — validates required fields (`name`, `email`, `message`), inserts via Drizzle, returns 201/400
4. `src/db/index.ts` — exports singleton `db` (Drizzle instance over `postgres` driver)
5. `src/db/schema.ts` — defines the `leads` table schema

**Path alias:** `@/*` maps to `./src/*`.

**Styling:** Tailwind CSS v4 via PostCSS; CSS custom properties (primary blue `#2563eb`) defined in `src/app/globals.css`.
