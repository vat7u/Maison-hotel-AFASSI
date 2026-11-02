# Components

## Overview

The React components of the Next.js site: the header and footer, the sections of the
home page, the journal list and a few small helpers. The only subdirectory is `ui`, the
generated shadcn components.

Components without `'use client'` render at build time, unless a client component
imports them: then they also run in the browser (`RoomFacts`, `Stars`, `PostCard` and
`SiteLink` do).
Files marked `'use client'` are pre-rendered too, then add behaviour in the browser, so
page text stays readable without JavaScript. Page text comes from `Messages` or `src/content/`, not from the
components. The exceptions are short symbols (`©`, ` · `).

Read `../../README.md` first: its rules apply here. If a change alters what this file
describes, update this file in the same change.

## Interface

All exports are named, except `SiteLink`, which is the default export of its file.
The shadcn components are in [`ui`](./ui/CLAUDE.md).

**Used by `src/app/[lang]/layout.tsx`, on every page**

- `SiteHeader({ lang })` — logo, `NavLinks`, Instagram and Tripadvisor icons,
  `LangSwitch`. Reads its text with `getMessages(lang)`.
- `SiteFooter({ lang })` — logo, hours, links, address, phone, email, social icons. Holds `id="contact"`.
- `BackToTop({ label })` — round button that appears after 400 px of scrolling
  (`SHOW_AFTER`) and returns to the top.
- `FadeObserver()` — renders nothing. Adds `in` to `.fade` elements when 12 % of one is
  visible.

**Used by `src/app/[lang]/page.tsx`, the home page**

- `Announcement({ text, closeLabel })` — dismissible band. The choice is not saved, so
  it returns on the next load.
- `HeroSlider({ slides, dotsLabel, dotLabel, children })` — crossfades every 6000 ms.
  Pauses on hover and while the tab is hidden, and does not advance on its own for
  reduced motion. Clicking a dot, or returning to the tab, restarts the timer, even with the
  pointer on the hero. With fewer than 2 slides it has no timer and no dots.
  Holds `id="accueil"`. Also exports the type `HeroSlide`.
- `PartnerSlider()` — endless logo strip from `partners` in `@/content/partners`.
- `GallerySlider({ photos })` — endless strip of 7-photo collages, sliding left to right. It
  uses CSS only and has no `'use client'`. It cuts `photos` into sets of 7 (`site.css` places
  exactly 7 per set) and throws if the count is not a multiple of 7. It sets `--gallery-sets`,
  so the slide distance is that many `--gallery-set` widths and the loop lasts 50 s per set.
  Copies of the whole group of sets are `aria-hidden`. Paused on hover, still for reduced motion.
- `RoomsSection({ rooms, t })` — heading of the rooms section, then `RoomGrid`. Holds
  `id="chambres"`.
- `ReviewsSection({ lang, m })` — platform scores from `ratings`, then the reviews of
  `getReviews(lang)`, the file of this language. Holds `id="avis"` and `lang`.
- `BookingSection({ lang, rooms, t, roomText })` — booking form, room summary and
  confirmation dialog. The dialog splits `dialogOne` or `dialogMany` at `{rooms}` and puts the
  room names, joined by `joinList`, in bold. Holds `id="reserver"`. The guests list is a fixed 1 to 6, not
  tied to the chosen room.
- `BookingProvider({ initialRoom, children })` — in `BookingContext.tsx`. Shares the
  list of chosen rooms.

**Used by other components**

- `useBooking()` — in `BookingContext.tsx`. Returns `{ chosen, setCount, addRoom, resetRooms }`.
  `chosen` (type `Chosen`) lists `{ id, count }` per room type, in the order the types were
  chosen; the last type is the room shown in the summary card. `setCount(id, count, max)` clamps
  to 0..`max` and drops a type at 0. `addRoom` chooses one room of a type that has none, and moves
  the type to the end either way, so it changes that card.
- `RoomBookLink({ roomId, label })` — in `BookingContext.tsx`. Link to `#reserver` that
  adds the room to the choice.
- `RoomPicker({ id, rooms, lang, t })` — dropdown with one row per room type: its `label`, how
  many rooms of that type the house has (`room.count`, `booking.typeCountOne`/`typeCountMany`)
  and a − / + counter from 0 to that number. The button lists the choice with `joinList`, as
  "2 × Double Deluxe" for more than one room of a type. Also exports `chosenNames(chosen, rooms)`,
  which builds that list (used for the confirmation too). Used by `BookingSection`.
- `DatePicker({ lang, id, name, value, onChange, firstDay, placeholder, invalid })` — button that
  opens a calendar in the page's language. Used by `BookingSection`.
- `RoomPhotos({ images, label, t })` — the photo slider of a room card: a strip that snaps to
  one photo, with arrows that wrap around and a "2 / 9" counter. Each photo's `alt` fills
  `rooms.photoAlt`. Used by `RoomGrid`.
