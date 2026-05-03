# Technical Specification for Newsstand Portal

## 1. Design Principles
* **Clarity over Decoration**: No gradients or glows; visual separation is achieved through 1px hairline borders (#D2DAE0). [cite: 594]
* **Type as the Brand**: Press logos are typographic artifacts (styled wordmarks) rather than images, using specific weights, italics, and colors. [cite: 594]
* **One Accent Color**: #7890E7 (Indigo) is reserved exclusively for the subscribed-count badge and the active progress tab. [cite: 594, 596]
* **Dense and Calm**: High information density is balanced with specific whitespace, using tight line-heights (1.15–1.5). [cite: 594]

## 2. Visual Foundation & Tokens

### 2.1 Color Tokens [cite: 596]
* **ink / ink-alt**: #14212B / #14202B (Body text, bold labels, dark grid strokes).
* **sub**: #5F6E76 (Secondary text: dates, captions, subscribed line).
* **mute**: #879298 (Inactive tab labels, empty chevrons).
* **line**: #D2DAE0 (1px dividers, card borders, grid strokes).
* **soft / soft-alt**: #F5F7F9 / #F7F7FC (Ticker background, field-tab background).
* **accent**: #7890E7 (Grid cells, active tab fill, subscribe pill).
* **accent-deep**: #4362D0 (Progress fill inside active tabs).

### 2.2 Typography [cite: 604-607]
* **Primary Family**: Pretendard / Pretendard Variable.
* **Numeric Family**: IBM Plex Mono (for tab counters like 1/81).
* **Serif Accent**: Noto Serif KR (for serif-specific press wordmarks).
* **Key Tokens**:
    * **Display**: 24/700/100% (Header wordmark).
    * **Heading**: 16/700/100% (Active tab labels, article headlines).
    * **Body**: 16/500/22px (Inactive tabs, dates, labels).
    * **Caption/Badge**: 12/500/1 (Meta-data, subscribe pills, count badges).

### 2.3 Spacing & Layout [cite: 611-614]
* **Base Unit**: 8px (All spacing uses multiples: 4, 8, 12, 16, 24, 32, 40, 48, 64).
* **Canvas Layout**: 1280 x 720 total size.
* **Content Column**: 930px centered width (Left/Right gutters: 175px).

## 3. Component Specifications

### 3.1 Header & Ticker [cite: 621-634]
* **Header**: Height 29px. Newspaper icon (24 x 24) + "뉴스스탠드" (Display 24/700) on left; Today's date on right.
* **Auto-rolling Ticker**: Height 49px, background #F5F7F9. Two lanes rotate every 3.2s with a 0.55s crossfade (cubic-bezier(.4, 0, .2, 1)).

### 3.2 Grid View (전체 언론사) [cite: 650-656, 670, 671]
* **Structure**: 930 x 388 container, background/border #D2DAE0. 6 columns x 4 rows with 1px gaps.
* **Cell Interaction**: Hovering reveals a Subscribe/Unsubscribe pill (28px height, r-pill, white bg) and an optional hand cursor glyph.
* **Pagination**: Outlined chevrons (24 x 40) located outside the content column.

### 3.3 Press Wordmark (Styled Type) [cite: 658-664]
* **Properties**: name, color, bg, weight, family, italic, underline, tracking, accent, flag (tiny red glyph), latin (disables tracking), and small (14px).
* **Rendering**: Inline-flex, max-width 88%, word-break: keep-all. Long names wrap to two lines.

### 3.4 List View (Opened Press) [cite: 679-705]
* **Field Tab**: Height 40px, background #F5F7F9. Active tabs feature a progress overlay (#4362D0) that fills linearly over 6s.
* **Content Layout**: Left column (340px) for headline image and text; Right column for 6 list items (14/500, 1.5 line-height).

## 4. State & Logic [cite: 706-719]

### 4.1 Grid States
* **전체 언론사**: Default 6 x 4 grid (3 pages total).
* **내가 구독한 언론사**: Sparse grid showing only subscribed cells; empty cells are white.

### 4.2 Automation Logic
* **Ticker**: Pause rotation on hover or focus.
* **List View Progress**: Linear fill over 6,000ms. On completion, advance to the next item or category. If exhausted, loop back to the first item.

## 5. Accessibility Notes [cite: 721-725]
* **Roles**: Use role="tablist" for the tab bar and role="tab" for individual tabs.
* **Controls**: Chevrons must be <button> elements with aria-label.
* **Motion**: Respect prefers-reduced-motion by disabling or simplifying animations.