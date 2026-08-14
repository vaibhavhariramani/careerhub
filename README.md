# CareerHub

**Build Your Dream Career.** Everything you need to land your next internship or job in one
place — a free ATS resume scanner, a guided resume builder, interview prep, a searchable
question bank, and live job search, all running in your browser.

## Why it's lightweight

- **No AI API, no paid services.** The ATS scoring engine is a deterministic, rule-based
  analyzer that runs entirely client-side.
- **Resume parsing happens in your browser** via `pdfjs-dist` (PDF) and `mammoth` (DOCX) — your
  resume is never uploaded to a server.
- **Resume/scan/practice data stays in IndexedDB** on your device, not in a database. The one
  exception is the Resume Builder: since it asks you to sign in (see below), your basic contact
  info is saved server-side so you can pick up where you left off.
- **Jobs come from free, public APIs** (Remotive, Arbeitnow) via a single thin proxy route —
  no scraping, no paid job-board API.

## Accounts & admin

Signing in is required before the Resume Builder (Firebase Auth — email/password or Google).
On first sign-in a `candidates/{uid}` Firestore doc is created with your email, name, and an
email-marketing opt-in checkbox. Firestore rules only let a user read/write their own doc.

A superadmin (identified by a custom Auth claim, `admin: true`) can visit `/admin` to see all
registered candidates and send them a promotional email via [Resend](https://resend.com). To
grant admin rights to another account, sign in as them once, then run:

```bash
gcloud auth print-access-token # requires an Owner/Editor on the Firebase project
curl -X POST "https://identitytoolkit.googleapis.com/v1/projects/<project-id>/accounts:update" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" \
  -H "x-goog-user-project: <project-id>" \
  -d '{"localId":"<their-uid>","customAttributes":"{\"admin\":true}"}'
```

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + Radix UI primitives (Dialog, Select, Tabs, Tooltip, Dropdown) styled locally
- Zustand, persisted to IndexedDB via `idb-keyval`
- `pdfjs-dist`, `mammoth` (resume parsing) · `docx` (resume export) · `recharts`, `framer-motion`
- Firebase Auth + Firestore (candidate accounts, admin dashboard) · Resend (promotional email)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Firebase web config has public defaults
baked in (see `core/config/firebase.ts`), so sign-in works out of the box against the project's
own Firebase backend. To send email from `/admin` locally, copy `.env.example` to `.env.local`
and add a [Resend](https://resend.com) API key (never commit `.env.local`).

## Project structure (feature-first)

```
app/                  routes (landing page + dashboard shell), api/admin/* (admin-only routes)
features/
  auth/                Firebase Auth store, provider, login-gate, candidate upsert
  resume-scanner/      PDF/DOCX/TXT parsing, ATS scoring engine, keyword scanner
  resume-builder/      9-step wizard, 7 templates, live preview, PDF/DOCX export (auth-gated)
  interview-prep/      industry guides, mock interview runner, STAR trainer
  question-bank/       searchable/bookmarkable question database
  jobs/                job aggregation, filters, saved-jobs board
  dashboard/, profile/ cross-feature stats, activity feed, achievements
shared/                design system (ui/, layout/), hooks, lib, firebase client/admin SDKs
core/                  types, site config, navigation, AI-provider interfaces, firebase config
```

`core/ai/providers.ts` defines the interfaces (`ResumeRewriteProvider`,
`CoverLetterProvider`, `InterviewCoachProvider`) that today ship with rule-based
implementations. Swapping in a real LLM later means implementing these same interfaces behind
an API route — no caller code changes.

## Deployment

Deployed on **Firebase Hosting** via its Next.js Web Frameworks integration (SSR runs in a Cloud
Function on the Blaze plan — required for the `/api/jobs` revalidation window and the
`/api/admin/*` routes). `firebase.json` + `.firebaserc` point at the `careerhub-app-*` project.

Also works zero-config on **Vercel** as a stock Next.js app.

### CI/CD

`.github/workflows/ci.yml` runs on every push/PR to `main`:

1. **Code scan** — ESLint, `tsc --noEmit`, CodeQL, `npm audit` (non-blocking)
2. **Build** — `next build`
3. **Smoke test** — boots the production build and checks key routes return non-5xx
4. **Deploy** — Firebase Hosting + Firestore rules (only on push to `main`, after the above pass)

Deploy auth uses a dedicated `github-ci-deploy` service account (scoped to Cloud
Functions/Run/Artifact Registry/Hosting/Firestore — not project-wide Editor), stored as the
`FIREBASE_SERVICE_ACCOUNT` GitHub Actions secret. Optional secrets: `RESEND_API_KEY`,
`RESEND_FROM_EMAIL` — without them the "Send email" button in `/admin` returns a clear
"not configured" error instead of failing silently.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm run start` — production build & serve
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit
