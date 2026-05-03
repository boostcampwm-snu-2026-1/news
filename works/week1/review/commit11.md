# Commit 11 — feat: #11 리스트 뷰

- Feature: #11 리스트 뷰
- Type: feat

## 점검 결과

### 스펙 합치
- §6.9 Field tab:
  - height 40, bg `--c-soft`, border 1px line.
  - 6 탭 (CATEGORY_ORDER) flex 1, padding 0 16, right-border 1px line, 마지막 탭은 right-border none.
  - inactive 14/500 sub, active bg `--c-accent` + label 14/700 white + counter `1/81` mono 12/500 white(0.7 dim on "/N").
  - progress overlay (`--c-accent-deep`) 좌→우 transition width 100ms linear, 6000ms 누적 → 100% 도달 시 currentInTab++, overflow 시 다음 카테고리 (loop).
- §6.10 Opened press:
  - 930×388 card, 1px line border (top 없음 — field tab 이 owner).
  - inner padding 24 32.
  - head: wordmark scale 1.05 + edit time (12/500 sub, tabular-nums) + subscribe pill, gap 16 align center.
  - body row: gap 24, marginTop 4.
    - LEFT 340px: image box 340×188 (linear-gradient 135deg #EFF1F6→#DDE3EC + 1px line border), placeholder text "headline image". headline 16/700 ink line-height 1.45.
    - RIGHT flex 1: 6 list items 14/500 ink line-height 1.5, leading 3×3 ink square translateY -4. footnote (mt auto) 12/500 mute "{press} 언론사에서 직접 편집한 뉴스입니다."
- §7 진입 탭 = primaryCategory, progress 0.
- §9 progress drives field-tab fill, setInterval 100ms over 6000ms — useInterval 의 100ms tick 으로 구현. reduced motion 시 tick null (자동 진행 정지).
- chevron: opened 상태에서는 visible 배열의 prev/next outlet 으로 이동 (frame 6 의 "다음 언론사 자동 전환" 모티브의 수동 변형). disabled 조건도 그에 맞게.

### CLAUDE.md 규칙
- accent #7890E7 사용처 두 번째 적용: active field tab fill — CLAUDE.md 룰 정확. accent-deep #4362D0 은 progress overlay (스펙 §2 / §6.9 명시).
- 1px / `--c-line` 만: field tab border, opened body border, image box border, tab divider. 다른 두께 없음.
- 그라디언트 단 한 곳: image box `linear-gradient(135deg,#EFF1F6,#DDE3EC)` — CLAUDE.md 가 명시 허용한 단 하나의 그라디언트.
- 그림자 추가 없음. (subscribe pill 의 sh-pill 만 그대로.)
- a11y: FieldTab 도 `role="tablist"/tab"` + `aria-selected`. progress overlay aria-hidden. bullet aria-hidden.
- prefers-reduced-motion: useInterval 에 null 전달 → 자동 회전 안 함. transition width 는 reset.css 의 0ms 가드로 즉시 변경.

### 회귀
- Newsstand 가 opened 분기. 그리드와 리스트 뷰가 같은 contentArea 슬롯 공유 — y 좌표/높이 동일 (388).
- TabBar 에서 tab 변경 시 isOpened 면 press/close 먼저 dispatch (그리드로 복귀 후 탭 변경).
- chevron 의미가 opened 일 때 outlet 간 이동으로 변함 — page/{prev,next} 와 동일 위치이지만 dispatch target 다름. disabled 조건도 분기.
- 기존 그리드/구독/페이지네이션 모두 그대로 작동.

### 테스트
- Visual: 셀 클릭 → PressOpen, 6초 후 currentInTab 증가, count 도달 시 다음 카테고리.
- 키보드: GridCell Enter → 진입. FieldTab tab 클릭 가능. chevron Tab/Enter.
- reduced motion: FieldTab progress 멎음.
- localStorage: opened 상태와 무관하게 subscribed 만 저장.

### 불필요한 추상화
- PressOpen 안의 head/body 는 단일 컴포넌트. 별도 PressOpenHead/Body 분리 안 함 — 한 곳에서만 쓰임.
- progress tick 로직은 Newsstand 안 useInterval 한 번. 별도 hook (useProgressTick) 안 만듦 — 컨텍스트에 reducer 가 묶여 있어 분리 이득 적음.

### 기타 메모
- viewer 토글은 시각 변경만 (Newsstand state 분기에 영향 없음). spec 의 viewer 의미가 모호해 grid/list 모두 opened state 기반 분기로 통일.
- articles 데이터 없는 outlet 클릭 → byCategory[k] undefined → headlineTitle 폴백 + 빈 list + count 1. progress 6초마다 다음 카테고리로 즉시 넘어감.
- chevron 의 outlet nav 는 visible 배열 (현재 탭 스코프) 안에서만 — frame 6 의 "다음 언론사 자동 전환" 은 수동 chevron 으로 대체. 자동 진행은 currentInTab/카테고리 loop 에 한정.
- bullet 의 translateY(-4px) 는 spec 그대로. 시각 미세 조정은 #12 에서.
