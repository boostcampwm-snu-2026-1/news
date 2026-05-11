# Commit 1 — 컴포넌트 계층 + props 흐름 설계 문서

- Feature: #1 컴포넌트 계층 + props 흐름 설계 문서
- Type: docs

## 점검 결과

### 스펙 합치
`spec/week2/spec.md` 의 미션 1 "엄격한 설계 과정 ... 컴포넌트 계층 점검 및 가이드" 요구를 충족 — Mermaid 트리, 컴포넌트별 책임/props/event 표, 데이터 소유권 경계, props 흐름 다이어그램, 책임 경계 한 단락까지 5개 섹션으로 사후 설계를 명문화했다. 트리/책임은 `src/main.tsx`, `src/App.tsx`, `src/components/**` 를 직접 읽어 추측 없이 작성.

### CLAUDE.md 규칙
코드 변경 없음 (`src/` 미수정). 디자인 토큰(#7890E7 사용처 2곳·1px·#D2DAE0·그림자/그라디언트 금지·letter-spacing 등) / a11y / 모션(티커 3.2s, FieldTab 6s, prefers-reduced-motion) 규칙은 이 commit 의 검토 대상 아님 — 문서가 그 규칙들과 충돌할 표면 자체가 없다. 커밋 메시지 형식(`docs: #1 ...` + 확인내용/이해 안 됐던 부분 placeholder 두 줄) 준수.

### 회귀
코드 변경 없음 → 인접 컴포넌트·기존 동작 영향 없음. 빌드/테스트 영향 없음.

### 테스트
문서에는 테스트가 붙지 않는다. 문서가 기술하는 데이터 흐름·소유권은 다음 wave 의 `src/state/selectors.ts` 단위 테스트(#3, #6) 와 `src/components/**` a11y 테스트(#7) 에서 자동 검증된다. 문서가 코드와 어긋나면 #3~#7 테스트가 깨지면서 드러난다.

### 불필요한 추상화
해당 없음 — 새 추상화/모듈 없음. 문서만 추가.

### 기타 메모
- 작성 중 발견한 특이사항: `viewer` 상태가 reducer 바깥의 `useState<ViewerId>` 로 살아있고 spec 9장 `NewsstandState` 에 포함되어 있지 않다 — 의도된 분리(도메인 상태 vs UI 토글). week2 #3 selector 추출 시 viewer 는 selector 입력으로 들어가지 않는다는 신호.
- `GridCell.tab` prop 은 현재 동작에 영향 없음 (subscribed 로 mode 분기) — 컴포넌트 책임 표 비고에 명시.
- `Chevron` 두 개는 grid/open 모드와 무관하게 `Newsstand` 직속으로 항상 렌더되며 `disabled` 만 모드별로 다르게 계산된다 — 이후 wave 에서 키보드 단축키(#8) 도 같은 분기 패턴을 따라야 한다는 단서.
- 본 문서는 PR 본문에 그대로 인용 가능한 형태(섹션·Mermaid·표) 로 작성됨 — week2 #9 검증 보고서가 이 문서를 직접 링크할 수 있다.
