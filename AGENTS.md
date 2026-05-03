# Agent Guidance for This Repository

## Purpose
This repository is a React + TypeScript + Vite implementation of a newsstand-style UI. The source of truth for layout, tokens, interaction, and accessibility is `docs/spec.md`.

## Working Rules
- Use `docs/spec.md` to understand the required UI, motion, and state behavior before making implementation changes.
- Use `docs/checklist.md` as the execution plan for week 1 and week 2 work.
- Keep edits minimal and aligned with the existing visual system: dense layout, clear hierarchy, hairline borders, and a single accent color.
- Preserve accessibility requirements, especially tab semantics, button labels, and reduced-motion handling.

## Suggested Implementation Order
1. Build the static shell and shared design tokens.
2. Implement the grid and list views.
3. Add interaction, animation, and state transitions.
4. Finish accessibility and motion-reduction checks.

## Notes for Future Agents
- Prefer updating the docs first when requirements change.
- If a behavior is ambiguous, inspect the nearest component and the related spec section instead of broadening scope.
- Keep `docs/spec.md` as the authoritative reference and `docs/checklist.md` as the short-term delivery plan.
