# About page route

## Overview

`/[lang]/a-propos/` shows the owner's story in three sections, surrounded by photos, and
ends with links to the booking form and the rooms. The page is a server component. Each
language shows its own text from `messages/<lang>.json`.

## Interface

- `page.tsx`:
  - `generateMetadata({ params })` calls `pageMetadata` with the path `/a-propos/`,
    `meta.aboutTitle`, `meta.aboutDescription` and the first top photo.
  - `AboutPage` (default export) renders the hero, top photos, section 1, the collage,
    `about.note`, section 2, the bottom photos, section 3 and the closing links.
  - `StorySection` (local) renders one entry of `about.sections`. The page expects 3 entries:
    with fewer, `StorySection` reads `undefined` and the build fails.
  - `TOP_PHOTOS`, `COLLAGE_PHOTOS`, `BOTTOM_PHOTOS` (local) are the photo URLs. The top and
    bottom bands are the guesthouse's own gallery photos (`gallery(n)` gives
    `/images/gallery/NN.webp`); the collage is Unsplash.
  - `withAlts` (local) pairs each URL with its description by position.

## Invariants

- The story comes from `AboutUsStory.txt` at the repository root, word for word except that
  "parking privé" is "garage fermé", as the owner confirmed. This covers the paragraphs and
  `about.closing`. The headings drop the file's numbering and title, and `about.direct` is not
  from that file. New claims follow the rule under "Confirmed facts" in `nextjs/README.md`.
- The top and bottom bands show the guesthouse itself; their descriptions are the gallery's
  (`gallery.alts` at the same number), copied into `about.topAlts` and `about.bottomAlts`.
- The collage photos are stand-ins. They must not show a pool, terrace, rooftop, view from a
  building, courtyard, interior, food or business name, because they are not of the guesthouse.
  `about.note` sits under the collage to mark them. Descriptions say what the photo shows, never
  "notre maison". When real photos replace the collage, change its descriptions and remove
  `about.note` too.
- `about.topAlts`, `about.collageAlts` and `about.bottomAlts` must have the same length as their
  photo constants: 3, 7 and 3. A missing one gives a photo with no `alt`, and typecheck does not
  catch it.
- `.photo-collage` in `site.css` places exactly 7 photos.
- Booking is reached by link only. This page has no `BookingProvider`, so it must not use
  `RoomBookLink` or `useBooking`.
- This page has no `generateStaticParams`. Its language params come from `../layout.tsx`.

## Side Effects

- Browser network: the 6 band photos are files of the site (`public/images/gallery/`); the 7
  collage photos load from `images.unsplash.com`.
- None at request time: the route is written to `out/` during the build.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`.
