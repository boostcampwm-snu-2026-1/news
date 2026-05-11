# 뉴스스탠드 컴포넌트 계층 가이드

## 계층

```txt
app/page.tsx
└─ Newsstand
   ├─ Header
   ├─ Ticker
   │  └─ TickerLane x 2
   ├─ ControlRow
   │  ├─ ScopeTabs
   │  └─ ViewToggle
   └─ ContentStage
      ├─ PaginationChevron
      ├─ PressGrid
      │  ├─ PressCell
      │  └─ PressWordmark
      └─ ListPreview
         ├─ CategoryTabs
         ├─ OpenedPressMeta
         ├─ HeadlineCard
         └─ ArticleList
```

## 책임 분리 원칙

- `page.tsx`: 서버 경계. 초기 데이터만 주입하고 상호작용 상태는 갖지 않는다.
- `Newsstand`: 유일한 상태 컨테이너. reducer 호출과 파생 상태 계산을 담당한다.
- `Header`, `Ticker`: 입력이 명확한 표시 전용 컴포넌트다.
- `PressGrid`: 페이지 단위로 잘린 언론사 목록만 렌더링한다.
- `ListPreview`: 현재 선택 언론사와 카테고리 상태를 시각화한다.
- `PressWordmark`, `icons`: 순수 프리미티브. 비즈니스 규칙을 모르면 된다.

## 점검 기준

### 1. 상태 소유 위치

- 구독/탭/페이지/리스트 선택 상태는 모두 `Newsstand`에 둔다.
- hover 상태는 CSS에 맡긴다.
- 기사 데이터 자체는 `Press` 모델에 둔다.

### 2. props 경계

- 하위 컴포넌트는 필요한 데이터와 이벤트만 받는다.
- 하위 컴포넌트에 전체 `presses` 배열을 넘기지 않는다.
- 렌더링용 문자열 포맷은 상위에서 끝내서 하위는 표시만 하게 한다.

### 3. 테스트 가능성

- 상태 전이 로직은 React 바깥의 순수 함수로 분리한다.
- 순수 함수는 unit test로 검증하고, React 컴포넌트는 lint/build/UI 확인으로 검증한다.
- 타이머는 reducer 상태와 effect를 분리해 테스트 없이도 reasoning 가능한 구조로 유지한다.

## 이번 구현에서 피할 것

- 리스트 뷰 전용 상태를 `ListPreview` 내부에 숨기는 방식
- 페이지 계산과 필터 계산을 JSX 안에서 중복 수행하는 방식
- 카테고리 탭이 자체적으로 자동 진행 타이머를 소유하는 방식
- wordmark 컴포넌트가 구독 상태까지 해석하는 방식
