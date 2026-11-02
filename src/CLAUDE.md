# src

## Overview

All the source of the Next.js site. This folder has no source files of its own. The
routes in `app` build pages from the components in `components`, the data in `content`,
the language layer in `i18n` and the helpers in `lib`.

`messages/` (page text as JSON) and `styles/` (design-system tokens and `site.css`) hold
no code, so they have no contract. Their rules are in [the site README](../README.md).

## Subdirectories & Boundaries

- app: [./app/CLAUDE.md](./app/CLAUDE.md) - the Next.js routes: the `/` redirect, then the
  home page, about page, journal list and articles under `[lang]`. The language root layout imports
  every stylesheet.
- components: [./components/CLAUDE.md](./components/CLAUDE.md) - header, footer, home page
  sections, journal list, and `SiteLink`, used instead of `next/link`. Its `ui` folder holds
  the generated shadcn components of the booking form.
- content: [./content/CLAUDE.md](./content/CLAUDE.md) - hand-edited data: rooms, posts,
  reviews (one file per language), ratings, partner logos, contact details and `ALLOW_INDEXING`.
- i18n: [./i18n/CLAUDE.md](./i18n/CLAUDE.md) - `LOCALES`, `LOCALE_INFO`, `getMessages`, `fill` and
  `joinList`.
- lib: [./lib/CLAUDE.md](./lib/CLAUDE.md) - `getPosts`, the only loader for posts, plus
  `pageMetadata`.
