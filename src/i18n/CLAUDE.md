# i18n

## Overview

The language layer of the Next.js site. `config.ts` lists the four languages (French, English,
Spanish, German) and the facts the code needs about each. `messages.ts` loads the interface text
from `src/messages/*.json`. `fill.ts` and `format.ts` hold the two small text helpers.
The language itself always comes from the `[lang]` route segment; this folder stores nothing.

## Interface

`config.ts`:

- `LOCALES` — `['fr', 'en', 'es', 'de']`. `generateStaticParams` builds one route per entry
  (`src/app/[lang]/layout.tsx`, `src/app/[lang]/journal/[slug]/page.tsx`), `LangSwitch` renders
  one language link per entry, and `pageMetadata` lists every entry in `hreflang`.
- `Locale` — union type of the `LOCALES` values.
- `LOCALE_INFO: Record<Locale, { intl, label, name, og }>` — `intl` is the locale tag for `Intl`
  and date formatting (`fr-FR`, `en-GB`, `es-ES`, `de-DE`), `label` is the button text in
  `LangSwitch`, `name` is the language's own name (the link's `aria-label`) and `og` is the
  Open Graph locale (`fr_FR`, `en_GB`, `es_ES`, `de_DE`).
- `isLocale(value)` — type guard for an arbitrary string. The layout calls `notFound()` when it
  fails.

`messages.ts`:

- `Messages` — type of `src/messages/fr.json`.
- `getMessages(lang)` — the file for `lang`. There is no merge and no fallback.

`fill.ts`:

- `fill(template, values)` — replaces each `{key}` with `values[key]`. A key missing from
  `values` becomes an empty string. The file imports no message file.

`format.ts`:

- `joinList(items, lang)` — joins names with `Intl.ListFormat` for `LOCALE_INFO[lang].intl`
  ("A, B et C", "A, B and C", "A, B und C").

## Invariants

- `fr.json` sets the shape of `Messages`. `messages` is a `Record<Locale, Messages>`, so a key
  missing from `en.json`, `es.json` or `de.json`, or an extra one, fails `npm run typecheck`.
  Array lengths and `{placeholders}` are not types: `scripts/check-i18n.mjs` checks them.
- Adding a value to `LOCALES` also requires an entry in `LOCALE_INFO`, an import and entry in
  `messages.ts`, a `text` entry for every room in `content/rooms.ts`, a reviews file in
  `content/reviews/`, and an entry in `CALENDARS` in `components/DatePicker.tsx`. Each is a
  `Record<Locale, ...>`, so typecheck reports a missing one. There is no release switch: a
  language in `LOCALES` is live, with its own `<html lang>`, `hreflang` and canonical address.
- `booking.dialogOne` and `booking.dialogMany` each hold `{rooms}` once. `BookingSection` splits
  the sentence there and puts the room list in bold. In German the room names are neuter
  "-zimmer" nouns, because the sentence puts "das" or "die" before them.
- Placeholder names in message strings must match what the caller passes to `fill` (`{n}`,
  `{score}`, `{scale}`, `{name}`); a mismatch produces blank text and no error.
- The address is the only source of language. Do not read it from storage, cookies or the
  browser here.
- Importing a value from `messages.ts` into a client component ships all four message files to
  the browser. Client components that only need text take it as props and use `import type`.
  `fill.ts` and `format.ts` import no message file for this reason.
- `rooms.ts` and the journal posts are outside this folder: posts exist in French only.

## Side Effects

- None. The files are pure: the JSON files are bundled at build time, and there is no network,
  storage or `document` access.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`. The build runs `check-i18n` first.
  There is no test suite.
