<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules

## Product Context

This project implements a desktop-first Korean newsstand UI from `design_spec.pdf` and `design_config.pdf`.

Primary user flows:

- Browse all press outlets in a 6x4 grid.
- Subscribe and unsubscribe from press outlets.
- Switch to the subscribed press tab.
- Open a press outlet in list view.
- Auto-rotate press article lists with visible progress.

## Development Workflow

1. Pick one feature number from `docs/checklist.md`.
2. Read the matching PDF section before editing.
3. For Next.js behavior, read the relevant local guide in `node_modules/next/dist/docs/`.
4. Implement in a small, reviewable unit.
5. Run lint or the narrowest available verification command.
6. Use Chrome headless screenshots for UI verification when the change affects the page.
7. Commit with the feature number and record what was checked.

## Commit Convention

Use conventional commit prefixes and include the checklist feature number when applicable.

Example:

```txt
feat: #3 뉴스 카드 컴포넌트

- 확인내용: 컴포넌트 배치 확인, 구조가 복잡해서 컴포넌트 분리 추가 진행
- 이해 안 됐던 부분: useCallback 왜 사용했는지 확인함
```

Preferred prefixes:

- `feat`: user-visible feature work
- `fix`: bug fix
- `docs`: documentation
- `chore`: setup, tooling, dependency, or maintenance work
- `refactor`: structure changes without behavior change

## Design Constraints

- Keep the visual system calm and dense: no gradients, glows, or decorative shadows.
- Use `#7890E7` only for the subscribed-count badge and active progress tab.
- Preserve the 930px content column for the desktop design.
- Use 1px `#D2DAE0` dividers and borders for grid separation.
- Prefer typographic press wordmarks over image logos.
