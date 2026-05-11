# edge-cases.md — 캐러셀 엣지케이스 정책

> #28 항목. 각 케이스별 현재 구현 정책을 기록한다.

---

## 1. MY뉴스 0개일 때

**상황**: `viewTab === 'subscribed'`인데 구독 언론사가 없는 경우.

**정책**: 캐러셀 대신 빈 상태 메시지를 표시한다.
- "구독한 언론사가 없습니다." 텍스트
- "전체언론사 보기" 링크 버튼 → `viewTab`을 `'all'`로 전환

**근거**: 빈 캐러셀(count=0)을 렌더링하면 Carousel이 `null`을 반환해 레이아웃이 붕괴될 수 있음.

---

## 2. MY뉴스 1개일 때

**상황**: 구독 언론사가 정확히 1개인 경우.

**정책**: 캐러셀은 정상 렌더링되지만 `slide()`에서 `count <= 1` 가드로 슬라이드를 막는다.
- `prevIdx === activeIndex === nextIdx` (모두 같은 인덱스)
- 좌·우 화살표 버튼은 `disabled` 상태
- 자동슬라이드도 `total <= 1` 조건으로 동작하지 않음

---

## 3. 자동슬라이드 중 탭·MY뉴스 전환 시

**상황**: 자동슬라이드가 진행 중에 카테고리 탭 또는 MY뉴스/전체언론사 토글을 전환하는 경우.

**정책**: 타이머 리셋 방식 채택 (일시정지 없음).
- `handleCategoryChange` / `handleViewTabChange`에서 `resetTimer()` 호출 → `timerKey` 증가
- 이전 `setInterval`이 cleanup 되고 새 interval이 처음부터 시작됨
- `activeIndex`도 `0`으로 리셋

---

## 4. featureBox 없는 언론사

**상황**: `frontpages.json`에서 `featureBox` 필드가 없는 언론사의 FrontPagePanel.

**정책**: 현재 FrontPagePanel은 featureBox 열을 렌더링하지 않음 (미구현).
- 향후 구현 시 `featureBox` 없으면 해당 열 비어 있는 상태 표시 or 완전히 숨김

---

## 5. 활성 인덱스가 마지막일 때 "다음" 동작

**정책**: 순환 (`% count`).
- 마지막 패널에서 "다음" → 첫 번째 패널로 이동
- 첫 번째 패널에서 "이전" → 마지막 패널로 이동
- 자동슬라이드도 동일하게 순환

---

## 6. 썸네일 띠 클릭과 자동슬라이드 충돌

**상황**: 자동슬라이드 직전에 썸네일을 클릭하는 경우.

**정책**: 썸네일 클릭(`handleStripSelect`) 시 `resetTimer()` 호출 → interval 재시작.
- 클릭 시점에서 interval이 새로 시작되므로 충돌 없음
- Carousel의 `sliding` 상태가 `true`인 동안 `slide()` 호출이 들어와도 `if (sliding) return`으로 무시됨
