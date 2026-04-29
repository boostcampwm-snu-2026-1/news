# Design Notes

## Purpose

- This file is the current design source of truth for the news-stand UI.
- Keep product flow, visual tokens, component behavior, accessibility notes, and implementation-facing design details here.
- If implementation decisions intentionally diverge from this file, update this file in the same change.

## Styling Approach

- Tailwind should be the primary styling tool for layout, spacing, borders, state variants, responsive behavior, and motion utilities.
- Keep design tokens in one global stylesheet, then reference them through Tailwind utilities, CSS variables, or small component-level style objects.
- Prefer Tailwind utility composition over large bespoke CSS files, but do not force dynamic press-wordmark styling into generated class names. Data-driven color, tracking, underline, and per-character accents can use CSS variables or inline styles.

## Product Shape

- Desktop-first Korean news portal.
- Users browse a press-outlet grid, subscribe or unsubscribe, and open a per-press article list.
- The main screen keeps a persistent header, date, auto-rolling news ticker, tab/view controls, and content area.
- The content area switches between a 6x4 press grid and an opened-press article view.
- The opened-press view auto-advances through press items by category using a 6-second progress tab.

## Design Principles

- Clarity over decoration: no glow, decorative gradients, or heavy effects for the main shell.
- Hairline separation: `#D2DAE0` 1px borders do most visual separation.
- Typography is the brand: press logos are rendered as styled wordmarks, not image assets.
- Use one accent color sparingly: `#7890E7` is reserved for the subscribed-count badge and active field tab.
- Use `#4362D0` only as the progress fill inside the active field tab.
- The interface should feel dense and calm: 16px body text, 12px meta text, tight line height, and measured whitespace.

## Color Tokens

These values should be available as CSS custom properties and, where useful, Tailwind theme tokens.

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#14212B` | Body text, bold labels, dark strokes |
| `ink-alt` | `#14202B` | Same role as `ink`; use interchangeably only when matching spec |
| `sub` | `#5F6E76` | Secondary text, dates, captions, subscribed label |
| `mute` | `#879298` | Inactive tab labels, inactive icons, empty chevrons |
| `line` | `#D2DAE0` | Dividers, card borders, grid strokes |
| `soft` | `#F5F7F9` | Ticker background, active hover surfaces, field-tab background |
| `soft-alt` | `#F7F7FC` | Reserved secondary surface |
| `card` | `#FFFFFF` | Grid cells, opened-press body, subscribe pill |
| `page` | `#FEFEFE` | Page background |
| `accent` | `#7890E7` | Subscription badge, active field-tab fill |
| `accent-deep` | `#4362D0` | Active progress fill |
| `badge-ink` | `rgba(255,255,255,0.7)` | Text on accent surfaces |
| `danger` | `#FFD1CF` | Reserved destructive state, unused in the first-pass UI |

## Typography

- Primary family: `Pretendard Variable`, `Pretendard`, fallback to `Noto Sans KR` and system sans.
- Numeric family: `IBM Plex Mono` for tab counters such as `1 / 81`.
- Serif accent: `Noto Serif KR` for serif press wordmarks such as Korea JoongAng Daily, Insight, Forbes-like marks.
- Korean letter spacing: body `-0.01em`, display `-0.02em`.
- Latin letter spacing: `0` by default; press wordmark tracking may override, for example `0.08em`.

| Token | Size / Weight / Leading | Use |
| --- | --- | --- |
| `display` | `24 / 700 / 100%` | `뉴스스탠드` header wordmark |
| `heading` | `16 / 700 / 100%` | Active tab label, article headline |
| `body` | `16 / 500 / 22px` | Inactive tab label, date, subscribed label |
| `list-item` | `14 / 500 / 1.5` | Article list rows |
| `caption` | `12 / 500 / 1` | Edit time, footnote, subscribe pill |
| `badge` | `12 / 500 / 1` | Count badge and subscribe pill |
| `mono-tab` | `12 / 500 / 1` | Field tab counter |
| `mono-label` | `10 / 500 / 1` | Page label or watermark if used |

## Layout

