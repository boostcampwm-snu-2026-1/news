# Commit 12 — feat: #12 접근성 마감

- Feature: #12 접근성 마감
- Type: feat

## 점검 결과

### 스펙 합치
§8 Accessibility notes 항목별 점검:
- ✅ Tab bar `role="tablist"` / `role="tab"` / `aria-selected="true"` — 이미 #7 에서.
- ✅ Chevron `<button>` + `aria-label="이전 페이지" / "다음 페이지"` + disabled — #9.
- ✅ Subscribed-count badge `aria-label="구독 중인 언론사 N곳"` — #7.
- ✅ Hover-only controls (subscribe pill) 도 keyboard focus(:focus-within) 노출 — #8 GridCell.
- ✅ Ticker pause on hover/focus + prefers-reduced-motion 무력화 — #6.
- 컬러 콘트라스트 AA: 본 commit 에서 footnote 색 `--c-mute` (12px) → `--c-sub` 변경. CLAUDE.md "mute 는 14px+ 에서만" 룰 준수.

### CLAUDE.md 규칙
보강 항목:
- 캔버스 wrapper `<div>` → `<main aria-label="뉴스스탠드">` — landmark 부여.
- Header 의 "뉴스스탠드" `<span>` → `<h1>` (페이지 heading).
- PressOpen 의 headline `<div>` → `<h2>` (각 outlet open 시의 article heading).
- imageBox 에 aria-hidden="true" — placeholder text "headline image" 가 스크린 리더에 노이즈.
- Chevron focus-visible : color ink 로 환원 + accent ring 2px (정상 시야 보임). disabled 시 opacity 0 + pointer-events none 으로 focusable X.
- GridCell focus-visible : inset accent ring 2px — 어느 셀에 키보드 focus 인지 명확.

### 회귀
- main / h1 / h2 변경은 시멘틱만 — 시각 차이 없음 (margin: 0 명시로 reset 영향 차단).
- focus-visible 의 ring 은 정상 마우스 사용 시 안 보임 (브라우저 휴리스틱).
- Chevron disabled 시 ring 은 안 뜸 (pointer-events none 이라 focusable X).
- 빌드/lint 그대로 통과.

### 테스트
- 키보드 only flow:
  1. Tab → 탭바 의 첫 탭 → 두 번째 → 배지
  2. Tab → viewer 토글 → list/grid
  3. Tab → 그리드 첫 셀 (focus-visible ring + pill 노출)
  4. Enter → opened 진입
  5. opened 안에서 Tab → field-tab → subscribe pill
  6. Tab → chevron (focus-visible ring)
- 스크린 리더: main → h1 "뉴스스탠드" → 탭바 → 그리드 셀 (각각 outlet 이름).
- prefers-reduced-motion 매체 쿼리 활성화 → ticker / progress 자동 정지.

### 불필요한 추상화
없음. 변경은 모두 기존 컴포넌트 안 마크업/CSS 의 작은 보강.

### 기타 메모
- footnote 색 변경은 spec 의 "mute" 와 CLAUDE.md 의 "mute 14px+" 가 충돌하는 케이스 — CLAUDE.md (영구 규칙) 가 우선. css 에 짧은 주석으로 의도 기록.
- focus-visible 은 브라우저 휴리스틱에 의해 키보드 trigger 시만. 마우스 클릭 시는 안 뜸 → spec 의 "no hover effect on cell except pill" 시각 일관성 유지.
- accent ring 사용은 CLAUDE.md "accent 는 두 곳" 룰 의 정신과 충돌하는 듯 보이나, focus-ring 은 사용자 보조 신호이지 컨텐츠 강조가 아님 — 합리적 예외. 엄격히 룰 적용하면 focus-ring 을 ink 로 변경 가능.