- `RoomGrid({ rooms, t })` — room cards, with "Voir plus" revealing the rooms that are
  not `featured`. Used by `RoomsSection`.
- `RoomFacts({ room, t })` — capacity, amenity tags (`AMENITIES`), beds and the optional
  sentence. Used by `RoomGrid` and `BookingSection`.
- `ReviewStrip({ reviews, badge, more, less })` — endless strip of review cards.
  Used by `ReviewsSection`. Also exports the type `StripReview`.
- `RatingLogo({ src })` — platform logo. Used by `ReviewsSection`.
- `Stars({ score, scale })` — five stars, gold up to `score / scale`. Used by
  `ReviewsSection` and `ReviewStrip`, which shows it only for a scale of 5 and a number for
  other scales.
- `NavLinks({ lang, t })` — the menu. On the home page the active link follows the
  section in view (`SECTIONS`). The About and Journal links are marked with `aria-current`
  on their own pages. Used by `SiteHeader`.
- `LangSwitch({ lang, label })` — links to the same page in each language, each with `lang`,
  `hrefLang` and the language's own name as `aria-label`. Used by `SiteHeader`.
- `CurrentYear({ buildYear })` — shows the build year, then the visitor's year after
  load. Used by `SiteFooter`.

**Used in several places**

- `PostCard({ post, lang, readMore })` — journal card; category, title and excerpt carry
  `lang="fr"`. Used by the home page,
  `JournalList` and `src/app/[lang]/journal/[slug]/page.tsx`.
- `JournalList({ posts, lang, t })` — category tabs, featured post and card grid. The
  featured post shows only under "all categories". A `?cat=` value that no post has is
  ignored. Used by
  `src/app/[lang]/journal/page.tsx`.
- `PhotoCollage({ photos, layout })` — framed photos, as a `band` of 3 or a `collage` of 7. Used
  by `src/app/[lang]/a-propos/page.tsx`. The placement is in `site.css`.
- `TripadvisorIcon()` — the Tripadvisor icon as an inline SVG. Used by `SiteHeader` and
  `SiteFooter`.
- `SiteLink` — `next/link` with `prefetch={false}`. Import it as
  `import Link from '@/components/SiteLink'`.

## Invariants

- **Links:** use `SiteLink` for links between pages, never `next/link`. Do not pass
  `prefetch`: the props are spread after `prefetch={false}` and would override it.
- **Booking:** `useBooking` throws outside `BookingProvider`, so `RoomBookLink`,
  `RoomGrid`, `RoomPicker` and `BookingSection` must stay inside it. The provider is in
  `src/app/[lang]/page.tsx`, so these work only on the home page.
- **Chosen rooms:** `BookingSection` needs at least one room. `initialRoom` is `rooms[0]` (one
  room), and the choice resets to it after submitting. `setCount` never removes the last type, and
  `RoomPicker` disables − when only one room is chosen in all, so the summary card always has one
  to show. + is disabled at `room.count`. The confirmation uses `dialogMany` when more than one
  room is chosen in all, even of a single type. An unknown id falls back to `rooms[0]`.
- **Form reset:** the guests `Select` keeps its own value, so `key={resets}` remounts it after
  submitting. Keep that key.
- **shadcn:** `src/components/ui/` is generated by `npx shadcn@latest add`. `RoomPicker`,
  `DatePicker` and `BookingSection` use it, and `.booking-form` and `.booking-control` in `site.css`
  give the form its height, font and labels. Set only properties the components do not change on
  focus or error (`site.css` wins over Tailwind).
- **Dates:** `DatePicker` takes its calendar from `CALENDARS` (`fr`, `enGB`, `es`, `de` from
  `react-day-picker/locale`) and formats the chosen date with `LOCALE_INFO[lang].intl` in the
  browser, which is safe for hydration because it appears only after a choice. A new language
  needs an entry in `CALENDARS`. Dates are checked on submit, not by
  the browser. Choosing an arrival clears a departure on or before it, and the departure's
  `firstDay` is the day after the arrival.
- **Section ids:** `SECTIONS` in `NavLinks` must match the ids in the page: `accueil`
  (`HeroSlider`), `chambres` (`RoomsSection`), `avis`
  (`ReviewsSection`), `reserver` (`BookingSection`). `RoomGrid` also scrolls to
  `chambres` when it closes, `RoomBookLink` links to `#reserver`, and the Contact link
  in `NavLinks` needs `id="contact"` in `SiteFooter`.
- **No-JavaScript rule:** `NO_SCRIPT_FADE` in `src/app/[lang]/layout.tsx` names `.fade`,
  `.room[hidden]` and `.rooms-more`. Renaming those classes, or changing how `RoomGrid`
  hides rooms, means changing that rule too. Rooms use the `hidden` attribute so they
  stay in the HTML. Do not render them conditionally.
