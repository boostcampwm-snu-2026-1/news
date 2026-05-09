# 뉴스스탠드 개발 체크리스트

> 각 항목 완료 시 `- [x]`로 체크하고 커밋 메시지에 항목 번호를 포함할 것.

---

## 1주차 — 기초 뼈대 & 핵심 기능

### 환경 설정

- [x] **1. 프로젝트 초기화**
  - Vite 6 + React 19 + TypeScript 5.8 스캐폴딩
  - Tailwind CSS v4 (`@tailwindcss/vite`) 설치 및 `vite.config.ts` 연결
  - `tsconfig.app.json`, `tsconfig.node.json`, `.gitignore` 구성

- [x] **2. 글로벌 스타일 & 디자인 토큰 설정**
  - `src/index.css` — `@import "tailwindcss"` + `@theme` 블록으로 색상·폰트·그림자 변수 정의
  - `@layer components`에 `.card`, `.btn-subscribe` 공통 클래스 등록
  - `src/types/index.ts` — `Publisher`, `Category`, `CATEGORIES`, `TabType` 타입 정의

### 컴포넌트 구현

- [x] **3. Header 컴포넌트**
  - 서비스 로고 좌측, 현재 날짜·요일 우측 표시

- [x] **4. TabBar 컴포넌트**
  - "전체 언론사" / "구독한 언론사" 탭, 구독 수 뱃지 표시

- [x] **5. 언론사 데이터 구성**
  - `src/data/publishers.json` — 49개 언론사 (종합·경제·IT·스포츠·방송·지역)
  - `src/data/mockArticles.ts` — 카테고리별 기사 제목 풀, `getMockArticles()` 유틸

- [x] **6. NewsCard 컴포넌트**
  - 로고 영역 호버 시 초록 오버레이 + "구독" / "기사보기" 버튼 좌우 배치
  - 구독 중: 카드 하단 초록 바 표시
  - 그리드형 / 리스트형 두 가지 `viewMode` 지원

- [x] **7. NewsGrid 컴포넌트**
  - `grid-cols-3 md:grid-cols-6` — 데스크탑 6열 × 4행(24개)
  - 빈 상태 메시지 처리

### 상태 관리 & 인터랙션

- [x] **8. 탭 전환 로직**
  - `activeTab` state — "전체" / "구독한 언론사" 필터링
  - TabBar ↔ NewsGrid 연결

- [x] **9. 구독 상태 관리 + localStorage**
  - `subscribedIds: Set<string>` — lazy initializer로 `localStorage` 복원
  - 구독·해지 시 자동 저장 (새로고침 후 유지)

- [x] **10. 구독 해지 확인 모달 (SubscribeModal)**
  - 해지 버튼 → 모달 → 확인/취소
  - ESC 키·오버레이 클릭으로 닫힘, `role="dialog"` 접근성 처리

- [x] **11. 카드형 ↔ 리스트형 뷰 전환**
  - 우상단 그리드/리스트 아이콘 토글
  - 리스트뷰: 좌측 분야 사이드바 + 우측 언론사 기사 패널

- [x] **12. 페이지네이션**
  - 그리드뷰 24개씩, ‹ › 화살표 + `n / total` 표시
  - 탭·카테고리 변경 시 1페이지 리셋

- [x] **13. 카테고리 필터**
  - 그리드뷰: 상단 알약 필터 (다중 선택)
  - 리스트뷰: 좌측 사이드바 단일 선택 + 우측 언론사·기사 탐색 (‹ ›)

---

## 완료 기준 체크

| 항목 | 기준 |
|------|------|
| 그리드 레이아웃 | 데스크탑 6열 × 4행 = 24개 표시 |
| 구독 상태 | 새로고침 후에도 구독 목록 유지 (`localStorage`) |
| 탭 전환 | 전체/구독 탭 전환 시 목록 즉시 반영 |
| 모달 | ESC 키 또는 오버레이 클릭으로 닫힘 |
| 커밋 | 각 체크리스트 항목마다 최소 1개 커밋 |

---

## 2주차 — 네이버 뉴스스탠드 캐러셀 재설계

