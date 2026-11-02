# content

## Overview

Hand-edited site data for the Next.js site: rooms, journal posts, reviews, platform
ratings, partner logos, and contact details and site settings. The modules hold data
and types only. The exported functions are `getRooms` and `getReviews` (`rooms.ts` and
`ratings.ts` also have small private helpers), and nothing is fetched. The list
of which file to edit for which change is in [the site README](../../README.md).

The header comment of `rooms.ts`, `posts.ts`, `ratings.ts` and `reviews/fr.ts`
explains each field for whoever edits that file. Keep those comments in step with the
types.

## Interface

- `rooms.ts`
  - `getRooms(lang: Locale): Room[]` — the rooms in list order, each with its `text`
    entry for `lang` flattened onto it. `text` is a `Record<Locale, RoomText>`, so every
    language has an entry for every room, and there is no fallback. The `rooms` array itself
    is not exported.
  - `type Room` — `id`, `count`, `maxGuests` (most guests per room; `BookingSection` offers 1 up to the sum over the chosen rooms, so keep it equal to the top of `details`), `featured`, `beds`, `images` (the photo addresses, cover first), plus
    the per-language `name` (the short type, also used in the booking confirmation), `label`
    (the full phrase in the room picker's list and in the photo descriptions), `kind` (word above
    the name), `details` and the optional `desc`, `badge`.
  - `type RoomBeds` — optional `double`, `single`, `sofa` counts. A missing or zero count
    shows nothing.
- `posts.ts`
  - `posts: Post[]` — the journal posts. Pages read them through `getPosts` in
    [`lib/journal.ts`](../lib/CLAUDE.md), not from here. `getPosts` sorts by date, so the
    order in this file does not set the display order.
  - `type Post` — `slug`, `title`, `date`, `category`, `image`, `alt`, `excerpt`,
    `body`.
  - `type PostBlock` — `{ p }`, `{ h }`, `{ quote }` or `{ list }`.
- `reviews/` — `fr.ts`, `en.ts`, `es.ts`, `de.ts` and `index.ts`
  - `getReviews(lang: Locale): ReviewsData` — the reviews of that language: `{ isMock, reviews }`.
    Every review is fictional while `isMock` is `true`. Read by `ReviewsSection`.
  - `type Review` — `id`, `platform`, `name`, `country`, `rating`, `text`.
  - `type ReviewsData`.
- `ratings.ts`
  - `ratings: Rating[]` — the platform summary cards, in display order. Scores are
    typed in by hand. Read by `ReviewsSection`.
  - `type Rating` — `platform`, `name`, `short?`, `logo`, `score`, `scale`, `count`,
    `url`. A `null` `logo`, `count` or `url` hides that item. Without `short`, the label
    under a review shows `name`.
- `partners.ts`
  - `partners` — `{ src, alt, width, height }` for each logo. Read by `PartnerSlider`.
- `site.ts`
  - `SITE_URL` — `NEXT_PUBLIC_SITE_URL`, or `http://localhost:3000` if it is unset. An empty
    value is kept, and `pageMetadata` then fails the build. Used by `pageMetadata`.
  - `ALLOW_INDEXING` — `false`. Used by `pageMetadata` to set `noindex, nofollow`.
  - `INSTAGRAM_URL`, `TRIPADVISOR_URL` — used by `SiteHeader` and `SiteFooter`;
    `INSTAGRAM_URL` also by the home page.
  - `PHONE_DISPLAY`, `PHONE_LINK`, `EMAIL`, `MAPS_URL` — used by `SiteFooter`. The street address
    text is `footer.address` in `fr.json`.

## Invariants

- `rooms.ts` holds the 7 room types from `room_inventory_recreated.md` at the repository
  root. Beds, capacity, area and `count` (rooms of that type: 4, 1, 2, 1, 2, 1, 2 = 13) must
  match that file. Each entry is a type, not a single room.
