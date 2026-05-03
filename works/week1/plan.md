# Week 01 — 뉴스스탠드 데스크톱 웹 (그리드 + 구독 + 리스트 뷰)

- Status: in-progress
- Spec: `spec/week1/` (기획디자인 PDF + 디자인시스템 PDF)
- Started: 2026-05-03
- Completed: —

## 목표

데스크톱 우선(1280×720) 한국형 뉴스 포털 1차 구현. 6×4 언론사 그리드 + 구독/해지 + 자동롤링 티커 + 리스트 뷰(6초 진행 바 자동 전환). 인증·서버 없이 정적 데이터 + `localStorage`로 동작.

## 결정 사항

- **Frontend**: React 18 + TypeScript + Vite.
- **스타일**: CSS Modules + `:root` CSS 변수 (스펙 토큰 그대로). Tailwind 미사용 — 토큰 1:1 매핑이 부자연스럽고 wordmark 1회용 변형이 잦아서.
- **State**: 단일 `useReducer` 컨테이너 (스펙 9장 상태 형태). Zustand/Redux 미사용.
- **Data**: 정적 JSON 픽스처 (`src/data/`). 구독은 `localStorage`.
- **Backend**: 없음 (스펙상 서버 도메인 로직이 없음).
- **Fonts**: `@fontsource/pretendard`, Noto Sans/Serif KR, IBM Plex Mono.
- **테스트**: Vitest + Testing Library. 리듀서 우선, 핵심 인터랙션 일부.

자세한 디자인 토큰·접근성·인터랙션 규칙은 `CLAUDE.md` 참고.

## 작업 체크리스트

각 항목 = 한 커밋 단위. 항목 번호가 commit 메시지의 `#N` (feature 번호).

- [x] **1. 프로젝트 부트스트랩** — Vite + React + TS, ESLint/Prettier, Vitest, 디렉터리 골격(`src/{components,data,hooks,styles,state}`).
- [x] **2. 디자인 토큰 + 폰트** — `styles/tokens.css`(컬러/타이포/스페이싱/radii CSS 변수), `styles/fonts.css`(`@fontsource`), 최소 reset.
- [x] **3. 타입 + 픽스처** — `state/types.ts`(Press, TickerItem, Article, Category), `data/press.json`(72개 wordmark 데이터, 디자인 PDF 6 프레임에서 추출), `data/ticker.json`, `data/articles.json`.
- [x] **4. 레이아웃 셸** — 1280 캔버스, 175 거터, 930 콘텐츠 컬럼. `<Header>`(아이콘 + display + 날짜).
- [x] **5. `<PressWordmark>`** — props 스키마(weight/family/italic/underline/accent/flag/chip 등) 풀 지원. 6 프레임의 wordmark 시각적 재현 검증.
- [ ] **6. `<Ticker>`** — 두 레인 비동기 회전(3.2s/0.55s 크로스페이드), hover-pause, `prefers-reduced-motion` 가드.
- [ ] **7. `<TabBar>`** — `all`/`sub` 토글 + 카운트 배지 + grid/list 뷰 토글 아이콘. `role="tablist"`.
- [ ] **8. 그리드 + 구독 토글** — `<PressGrid>` 6×4 + `<GridCell>` hover-스왑 + `<SubscribePill>`. 리듀서로 `subscribed` Set 관리, `localStorage` 동기화 훅.
- [ ] **9. 페이지네이션 + `<Chevron>`** — 좌/우, `opacity:0` + `disabled` 처리. 탭별 페이지 수 계산.
- [ ] **10. 구독 탭 희소 그리드** — 빈 셀 흰색, hover 시 `−해지하기`.
- [ ] **11. 리스트 뷰** — `<PressOpen>` + `<FieldTab>`(6초 진행 바) + 헤드라인 이미지 placeholder + 6 항목 리스트. `progress→currentInTab→tabKey` 자동 전환.
- [ ] **12. 접근성 마감** — 키보드 focus parity, aria 라벨, `prefers-reduced-motion` 전역 적용 검증.
- [ ] **13. 테스트** — 리듀서 케이스(구독/해지/페이지네이션/탭 전환/progress 오버플로) + 핵심 hover-state 1~2건.

## 의존관계

각 항목이 시작되기 전에 끝나 있어야 하는 선행 항목 + 수정 파일 (병렬 충돌 점검용):

