# Commit 14 — fix: #14 셀 hover 토글 버그 fix

- Feature: #14 셀 hover 토글 버그 fix
- Type: fix

## 점검 결과

### 스펙 합치
- §6.4 의 "Cell hover: replace wordmark with subscribe/unsubscribe pill" 의 의도 정확화:
  - 같은 전체 탭 안에서도 이미 구독한 셀은 hover 시 `해지하기`, 구독 안 된 셀은 `구독하기`.
  - 이전 구현은 tab 단순 분기였어서, 전체 탭에서는 구독한 셀도 항상 `구독하기` 라 토글이 안 됐다.
- §8 a11y "Hover-only controls (subscribe pill) must also appear on keyboard focus" — 키보드 사용자도 셀에 Tab 으로 focus → pill 노출. 이건 그대로 유지.

### CLAUDE.md 규칙
- accent / 1px / 그림자 / 그라디언트 룰 변경 없음.
- a11y 의 "키보드 focus 노출" 룰은 `:focus-within` → `:focus-visible` + `:has(:focus-visible)` 로 정밀화.

### 회귀
- 마우스 클릭 후 pill 이 focus 를 잡아도 `:focus-visible` 매치 안 됨 (브라우저 휴리스틱) → 마우스 떠나면 hover 상태 정상 풀림.
- 키보드 Tab 으로 셀 진입 → 셀 자체 `:focus-visible` 매치 → pill 노출. Tab 한 번 더 → pill button focus → `.cell:has(:focus-visible)` 매치 → 그대로 노출.
- `tab` prop 은 시그니처 보존(다른 사용처 가능성). 동작에서는 미사용.

### 테스트
- 시각: 그리드 셀 hover → +구독하기 → 클릭 → pill 이 -해지하기 로 즉시 변경 → 마우스 떠남 → wordmark 복귀 → 다시 hover → -해지하기 표시.
- Reducer 테스트는 기존 #13 그대로.

### 불필요한 추상화
없음. CSS 4 줄 + tsx 2 줄 변경.

### 기타 메모
- `:has()` selector 는 모던 브라우저 (Chrome/Edge/Safari/Firefox 121+) 모두 지원. 데스크톱 우선 프로젝트라 안전.
- `tab` prop 을 굳이 유지한 이유: PressGrid 가 여전히 `tab` 을 전달하고 있어 시그니처 깨면 caller 도 수정해야. 한 commit 안에서 최소 변경 원칙.
