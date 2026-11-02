# scripts

## Overview

Node scripts for the build, run from `nextjs/` by `package.json`. `check-i18n.mjs` runs before
`next build` and checks the language files. After the build, `escape-css.mjs` makes the CSS safe
on any host and `check-output.mjs` checks the language setup of the built pages. A failing check
exits with an error, which fails `npm run build`.

## Interface

- `check-i18n.mjs`: no exports. `prebuild` runs it before `next build`, and `npm run check:i18n`
  runs it alone. It reads every `src/messages/*.json` and compares each with `fr.json`: the same
  key tree, the same array lengths, the same `{placeholders}`, no empty text, no Arabic
  characters (U+0600 to U+06FF, U+0750 to U+077F, U+FB50 to U+FDFF, U+FE70 to U+FEFF),
  `{rooms}` exactly once in `booking.dialogOne` and `booking.dialogMany`, and the `meta` titles
  within 65 characters and descriptions within 160. It prints the language and key of each
  problem.
- `escape-css.mjs`: no exports. `postbuild` runs it first. The minifier turns the icon font's
  `\e04e` escapes into raw characters and the CSS declares no encoding, so a host that sends
  plain `text/css` could garble the icons. The script writes those characters back as escapes.
  - `cssFiles(dir)` (local) lists the `.css` files under `dir`, recursively.
- `check-output.mjs`: no exports. `postbuild` runs it after `escape-css.mjs`. It reads
  `out/<lang>/**/index.html` for `fr`, `en`, `es` and `de` with string and regular-expression
  checks, and fails if: a language folder is missing or `out/ar` exists; `<html lang>` differs from
  the folder; the canonical is not the page's own address (journal pages: the `/fr/` address);
  `hreflang` for the four languages and `x-default` is missing (journal pages: any `hreflang`
  is present); a visible `{placeholder}` is left in the text; a title or description is the same in
  two languages, or the same on the home and About pages. Journal articles are left out of the
  last check, because their text is French.

## Invariants

- All three read relative paths (`src/messages`, `out/`), so they must run from `nextjs/`.
  `escape-css.mjs` and `check-output.mjs` need a finished `next build`; otherwise `readdirSync`
  throws or the script reports that `out/` is missing.
- Each non-ASCII character in the CSS becomes a backslash, its hex code point and a space. The
  space ends the escape, so keep it.
- `check-output.mjs` must run after `escape-css.mjs`, as `postbuild` orders them.
- `check-i18n.mjs` does not replace the type check: TypeScript already rejects a missing or extra
  key. The script covers what types cannot (list lengths, placeholders, text rules).
- The script's `LANGS` list (`check-output.mjs`) and the files in `src/messages/` must follow
  `LOCALES` in `src/i18n/config.ts`.
- Publish only output from `npm run build`. `npx next build` skips all three scripts.

## Side Effects

- `check-i18n.mjs` and `check-output.mjs` only read files and print.
- `escape-css.mjs` rewrites every `.css` file under `out/_next/static` in place, whether or not
  it changed, and logs how many characters it escaped.

## Verification

- Run from `nextjs/`: `npm run build`. The log shows `check-i18n: ... match fr.json`, then
  `escape-css: <n> characters escaped`, then `check-output: ... pages in out/ are consistent`.
