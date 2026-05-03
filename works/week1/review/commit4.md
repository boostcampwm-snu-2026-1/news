# Commit 4 — feat: #4 레이아웃 셸

- Feature: #4 레이아웃 셸
- Type: feat

## 점검 결과

### 스펙 합치
- 캔버스 1280×720 고정, mx-auto. 디자인시스템 §4.
- 콘텐츠 컬럼 930px, 좌우 거터 175px (`.contentCol { left: var(--gutter); width: var(--content-w); }`).
- y-좌표 토큰 (header 58 / ticker 127 / tabbar 208 / content 256 / chevrons 430) 을 글로벌 클래스(`.headerRow` 등)에 고정. 이후 컴포넌트들은 `className="contentCol headerRow"` 처럼 두 클래스 조합으로 위치 잡음.
- Header (§6.1): 뉴스페이퍼 아이콘 (24×24, stroke 1.4 ink) + "뉴스스탠드" display 24/700 + 우측 날짜 16/500 sub. flex space-between.
- 날짜는 frame 의 "2026. 01. 14. 수요일" 그대로 hard-coded (데모 일관성).

### CLAUDE.md 규칙
- 컬러: ink/sub 만 사용. accent 안 씀. 1px/#D2DAE0 안 씀(Header 자체엔 선 없음).
- 그림자/그라디언트 없음.
- 타이포: display 토큰 (24/700, tracking -0.02em) + body 토큰 (16/500). 한글 letter-spacing 자동 (reset 의 html 기본).
- 아이콘 SVG 의 stroke 굵기 1.4 는 §6.1 ("stroke #14212B") + §6.7 chevron 의 stroke 1.4 와 일관. spec 에 정확한 두께 없으나 1.4 가 가장 가까운 값.
- 시멘틱: `<header>` + `<time>` 사용.

### 회귀
App.tsx 가 placeholder 텍스트 → 캔버스 + Header 로 교체. main.tsx 에 layout.css import 추가. 이전 commit 의 토큰/폰트 모두 정상 적용.

### 테스트
시각 테스트는 manual (브라우저). 자동 테스트는 #13 에서. 현재 build/lint 통과.

### 불필요한 추상화
- NewspaperIcon 은 Header.tsx 안 함수 컴포넌트로 둠 — 다른 곳에서 안 씀. 별도 icons/ 디렉터리 X.
- date 는 props 로 받음 (Header 가 date format 책임 X). 호출자가 decide.

### 기타 메모
- `.contentCol` 같은 글로벌 클래스를 layout.css 에 둔 이유: position 토큰을 컴포넌트마다 중복 작성하면 spec 변경 시 누락 위험. 한 곳에서 전체 캔버스 좌표를 잡는 게 안전.
- `.chevron-left` / `.chevron-right` 는 #9 에서 사용. 미리 박아둠 — 추가 css 변경 없음.
- 뉴스페이퍼 아이콘 SVG 디자인은 frame 의 작은 글리프와 비슷하게 그렸지만, spec 에 정확한 vector path 는 없음 — 시각 차이 가능성 있으나 "newspaper" 모티브는 유지.
