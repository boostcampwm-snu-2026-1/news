# 뉴스스탠드 개발 체크리스트

기획·디자인 문서([design-spec.md](design-spec.md), 뉴스스탠드-기획디자인.pdf)에서 도출한 개발 항목.

체크 형식: `[x]` 완료 / `[ ]` 미완료 / **(주차)** 라벨로 진행 시점 표기.

---

## 1주차 — 정적 레이아웃 + 핵심 인터랙션

### 1-A. 토큰 & 기반

- [x] **(1주차)** CSS variables 토큰 정의 — 컬러 11종, 타이포 6종, 스페이싱 8단 ([styles/tokens.css](../src/styles/tokens.css))
- [x] **(1주차)** 폰트 로딩 — Pretendard(npm) / IBM Plex Mono / Noto Serif KR (Google Fonts)
- [x] **(1주차)** 1280px 고정 콘텐츠 폭 + 175px 좌우 거터 레이아웃 ([components/Newsstand.module.css](../src/components/Newsstand.module.css))
- [x] **(1주차)** 72개 언론사 데이터 시드 ([data/presses.ts](../src/data/presses.ts))

### 1-B. 컴포넌트 (그리드 흐름)

- [x] **(1주차)** `<Header>` — 신문 아이콘 + "뉴스스탠드" 24/700 + 날짜
- [x] **(1주차)** `<Ticker>` — 2 레인, 3.2s 간격 crossfade 회전, `prefers-reduced-motion` 시 비활성
- [x] **(1주차)** `<TabBar>` — 전체/구독 탭 + 구독 수 배지 + 그리드/리스트 뷰어 토글
- [x] **(1주차)** `<PressGrid>` — 6×4, 페이지당 24개, 총 3 페이지
- [x] **(1주차)** `<PressWordmark>` — 이미지 없는 CSS 타이포 기반 로고 (그리드/오픈 공용)
- [x] **(1주차)** `<SubscribePill>` — hover/`:focus-within` 시 "+ 구독하기" / "− 해지하기" 노출
- [x] **(1주차)** `<Chevron>` 좌·우 — 페이지 끝에서 `disabled` (opacity 0, 레이아웃 유지)

### 1-C. 컴포넌트 (오픈 흐름)

- [x] **(1주차)** `<FieldTab>` — 카테고리 6탭, 활성 탭 6초 progress 오버레이
- [x] **(1주차)** `<PressOpen>` — 좌측 이미지 박스 + 헤드라인 + 우측 6행 리스트 + 각주

### 1-D. 상태 & 흐름

- [x] **(1주차)** 앱 상태 최상위 집중 — `tab / page / opened / tabKey / progress / currentInTab / subscribed`
- [x] **(1주차)** 구독 토글 — `Set<PressId>` 기반 add/delete
- [x] **(1주차)** 그리드 → 오픈 전환 — 셀 클릭 시 해당 언론사 primary 카테고리로 진입
- [x] **(1주차)** Progress 드라이버 — `setInterval(100ms) over 6000ms` → `currentInTab++` → 탭 소진 시 다음 카테고리로 순환
- [x] **(1주차)** 페이지네이션 — 전체/구독 탭 모드별 source list 분리, 마지막 페이지 안전 클램프

### 1-E. 디자인 룰

- [x] **(1주차)** accent `#7890E7` 사용처 제한 — 구독 수 배지 / 활성 탭 2곳만
- [x] **(1주차)** 구독 탭에서 빈 셀은 흰 셀로 유지 (그리드 골격 보존)

---

## 2주차 — 설계 강화 + 검증 + 추가 기능

### 2-A. 설계 산출물

- [x] **(2주차)** 상태 흐름도 작성 — 그리드 ↔ 오픈, 탭 전환, progress 순환 시나리오 명시 ([state-flow.md](state-flow.md))
- [x] **(2주차)** 컴포넌트 계층 점검 — 현재 트리에서 props drilling/책임 분리 리뷰 ([state-flow.md](state-flow.md) 마지막 섹션)

### 2-B. 엣지케이스 검증

- [x] **(2주차)** 구독 0개 상태 — 구독 탭 진입 시 빈 그리드 + 안내, 페이지 클램프 동작 ([2-B-1 테스트](../src/test/edge-cases/2-B-1-empty-subscription.test.tsx))
- [x] **(2주차)** 마지막 페이지에서 구독 해지로 페이지 수 줄어드는 시나리오 ([2-B-2 테스트](../src/test/edge-cases/2-B-2-page-clamp.test.tsx))
- [x] **(2주차)** 오픈 상태에서 해당 언론사 구독 해지 시 동작 — "계속 보기" 정책 확정 ([2-B-3 테스트](../src/test/edge-cases/2-B-3-unsub-while-open.test.tsx))
- [x] **(2주차)** progress 도중 카테고리 수동 전환 → 진행도 0 리셋 ([2-B-4 테스트](../src/test/edge-cases/2-B-4-progress-reset.test.tsx))
- [x] **(2주차)** `prefers-reduced-motion` 적용 시 ticker · progress 모두 비활성 확인 ([2-B-5 테스트](../src/test/edge-cases/2-B-5-reduced-motion.test.tsx))
- [x] **(2주차)** 키보드 only — Enter/Space 오픈, pill `<button>` 진입, chevron HTML `disabled` ([2-B-6 테스트](../src/test/edge-cases/2-B-6-keyboard.test.tsx))

### 2-C. 추가 기능 (택 1~2)

- [x] **(2주차)** 구독 정보 localStorage 영속화 ([useSubscriptions](../src/hooks/useSubscriptions.ts) · [2-C-1 테스트](../src/test/edge-cases/2-C-1-localstorage.test.tsx))
- [x] **(2주차)** 그리드 셀 키보드 네비게이션 (방향키 이동 + Enter 오픈) ([GridCell](../src/components/GridCell.tsx) · [2-C-2 테스트](../src/test/edge-cases/2-C-2-grid-keyboard-nav.test.tsx))
- [ ] **(2주차)** 구독/해지 시 토스트 알림 (자동 dismiss)

### 2-D. 품질

- [ ] **(2주차)** 컴포넌트 단위 검증 노트 — 검증 항목/방법/결과를 PR 본문에 첨부
- [ ] **(2주차)** 리팩토링 — `<Newsstand>` 핸들러 분리 (커스텀 훅 또는 reducer 검토)
