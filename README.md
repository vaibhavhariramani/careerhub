# CareerHub

**Build Your Dream Career.** Everything you need to land your next internship or job in one
place — a free ATS resume scanner, a guided resume builder, interview prep, a searchable
question bank, and live job search, all running in your browser.

## Why it's lightweight

- **No AI API, no paid services.** The ATS scoring engine is a deterministic, rule-based
  analyzer that runs entirely client-side.
- **Resume parsing happens in your browser** via `pdfjs-dist` (PDF) and `mammoth` (DOCX) — your
  resume is never uploaded to a server.
- **All personal data (resumes, saved jobs, practice progress) is stored in IndexedDB** on your
  device, not in a database.
- **Jobs come from free, public APIs** (Remotive, Arbeitnow) via a single thin proxy route —
  no scraping, no paid job-board API.

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + Radix UI primitives (Dialog, Select, Tabs, Tooltip, Dropdown) styled locally
- Zustand, persisted to IndexedDB via `idb-keyval`
- `pdfjs-dist`, `mammoth` (resume parsing) · `docx` (resume export) · `recharts`, `framer-motion`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure (feature-first)

```
app/                  routes (landing page + dashboard shell)
features/
  resume-scanner/      PDF/DOCX/TXT parsing, ATS scoring engine, keyword scanner
  resume-builder/      9-step wizard, 7 templates, live preview, PDF/DOCX export
  interview-prep/      industry guides, mock interview runner, STAR trainer
  question-bank/       searchable/bookmarkable question database
  jobs/                job aggregation, filters, saved-jobs board
  dashboard/, profile/ cross-feature stats, activity feed, achievements
shared/                design system (ui/, layout/), hooks, lib
core/                  types, site config, navigation, AI-provider interfaces
```

`core/ai/providers.ts` defines the interfaces (`ResumeRewriteProvider`,
`CoverLetterProvider`, `InterviewCoachProvider`) that today ship with rule-based
implementations. Swapping in a real LLM later means implementing these same interfaces behind
an API route — no caller code changes.

## Deployment

Zero-config on **Vercel** — it's a stock Next.js app with two lightweight Route Handlers
(`/api/jobs`) used only as a CORS-safe proxy to the public job APIs.

To deploy on **Firebase Hosting** or **Cloudflare Pages** instead, either enable each platform's
Next.js SSR adapter (Firebase Web Frameworks / Cloudflare's `@cloudflare/next-on-pages`), or
convert `app/api/jobs/route.ts` into that platform's native function format and set `output:
"export"` in `next.config.ts` for a fully static build of the remaining pages.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm run start` — production build & serve
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit
