# 뉴스스탠드 (Newsstand) 개발 계획 기획서

본 기획서는 제공된 디자인 스펙 및 디자인 시스템을 바탕으로 React 기반의 뉴스스탠드 웹 포털을 개발하기 위한 핵심 내용을 정리한 문서입니다. (별도의 외부 라이브러리 없이 구현)

## 1. 디자인 원칙 및 시스템 (Design System)

### 컬러 팔레트 (Color Tokens)
- **Primary/Background**: `card (#FFFFFF)`, `page (#FEFEFE)`, `soft (#F5F7F9)`
- **Text**: `ink (#14212B)`, `sub (#5F6E76)`, `mute (#879298)`
- **Border**: `line (#D2DAE0)` (1px divider 등 모든 선형 요소에 사용)
- **Accent**: `accent (#7890E7)` (구독 뱃지, 활성 탭), `accent-deep (#4362D0)` (활성 탭 내 프로그레스 바)

### 타이포그래피 (Typography)
- **Primary**: Pretendard Variable / Pretendard (기본 폰트)
- **Numeric**: IBM Plex Mono (탭 카운터 등 숫자)
- **Serif Accent**: Noto Serif KR (일부 언론사 로고용)

### 레이아웃 규칙 (Spacing & Layout)
- 1280px 해상도 기준, 콘텐츠 영역 930px.
- 8px 단위(4, 8, 12, 16, 24, 32, 40, 48, 64)의 여백 규칙 준수.
- 그림자, 그라데이션 등 장식적 요소 배제 및 1px 라인(`line #D2DAE0`)을 통한 명확한 구분.

---

## 2. 핵심 컴포넌트 (Core Components)

### 2.1 상단 영역 (Header & Ticker)
- **Header**: 로고(타이포그래피 위주)와 오늘 날짜(`YYYY. MM. DD. 요일`) 표시.
- **Auto-rolling Ticker**: 2줄로 구성된 자동 롤링 뉴스 티커. 3.2초 주기로 애니메이션 전환(교차 페이드아웃).

### 2.2 탭 및 보기 설정 (TabBar & Toggle)
- **Tab**: "전체 언론사" / "내가 구독한 언론사" (구독한 언론사 수 표시 뱃지 포함)
- **View Toggle**: 리스트 뷰 아이콘 / 그리드 뷰 아이콘

### 2.3 전체 언론사 그리드 (Grid View)
- 6x4 형태의 언론사 묶음(총 24개), 페이지네이션(좌우 쉐브론 화살표) 제공.
- 각 언론사 셀 Hover 시 배경 변경 및 `+ 구독하기` (또는 `- 해지하기`) 버튼 표출.

### 2.4 기사 리스트 뷰 (List View / Opened Press)
- 특정 언론사 클릭 시 상세 뷰로 전환. (분야별 카테고리 탭 제공)
- 탭 프로그레스 바가 6초 동안 선형으로 채워짐. 100% 완료 시 다음 기사(혹은 카테고리/언론사)로 자동 전환.
- 주요 헤드라인 이미지 1개와 6개의 리스트 아이템 노출.

---

## 3. 리액트 컴포넌트 아키텍처 제안 (Suggested React Structure)

외부 상태 관리 라이브러리를 쓰지 않으므로, 최상단 `<Newsstand>` 컴포넌트에서 주요 State를 관리합니다.

```jsx
// 예상 State
{
  tab: "all" | "sub",           // 현재 탭 (전체 / 내가 구독한)
  page: number,                 // 현재 페이지
  opened: pressId | null,       // 현재 열려있는 언론사 (리스트 뷰)
  tabKey: categoryKey,          // 열려있는 언론사의 카테고리
  progress: 0..1,               // 진행도 (0~100%)
  currentInTab: number,         // 탭 내 현재 번호
  subscribed: Set<pressId>      // 구독 중인 언론사 목록
}
```

- `<Newsstand>`: 상태 중앙 관리 및 레이아웃 컨테이너
  - `<Header />`
  - `<Ticker />`
  - `<TabBar />`
  - 조건부 렌더링: `<PressOpen />` (리스트 뷰) OR `<PressGrid />` (그리드 뷰)
  - `<Chevron />`: 페이지네이션 좌우 버튼

---

## 4. 기술 스택 제안 (Tech Stack)

초기 '별도의 라이브러리는 없어도 돼'라는 요구사항과 '외부 프레임워크도 고려해 달라'는 추가 요청을 종합하여, 두 가지 방향(순수 React vs 외부 생태계 활용)의 기술 스택을 제안합니다.

- **Core Framework**: `React` + `Vite` (또는 페이지 확장성/SEO 고려 시 `Next.js`)
- **Styling**: `Tailwind CSS` (또는 `Styled-Components`)
  - **이유**: 제공된 디자인 시스템(컬러 헥스 코드, 8px 단위 여백, 타이포그래피 등)을 `tailwind.config.js`에 테마 토큰으로 매핑하면 개발 속도가 매우 빨라지고 일관성을 완벽히 유지할 수 있습니다.
- **State Management**: `Zustand`
  - **이유**: 탭 상태, 구독한 언론사 리스트(Set/Array), 현재 페이지, 프로그레스 바 상태 등 전역으로 관리해야 할 State가 꽤 존재합니다. 보일러플레이트가 적은 Zustand를 활용하면 상태 관리가 직관적이고 렌더링 최적화에도 유리합니다.
- **Data Fetching**: `React Query (@tanstack/react-query)`
  - **이유**: 언론사/기사 Mock 데이터(혹은 API)의 캐싱, 로딩 처리 등을 선언적으로 관리하기 좋습니다.

---

## 5. 진행 사항 및 검토 요청

사용자님의 지시에 따라 외부 프레임워크 도입을 고려한 내용까지 `GEMINI.MD` 문서에 업데이트하였습니다. 

