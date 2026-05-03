# Commit 7 — feat: #7 TabBar

- Feature: #7 TabBar
- Type: feat

## 점검 결과

### 스펙 합치
- §6.3 그대로:
  - row, space-between, height 24 (`.tabbarRow` y=208).
  - 좌측 gap 24, 우측 gap 8.
  - "전체 언론사" / "내가 구독한 언론사" 16/700 active, 16/500 mute inactive.
  - badge: 20×20 r-badge, bg `--c-accent`, color `--c-badge-ink` (rgba(255,255,255,0.7)), 12/500.
  - 우측 list/grid icon 24×24, ink if active, mute if not.
- 시멘틱: `role="tablist"`, `role="tab"`, `aria-selected={active}` (§8 a11y).
- 배지에 `aria-label="구독 중인 언론사 N곳"` (§8 a11y).
- viewer 토글은 `aria-pressed` + `aria-label` (개별 동작 — tab 셈은 아니라).

### CLAUDE.md 규칙
- accent #7890E7 = badge 의 bg 한 곳. CLAUDE.md 가 정한 accent 의 두 사용처 (구독 카운트 배지 + 활성 탭 fill) 중 첫 번째 정확히 일치. 활성 탭 fill (필드 탭) 은 #11 에서.
- 1px/#D2DAE0 안 씀. 그림자/그라디언트 없음.
- mute (#879298) 는 inactive 탭 라벨 (16px+) 에 적용 — WCAG AA 통과 사이즈 (§8 노트).
- list/grid icon 의 stroke 는 1.5 — 본 요소는 fill+line 혼합이라 chevron(1.4) 룰과 별개. 추후 규격화 가능.

### 회귀
App.tsx 에 useState 로 임시 mount (#8 reducer 로 wire 예정). subCount=0 hard-coded — 실제 구독 상태는 #8 에서 계산.

### 테스트
- 키보드: Tab 으로 button 포커스, Enter/Space 로 클릭.
- aria-selected 토글 확인.
- Visual: active 탭 ink/700, inactive 탭 mute/500.

### 불필요한 추상화
- TabButton, ViewerButton, ListIcon, GridIcon 모두 TabBar.tsx 안 함수. 다른 곳 안 씀.
- aria-label 은 호출자 책임으로 노출 (소비처에서 라벨 변경 가능성 위해).

### 기타 메모
- spec 의 "list-view icon ink if active" — viewer 가 "list" 일 때 list 아이콘이 ink. 기본은 grid 라 grid 아이콘이 ink, list 가 mute.
- frame 4 의 두 아이콘 순서 (left list / right grid) 그대로 따름.
- 임시 mount 의 `subCount=0` 은 #8 에서 reducer 의 `subscribed.length` 로 교체.
- viewer 토글은 #11 list 뷰 만들기 전까지 동작 효과 없음 (UI 만 변함).
