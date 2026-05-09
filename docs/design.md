# design.md — 뉴스스탠드 디자인 시스템

> 구현된 내용만 기록한다. 미구현 컴포넌트는 구현 완료 후 추가한다.
> 코딩·환경 설정은 `CLAUDE.md` 참조.

---

## 디자인 토큰 (`@theme`)

```css
/* 색상 */
--color-primary: #03c75a;
--color-primary-hover: #02a84a;
--color-bg: #efe7d7;            /* 페이지 배경 — 우드/크라프트 톤 */
--color-surface: #ffffff;       /* 카드·패널 배경 */
--color-border: #e5e8eb;
--color-text-primary: #1a1a1a;
--color-text-secondary: #6b7280;
--color-tab-active: #1a1a1a;    /* 활성 탭·토글 배경 */

/* 폰트 */
--font-sans: -apple-system, BlinkMacSystemFont, 'Malgun Gothic',
             'Apple SD Gothic Neo', sans-serif;

/* 그림자 */
--shadow-panel: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-panel-peek: 0 1px 4px rgba(0, 0, 0, 0.06);

/* 레이아웃 */
--spacing-page-max: 1400px;
--carousel-panel-w: 920px;
--carousel-peek-w: 220px;
--strip-thumb-w: 96px;
```

---

## 페이지 전체 구조

```
┌──────────────────────────────────────────────────────────┐
│  GlobalHeader   (NEWSSTAND / MY뉴스·전체언론사 토글 / 아이콘)  │
├──────────────────────────────────────────────────────────┤
│  CategoryTabs   (주요언론사 · 종합/경제 · 방송/통신 · IT)        │
├──────────────────────────────────────────────────────────┤
│  (캐러셀 영역 — 미구현)                                       │
└──────────────────────────────────────────────────────────┘
```

- 최대 너비: `1400px` (`.container-page`)
- 페이지 배경: `--color-bg` (#efe7d7, 우드 톤)

---

## 컴포넌트 명세

### GlobalHeader

- 높이 `56px` (`h-14`)
- 배경: `bg-bg` (페이지 배경과 동일), 하단 `border-b border-border`
- **좌측**: `NEWSSTAND` 텍스트 로고 (`text-lg font-bold`)
- **중앙**: MY뉴스 / 전체언론사 세그먼트 토글
  - 외곽: `border border-border rounded overflow-hidden` (사각형)
  - 활성: `bg-tab-active text-white px-4 py-1.5 text-sm font-bold`
  - 비활성: `text-text-secondary hover:text-text-primary px-4 py-1.5 text-sm font-bold`
- **우측**: 새로고침 / 설정 아이콘 (`20×20`, `text-text-secondary`, hover 시 `text-text-primary`)

### CategoryTabs

- `flex gap-2 justify-center py-3`
- 탭 4개: `주요언론사` / `종합/경제` / `방송/통신` / `IT`
- 활성: `bg-tab-active text-white rounded-full px-4 py-1.5 text-sm font-bold`
- 비활성: `text-text-secondary hover:text-text-primary rounded-full px-4 py-1.5 text-sm font-bold`

### Carousel (3-패널)

레이아웃 상수:

| 변수 | 값 |
|------|----|
| `PANEL_W` | `736px` (920 × 0.8) |
| `PEEK_W` | `176px` (220 × 0.8) |
| `BASE_X` | `PEEK_W - PANEL_W = -560px` |
| 패널 높이 | `416px` (520 × 0.8) |
| 전체 가시 너비 | `PEEK_W * 2 + PANEL_W = 1088px` |

- 슬라이드 트랙: `flex`, 3개 패널(`[prevIdx, activeIndex, nextIdx]`)을 항상 렌더
- 이동 애니메이션: `transform translateX`, `250ms ease-out`
- 전환 중 `onTransitionEnd`에서 `activeIndex` 업데이트 후 위치 즉시 리셋 (transition 비활성화)
- 끝에서 순환 (`% count`)
- peek 패널: `opacity-60 scale-95 pointer-events-none`
- **화살표**: 원형 배경 없음, `‹` `›` SVG 아이콘만, hover 시 인접 언론사명 툴팁 표시
- 패널 렌더: `renderPanel(index, isActive)` render prop으로 외부에서 주입
- `prevLabel` / `nextLabel` prop으로 툴팁 텍스트 주입

---

## 색상 팔레트

| 역할 | 색상 코드 | Tailwind 클래스 |
|------|----------|----------------|
| Primary (초록) | `#03c75a` | `text-primary` `bg-primary` |
| 페이지 배경 (우드) | `#efe7d7` | `bg-bg` |
| 패널 배경 | `#ffffff` | `bg-surface` |
| 활성 탭·토글 배경 | `#1a1a1a` | `bg-tab-active` |
| 본문 텍스트 | `#1a1a1a` | `text-text-primary` |
| 보조 텍스트 | `#6b7280` | `text-text-secondary` |
| 테두리 | `#e5e8eb` | `border-border` |

---

## 타이포그래피

| 용도 | 클래스 |
|------|--------|
| 서비스 로고 | `text-lg font-bold tracking-tight` |
| 카테고리 탭 | `text-sm font-bold` |
| 토글 라벨 | `text-sm font-bold` |

---

## 공통 레이아웃 클래스

```css
/* @layer components */
.container-page {
  max-width: var(--spacing-page-max); /* 1400px */
  margin-inline: auto;
  padding-inline: 1rem;
}
```
