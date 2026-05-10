# Week 02 — 설계 문서 + 리팩토링 + 검증 강화

- Status: in-progress
- Spec: `spec/week2/spec.md`
- Started: 2026-05-10
- Completed: —

## 목표

week1 의 18 항목으로 기능 1차 구현은 끝났다. week2 는 그 결과물에 대해
**(1) 사후 설계 문서화 — 컴포넌트 계층 + 상태 흐름**, **(2) 핵심 로직
리팩토링 — selectors / hook 분리**, **(3) 엣지케이스/시나리오/a11y 검증
보강**, 그리고 **(4) 키보드 단축키 추가**까지 진행한다. spec/week2/spec.md
가 명시한 두 미션 — *엄격한 설계 과정 문서화* 와 *검증 체계 구축* —
이 plan 의 1차 목적이다.

## 결정 사항

- 설계 문서는 `works/week2/design/` 에 Mermaid + 표로 작성한다 (PDF/이미지
  도구 도입하지 않음). PR 본문에 그대로 인용 가능하도록 markdown.
- 파생 상태는 `src/state/selectors.ts` 의 순수 함수로 모은다 — Newsstand
  컴포넌트가 inline 으로 들고 있던 derive 로직을 단위 테스트 가능한 영역
  으로 분리.
- 자동 전환 (interval + advance + wrap) 은 `useAutoAdvance` 훅으로 분리.
  reducer 는 그대로 (스펙 9장 상태 형태 유지), 사이드이펙트만 hook 으로.
- 테스트는 vitest + RTL 그대로. Playwright/Cypress 도입하지 않음.
- 추가 feature 는 키보드 단축키 (←/→/Esc) 만 — 스펙·디자인 시스템 가드
  안에서 UX 개선이 명확한 한 곳.

기술 스택·디자인 토큰·a11y 규칙은 `CLAUDE.md` 의 프로젝트 규칙을 그대로
따른다. (week2 에서 새로 정한 것 위에만 명시)

## 작업 체크리스트

각 항목 = 한 commit 단위. 항목 번호가 commit 메시지의 `#N`.

- [x] **1. 컴포넌트 계층 + props 흐름 설계 문서** — `works/week2/design/component-hierarchy.md` 에 Mermaid 트리 + 컴포넌트별 책임/props/event 표 + 데이터 소유권 경계.
- [x] **2. 상태 흐름 + 액션 다이어그램 설계 문서** — `works/week2/design/state-flow.md` 에 reducer 액션 → state 전이 다이어그램, 파생 상태 표(visible/pageItems/catOutlets/lastPage), 사이드이펙트(localStorage/useInterval) 정리.
- [x] **3. selectors 분리 + 단위 테스트** — `src/state/selectors.ts` 로 `getVisible / getPageItems / getLastPage / getCatOutlets / getCurrentInTabFromOpened / findNextCategoryWithOutlets` 추출. Newsstand.tsx 의 inline derive 를 selector 호출로 치환. `selectors.test.ts` 추가.
- [x] **4. `useAutoAdvance` 훅 분리** — Newsstand 의 useInterval + 다음 outlet/카테고리 wrap 로직을 `src/hooks/useAutoAdvance.ts` 로 추출. `prefers-reduced-motion` / `isOpened` 가드 포함. Newsstand 는 단순 호출만.
- [x] **5. 리듀서 엣지케이스 보강 테스트** — 동일 액션 idempotency(같은 tab/set 노옵, 동일 progress 클램프 0/1, 동일 subscribe 노옵 reference equality), page/set 음수 클램프, press/open 뒤 progress=0/currentInTab=1 보장, subscribed/hydrate 가 다른 필드 보존.
- [ ] **6. selectors/시나리오 통합 테스트** — 한 카테고리만 visible 일 때 `findNextCategoryWithOutlets` wrap, sub 탭에서 visible.length==0 시 lastPage=0, 구독 해지로 visible 축소 시 page clamp, opened press 가 unsubscribe 된 후의 catOutlets/curIdx.
- [ ] **7. a11y 키보드/aria 컴포넌트 테스트** — TabBar `role=tablist` + 활성 탭 `aria-selected=true`, Chevron `aria-label` + 끝 페이지 `disabled`, 구독 카운트 배지 `aria-label="구독 중인 언론사 N곳"`, SubscribePill 키보드(Enter/Space) 활성화.
- [ ] **8. 키보드 단축키 (←/→/Esc)** — 그리드: ←/→ 페이지 이동. 리스트뷰: ←/→ 같은 카테고리 안 outlet 이동, Esc 닫기. focus/input 안에서는 무시. `useKeyboardShortcuts` 훅으로 분리.
- [ ] **9. 검증 보고서 (PR 본문 시드)** — `works/week2/verification.md` 에 추가/보강한 테스트 케이스, 발견한 엣지케이스, a11y 점검 결과, 수동 검증 항목(키보드/reducedMotion/localStorage), 한계점을 정리. PR 본문에 그대로 인용 가능한 형태.

## 의존관계

| # | 항목 | 선행 | 수정 파일 |
|---|---|---|---|
| 1 | 컴포넌트 계층 docs | (없음) | `works/week2/design/component-hierarchy.md` |
| 2 | 상태 흐름 docs | (없음) | `works/week2/design/state-flow.md` |
| 3 | selectors 분리 | (없음) | `src/state/selectors.ts` (신규), `src/state/selectors.test.ts` (신규), `src/components/Newsstand/Newsstand.tsx` (수정) |
| 4 | useAutoAdvance | 3 | `src/hooks/useAutoAdvance.ts` (신규), `src/components/Newsstand/Newsstand.tsx` (수정) |
| 5 | 리듀서 엣지 테스트 | (없음) | `src/state/newsstandReducer.test.ts` (수정) |
| 6 | selectors/시나리오 테스트 | 3 | `src/state/selectors.test.ts` (수정) |
| 7 | a11y 컴포넌트 테스트 | (없음) | `src/components/{TabBar,Chevron,SubscribePill}/*.test.tsx` (신규) |
| 8 | 키보드 단축키 | 4 | `src/hooks/useKeyboardShortcuts.ts` (신규), `src/components/Newsstand/Newsstand.tsx` (수정), `src/hooks/useKeyboardShortcuts.test.ts` (신규) |
| 9 | 검증 보고서 | 5, 6, 7, 8 | `works/week2/verification.md` |

## 병렬 그룹 (subagent wave)

같은 wave 안의 항목은 subagent 병렬 실행 가능. 다음 wave는 이전 wave가 모두 끝난 뒤 시작.

- **Wave 0**: `[1, 2]` — 설계 docs (서로 다른 파일)
- **Wave 1**: `[3]` — selectors (Newsstand.tsx 수정)
- **Wave 2**: `[4]` — useAutoAdvance (Newsstand.tsx 수정 — #3 와 직렬)
- **Wave 3**: `[5, 6, 7]` — 테스트 보강 (서로 다른 테스트 파일)
- **Wave 4**: `[8]` — 키보드 단축키 (Newsstand.tsx 수정 — #4 와 직렬)
- **Wave 5**: `[9]` — 검증 보고서 (단독)

## 검증

- 모든 vitest 통과 (week1 테스트 포함, 회귀 없음).
- 시각적 회귀 없음 — week1 이 만든 화면이 그대로.
- 키보드 단축키가 reducedMotion 과 충돌하지 않고, focus/input 안에서는 무시.
- 설계 문서 두 개가 PR 본문 인용 시 그대로 읽힘.
- `works/week2/verification.md` 가 PR 본문 검증 섹션의 시드가 됨.

## 회고

(완료 후 작성)
