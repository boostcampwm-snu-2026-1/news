# 뉴스스탠드 개발 체크리스트

> AI와 함께하는 개발 workflow: 설계 → 구현(AI) → 리뷰 → 확인 → commit

---

## 전체 기능 목록

### 기반 설정

- [x] **#1** 프로젝트 초기 세팅 (Vite + React + TypeScript + CSS Modules)
- [x] **#2** `src/types/index.ts` — 공통 타입 정의 (`Outlet`, `Article`, `Category`, `TickerItem`)
- [x] **#3** `src/data/outlets.ts` — 언론사 Mock 데이터 (2페이지, 48개)
- [x] **#4** `src/data/articles.ts` — 기사 Mock 데이터 (카테고리별 샘플)
- [x] **#5** `src/styles/tokens.css` — 디자인 시스템 CSS 변수 (색상, 간격, 반경)
- [x] **#6** `src/styles/global.css` — 리셋 및 기본값

### 공통 레이아웃

- [x] **#7** `Header` 컴포넌트 — 로고 + 오늘 날짜 (`Intl.DateTimeFormat`)
- [x] **#8** `TabBar` 컴포넌트 — 전체/구독 탭 + 구독 배지 + 뷰 토글 버튼
- [x] **#9** `NewsstandContext` — 전역 상태 (구독Set, 탭, 뷰모드, 페이지, 카테고리)

### 그리드 뷰

- [x] **#10** `OutletCell` 컴포넌트 — 언론사 셀 + OutletStyle 적용
- [x] **#11** `OutletCell` Hover 인터랙션 — `+구독하기` / `−해지하기` pill 오버레이
- [x] **#12** `GridView` 컴포넌트 — 6×4 그리드 레이아웃
- [x] **#13** `GridChevron` — 좌/우 페이지네이션 (비활성화 상태 포함)

### 리스트 뷰

- [ ] **#14** `CategoryTabBar` — 6개 카테고리 탭 + 언론사 카운터
- [ ] **#15** `useProgressTimer` — 6초 자동 진행 타이머 훅
- [ ] **#16** `ArticleCard` — 헤드라인 이미지 + 기사 목록 + 구독 버튼
- [ ] **#17** `ListChevron` — 다음 언론사 수동 이동 버튼
- [ ] **#18** `ListView` 조합 — CategoryTabBar + ArticleCard + 자동 전환

### 뉴스 티커

- [ ] **#19** `NewsTicker` — 좌우 2컬럼 자동 롤링 (3~4초, 슬라이드 업)

### 통합 및 마무리

- [ ] **#20** 전체 연결 — 그리드 셀 클릭 → 리스트 뷰 진입
- [ ] **#21** 반응형 마무리 — 최소 너비 1024px 기준 레이아웃 고정

---

## 1주차 개발 범위 ✅

> 목표: 그리드 뷰 완성 + 기반 인프라 구축

| 번호 | 항목 | 상태 |
|---|---|---|
| #1 | 프로젝트 초기 세팅 | ✅ |
| #2 | 타입 정의 | ✅ |
| #3 | 언론사 Mock 데이터 | ✅ |
| #4 | 기사 Mock 데이터 | ✅ |
| #5 | CSS 토큰 | ✅ |
| #6 | Global CSS | ✅ |
| #7 | Header 컴포넌트 | ✅ |
| #8 | TabBar 컴포넌트 | ✅ |
| #9 | NewsstandContext | ✅ |
| #10 | OutletCell 컴포넌트 | ✅ |
| #11 | OutletCell Hover | ✅ |
| #12 | GridView 레이아웃 | ✅ |
| #13 | GridChevron 페이지네이션 | ✅ |

---

## 2주차 개발 범위 (예정)

| 번호 | 항목 |
|---|---|
| #14 | CategoryTabBar |
| #15 | useProgressTimer |
| #16 | ArticleCard |
| #17 | ListChevron |
| #18 | ListView 조합 |
| #19 | NewsTicker |
| #20 | 그리드 ↔ 리스트 연결 |
| #21 | 레이아웃 마무리 |

---

## 개발 Workflow

```
체크리스트 항목 선택
  → 설계 (내가 먼저: 컴포넌트 구조, props, 상태 스케치)
  → 구현 (AI: 구체적 지시로 요청)
  → 리뷰 (AI 코드 검토: 설계 일치 여부, 이해 안 되는 부분 질문)
  → 확인 (브라우저에서 직접 확인)
  → commit (feat: #N 기능명)
```
