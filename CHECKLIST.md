# 뉴스스탠드 구현 체크리스트

디자인 스펙 기반, 작은 커밋 단위로 분리.

---

## Phase 0: 프로젝트 세팅

- [ ] **P0-1** React 프로젝트 초기화 (Vite + TypeScript)
- [ ] **P0-2** 디자인 토큰 CSS 변수 정의 (`color`, `typography`, `spacing`, `radii`)
  - ink, sub, mute, line, soft, card, page, accent, accent-deep, badge-ink, danger
  - font-family: Pretendard, IBM Plex Mono, Noto Serif KR
  - spacing: 4/8/12/16/24/32/40/48/64 기반
  - radii: r-0, r-sub(2), r-pill(14), r-badge(10)
- [ ] **P0-3** 글로벌 리셋 및 기본 레이아웃 (1280px 고정 콘텐츠 폭, 좌우 gutter 175px)
- [ ] **P0-4** 언론사 목업 데이터 정의 (id, name, category, wordmark 속성 등)

---

## Phase 1: 헤더 + 티커

- [ ] **P1-1** `<Header>` 컴포넌트 — 좌측 신문 아이콘 + "뉴스스탠드" (24/700), 우측 날짜 (16/500 sub)
- [ ] **P1-2** `<Ticker>` 2개 레인 레이아웃 — 높이 49, bg soft(#F5F7F9), 언론사명(14/700) + 제목(14/500 ellipsis)
- [ ] **P1-3** `<Ticker>` 자동 롤링 — 3.2초 간격, crossfade 0.55s cubic-bezier, 두 레인 비동기 회전
- [ ] **P1-4** `<Ticker>` 접근성 — hover/focus 시 롤링 정지, `prefers-reduced-motion` 대응

---

## Phase 2: 탭 바 + 뷰 토글

- [ ] **P2-1** `<TabBar>` 레이아웃 — 좌측 "전체 언론사" / "내가 구독한 언론사" 탭 (gap 24)
- [ ] **P2-2** 탭 활성/비활성 스타일 — active: 16/700 ink, inactive: 16/500 mute
- [ ] **P2-3** 구독 카운트 뱃지 — 20x20, r-badge, accent bg, 12/500 white(0.7)
- [ ] **P2-4** 뷰 토글 아이콘 (그리드/리스트) — 24x24, active: ink / inactive: mute
- [ ] **P2-5** `role="tablist"` / `role="tab"` + `aria-selected` 접근성 마크업

---

## Phase 3: 언론사 그리드 (기본 상태)

- [ ] **P3-1** `<PressGrid>` 컨테이너 — 930x388, bg #D2DAE0, border 1px line, CSS grid 6col x 4row gap 1px
- [ ] **P3-2** `<GridCell>` 기본 셀 — bg white, 가운데 정렬, ~154x~96
- [ ] **P3-3** `<PressWordmark>` 컴포넌트 — props 기반 스타일 렌더링 (weight, family, color, italic, underline, tracking, flag 등)
- [ ] **P3-4** 워드마크 세부 처리 — accent char, bg chip(KBS WORLD 등), serif 폰트(朝鮮日報 등), 2줄 줄바꿈, max-width 88%

---

## Phase 4: 그리드 호버 — 구독/해지

- [ ] **P4-1** `<SubscribePill>` 컴포넌트 — h28, px12, r-pill, border 1px line, shadow, 아이콘(+/−) 10x10 + 텍스트(12/500 sub)
- [ ] **P4-2** `<GridCell>` hover 시 워드마크 → 구독 필 교체 (전체 언론사 탭: "+ 구독하기")
- [ ] **P4-3** `<GridCell>` hover 시 해지 필 교체 (내가 구독한 언론사 탭: "− 해지하기")
- [ ] **P4-4** 키보드 focus 시에도 pill 노출 (`:focus-within`)
- [ ] **P4-5** 구독/해지 상태 관리 — `subscribed: Set<pressId>` 토글 로직

---

## Phase 5: 페이지네이션

- [ ] **P5-1** `<Chevron>` 좌/우 버튼 — 24x40, stroke mute 1.4, 위치 left 103 / right 1153, top 430
- [ ] **P5-2** 비활성 상태 — `opacity: 0` (레이아웃 유지, 시각 제거)
- [ ] **P5-3** 전체 언론사 3페이지 페이지네이션 로직 (24개/페이지, 총 72개)
- [ ] **P5-4** 구독 탭 동적 페이지 수 계산 (구독 수 / 24)
- [ ] **P5-5** `aria-label="이전 페이지"` / `"다음 페이지"` + disabled 처리

---

## Phase 6: 리스트 뷰 (언론사 선택 → 기사 목록)

- [ ] **P6-1** `<PressOpen>` 레이아웃 — 930x388, card bg, 1px line border (상단 없음), inner padding 24 32
- [ ] **P6-2** 헤드 로우 — 언론사 워드마크(1.05배) + 편집시각(12/500 sub) + 구독 pill
- [ ] **P6-3** `<FieldTab>` 카테고리 탭 스트립 — h40, bg soft, 6탭, 각 flex 1, 구분선 1px
- [ ] **P6-4** `<FieldTab>` 활성 탭 스타일 — fill accent(#7890E7), 텍스트 14/700 white
- [ ] **P6-5** `<FieldTab>` 프로그레스 바 — accent-deep(#4362D0) 오버레이, 6초 linear 0→100%
- [ ] **P6-6** 탭 카운터 — "1 / 81" IBM Plex Mono, tabular-nums, 숫자/슬래시 투명도 차등
- [ ] **P6-7** 기사 본문 좌측 — 헤드라인 이미지 박스(340x188, gradient placeholder) + 헤드라인 텍스트(16/700)
- [ ] **P6-8** 기사 본문 우측 — 6개 기사 리스트(14/500, bullet 3x3 square) + 하단 각주(12/500 mute)

---

## Phase 7: 자동 전환 로직

- [ ] **P7-1** 프로그레스 타이머 — `setInterval(tick, 100)` / 6000ms 주기
- [ ] **P7-2** 탭 내 기사 순환 — `currentInTab++`, count 초과 시 다음 카테고리 탭 이동
- [ ] **P7-3** 전체 카테고리 소진 시 첫 탭으로 루프
- [ ] **P7-4** hover/focus 시 타이머 일시정지
- [ ] **P7-5** `prefers-reduced-motion` 시 자동 전환 비활성화

---

## Phase 8: 상태 통합 + 마무리

- [ ] **P8-1** `<Newsstand>` 루트 상태 통합 — tab, page, opened, tabKey, progress, currentInTab, subscribed
- [ ] **P8-2** 그리드 ↔ 리스트 뷰 전환 애니메이션
- [ ] **P8-3** 뷰 토글(그리드/리스트 아이콘) 동작 연결
- [ ] **P8-4** 전체 접근성 QA — 키보드 내비게이션, 스크린리더, WCAG AA 색상 대비
- [ ] **P8-5** 반응형 fallback — 1280px 미만 시 스케일 처리
