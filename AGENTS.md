# AGENTS.md - News Stand Project

This document applies to the entire `/Users/teseuteu/news-stand/news` repository.
If the user gives a direct instruction, follow that first. Otherwise, use this document as the default working policy.

## Project Overview

A desktop-first web UI project inspired by Naver News Stand.
Users can browse a press-outlet grid, subscribe or unsubscribe to outlets, and inspect grouped article lists by category in list view.

- Design spec: `docs/docs-design-spec.pdf`
- Design system: `docs/docs-design-system.pdf`
- Implementation checklist: `docs/checklist.md`
- Coding convention: `docs/coding-convention.md`
- Coding behavior: `docs/coding-behavior.md`

If a task affects UI, layout, interaction, typography, color, or spacing, check the relevant PDFs first and implement against them.
When a guess conflicts with the docs, the docs win.

## Document Usage

- When editing implementation files, always reference `docs/coding-convention.md`.
- For working style, validation, review, questions, and reporting, always reference `docs/coding-behavior.md`.
- Code style rules must be followed strictly, not approximately. If a change conflicts with the documented code style, rewrite the change to match the documented style.
- Before each meaningful command or edit, quickly check which rules from `AGENTS.md`, `docs/coding-convention.md`, `docs/coding-behavior.md`, and `docs/checklist.md` apply to that action.
- For UI validation, always use `docs/checklist.md`.
- Checklist validation must also be treated as overall bug testing. Use the full checklist to look for possible regressions, broken state flows, accessibility gaps, and spec mismatches, not just to mark boxes.
- If documents conflict, interpret them in this order: user request, design PDFs, checklist, then the detailed rule documents.

## App.tsx Role

- `src/App.tsx` is the root composition file for the application.
- `App.tsx` should own top-level state wiring, major view switching, and assembly of already-separated components.
- `App.tsx` must not accumulate domain-specific helper components, rendering utilities, inline icon definitions, or long configuration blocks.
- If a unit in `App.tsx` has its own rendering logic, timing logic, interaction logic, or reusable constants, split it into a dedicated file or move its constants into `src/const/`.
- Changes to `App.tsx` should generally make the file simpler, flatter, and more orchestration-focused rather than increasing its local complexity.

## Main Commands

```bash
npm run dev      # Start the dev server
npm run build    # Type-check and build for production
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```
