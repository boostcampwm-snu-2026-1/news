# Commit 10 — feat: #10 구독 탭 희소 그리드

- Feature: #10 구독 탭 희소 그리드
- Type: feat

## 점검 결과

### 스펙 합치
- §7 "내가 구독한 언론사 → sparse grid, only subscribed cells filled; empty cells white" — 그대로.
- PressGrid 가 항상 24 슬롯을 그림. items.length < 24 면 나머지는 `<div className={styles.cellEmpty} />` (bg white). 그리드 라인 + 빈 셀 색이 frame 3 (pd-3) 의 레이아웃과 일치.
- 빈 셀은 hover 효과 없음 (단순 div, GridCell 의 :hover 룰 미적용).
- 구독 탭의 정렬: subscribed 순서(추가 순서) 그대로. ALL_PRESS 순서가 아니라 사용자 액션 순서. frame 3 의 첫 셀이 활성 hover 상태 인 것 (사용자가 방금 추가한 outlet 일 가능성 高) 과 일관.

### CLAUDE.md 규칙
- accent / 1px / 그림자 / 그라디언트 룰 모두 그대로 (이 commit 은 슬롯 placeholder 와 visible 정렬만 변경).
- 빈 셀 aria-hidden="true" — 스크린 리더가 빈 div 로 announce 하지 않게 (§8 a11y 보강).

### 회귀
- 전체 탭의 마지막 페이지 (page 2) 는 24 outlets 로 가득 차 있어 차이 없음.
- 만약 page 3 의 outlets 가 24 미만으로 줄어들면 (현 데이터 정확히 24 이므로 해당 없음) 자동으로 빈 셀 채움 — 미래 안전망.
- visible 계산이 subscribed 순서가 됨에 따라 #9 의 lastPage 계산도 동일 (visible.length 동일).

### 테스트
- Visual: 구독 0개 → 빈 그리드 (24 white 셀 + 라인). 1개 추가 → 첫 셀만 채움. 9개 → frame 3 과 동일.
- 구독 탭에서 hover → "− 해지하기" pill 노출 (#8 에서 이미 구현된 GridCell 의 tab="sub" 분기).
- 새로고침 → 구독 순서 그대로 복원 (localStorage subscribed 배열 순서 보존).

### 불필요한 추상화
- SLOT_COUNT 상수만 추가. PressGrid 가 sparse 옵션 같은 prop 안 받음 — 항상 24 슬롯이 안전한 default.

### 기타 메모
- visible 정렬을 subscribed 순서로 바꾼 게 #8 의 visible 계산 한 줄 변경. ALL_PRESS 순서로 sort 하고 싶으면 한 줄 변경으로 가능.
- 빈 셀 placeholder 의 key 는 인덱스 기반 (`empty-${i}`) — items 길이가 변하면 React 가 빈 셀을 reuse 안 하지만 시각 차이 없음.
- frame 3 의 9 셀 배치는 6+3 (행 0 가득 + 행 1 의 첫 3) 인데, items.length=9 일 때 grid 가 자동으로 행 0 6개 + 행 1 첫 3개 채움 — spec 일치.
