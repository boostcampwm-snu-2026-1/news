# 뉴스스탠드 구현 체크리스트

## 기능 목록

### 공통 기반

- [x] #1 기반 세팅 — 타입 정의, main.tsx 버그 수정
- [x] #2 목업 데이터 — 언론사 30개+, 카테고리 분류, 기사 제목, 속보 티커 데이터 작성
- [x] #3 Header 컴포넌트 — 로고 + 날짜
- [x] #4 NewsTicker 컴포넌트 — 속보 2열 티커
- [x] #5 TabBar 컴포넌트 — 탭 전환 + 뷰 전환 버튼

### 그리드 뷰

- [x] #6 언론사 로고 컴포넌트 — 각 언론사 로고를 SVG/JSX로 구현 (`src/data/logos.tsx`)
- [x] #7 PressGridCell 컴포넌트 — 언론사 셀, hover 인터랙션 (구독하기/해지하기)
- [x] #8 PressGrid + 페이지네이션 — 6×4 그리드, 좌우 화살표
- [x] #9 구독/해지 기능 — useSubscription 훅, 뱃지 카운트

### 리스트 뷰

- [x] #10 CategoryTabBar 컴포넌트 — 카테고리 탭 (종합/경제, 방송/통신, IT, 스포츠/연예, 매거진/전문지, 지역)
- [ ] #11 ProgressBar 컴포넌트 — 활성 탭 하단 6초 주기 프로그레스 바, 완료 시 다음 언론사 자동 전환
- [ ] #12 PressNewsCard 컴포넌트 — 언론사 로고 + 편집일시 + 헤드라인 이미지(placeholder) + 기사 목록 + 메인 기사 제목
- [ ] #13 ListView 조립 — CategoryTabBar + ProgressBar + PressNewsCard + 수동 페이지네이션 연결
