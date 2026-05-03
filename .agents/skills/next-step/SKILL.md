---
name: next-step
description: Verify the current newsstand implementation and prepare a commit message draft. Use when the user invokes $next-step, asks whether the current feature is complete, asks to check the implementation against docs/DESIGN.md and docs/CHECKLIST.md, or asks for a commit message after a feature pass.
---

# Next Step

Use this workflow to decide whether the current implementation is complete enough to mark in `docs/CHECKLIST.md` and draft a commit message.

1. Run `npx tsc --noEmit`, `pnpm lint`, and `pnpm build` in order.
2. If any command fails, report the failure and stop. Do not update `docs/CHECKLIST.md` and do not draft a commit message.
3. Inspect changed files for `any`, avoidable type escapes, dead code, commented-out code, stray `console.log`, and obviously overcomplicated implementation.
4. Read `docs/DESIGN.md` and `docs/CHECKLIST.md`; confirm the current feature matches the spec and has no missing details.
5. If any issue remains, report the issues and stop before changing the checklist.
6. Run `git diff --staged` and `git status`; if nothing is staged, inspect `git diff HEAD`.
7. Identify the current feature number in `docs/CHECKLIST.md` and mark only that completed item as `[x]`.
8. Draft the commit message:

```text
<type>: #<feature-number> <title>

- 확인내용: <이번 커밋에서 구현한 내용을 구체적으로 작성>
- 이해 안 됐던 부분:
```

Choose `<type>` from `feat`, `fix`, `refactor`, `style`, and `chore`. Leave `이해 안 됐던 부분` blank, then write `위 내용을 채워서 커밋하시면 됩니다.`

Do not create a commit unless the user explicitly asks. Preserve unrelated user changes.