- Base spacing unit: `8px`.
- Tailwind's default spacing scale maps well to this base unit for most values. Use custom tokens or arbitrary values only for design-specific measurements such as `930px`, `388px`, `175px`, `49px`, and chevron positions.
- Design canvas: `1280 x 720`.
- Content column width: `930px`.
- Left and right gutters: `175px`.
- Header: top `58px`, height `29px`.
- Ticker: top `127px`, height `49px`.
- Tab bar: top `208px`, height `24px`.
- Content area: top `256px`, size `930 x 388`.
- Chevrons: top `430px`, left `103px`, right `1153px`, outside the content column.
- Below 1280px, scale or reflow the layout; do not force horizontal overflow.

## Radius, Stroke, Shadow

- `r-0`: `0`, used by grid cells, ticker cards, and opened-press frame.
- `r-sub`: `2px`, used by small press-logo backgrounds.
- `r-pill`: `14px`, used by subscribe/unsubscribe pill.
- `r-badge`: `10px`, used by the 20x20 subscribed-count badge.
- Strokes are always `1px solid #D2DAE0`.
- Do not introduce additional border thicknesses or border colors unless explicitly requested.
- Shadow is effectively absent. The only allowed shadow is the subscribe pill: `0 1px 2px rgba(20,33,43,0.04)`.
- In Tailwind, prefer semantic token-backed classes or CSS variables for these values rather than scattering raw hex values across components.

## Components

### Header

- Left cluster: 24x24 newspaper icon with `ink` stroke plus `뉴스스탠드` display wordmark.
- Right cluster: today's date in `YYYY. MM. DD. 요일` form, body style, `sub` color.
- Use flex `space-between`, height `29px`.

### Auto-Rolling News Ticker

- Height `49px`, background `soft`, horizontal padding `24px`.
- Two equal lanes side by side with `8px` gap.
- Each lane uses a press name at fixed `56px` width, `14/700 ink`, and a title at `14/500 ink` with ellipsis.
- Rotate to the next item every `3.2s`.
- Crossfade duration is `0.55s` with `cubic-bezier(.4,0,.2,1)`.
- Offset the two lanes so they do not rotate in sync.
- Pause on hover/focus and disable rotation under `prefers-reduced-motion`.

### Tab Bar And View Toggle

- Row height `24px`, left cluster for scope tabs, right cluster for list/grid icons.
- Scope tabs: `전체 언론사`, `내가 구독한 언론사`.
- Active label: `16/700 ink`.
- Inactive label: `16/500 mute`.
- Subscribed badge: `20 x 20`, `r-badge`, `accent` background, `12/500 badge-ink`.
- View icons: `24 x 24`; active uses `ink`, inactive uses `mute`.

### Press Grid

- Size `930 x 388`, background `line`, border `1px line`.
- CSS grid: 6 columns, 4 rows, `1px` gap. The gap creates divider lines.
- Each cell is white, centered, approximately `154 x 96`.
- Cell hover/focus background: `soft`.
- In all-publishers mode, hover/focus replaces the wordmark with a `+ 구독하기` pill.
- In subscribed mode, hover/focus replaces the wordmark with a `- 해지하기` pill.

### Press Wordmark

Press logos are data-driven typographic artifacts. A press object may define:

- `name`: displayed string.
- `color`: text color.
- `bg`: optional filled chip background.
- `weight`: `400 | 500 | 700`.
- `family`: `sans | serif`.
- `italic`: boolean.
- `underline`: boolean.
- `tracking`: CSS letter spacing, for example `0.08em`.
- `accent`: per-character accent color.
- `accentChar`: index of the character that receives `accent`.
- `accentUnder`: indices underlined in the accent color.
- `accentBg`: whether the accent character gets a filled chip.
- `flag`: append a tiny red flag glyph.
- `latin`: disables Korean tracking.
- `small`: uses 14px instead of 16px for long Latin names.

Render wordmarks with `inline-flex`, wrapping enabled, centered alignment, `max-width: 88%`, `word-break: keep-all`, and `line-height: 1.15`.

### Subscribe Pill

- Height `28px`, padding `0 12px`, `r-pill`.
- Background `card`, border `1px line`.
- Text `12/500 sub`.
- Leading icon `10 x 10`, plus for subscribe or minus for unsubscribe, `sub` stroke `1.3`.
- Shadow: `0 1px 2px rgba(20,33,43,0.04)`.

