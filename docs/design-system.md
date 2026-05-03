# 뉴스스탠드 디자인 시스템

## 디자인 원칙

| 원칙 | 설명 |
|------|------|
| Clarity over decoration | 그라데이션, 글로우 없음. 1px 헤어라인 보더(`#D2DAE0`)로 시각적 분리 |
| Type is the brand | 각 언론사는 타입 워드마크로 표현 (weight, italic, color, underline, flag glyph) |
| One accent color | `#7890E7` (인디고) — 구독 수 배지와 활성 탭에만 사용 |
| Dense and calm | 16px body, 12px meta, tight line-height (1.15–1.5) |

---

## 컬러 토큰

| 토큰 | 값 | 용도 |
|------|----|------|
| ink | `#14212B` | 본문 텍스트, 볼드 레이블, 그리드 선 |
| ink-alt | `#14202B` | ink와 동일 역할 |
| sub | `#5F6E76` | 보조 텍스트 (날짜, 캡션, 구독 라인) |
| mute | `#879298` | 비활성 탭 레이블, 빈 chevron |
| line | `#D2DAE0` | 1px 구분선, 카드 보더, 그리드 선 |
| soft | `#F5F7F9` | 티커 bg, field-tab bg (열린 언론사) |
| soft-alt | `#F7F7FC` | 보조 서피스 |
| card | `#FFFFFF` | 그리드 셀, 열린 언론사 바디, 구독 필 |
| page | `#FEFEFE` | 페이지 배경 |
| accent | `#7890E7` | 구독 수 배지, 활성 탭, hover 커서 |
| accent-deep | `#4362D0` | 활성 탭 내부 프로그레스 fill |
| badge-ink | `rgba(255,255,255,0.7)` | accent 서피스의 숫자 |

---

## 타이포그래피

### 폰트 패밀리
- **기본**: Pretendard Variable / Pretendard → Noto Sans KR → system sans
- **숫자**: IBM Plex Mono (탭 카운터 `1 / 81`)
- **세리프**: Noto Serif KR (朝鮮日報, Korea JoongAng Daily, Insight, Forbes 등)

### 자간
- 한국어 body: `-0.01em`
- display: `-0.02em`
- 라틴: `0`

### 타입 스케일

| 토큰 | 크기/굵기/행간 | 용도 |
|------|----------------|------|
| display | 24 / 700 / 100% | "뉴스스탠드" 헤더 워드마크 |
| heading | 16 / 700 / 100% | 활성 탭 레이블, 기사 헤드라인 |
| body | 16 / 500 / 22px | 비활성 탭, 날짜, 구독 레이블 |
| list-item | 14 / 500 / 1.5 | 기사 리스트 행 |
| caption | 12 / 500 / 1 | 편집 시간, 각주, 구독 필 |
| badge | 12 / 500 / 1 | 배지 카운트, 구독 필 |
| mono-tab | 12 / 500 / 1 | 탭 카운터 "1 / 81" (IBM Plex Mono) |

> 규칙: 본문 텍스트는 항상 `ink`. `sub` 이하는 항상 보조 텍스트.

---

## 스페이싱

기본 단위: **8px** (4, 8, 12, 16, 24, 32, 40, 48, 64)

### 캔버스 레이아웃 (1280 × 720)

| 영역 | 값 |
|------|----|
| left/right gutter | 175px |
| content width | 930px (1280 − 175 − 175) |
| header y | 58 (height 29) |
| ticker y | 127 (height 49) |
| tab bar y | 208 (height 24) |
| content y | 256 (930 × 388) |
| chevron y | 430 (24 × 40, left 103 / right 1153) |

---

## 반경 / 선 / 그림자

| 토큰 | 값 | 용도 |
|------|----|------|
| r-0 | 0 | 그리드 셀, 티커 카드, 열린 언론사 프레임 |
| r-sub | 2px | 언론사 로고 배경 (KBS WORLD, BBS NEWS 등) |
| r-pill | 14px | 구독/해지 필 (height 28) |
| r-badge | 10px | 구독 수 배지 (20 × 20) |

- **선**: 항상 1px, `#D2DAE0`. 다른 두께/색상 없음
- **그림자**: 구독 필에만 `0 1px 2px rgba(20,33,43,0.04)`

---

## 컴포넌트 스펙

### 헤더
- Layout: flex space-between, height 29
- 좌: newspaper-icon (24×24) + "뉴스스탠드" display 24/700
- 우: 날짜 "2026. 01. 14. 수요일" body 16/500 color sub

### 뉴스 티커
- 2개 레인 나란히, gap 8, height 49, bg `#F5F7F9`
- 각 레인: press name 14/700 ink (width 56 fixed) + title 14/500 ink (flex 1, ellipsis)
- 3.2초마다 다음 항목으로 rotate, crossfade 0.55s (`cubic-bezier(.4,0,.2,1)`)
- 두 레인은 오프셋되어 동시에 rotate되지 않음

### 탭바
- Row, space-between, height 24
- **좌 클러스터** (gap 24):
  - "전체 언론사" 16/700(활성) or 16/500 mute(비활성)
  - "내가 구독한 언론사" 동일
  - 구독 수 배지: 20×20, r-badge, accent bg, 12/500 `rgba(255,255,255,0.7)`
- **우 클러스터** (gap 8):
  - list-view 아이콘 24×24
  - grid-view 아이콘 24×24
  - 활성: ink / 비활성: mute

