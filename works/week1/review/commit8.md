# Commit 8 — feat: #8 그리드 + 구독

- Feature: #8 그리드 + 구독
- Type: feat

## 점검 결과

### 스펙 합치
- §6.4 그리드: 930×388 (`.contentArea`), bg `--c-line`, border 1px line, `display: grid; grid-template-columns: repeat(6, 1fr); rows: repeat(4, 1fr); gap: 1px`. gap 1 + bg line = divider 라인 효과 — spec 그대로.
- 셀: bg card, hover 시 bg soft + wordmark 숨기고 SubscribePill 노출 (§6.4 + §6.6). hover/focus parity (`:hover, :focus-within, :focus-visible`).
- SubscribePill (§6.6): height 28, padding 0 12, r-pill, bg card, 1px line border, text 12/500 sub, leading plus/minus icon 10×10 stroke sub 1.3, shadow `--sh-pill` (시스템 유일 그림자).
- §9 의 NewsstandState 그대로 reducer (newsstandReducer.ts) — tab/page/opened/tabKey/progress/currentInTab/subscribed.
- 액션:
  - tab/set: 페이지 0 으로 reset
  - subscribe/unsubscribe: id 토글
  - press/open: opened 세팅 + 진입 탭 = 해당 outlet 의 primaryCategory + progress 0 + currentInTab 1 (§7 "Click press → opened state")
  - subscribed/hydrate: localStorage 로드용
  - field-tab/* + progress/* 는 #11 에서 사용
- §7 grid tab states:
  - 전체 → ALL_PRESS 72 페이지 3 (구현: page * 24 slice)
  - 구독 → subscribed 만 (희소 그리드는 #10 에서 빈 셀 처리)
- localStorage sync: subscribed 만 저장. mount 시 hydrate (useReducer initializer 로 1회).

### CLAUDE.md 규칙
- accent #7890E7 미사용 (그리드/셀/pill 어디에도). 구독 카운트 배지(#7) + 활성 필드 탭(#11) 만 accent 가 사용처.
- 1px/`--c-line` 만 사용 — grid border + cell divider (gap+bg) + pill border. 다른 두께 없음.
- 그림자: pill 의 `--sh-pill` 한 곳만 — 시스템 룰 정확.
- 그라디언트 미사용.
- 본문 텍스트 ink, secondary (pill 라벨) sub.
- a11y:
  - GridCell 은 `role="button" tabIndex={0}` + Enter/Space 처리.
  - 셀 aria-label = wordmark name.
  - SubscribePill 은 `<button>`, aria-label "구독하기"/"해지하기".
  - hover-only 컨트롤이 :focus-within/:focus-visible 에서도 노출 (§8 룰).

### 회귀
App.tsx 가 직접 mount → Newsstand 컨테이너로 위임. Header/Ticker/TabBar 모두 Newsstand 내부에서 mount (이전 임시 useState 제거). 이전 commit 들 그대로.
PressGrid 의 contentArea 위치는 layout.css 의 `.contentArea` 좌표 (top 256, height 388) 그대로 사용.

### 테스트
- Visual: 6×4 그리드 렌더, 셀 hover → pill, pill 클릭 → 구독 토글 + 배지 카운트 증가, 새로고침 → 구독 복원.
- Reducer 테스트는 #13 에서.

### 불필요한 추상화
- Newsstand.module.css 는 빈 파일 — 향후 컨테이너 자체 스타일 들어가면 채움. 지금은 global .canvas/.contentCol 만 사용.
- ALL_PRESS 는 모듈 상수 (Newsstand 위) — 매 렌더 useMemo 안 함 (정적 import).
- useLocalStorage 는 hook 이 아닌 두 개의 utility 함수 (loadFromStorage / saveToStorage). hook 으로 만들면 `[v, setV]` API 가 reducer 와 어색하게 겹쳐서.

### 기타 메모
- visible 계산은 useMemo — tab/subscribed 변경 시만 recompute.
- press/open 시 진입 탭 (primaryCategory) 은 PressGrid → onOpen(press) 로 press 객체 전달 → reducer 에 primaryCategory 도 함께 dispatch. opened 분기와 PressOpen 컴포넌트는 #11.
- viewer state 는 NewsstandState 에 안 둠 (§9 schema 보존). Newsstand 의 useState 로. #11 에서 reducer 통합 검토 가능.
- subscribed/hydrate 액션은 reducer 에 정의했지만 현재 코드는 useReducer initializer 에서 직접 hydrate — 액션은 외부에서 hydrate 해야 할 미래 케이스 대비.