- **Strips:** in `PartnerSlider` and `ReviewStrip`, only the list with the `list` ref is
  the source and is the one measured. Copies are `ceil(band width / list width) + 1`,
  and nothing is copied for reduced motion. Copies keep `aria-hidden`; `PartnerSlider`
  copies have empty `alt`, and `ReviewStrip` copies set `tabIndex={-1}` on their button.
  The two measuring routines are the same code, so change both together.
- **Strip styling:** `PartnerSlider` sets `--partner-shift` and `--partner-duration`
  (40 px/s). `ReviewStrip` sets `--review-shift` and `--review-duration` (30 px/s). Both set `is-running`, and `ReviewStrip` sets
  `is-paused` while a card is open. `src/styles/site.css` uses all of these, and also pauses the
  review strip on hover and focus.
- **"Read more" in `ReviewStrip`:** cards need `data-id`, because `measure` reads it to
  find clamped texts. The open state is keyed by `copy:id`, so each copy opens on its own.
  Clamped texts are measured on load and after fonts load, not on resize.
- **Stable text during hydration:** format dates, numbers and country names on the
  server and pass them as props, like `ReviewsSection` does for `StripReview` and
  `toSummary` for `dateText`. `CurrentYear` starts from the server's `buildYear` for the
  same reason, and changes it only after load.
- **Reviews:** `ReviewsSection` must keep reading `getReviews(lang)`, never another language's
  file, and must pass `badge` while that file's `isMock` is true, so fictional reviews stay marked. It uses a scale of
  5 for an unmatched platform, and shows a flag only for a two-letter country code.
- **`Stars` is hidden from screen readers:** every use needs a text alternative next to
  it. `ReviewsSection` and `ReviewStrip` use a `.sr-only` element with `t.rated`.
- **Addresses:** `JournalList` and `PostCard` both build
  `/${lang}/journal/${slug}/`. Keep the trailing slash (`trailingSlash: true` in
  `next.config.mjs`).
- **Language links:** `LangSwitch` keeps only the path, so a `?cat=` filter or `#section`
  is dropped when changing language. It passes `scroll={false}`, so the scroll position
  stays.
- **"Voir plus":** `RoomGrid` shows the button only while some room is not `featured`
  (`hasMore`).
- **Icons:** `icon-*` classes come from the Lucide font imported in
  `src/app/[lang]/layout.tsx`, not from a component library. `RoomPicker`, `DatePicker` and the
  `ui` folder use `lucide-react` components instead.
- **`AMENITIES`:** each `key` must exist under `rooms.amenities` in `messages/fr.json`.

## Side Effects

- No storage, cookies or `fetch` calls.
- Browser network: `ReviewStrip` loads flags from `flagcdn.com`. `RatingLogo` loads the
  `logo` URLs from `ratings.ts`, which point to Google's favicon service. Other photos
  use the URLs in `src/content/`, `src/app/[lang]/page.tsx` and
  `src/app/[lang]/a-propos/page.tsx`. `Flag` and `RatingLogo`
  render nothing if their image fails to load.
- Forms: `BookingSection` sends nothing. It prevents submission, opens the `<dialog>`
  with `showModal()`, resets the form and selects the first room again. Missing dates show an error instead. Dropdowns
  and calendars open in a portal on `<body>`. `RoomPicker` and `DatePicker` keep hidden inputs
  named `room` (one per room asked for, so a type can repeat), `arrival` and `departure` (dates as `YYYY-MM-DD`) for a future backend.
- Address: `JournalList` reads `?cat=` from `location.search` and writes it with
  `history.replaceState`.
- Page and scroll: `FadeObserver` adds `in` to elements and watches `document.body` with
  a `MutationObserver`. `RoomGrid` calls `scrollIntoView` when closing. `RoomPhotos` scrolls its own strip
  with `scrollTo` (smooth unless reduced motion). `BackToTop` calls
  `window.scrollTo`, and its smooth scrolling comes from `html { scroll-behavior }` in
  `site.css`, which is off for reduced motion.
- Listeners and timers, all removed on unmount: `scroll` (`BackToTop`), `resize`
  with a 200 ms delay (`PartnerSlider`, `ReviewStrip`), `visibilitychange` and the slide
  interval (`HeroSlider`), and an `IntersectionObserver` (`NavLinks`, `FadeObserver`). The one
  exception is `document.fonts.ready.then(measure)` in `ReviewStrip`, which is not cancelled.
- Outbound links: the Instagram, Tripadvisor, map and platform score links open in a new tab
  (`target="_blank" rel="noopener"`). `SiteFooter` has `tel:` and `mailto:` links.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`. There is no test suite.
