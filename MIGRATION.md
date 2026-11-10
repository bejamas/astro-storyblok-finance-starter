# Migration ledger: bejamas/ui + @data-slot

In-place port of the template's UI to [bejamas/ui](https://ui.bejamas.com) components and
[@data-slot](https://data-slot.com) primitives, following the *Astro source* variant of the
`migrate-react-sites` skill from `bejamas/ui`. The framework (Astro 7), Tailwind v4, Storyblok
integration and content model are unchanged. The goal was pixel parity with `main` at `a8e5d30`.

## How to resume

```bash
# Reference: the untouched baseline, built and served on :4300
git worktree add --detach ../finance-starter-reference a8e5d30
cp .env ../finance-starter-reference/.env
(cd ../finance-starter-reference && bun install --frozen-lockfile && bun run build && npx serve dist -l 4300)

# Port: this branch, built and served on :4321
bun run build && npx serve dist -l 4321

# Compare (scripts live in the skill: bejamas/ui → skills/migrate-react-sites/scripts)
node compare-boxes.mjs http://localhost:4300/ http://localhost:4321/ 1440
npx @bejamas/bench --original http://localhost:4300/ --ported http://localhost:4321/
```

Both sides are static production builds (`STORYBLOK_ENVIRONMENT=development`), so no dev servers
are involved. Serve them with a compressing static server: Lighthouse timings over an
uncompressed one exaggerate every byte of difference.

## Routes

| URL | Blocks | Status |
|---|---|---|
| `/` | hero, partners, banner split, features, stats, reports, testimonials, team, advisers, banner CTA | verified |
| `/report` | reports list | verified |
| `/report/<slug>` (4 stories) | report | verified (`clarity-over-complexity` measured) |
| `/spain-campaign` | hero, banner split, banner CTA | verified |

Verified means: page height and the position, size and computed style of every text run, image
and painted box are identical to the reference at 390, 412, 600, 768, 1024, 1280 and 1440px.

## Work units

| Unit | Now built on | Status |
|---|---|---|
| `components/Button.astro` | `Button` (`as="a"`), Storyblok `primary`/`secondary` → `default`/`secondary` | verified |
| `components/ArrowLink.astro` (new) | `Button` `size="icon"`; replaces three copies of the round arrow link | verified |
| `components/Header.astro` | `HamburgerMenu` + `HamburgerMenuItem` (`@data-slot/collapsible`), `Button` for the glass CTA | verified |
| `components/LanguageSwitcher.astro` | `DropdownMenu` (`@data-slot/dropdown-menu`) | verified |
| `components/Heading.astro` | `Badge` (`as="h2"`) | verified |
| `storyblok/FeaturesSection.astro` | `Card`, `CardHeader`, `CardTitle`, `CardContent` | verified |
| `storyblok/StatsSection.astro` | `Card` | verified |
| `storyblok/AdvisersSection.astro` | `Card`, `Avatar`, `ArrowLink` | verified |
| `storyblok/BannerSplit.astro`, `TestimonialsSection.astro` | `Card` for the white panel | verified |
| `storyblok/TeamSection.astro`, `components/ReportCard.astro` | `ArrowLink` | verified |
| `styles/global.css` | bejamas tokens, `tw-animate-css`, `bejamas/tailwind.css` | verified |
| Hero, BannerCta, PartnersSection, Report, ReportsList, ReportsSection, Footer, Page | unchanged apart from `font-adamina` → `font-heading` | verified |

## Porting conventions

- **Tokens** are bejamas/shadcn-style custom properties in `:root` (`--primary`, `--background`, …)
  mapped through `@theme inline`. The values are the original `@theme` colors. `Layout.astro`
  therefore overrides `--primary` (was `--color-primary`) from the Storyblok `colors` datasource.
- **Light only:** there is no `.dark` block. `@custom-variant dark (&:is(.dark *))` stays so the
  components' `dark:` classes never follow the OS setting.
- **Radius:** Tailwind's default scale, not bejamas' `--radius` multipliers, because the design
  uses `rounded-sm` = 4px, `rounded-lg` = 8px and `rounded-xl` = 12px.
- **Fonts:** the self-hosted Inter and Adamina files, not Astro's fonts API. `--font-sans` is
  Inter, `--font-heading` is Adamina (`font-heading` replaces `font-adamina`).
- **Base rule:** `* { border-border outline-ring/50 }` is scoped to `[data-slot]` so plain
  elements keep `currentColor` borders. `bejamas add` re-inserts the `*` rule: remove it again.
- **Tailwind sources:** `@source not "../../*.md"` keeps class names quoted in the docs (this
  file, the README) out of the generated CSS.
- **Parity resets** live in `src/lib/ui.ts` (`flatCard`, `plainBadge`). `Button` resets are in
  the two wrappers (`Button.astro`, `ArrowLink.astro`). Registry files in `src/components/ui`
  are unmodified, so `bejamas add <name> --overwrite` stays safe.
- **Overrides keep their variant prefix** (`has-[>svg]:px-1.5`, `aria-expanded:bg-transparent`),
  since tailwind-merge only dedupes within one variant.
- **SVGs inside `Button`** carry a `size-*` class, otherwise the component forces them to 16px.
- **Presence transitions** on a primitive's content need `data-[starting-style]:transition-none`
  next to the starting style, or the open transition never plays.

## Behavior

Compared with the skill's `run.mjs` (same script on both builds):

| Interaction | Result |
|---|---|
| Language menu: open, panel position and size, item geometry, close on outside click | identical |
| Mobile menu open: every text run, image and painted box in the header, body scroll lock | identical |
| Mobile menu slide in and out (300ms) | reproduced with the collapsible's presence attributes |

New in the port, from the primitives (checked with `run.mjs` on the port): the language menu
opens with ArrowDown, highlights items with the arrow keys, follows the link on Enter, closes on
Escape and returns focus to the trigger. The mobile menu closes on Escape, releases the scroll
lock, and its trigger reports `aria-expanded`. Not exercised here but documented by the
primitives: Home/End and typeahead in the menu, and closing the mobile menu when a link is
selected.

## Gaps and approximations

- **Interaction states are bejamas defaults**, which the original did not have: buttons darken on
  hover (`hover:bg-primary/90`), scale to 98% while pressed, and show a focus ring. Resting
  states are pixel-identical.
- **The closed mobile menu is `hidden`** instead of translated off-screen, so its links are out
  of the tab order and the accessibility tree until it opens.
- **Markup:** the language menu is `role="menu"` with `menuitem`s instead of `ul > li > a`; the
  header bar is a `div` with one `<nav>` for the desktop links and one inside the mobile panel
  (the original wrapped the whole bar in a single `<nav>`), so the nav links are in the HTML twice.
- **`CardMedia` is not used** for the feature image: its `[&_img]:size-full` makes the image fill
  the card, while the original leaves it at `width="350"` between ~400 and 767px.
- **`AvatarImage` is not used:** it renders a plain `<img>`, so the adviser photo stays an
  `astro:assets` `<Image>` inside `Avatar` to keep the optimized WebP.
- `ease-elastic` and `xlg:text-6xl` were dropped: neither exists in the theme, so they never
  rendered.

## Follow-ups (legacy behavior kept for parity)

- **Primary color breaks when the `colors` datasource is missing.** `Layout.astro` then renders
  `style="--primary: undefined"`, which makes every `bg-primary` transparent (buttons, the primary
  stat card, arrow links, the mobile menu background). This is the case in the local space used
  for verification; the baseline does the same with `--color-primary`. Fix: only set the style
  when the datasource returns a value.
- The header and mobile-menu CTAs link to an empty `href`.
- Arrow links (advisers, team, report cards) have no accessible name; partner logos link to `#`.
- Feature images do not fill their card between ~400 and 767px (see `CardMedia` above).
- The mobile menu CTA is an inline element, so its `mt-8` never applied and it overlaps the line
  above slightly. Kept as rendered.
- `TestimonialsSection` ends with a white-on-light headline and button block that looks like a
  leftover from `BannerCta`.
- `body` stays scroll-locked if the mobile menu is open while the viewport grows past `md`.
- `axios` and `postcss-import` are not imported anywhere.

## e2e baseline

The repository has no test suite, so there is no baseline to compare.

## Deployment checks

- The Netlify preview build (`STORYBLOK_IS_PREVIEW=yes`, server output) was not exercised: the
  Visual Editor bridge and live updates should be checked on a preview deployment.
- `@data-slot/*` scripts are bundled by Astro as hoisted module scripts. Under a strict CSP, check
  that they are allowed.

## Skill feedback

- The *Astro source* variant assumes the styling system changes. Here the source was already on
  Tailwind v4, so phase 1's "two styling systems" setup collapsed to fixing what `bejamas init`
  rewrote: it replaced the fonts with Astro's fonts API (Google Inter), added a second `lang`
  attribute to `<html lang={language}>`, appended neutral tokens that overrode the site's
  `@theme` colors, and replaced the radius scale.
- `compare-boxes.mjs` keys textless elements by landmark index. The port has one more `<nav>`,
  which shifted every index and paired unrelated images. A content-keyed diff (text runs, image
  sources, painted boxes) was used instead.
- 1440/768/390 missed a difference that only exists between ~400 and 767px. `@bejamas/bench`
  caught it at 412px.
- `init` added `shadcn` to `devDependencies`; `bejamas add` works without it, so it was removed.
