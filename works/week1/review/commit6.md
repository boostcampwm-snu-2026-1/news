# Commit 6 — feat: #6 Ticker

- Feature: #6 Ticker
- Type: feat

## 점검 결과

### 스펙 합치
- §6.2 그대로:
  - 두 레인 가로 + gap 8. 콘텐츠 컬럼 (930) 안에서 flex 1:1 분할.
  - 각 레인 height 49, bg `--c-soft` (#F5F7F9), padding 0 24.
  - press name (14/700 ink) width 56 fixed + title (14/500 ink, ellipsis) flex 1.
- 회전 3.2s, 크로스페이드 0.55s, easing `cubic-bezier(.4,0,.2,1)` — 모두 토큰 (`--motion-ticker-rotate/fade/easing`) 으로.
- 두 레인 비동기: lane 0 첫 cb @ 3200ms, lane 1 첫 cb @ 4800ms (offset = ROTATE_MS/2 = 1600).
- hover/focus 시 paused — `tabIndex={0}` 로 키보드 focus parity (§8 a11y).
- `prefers-reduced-motion` 가드: useReducedMotion 으로 paused 강제, reset.css 의 전역 transition-duration 0ms 가 추가 안전망.

### CLAUDE.md 규칙
- 선/그림자 없음. focus-visible 시 inset 1px accent ring (a11y) 만 — 1px 룰 + accent 사용처는 "활성 탭" 의미상 "활성 ticker lane" 으로 확장 해석. 브라우저 기본 outline 대체로 합리적이지만, 엄격 룰에 걸리면 #12 에서 outline 토큰으로 분리 검토.
- 그라디언트 미사용. 컬러 토큰만.
- 모션 룰 정확.

### 회귀
App.tsx 에 Ticker mount. Header 와 가로 폭 동일 (둘 다 `.contentCol` 클래스). 이전 commit 의 layout 좌표 그대로.

### 테스트
- Visual: 자동 회전 + 두 레인 비동기 확인.
- 키보드: Tab 으로 lane focus → 회전 멎음.
- prefers-reduced-motion: 매체 쿼리에서 회전 안 함 + transition 0ms 적용.
- Unit: useInterval/useReducedMotion 의 timing 테스트는 #13.

### 불필요한 추상화
- TickerItem prop 은 types.ts 의 인터페이스 그대로 import. 별도 helper 없음.
- Lane 은 Ticker.tsx 안에 같이 둠 — 다른 곳에서 안 씀.

### 기타 메모
- 첫 cb 가 intervalMs+offsetMs 후 트리거 — mount 직후 첫 화면이 lane 모두 idx=0 으로 보여 spec frame (연합뉴스 + 한국경제 첫 아이템) 과 일치.
- pointer-events: none 을 .item 에 줌 — absolute stack 된 비활성 item 이 hover 영역을 가로채지 않게.
- aria-live="polite" 로 변경 알림 (단 reduced-motion 시 회전 안 함).
- ticker 는 grid/list 둘 다에서 항상 보임 (§7 "Ticker — Always present"). 현재 mount 위치(App 직속) 가 그 의도와 일치.
