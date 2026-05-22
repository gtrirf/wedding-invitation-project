# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: pnpm (see `pnpm-lock.yaml`).

- `pnpm install` — install dependencies (run once, and again after pulling changes to `package.json`)
- `pnpm dev` — run Next.js dev server
- `pnpm build` — production build
- `pnpm start` — start the production server
- `pnpm lint` — ESLint over the repo

There is no test runner configured.

## Environment

Backend is Supabase. Required env vars (see `.env.local.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The anon key is intentionally used both client- and server-side. All write paths
go through Server Actions, and RLS in `supabase/schema.sql` restricts what the
anon role can do (no public SELECT on `rsvps`, etc.).

## Database

Schema lives in `supabase/schema.sql`. Run it once in the Supabase SQL editor
(it is idempotent — re-running upserts the seed templates). Tables:

- `templates` — public read; seeded with the six original designs.
- `invitations` — anyone with the slug can read; anyone can insert.
- `rsvps` — anyone can insert; no public read.

## Architecture

Next.js 16 App Router project (React 19, TypeScript 5.7, Tailwind v4).

- `app/page.tsx` — async Server Component. Fetches templates via
  `fetchTemplates()` and renders the landing page sections in order:
  Header → Hero → Templates → Customize → Features → Footer.
- `app/invite/[slug]/page.tsx` — public invitation page rendered from a saved
  `invitations` row. Includes the `RsvpForm` client component (`rsvp-form.tsx`).
- `app/actions/` — Server Actions (`"use server"`):
    - `templates.ts` → `fetchTemplates`, `fetchTemplate`
    - `invitations.ts` → `createInvitation` (validates with zod, retries on
      slug collision)
    - `rsvp.ts` → `submitRsvp` (looks up invitation by slug, then inserts)
- `lib/supabase/` — `server.ts` (uses `@supabase/ssr` + `next/headers` cookies;
  the `cookies()` call is async in Next 15+), `client.ts` (browser),
  `types.ts` (`Database` shape + row types).
- `components/wedding/` — page sections. `TemplatesSection` is now prop-driven
  (`templates: TemplateData[]`) and broadcasts the chosen template via a
  `window` CustomEvent `wedding:template-selected`. `CustomizeSection` listens
  for that event to recolor its live preview and to attach `templateId` when
  calling `createInvitation`. After saving it shows the real
  `/invite/<slug>` URL and copies it to the clipboard.
- `components/ui/` — shadcn/ui primitives (New York style, neutral base, CSS
  variables). Configured via `components.json`.
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge). Path alias `@/*` →
  repo root.
- Styling — Tailwind v4 via `@tailwindcss/postcss`; configuration lives in
  `app/globals.css` (no `tailwind.config.*`).

### Data flow for the share link

1. User picks a template in `TemplatesSection` → CustomEvent dispatched.
2. `CustomizeSection` records the template, lets the user edit fields, then
   calls the `createInvitation` server action.
3. Server action validates (zod), generates a random 10-char base36 slug,
   inserts into `invitations` (retries up to 5× on unique-violation), returns
   `{ slug }`.
4. Client builds `${origin}/invite/${slug}` and copies it.
5. Visitors hit `/invite/[slug]`, which reads the row server-side and submits
   RSVPs through the `submitRsvp` action.

## Build configuration notes

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and
`images.unoptimized: true`. TypeScript errors will NOT fail `pnpm build` —
run `tsc --noEmit` or rely on the editor to surface them.