### Chevrons

- Size `24 x 40`.
- Outlined right/left chevron glyph.
- Stroke `mute`, width `1.4`.
- Position outside content column.
- Disabled state uses `opacity: 0` to keep layout stable while removing the visual.

### Pagination Dots

- Legacy system component; not required in every view.
- Active dot: `20 x 8` pill, `ink` background.
- Inactive dot: `8 x 8`, `line` background.
- Trailing counter: `12/500 mute`, IBM Plex Mono, tabular numbers.

### Field Tabs

- Used above the opened-press article body.
- Six horizontal tabs.
- Height `40px`, background `soft`, border `1px line`.
- Each tab is `flex: 1`, padding `0 16px`, with `1px line` separator between tabs.
- Inactive: `14/500 sub`.
- Active: full `accent` fill, label `14/700 #FFFFFF`.
- Active progress overlay: `accent-deep`, fills from `0%` to `100%` over `6s linear`.
- Counter: mono `12/500`, primary number plus lower-opacity total, e.g. `1/81`.

### Opened Press Layout

- Size `930 x 388`, `card` background, `1px line` border.
- No top border because the field tab owns the top edge.
- Inner padding `24px 32px`.
- Head row: flex, gap `16px`, align center.
- Head row includes scaled press wordmark, edit time `12/500 sub`, and subscribe pill.
- Body: flex, gap `24px`, margin top `4px`.
- Left column: `340px`.
- Headline image placeholder: about `340 x 188`, `1px line` border, centered placeholder text, gradient `#EFF1F6` to `#DDE3EC`.
- Headline: `16/700 ink`, line height `1.45`.
- Right column: flexible list with 6 article rows.
- List item: `14/500 ink`, line height `1.5`, leading `3 x 3` square in `ink`.
- Footnote: auto margin top, `12/500 mute`, text equivalent to `{press} 언론사에서 직접 편집한 뉴스입니다.`

## States And Flows

- All-publishers grid: 6x4 paged grid of press outlets.
- Subscribed grid: same grid structure, filtered to subscribed outlets. Empty slots can remain visually white if preserving page structure.
- Treat page counts as data-driven. Historical sample values varied, so compute totals from actual publisher data and page size.
- Chevrons scope to the current tab and current filtered collection.
- Clicking a press cell opens the opened-press view.
- Opened view defaults to the selected press's primary category.
- Opened-view progress starts at 0. At 100%, increment `currentInTab`; if it exceeds the tab count, move to the next category and reset to 1.
- The ticker is always present in both grid and opened-press states.

## Accessibility Notes

- Scope tabs should use `role="tablist"` and tabs should use `role="tab"` with `aria-selected`.
- Chevrons must be `<button>` elements with clear `aria-label`, for example `이전 페이지`, `다음 페이지`.
- The subscription-count badge needs an `aria-label`, for example `구독한 언론사 9개`.
- Hover-only subscription controls must also appear with `:focus-within`.
- The ticker must pause on hover and focus.
- Respect `prefers-reduced-motion` by disabling ticker rotation and automatic progress animation.
- All text colors in the spec are intended to meet WCAG AA on their assigned surfaces.

## Suggested React State

```ts
type NewsstandState = {
  tab: 'all' | 'sub';
  page: number;
  opened: string | null;
  tabKey: string;
  progress: number;
  currentInTab: number;
  subscribed: Set<string>;
};
```

Keep state at a `Newsstand` or `App` level and pass display data into components. Avoid duplicating derived values such as page count, visible publishers, and subscribed count.

## Styling Rules For Tailwind

- Use utility classes for stable structural styling: grid layout, flex layout, dimensions, padding, borders, focus states, and responsive breakpoints.
- Use CSS variables for project tokens, for example `--color-ink`, `--color-line`, `--color-accent`, and `--duration-progress`.
- Avoid dynamic Tailwind class strings such as `text-${color}` because Tailwind may not generate them. Use CSS variables or inline style for data-driven values.
- Keep hover/focus parity in classes, for example by pairing `group-hover` with `group-focus-within`.
- Keep reduced-motion variants close to the animated elements.
