# CODEX.md

## 프로젝트
뉴스스탠드 - 뉴스를 구독하고 읽는 데스크톱 중심 웹앱

사용자는 6×4 언론사 그리드에서 언론사를 탐색하고, 언론사를 구독/해지하며, 특정 언론사를 선택해 기사 리스트 뷰로 진입할 수 있다. 상단에는 자동 롤링 뉴스 티커가 항상 노출되고, 리스트 뷰에서는 카테고리 탭의 진행 바가 6초 주기로 다음 기사/탭으로 이동한다.

## 기술 스택
- React + TypeScript
- Vite
- CSS Modules
- Pretendard / Noto Sans KR / IBM Plex Mono / Noto Serif KR

## 주요 화면
- 전체 언론사 그리드
  - 6 columns × 4 rows, 페이지당 24개 언론사
  - 전체 언론사는 총 3페이지 기준
  - 셀 hover/focus 시 `+ 구독하기` 버튼 노출
- 내가 구독한 언론사
  - 구독한 언론사만 표시
  - 셀 hover/focus 시 `− 해지하기` 버튼 노출
  - 구독 수는 탭 옆 badge로 표시
- 기사 리스트 뷰
  - 언론사 선택 시 진입
  - 상단 카테고리 field tab 표시
  - 활성 탭 progress bar는 6초 동안 차오른 뒤 다음 항목으로 이동
  - 마지막 항목 이후 다음 탭으로 이동하고, 전체 종료 시 처음으로 loop

## 디자인 원칙
- 장식보다 명확성
  - gradient, glow, 과한 shadow 사용 금지
  - 구분은 대부분 1px hairline border로 처리
- Typography 중심의 브랜드 표현
  - 언론사 로고는 이미지가 아니라 styled text wordmark로 구현
  - 언론사별 font weight, serif/sans, italic, underline, tracking, accent color 등을 데이터로 제어
- Accent color는 제한적으로 사용
  - `#7890E7`는 구독 수 badge, 활성 progress tab 등 정말 강조가 필요한 곳에만 사용
- Dense and calm
  - 많은 정보를 한 화면에 담되 차분하고 정돈된 밀도를 유지

## 디자인 토큰

### Color
```css
:root {
  --color-ink: #14212B;
  --color-ink-alt: #14202B;
  --color-sub: #5F6E76;
  --color-mute: #879298;
  --color-line: #D2DAE0;
  --color-soft: #F5F7F9;
  --color-soft-alt: #F7F7FC;
  --color-card: #FFFFFF;
  --color-page: #FEFEFE;
  --color-accent: #7890E7;
  --color-accent-deep: #4362D0;
  --color-badge-ink: rgba(255, 255, 255, 0.7);
  --color-danger: #FFD1CF;
}
```

### Typography
- Primary font: `Pretendard Variable`, `Pretendard`, `Noto Sans KR`, system sans-serif
- Numeric font: `IBM Plex Mono`
- Serif accent font: `Noto Serif KR`
- Korean letter-spacing
  - body: `-0.01em`
  - display: `-0.02em`
- Latin letter-spacing: `0`

```css
:root {
  --font-sans: "Pretendard Variable", Pretendard, "Noto Sans KR", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-serif-ko: "Noto Serif KR", serif;

  --text-display-size: 24px;
  --text-display-weight: 700;
  --text-display-line: 1;

  --text-heading-size: 16px;
  --text-heading-weight: 700;
  --text-heading-line: 1;

  --text-body-size: 16px;
  --text-body-weight: 500;
  --text-body-line: 22px;

  --text-list-size: 14px;
  --text-list-weight: 500;
  --text-list-line: 1.5;

  --text-caption-size: 12px;
  --text-caption-weight: 500;
  --text-caption-line: 1;

  --text-mono-label-size: 10px;
}
```

### Spacing
- 기본 단위: 8px
- 사용 간격: `4, 8, 12, 16, 24, 32, 40, 48, 64`
- 데스크톱 기준 캔버스: `1280 × 720`
- content width: `930px`
- left/right gutter: `175px`

### Radius / Stroke / Shadow
```css
:root {
  --radius-none: 0;
  --radius-sub: 2px;
  --radius-pill: 14px;
  --radius-badge: 10px;

  --stroke-width: 1px;
  --shadow-pill: 0 1px 2px rgba(20, 33, 43, 0.04);
}
```

- border는 항상 `1px solid #D2DAE0`
- grid frame에는 shadow를 사용하지 않는다.
- subscribe/unsubscribe pill에만 매우 약한 shadow 허용

## 레이아웃 기준
```txt
Header y: 58, height 29
Ticker y: 127, height 49
Tab bar y: 208, height 24
Content y: 256, size 930 × 388
Chevrons y: 430, size 24 × 40
Left chevron x: 103
Right chevron x: 1153
```

