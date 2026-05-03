# Week 01 — 뉴스스탠드 데스크톱 웹 (그리드 + 구독 + 리스트 뷰)

- Status: in-progress
- Spec: `spec/1776841621755_뉴스스탠드-기획디자인.pdf`, `spec/1776841629381_뉴스스탠드-디자인시스템.pdf`
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

각 항목 = 한 커밋 단위.

- [ ] **1. 프로젝트 부트스트랩** — Vite + React + TS, ESLint/Prettier, Vitest, 디렉터리 골격(`src/{components,data,hooks,styles,state}`).
- [ ] **2. 디자인 토큰 + 폰트** — `styles/tokens.css`(컬러/타이포/스페이싱/radii CSS 변수), `styles/fonts.css`(`@fontsource`), 최소 reset.
- [ ] **3. 타입 + 픽스처** — `state/types.ts`(Press, TickerItem, Article, Category), `data/press.json`(72개 wordmark 데이터, 디자인 PDF 6 프레임에서 추출), `data/ticker.json`, `data/articles.json`.
- [ ] **4. 레이아웃 셸** — 1280 캔버스, 175 거터, 930 콘텐츠 컬럼. `<Header>`(아이콘 + display + 날짜).
- [ ] **5. `<PressWordmark>`** — props 스키마(weight/family/italic/underline/accent/flag/chip 등) 풀 지원. 6 프레임의 wordmark 시각적 재현 검증.
- [ ] **6. `<Ticker>`** — 두 레인 비동기 회전(3.2s/0.55s 크로스페이드), hover-pause, `prefers-reduced-motion` 가드.
- [ ] **7. `<TabBar>`** — `all`/`sub` 토글 + 카운트 배지 + grid/list 뷰 토글 아이콘. `role="tablist"`.
- [ ] **8. 그리드 + 구독 토글** — `<PressGrid>` 6×4 + `<GridCell>` hover-스왑 + `<SubscribePill>`. 리듀서로 `subscribed` Set 관리, `localStorage` 동기화 훅.
- [ ] **9. 페이지네이션 + `<Chevron>`** — 좌/우, `opacity:0` + `disabled` 처리. 탭별 페이지 수 계산.
- [ ] **10. 구독 탭 희소 그리드** — 빈 셀 흰색, hover 시 `−해지하기`.
- [ ] **11. 리스트 뷰** — `<PressOpen>` + `<FieldTab>`(6초 진행 바) + 헤드라인 이미지 placeholder + 6 항목 리스트. `progress→currentInTab→tabKey` 자동 전환.
- [ ] **12. 접근성 마감** — 키보드 focus parity, aria 라벨, `prefers-reduced-motion` 전역 적용 검증.
- [ ] **13. 테스트** — 리듀서 케이스(구독/해지/페이지네이션/탭 전환/progress 오버플로) + 핵심 hover-state 1~2건.

## 검증

- 디자인 PDF의 6 프레임을 화면으로 재현했을 때 시각적으로 일치(컬러/타이포/스페이싱).
- 키보드만으로 구독/해지/페이지 이동/언론사 진입까지 전부 가능.
- `prefers-reduced-motion: reduce` 매체 쿼리에서 자동 회전·진행이 멎음.
- 새로고침 후 구독 상태 유지(`localStorage`).

## 회고

(완료 후 작성)
