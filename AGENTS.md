# AGENTS.md

Guidance for Codex and similar coding agents working in this repository.

## Scope

- This file applies to the entire repository.
- Follow direct user instructions first. Use this file as the default repo contract when the user has not specified a different workflow.

## Project Context

- Stack: Vite, React, TypeScript.
- Entry points: `src/main.tsx`, `src/App.tsx`.
- Static assets live under `public/` and `src/assets/`.
- Design source of truth: `docs/docs-design-spec.pdf` and `docs/docs-design-system.pdf`.
- Validation guide: `docs/checklist.md`.
- Before starting any UI task, read the relevant part of the design spec first and implement from that reference rather than memory.
- Treat the PDFs above as authoritative product requirements, not inspiration. When a request touches UI, layout, interaction, copy hierarchy, or styling, follow those documents strictly.
- Use `docs/checklist.md` to validate affected user scenarios before closing any UI-related task.

## Working Rules

- Preserve user changes. The worktree may already be dirty; do not revert unrelated edits.
- Keep changes minimal and local to the request.
- Prefer updating existing files over adding new abstractions unless the change clearly benefits from extraction.
- Match the existing style in the touched area before introducing new patterns.
- Use ASCII by default unless a file already relies on non-ASCII text.
- Add comments only when the code would otherwise be hard to follow.

## React And TypeScript

- Use function components and idiomatic React 19 patterns.
- Prefer clear state flow over premature optimization.
- Do not add `useMemo` or `useCallback` by default; only add them when there is a concrete need.
- Keep TypeScript types explicit when inference would be unclear to a reader.
- Use PascalCase for component filenames. Reserve camelCase for non-component modules such as helpers, fixtures, and utility files.
- Buttons should default to `cursor-pointer`; if a button can be disabled, add an explicit disabled cursor override such as `disabled:cursor-default`.
- Put reusable UI into `src/components/` by default.
- Put reusable primitive or shadcn-like UI pieces into `src/components/ui/` only when they are domain-agnostic.
- Keep domain-specific reusable UI out of `src/components/ui/`; place it in a feature-oriented component folder such as `src/components/newsStand/`.
- When adding a new view section that can be reused, extract it into a component instead of leaving it inline in `App.tsx` or page files.
- Put dummy data and mock application records into `src/fixtures/`.
- Put shared utilities into `src/libs/` and shared type definitions into `src/type/`.

## Styling

- Preserve the current visual language unless the user asks for a redesign.
- Prefer editing the existing CSS files in `src/` instead of introducing a new styling system.
- Pull repeated design values into CSS variables and keep them aligned with the PDF tokens.

## Design System Rules

- Build for the desktop-first newsstand layout described in the PDFs, including the 1280x720 canvas assumptions and the 930px content column.
- Favor clarity over decoration. Do not introduce gradients, glow, thick borders, ornamental shadows, or decorative effects that are not called for by the spec.
- Treat typography as the brand. Press identities should be rendered as styled wordmarks, not replaced with image logos unless the user explicitly overrides the spec.
- Use the system accent color sparingly. The PDFs reserve accent usage for the subscribed-count badge, the active progress tab, and closely related progress states.
- Respect the documented density: compact information layout, restrained whitespace, and tight but readable line heights.
- Use the documented token palette and avoid ad hoc colors.
  - Core colors called out in the PDFs include `#14212B`, `#5F6E76`, `#879298`, `#D2DAE0`, `#F5F7F9`, `#F7F7FC`, `#FFFFFF`, `#FEFEFE`, `#7890E7`, and `#4362D0`.
- Use the documented type roles and families.
  - Body copy is 16px by default.
  - Meta, captions, and counters are generally 12px.
  - Use IBM Plex Mono for numeric/tab counters where specified.
  - Use Noto Serif KR only for serif wordmark accents where the spec calls for them.
- Use an 8px spacing system and keep layout measurements aligned to the spec rather than inventing new spacing scales.
- Use 1px strokes in the system line color for dividers, borders, and grid lines. Do not introduce alternate border weights without a spec-backed reason.
- Shadows are effectively absent in the system. The subscribe/unsubscribe pill shadow is the rare exception and should stay subtle.
- Reuse the system radii for grid cells, pills, badges, and opened-press surfaces. Do not invent new corner styles.

## Interaction Rules

- Preserve the spec behavior for the auto-rotating ticker, including two lanes, timed rotation, and pause behavior on hover or focus.
- Preserve the spec behavior for the tab bar, grid pagination, subscribe pill reveal, and opened-press auto-advancing progress tabs.
- Hover-only affordances must also be reachable via keyboard focus.
- Respect reduced-motion preferences by disabling or simplifying non-essential motion.
- Keep chevrons, pagination, grid/list state, and opened-press flows consistent with the PDFs instead of redesigning them during implementation.

## Accessibility

- Keep tab semantics, button semantics, and `aria-selected` usage aligned with the suggested React structure in the PDFs.
- Maintain WCAG AA contrast on all surfaces.
- Do not hide essential actions behind pointer-only interaction.

## Verification

- Run targeted checks after changes when possible.
- For UI work, validate the relevant scenario list in `docs/checklist.md`, not just typecheck/build output.
- Primary commands:
  - `npm run build`
  - `npm run lint`
- If a check cannot be run, state that clearly in the final response.

## Response Expectations

- Report what changed and any verification performed.
- Call out assumptions, blockers, or notable risks briefly and directly.
