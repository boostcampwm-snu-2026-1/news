# Architecture & State Map

본 문서는 뉴스스탠드 프로젝트의 전반적인 디렉토리 구조와 상태(State)의 흐름을 정의합니다. 컴포넌트를 분리하고 상태를 배치할 때 이 지도를 참고합니다.

## 1. Directory Structure

```text
src/
 ├── assets/          # 이미지, 아이콘 등 정적 파일
 ├── components/      # UI 컴포넌트 (도메인/역할별 분리)
 │    ├── common/     # 공통 재사용 컴포넌트 (Icon, Badge, Chevron, Wordmark 등)
 │    ├── layout/     # 레이아웃 관련 (Header, App Layout)
 │    ├── ticker/     # 자동 롤링 뉴스 티커 관련
 │    ├── grid/       # 1주차: 그리드 뷰 관련 (PressGrid, GridCell, Pagination)
 │    └── list/       # 2주차: 리스트 뷰 관련 (PressOpen, FieldTab, ArticleItem 등)
 ├── hooks/           # 커스텀 훅 (비즈니스 로직 및 타이머/상태 관리 분리)
 │    ├── useTicker.js       
 │    ├── useProgress.js     
 │    └── useSubscription.js 
 ├── store/           # 전역 상태 관리
 │    └── NewsstandContext.jsx 
 ├── utils/           # 유틸리티 함수
 │    └── dateUtils.js       
 ├── data/            # 더미 데이터 또는 API 페치 로직
 ├── styles/          # 디자인 시스템 토큰 및 전역 스타일
 │    └── index.css          
 ├── App.jsx          # 최상위 라우팅 및 Provider 래핑
 └── main.jsx         
```

## 2. State & Data Flow

### Global State (Context)
`<NewsstandContext.Provider>`를 통해 전역으로 공급되는 상태입니다.

```javascript
{
  viewer: "grid" | "list",        // 현재 보기 모드
  activeTab: "all" | "sub",       // 현재 선택된 탭 (전체 언론사 / 내가 구독한 언론사)
  subscribedIds: Set<String>,     // 사용자가 구독한 언론사의 ID(또는 이름) 목록
  subscribe: (id) => void,        // 구독 추가 액션
  unsubscribe: (id) => void       // 구독 해지 액션
}
```

### Component Local State
- `<Ticker>` (via `useTicker`): `leftIndex`, `rightIndex`, `isHovered`
- `<PressGrid>`: `currentPage` (0 ~ maxPage)
- `<PressOpen>` (via `useProgress`):
  - `categoryId`: 현재 포커스된 카테고리
  - `pressIndex`: 현재 카테고리 내 언론사 순번
  - `progress`: 0 ~ 100 (6초 간격)
