# 뉴스스탠드 디자인 시스템

> 출처: 뉴스스탠드_디자인시스템.pdf (Design Canvas v1, 2026.01)  
> React 구현을 위한 전체 토큰, 규칙, 컴포넌트 스펙 문서

---

## 1. 디자인 원칙

| 원칙 | 설명 |
|---|---|
| Clarity over decoration | 그라디언트 없음, 글로우 없음. 1px 보더(#D2DAE0)가 대부분의 시각적 구분을 담당 |
| Type is the brand | 각 언론사는 weight, italic, color, underline, 플래그 글리프로 표현 — 이미지 로고 없음 |
| One accent color | `#7890E7`(인디고) — 구독 배지와 활성 프로그레스 탭 **단 두 곳에만** 사용 |
| Dense and calm | 16px body, 12px meta, tight line-height(1.15–1.5). 공백이 여백 역할 |

---

## 2. 컬러 토큰

```css
:root {
  --ink:          #14212B;  /* body text, bold labels, grid strokes */
  --ink-alt:      #14202B;  /* ink와 교체 가능 */
  --sub:          #5F6E76;  /* secondary text (dates, captions) */
  --mute:         #879298;  /* inactive tab labels, empty chevron */
  --line:         #D2DAE0;  /* 1px dividers, card borders, grid strokes */
  --soft:         #F5F7F9;  /* ticker bg, hover bg, field-tab bg */
  --soft-alt:     #F7F7FC;  /* reserved secondary surface */
  --card:         #FFFFFF;  /* grid cell, opened-press body, subscribe pill */
  --page:         #FEFEFE;  /* page background */
  --accent:       #7890E7;  /* subscribed badge, active tab fill */
  --accent-deep:  #4362D0;  /* progress fill inside active tab */
  --badge-ink:    rgba(255,255,255,0.7); /* numeric on accent surfaces */
  --danger:       #FFD1CF;  /* reserved for destructive states (미사용) */
}
```

> ⚠️ 주의: accent 색상은 `#7890E7`(인디고). 네이버 파란색(`#0068c8`)이 아님.

---

## 3. 타이포그래피

### 폰트 패밀리

- **Primary**: `Pretendard Variable` / `Pretendard`, fallback: `Noto Sans KR` → system sans
- **Numeric**: `IBM Plex Mono` — 카운터 "1 / 81"
- **Serif accent**: `Noto Serif KR` — 朝鮮日報, Korea JoongAng Daily, Insight, Forbes 등

### 스케일

| Token | Size / Weight / Leading | 사용처 |
|---|---|---|
| display | 24 / 700 / 100% | "뉴스스탠드" 헤더 워드마크 |
| heading | 16 / 700 / 100% | 활성 탭 레이블, 기사 헤드라인 |
| body | 16 / 500 / 22px | 비활성 탭, 오늘 날짜, 구독 레이블 |
| list-item | 14 / 500 / 1.5 | 기사 목록 행 |
| caption | 12 / 500 / 1 | 편집 시각, 각주, 구독 pill |
| badge | 12 / 500 / 1 | 배지 카운트, subscribe pill |
| mono-tab | 12 / 500 / 1 | 탭 카운터 "1 / 81" (IBM Plex Mono) |
| mono-label | 10 / 500 / 1 | 페이지 레이블 |

### 자간 규칙

- Korean body: `-0.01em`, display: `-0.02em`
- Latin: `0` (언론사 워드마크 tracking 개별 override — 朝鮮日報: `0.08em`)

---

## 4. 간격 (8px 기반)

스케일: `4, 8, 12, 16, 24, 32, 40, 48, 64`

### 캔버스 레이아웃 (1280 × 720)

| 영역 | y 위치 | 높이 |
|---|---|---|
| Header | 58 | 29 |
| Ticker | 127 | 49 |
| Tab bar | 208 | 24 |
| Content (그리드/리스트) | 256 | 388 |
| Chevron | 430 | 40 |

- **Content width**: 930px (1280 − 175 − 175)
- **Left/Right gutter**: 각 175px
- **Chevron 위치**: left 103 / right 1153

---

## 5. Radii, Stroke, Shadow

### Radii 토큰

| Token | Value | 사용처 |
|---|---|---|
| r-0 | 0 | 그리드 셀, 티커 카드, opened-press 프레임 |
| r-sub | 2px | 언론사 로고 배경 (KBS WORLD, BBS NEWS) |
| r-pill | 14px | 구독/해지 pill (height 28) |
| r-badge | 10px | 구독 배지 (20×20) |

### Stroke

- 항상 **1px, #D2DAE0** — 다른 굵기/색상 없음

### Shadow

- 기본: none (그리드 프레임)
- Subscribe pill만: `0 1px 2px rgba(20,33,43,0.04)`

---

## 6. 컴포넌트 스펙

### 6.1 Header

```
height: 29px
layout: flex space-between, align center
Left:  신문 아이콘(24×24, stroke #14212B) + "뉴스스탠드" display 24/700
Right: 오늘 날짜 "2026. 01. 14. 수요일", body 16/500, color: --sub
```

### 6.2 뉴스 티커 (자동 롤링)

```
height: 49px
background: --soft (#F5F7F9)
Two lanes side by side, gap 8
Behavior: rotate every 3.2s, crossfade 0.55s (cubic-bezier(.4,0,.2,1))
두 레인은 동시에 회전하지 않도록 offset
prefers-reduced-motion: 완전 비활성화
```

### 6.3 TabBar + 뷰 토글

```
height: 24px
layout: row, space-between

Left cluster (gap 24):
  "전체 언론사":       16/700 ink (active) | 16/500 mute (inactive)
  "내가 구독한 언론사": 16/700 ink (active) | 16/500 mute (inactive)
    + badge: 20×20, r-badge(10), bg accent(#7890E7), 12/500 rgba(255,255,255,0.7)

Right cluster (gap 8):
  list-view icon  24×24  ink (active) | mute (inactive)
  grid-view icon  24×24  ink (active) | mute (inactive)
```

### 6.4 그리드 (전체 언론사)

```
크기: 930×388
background: #D2DAE0
CSS grid: 6 columns × 4 rows, gap 1 (divider line 효과)
각 셀: ~154×96px, background #FFFFFF, center content

Cell hover:
  bg: #F5F7F9 (--soft)
  wordmark 자리에 pill 버튼 표시:
    전체 언론사 탭: "+ 구독하기"
    구독 탭:       "− 해지하기"
  optional: 흰색 cursor glyph 18×22 (pill 아래)
```

### 6.5 언론사 워드마크 (PressWordmark)

각 언론사는 다음 props로 표현 (이미지 아님, 순수 타이포그래피):

```ts
interface PressWordmarkProps {
  name: string
  color?: string        // 텍스트 색상
  bg?: string          // 배경 칩 (KBS WORLD 등)
  weight?: 400|500|700
  family?: 'sans'|'serif'
  italic?: boolean
  underline?: boolean
  tracking?: string     // CSS letter-spacing, e.g. "0.08em"
  accent?: string       // 특정 글자 강조 색상
  accentChar?: number   // 강조 글자 인덱스
  accentUnder?: number[] // 강조 색상으로 밑줄 처리할 인덱스
  accentBg?: boolean    // 강조 글자에 칩 배경 (색상 대신)
  flag?: boolean        // 빨간 플래그 글리프 추가 (아시아경제)
  latin?: boolean       // 한국어 자간(-0.01em) 비활성화
  small?: boolean       // 14px (긴 영문명용)
}
```

렌더 규칙:
```
display: inline-flex, flex-wrap: wrap, align/justify: center
max-width: 88% of cell
word-break: keep-all
line-height: 1.15, no nowrap
```

### 6.6 Subscribe/Unsubscribe Pill

```
height: 28px
padding: 0 12px
border-radius: 14px (r-pill)
background: #FFFFFF (--card)
border: 1px solid #D2DAE0 (--line)
shadow: 0 1px 2px rgba(20,33,43,0.04)

Text: 12/500 --sub
Leading icon: 10×10 plus(구독) or minus(해지), stroke --sub 1.3
```

### 6.7 Chevron (페이지 이동)

```
크기: 24×40
stroke: #879298 (--mute) 1.4
right-pointing chevron glyph
Position: left 103 / right 1153, top 430

disabled: opacity 0 (레이아웃 유지, 시각적 숨김)
```

### 6.8 Field Tab (리스트 뷰 카테고리 탭)

```
height: 40px
background: #F5F7F9 (--soft)
border: 1px solid #D2DAE0 (--line)
각 탭: flex 1, padding 0 16, right-border 1px --line

Inactive: 14/500 --sub
Active:
  fill: #7890E7 (--accent) 전체
  progress overlay: #4362D0 (--accent-deep), 0→100% over 6s linear
  label: 14/700 #FFFFFF
  counter right: "1/81", 12/500 mono, "1" normal + "/81" opacity 0.7
```

Behavior:
```
progress 6초 → currentInTab++
currentInTab 초과 시 → next tabKey, reset to 1
탭 전체 소진 시 → 첫 탭으로 루프
```

### 6.9 Opened Press Layout (리스트 뷰 본문)

```
크기: 930×388
background: --card
border: 1px solid --line (상단 없음 — field tab이 소유)
inner padding: 24 32

Head row (flex, gap 16, align center):
  press wordmark (scale 1.05)
  편집 시각: 12/500 --sub, tabular-nums
  subscribe pill

Body (flex, gap 24, marginTop 4):
  LEFT 340px:
    headline image: ~340×188, bg linear-gradient(135deg,#EFF1F6,#DDE3EC),
                    1px --line border, centered "headline image" placeholder
    headline: 16/700 --ink, line-height 1.45
  RIGHT flex 1:
    6개 기사 목록: 14/500 --ink, line-height 1.5
                   bullet: 3×3 square #14212B, translateY -4
    footnote (auto mt): 12/500 --mute "{press} 언론사에서 직접 편집한 뉴스입니다."
```

---

## 7. 상태 및 플로우

### 전체 앱 State

```ts
{
  tab: "all" | "sub",
  page: number,
  opened: pressId | null,  // 클릭한 언론사 (null = 그리드 뷰)
  tabKey: categoryKey,
  progress: 0..1,
  currentInTab: number,
  subscribed: Set<pressId>
}
```

### 그리드 탭 상태

- `전체 언론사` → 전체 언론사 6×4 그리드, 페이지 3개 (3 × 24 = 72개)
- `내가 구독한 언론사` → 희소 그리드, 구독 셀만 채움; 빈 셀 흰색

### 클릭 → 리스트 뷰 진입

언론사 셀 클릭 → `opened = pressId` → 그리드에서 opened-press 레이아웃으로 전환  
진입 탭: 언론사의 primary category (SBS Biz → 방송/통신)  
Progress는 0에서 시작

### 페이지네이션 범위

- `전체 언론사`: 3페이지
- `내가 구독한 언론사`: 구독 수에 따라 (≤24/페이지)

### 티커

- 항상 표시 (그리드 + 리스트 뷰)
- hover/focus 시 회전 중지
- `prefers-reduced-motion`: 완전 비활성화

---

## 8. 접근성 (a11y)

- Tab bar: `role="tablist"` / 탭: `role="tab"`, 활성 탭: `aria-selected="true"`
- Chevron: `<button>` + `aria-label="이전 페이지"` / `"다음 페이지"`, 비활성 시 `disabled`
- 구독 배지: `aria-label="구독 중인 언론사 N곳"`
- hover-only 컨트롤(subscribe pill): `:focus-within`으로 키보드에서도 표시
- 색상 대비: 모든 텍스트 WCAG AA 충족 (`mute` #879298은 14px+에서 통과)

---

## 9. 구현 체크리스트 (디자인시스템 기준)

- [ ] CSS 변수로 색상 + 타이포 토큰 정의 (`:root`)
- [ ] `<PressWordmark press={p} />` 컴포넌트 (press 객체 기반)
- [ ] `<GridCell>` hover 시 wordmark ↔ subscribe pill 교체
- [ ] `<Ticker>` 2레인 회전 + reduced-motion 가드
- [ ] `<FieldTab>` progress 애니메이션으로 상위 state 구동
- [ ] Focus/keyboard 패리티 (mouse hover와 동일)
- [ ] `prefers-reduced-motion` 처리
- [ ] 1280px 기준 레이아웃, 그 이하에서 스케일 다운
