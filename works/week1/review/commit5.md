# Commit 5 — feat: #5 PressWordmark

- Feature: #5 PressWordmark
- Type: feat

## 점검 결과

### 스펙 합치
- §6.5 의 14 props 전부 지원 (name/color/bg/weight/family/italic/underline/tracking/accent/accentChar/accentUnder/accentBg/flag/latin/small).
- 렌더 규칙 정확:
  - `display: inline-flex; flex-wrap: wrap; align/justify: center;`
  - `max-width: 88%; word-break: keep-all; line-height: 1.15;`
  - chip(`bg`) 일 때 padding 2/6, radius `--r-sub` (KBS WORLD, 이데일리).
  - accent + accentChar 단일 글자 색 override (CEO스코어데일리의 'C', 헤럴드경제의 '헤', SBS Biz 의 'B').
  - accentUnder 인덱스 배열로 특정 글자만 underline (석간 문화일보의 "문화일보" 4글자).
  - accentBg 시 그 글자가 chip 화 (현재 데이터엔 미사용이지만 props 호환).
  - flag 시 빨간 깃발 SVG glyph 추가 (아시아경제).
  - small=true 시 14px (Korea JoongAng Daily, The Korea Herald 같은 긴 latin 이름).
  - latin=true 시 letter-spacing 0 (한글 -0.01em 디폴트와 분리).

### CLAUDE.md 규칙
- accent #7890E7 미사용 — wordmark 의 accent 는 각 언론사 브랜드 컬러라 전혀 다른 hex 들 (CLAUDE.md "사용처 단 두 곳" 룰의 accent 와 의미상 다름).
- 1px/#D2DAE0 미사용. 그림자/그라디언트 없음.
- 폰트는 sans/serif 토큰 사용 (`var(--ff-sans)`, `var(--ff-serif)`). 한글 letter-spacing 은 reset 의 html 디폴트 `-0.01em` 이 inherit. wordmark 별 tracking override 시 그것이 우선.
- 아이콘 (flag) 은 SVG 인라인. ink/red 컬러 직접 박음 — accent 토큰 아님.

### 회귀
신규 컴포넌트 단독. App.tsx 에서 아직 사용 안 함 (#8 그리드에서 사용). 기존 화면 영향 없음.

### 테스트
- Visual: #8 그리드 mount 후 frame 2/4 와 비교.
- Unit: chars split 로직 (accentChar/accentUnder/flag) 은 #13 에서.

### 불필요한 추상화
- FlagGlyph, renderChars 모두 PressWordmark.tsx 안 함수. 다른 파일에서 안 씀.
- chip 스타일은 baseStyle 안에 인라인 (별도 ChipWrap 컴포넌트 X).
- 공백/특수문자도 chars 배열에 들어감 — split + map 단순.

### 기타 메모
- spread 분해 시 default 를 `weight=500, family="sans"` 로 — 기본값을 spec 텍스트 ("16/500 / sans") 에 맞춤.
- SBS Biz 의 'B' 같이 공백이 있는 이름의 accentChar 인덱스는 0-based — `[...name]` 결과의 index. 데이터에서 `name: "SBS Biz", accentChar: 4` (S, B, S, ' ', B → 4 가 'B').
- flag SVG 는 spec 에 정확한 path 가 없어 작은 사각 깃발 + ink pole 로 그림. 정확 일치는 안 되지만 "tiny red flag glyph" 의도 충족.
- 글로벌 폰트 색상은 inherit 되어 wordmark color 가 자식 span 들에도 propagate. accent 색만 override.
