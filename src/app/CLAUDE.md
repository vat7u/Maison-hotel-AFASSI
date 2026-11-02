# App Router routes

## Overview

`src/app` holds the Next.js routes. There is no `app/layout.tsx`: `(redirect)` (a route
group) and `[lang]` (a dynamic segment) each have their own root layout, so `/` is a
small redirect page that does not load the site's stylesheets or header. Every route is written to `out/` as static files.

## Interface

- `fonts.ts`: `fontVariables` is the space-separated list of `next/font` class names
  for the four fonts. They define `--nf-script`, `--nf-label`, `--nf-body` and
  `--nf-display`. Only `[lang]/layout.tsx` uses it.
- [`(redirect)`](./(redirect)/CLAUDE.md): the `/` address, which forwards to `/fr/`.
- [`[lang]`](./[lang]/CLAUDE.md): the home page and root layout for each language, with
  the journal and about routes below it.

## Invariants

- Keep the build static (`output: 'export'` in `nextjs/next.config.mjs`): no middleware,
  API routes or rendering at request time. Dynamic routes need `generateStaticParams`
  from their own file or a parent layout, with `dynamicParams = false`.
- `trailingSlash: true` is set, so internal addresses and the `path` given to
  `pageMetadata` end in `/`.
- `path` for `pageMetadata` is the part after the language, for example `/journal/`.
- Each root layout must render its own `<html>` and `<body>`. Adding `app/layout.tsx`
  would change that structure and would need both groups reworked.
- A font added to `fonts.ts` must join the array behind `fontVariables`, and its
  variable must be used in `src/styles/fonts.css` or `site.css`.
- There is no `not-found.tsx`. Unknown addresses show the default Next.js 404 page, a
  known limit listed in `nextjs/README.md`.

## Side Effects

- Build time: `next/font/google` downloads the fonts, which are then served with the
  site.
- None in the browser from `fonts.ts`: no font is requested from Google.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`.
