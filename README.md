# Maison d'hôtes Afassi — Next.js site

## Overview

The Next.js version of the guesthouse website, converted from the static site at
the project root (tag `static-baseline`). It is written in French, English, Spanish
and German, and builds to plain static files, so it can move to any host. It is under
development: the reviews are fictional, some details are placeholders, and no native
speaker has read the translations yet.

Stack: Next.js 16 (App Router, `output: 'export'`), React 19, TypeScript, plain CSS
built on the AFASSI design system tokens. shadcn/ui and Tailwind are installed for
the booking form (`components.json`, `src/styles/tailwind.css`, `src/components/ui/`). The
rest of the site does not use them.

## Commands

Run these inside `nextjs/`:

- `npm run dev` — development server at `http://localhost:3000`.
- `npm run build` — first runs `scripts/check-i18n.mjs` (`prebuild`), then writes the finished
  static site to `out/`, then runs `scripts/escape-css.mjs` (which writes non-ASCII characters in
  the built CSS as escapes so the icons cannot be garbled on a host that sends no encoding) and
  `scripts/check-output.mjs` (`postbuild`). A failed check fails the build.
- `npm run check:i18n` — runs the language-file check alone.
- `npm run typecheck` — checks the TypeScript code.

Set `NEXT_PUBLIC_SITE_URL` to the site's real address (for example
`https://www.example.com`, no trailing slash) before the build that goes public. Without
it, `src/content/site.ts` uses `http://localhost:3000`, and every canonical and Open Graph
address in `out/` points there. The launch checklist in `../concepts_brief.md` should
include this.

To preview the real output, run `npm run build`, then
`python -m http.server 3100 --directory out` (the `nextjs-export` entry in
`../.claude/launch.json`).

## Where things are

| To change | Edit |
| --- | --- |
| Rooms | `src/content/rooms.ts` |
| Room photos | `public/images/rooms/<room id>/01.webp`, `02.webp`, … (the count is in `rooms.ts`) |
| Hero and gallery photos | `public/images/hero/`, `public/images/gallery/`, listed in `src/app/[lang]/page.tsx` |
| Journal posts | `src/content/posts.ts` |
| Platform scores | `src/content/ratings.ts` |
| Reviews (fictional for now), one file per language | `src/content/reviews/fr.ts`, `en.ts`, `es.ts`, `de.ts` |
| Partner logos | `src/content/partners.ts` and `public/images/partners/` |
| Phone, email, map link, social links, search-engine switch | `src/content/site.ts` |
| About page photos | `src/app/[lang]/a-propos/page.tsx`, with their descriptions in each `src/messages/<lang>.json` |
| Any other page text | `src/messages/fr.json`, then the same key in `en.json`, `es.json` and `de.json` |
| Wording rules for the translations | `../docs/designs/translations-glossary.md` |
| Styles | `src/styles/site.css` |

## Interface

- **Routes** (all static, with trailing slashes): `/` forwards to `/fr/`;
  `/[lang]/` (`fr`, `en`, `es`, `de`) home; `/[lang]/journal/` list, with `?cat=` filtering in the browser;
  `/[lang]/journal/[slug]/` article; `/[lang]/a-propos/` about page.
- `src/i18n/config.ts` — `LOCALES`, `LOCALE_INFO` (`intl`, `label`, `name`, `og`), `isLocale`.
- `src/i18n/messages.ts` — `getMessages(lang)`; every language file must hold every key of
  `fr.json`. `src/i18n/fill.ts` — `fill(template, values)`; `src/i18n/format.ts` — `joinList`.
- `src/content/rooms.ts` — `getRooms(lang)`; the text of every room exists in every language.
- `src/content/reviews/` — `getReviews(lang)`, one reviews file per language.
- `src/lib/journal.ts` — `getPosts(lang)` is the only loader for posts, so a CMS can
  replace `posts.ts` here; also `formatDate`, `toSummary`, `readingTime`.
