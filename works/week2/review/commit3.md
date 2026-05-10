# Commit 3 — selectors 분리 + 단위 테스트

- Feature: #3 selectors 분리 + 단위 테스트
- Type: refactor

## 점검 결과

### 스펙 합치
spec/week2/spec.md 의 *엄격한 설계 과정* 미션의 후속 — 설계 문서(#1, #2) 가
파생 상태 8 개를 표로 정리한 내용을 그대로 순수 함수로 옮겼다. 도메인 행동
규약(섹터=카테고리, count=catOutlets.length)도 유지. 화면/리듀서 동작은
그대로 (refactor only).

### CLAUDE.md 규칙
- 컬러/선/그림자/그라디언트: 코드 색·스타일 변경 없음 — 해당 없음.
- 타이포: 변경 없음.
- 모션/리듀스드 모션: useInterval 호출은 그대로 두고 입력만 selector 결과로
  치환 — 동작 동일.
- a11y: 변경 없음 (props/aria 라벨 동일).
- 본문 텍스트 ink, accent #7890E7 두 곳 가드: 코드 변경 없음 → 해당 없음.

### 회귀
Newsstand 의 derive 로직을 selector 호출로 1:1 치환했다. 기존 useMemo 의
의존성 배열은 그대로 (state.tab/subscribed, visible/safePage, visible/tabKey)
유지. PER_PAGE 상수는 selectors.ts 로 이동 (Newsstand 에서는 더 이상 필요
없음). 페이지네이션 useEffect 의 가드(`state.page > lastPage`)는 동일.

검증:
- `npx tsc --noEmit` — exit 0
- `npm test` — 34 tests passed (기존 reducer 12 + SubscribePill 3 + 신규
  selectors 19)
- 시각적 회귀: derive 결과가 동일하므로 화면 동작 동일.

### 테스트
selectors.test.ts 신규 19 케이스:
- getVisible: all 모드 reference 보존, sub 모드 순서 보존, 빈 subscribed,
  unknown id 필터링
- getLastPage: 0/부분/완전/오버플로 경계
- getSafePage: 양쪽 클램프
- getPageItems: 첫 페이지·마지막 부분 페이지
- getCatOutlets / getCurIdxInCat / getCurrentInTab / getCount: 기본 동작 +
  -1 → 1 변환 + count floor=1
- findNextCategoryWithOutlets: 다음 카테고리 / 끝 wrap / 빈 visible /
  하나만 있을 때 자기 자신 return

엣지케이스 (구독 해지로 visible 축소, opened 가 visible 에 없는 경우 등) 는
다음 wave 의 #6 시나리오 통합 테스트에서 다룬다.

### 불필요한 추상화
selectors 9 개는 모두 두 곳 이상에서 쓰일 후보다 (selectors.test 와 Newsstand,
이후 #6 시나리오 테스트, #8 키보드 단축키 핸들러). 한 곳 전용 헬퍼는 만들지
않았다. PER_PAGE 도 셀렉터의 입력이라 같이 옮겼다.

### 기타 메모
- selectors 는 인자에 state 를 통째로 받는 형태가 아니라 필요한 부분만 받는다
  (visible/tabKey 등). 테스트 시 가짜 state 전체를 만들지 않아도 되어 가볍다.
- `getVisible` 의 all 모드는 입력 배열 reference 를 그대로 반환 — useMemo 가
  새 배열을 만들지 않아 PressGrid 재렌더 발생을 막는 데 유리.
- findNextCategoryWithOutlets 가 "하나만 있을 때 자기 자신 return" 한다는 사실
  (visible.some 이 from 자신의 카테고리도 매치하니까) 을 테스트로 명시했다 —
  Newsstand 의 useInterval 분기에서 이 동작에 의존한다 (catOutlets 끝 + 그
  카테고리만 visible 일 때 같은 카테고리 첫 outlet 으로 wrap).
