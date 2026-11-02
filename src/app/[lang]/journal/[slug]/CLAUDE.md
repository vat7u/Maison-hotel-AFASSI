# Journal article route

## Overview

`/[lang]/journal/[slug]/` renders one journal post at build time, followed by up to
three other posts and a band that links to the booking form. Everything here is a
server component.

## Interface

- `page.tsx`:
  - `dynamicParams = false`.
  - `generateStaticParams()` returns every `LOCALES` and `getPosts(lang)` slug pair.
  - `generateMetadata({ params })` calls `pageMetadata` with the path
    `/journal/${slug}/`, the title `post.title — meta.articleTitleSuffix`, the
    post's `excerpt` and `image`, and `frenchContent: true`. It returns `{}` if no post matches.
  - `ArticlePage` (default export) is the page. It calls `notFound()` if no post
    matches.
  - `Block` (local, not exported) renders one `PostBlock`: `h` as `<h2>`, `quote` as
    `<blockquote>`, `list` as `<ul>`, and anything else as a `<p>` from `block.p`.

## Invariants

- A new `PostBlock` shape in `nextjs/src/content/posts.ts` needs a branch in `Block`
  (and in `blockText` in `nextjs/src/lib/journal.ts`). Otherwise `Block` falls through
  to `block.p`.
- Post text is plain text: `Block` passes it to React as text, never as HTML.
- Read posts only through `getPosts`, the single loader in `nextjs/src/lib/journal.ts`.
  Posts are French only, and `getPosts` ignores `lang`, so every language has the
  same slugs.
- The title, excerpt, category link and body carry `lang="fr"`, because the post text is French
  under every language. Photo descriptions stay French, since an attribute cannot carry a
  language. The canonical and `og:url` are the `/fr/` address and there is no `hreflang`; the
  labels, date, reading time and call-to-action band are in the page's language.
- `?cat=` links must carry `encodeURIComponent(post.category)`. `JournalList` ignores
  any value that is not the `category` of a post.
- `#reserver` must stay the `id` of the section in `BookingSection`, or the band's
  button loses its target.
- Links use `@/components/SiteLink`, not `next/link`.

## Side Effects

- Browser network: the article `<img>` and the related `PostCard` images load each post's
  `image` (`images.unsplash.com`).
- None at request time: the route is written to `out/` during the build.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`.