- The list must not be empty, and its first room is the booking form's default:
  `app/[lang]/page.tsx` and `BookingSection` read `rooms[0]`. Reordering the list changes
  the default.
- Every room needs `text` in all four languages, and the German `name` must be a neuter
  "-zimmer" noun, because the confirmation sentence puts "das" or "die" before it.
- `images` comes from `roomPhotos(id, count)`: the files `public/images/rooms/<id>/01.webp` up to
  `count` must exist, numbered without gaps. The first is the cover (card and booking summary);
  the bathroom photo goes last. A missing file shows a broken photo; nothing checks it.
- Room `id` must be unique. It is the React key, the value of `RoomPicker`'s hidden `room`
  inputs, and what `RoomBookLink` passes to the booking form.
- Keep `featured: true` rooms at the top of the list. `RoomGrid` keeps list order and
  does not sort.
- No prices in `rooms.ts`: the site shows an "ask for your price" button instead. The
  amenity tags are the same for every room and live in `AMENITIES` in
  `components/RoomFacts.tsx`, not here.
- Post `date` must be `YYYY-MM-DD`, and `slug` must be unique and lowercase with dashes,
  because it is the post's address. Post text is plain text, rendered escaped, not HTML.
- `posts` must not be empty: `app/[lang]/journal/page.tsx` reads the first post's image.
- Post `category` drives the journal filter tabs: a new word creates a new tab.
- Posts exist in French only, and every language shows them.
- Each reviews file keeps `isMock: true` while its reviews are fictional. Never present them as
  real. While it is `true`, `ReviewsSection` passes the example badge (`reviews.badge`) to
  `ReviewStrip`; setting it to `false` in one file removes the badge for that language only.
- `reviews/index.ts` checks every file when the module loads and fails the build for: an empty
  file, a repeated `id` within a file, an unknown `platform`, a country that is not two letters,
  or `isMock: true` while `ALLOW_INDEXING` is `true`.
- `review.platform` must match a `platform` in `ratings.ts`. The type is `string`, so only the
  check in `reviews/index.ts` catches a mismatch, at build time.
- `review.rating` is on that platform's scale: out of 5 for Google, out of 10 for Expedia
  and Booking.com.
- `review.country` must be a two-letter code. `Intl.DisplayNames` throws a `RangeError`
  on a malformed code, which fails the build.
- `review.id` must be unique within a file: `ReviewStrip` uses it as the key and to track long
  reviews.
- A reviews file holds reviews written in its own language. `ReviewsSection` shows the file of
  the route's language, and never translates or mixes them.
- `rating.platform` must be unique: it is the React key, and each review finds its
  rating with `ratings.find`.
- Each partner `src` must be an existing file in `public/images/partners/`, and must be
  unique (it is the React key). `width` and `height` are the file's real pixel size.
- `ALLOW_INDEXING` (in `site.ts`) stays `false` until the launch checklist in `concepts_brief.md`
  at the repository root is done.
- `PHONE_DISPLAY` and `PHONE_LINK` are the same number in two forms: change them together.
  `site.ts` says the site still contains placeholder details.
- The only import in these files is the `Locale` type from `@/i18n/config`, except that
  `reviews/index.ts` also imports `ratings.ts` and `ALLOW_INDEXING` for its checks. `PartnerSlider`, a
  client component, imports `partners.ts`, so its data ships to the browser.

## Side Effects

- These modules perform no I/O. The only outside input is `process.env.NEXT_PUBLIC_SITE_URL`
  in `site.ts`.
- The URLs stored here cause browser requests once rendered: room photos from
  `public/images/rooms/`, post photos from `images.unsplash.com`, and platform logos from Google's favicon service
  (`www.google.com/s2/favicons`, built by `favicon` in `ratings.ts`). Each
  `review.country` also becomes a `flagcdn.com` image in `ReviewStrip`.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`. There is no test suite.
