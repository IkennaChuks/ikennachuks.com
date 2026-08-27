# Ikenna Chuks Okolo — Personal Site

Professional site covering about, career journey, credentials and portfolio, plus a
"Digital Twin" AI chat that answers questions about his career. Next.js App Router,
Tailwind CSS v4, Motion.

## Setup

Create `.env` in the project root:

```
OPENROUTER="sk-or-v1-..."
```

Then:

```bash
npm install
npm run dev
```

Open http://localhost:3000

Live site: https://ikennachuks.com

## Digital Twin

`POST /api/twin` streams plain text from OpenRouter using `openai/gpt-oss-120b`.

- The system prompt is generated from `src/lib/profile.ts` by `src/lib/twin-prompt.ts`,
  so the twin only knows what the site itself publishes.
- The API key is read server-side only and never reaches the browser.
- `gpt-oss-120b` is a reasoning model: it emits reasoning tokens before any content,
  so `max_tokens` has to cover both and only `delta.content` is forwarded to the client.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint

## Structure

- `src/lib/profile.ts` — all site content (bio, roles, certifications, contact)
- `src/lib/twin-prompt.ts` — dossier and rules given to the digital twin
- `src/app/api/twin` — OpenRouter streaming endpoint
- `src/components` — page sections
- `src/components/ui` — shared primitives
- `src/app/globals.css` — design tokens and utilities

Content edits should go in `src/lib/profile.ts`; the twin picks them up automatically.
