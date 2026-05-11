# Week 02 — 검증 보고서

> spec/week2/spec.md 의 미션 2 *검증 체계 구축* 의 결과 정리. PR 본문에
> 그대로 인용 가능한 형태.

## 1. 검증 체계 개요

| 층위 | 도구 | 어디서 |
|---|---|---|
| 단위 (reducer, 순수 함수) | vitest | `src/state/{newsstandReducer,selectors}.test.ts` |
| 시나리오 (selector 조합) | vitest | `src/state/selectors.test.ts` (scenario integration describe) |
| 컴포넌트 a11y / 키보드 | vitest + @testing-library/react + user-event | `src/components/{TabBar,Chevron,SubscribePill}/*.test.tsx` |
| 사용자 입력 hook | vitest + jsdom KeyboardEvent | `src/hooks/useKeyboardShortcuts.test.ts` |
| 빌드 / 타입 | `tsc -b && vite build` | CI / 로컬 |
| 수동 (시각·모션) | 브라우저 | 아래 §5 체크리스트 |

총 **6 테스트 파일 / 82 케이스** (week1 종료 시 15 → week2 종료 시 82, **+67**).

| 파일 | 케이스 | 변동 |
|---|---:|---|
| `src/state/newsstandReducer.test.ts` | 24 | week1 12 → +12 (#5) |
| `src/state/selectors.test.ts` | 29 | 신규 (#3 +19, #6 +10) |
| `src/hooks/useKeyboardShortcuts.test.ts` | 11 | 신규 (#8) |
| `src/components/Chevron/Chevron.test.tsx` | 4 | 신규 (#7) |
| `src/components/SubscribePill/SubscribePill.test.tsx` | 6 | week1 3 → +3 (#7) |
| `src/components/TabBar/TabBar.test.tsx` | 8 | 신규 (#7) |

`npx tsc --noEmit` exit 0. `npm run build` 174 kB JS / 10.4 kB CSS gzipped 57 kB.

## 2. 추가/보강한 테스트의 의도

### #5 reducer 엣지케이스
이미 happy path 12 개가 있던 위에 12 개 더 — 회귀 신호용:

- **`tab/set` 동일 탭 reference 보존** — 가드(`if (state.tab === action.tab)
  return state`) 가 깨지면 같은 탭 클릭마다 `page=0` 으로 리셋되는 미세
  버그가 발생. reference equality 로 가드 자체를 보호.
- **`subscribe`/`unsubscribe` no-op reference 보존** — 같은 패턴.
- **`progress/set` 클램프 0/1, `page/set` 음수 클램프, `page/prev` 0 floor**
  — 경계 산술 회귀.
- **`press/open` 이 subscribed 보존** — 향후 정렬/dedupe 로직이 끼면 깨지는
  지점.
- **`subscribed/hydrate` 가 다른 필드 보존** — localStorage 부팅 후 page/
  tabKey/opened 가 살아있는지.
- **`field-tab/advance-current` 가 다른 필드 보존** — currently dead 액션
  이지만 살릴 때 회귀 막기.
- **default 케이스 reference 보존** — useReducer 의 skip-render 경로 안전.

### #6 selectors / 시나리오 통합
selector 단위 테스트(#3) 위에 *조합 시나리오* 10 개:

- **한 카테고리만 visible 일 때 wrap self-return** — auto-advance 핵심 분기
  (catOutlets 끝 + 같은 카테고리만 → 자기 자신 첫 outlet 으로 loop). 이
  테스트가 깨지면 자동 진행이 멈춘다.
- **sub 탭 + 빈 subscribed → 모든 selector 가 안전한 0/[] 반환** — chevron
  양쪽 disabled 가 자연스러운 결과로 떨어진다.
- **구독 25 명 → 2 명 축소 시 lastPage drop + safePage 자동 clamp** —
  selector 만으로도 화면 안전 (Newsstand 의 useEffect page/set 보정 없이도
  pageItems 가 비어있지 않다).
- **opened 가 unsubscribe 된 후 curIdx=-1, currentInTab=1 floor** — 한
  프레임 동안의 표시값 가드. Newsstand useEffect 가 자동 점프하지만 그
  사이의 selector 값이 안전.
- **all/sub 전환 시 visible 변화** — getVisible 의 두 모드 결과 길이/순서.
- **3 페이지 분량 (PER_PAGE×3=72) → 각 페이지 정확히 24 개** — 마지막
  페이지가 정확히 PER_PAGE 일 때 partial 페이지가 안 생긴다.
- **6 카테고리 중 1 개만 → wrap full loop self-return**.
- **자동 진행 한 스텝 시뮬레이션** — `curIdx + 1 < catOutlets.length` 분기.

### #7 a11y / 키보드
CLAUDE.md a11y 절을 기계 검증으로 묶음:

- TabBar: `role="tablist"` + `role="tab"` 두 개 + 활성탭 `aria-selected="true"`.
- 배지: `aria-label="구독 중인 언론사 N곳"` (subCount > 0 일 때만 렌더).
- ViewerButton: `aria-label="리스트 뷰" / "그리드 뷰"` + `aria-pressed`.
- Chevron: `aria-label="이전 페이지" / "다음 페이지"` + 끝 페이지에서
  `disabled` 속성. disabled chevron click 거부 검증 (user-event 의
  pointer-events 가드 우회).
- SubscribePill: 키보드 Enter / Space 활성화 (네이티브 button 동작).

### #8 키보드 단축키 hook
기능 자체에 11 케이스:

- 각 키 → 해당 핸들러 호출 + `preventDefault`.
- 핸들러 undefined → no-op (preventDefault 도 안 함 → 페이지 스크롤 등
  브라우저 기본 동작 유지).
- Modifier (ctrl/alt/meta/shift) 같이 → 무시 (브라우저 단축키 보호).
- input/textarea/select/contenteditable focus → 무시.
- 무관한 키 (a, Enter, Tab) → 무시.
- unmount 시 listener 정리.
- rerender 후 최신 핸들러 호출 (ref 캡처).

## 3. 발견한 엣지케이스 / 미세 버그 (모두 테스트로 보호)

| # | 발견 | 어디 | 방어 |
|---|---|---|---|
| 1 | `tab/set` 동일 탭 가드가 깨지면 페이지가 매 클릭마다 0 으로 | reducer | #5 케이스 1 |
| 2 | `default` 케이스가 reference 보존 → useReducer skip-render | reducer | #5 케이스 12 |
| 3 | `findNextCategoryWithOutlets` 가 "그 카테고리만 있으면 자기 자신" 반환 — 자동 진행 wrap loop 가 이 동작에 의존 | selectors | #3, #6 케이스 1, 8 |
| 4 | `getCurrentInTab(-1)===1` floor 가 opened 가 visible 에서 사라지는 한 프레임의 표시값 가드 | selectors | #6 케이스 4 |
| 5 | `getVisible('all')` 가 입력 배열 reference 보존 → useMemo 가 새 배열을 안 만들어 PressGrid 재렌더 방지 | selectors | #3, #6 케이스 5 |
| 6 | jsdom 의 `target.isContentEditable` 가 `div.contentEditable = "true"` 만으로는 false → 실 hook 에 `getAttribute("contenteditable")` fallback 추가 | useKeyboardShortcuts | #8 hook 코드 |
| 7 | window 에서 dispatch 한 KeyboardEvent 는 target=window — `target instanceof HTMLElement` 로 타입 좁히기 (없으면 throw) | useKeyboardShortcuts | #8 hook 코드 |
| 8 | disabled chevron 은 `pointer-events: none` 이라 user-event 가 click 을 거부 — `PointerEventsCheckLevel.Never` 로 가드 우회 후 onClick 미호출 검증 | Chevron 테스트 | #7 |

## 4. a11y 점검 결과 (CLAUDE.md §접근성 대비)

| CLAUDE.md 규칙 | 구현 | 검증 |
|---|---|---|
| 탭 바 `role="tablist"`, 각 탭 `role="tab"`, 활성 `aria-selected="true"` | `src/components/TabBar/TabBar.tsx` 23, 67-68 | #7 TabBar.test.tsx |
| 셰브론 `<button>` + `aria-label="이전/다음 페이지"`, 끝 페이지 `disabled` | `Chevron.tsx` 11, 13-19 | #7 Chevron.test.tsx |
| 구독 카운트 배지 `aria-label="구독 중인 언론사 N곳"` | `TabBar.tsx` 76 | #7 TabBar.test.tsx |
| 호버 전용 컨트롤 키보드 focus parity | week1 #14 fix (`:focus-visible`) — 시각 검증 | 수동 (§5) |
| 모든 텍스트 콘트라스트 AA | tokens.css 토큰 — 시각 검증 | 수동 (§5) |
| `prefers-reduced-motion: reduce` 자동 모션 끔 | `useReducedMotion` + useAutoAdvance 가드 + Ticker 자체 가드 | 수동 (§5) |

기계 검증되지 않은 부분 (콘트라스트·시각 focus ring·reduced motion 시각
효과) 은 §5 수동 체크리스트로 이관.

## 5. 수동 검증 체크리스트

`npm run dev` 후 1280×720 뷰포트에서:

- [ ] 그리드 모드: ← / → 키 → 페이지 이동. 1 페이지에서 ←, 마지막 페이지에서 → 무반응 (chevron disabled 와 동일).
- [ ] 리스트 뷰 진입: 언론사 셀 클릭 → 해당 언론사의 primary 카테고리로 진입. progress=0 부터 6 초 진행.
- [ ] 리스트 뷰 ← / → : 같은 카테고리 안 outlet 이동. 카테고리 첫/끝에서 ← / → 무반응 (chevron disabled).
- [ ] 리스트 뷰 Esc: 닫고 그리드 모드로.
- [ ] 6 초 자동 진행 후 다음 outlet, 카테고리 끝에서 다음 카테고리 첫 outlet 으로 loop.
- [ ] 구독: 셀 hover → "+구독하기" pill, 클릭 → 헤더 배지 카운트 +1, sub 탭에 추가.
- [ ] 해지: 구독한 셀 hover → "−해지하기", 클릭 → 카운트 -1, sub 탭에서 제거.
- [ ] sub 탭: 구독 0 명일 때 그리드 비어있고 chevron 양쪽 disabled.
- [ ] 새로고침 후 구독 상태 유지 (localStorage).
- [ ] OS 설정에서 "동작 줄이기" (prefers-reduced-motion: reduce) 활성화 → 티커 자동 회전 멎음, 리스트 뷰 6 초 진행 멎음 (수동 ←/→ 는 그대로 동작).
- [ ] 키보드 Tab 으로 모든 컨트롤 (탭/셀/pill/chevron/뷰어 토글) 도달 가능, focus ring 시각적으로 분명.
- [ ] input 안에 focus (현재 검색 input 없음 — 향후 추가 시 단축키 무시 검증).

## 6. 한계점 / 다음 주차로 미룬 것

- **E2E 테스트 없음** — Playwright / Cypress 미도입. 단위 + 시나리오
  selector 테스트로 핵심 분기는 보호되지만, React 컴포넌트가 reducer + hook
  + DOM 을 통합한 시나리오 (구독 → sub 탭 전환 → 페이지 → 진입 → 자동 진행)
  의 끝-끝 검증은 수동.
- **시각 회귀 테스트 없음** — Percy / Chromatic 등 미도입. PressWordmark 의
  72 종 시각 정확성은 spec PDF 와의 수동 대조에 의존.
- **콘트라스트 자동 검증 없음** — axe-core 등 미도입. tokens.css 토큰 단위
  로 한 번 점검했지만 회귀 자동 차단 없음.
- **번들 크기 한계 미설정** — 174 kB / 57 kB gz 는 적절한 범위지만 임계값을
  CI 에 박지 않음.
- **useAutoAdvance / 자동 점프 useEffect 의 통합 테스트 없음** — fake timers
  + RTL 로 작성 가능하지만 보일러플레이트 대비 신호 약함으로 판단해 보류.
  대신 selectors 시나리오 테스트가 분기 결정 로직을 보호.
- **`field-tab/advance-current` 액션은 reducer 에 정의되어 있지만 dispatch
  경로 없음** — press/open 재사용으로 일원화. 관성 코드를 제거할지는 다음
  주차 결정.
- **`currentInTab` 필드도 reducer 에 살아있지만 화면은 catOutlets 기반
  파생값을 사용** — 같은 이유로 다음 주차 검토 대상.

## 7. 인용 / 링크

- 컴포넌트 계층 + props 흐름: [`works/week2/design/component-hierarchy.md`](design/component-hierarchy.md)
- 상태 흐름 + 액션 다이어그램: [`works/week2/design/state-flow.md`](design/state-flow.md)
- week1 plan / 회고: [`works/week1/plan.md`](../week1/plan.md)
- week2 plan / 체크리스트: [`works/week2/plan.md`](plan.md)
