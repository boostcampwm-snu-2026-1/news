---
name: fix-spec
description: Apply user-provided spec corrections to this React newsstand project. Use when the user invokes $fix-spec, changes design or product requirements, corrects docs/DESIGN.md or docs/CHECKLIST.md behavior, or asks Codex to update already implemented code to match a revised spec.
---

# Fix Spec

Use this workflow after the user provides a spec correction or new requirement.

1. Read `CLAUDE.md`, then read the relevant sections of `docs/DESIGN.md`. Read `docs/CHECKLIST.md` if task scope or acceptance criteria may change.
2. Update docs first. Correct `docs/DESIGN.md`; update `docs/CHECKLIST.md` only if the correction changes checklist scope or acceptance criteria.
3. Update source code only where the revised spec affects already implemented behavior. Do not implement unrelated unfinished checklist items.
4. Keep existing React, TypeScript, Tailwind v4, and component patterns. Keep press logos as SVG/JSX components under `src/components/logos/`.
5. Run `pnpm build`.
6. Report changed docs, changed source files, and the verification result.

Do not run the `$next-step` checklist completion flow from this skill. Do not commit unless the user explicitly asks.

