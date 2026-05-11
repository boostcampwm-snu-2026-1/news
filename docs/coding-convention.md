# Coding Convention

This document defines the code-writing rules for `/Users/teseuteu/news-stand/news`.
When editing implementation files, always use this document together with `AGENTS.md`.

## Tech Stack

| 항목 | 현재 선택 |
| --- | --- |
| Framework | React 19 + TypeScript |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 + global styles in `src/index.css` |
| Linting | ESLint 10 |
| State management | `useState` + custom hooks (no external global state library) |

## Directory Structure

```text
src/
├── App.tsx                          # Root composition and top-level view state
├── main.tsx                         # Entry point
├── index.css                        # Tailwind import + global styles + motion
├── assets/                          # Static image assets
├── const/                           # Reusable constants, settings, key lists
├── components/
│   ├── Header.tsx                   # Top header
│   ├── ui/                          # Shared UI primitives
│   └── newsStand/                   # News Stand domain components
├── fixtures/                        # Mock press/article data
├── hooks/                           # State and view-logic hooks
├── libs/                            # Shared utilities
└── type/                            # TypeScript type definitions
```

Put domain-specific UI in `src/components/newsStand/`.
Only place domain-agnostic pieces such as button groups, tabs, and badges in `src/components/ui/`.

## Architecture Rules

- Root state lives in `src/App.tsx`.
- `App.tsx` should handle only top-level state wiring, major screen composition, and large view transitions.
- Do not define named helper components or complex render units inline inside `App.tsx`. Units like `RotatingHeadlineBar` should live outside the file body or in separate component files.
- Subscription state is managed by `src/hooks/useSubscription.ts`.
- Visible outlets and pagination for grid/subscription tabs are computed by `src/hooks/useNewsStandView.ts`.
- Category tabs, active outlet movement, and auto-advance state inside list view are managed by `src/hooks/useNewsListView.ts`.
- Timer-based auto transitions should use `src/hooks/useTimer.ts`.
- Mock data belongs in `src/fixtures/`, and new dummy data should go there too.
- Shared types belong in `src/type/types.ts`.
- Reusable constants and config definitions should use `src/const/` as the source of truth.
- Extend the existing structure before introducing new architectural patterns.
- Do not move state into a new global store or add unnecessary abstraction.

## React / TypeScript Rules

- Follow code style strictly. Do not treat these rules as suggestions or as something to “mostly” match.
- Keep the existing functional-component style.
- Add `useMemo` and `useCallback` only when there is a real performance bottleneck or a concrete referential-stability need.
- Add explicit types when inference is ambiguous.
- When creating constant arrays or config objects, also design the corresponding types that describe their structure.
- Do not hardcode the same domain information in parallel across multiple constants. Derive reusable values from one source-of-truth constant or type whenever possible.
- If a tab-definition array exists, derive union types, state-map keys, and initial-state objects from it where possible.
- Avoid repeating local casts like `as SomeType[]`. Prefer defining a stronger top-level type for the constant and declaring the whole structure against that type.
- If an initial-state object must match the same key set as a config array, enforce that with a factory or derived type instead of duplicating a hand-written map.
- Shared UI components should not behave like wide-open style containers. Primitives such as `Badge` should prefer constrained props like semantic variant, size, or state.
- Avoid patterns where shared primitives accept overly broad `className`, `style`, arbitrary colors, or arbitrary spacing that let each call site redesign them.
- Shared primitive props should enforce design consistency, not maximize abstract flexibility.
- If design variation is growing, prefer expanding the allowed variant set or splitting into a domain-specific component instead of continually opening more props.
- Do not keep long inline SVG markup directly in JSX. Split icons into dedicated icon components.
- If a constant is not truly one-off inside a file, move it into `src/const/`. Do not repeatedly declare tab definitions, label maps, key lists, timer constants, or screen config inside component files.
- Use PascalCase for component files, and camelCase for hook, utility, and fixture modules.
- Reusable view fragments should be extracted into components instead of being left inline inside `App.tsx`.

## Styling Rules

- Preserve the existing visual language. Do not shift the overall mood unless the user explicitly asks for a redesign.
- This project uses Tailwind utility classes together with global styles in `src/index.css`.
- Manage colors in a dedicated file. Do not repeatedly declare ad hoc hex values inside components, pages, or hooks.
- When adding or changing colors, define them in the dedicated color source first and reference only those tokens elsewhere.
- Repeated spacing and motion values should be consolidated into global tokens or shared rules where possible.
- Do not add decorative elements that are not present in the PDFs.
- Disallowed decoration includes heavy shadows, gradients, glow, thick borders, and marketing-landing-page hero treatment.

## Design System Rules

- Keep the desktop-first 1280x720 layout assumptions.
- Main content width and information density should follow the spec.
- Press branding should remain typography-first wordmarks rather than image logos.
- Accent color should be used sparingly and only where state emphasis is actually needed.
- Keep base body text at the documented 16px level, and follow the document for meta and counter hierarchy.
- Preserve 1px borders, documented radii, and restrained spacing.
- Do not allow changes that break the scenarios listed in `docs/checklist.md`.
- The recurring core colors in the docs should stay within this set: `#14212B`, `#5F6E76`, `#879298`, `#D2DAE0`, `#F5F7F9`, `#F7F7FC`, `#FFFFFF`, `#FEFEFE`, `#7890E7`, `#4362D0`.
- Do not scatter those raw values across components. Keep a separated color-definition source as the source of truth.

## Interaction Rules

- The headline bar must keep its auto-rotation behavior.
- Pagination must stay aligned to the current collection when switching between `All` and subscribed tabs.
- Grid/list view switching must preserve the current state flow.
- List-view category tabs and auto-advance behavior must stay aligned with the `useNewsListView` flow.
- Hover-based interactions must also be accessible via keyboard focus.
- In `prefers-reduced-motion` environments, reduce or remove non-essential animation.

## Accessibility Rules

- Tabs must use proper tab semantics.
- Clickable controls must keep button/link semantics.
- Controls with selection state must expose that state with attributes such as `aria-selected`.
- Do not hide essential controls behind pointer-only interaction.
- Text contrast must remain WCAG AA compliant.

## File Placement Rules

- Keep changes small and local.
- Prefer modifying an existing file when that is more appropriate than adding a new one.
- Add short comments only when the intent is not obvious from the code itself.
- Follow the existing placement pattern for static resources in `public/` or `src/assets/`.
- Put new utilities in `src/libs/`, new fixtures in `src/fixtures/`, and new types in `src/type/`.
- If a command, edit, or generated diff would create code that violates these style rules, stop and adjust the implementation before proceeding.
