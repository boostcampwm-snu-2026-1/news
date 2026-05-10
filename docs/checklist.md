# Development Checklist

Use this as the first-pass implementation order. The current priority is to make the publisher grid usable before building ticker and opened-press article flows. Mark items complete only after the behavior is implemented and checked in the running UI when possible.

- [x] Define Tailwind/CSS design tokens from `docs/design-notes.md`: colors, type scale, spacing, radii, borders, and motion durations.
- [x] Define TypeScript types for publishers, articles, ticker items, categories, wordmark styling, and newsstand state.
- [x] Prepare publisher-first mock data: at least 48 publishers, categories, wordmark styling, and initial subscriptions.
- [x] Create the base newsstand page shell that centers the 930px content column and reserves space for future header/ticker areas.
- [x] Implement scope tabs for `전체 언론사` and `내가 구독한 언론사`, including the computed subscription-count badge.
- [x] Implement the list/grid view toggle icons and active/inactive visual states.
- [x] Connect list view mode to the opened publisher article-list rotation view instead of a placeholder.
- [x] Select the list view toggle automatically when a publisher is opened from the grid.
- [x] Implement `PressWordmark` as a data-driven typographic logo component using static Tailwind utilities for layout and CSS variables or inline styles for data-driven color/tracking/accent details.
- [x] Implement the 6x4 publisher grid shell with 1px divider gaps, responsive fallback, and page-size constants.
- [x] Render publisher mock data in the grid with stable cell sizing and centered wordmarks.
- [x] Implement grid pagination chevrons with computed page counts, disabled state, and accessible labels.
- [x] Implement subscription state management keyed by publisher ID.
- [x] Implement grid hover/focus behavior that shows `+ 구독하기` or `- 해지하기` pills without breaking keyboard access.
- [x] Implement subscribed-only mode that filters to subscribed publishers and keeps pagination consistent.
- [x] Add focus management for tab switches, pagination, and subscription removal from subscribed mode.
- [x] Implement the header with newspaper icon, `뉴스스탠드` title, and formatted date.
- [x] Implement the two-lane auto-rolling ticker with pause on hover/focus and reduced-motion handling.
- [x] Implement press-cell click behavior that opens the selected publisher's article list view.
- [x] Implement opened-press layout with category field tabs, edit time, subscribe pill, headline block, article list, and footnote.
- [x] Implement the 6-second field-tab progress bar and automatic advancement across publishers/categories.
- [x] Implement smooth transitions for ticker changes, grid/list switching, hover pills, and progress changes while respecting `prefers-reduced-motion`.

## Verification

- [ ] Verify responsive behavior below the 1280px design canvas without horizontal overflow.
- [ ] Add unit tests or lightweight behavior tests when a test runner exists: subscription toggling, filtering, pagination, and timer cleanup.
- [ ] Run `npm run build`, `npm run lint` if available, and any available tests.
- [ ] Update docs if implementation decisions intentionally differ from `docs/design-notes.md`.

## Backend API Migration

- [x] Add `/server` as a separate TypeScript Express package.
- [x] Add MongoDB connection setup and required environment variables.
- [x] Add publisher seed data and a seed script that upserts current mock publishers.
- [x] Implement `GET /api/health` for local and Render health checks.
- [x] Implement `GET /api/newsstand` for categories, publishers, and ticker items.
- [x] Implement subscription persistence with MongoDB keyed by anonymous `clientId`.
- [x] Implement `GET /api/subscriptions` and `PUT /api/subscriptions/:publisherId`.
- [x] Add frontend API client with `VITE_API_BASE_URL` and localStorage-backed `clientId`.
- [x] Replace direct mock data usage in `App.tsx` with initial server fetch state.
- [x] Wire subscription toggling to the server response.
- [x] Add Render blueprint configuration for the API service.
- [x] Seed production MongoDB before Render smoke testing.
- [x] Deploy the API to Render with `MONGODB_URI`, `MONGODB_DB_NAME`, and `CLIENT_ORIGIN`.
- [x] Point the frontend environment to the deployed API URL.
- [x] Smoke test Render API health, newsstand payload, CORS, and subscription add/remove flow.