- `src/lib/metadata.ts` — `pageMetadata()` builds title, description, Open Graph,
  canonical, `hreflang` and `noindex`; `frenchContent` is for the journal pages.
- `src/components/` — `SiteHeader`, `SiteFooter`, `NavLinks`, `LangSwitch`, `CurrentYear`,
  `Announcement`, `HeroSlider`, `PartnerSlider`, `GallerySlider`, `RoomsSection`, `RoomGrid`, `RoomPhotos`, `RoomFacts`,
  `ReviewsSection`, `ReviewStrip`, `RatingLogo`, `Stars`, `BookingSection`,
  `BookingContext`, `RoomPicker`, `DatePicker`, `JournalList`, `PostCard`, `PhotoCollage`,
  `TripadvisorIcon`, `FadeObserver`, `BackToTop`,
  `SiteLink`.

Each code folder under `src/` has a `CLAUDE.md` with its own contract; start at
[src/CLAUDE.md](./src/CLAUDE.md).

## Confirmed facts

Checkable claims about the guesthouse must be on this list. Tone sentences that make no
claim about the house are allowed. Each fact below was confirmed by the owner on the date given.

- A 10-minute walk from the historic Medina, measured from the guesthouse door (2026-10-31).
- A closed motorcycle garage, free of charge and for guests only (2026-10-31).
- The team gives local tips and travel information, in person and by message (2026-10-31).
- Breakfast is served from 8h to 10h (2026-10-31).
- Booking directly costs less than Booking.com or Expedia (2026-10-31).
- Reception is open from 8h to 22h, check-in is from 14h, and a reply comes within 24 hours (2026-11-01).
- Staff answer guests in any language, with AI and translation tools (2026-11-01).
- Check-out is before 11h (2026-11-02).

The owner's story text (`../AboutUsStory.txt`, 2026-11-01), shown on the about page, adds:

- Opened in 2022, classified second category, 13 rooms.
- In the town centre, a 5-minute walk from the bus station, reachable by car and van.
- Concierge service, personal assistance, and organised excursions and visits.

The journal, the fictional reviews and the phone and email predate this rule and are not yet
checked.

## Invariants

- **Tailwind must not reach the existing site.** `src/styles/tailwind.css` leaves out Tailwind's
  reset (preflight) and shadcn's page-wide `@layer base` rules, and everything sits in layers, so
  `site.css` always wins. Its own small reset applies only to `[data-slot]` elements, which are
  shadcn's.
  `@source not inline("container")` stops a clash with the site's `.container`.
  After each `npx shadcn@latest add`, check that the command did not bring any of these back.
  Install shadcn components with the project's exact-version habit: remove `^` from what it adds.
- **shadcn takes its look from the design system.** Its colours and `--radius` in
  `src/styles/tailwind.css` point at the tokens in `src/styles/ds/`, so change the tokens, not those
  values. Do not add a `.dark` block: the site has no dark mode.
- **The address is the only source of language.** Nothing is stored in the browser.
  The language buttons are links to the same page in another language.
- **Keep the build static.** `next.config.mjs` sets `output: 'export'`: no middleware,
  API routes, config redirects, or server rendering at request time.
- **Pages stay readable without JavaScript.** Text is rendered at build time, which
  is the reason for the conversion. Client components are only for behaviour.
- **Adding a language:** add it to `LOCALES`, then fill `LOCALE_INFO`, `src/messages/<lang>.json`,
  the `text` of every room and a reviews file. `npm run typecheck` fails until each one is
  complete, and `check-i18n` and `check-output` check the rest. There is no release switch: a
  language in `LOCALES` is live, with its own `<html lang>` and `hreflang`.
- **Journal posts stay French in every language.** The pages around them are translated, the
  post text is marked `lang="fr"`, and the journal pages point their canonical to `/fr/`
  with no `hreflang` (`frenchContent` in `pageMetadata`).
