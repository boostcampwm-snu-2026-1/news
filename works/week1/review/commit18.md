# Commit 18 — fix: #18 리스트 뷰 섹터 = 카테고리 의미 재정의

- Feature: #18 리스트 뷰 섹터 = 카테고리 의미 재정의
- Type: fix

## 점검 결과

### 스펙 합치
- §9 의 `currentInTab` 의미를 "한 카테고리(=섹터) 안에서 현재 outlet 의 1-based 인덱스" 로 재정의. count = 그 카테고리에 속한 visible outlet 수.
- §6.9 의 "If overflow, advance tabKey" 는 그대로 — 단 advance 의 의미가 "다음 outlet (같은 카테고리)" 가 우선, 그 카테고리가 끝나면 다음 카테고리의 첫 outlet 으로 wrap.
- 사용자 요구 5 가지 모두 커버:
  1. 타이머 후 다음 언론사 (같은 섹터 안)
  2. 섹터 클릭 → 그 섹터의 첫 outlet 으로 useEffect 자동 이동
  3. count = `catOutlets.length`, currentInTab = `curIdxInCat + 1` — 데이터 분포에 따라 자연 변동
  4. 카테고리 외로 안 넘어감 (catOutlets 안에서만 prev/next)
  5. 구독 탭에선 visible 가 구독 outlet 만이라 catOutlets 도 자연 일관

### CLAUDE.md 규칙
- accent / 1px / 그림자 / 그라디언트 / 모션 / a11y 룰 변경 없음.
- Newsstand 는 컨테이너라 규칙 외부.

### 회귀
- chevron 의미가 #11 의 "visible 배열 prev/next outlet" → "catOutlets 안 prev/next outlet" 으로 정밀화. 시각 버튼/위치 동일.
- press/open 액션 그대로 사용 (reducer 변경 없음). 새 액션 안 만듦.
- field-tab/set 은 이제 useEffect 가 잡아 자동으로 catOutlets[0] open 으로 이어짐 — 단순 "tabKey 만 변경" 의 효과는 사라졌지만 사용자 의도와 일치.
- reducer 의 `currentInTab` state 는 더 이상 표시에 안 쓰임 (derived 로 전환). reducer 자체는 그대로 유지 (action 보존, 테스트 그대로 통과).

### 테스트
- 기존 15 테스트 그대로 통과 (reducer 변경 없음).
- 시각:
  1. 그리드 셀 클릭 → list 진입. 그 outlet 의 카테고리 섹터가 active.
  2. 6초 후 같은 카테고리의 다음 outlet 으로 자동 전환.
  3. 다른 섹터 클릭 → 그 섹터의 첫 outlet 으로 즉시 이동 + headline/list 갱신.
  4. chevron prev/next → 같은 섹터 안에서만 이동, 섹터 끝에서 disabled.
  5. 구독 탭 진입 후 같은 동작 — 단 visible 이 구독 outlet 으로 좁아짐.

### 불필요한 추상화
- `findNextCategoryWithOutlets` 만 별도 함수 (한 곳에서만 쓰이지만 가독성 위함).
- 섹터 클릭 → catOutlets[0] 이동 로직은 useEffect 한 줄.

### 기타 메모
- `count = Math.max(1, catOutlets.length)` 은 0/0 division 방지. 카테고리에 outlet 이 0 이면 사실상 진입 못 하지만 UI 가 깨지지 않게 가드.
- useEffect deps 에 `catOutlets` 가 들어가지만 useMemo 로 reference stable — tabKey/visible 변경 시만 새 배열.
- reduced motion 매체 쿼리에서 useInterval null → 자동 전환 멎음. 사용자 chevron 수동 이동만 가능.
