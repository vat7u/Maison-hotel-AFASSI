# Journal list route

## Overview

`/[lang]/journal/` renders the journal header and passes the post summaries to the
client component `JournalList`, which handles the category tabs. The page itself is a
server component.

## Interface

- `page.tsx`:
  - `generateMetadata({ params })` calls `pageMetadata` with the path `/journal/`,
    `meta.journalTitle`, `meta.journalDescription`, the newest post's `image` and
    `frenchContent: true`.
  - `JournalPage` (default export) maps `getPosts(lang)` through `toSummary` and
    renders `JournalList`.
- [`[slug]`](./[slug]/CLAUDE.md): one article.

## Invariants

- `getPosts(lang)` must return at least one post: `generateMetadata` reads
  `getPosts(lang)[0].image` with no guard, so an empty list fails the build.
- Pass `toSummary` output to `JournalList`, never whole posts. `toSummary` drops `body`
  and adds `dateText`, so the date is formatted on the server and the article text
  stays out of the client props.
- This page has no `generateStaticParams`. Its language params come from
  `../layout.tsx`.
- The posts are French in every language. `pageMetadata` is called with `frenchContent: true`, so
  the canonical and `og:url` are the `/fr/journal/` address and the page has no `hreflang`.
  `JournalList` and `PostCard` mark post text with `lang="fr"`.
- Category filtering stays in the browser (`JournalList` reads `location.search`).
  Reading `searchParams` here would need request-time rendering, which the static
  export rules out.

## Side Effects

- None here: the route is written to `out/` during the build. Images and tabs are in
  `JournalList` and `PostCard` (`nextjs/src/components/`).

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`.
