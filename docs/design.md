# design.md — 뉴스스탠드 디자인 시스템

> 디자인 관련 규칙은 이 파일을 참조한다.
> 코딩·환경 설정은 `CLAUDE.md` 참조.
>
> **2주차 갱신**: 1주차의 그리드/리스트 UI는 폐기되고
> 네이버 뉴스스탠드(https://newsstand.naver.com/?list=ct1) 형태의
> **3-패널 캐러셀 + 신문 1면 편성 + 하단 썸네일 띠** 구조로 재설계되었다.

---

## 디자인 토큰 (@theme)

```css
/* 색상 */
--color-primary: #03c75a;
--color-primary-hover: #02a84a;
--color-bg: #efe7d7;            /* 캐러셀 배경 — 우드/크라프트 톤 */
--color-surface: #ffffff;       /* 신문 패널 배경 */
--color-border: #e5e8eb;
--color-text-primary: #1a1a1a;
--color-text-secondary: #6b7280;
--color-tab-active: #1a1a1a;    /* 활성 탭 배경(검정 pill) */

/* 폰트 */
--font-sans: -apple-system, BlinkMacSystemFont, 'Malgun Gothic',
             'Apple SD Gothic Neo', sans-serif;

/* 그림자 */
--shadow-panel: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-panel-peek: 0 1px 4px rgba(0, 0, 0, 0.06);

/* 레이아웃 */
--spacing-page-max: 1400px;
--carousel-panel-w: 920px;      /* 중앙 패널 너비 */
--carousel-peek-w: 220px;       /* 좌우 peek 카드 너비 */
--strip-thumb-w: 96px;          /* 하단 썸네일 너비 */
```

---

## 레이아웃 — 페이지 전체 구조

```
┌──────────────────────────────────────────────────────────┐
│  GlobalHeader      (NEWSSTAND 로고 / MY뉴스·전체언론사 / 우측 메뉴) │
├──────────────────────────────────────────────────────────┤
│  CategoryTabs      (주요언론사 · 종합/경제 · 방송/통신 · IT)        │
├──────────────────────────────────────────────────────────┤
│  ◀  ┌─peek─┐ ┌──── FrontPagePanel ────┐ ┌─peek─┐  ▶      │
│     │      │ │  (활성 언론사 1면)        │ │      │         │
│     └──────┘ └─────────────────────────┘ └──────┘         │
│              [자동넘김 ▾]            n / 20  ◁ ▷          │
├──────────────────────────────────────────────────────────┤
│  PublisherStrip   (썸네일 가로 스크롤, 활성 강조)              │
└──────────────────────────────────────────────────────────┘
```

- 최대 너비: `1400px` (`.container-page`)
- 페이지 배경: `--color-bg` (우드 톤)

---

## 컴포넌트 명세

### GlobalHeader
- 높이 `56px`, `bg-surface border-b`
- 좌측: NEWSSTAND 로고 + 안내 문구
- 중앙: `MY뉴스` / `전체언론사` 세그먼트 토글 (활성: 검정 배경 + 흰 글씨)
- 우측: 로그인 / 새로고침 / 설정 (1차 구현은 시각적 더미 OK)

### CategoryTabs
- `flex gap-2 justify-center py-3`
- 탭 4개: `주요언론사` `종합/경제` `방송/통신` `IT`
- 활성: `bg-tab-active text-white rounded-full px-4 py-1.5 text-sm font-bold`
- 비활성: `text-text-secondary hover:text-text-primary`

### Carousel (3-패널)
- 컨테이너: `relative flex items-center justify-center`
- 좌우 peek 카드는 `--carousel-peek-w` 너비로 살짝 보이며 `opacity-60 scale-95`
- 중앙 패널은 `--carousel-panel-w` × `auto`, `shadow-panel`
- 좌우 ◀ ▶ 화살표: `absolute` 배치, 원형 배경 `bg-surface/80 backdrop-blur`, 크기 `48×48`
- 슬라이드 애니메이션: `transform translateX`, `transition: 250ms ease-out`

### FrontPagePanel (신문 1면)
내부 그리드: `grid grid-cols-12 gap-4 p-6`

| 영역 | 위치 | 클래스/규칙 |
|------|------|-------------|
| 헤더 | `col-span-12` | 로고(좌) + 액션버튼(`구독하기`/`이용자 한마디`/`공유`) + 편집시각 + 광고배너(우) |
| 메인 헤드라인 | `col-span-7` | 이미지 `aspect-video` + 굵은 제목 `text-xl font-bold` + 리드 `text-sm text-text-secondary leading-relaxed` |
| HOT 뉴스 | `col-span-5` | `HOT 뉴스` 라벨 + 1·2·3 항목 (큰 랭킹 숫자 + 썸네일 + 제목) |
| 좌 서브리스트 | `col-span-5` | 5~6개 헤드라인, `text-sm` 줄 단위 리스트, 줄임표 처리 |
| 피처박스 | `col-span-4` | 인물/칼럼 카드 — 인물 사진 + 이름 + 직책 + bullet 3개 |
| (HOT 연속) | `col-span-3` | (선택) HOT 4·5위 영역 |
| 푸터 | `col-span-12` | 우측정렬 `{언론사명} 사이트 바로가기 →` `text-xs text-primary` |

- 패널 배경: `bg-surface`, 라운드 `rounded-sm` (네이버는 거의 직각)
- 외곽선 없음, 그림자만

### PublisherStrip
- `flex gap-2 overflow-x-auto py-3 px-4`
- 각 썸네일: `--strip-thumb-w` × `64px`, `bg-surface border`
- 활성 항목: `border-2 border-text-primary`
- 클릭 시 캐러셀이 해당 인덱스로 이동

### CarouselControlBar
- `flex items-center justify-between text-xs text-text-secondary px-2`
- 좌측: `자동넘김` 라벨 + 속도 드롭다운 (`느리게(30초)` / `보통(20초)` / `빠르게(15초)`)
- 우측: `{current} / {total}` (`tabular-nums`) + 미세이동 ◁ ▷

### SubscribeModal (1주차에서 유지)
- 배경: `fixed inset-0 z-50 bg-black/40`
- 박스: `bg-white rounded-xl shadow-xl p-6 w-80`
- 해지 버튼: `bg-red-500 text-white`
- 취소 버튼: `border hover:bg-gray-50`

---

## 색상 팔레트

| 역할 | 색상 코드 | Tailwind 클래스 |
|------|----------|----------------|
| Primary (초록) | `#03c75a` | `text-primary` `bg-primary` |
| 페이지 배경 (우드) | `#efe7d7` | `bg-bg` |
| 패널 배경 | `#ffffff` | `bg-surface` |
| 활성 탭 배경 | `#1a1a1a` | `bg-tab-active` |
| 본문 텍스트 | `#1a1a1a` | `text-text-primary` |
| 보조 텍스트 | `#6b7280` | `text-text-secondary` |

---

## 타이포그래피

| 용도 | 클래스 |
|------|--------|
| 메인 헤드라인 | `text-xl font-bold tracking-tight leading-snug` |
| 서브 헤드라인 (리스트) | `text-sm font-medium truncate` |
| HOT 랭킹 숫자 | `text-2xl font-bold` |
| 피처박스 이름 | `text-base font-bold` |
| 편집시각·푸터 | `text-xs text-text-secondary` |
| 카테고리 탭 | `text-sm font-bold` |

---

## 애니메이션

| 대상 | 설정 |
|------|------|
| 캐러셀 슬라이드 | `transform 250ms ease-out` |
| Peek → 활성 전환 | `opacity 200ms ease, scale 200ms ease` |
| 자동슬라이드 인터벌 | 15s / 20s / 30s (사용자 선택) |
| 버튼 hover | `transition-colors 150ms ease` |

---

## 폐기된 1주차 스타일

다음은 캐러셀 재설계로 사용하지 않는다. 마이그레이션 시 제거.

- `.card` (그리드 카드 hover 패턴)
- `NewsCard`의 호버 오버레이 / 구독 인디케이터 바
- `.btn-subscribe` (액션 버튼 디자인이 패널 헤더로 흡수)
- 카테고리 뱃지 색상 매핑 (그리드 뱃지 미사용)
- ListView 사이드바, CategoryFilter 알약, Pagination 숫자 버튼
- 그리드 `grid-cols-3 md:grid-cols-6` 레이아웃
