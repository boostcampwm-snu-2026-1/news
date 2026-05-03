# AGENTS.md

## Project Summary

- Build a React news-stand web service with Vite + React + TypeScript + Tailwind CSS.
- Use `docs/design-notes.md` as the current design source of truth.
- Keep ordered implementation work in `docs/checklist.md`.

## How To Run

- `npm run dev`
- `npm run build`
- `npm run lint`

## Required Checks

Run the strongest available checks before final response:

1. `npm run build`
2. `npm run lint` if a lint script exists
3. Any test command if a test runner has been added

If a check cannot be run, state the exact reason in the final response.

## Source Structure

Prefer this shape unless existing code suggests a better local convention:

```text
src/
  App.tsx
  main.tsx
  styles/
    globals.css
  data/
    newsStand.ts
  types/
    newsStand.ts
  components/
    Header.tsx
    NewsTicker.tsx
    ScopeTabs.tsx
    ViewToggle.tsx
    PublisherGrid.tsx
    PublisherCell.tsx
    Pagination.tsx
    ArticleListView.tsx
    CategoryTabs.tsx
    ProgressBar.tsx
```

## Coding Rules

- Prefer minimal, localized changes.
- Preserve existing structure unless a refactor is explicitly requested or clearly necessary.
- Use deterministic mock data first; do not block UI implementation on real APIs.
- Use Tailwind utilities for layout, spacing, responsive behavior, states, and common visual styling.
- Put reusable design values in CSS custom properties or Tailwind theme tokens before using one-off arbitrary values broadly.
- Keep data-driven wordmark styling in CSS variables or inline style objects when Tailwind static class extraction cannot safely see the values.
- Keep state derived where possible: visible publishers, pages, subscription count, selected publisher.
- Subscription state must be keyed by publisher ID.
- Timer effects must clean up on unmount and when dependencies change.
- Hover-only controls must also be available on keyboard focus.

## Accessibility Rules

- Use semantic buttons for clickable controls.
- Use `role="tablist"` and `role="tab"` for tab controls when appropriate.
- Provide accessible names for chevrons, view toggles, subscribe buttons, and subscription-count badges.
- Pause or disable automatic ticker/progress motion for hover, focus, and `prefers-reduced-motion`.
- Do not rely on color alone to communicate state.

## Do Not

- Do not integrate real news APIs in the first pass.
- Do not add login, backend persistence, SSR, or admin tooling unless explicitly requested.
- Do not attempt pixel-perfect static reproduction; prioritize user flows, state transitions, and design-token fidelity.
- Do not hide subscription actions behind hover only; keyboard focus must expose the same actions.
- Do not hard-code page totals from sample values; compute them from data and page size.

## Done Definition

- The requested behavior is implemented with existing project conventions preserved.
- Available checks have been run or skipped with a clear reason.
- User-facing flows still match `docs/design-notes.md`.
- Any known gap, unavailable command, or unresolved ambiguity is called out in the final response.
