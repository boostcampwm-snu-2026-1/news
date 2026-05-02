# Development Checklist

Use this as the first-pass implementation order. The current priority is to make the publisher grid usable before building ticker and opened-press article flows. Mark items complete only after the behavior is implemented and checked in the running UI when possible.

- [x] Define Tailwind/CSS design tokens from `docs/design-notes.md`: colors, type scale, spacing, radii, borders, and motion durations.
- [x] Define TypeScript types for publishers, articles, ticker items, categories, wordmark styling, and newsstand state.
- [x] Prepare publisher-first mock data: at least 48 publishers, categories, wordmark styling, and initial subscriptions.
- [x] Create the base newsstand page shell that centers the 930px content column and reserves space for future header/ticker areas.
- [x] Implement scope tabs for `전체 언론사` and `내가 구독한 언론사`, including the computed subscription-count badge.
- [x] Implement the list/grid view toggle icons and active/inactive visual states.
- [x] Implement `PressWordmark` as a data-driven typographic logo component using static Tailwind utilities for layout and CSS variables or inline styles for data-driven color/tracking/accent details.
- [ ] Implement the 6x4 publisher grid shell with 1px divider gaps, responsive fallback, and page-size constants.
- [ ] Render publisher mock data in the grid with stable cell sizing and centered wordmarks.
- [ ] Implement grid pagination chevrons with computed page counts, disabled state, and accessible labels.
- [ ] Implement subscription state management keyed by publisher ID.
- [ ] Implement grid hover/focus behavior that shows `+ 구독하기` or `- 해지하기` pills without breaking keyboard access.
- [ ] Implement subscribed-only mode that filters to subscribed publishers and keeps pagination consistent.
- [ ] Add focus management for tab switches, pagination, and subscription removal from subscribed mode.
- [ ] Implement the header with newspaper icon, `뉴스스탠드` title, and formatted date.
- [ ] Implement the two-lane auto-rolling ticker with pause on hover/focus and reduced-motion handling.
- [ ] Implement press-cell click behavior that opens the selected publisher's article list view.
- [ ] Implement opened-press layout with category field tabs, edit time, subscribe pill, headline block, article list, and footnote.
- [ ] Implement the 6-second field-tab progress bar and automatic advancement across publishers/categories.
- [ ] Implement smooth transitions for ticker changes, grid/list switching, hover pills, and progress changes while respecting `prefers-reduced-motion`.

## Verification

- [ ] Verify responsive behavior below the 1280px design canvas without horizontal overflow.
- [ ] Add unit tests or lightweight behavior tests when a test runner exists: subscription toggling, filtering, pagination, and timer cleanup.
- [ ] Run `npm run build`, `npm run lint` if available, and any available tests.
- [ ] Update docs if implementation decisions intentionally differ from `docs/design-notes.md`.
