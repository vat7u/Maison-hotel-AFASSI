# Drift report, 30 October 2026

Scope: the 11 `CLAUDE.md` contracts under `nextjs/` and `nextjs/README.md`, compared with
the source and with a fresh build. `npm run typecheck` and `npm run build` both pass.

## README.md

- `NEXT_PUBLIC_SITE_URL` is not mentioned. `src/content/site.ts` falls back to
  `http://localhost:3000`, so a build without it publishes that address: `out/fr/index.html`
  has `rel="canonical" href="http://localhost:3000/fr/"`. The Commands section and the
  launch checklist in `../concepts_brief.md` should both say to set it.

## CLAUDE.md

- Same gap: Global Side Effects and System Verification do not name `NEXT_PUBLIC_SITE_URL`,
  the only environment variable the site reads.

## src/CLAUDE.md

No drift detected

## src/app/CLAUDE.md

- The Overview says "the two groups below each have their own root layout". Only
  `(redirect)` is a route group. `[lang]` is a dynamic segment.

## src/app/(redirect)/CLAUDE.md

No drift detected

## src/app/[lang]/CLAUDE.md

- `data-scroll-behavior="smooth"` on `<html>` in `layout.tsx` is not documented. It works
  with `html { scroll-behavior: smooth }` in `site.css`, so removing it looks harmless but
  is not.
- The contract does not record that the "Tout le journal" link in `page.tsx` is a plain
  `<a>`, while links between pages elsewhere use `SiteLink`. It reloads the whole page.

## src/app/[lang]/journal/CLAUDE.md

No drift detected

## src/app/[lang]/journal/[slug]/CLAUDE.md

No drift detected

## src/components/CLAUDE.md

- The Overview says "Components without `'use client'` render at build time". This is
  false for `RoomFacts`, `Stars` and `PostCard`. They have no `'use client'`, but client
  components import them (`RoomGrid`, `BookingSection`, `ReviewStrip`, `JournalList`), so
  they also go to the browser and their imports go with them.
- `.toast` in `site.css` sits 56 px above the gutter to clear `.back-to-top`. The contract
  does not record this, so resizing or moving the button would overlap the toast.
- `LangSwitch` passes `scroll={false}`, which keeps the scroll position when changing
  language. This is not documented.
- `RoomGrid` hides "Voir plus" when every room is `featured` (`hasMore`). This is not
  documented.

## src/content/CLAUDE.md

- The Overview says "The one function here is `getRooms`". `photo` in `rooms.ts` and
  `favicon` in `ratings.ts` are also functions, though neither is exported, and the same
  contract cites `favicon` later. It should read "the one exported function".
- The contract asks for header comments to be kept accurate, but the one in
  `mock-reviews.ts` suggests renaming the file to `reviews-data.js`. It is TypeScript, so
  the name would be `.ts`.
- The comments in `rooms.ts` and `ratings.ts` give `public/images/rooms/` and
  `public/images/platforms/` as locations. Neither folder exists yet.

## src/i18n/CLAUDE.md

- The last invariant names only `HeroSlider` as the reason the message files reach the
  browser. `RoomFacts` also imports `fill` as a value and reaches the browser through
  `RoomGrid` and `BookingSection`. Both must change to remove the 19 KB chunk, which only
  the home pages load.
- Already recorded in the contract, still wrong in the source: the comment in `config.ts`
  says untranslated languages stay out of search results. Nothing does that once
  `ALLOW_INDEXING` is `true`.

## src/lib/CLAUDE.md

No drift detected
