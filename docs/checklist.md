# 뉴스스탠드 개발 체크리스트

> 각 항목 완료 시 `- [x]`로 체크하고 커밋 메시지에 항목 번호를 포함할 것.  
> 의존성 순서대로 작업하는 것을 권장 (위→아래).

---

## 1주차 — 기초 뼈대 & 정적 UI

### P0 · 환경 설정

- [x] **1. 프로젝트 초기화**
  - Vite + React + **TypeScript** 템플릿으로 프로젝트 생성
  - **Tailwind CSS v4** + `@tailwindcss/vite` 플러그인 설치
  - `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json` 구성
  - `docs/CLAUDE.md` 작성 완료 확인
  - 의존성: 없음

- [x] **2. 글로벌 스타일 & CSS 변수 설정**
  - `src/index.css`에 `@import "tailwindcss"` + `@theme` 블록으로 디자인 토큰 정의
  - 색상(`--color-primary`, `--color-bg` 등), 폰트, 그림자 변수 등록
  - `@layer components`에 `.card`, `.btn-subscribe` 공통 클래스 정의
  - 기본 reset CSS 적용 (`box-sizing`, body 마진)
  - 의존성: #1

### P1 · 핵심 컴포넌트 구현

- [x] **3. 헤더(Header) 컴포넌트**
  - 서비스 로고/타이틀 좌측 배치
  - 현재 날짜·요일 우측 표시 (`new Date()` 활용)
  - 반응형: 모바일 768px 이하에서 레이아웃 조정
  - 의존성: #2

- [x] **4. 탭바(TabBar) 컴포넌트 — UI 레이아웃만**
  - "전체 언론사" / "구독한 언론사" 탭 2개 UI 구현
  - 활성 탭 스타일 구분 (밑줄 + 색상)
  - `TabType` 유니온 타입으로 탭 상태 타입 안전하게 관리
  - 의존성: #2

- [x] **5. 언론사 데이터 JSON 파일 구성**
  - `src/data/publishers.json` 생성 — 20개 언론사 수록
  - 필드: `id`, `name`, `logoUrl`, `category`, `description`
  - `src/types/index.ts`에 `Publisher`, `Category`, `TabType` 타입 정의
  - 의존성: #1

- [x] **6. 뉴스 카드(NewsCard) 컴포넌트**
  - 언론사 로고, 이름, 카테고리 배지, 설명 표시
  - 구독 여부에 따라 버튼 텍스트 변경 ("+ 구독" / "✓ 구독중")
  - 카테고리별 배지 색상 구분 (종합/경제/IT/스포츠 등)
  - `aria-pressed`로 접근성 처리
  - Props: `publisher`, `isSubscribed`, `onToggle`
  - 의존성: #2, #5

- [x] **7. 뉴스 그리드(NewsGrid) 컴포넌트 — 카드형 레이아웃**
  - CSS Grid (`grid-cols-2 ~ lg:grid-cols-5`) 반응형 배치
  - publishers 배열을 받아 NewsCard 렌더링, 빈 상태 메시지 처리
  - NewsCard 재디자인: 로고 호버 시 오버레이("+ 구독" / "기사보기") 표시
  - Props: `publishers`, `subscribedIds`, `onToggle`, `emptyMessage`
  - 의존성: #5, #6

### P1 · 상태 관리 & 인터랙션

- [x] **8. 탭 전환 상태 로직 연결**
  - `App.tsx`에서 `activeTab` state 관리
  - "전체 언론사": 전체 publishers 표시
  - "구독한 언론사": subscribedIds 기반 필터링
  - TabBar에 구독 수 뱃지 표시 (구독 언론사 탭 옆 숫자)
  - TabBar ↔ NewsGrid 연결 완료
  - 의존성: #4, #7

- [x] **9. 구독/해지 상태 관리**
  - `subscribedIds` state를 `App.tsx`에서 `useState` lazy initializer로 관리
  - `localStorage('news-subscribed')`에 저장·복원 — 새로고침 후에도 유지
  - 구독(`handleSubscribe`)과 해지(`handleUnsubscribeRequest`) 핸들러 분리
  - 의존성: #6, #8

---

## 2주차 — 인터랙션 심화 & 데이터 바인딩

### P2 · 구독 확인 모달

- [x] **10. 구독 해지 확인 모달(SubscribeModal) 구현**
  - 해지 버튼 클릭 → `pendingUnsubscribeId` 설정 → 모달 표시
  - ESC 키 / 오버레이 클릭으로 취소, 확인 버튼으로 실제 해지
  - `role="dialog"`, `aria-modal="true"`, `aria-labelledby` 접근성 처리
  - 의존성: #9

- [x] **11. 카드형 ↔ 리스트형 뷰 전환**
  - 콘텐츠 우상단 그리드/리스트 아이콘 토글 버튼
  - 리스트형: 로고 + 이름·카테고리·설명 + 버튼 한 줄 배치
  - `viewMode: 'grid' | 'list'` state, NewsGrid/NewsCard 양쪽에 전파
  - 의존성: #7

### P1 · 페이지네이션 / 무한 스크롤

- [ ] **12. 언론사 목록 페이지 단위 표시**
  - 한 페이지에 24개씩 표시
  - 이전/다음 페이지 버튼 또는 페이지 번호 UI
  - 의존성: #7

### P3 · 선택 기능

- [ ] **13. 언론사 카테고리 필터**
  - 정치/경제/사회/스포츠/IT 등 카테고리 버튼 필터
  - 다중 선택 가능
  - 의존성: #8

- [ ] **14. 뉴스 요약 기능 (AI 활용)**
  - 카드 클릭 시 해당 언론사 최신 기사 목록 표시 (mock 데이터)
  - Claude API 또는 로컬 요약 로직으로 3줄 요약 제공
  - 의존성: #6

---

## 완료 기준 체크

| 항목 | 기준 |
|------|------|
| 반응형 | 모바일(375px), 태블릿(768px), 데스크탑(1200px) 레이아웃 깨지지 않음 |
| 구독 상태 | 새로고침 후에도 구독 목록 유지 (`localStorage`) |
| 탭 전환 | 전체/구독 탭 전환 시 목록 즉시 반영 |
| 모달 | ESC 키 또는 오버레이 클릭으로 닫힘 |
| 커밋 | 각 체크리스트 항목마다 최소 1개 커밋 |

---

## 진행 현황

| 주차 | 완료 항목 | 진행 중 | 남은 항목 |
|------|----------|--------|----------|
| 1주차 | 9 / 9 | - | 완료 |
| 2주차 | 2 / 5 | - | 12~14 |

> 이 표는 작업 완료 시마다 수동으로 업데이트할 것.
