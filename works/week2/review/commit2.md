# Commit 2 — 상태 흐름 + 액션 다이어그램 설계 문서

- Feature: #2 상태 흐름 + 액션 다이어그램 설계 문서
- Type: docs

## 점검 결과

### 스펙 합치
spec/week2/spec.md 의 *상태 흐름 설계 필수* 미션을 충족한다. NewsstandState
필드, 13 개 액션, 8 개 파생 상태, 5 개 사이드이펙트, 3 개 시나리오 trace 를
실제 코드(`src/state/types.ts`, `src/state/newsstandReducer.ts`,
`src/components/Newsstand/Newsstand.tsx`)에서 직접 가져와 정리했고, PR 본문에
인용 가능한 markdown + Mermaid 형식이다.

### CLAUDE.md 규칙
코드 변경 없음 — 디자인 토큰·a11y·타이포 규칙 적용 대상이 아니다. 문서 단독
변경이라 컬러·선·그림자 가드도 무관.

### 회귀
없음. `src/` 와 `works/week2/plan.md` 모두 손대지 않았고, 새 파일 두 개만
추가했다.

### 테스트
이 문서 자체는 테스트되지 않지만, 본 문서가 정의한 액션 효과와 시나리오
trace 가 다음 wave 에서 자동 검증된다:

- #5 (리듀서 엣지케이스 보강 테스트) — §2 액션 표의 idempotency / clamp /
  reset 부가효과가 단위 테스트로 보호된다.
- #6 (selectors/시나리오 통합 테스트) — §4 파생 상태 표와 §6 시나리오 a/b/c
  가 selectors 단위 + 시나리오 통합 테스트의 케이스 시드가 된다.

### 불필요한 추상화
해당 없음. 단일 markdown 한 파일이고 다이어그램도 Mermaid 한 블록이라 분리
대상이 없다.

### 기타 메모
- §1 에서 `currentInTab` 필드가 reducer 에 있지만 화면에 실제로 쓰이는 값은
  Newsstand 의 catOutlets 기반 파생값이라는 사실을 명시했다 — #3 selectors
  분리 시 해당 필드를 reducer 에서 제거할지 검토 가치가 있다.
- §5 에서 자동 진행이 reducer 액션 단일이 아니라 useInterval + dispatch
  조합임을 표시했다 — #4 의 `useAutoAdvance` 훅 분리 근거.
- §1 에서 `viewer` 가 reducer 밖 useState 인 이유와 옮겨야 할 시점도
  같이 적어두어 향후 결정 시 참고할 수 있게 했다.
