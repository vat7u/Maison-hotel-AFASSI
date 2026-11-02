# Maison d'hôtes Afassi — Next.js site

Before reading or changing anything in this folder, read [README.md](README.md).
It is this folder's contract: where each kind of content lives, and the invariants
you must keep (static export only, the address is the only source of language,
`isMock` and `ALLOW_INDEXING` stay as they are until launch, `SiteLink` instead of
`next/link`).

@README.md

The reviews in `src/content/reviews/` (one file per language) are fictional while their
`isMock` is `true`. Never present them as real guest reviews.

If a change alters what README.md describes (a new file, route, rule or side
effect), update README.md in the same change.

## System Overview

The guesthouse website, still under development. Next.js 16 and React 19 build it at
`npm run build` into plain static files in `out/`, so it can move to any host. Pages are
rendered at build time for each language in `LOCALES`, and client components only add
behaviour in the browser. There is no server, database or form backend.

## Local Interface & Invariants

- `next.config.mjs`: default export `nextConfig`, with `output: 'export'`,
  `trailingSlash: true` and `images: { unoptimized: true }`. These rule out middleware,
  API routes, config redirects and automatic image resizing. Internal addresses end in
  `/`.
- `package.json` scripts: `dev`, `prebuild`, `check:i18n`, `build`, `postbuild`, `typecheck`. There is
  no `test` script.
- `postcss.config.mjs` runs Tailwind. `components.json` configures shadcn/ui (`radix-nova` style,
  `rtl: true`, components in `src/components/ui`). Rules for both are in [README.md](README.md).
- `scripts/check-i18n.mjs` runs as `prebuild`. `scripts/escape-css.mjs` and then
  `scripts/check-output.mjs` run as `postbuild`; the first rewrites `out/_next/static/**/*.css`.
  Publish only output from `npm run build`, not from `npx next build`, which skips all three.

## Subdirectories & System Boundaries

- src: [./src/CLAUDE.md](./src/CLAUDE.md) - all the source: routes, components, data,
  language layer and helpers.
- scripts: [./scripts/CLAUDE.md](./scripts/CLAUDE.md) - `check-i18n.mjs` (`prebuild`), `escape-css.mjs` and
  `check-output.mjs` (`postbuild`).
- public (no contract; files only): images and logos served as they are.

## Global Invariants

- The rules under "Invariants" in [README.md](README.md) apply to every folder.
- The address is the only source of language: nothing stores or detects it.
- Each reviews file keeps `isMock: true` while its reviews are fictional, and `ALLOW_INDEXING`
  stays `false` until the launch checklist in `../concepts_brief.md` is done.
- `.fade` content starts hidden: `FadeObserver` reveals it, and `NO_SCRIPT_FADE` in
  `src/app/[lang]/layout.tsx` shows it without JavaScript. Under reduced motion `site.css`
  keeps it visible.
- If a change alters what a folder's `CLAUDE.md` describes, update that file in the same
  change.

## Global Side Effects

- Build time: `next/font/google` downloads the fonts, which are then served with the
  site.
- Browser network: photos from `public/images/` and `images.unsplash.com`, flags from `flagcdn.com`, platform
  logos from Google's favicon service.
- The booking form sends nothing. No storage, cookies or `fetch` calls.
- The only environment variable is `NEXT_PUBLIC_SITE_URL`, read in `src/content/site.ts`.
  Build the public site with it set, or canonical and Open Graph addresses point to
  `http://localhost:3000`.

## System Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`. There is no test suite.
- Manual check: preview `out/` (the `nextjs-export` entry in `../.claude/launch.json`).
