# News-Stand Scenario Checklist

Use this checklist before and after any UI change. The goal is to keep Codex aligned with the product spec, design system, and user-facing flows.

## Source Of Truth

- [ ] Validate against `docs/docs-design-spec.pdf`.
- [ ] Validate against `docs/docs-design-system.pdf`.
- [ ] If the implementation and a guess conflict, the docs win.

## Core Scenario Coverage

- [ ] Empty app shell does not count as complete once feature work begins.
- [ ] The main user journey must support browsing press outlets in the grid.
- [ ] The user must be able to subscribe and unsubscribe from press outlets.
- [ ] The user must be able to move between `All` and subscribed views.
- [ ] The user must be able to open a press outlet and see the opened-press layout.
- [ ] The opened-press layout must support tab/category changes and timed progress behavior.
- [ ] The ticker must remain present and behave consistently across grid and opened-press states.

## Layout Validation

- [ ] Check the desktop-first layout against the 1280x720 spec assumptions.
- [ ] Keep the main content column at the documented width and avoid drifting into generic centered-app layouts.
- [ ] Keep chevrons, ticker, tab bar, grid, and opened-press regions in their intended structural positions.
- [ ] Do not reintroduce the default Vite starter layout, card patterns, or demo sections.

## Visual Validation

- [ ] Use only spec-backed colors, spacing, borders, radii, and shadows.
- [ ] Keep the page restrained and editorial. No decorative gradients, glow, or marketing-style hero composition.
- [ ] Press branding must remain typographic wordmarks unless the spec or user explicitly says otherwise.
- [ ] Accent color should only appear in spec-approved places such as active progress states and subscribed count emphasis.
- [ ] Body, meta, and counter text should use the documented sizing and hierarchy.

## Interaction Validation

- [ ] Ticker auto-rotation timing and pause behavior should match the spec.
- [ ] Grid cells should expose subscribe and unsubscribe affordances in the intended states.
- [ ] Hover interactions must also work from keyboard focus.
- [ ] Pagination and chevrons must operate on the correct collection for the current view.
- [ ] Opened-press progress behavior must advance correctly through items and tabs.
- [ ] Reduced-motion behavior must be respected.

## Accessibility Validation

- [ ] Tabs use proper tab semantics.
- [ ] Buttons and interactive controls use button semantics.
- [ ] Active state is communicated with `aria-selected` where applicable.
- [ ] Essential controls are not pointer-only.
- [ ] Text contrast remains AA-compliant on its surface.

## Implementation Review

- [ ] Confirm the change solves the user request without breaking a documented scenario.
- [ ] Check for hard-coded ad hoc values that should be tokens or CSS variables.
- [ ] Remove temporary placeholder styling once real spec-driven UI is added.
- [ ] Prefer small targeted components over template leftovers or dead code.

## Final Check

- [ ] State which scenarios were validated.
- [ ] State which commands were run.
- [ ] If something could not be validated, say so explicitly.
