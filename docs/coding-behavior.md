# Coding Behavior

This document defines the behavioral rules for working in `/Users/teseuteu/news-stand/news`.
Use it together with `AGENTS.md` for work execution, review, questions, validation, and reporting.

## Document Priority

- Follow direct user instructions first.
- Otherwise, work against `AGENTS.md`, this document, `docs/coding-convention.md`, and `docs/checklist.md`.
- If a task affects UI, layout, interaction, typography, color, or spacing, check `docs/docs-design-spec.pdf` and `docs/docs-design-system.pdf` first.
- When a guess conflicts with the docs, the docs win.

## Main Commands

```bash
npm run dev      # Start the dev server
npm run build    # Type-check and build for production
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Working Behavior

- The user may have in-progress changes, so do not revert unrelated edits.
- Extend the existing structure before introducing new patterns.
- If implementation and documentation conflict during the task, follow the documentation over the implementation.
- Do not stop at long explanation when the work can be completed directly. Prefer making the change and validating it when feasible.
- Before each meaningful command, edit, validation step, or git action, quickly verify which project rules apply and execute the action only after that check.
- If a command result reveals a style violation or process violation, treat it as something to fix immediately rather than something to leave for later.

## Review Rules

- When asked to validate the checklist, mark only the successful items and leave failed items unchecked or report them explicitly in review notes.
- When reporting a failure, include code-based or validation-based evidence for why it failed.
- Prioritize finding breaks in documented scenarios, pointer-only interactions, off-spec decoration, and non-tokenized hardcoded values.

## Question Rules

- If something can be safely inferred from the local context and the existing structure, proceed directly.
- Ask a short, direct clarification question only when inference is risky or the result would materially change based on user intent.
- Unless the issue is truly blocking, inspect the code, docs, and checklist before asking.

## Validation Rules

- When possible, run `npm run build` and `npm run lint` after changes.
- For UI work, do not stop at build or lint. Also verify the relevant scenarios in `docs/checklist.md`.
- Treat checklist validation as broad bug testing across the whole affected flow. Use it to actively look for possible regressions, broken interactions, state bugs, accessibility issues, and off-spec behavior.
- If validation could not be completed, state the reason clearly in the final response.
- When validation succeeds, record which scenarios were checked.

## Commit Rules

Every commit message must follow the format below.
Include the feature-list number in the title, and always include `확인내용` and `이해 안 됐던 부분` in the body.
Treat `이해 안 됐던 부분` not as agent uncertainty, but as what the user found confusing, what needed double-checking, or what had to be revisited during implementation.
The number follows a single increasing project-wide sequence and must not be reused.

```text
<type>: #<feature-list-number> <title>

- 확인내용: <implemented detail, what was verified, or follow-up decision>
- 이해 안 됐던 부분: <what the user found confusing, needed to double-check, or revisited during implementation, or "없음">
```

Allowed types are `feat`, `fix`, `style`, `refactor`, `chore`, and `docs`.
Use the feature-list number regardless of commit type.
Do not omit the two required body items.
Do not use those fields to record agent uncertainty or research notes.

## Response Rules

- Report what changed briefly and clearly.
- Include what validation was performed.
- If there are remaining assumptions, risks, or unverified points, separate them briefly.
