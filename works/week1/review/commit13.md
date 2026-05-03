# Commit 13 — feat: #13 테스트

- Feature: #13 테스트
- Type: feat

## 점검 결과

### 스펙 합치
plan 의 검증 항목:
- 리듀서: 구독/해지/페이지네이션/탭 전환/progress 오버플로 — 모두 케이스화 (12 테스트).
- 핵심 hover-state 1~2건 — SubscribePill 의 클릭 + stopPropagation 테스트 3건.

총 15/15 통과.

### CLAUDE.md 규칙
- 테스트 파일이라 시각/모션/a11y 룰 직접 점검 대상 아님.
- Reducer 케이스에서 `subscribed` 가 ALL_PRESS 순서가 아닌 추가 순서를 보존하는지 명시 검증 (`#10` 의 visible 정렬과 일관).

### 회귀
- 신규 테스트만 — 기존 코드 영향 없음.
- `npm test` 가 더 이상 `--passWithNoTests` 가짜 통과 아닌 실제 테스트 통과.

### 테스트 (자기 자신)
- `vitest run` 1초 미만 종료. jsdom 환경, @testing-library/react + user-event.

### 불필요한 추상화
- 테스트 fixture 헬퍼 만들지 않음. seeded state 는 인라인 spread 로 명시 — case 수가 작아 충분.
- snapshot 테스트 사용 안 함 — 행동 검증 우선.

### 기타 메모
- 커버 안 한 영역: useInterval timing (fake timers 필요), useReducedMotion (matchMedia mock), Newsstand 통합 테스트 (큰 컴포넌트라 cost 대비 리듀서 단위가 더 효율). 향후 wave 에서 보강 가능.
- SubscribePill 의 stopPropagation 테스트는 GridCell 의 셀 클릭 → opened 분기와의 분리를 검증 (셀 안 pill 만 누르고 셀 자체는 안 열려야 함).
