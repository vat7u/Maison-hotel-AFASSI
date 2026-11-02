# Language root and home page

## Overview

`[lang]` is the root of the real site, one copy per language in `LOCALES` (`/fr/`,
`/en/`, `/es/`, `/de/`). `layout.tsx` is a root layout: it owns `<html>`, the
stylesheets, the header and the footer. `page.tsx` is the home page.

## Interface

- `layout.tsx`:
  - `dynamicParams = false`.
  - `generateStaticParams()` returns one `{ lang }` per entry in `LOCALES`.
  - `LangLayout` (default export) calls `notFound()` unless `isLocale(lang)`. It sets
    `<html lang>` to `lang`, adds `fontVariables`
    as the `<html>` class, and renders `SiteHeader`, the page, `SiteFooter`, `BackToTop`
    (its label is `nav.backToTop`) and `FadeObserver`.
  - `NO_SCRIPT_FADE` (local) is the `<noscript>` CSS.
- `page.tsx`:
  - `generateMetadata({ params })` calls `pageMetadata` with the path `/`,
    `meta.homeTitle`, `meta.homeDescription` and `HERO_IMAGES[0].src`.
  - `HomePage` (default export) renders the sections in this order: `Announcement`,
    `HeroSlider`, story, partners, `RoomsSection`, `ReviewsSection`, `BookingSection`,
    journal teaser (the first 3 of `getPosts(lang)`), gallery.
  - `HERO_IMAGES`, `STORY_BACKGROUND`, `STORY_PHOTOS`, `GALLERY` (local) are the photo
    sources for those sections. The story uses three gallery photos: a background and two
    framed photos that overlap at a corner (`.story-frame` in `site.css`).
- [`journal`](./journal/CLAUDE.md): the journal list and articles.
- [`a-propos`](./a-propos/CLAUDE.md): the about page.

## Invariants

- `<html lang>` is the route's language, and every language is left to right. The text of
  a language is complete, so there is no French fallback. Journal post text is the exception:
  it is French and carries its own `lang="fr"`.
- Stylesheet order is `lucide-static/font/lucide.css`, `@/styles/ds/*.css`,
  `@/styles/fonts.css`, `@/styles/tailwind.css`, `@/styles/site.css`. All stylesheets are
  imported here and nowhere else in `src`.
- `fontVariables` must stay on `<html>`: `src/styles/fonts.css` and the `.reviews` rule
  in `site.css` read the `--nf-*` variables it defines.
- `NO_SCRIPT_FADE` must stay in step with `site.css` and `RoomGrid`. It undoes the
  hidden start of `.fade`, shows `.room[hidden]` and hides `.rooms-more`, so pages stay
  readable without JavaScript.
- `<html data-scroll-behavior="smooth">` goes with `html { scroll-behavior: smooth }` in
  `site.css`. The attribute tells Next.js the page uses smooth scrolling, so it can
  switch it off briefly during route changes; keep the two together.
- The "Tout le journal" link in `page.tsx` is a plain `<a>`, not `SiteLink`, so it reloads
  the page. Other links between pages use `SiteLink`.
- `FadeObserver` must stay in this layout. `.fade` content is hidden until it runs, on
  every page, except under reduced motion, where `site.css` keeps it visible.
- `page.tsx` types `lang` as `Locale` and does no check of its own: it relies on the
  guard and `dynamicParams` in `layout.tsx`.
- `HERO_IMAGES` (5 photos) and `m.hero.slides` match by index, as do `GALLERY` (21 photos) and
  `m.gallery.alts`, in every language. `GALLERY` must stay a multiple of 7, or `GallerySlider`
  fails the build; in each set of 7 the 4th photo fills the tall middle space.
  Adding a photo without its text in `fr.json` leaves it with no `alt`.
- `RoomsSection` and `BookingSection` must stay inside `BookingProvider`: `useBooking`
  throws otherwise. `getRooms(lang)` must return at least one room, because `rooms[0].id`
  is the form's default.
- Anchors: `page.tsx` defines `#journal`, which nothing in `src` links to. The welcome section
  has no anchor: `NavLinks` and `SiteFooter` link to `a-propos/` instead. The other home anchors
  live in components (`#accueil` in `HeroSlider`, `#chambres` in `RoomsSection`, `#avis` in
  `ReviewsSection`, `#reserver` in `BookingSection`). Renaming one means updating its links, and
  `SECTIONS` in `NavLinks`. `#contact` is in `SiteFooter`, on every page.

## Side Effects

- Browser network: the first four hero photos and the first 18 gallery photos are local
  (`public/images/hero/`, `public/images/gallery/`). So do the story photos (gallery files). The last
  hero photo and the last three gallery photos load from `images.unsplash.com`.
- Build time: the `lucide-static` icon font is bundled with the site, so no icon font is
  requested from another host.
- The gallery link opens `INSTAGRAM_URL` in a new tab.
- The other sections' network and DOM effects are in their components.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`.
