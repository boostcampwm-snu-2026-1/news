# 뉴스스탠드 Design Spec

Design Canvas v1 (2026.01) — 6 frames 기준.

---

## 컬러 토큰

```css
:root {
  --ink:         #14212B;              /* body text, bold labels */
  --sub:         #5F6E76;              /* dates, captions, secondary */
  --mute:        #879298;              /* inactive tabs, empty chevron */
  --line:        #D2DAE0;              /* 1px dividers, card borders */
  --soft:        #F5F7F9;              /* ticker bg, hover cell bg, field-tab bg */
  --card:        #FFFFFF;              /* grid cell, opened-press body, pill bg */
  --page:        #FEFEFE;              /* page background */
  --accent:      #7890E7;              /* 구독 배지, 활성 탭 */
  --accent-deep: #4362D0;              /* progress fill */
  --badge-ink:   rgba(255,255,255,.7); /* badge 숫자 */
}
```

---

## 타이포그래피

**폰트 패밀리**
- 기본: `'Pretendard Variable', Pretendard, 'Noto Sans KR', sans-serif`
- 숫자 카운터: `'IBM Plex Mono', monospace`
- 서체 워드마크 (朝鮮日報 등): `'Noto Serif KR', serif`

**타입 토큰**

| 토큰 | size / weight / leading | 사용처 |
|------|------------------------|--------|
| display | 24 / 700 / 100% | "뉴스스탠드" 헤더 |
| heading | 16 / 700 / 100% | 활성 탭 라벨, 기사 헤드라인 |
| body | 16 / 500 / 22px | 비활성 탭, 날짜 |
| list-item | 14 / 500 / 1.5 | 기사 리스트 행 |
| caption | 12 / 500 / 1 | 편집 시각, 각주, 필 텍스트 |
| mono-tab | 12 / 500 / 1 | "1 / 81" 카운터 (IBM Plex Mono) |

**letter-spacing**: 한글 body `-0.01em` / display `-0.02em` / 라틴 `0` (워드마크 tracking 개별 오버라이드)

---

## 스페이싱 & 레이아웃

Base unit **8px**. 사용 값: `4 8 12 16 24 32 40 48 64`

**캔버스 (1280 × 720)**

```
left/right gutter:  175px each
content width:      930px

header    y 58   h 29
ticker    y 127  h 49
tab bar   y 208  h 24
content   y 256  930 × 388
chevrons  y 430  24 × 40  (left x:103 / right x:1153)
```

---

## Radii · 선 · 그림자

| 토큰 | 값 | 사용처 |
|------|----|--------|
| r-0 | 0 | 그리드 셀, 티커, 오픈 프레스 |
| r-sub | 2px | KBS WORLD 등 배경 칩 |
| r-pill | 14px | 구독/해지 필 (h 28) |
| r-badge | 10px | 구독 수 배지 (20 × 20) |

- 선: 항상 `1px solid #D2DAE0`
- 그림자: 구독 필만 `0 1px 2px rgba(20,33,43,0.04)`, 그 외 없음

---

## 컴포넌트 치수 명세

### Header
```
Left:  신문 아이콘 24×24 (stroke #14212B) + "뉴스스탠드" 24/700
Right: 날짜 "2026. 01. 14. 수요일" 16/500 color:sub
height 29, flex space-between
```

### Ticker
```
height 49, bg soft, padding 0 24
레인 2개, gap 8, 각 레인: [언론사명 14/700 w56] [제목 14/500 ellipsis flex1]
회전: 3.2s 간격, crossfade 0.55s cubic-bezier(.4,0,.2,1)
두 레인 오프셋 — 동시 전환 없음
```

### TabBar
```
height 24, flex space-between

Left (gap 24):
  탭 텍스트: active 16/700 ink | inactive 16/500 mute
  배지: 20×20 r-badge bg:accent 12/500 badge-ink

Right (gap 8):
  list/grid 아이콘 24×24: active ink | inactive mute
```

### PressGrid
```
930 × 388, bg #D2DAE0, border 1px #D2DAE0
CSS grid: 6col × 4row, gap 1px (gap이 구분선)
각 셀: bg #FFFFFF, center, ~154 × ~96

hover:
  bg → #F5F7F9
  워드마크 → pill (전체 탭: "+ 구독하기" / 구독 탭: "− 해지하기")
```

### PressWordmark props
```ts
{
  name: string
  color: string
  bg?: string            // 배경 칩 (KBS WORLD 등)
  weight?: 400|500|700
  family?: 'sans'|'serif'
  italic?: boolean
  underline?: boolean
  tracking?: string
  accent?: string
  accentChar?: number
  accentUnder?: number[]
  accentBg?: boolean
  flag?: boolean         // 빨간 flag glyph (아시아경제)
  latin?: boolean        // 한글 tracking 비활성
  small?: boolean        // 14px (긴 라틴 이름)
}
```
렌더: `inline-flex wrap center`, `max-width 88%`, `word-break keep-all`, `line-height 1.15`

### SubscribePill
```
height 28, padding 0 12, r-pill
bg #FFFFFF, border 1px #D2DAE0
text 12/500 sub, icon 10×10 (+/−) stroke sub 1.3
shadow: 0 1px 2px rgba(20,33,43,0.04)
```

### Chevron
```
24 × 40, stroke #879298 1.4
disabled: opacity 0 (레이아웃 유지)
```

### FieldTab (리스트 뷰 카테고리)
```
height 40, bg soft, border 1px line
탭 6개, flex 1, padding 0 16, 탭 사이 right-border 1px line

inactive: 14/500 sub
active:
  bg: #7890E7
  progress overlay: #4362D0, 0→100% 6s linear
  label: 14/700 #FFFFFF
  counter "N/81": 현재 opacity 1 / 전체 opacity 0.7, mono 12/500
```

### PressOpen (리스트 뷰 본문)
```
930 × 388, bg card, border 1px line (상단 없음 — FieldTab이 담당)
padding 24 32

Head row (gap 16, align center):
  워드마크 (scale 1.05) + 편집 시각 12/500 sub + 구독 필

Body (gap 24, marginTop 4):
  LEFT 340px:
    이미지 박스 340×188, bg linear-gradient(135deg,#EFF1F6,#DDE3EC), border 1px line
    헤드라인 16/700 ink, line-height 1.45
  RIGHT flex 1:
    리스트 6행 14/500 ink line-height 1.5
    bullet 3×3 square #14212B translateY -4
    각주 12/500 mute "{press} 언론사에서 직접 편집한 뉴스입니다."
```

---

## 접근성

- Tab bar: `role="tablist"`, 탭 `role="tab"`, 활성 `aria-selected="true"`
- Chevron: `<button>` `aria-label="이전 페이지"/"다음 페이지"`, 끝에서 `disabled`
- 배지: `aria-label="구독 중인 언론사 N곳"`
- 구독 필: `:focus-within`에서도 노출 (hover 전용 아님)
- Ticker: hover/focus → 일시정지, `prefers-reduced-motion` → 완전 비활성
