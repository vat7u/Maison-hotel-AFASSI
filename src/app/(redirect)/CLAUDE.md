# Root redirect

## Overview

The route group `(redirect)` serves only the bare `/` address. It has its own root
layout because every real page lives under `[lang]`, which needs its own `<html>`.
The group name does not appear in the address.

## Interface

- `layout.tsx`: `RedirectLayout` (default export) renders `<html lang="fr">` and
  `<body>`, with no stylesheets, header or footer.
- `page.tsx`:
  - `metadata`: title, `robots: { index: false }` and the icon `/brand/logo-mark.png`.
  - `RootRedirect` (default export) renders a `meta refresh` to `/fr/` and a plain link
    to the same address for browsers that ignore it.

## Invariants

- The target stays `/fr/`, with the trailing slash, because French is the default
  language of the site.
- `/` stays out of search results: its `robots` value does not depend on
  `ALLOW_INDEXING`.
- Static files cannot redirect by themselves, so this page stays until a host is chosen.
  A host-level redirect from `/` to `/fr/` should then replace it.
- Add no site content here. Pages go under `[lang]`.

## Side Effects

- The browser navigates to `/fr/` as soon as the page loads.
- The built `out/index.html` still loads the Next.js runtime scripts from
  `/_next/static/chunks/`: the page has no stylesheets, but it is not free of scripts.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`.
- After the build, `out/index.html` holds the redirect.
