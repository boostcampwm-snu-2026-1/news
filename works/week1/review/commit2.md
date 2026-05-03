# Commit 2 — feat: #2 디자인 토큰 + 폰트

- Feature: #2 디자인 토큰 + 폰트
- Type: feat

## 점검 결과

### 스펙 합치
디자인시스템 PDF §2 (color), §3 (typography), §4 (spacing + canvas), §5 (radii) 의 모든 토큰을 `:root` CSS 변수로 1:1 매핑.

- 컬러 9개 (ink/ink-alt/sub/mute/line/soft/soft-alt/card/page) + 액센트 4개 (accent/accent-deep/badge-ink/danger).
- 타이포 8개 토큰 (display/heading/body/list-item/caption/badge/mono-tab/mono-label) — size/weight/line-height 정확.
- 한글 letter-spacing body `-0.01em` / display `-0.02em`, latin `0` 토큰화.
- 캔버스 1280×720, 거터 175, 콘텐츠 930, y 좌표 (header 58 / ticker 127 / tabbar 208 / content 256 / chevrons 430), 셰브론 x (103 / 1153) 모두 변수.
- radii 4종 (r-0 / r-sub 2 / r-pill 14 / r-badge 10).
- 모션: ticker 회전 3.2s + 크로스페이드 0.55s + cubic-bezier(.4,0,.2,1), field tab 6s.

### CLAUDE.md 규칙
- accent #7890E7 는 `--c-accent` 로 한 곳만 정의 — 사용처는 §6 컴포넌트들이 소비할 때 강제. (이 commit 은 토큰만, 사용 X)
- 1px / #D2DAE0 는 `--bw` + `--c-line`. 다른 두께/색상 토큰 없음.
- 그림자는 `--sh-pill` 한 변수만 (구독 pill 전용). 그라디언트 토큰은 만들지 않음 — 헤드라인 placeholder 는 인라인 한 곳만 쓸 예정.
- `prefers-reduced-motion: reduce` 가드를 reset.css 전역에 박음 — 자동 회전/전환을 모두 0ms 로 무력화.

### 회귀
신규 css 3 파일 + main.tsx 에 import 3줄. 기존 App.tsx 의 placeholder 텍스트 렌더에 영향 없음 (이전엔 인라인 스타일 X).

### 테스트
토큰 파일 자체는 정적 변수. 토큰 적용 회귀는 #4 이후 컴포넌트 commit 들에서 시각적으로 검증.

### 불필요한 추상화
없음. tokens.css 는 단일 `:root` 블록. fonts.css 는 import 만. reset.css 는 최소 reset + 전역 type/color/reduce-motion 가드.

### 기타 메모
- 폰트는 npm `@fontsource` 대신 CDN (Pretendard + Google Fonts) 사용. 번들 크기 절감 + 부트스트랩 의존성 추가 안 함.
- `--t-display-lh` 를 spec 의 "100%" 에서 CSS `1` 로 정규화 (의미 동일).
- spacing 토큰은 8px 멀티(4/8/12/16/24/32/40/48/64) 를 모두 변수화 — 컴포넌트 단계에서 매직 넘버 금지 위함.
