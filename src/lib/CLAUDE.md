# lib

## Overview

Shared helpers for the Next.js site. `journal.ts` loads and formats journal posts,
`metadata.ts` builds each page's `Metadata` object, and `utils.ts` exists for shadcn's
configuration.

`journal.ts` and `metadata.ts` run at build time in server components.

## Interface

- `journal.ts`
  - `getPosts(_lang: Locale): Post[]` — all posts, newest first. The only loader for
    post data, so a CMS can replace `content/posts.ts` here. `_lang` is unused: every
    language gets the French posts.
  - `formatDate(iso: string, lang: Locale): string` — long date in the language's own
    `LOCALE_INFO[lang].intl`, even though the post text is French.
  - `toSummary(post: Post, lang: Locale): PostSummary` — the post without `body`, plus
    `dateText` from `formatDate`.
  - `readingTime(post: Post, m: Messages): string` — fills `m.journal.readingTime`
    with the word count divided by 200, rounded, and at least 1.
  - `type PostSummary` — `Omit<Post, 'body'> & { dateText: string }`.
- `metadata.ts`
  - `pageMetadata({ lang, path, title, description, image, frenchContent? }): Metadata` — sets
    `metadataBase`, `title`, `description`, `robots`, `icons`, `alternates` and
    `openGraph`. `path` is the part after the language, for example `'/journal/'`.
    `frenchContent` is for pages whose content is French in every language (the journal).
- `utils.ts`
  - `cn` — re-exported from the `cn` package. `components.json` points `aliases.utils` here,
    but nothing in `src` imports this file: the files in `components/ui/` import `cn` from the
    package directly.

## Invariants

- `getPosts` is the only way pages read posts. They must not import `posts` from
  `content/posts.ts` directly.
- `getPosts` sorts with `localeCompare` on `date`, and `formatDate` appends
  `T12:00:00`, so `date` must be `YYYY-MM-DD`.
- `getPosts` must return at least one post: `app/[lang]/journal/page.tsx` reads
  `getPosts(lang)[0].image`.
- `getPosts` returns a sorted copy and leaves the exported `posts` array unchanged.
- A new `PostBlock` variant must be added to `blockText`. Its last line assumes that
  any block without `p`, `h` or `quote` is a `list`.
- `JournalList` is a client component and takes its dates from `PostSummary.dateText`.
  It imports only the `PostSummary` type from `journal.ts`. Pass it summaries from the
  server, so the browser cannot format a date differently during hydration.
- `pageMetadata`'s `path` must start and end with `/`: it is joined directly after
  `/${lang}`, and routes use trailing slashes.
- Without `frenchContent`, `alternates.languages` lists every language in `LOCALES` plus
  `x-default` pointing at `/fr${path}`, and `canonical` and `openGraph.url` use the given
  `lang`. With `frenchContent: true`, the canonical, `openGraph.url` and `og:locale` are the
  French ones (`/fr${path}`, `fr_FR`) and there is no `alternates.languages`.
- `robots` depends only on `ALLOW_INDEXING`: `noindex, nofollow` while it is `false`,
  and unset when it is `true`.
- `openGraph.type` is always `website`. `siteName` is `meta.siteName` of the page's language
  (`getMessages(lang)`), and `openGraph.locale` is `LOCALE_INFO[lang].og`.
- `metadataBase` is `new URL(SITE_URL)`, so a malformed or empty `NEXT_PUBLIC_SITE_URL` fails
  the build.

## Side Effects

- `journal.ts`: none. It only reads imported data.
- `metadata.ts`: none of its own. The `SITE_URL` it uses comes from
  `NEXT_PUBLIC_SITE_URL`, with `http://localhost:3000` as the fallback
  (`src/content/site.ts`).

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`. `scripts/check-output.mjs` checks the
  built canonical and `hreflang` of every page. There is no test suite.
