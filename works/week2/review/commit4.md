# Commit 4 — `useAutoAdvance` 훅 분리

- Feature: #4 `useAutoAdvance` 훅 분리
- Type: refactor

## 점검 결과

### 스펙 합치
spec/week1/ 의 §10 자동 진행 동작(6초 선형 / 완료 시 다음 outlet / 카테고리
끝이면 다음 카테고리 첫 outlet) 을 그대로 보존. spec/week2/spec.md 의
*엄격한 설계 과정* 미션의 후속 — 설계 문서(#2) §6-b 시나리오 trace 가
가리키던 "useInterval + dispatch 조합" 을 단일 hook 으로 모았다.

### CLAUDE.md 규칙
- 모션: PROGRESS_TICK_MS=100, PROGRESS_TOTAL_MS=6000 보존. `prefers-reduced-
  motion: reduce` 가드는 hook 내부에서 `useReducedMotion` 호출 후 interval
  null 로 잠그는 방식 — 동작 동일.
- a11y / 디자인 토큰 / 타이포: 코드 색·스타일 변경 없음 → 해당 없음.

### 회귀
- Newsstand.tsx 의 useInterval 블록 전체를 `useAutoAdvance({...})` 호출로
  치환. 입력 8 개는 모두 같은 식 — `state.progress`, `visible`, `catOutlets`,
  `curIdxInCat`, `state.tabKey`, `dispatch`, `isOpened` 그대로 전달.
- 자동 진행 분기 (progress<1 → set, 카테고리 안 다음 outlet, wrap 카테고리
  첫 outlet) 분기 순서 동일.
- PROGRESS_TICK_MS / PROGRESS_TOTAL_MS / PROGRESS_DELTA 상수는 hook 으로
  이동 (Newsstand 에서는 더 이상 필요 없음).
- `useReducedMotion` 호출이 hook 안으로 들어갔다 — Newsstand 가 더 이상
  reduced 변수를 들고 있지 않음 (다른 용처가 없었음).

검증:
- `npx tsc --noEmit` exit 0
- `npm test` — 34 tests pass (회귀 없음)
- 시각적 회귀: dispatch 패턴 동일 → 자동 진행 화면 동작 동일.

### 테스트
이 hook 자체에는 단위 테스트를 붙이지 않았다 — useInterval 위에 얹힌 얇은
래퍼라 단위 테스트가 vi.useFakeTimers 보일러플레이트만 늘어난다. 핵심 분기
(progress 누적 / 다음 outlet / wrap) 은 selectors 단위 테스트(#3) 와 다음
wave 의 시나리오 통합 테스트(#6) 에서 입력 측 selectors 가 보호된다.
부모 dispatch 인터페이스는 reducer 테스트(#5) 가 보호한다.

### 불필요한 추상화
- 인자 8 개는 인터페이스로 묶어 한 객체로 전달 (positional 인자 가독성
  떨어짐). 입력은 모두 derive 결과라 hook 내부에서 다시 계산하지 않는다.
- hook 이 한 곳(Newsstand) 에서만 쓰이지만, **테스트 가능 단위 분리** 와
  **컨테이너 코드 단순화** 가 분명한 이득 — Newsstand 가 30 줄 줄었다.
- catOutlets/curIdxInCat 같은 derive 입력을 다시 selector 로 내장 호출하는
  대신 외부에서 받아 넘긴다 — 부모(Newsstand) 가 이미 같은 값을 catOutlets
  prop 으로 PressOpen 에도 보내고 있어 중복 계산 방지.

### 기타 메모
- hook 이 `useReducedMotion` 을 직접 호출 — 다른 컴포넌트가 그 값을 별도로
  필요로 하면 다시 노출 가능. 현재는 Newsstand 외부에서 reduced motion 가드
  대상이 없다 (티커는 자체적으로 useReducedMotion 호출).
- Newsstand 의 다른 useEffect (페이지 오버플로 가드, tabKey 변경 시 자동
  점프) 는 그대로 둠 — 자동 진행과 분리된 동작이라 hook 화 안 함.