> 1주차 그리드/리스트 UI는 **백지화**. 네이버 뉴스스탠드(https://newsstand.naver.com/?list=ct1)
> 의 **3-패널 캐러셀 + 신문 1면 편성 + 하단 썸네일 띠** 구조로 전면 재구축한다.
>
> 범위 축소: 카테고리 **4개**, 언론사 **20개**부터 시작 (이후 증설).
> 자동슬라이드 O / 키보드 네비게이션 X.

### A. 설계 & 데이터 (구현 전 필수)

- [ ] **14. design.md 재작성**
  - 캐러셀 3-패널 레이아웃(중앙 풀 + 좌우 peek) 명세
  - 신문 1면 멀티컬럼(메인 헤드라인 / 좌 서브리스트 / 중앙 피처박스 / 우 HOT 1·2·3) 그리드 명세
  - 하단 썸네일 띠 + 컨트롤 바 스펙
  - 1주차에서 폐기되는 토큰/클래스 정리

- [x] **15. 타입 정의** (`src/types/index.ts`)
  - `Publisher` (id, name, logoUrl, category, isMajor, siteUrl, thumbnailUrl)
  - `FrontPage` (publisherId, editedAt, mainArticle, subArticles[], featureBox?, hotArticles[], adBanner?)
  - `Article`, `FeatureBox`, `HotArticle` 세부 타입
  - 카테고리 union: `"주요언론사" | "종합/경제" | "방송/통신" | "IT"` (4개)

- [x] **16. publishers.json 작성 (20개)**
  - 4개 카테고리 균형 분배 (주요 5 / 종합·경제 5 / 방송·통신 5 / IT 5)
  - `isMajor: true`인 언론사 8~10개
  - 로고 SVG/PNG 자산 `public/logos/`에 배치
  - 썸네일 이미지 `public/thumbs/` 배치

- [x] **17. frontpages.json 작성 (20개)**
  - 모든 언론사가 동일 스키마 충족: mainArticle 필수, subArticles 5개 이상, hotArticles 정확히 3개
  - featureBox는 선택, adBanner는 선택
  - 가짜 텍스트라도 길이/줄바꿈이 실제 신문 1면처럼 보이게 작성

- [x] **18. 데이터 검증 스크립트** (`scripts/validate-data.ts`)
  - publishers.json ↔ frontpages.json 매칭 (publisherId 누락 0건)
  - 필수 필드/배열 길이 제약 검사
  - `npm run validate-data` 명령 등록

### B. UI 백지화 & 재구축

- [x] **19. 1주차 컴포넌트 정리**
  - `NewsGrid`, `NewsCard`(그리드/리스트 양쪽), `Pagination`, `CategoryFilter`, ListView 사이드바, 뷰모드 토글 제거
  - `SubscribeModal`, `useSubscription`, localStorage 키, Header는 유지 (또는 일부 재사용)
  - 제거 후 빌드 통과 + dead code 0건 확인

- [x] **20. 글로벌 헤더** (`GlobalHeader`)
  - 좌측: NEWSSTAND 로고
  - 중앙: `MY뉴스` / `전체언론사` 세그먼트 토글 (활성: 검정 배경 + 흰 글씨)
  - 우측: 더미 아이콘 버튼 (로그인 / 새로고침 / 설정)

- [x] **21. 카테고리 탭** (`CategoryTabs`)
  - 4개 탭: 주요언론사 / 종합·경제 / 방송·통신 / IT
  - 활성 탭 검정 pill 스타일 (네이버 스펙)
  - 탭 전환 시 캐러셀 첫 페이지로 리셋

- [ ] **22. 3-패널 캐러셀** (`Carousel`)
  - 중앙 풀사이즈 + 좌우 peek 카드 (살짝 잘려 보임)
  - 양옆 큰 ◀ ▶ 화살표로 슬라이드
  - 슬라이드 애니메이션 (transform translateX, 200~300ms)
  - 끝에서 순환 여부 결정 + 동작 명시

- [ ] **23. 신문 1면 패널** (`FrontPagePanel`)
  - 헤더: 언론사 로고 + `구독하기` `이용자 한마디` `공유` + 편집시각 + 광고배너 자리
  - 메인: 큰 이미지 + 헤드라인 + 리드
  - 좌측 칼럼: subArticles 텍스트 리스트 (5~6개)
  - 중앙: featureBox (인물/칼럼) — 없으면 빈 상태
  - 우측: HOT 뉴스 1·2·3 (랭킹 숫자 + 썸네일 + 제목)
  - 푸터: `{언론사명} 사이트 바로가기 →`

- [ ] **24. 하단 썸네일 띠** (`PublisherStrip`)
  - 가로 스크롤, 각 언론사 1면 미니 썸네일
  - 클릭 시 캐러셀 해당 언론사로 점프
  - 현재 활성 언론사 강조 테두리

- [ ] **25. 캐러셀 컨트롤 바**
  - `자동넘김` 토글 + 속도 드롭다운 (느리게 30s / 보통 20s / 빠르게 15s)
  - 우측 `n / 20` 인디케이터 + 미세이동 ◁ ▷

### C. 인터랙션 & 검증

- [ ] **26. 자동 슬라이드**
  - 선택된 속도 간격으로 다음 패널 자동 이동
  - 사용자가 ◀▶ 누르거나 썸네일 클릭 시 일시정지 → N초 후 재개 (또는 토글 OFF 전까지 정지, 정책 결정 PR에 기록)
  - `useEffect` cleanup으로 타이머 누수 방지

- [ ] **27. 구독 통합** (MY뉴스 / 전체언론사)
  - 상단 토글: 전체언론사(20개) ↔ MY뉴스(구독한 것만)
  - 1주차 localStorage 키 호환 (`subscribedIds` 그대로 활용)
  - MY뉴스 0개일 때 빈 상태 메시지 + 전체언론사로 유도

- [ ] **28. 엣지케이스 표** (`docs/edge-cases.md`)
  - MY뉴스 0개·1개일 때 캐러셀 동작 (peek 카드 처리)
  - 자동슬라이드 중 탭/MY뉴스 전환 시 타이머 처리
  - frontpages.json에 featureBox 없는 언론사의 중앙 칼럼 빈 상태
  - 활성 인덱스가 마지막일 때 "다음" 동작 (순환 vs 멈춤)
  - 썸네일 띠 클릭과 자동슬라이드 충돌

---

## 진행 현황

| 주차 | 완료 항목 |
|------|----------|
| 1주차 | 13 / 13 ✅ |
| 2주차 | 8 / 15 (15~21 완료, 14 진행중) |
