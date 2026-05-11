# CLAUDE.md — 뉴스스탠드 (Newsstand)

## 프로젝트 개요

네이버 뉴스스탠드 스타일의 데스크톱 웹 포털.
언론사 목록을 그리드로 탐색하고, 구독/해지하며, 리스트 뷰로 기사 헤드라인을 확인하는 서비스.

- **타겟 환경**: 데스크톱 웹 전용 (모바일 대응 불필요)
- **외부 UI 라이브러리**: 사용 안 함

---

## 기술 스택

| 분류 | 선택 | 비고 |
|---|---|---|
| 빌드 도구 | **Vite** | CRA deprecated, Next.js는 오버스펙. 순수 SPA에 최적 |
| 언어 | **TypeScript** | 도메인 타입(`Outlet`, `Article`, `Category`)이 명확하게 정의되어 있어 TS가 자연스러움 |
| 프레임워크 | **React** | - |
| 스타일링 | **CSS Modules + CSS Variables** | 외부 UI 라이브러리 없음 조건 부합. 디자인 시스템 토큰은 `src/styles/tokens.css`에서 CSS 변수로 관리 |
| 상태 관리 | **useState + Context API** | 구독 목록·탭·뷰 모드 수준의 규모, Redux/Zustand는 오버킬 |
| 날짜 처리 | **Intl.DateTimeFormat (native)** | `YYYY. MM. DD. 요일` 포맷 하나뿐, dayjs/date-fns 불필요 |
| 테스트 | **Vitest + React Testing Library** | Vite 생태계와 통일, 설정 최소화 (선택) |

---

## 컨벤션

- **컴포넌트 파일명**: PascalCase (예: `NewsCard.tsx`)
- **커밋 타입**: `feat` / `fix` / `refactor` / `docs`
- **커밋 형식**: `feat: #N 기능명\n\n- 확인내용: ...\n- 이해 안 됐던 부분: ...`

---

## 하지 말 것

- `any` 타입 사용 금지
- 외부 UI 라이브러리 금지 (shadcn, MUI, Ant Design 등)
- Tailwind 사용 금지 (디자인 시스템과 충돌)
- 하드코딩 값 사용 금지 — 반드시 CSS 변수(`var(--*)`) 사용

---

## 스타일링 규칙

- 각 컴포넌트 스타일은 동일 디렉토리의 `.module.css` 파일로 관리
- 디자인 시스템 토큰(색상, 타이포그래피, 간격 등)은 `src/styles/tokens.css`에 CSS 변수로 정의하고 전역 임포트
- 컴포넌트 생성 시 하드코딩 대신 반드시 CSS 변수(`var(--*)`)를 사용할 것

```css
/* src/styles/tokens.css 예시 */
:root {
  --color-bg: #f2f4f6;
  --color-surface: #ffffff;
  --color-border: #e5e8eb;
  --color-primary: #0068c8;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #6b7280;
}
```

---

## 디자인 참고

- `@docs/design.md` 참고 (색상 토큰, 컴포넌트 스펙, 인터랙션 정의)

---

## 핵심 기능 명세

### 1. 공통 레이아웃

#### 헤더
- 좌측: `🗞 뉴스스탠드` 로고
- 우측: 오늘 날짜 표시 (`YYYY. MM. DD. 요일` 형식, `Intl.DateTimeFormat` 사용)

#### 뉴스 티커 (자동 롤링)
- 헤더 하단에 위치
- 언론사명 + 기사 제목 쌍을 좌우 두 컬럼으로 표시
- 3~4초마다 슬라이드 업 애니메이션으로 자동 롤링

#### 탭 + 뷰 토글
- 탭: `전체 언론사` / `내가 구독한 언론사 {count}`
- 우측 뷰 토글: 리스트 뷰(☰) / 그리드 뷰(⊞) 아이콘 버튼

---

### 2. 그리드 뷰 (기본)

#### 언론사 그리드
- 6열 × 4행 레이아웃 (한 페이지당 최대 24개)
- 각 셀에 언론사 로고/이름 표시 (언론사마다 고유 폰트·색상 스타일 적용)
- 페이지네이션: 좌우 chevron(`<` `>`) 버튼으로 페이지 이동

#### 셀 Hover 인터랙션
- **전체 언론사 탭**: hover 시 `+ 구독하기` pill 버튼 오버레이
- **내가 구독한 언론사 탭**: hover 시 `− 해지하기` pill 버튼 오버레이

---

### 3. 리스트 뷰

#### 카테고리 탭 바
- `종합/경제` / `방송/통신` / `IT` / `스포츠/연예` / `매거진/전문지` / `지역`
- 활성 탭 하단에 프로그레스 바 (6초 주기 자동 진행)

#### 기사 카드
- 좌측: 헤드라인 이미지 + 헤드라인 기사 제목
- 우측: 기사 제목 목록 (6~7개)
- 상단: 언론사 로고 + 편집 시각 + `+ 구독하기` 버튼

---

## 상태 관리 설계

```
AppState (NewsstandContext)
├── currentDate: string
├── tickerItems: TickerItem[]
├── activeTab: 'all' | 'subscribed'
├── viewMode: 'grid' | 'list'
├── currentPage: number
├── subscribed: Set<string>
├── activeCategory: Category
├── currentOutletIndex: number
└── progress: number
```

---

## 컴포넌트 구조

```
<App>
├── <Header>
├── <NewsTicker>
├── <TabBar>
├── [viewMode === 'grid']
│   └── <GridView>
│       ├── <OutletGrid> → <OutletCell>
│       └── <GridChevron>
└── [viewMode === 'list']
    └── <ListView>
        ├── <CategoryTabBar>
        ├── <ArticleCard>
        └── <ListChevron>
```

---

## 파일 구조

```
src/
├── main.tsx
├── App.tsx
├── context/
│   └── NewsstandContext.tsx
├── components/
│   ├── Header/
│   ├── NewsTicker/
│   ├── TabBar/
│   ├── GridView/
│   └── ListView/
├── hooks/
│   ├── useSubscription.ts
│   └── useProgressTimer.ts
├── data/
│   ├── outlets.ts
│   └── articles.ts
├── types/
│   └── index.ts
└── styles/
    ├── tokens.css
    └── global.css
```

---

## 개발 우선순위 (1주차)

1. 프로젝트 초기 세팅 (Vite + React + TypeScript)
2. `src/types/index.ts` — 공통 타입 정의
3. `src/data/` — Mock 데이터
4. `src/styles/tokens.css` — 디자인 토큰
5. `NewsstandContext` — 전역 상태
6. `Header` + `TabBar` — 기본 레이아웃
7. `GridView` + `OutletCell` — 그리드 + hover
8. 그리드 페이지네이션
9. `NewsTicker` — 자동 롤링

---

_Design Canvas v1 · 2026.01 · 6 frames 기반_
