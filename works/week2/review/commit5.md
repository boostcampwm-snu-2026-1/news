# Commit 5 — 리듀서 엣지케이스 보강 테스트

- Feature: #5 리듀서 엣지케이스 보강 테스트
- Type: test

## 점검 결과

### 스펙 합치
spec/week2/spec.md 의 *검증 체계 구축* 미션을 충족한다 — week1 까지 행복
경로 위주의 12 케이스만 있던 reducer 테스트를, 동일 액션 idempotency /
경계값 클램프 / press·hydrate 가 다른 필드를 지키는지 등 음수/no-op
브랜치까지 12 케이스 더 보강 (총 24). reducer 자체 코드는 변경 없음 —
spec/week1 §9 의 상태 형태와 액션 의미는 그대로.

### CLAUDE.md 규칙
- 테스트 파일 한 곳만 수정. 컴포넌트/스타일/토큰 변경 없음 → 디자인
  토큰 / 선·그림자 / 타이포 / a11y 규칙 해당 없음.
- 기존 12 케이스 손대지 않고 새 describe 한 개를 append — 회귀 표면 동일.

### 회귀
- `npm test` — 3 files / 46 tests pass.
- 변경 전 12 + 추가 12 = 24 케이스가 모두 reducer 한 파일 안에서 통과
  (`src/state/newsstandReducer.test.ts (24 tests)`).
- selectors.test.ts (19) / SubscribePill.test.tsx (3) 도 그대로 pass —
  reducer 코드 미변경이라 당연하지만 명시적으로 확인.

### 테스트
이 commit 자체가 테스트 보강이다. 추가 12 케이스가 보호하는 reducer
가드:

1. `tab/set` 동일 탭 → reference 보존 (`if (state.tab === action.tab) return state`)
2. `subscribe` 중복 → reference 보존 (`includes` 가드)
3. `unsubscribe` 미구독 → reference 보존 (`!includes` 가드)
4. `page/set` 음수 → 0 클램프 (`Math.max(0, action.page)`)
5. `page/prev` 0 → 0 유지 (`Math.max(0, state.page - 1)`)
6. `progress/set` >1 → 1 클램프
7. `progress/set` <0 → 0 클램프
8. `press/open` → progress=0, currentInTab=1 강제 reset
9. `press/open` → subscribed reference 보존 (touch 안 함)
10. `subscribed/hydrate` → 다른 6 개 필드 모두 보존
11. `field-tab/advance-current` → opened/subscribed/tab/page 보존
12. unknown action → `default: return state` 가 identical reference 반환

1·2·3·9·12 는 단순 `toEqual` 이 아니라 `toBe` 로 reference equality 까지
검사 — reducer 가 무의미한 새 객체를 만들지 않는지(불필요 re-render
유발 방지) 회귀 막는 안전망.

### 불필요한 추상화
- 가짜 액션 도우미(`makeAction(type)`) 같은 헬퍼는 만들지 않았다 — 한
  곳에서만 쓰는 unknown action 캐스트는 `as never` inline 한 줄이면
  충분.
- 시드 state 도 매번 `{ ...initialNewsstandState, ... }` 로 inline —
  케이스마다 시드하는 필드가 다르고, 공통 헬퍼로 묶으면 오히려 어떤
  필드를 시드하는지 가독성이 떨어진다.

### 기타 메모
- reducer 의 `default` 케이스가 `return state` 라 unknown 액션이
  reference 보존을 보장한다. React 의 `useReducer` 가 next === prev
  일 때 re-render 를 skip 하므로, 이 경로가 깨지면 원인 추적이 까다로운
  성능 회귀를 부른다 — 캐스트 한 줄로 묶어둘 가치 있음.
- `tab/set` 동일 탭 가드가 깨지면 page 가 매번 0 으로 리셋되는 실버그가
  된다 (탭 클릭 핸들러가 idempotent 하지 않게 됨). 케이스 #1 가 이걸
  보호한다.
- press/open 이 subscribed 를 reference 그대로 통과시키는 것은 spread
  copy 의 자연 결과지만 (`...state`), 미래에 정렬/dedupe 같은 로직이
  press/open 안에 끼어들면 깨진다. 케이스 #9 가 회귀 신호.