## 컴포넌트 구조 권장
```tsx
<Newsstand>
  <Header date={today} />
  <Ticker items={tickerItems} />
  <TabBar
    activeTab={activeTab}
    subCount={subscribed.size}
    viewer={viewer}
    onTabChange={handleTabChange}
    onViewerChange={handleViewerChange}
  />
  {openedPressId ? (
    <PressOpen
      press={activePress}
      tabKey={tabKey}
      progress={progress}
      currentInTab={currentInTab}
    />
  ) : (
    <PressGrid
      items={pageItems}
      activeTab={activeTab}
      subscribedIds={subscribed}
      onSubscribe={handleSubscribe}
      onUnsubscribe={handleUnsubscribe}
      onOpen={handleOpenPress}
    />
  )}
  <Chevron dir="left" disabled={page === 0} onClick={goPrevPage} />
  <Chevron dir="right" disabled={page === lastPage} onClick={goNextPage} />
</Newsstand>
```

## 상태 모델
```ts
type NewsstandTab = "all" | "sub";
type ViewerMode = "grid" | "list";

type NewsstandState = {
  tab: NewsstandTab;
  viewer: ViewerMode;
  page: number;
  opened: string | null;
  tabKey: string;
  progress: number; // 0..1
  currentInTab: number;
  subscribed: Set<string>;
};
```

## 데이터 모델 권장
```ts
type PressWordmark = {
  name: string;
  color?: string;
  bg?: string;
  weight?: 400 | 500 | 700;
  family?: "sans" | "serif";
  italic?: boolean;
  underline?: boolean;
  tracking?: string;
  accent?: string;
  accentChar?: number;
  accentUnder?: number[];
  accentBg?: boolean;
  flag?: boolean;
  latin?: boolean;
  small?: boolean;
};

type Press = {
  id: string;
  name: string;
  categoryKeys: string[];
  primaryCategoryKey: string;
  wordmark: PressWordmark;
};

type TickerItem = {
  pressName: string;
  title: string;
};

type Article = {
  id: string;
  pressId: string;
  categoryKey: string;
  title: string;
  editedAt: string;
};
```

## 구현 규칙

### Header
- 왼쪽: newspaper icon `24×24`, stroke `#14212B`
- 오른쪽: 날짜 텍스트 `YYYY. MM. DD. dddd`, body style, color `sub`
- 전체는 `flex`, `space-between`, height `29px`

### Ticker
- 두 개 lane을 좌우로 배치
- lane gap: `8px`
- height: `49px`
- background: `#F5F7F9`
- 각 lane은 `press name + title` 구조
- 3.2초마다 다음 item으로 rotate
- crossfade duration: `0.55s`
- easing: `cubic-bezier(.4, 0, .2, 1)`
- 두 lane은 동시에 바뀌지 않도록 offset 적용
- hover/focus 시 rotation pause
- `prefers-reduced-motion: reduce`에서는 자동 animation 비활성화

### TabBar
- `role="tablist"` 사용
- 각 tab은 `role="tab"`, active tab은 `aria-selected="true"`
- 왼쪽 cluster gap: `24px`
- 오른쪽 view toggle gap: `8px`
- active tab: `16px / 700 / ink`
- inactive tab: `16px / 500 / mute`
- 구독 badge: `20×20`, radius `10px`, bg `accent`, text `badge-ink`
- badge에는 `aria-label="구독 중인 언론사 N곳"` 제공

### PressGrid
- container: `930 × 388`
- background: `line`
- border: `1px solid line`
- CSS grid: `repeat(6, 1fr) / repeat(4, 1fr)`
- gap: `1px`
- cell background: `card`
- cell hover/focus background: `soft`
- empty subscribed grid cell은 white 유지
- hover-only control은 keyboard focus에서도 반드시 노출

### GridCell
- 기본 상태: `<PressWordmark />` 표시
- `all` tab에서 hover/focus: `+ 구독하기` pill 표시
- `sub` tab에서 hover/focus: `− 해지하기` pill 표시
- cell click은 언론사 리스트 뷰 진입
- 구독/해지 pill click은 event propagation을 막아 cell open과 충돌하지 않게 처리

### PressWordmark
- 언론사 로고 이미지를 사용하지 말고 styled text로 구현
- `inline-flex`, `flex-wrap: wrap`, `align-items: center`, `justify-content: center`
- max-width: `88%`
- `word-break: keep-all`
- line-height: `1.15`
- 긴 이름은 2줄 wrap 허용
- `nowrap` 금지
- serif 계열 언론사는 `Noto Serif KR` 사용
- Latin wordmark는 Korean tracking을 강제로 적용하지 않음