| # | 항목 | 선행 | 수정 파일 |
|---|---|---|---|
| 1 | 부트스트랩 | (없음) | `package.json`, `vite.config.ts`, `tsconfig*.json`, `.eslintrc.cjs`, `.prettierrc.json`, `index.html`, `src/{main.tsx,App.tsx,setupTests.ts}`, `src/*/.gitkeep`, `.gitignore` |
| 2 | 토큰+폰트 | 1 | `src/styles/{tokens.css,fonts.css,reset.css}` |
| 3 | 타입+픽스처 | 1 | `src/state/types.ts`, `src/data/{press.json,ticker.json,articles.json}` |
| 4 | 레이아웃 셸 | 2 | `src/components/Header/*`, `src/App.tsx` (수정), `src/styles/layout.css` |
| 5 | PressWordmark | 2, 3 | `src/components/PressWordmark/*` |
| 6 | Ticker | 2, 3 | `src/components/Ticker/*`, `src/hooks/{useInterval.ts,useReducedMotion.ts}` |
| 7 | TabBar | 2 | `src/components/TabBar/*` |
| 8 | 그리드+구독 | 4, 5, 6, 7 | `src/components/{Newsstand,PressGrid,GridCell,SubscribePill}/*`, `src/state/newsstandReducer.ts`, `src/hooks/useLocalStorage.ts`, `src/App.tsx` (수정) |
| 9 | 페이지네이션 | 8 | `src/components/Chevron/*`, `src/components/PressGrid/*` (수정), `src/state/newsstandReducer.ts` (수정) |
| 10 | 구독 탭 희소 그리드 | 9 | `src/components/PressGrid/*` (수정), `src/components/GridCell/*` (수정) |
| 11 | 리스트 뷰 | 8 | `src/components/{PressOpen,FieldTab}/*`, `src/components/Newsstand/*` (수정), `src/state/newsstandReducer.ts` (수정) |
| 12 | 접근성 마감 | 6, 9, 10, 11 | 여러 컴포넌트 a11y 보강 (`src/components/**`) |
| 13 | 테스트 | 8, 11 | `src/state/newsstandReducer.test.ts`, `src/components/**/*.test.tsx` |

## 병렬 그룹 (subagent wave)

같은 wave 안의 항목은 subagent 병렬 실행 가능. 다음 wave는 이전 wave가 모두 끝난 뒤 시작.

- **Wave 0**: `[1]` — 단독 (모든 작업의 토대)
- **Wave 1**: `[2, 3]` — 토큰과 타입은 서로 독립 (다른 디렉터리)
- **Wave 2**: `[4, 5, 6, 7]` — 레이아웃 셸 / wordmark / 티커 / 탭바 — 서로 파일이 겹치지 않음 (4가 App.tsx 수정하지만 다른 셋은 별도 컴포넌트만)
- **Wave 3**: `[8]` — Newsstand 컨테이너 + reducer + 그리드/셀/구독 pill 일괄 mount. App.tsx 와 reducer 의 단일 진입점 commit 이라 단독.
- **Wave 4**: `[9]` — Chevron + 페이지네이션 reducer 확장. PressGrid 와 reducer 둘 다 수정해야 하니 #10 과 직렬 (둘 다 PressGrid 수정).
- **Wave 5**: `[10]` — 구독 탭 희소 그리드. PressGrid/GridCell 추가 수정.
- **Wave 6**: `[11]` — 리스트 뷰. PressOpen/FieldTab + Newsstand 분기. Newsstand 와 reducer 를 다시 건드리니 단독.
- **Wave 7**: `[12]` — 접근성 마감 (단독, 여러 컴포넌트 동시 수정).
- **Wave 8**: `[13]` — 테스트 (단독).

> 파일 충돌 가드: 위 wave 분할은 "수정 파일" 컬럼 기준으로 wave 안에서 같은 파일이 둘 이상에 안 나타나도록 짠 결과. 새 항목 추가 시 같은 룰 따를 것.

## 검증

- 디자인 PDF의 6 프레임을 화면으로 재현했을 때 시각적으로 일치(컬러/타이포/스페이싱).
- 키보드만으로 구독/해지/페이지 이동/언론사 진입까지 전부 가능.
- `prefers-reduced-motion: reduce` 매체 쿼리에서 자동 회전·진행이 멎음.
- 새로고침 후 구독 상태 유지(`localStorage`).

## 회고

(완료 후 작성)