### 그리드
- 930 × 388, bg `#D2DAE0`, border 1px `#D2DAE0`
- CSS grid: 6열 × 4행, gap 1px (구분선 역할)
- 각 셀: bg `#FFFFFF`, center content, ~154 × ~96px
- **셀 hover**: bg `#F5F7F9` + 구독/해지 필 버튼 표시

### 언론사 워드마크 props

```typescript
interface PressWordmark {
  name: string           // 언론사명
  color: string          // 텍스트 색상 hex
  bg?: string            // 배경 칩 색상 (KBS WORLD 등)
  weight: 400 | 500 | 700
  family: 'sans' | 'serif'
  italic?: boolean
  underline?: boolean
  tracking?: string      // letter-spacing (예: "0.08em")
  accent?: string        // 특정 글자 강조 색상
  accentChar?: number    // accent 적용할 글자 인덱스
  accentUnder?: number[] // accent 색상으로 밑줄 칠 글자 인덱스들
  accentBg?: boolean     // accent 글자에 배경칩 적용
  flag?: boolean         // 빨간 flag glyph 추가 (아시아경제)
  latin?: boolean        // 한국어 자간 비활성화
  small?: boolean        // 14px (긴 라틴 이름)
}
```

- display: `inline-flex`, flex-wrap: wrap, align/justify: center
- max-width: 셀의 88%, word-break: keep-all
- line-height: 1.15

### 구독/해지 필
- height 28, padding 0 12, r-pill, bg `#FFFFFF`, border 1px `#D2DAE0`
- 텍스트: 12/500 sub
- 아이콘: 10×10 plus(구독) or minus(해지), stroke sub 1.3
- 그림자: `0 1px 2px rgba(20,33,43,0.04)`

| 탭 | 셀 hover 시 표시 |
|----|-----------------|
| 전체 언론사 | + 구독하기 필 |
| 내가 구독한 언론사 | − 해지하기 필 |

### Chevron (페이지 이동)
- 24 × 40, stroke `#879298` 1.4
- position: left 103 / right 1153, top 430
- disabled: opacity 0

### Field Tab (언론사 클릭 후 카테고리 탭)
- height 40, bg `#F5F7F9`, border 1px `#D2DAE0`
- 각 탭: flex 1, padding 0 16, 탭 사이 1px `#D2DAE0` 보더
- **비활성**: 14/500 sub
- **활성**:
  - fill: `#7890E7` (전체 탭)
  - progress: `#4362D0` 좌→우 0→100% over 6초 linear
  - 레이블: 14/700 `#FFFFFF`
  - 우측 카운터: "1/81", 12/500 mono, "1" primary + "/81" opacity .7

### 열린 언론사 레이아웃 (리스트뷰)
- 930 × 388, card bg, border 1px line (상단 없음 — field tab이 담당)
- inner padding: 24 32
- **헤드 행** (flex gap 16 align center): 언론사 워드마크 + 편집시간 12/500 sub + 구독 필
- **바디** (flex gap 24, marginTop 4):
  - LEFT 340px: 헤드라인 이미지 박스 ~340×188 (bg gradient `#EFF1F6→#DDE3EC`) + 헤드라인 16/700 ink
  - RIGHT flex 1: 기사 6개 (14/500 ink, bullet 3×3 `#14212B`) + 각주 12/500 mute

---

## 상태 및 흐름

### 탭 상태
- `전체 언론사`: 6×4 그리드 전체 언론사 (3페이지 × 24 = 72개)
- `내가 구독한 언론사`: 구독한 셀만 채워짐, 나머지 흰색

### 페이지네이션
- Chevron으로 그리드 페이지 이동
- `전체 언론사`: 3페이지
- `내가 구독한 언론사`: 구독 수에 따라 (최대 24개/페이지)

### 언론사 클릭 → 리스트뷰 진입
- 그리드 → 열린 언론사 레이아웃으로 전환
- 진입 탭: 해당 언론사의 primary 카테고리
- 프로그레스 0부터 시작

---

## 전역 상태 구조 (참고)

```typescript
{
  tab: "all" | "sub",
  page: number,
  opened: pressId | null,
  tabKey: categoryKey,
  progress: 0..1,
  currentInTab: number,
  subscribed: Set<pressId>
}
```

---

## 접근성

- 탭바: `role="tablist"` / 탭 `role="tab"`, 활성 탭 `aria-selected="true"`
- Chevron: `<button>` + `aria-label="이전 페이지"/"다음 페이지"`, 비활성 시 `disabled`
- 구독 배지: `aria-label="구독 중인 언론사 9곳"`
- hover only 컨트롤(구독 필): `:focus-within`으로 키보드 접근 가능
- 티커: hover/focus 시 rotation pause, `prefers-reduced-motion` 시 완전 비활성화
- 색상 대비: 모든 텍스트 WCAG AA 충족

---

## 권장 React 컴포넌트 구조

```tsx
<Newsstand>
  <Header date={today} />
  <Ticker items={tickerItems} />
  <TabBar
    activeTab={"all" | "sub"}
    subCount={n}
    viewer={"grid" | "list"}
    onTabChange={...}
    onViewerChange={...}
  />
  {opened
    ? <PressOpen press={activePress} tabKey={cat} />
    : <PressGrid
        items={pageItems}
        subscribedIds={set}
        onSubscribe={...}
        onUnsubscribe={...}
        onOpen={...}
      />
  }
  <Chevron dir="left" disabled={page===0} onClick={...} />
  <Chevron dir="right" disabled={page===lastPage} onClick={...} />
</Newsstand>
```
