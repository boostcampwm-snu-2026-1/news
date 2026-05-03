# 뉴스스탠드 (Newsstand)

네이버 뉴스스탠드 스타일 데스크톱 웹 포털.

## 기술 스택

- **빌드**: Vite + React 18
- **스타일**: CSS Modules (외부 UI 라이브러리 없음)
- **상태관리**: React useState / useEffect
- **데이터**: src/data/ 정적 Mock 데이터
- **구독 상태**: localStorage 저장 및 복원
- **언론사 로고**: 플레이스홀더 이미지 (src/assets/logos/)

## 프로젝트 구조

```
src/
├── components/
│   ├── Header/            # 로고 + 날짜 (YYYY. MM. DD. 요일)
│   ├── NewsTicker/        # 자동 롤링 뉴스 티커 (3초 슬라이드)
│   ├── TabBar/            # 전체 언론사 / 내가 구독한 언론사 N
│   ├── PublisherGrid/     # 6×4 그리드 + 페이지네이션
│   │   ├── PublisherCell/ # 언론사 셀 (hover: 구독하기/해지하기)
│   │   └── Pagination/    # 좌우 chevron + 페이지 인디케이터
│   └── ListView/          # (추후 구현) 기사 리스트 뷰
├── data/
│   ├── publishers.js      # 언론사 목록 (id, name, category, logo)
│   └── articles.js        # 기사 Mock 데이터
├── hooks/
│   └── useSubscriptions.js  # localStorage 구독 상태 관리
├── App.jsx
├── App.module.css
└── index.css
```

## 화면 스펙

### 공통 헤더
- 로고: "뉴스스탠드"
- 날짜: 오늘 날짜를 "YYYY. MM. DD. 요일" 형식으로 표시
- NewsTicker: 언론사명 + 헤드라인 텍스트, 3초마다 자동 슬라이드

### TabBar
- "전체 언론사" | "내가 구독한 언론사 N" (N = 구독 수)
- 활성 탭 하이라이트

### 그리드 뷰
- 6열 × 4행, 페이지당 24개 언론사
- 총 3페이지 (chevron < > 페이지 이동)
- 언론사 셀 hover:
  - 미구독: "+ 구독하기" 필(pill) 버튼 오버레이
  - 구독 중: "− 해지하기" 필 버튼 오버레이
- "내가 구독한 언론사" 탭: 구독 중인 언론사만 그리드에 표시

### ListView (추후 구현)
- 언론사 셀 클릭 → 기사 리스트 뷰 진입
- 카테고리 탭: 종합/경제 · 방송/통신 · IT · 스포츠/연예 · 매거진/전문지 · 지역
- 프로그레스 바: 6초 타이머, 완료 시 다음 언론사 자동 전환

## 핵심 상태

```js
// App.jsx
activeTab        // 'all' | 'subscribed'
currentPage      // 0 | 1 | 2

// useSubscriptions hook
subscriptions    // Set<publisherId>, localStorage 동기화
```

## 스타일 가이드

- 데스크톱 고정 너비: 1060px 중앙 정렬
- 폰트: 시스템 폰트 (Apple SD Gothic Neo, Malgun Gothic)
- 언론사 셀: 흰 배경, 1px 테두리, hover 시 dim + 버튼 오버레이

## 개발 순서

1. Vite 프로젝트 초기화
2. Mock 데이터 (publishers.js, articles.js)
3. 공통 레이아웃: Header + NewsTicker + TabBar
4. PublisherGrid + PublisherCell (hover 상태 포함)
5. Pagination (3페이지)
6. useSubscriptions hook + 구독/해지 기능
7. ListView (추후)

## 코딩 규칙

- 컴포넌트 파일명: PascalCase (`PublisherCell.jsx`)
- CSS 파일: 컴포넌트와 동일 디렉토리 (`PublisherCell.module.css`)
- 외부 라이브러리 추가 금지
- 타이머는 useEffect cleanup으로 반드시 해제