- **Rooms:** `src/content/rooms.ts` holds the 7 room types from
  `../room_inventory_recreated.md`. Rooms with `featured: true` show first and stay at
  the top of the list; `RoomGrid` reveals the others with "Voir plus". All rooms stay in
  the HTML, and a `<noscript>` rule shows them without JavaScript. `RoomFacts` shows
  capacity, amenity tags, beds with icons and the optional sentence, and is used by both
  the room cards and the booking summary so they stay identical. The amenity tags are
  the same for every room (`AMENITIES` in `RoomFacts`). No prices are shown: each room's button reads
  "Demandez votre tarif" and adds that room to the booking form, where a guest picks how many
  rooms of each type they want, up to `count` in `rooms.ts` (the house's 13 rooms). The first
  room is the default, and at least one always stays chosen.
- **Each language has its own reviews file, never translated or mixed.** `ReviewsSection`
  shows the file of the route's language (`getReviews`). `content/reviews/index.ts` fails the
  build for an empty file, a repeated id, an unknown platform or a bad country code.
- **`isMock` stays `true` in a reviews file while its reviews are fictional.** Never present
  them as real. Any file with `isMock: true` means the site is not ready to launch, and the
  build fails if `ALLOW_INDEXING` is `true` while one is.
- **`ALLOW_INDEXING` stays `false` until the launch checklist is done**
  (`src/content/site.ts`, checklist in `../concepts_brief.md`).
- **Use `@/components/SiteLink`, not `next/link`.** Background prefetching asks for
  file names a static export does not produce, which causes 404s.
- **`.fade` content starts hidden.** `FadeObserver` reveals it, and a `<noscript>` rule
  in `src/app/[lang]/layout.tsx` shows it without JavaScript. It relies on a
  `MutationObserver`, so content added later is covered automatically.
- **Partner and review strips:** only the first list is the source. Copies are
  generated from measured widths and are hidden from screen readers and the keyboard.
- **Dates and country names are formatted on the server**, then passed as props to
  client components, so the browser cannot produce different text during hydration.
- `src/styles/ds/` is copied from the design system: change tokens there, not with raw
  values in `site.css`. `fonts.css` replaces `ds/tokens/fonts.css`.
- Post `date` must be `YYYY-MM-DD`, `slug` must be unique, and post text is plain text.
- `review.platform` must match a `platform` in `ratings.ts`.

## Side Effects

- Build time: `next/font` downloads the fonts and serves them with the site.
- Network in the browser: the room photos, the gallery's guesthouse photos and four of the five
  hero photos are files of the site. The journal, the 7 photos of the About collage, the last hero slide and
  three gallery photos load from `images.unsplash.com`. Flags come from `flagcdn.com` and platform
  logos from Google's favicon service.
- The booking form sends nothing: `BookingSection` shows a confirmation dialog and
  resets the form. It must send real requests before the site goes public.
- No storage, cookies or server calls.

## Known limits

- The room, hero and gallery photos are the owner's own (originals in `../photograph/JPEG`,
  resized to WebP: rooms 1200 px wide, hero 2200 px, gallery 1100 px). The home story section and
  the About page's top and bottom bands reuse gallery photos. The 7 photos of the About collage
  are still temporary Unsplash stand-ins of Chefchaouen, marked by `about.note` under them.
  Replacing them means changing the photos, their descriptions and removing `about.note`.
- Hosts differ on redirects: `/` uses a `meta refresh` page until a host is chosen.
- An unknown address shows the default Next.js 404 page, in English. The static site's
  "Article introuvable" message is gone; a French 404 page is still to do.
- The site has no right-to-left language. Arabic was removed; the generated shadcn files in
  `src/components/ui/` still carry `rtl:` classes, and `components.json` still says `rtl: true`.
- Journal posts exist in French only.
- No native speaker has read the English, Spanish and German text, and the page titles and
  descriptions use proposed search phrases that no keyword tool has checked.
- In `npm run dev`, React logs a "script tag" warning after a language switch. It does
  not appear on the built site.

## Verification

- Run: `npm run typecheck && npm run build`.
- Manual check: preview `out/`, then compare `/fr/` with the static site at 1280 px.
