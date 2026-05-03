# 뉴스스탠드 (Newsstand)

데스크톱 웹 기반 한국 뉴스 포털. React로 구현하며 외부 UI 라이브러리 없이 CSS + vanilla React만 사용한다.

## 서비스 개요

언론사 그리드를 탐색하고, 구독/해지하며, 언론사별 기사 리스트를 6초 자동 진행 탭으로 열람하는 서비스.

- 뷰포트: 1280px 고정 콘텐츠 폭 (데스크톱 전용)
- 상태는 `<Newsstand>` 루트 컴포넌트에 집중 관리
- 외부 라이브러리 없이 React + CSS Variables만 사용

## 기술 스택

| 역할 | 선택 |
|------|------|
| 빌드 | Vite |
| 언어 | TypeScript |
| 스타일 | CSS Modules + CSS Variables |
| 상태 | useReducer + Context |
| 폰트 | Pretendard (NPM), IBM Plex Mono / Noto Serif KR (Google Fonts CDN) |

**사용하지 않는 것**: Tailwind, styled-components, Redux, Zustand, React Router, Axios

초기화: `npm create vite@latest newsstand -- --template react-ts`

## 화면 구성 (6 프레임)

| # | 상태 | 설명 |
|---|------|------|
| 01 | 기본 상태 | 헤더·티커·탭바·6×4 언론사 그리드 |
| 02 | Hover → 구독하기 | 그리드 셀 hover 시 "+ 구독하기" 필 버튼 표시 |
| 03 | 내가 구독한 언론사 + Hover → 해지하기 | 구독 탭 전환, "− 해지하기" 필 버튼 |
| 04 | 페이지네이션 | 좌우 chevron, 페이지 2/3 상태 |
| 05 | 기사 리스트 (리스트 뷰) | 언론사 선택 후 카테고리 탭 + 6초 프로그레스 진행 |
| 06 | 페이지 자동 전환 직전 | 프로그레스 100% 완료 → 다음 언론사로 전환 |

## 색상 토큰 (CSS Variables → `:root`)

```css
--ink: #14212B;         /* 본문, 굵은 레이블 */
--sub: #5F6E76;         /* 날짜, 캡션, 구독 텍스트 */
--mute: #879298;        /* 비활성 탭, chevron */
--line: #D2DAE0;        /* 1px 구분선, 카드 테두리 */
--soft: #F5F7F9;        /* 티커 배경, 필드 탭 배경 */
--card: #FFFFFF;        /* 그리드 셀, 기사 뷰 */
--page: #FEFEFE;        /* 페이지 배경 */
--accent: #7890E7;      /* 구독 배지, 활성 탭 */
--accent-deep: #4362D0; /* 프로그레스 바 fill */
```

## 타이포그래피

- **Primary**: Pretendard Variable → Pretendard → Noto Sans KR → system-ui
- **Mono**: IBM Plex Mono (탭 카운터 `1 / 81`)
- **Serif**: Noto Serif KR (조선일보, Korea JoongAng Daily, Insight 등 워드마크)

| 토큰 | size/weight/leading | 용도 |
|------|---------------------|------|
| display | 24/700/100% | "뉴스스탠드" 헤더 |
| heading | 16/700/100% | 활성 탭 레이블, 기사 헤드라인 |
| body | 16/500/22px | 비활성 탭, 날짜 |
| list-item | 14/500/1.5 | 기사 리스트 행 |
| caption | 12/500/1 | 편집 시간, 구독 필 텍스트 |
| mono-tab | 12/500/1 | `1 / 81` 카운터 |

한글 자간: `-0.01em` (display: `-0.02em`)

## 스페이싱

기본 단위 **8px** (4, 8, 12, 16, 24, 32, 40, 48, 64).

## 컴포넌트 구조

```
<Newsstand>                  ← 전체 상태 소유
  <Header date={today} />
  <Ticker items={tickerItems} />
  <TabBar
    activeTab={"all" | "sub"}
    subCount={n}
    viewer={"grid" | "list"}
    onTabChange onViewerChange
  />
  {opened
    ? <PressOpen press={activePress} tabKey={cat} />
    : <PressGrid
        items={pageItems}
        subscribedIds={set}
        onSubscribe onUnsubscribe onOpen
      />
  }
  <Chevron dir="left"  disabled={page===0} />
  <Chevron dir="right" disabled={page===lastPage} />
</Newsstand>
```

## 루트 상태 구조

```js
{
  tab: "all" | "sub",        // 현재 탭
  page: number,              // 그리드 페이지 (0-based)
  opened: pressId | null,    // 열린 언론사
  tabKey: categoryKey,       // 카테고리 탭 키
  progress: 0..1,            // 필드 탭 프로그레스
  currentInTab: number,      // 현재 탭 내 기사 인덱스
  subscribed: Set<pressId>   // 구독 중인 언론사
}
```

## 핵심 인터랙션 명세

### 그리드 셀 (`<GridCell>`)

- 930×388px 그리드 전체, 6열×4행, gap 1px (선이 구분선 역할)
- 셀 크기: ~154×96px, 배경 `--card`
- hover: 배경 `--soft`, 워드마크 → 구독/해지 필 버튼으로 교체
- **전체 언론사 탭**: "+ 구독하기" / **내가 구독한 언론사 탭**: "− 해지하기"

### 언론사 워드마크 (`<PressWordmark>`)

이미지 없이 CSS + styled text로 구현. 각 언론사 객체:

```js
{
  name, color, bg?, weight, family, italic, underline,
  tracking, accent?, accentChar?, flag?, small?
}
```

### 티커 (`<Ticker>`)

- 2개 레인, 3.2초마다 crossfade (0.55s, `cubic-bezier(.4,0,.2,1)`)
- hover/focus 시 회전 정지
- `prefers-reduced-motion` 시 완전 비활성화

### 필드 탭 프로그레스 (`<FieldTab>`)

- 6초 linear fill → 완료 시 `currentInTab++`
- 탭 내 기사 소진 시 다음 카테고리 탭으로 이동
- `setInterval(tick, 100)`으로 구동

### 페이지네이션

- 전체 언론사: 3페이지 (24개 × 3)
- 내가 구독한 언론사: 구독 수에 따라 동적 (≤24/page)
- 첫/마지막 페이지 chevron `opacity: 0` (레이아웃 유지)

## 접근성 요구사항

- 탭바: `role="tablist"` / `role="tab"` / `aria-selected`
- Chevron: `<button aria-label="이전 페이지" | "다음 페이지">`, 비활성 시 `disabled`
- 구독 배지: `aria-label="구독 중인 언론사 N곳"`
- hover 전용 컨트롤(구독 필)은 키보드 `:focus-within`에서도 동일하게 표시
- WCAG AA 색상 대비 준수

## 구현 체크리스트

- [ ] CSS Variables로 색상·타이포 토큰 정의
- [ ] `<PressWordmark>` — 언론사 객체 기반 렌더링
- [ ] `<GridCell>` — hover 시 워드마크 ↔ 구독 필 스왑
- [ ] `<Ticker>` — 2레인 자동 회전 + reduced-motion 대응
- [ ] `<FieldTab>` — 프로그레스 애니메이션 → 상태 전이
- [ ] 키보드 접근성 (hover ↔ focus 동등)
- [ ] 1280px 고정 레이아웃
