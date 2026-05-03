# Commit 17 — fix: #17 리스트 뷰 자동 outlet 전환 + 카운트 정확

- Feature: #17 리스트 뷰 자동 outlet 전환 + 카운트 정확
- Type: fix

## 점검 결과

### 스펙 합치
- §6.9 progress 동작 정확화:
  - currentInTab + 1 > count → 다음 카테고리.
  - 마지막 카테고리(지역)에서 다시 카운트 도달 → 같은 outlet loop 가 아니라 visible 배열의 다음 outlet 으로 자동 전환 (frame 6 의 "프로그레스 완료 직전. 완료 시 다음 언론사로 자동 전환" 의도 정확 매칭).
  - 마지막 outlet 에서는 첫 outlet 으로 wrap.
- §6.10 의 list / headline / count 표시: PressOpen 이 articles.json 에 데이터가 없는 outlet 에 대해 `buildDummyCategoryArticles` 폴백 사용 → 모든 outlet × 모든 카테고리 에서 정상 list 표시. 섹터(field-tab) 클릭 시 그 카테고리의 dummy 로 즉시 갱신.
- count 폴백을 1 → `DEFAULT_CATEGORY_COUNT` (= 81) 로 — Newsstand 의 progress tick 비교값과 PressOpen 의 표시값 일치.

### CLAUDE.md 규칙
- accent / 1px / 그림자 / 그라디언트 / 모션 룰 모두 그대로.
- a11y 도 그대로 (FieldTab 의 role/aria-selected 영향 없음).

### 회귀
- #11 의 chevron outlet nav (수동 prev/next) 도 그대로 작동 — 자동 전환과 충돌 없음.
- 타이머 자동 전환은 reduced motion 시 멎음 (`isOpened && !reduced` 가드 그대로).
- 기존 articles.json 의 SBS Biz / 아시아경제 데이터는 fallback 안 타고 정확 데이터 사용.

### 테스트
- 시각:
  1. 셀 클릭 → list 진입. 6초 후 currentInTab 1 → 2.
  2. 섹터 클릭 (예: 종합/경제 → IT) → headline + list 즉시 갱신.
  3. 마지막 카테고리(지역) 에서 카운트 81 도달 → 다음 outlet 의 primary category 로 자동 전환 (헤더 wordmark 도 변경).
  4. 마지막 outlet 도달 → 첫 outlet 으로 wrap.
- 시뮬레이션 빠르게 보고 싶으면 `count` 를 잠깐 작게 (예: 3) 로 바꿔 테스트 후 복구.

### 불필요한 추상화
- next-outlet 계산은 useInterval cb 안에 인라인 — 한 곳에서만 쓰임.
- count 계산도 한 줄 (`?? DEFAULT_CATEGORY_COUNT`).

### 기타 메모
- visible 배열은 현재 탭 (전체 / 구독) 스코프 그대로. 구독 탭에서 자동 전환 시 구독 outlets 끼리만 순환.
- chevron 의 의미 분기 (#11) 와 자동 전환 동시 작동: chevron 으로 수동 이동 + 6초 타이머는 자동. progress reset 은 press/open 액션 안에 이미 포함.
- PressOpen 의 cat 폴백이 `??` 로 깔끔. 이전엔 cat?.count?? 1 식으로 다중 옵셔널이라 가독성 떨어짐.
