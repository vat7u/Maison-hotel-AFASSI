# shadcn components

## Overview

The shadcn/ui components behind the booking form, added with `npx shadcn@latest add` and
configured by `nextjs/components.json` (`radix-nova` style, `rtl: true`). The rest of the site
does not use them. `RoomPicker`, `DatePicker` and `BookingSection` in the parent folder are the
only importers; nothing in `src/app` imports from here.

## Interface

- `button.tsx`: `Button`, `buttonVariants`.
- `calendar.tsx`: `Calendar`, `CalendarDayButton`.
- `checkbox.tsx`: `Checkbox`.
- `field.tsx`: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`,
  `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldContent`, `FieldTitle`.
- `input.tsx`: `Input`.
- `label.tsx`: `Label`, used only by `field.tsx`.
- `popover.tsx`: `Popover`, `PopoverAnchor`, `PopoverContent`, `PopoverDescription`,
  `PopoverHeader`, `PopoverTitle`, `PopoverTrigger`.
- `select.tsx`: `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`,
  `SelectScrollDownButton`, `SelectScrollUpButton`, `SelectSeparator`, `SelectTrigger`,
  `SelectValue`.
- `separator.tsx`: `Separator`, used only by `field.tsx`.
- `textarea.tsx`: `Textarea`.

## Invariants

- The rules for Tailwind and shadcn in `nextjs/README.md` apply here. After each
  `npx shadcn@latest add`, check what it changed in `src/styles/tailwind.css` and remove `^` from
  what it added to `package.json`.
- Every component sets `data-slot`. Preflight is left out, so the `[data-slot]` reset in
  `src/styles/tailwind.css` is the only reset these elements get.
- Styles here depend on `data-slot` values and group names in other files (`select-value`,
  `popover-content`, and those in `field.tsx`, which `checkbox.tsx` reads through its `group-has`
  classes). Renaming one breaks those styles without an error. `FieldTitle` shares
  `field-label` with `FieldLabel`.
- `data-open`, `data-closed`, `data-checked` and the like come from the `shadcn/tailwind.css`
  import in `src/styles/tailwind.css`.
- Colours and radii here are shadcn utilities, mapped to the design-system tokens in
  `src/styles/tailwind.css`. Change the tokens, not these files. `dark:` classes stay inert because
  the site has no `.dark` class.
- `rtl: true` in `components.json` is why these files use logical utilities (`ps-`, `pe-`, `ms-`,
  `start-`, `end-`) and `rtl:` variants. They remain because the files are generated: the site has
  no right-to-left language (Arabic was removed).
- `Calendar`: the caller's `classNames` and `components` replace the defaults, they do not merge.
  Replacing `Root` loses `data-slot="calendar"`.
- Without a `locale` prop, `Calendar` formats with the runtime default. `DatePicker` passes the page language's calendar (`fr`, `enGB`, `es` or `de`).
- `Button` with `asChild` renders `Slot.Root`, which needs a single child.
- `FieldError` renders nothing without `children` or `errors`, and `children` take priority.
- All these files import `cn` from the `cn` package, not from `@/lib/utils`.
- Icons are `lucide-react` components, not the `icon-*` classes used elsewhere on the site.

## Side Effects

- `PopoverContent` and `SelectContent` render through a Radix portal, outside the parent tree.
- `CalendarDayButton` moves focus to the day that `react-day-picker` marks as focused.
- `FieldError` has `role="alert"`, so screen readers announce it.
- No storage, network calls, timers or page-wide listeners are written in these files. Radix and
  `react-day-picker` were not inspected.

## Verification

- Run from `nextjs/`: `npm run typecheck && npm run build`. There is no test suite.