### SubscribePill / UnsubscribePill
- height: `28px`
- padding: `0 12px`
- radius: `14px`
- bg: `#FFFFFF`
- border: `1px solid #D2DAE0`
- text: `12px / 500 / sub`
- icon: `10×10`, stroke `sub`, stroke-width `1.3`
- shadow: `0 1px 2px rgba(20,33,43,0.04)`

### Chevron
- button으로 구현
- size: `24 × 40`
- stroke: `#879298`, width `1.4`
- left aria-label: `이전 페이지`
- right aria-label: `다음 페이지`
- disabled 시 opacity `0`으로 시각적으로 숨기되 layout은 유지

### FieldTab
- height: `40px`
- bg: `soft`
- border: `1px solid line`
- 각 tab은 `flex: 1`, padding `0 16px`
- tab 사이 right border `1px solid line`
- inactive label: `14px / 500 / sub`
- active tab fill: `accent`
- active progress overlay: `accent-deep`, left에서 right로 `0% → 100%`
- active label: `14px / 700 / white`
- counter: `IBM Plex Mono`, `12px / 500`
- progress는 6초 linear 기준

### PressOpen
- body size: `930 × 388`
- background: `card`
- border: `1px solid line`
- top border는 field tab과 중복되지 않도록 제거 가능
- inner padding: `24px 32px`
- head row: `flex`, gap `16px`, align center
- edit time: `12px / 500 / sub`, tabular-nums
- body: `flex`, gap `24px`, margin-top `4px`
- left column: `340px`
- headline image box: 약 `340 × 188`, border `1px solid line`
- headline: `16px / 700 / ink`, line-height `1.45`
- right article list: `flex: 1`
- list item: `14px / 500 / ink`, line-height `1.5`
- bullet: `3×3` square, bg `ink`, `translateY(-4px)`
- footnote: `12px / 500 / mute`, bottom aligned

## 인터랙션 플로우
- `전체 언론사` 기본 진입
  - 1페이지의 24개 언론사 표시
- 언론사 셀 hover/focus
  - `+ 구독하기` 표시
- `내가 구독한 언론사` 탭
  - 구독한 언론사만 표시
  - hover/focus 시 `− 해지하기` 표시
- 언론사 클릭
  - grid 대신 opened press list view 표시
  - 해당 언론사의 primary category에서 시작
  - progress는 0에서 시작
- pagination
  - chevron은 현재 tab 기준으로 동작
  - `all`: 3 pages
  - `sub`: 구독 수 기준으로 page 계산, page size 24

## 접근성
- tab UI는 `tablist` / `tab` semantics 준수
- chevron은 `<button>` 사용
- chevron disabled 상태 명확히 처리
- hover에서만 보이는 control은 `:focus-within`에서도 보이게 구현
- ticker는 hover/focus 시 정지
- `prefers-reduced-motion`에서는 ticker와 progress animation을 비활성화하거나 즉시 전환하지 않도록 처리
- 모든 click 가능한 요소는 keyboard 접근 가능해야 함

## 컨벤션
- 컴포넌트: PascalCase
- 파일명: 컴포넌트는 PascalCase, hook은 camelCase
- 타입/인터페이스: PascalCase
- 변수/함수: camelCase
- CSS Module class: camelCase 권장
- 상수: UPPER_SNAKE_CASE 또는 의미 있는 camelCase 객체
- 커밋 타입: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

## 하지 말 것
- `any` 타입 사용 금지
- 외부 UI 라이브러리 사용 금지
- 언론사 로고를 이미지 파일로 대체하지 말 것
- gradient/glow/과한 shadow 사용 금지
- border thickness를 1px보다 두껍게 만들지 말 것
- accent color를 임의로 남용하지 말 것
- hover에서만 접근 가능한 기능을 만들지 말 것
- 긴 언론사명을 `nowrap`으로 강제하지 말 것
- grid gap을 border 대신 margin으로 흉내 내지 말 것

## 우선순위
1. 디자인 토큰을 CSS variables로 먼저 정리한다.
2. `PressWordmark`를 데이터 기반으로 만든다.
3. `PressGrid`와 hover/focus 구독 버튼을 구현한다.
4. `Ticker`를 구현하되 reduced motion과 pause 처리를 포함한다.
5. `PressOpen`과 `FieldTab` progress 로직을 구현한다.
6. keyboard 접근성과 aria label을 마지막에 따로 점검하지 말고 컴포넌트 작성 시 함께 구현한다.

## 디자인 참고
- `디자인시스템.pdf`: 색상, 타이포그래피, spacing, radii, 컴포넌트 상세 규칙
- `뉴스스탠드.pdf`: 전체 화면 frame, hover 상태, 구독 탭, pagination, 리스트 뷰 시각 참고
