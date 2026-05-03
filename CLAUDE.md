# Project Rules

Auto-captured permanent directives from session feedback. Edit freely.

- 작업할 때마다 변경 사항을 적절한 논리 단위로 나누어 커밋한다.
- 커밋을 할 때마다 사용자에게 허가를 구하지 말고, 논리적 단위로 판단하여 독립적으로 진행한다.

---

## 프로젝트 개요

**뉴스스탠드 (Newsstand)** — 데스크톱 우선 한국형 뉴스 포털 웹.
- 6×4 언론사 그리드, 구독/해지, 페이지네이션, 자동롤링 티커, 리스트 뷰 + 6초 진행 바.
- 캔버스 **1280×720 고정**, 콘텐츠 폭 **930px** (좌우 거터 175, 셰브론은 콘텐츠 컬럼 바깥).
- 스펙은 `spec/`의 PDF들이 단일 진실 소스. 토큰·컴포넌트·동작 규격은 거기서 그대로 가져온다.

## 주차별 진행 관리

이 프로젝트는 **주차별로 새로운 스펙이 추가**된다. 각 주차의 작업 산출물은 `works/weekN/`에 모은다 (컨벤션은 `works/README.md`):

- `works/weekN/plan.md` — 목표·결정·체크리스트·**의존관계**·**병렬 그룹**·검증
- `works/weekN/review.md` — 체크리스트 항목별 리뷰 기록
- 그 외 메모/다이어그램/스크린샷은 같은 디렉터리에 자유롭게 추가

새 스펙이 들어오면 즉시 `works/weekN/` 디렉터리를 만들고, 위 두 파일을 갖춰 진행 상황을 그 안의 체크리스트로 관리한다.

## 기술 스택 (확정)

- **Frontend**: React 18 + TypeScript + Vite. CSS는 CSS Modules + `:root` CSS 변수(토큰).
- **State**: 단일 Newsstand 컨테이너의 `useReducer` (스펙 9장 상태 형태 그대로). 외부 상태 라이브러리 불필요.
- **Data**: 정적 JSON 픽스처 (`src/data/`). 구독 상태는 `localStorage`에 보존. 인증/서버 없음.
- **Fonts**: Pretendard Variable → Noto Sans KR → system, IBM Plex Mono(숫자), Noto Serif KR(serif wordmark). `@fontsource` 또는 CDN.
- **Backend**: 별도 서버 없음. (필요 시 Express + JSON 파일 정적 제공으로 분리 가능하지만 스펙상 불요.)

## 디자인 토큰 디시플린 (어기지 말 것)

- 컬러는 디자인시스템 PDF에 정의된 토큰만 사용. 모두 `:root` CSS 변수로 일원화.
- **`#7890E7` (accent) 사용처는 단 두 곳**: 구독 카운트 배지 + 활성 탭의 fill. 그 외 강조색 사용 금지.
- **선은 항상 1px / `#D2DAE0`**. 다른 두께·색상 금지.
- **그림자 금지**. 단 구독 pill의 `0 1px 2px rgba(20,33,43,0.04)` 한 곳만 예외.
- **그라디언트·글로우 금지**. 단 헤드라인 이미지 placeholder의 `linear-gradient(135deg,#EFF1F6→#DDE3EC)` 한 곳만 예외.
- 본문 텍스트는 항상 `ink`(#14212B). `sub` 이하 컬러는 secondary 정보 전용 — 절대 primary 액션 라벨에 쓰지 않는다.

## 타이포그래피 규칙

- 한글 letter-spacing: body `-0.01em`, display `-0.02em`. Latin 기본 `0` (개별 wordmark에서 tracking 오버라이드 가능, 예: 朝鮮日報 `0.08em`).
- 언론사 wordmark은 **이미지 아닌 타이포그래피**로 그린다. props 스키마(스펙 6.5):
  `name, color, bg?, weight, family, italic, underline, tracking, accent, accentChar, accentUnder[], accentBg, flag, latin, small`.
- 토큰 사이즈/웨이트/리딩은 디자인시스템 PDF 표(display/heading/body/list-item/caption/badge/mono-tab/mono-label)를 정확히 따른다.

## 인터랙션 / 모션 규칙

- **티커**: 두 레인 비동기, 3.2s 회전, 0.55s 크로스페이드 `cubic-bezier(.4,0,.2,1)`. hover/focus 시 일시정지.
- **Field tab progress**: 6s 선형. 완료 시 `currentInTab++`; 오버플로 시 다음 탭으로, 탭 소진 시 첫 탭 루프.
- **`prefers-reduced-motion: reduce` 존중** — 자동 회전·진행을 비활성화한다.
- 호버 전용 컨트롤(구독 pill 등)은 키보드 focus(`:focus-within`)에서도 동일하게 노출.

## 접근성 (WCAG AA)

- 탭 바 `role="tablist"`, 각 탭 `role="tab"`, 활성 `aria-selected="true"`.
- 셰브론은 `<button>` + `aria-label="이전 페이지" / "다음 페이지"`. 페이지 끝에선 `disabled` (시각적으로는 `opacity:0`이지만 layout 유지).
- 구독 카운트 배지: `aria-label="구독 중인 언론사 N곳"`.
- 모든 텍스트 콘트라스트 AA 통과 (mute `#879298`은 14px+ 에서만).

## 상태 형태 (Newsstand 루트)

```ts
{
  tab: "all" | "sub",
  page: number,
  opened: PressId | null,
  tabKey: CategoryKey,
  progress: 0..1,
  currentInTab: number,
  subscribed: Set<PressId>
}
```

- 셰브론 페이지네이션은 현재 탭(`tab`) 스코프. `all` = 3 페이지(72/24), `sub` = `ceil(subscribed.size / 24)`.
- 언론사 클릭 → `opened` 세팅, 진입 탭은 해당 언론사 primary 카테고리, `progress=0`, `currentInTab=1`.
- 구독 토글은 `subscribed` Set 갱신 + `localStorage` 동기화.

## 디렉터리 컨벤션 (제안)

```
src/
  components/   # Header, Ticker, TabBar, PressGrid, GridCell, PressOpen, FieldTab, Chevron, PressWordmark, SubscribePill
  data/         # press.json, ticker.json, articles.json
  hooks/        # useInterval, useReducedMotion, useLocalStorage
  styles/       # tokens.css (CSS variables), reset.css, fonts.css
  state/        # newsstandReducer.ts, types.ts
  App.tsx
  main.tsx
```

## 커밋 메시지 형식 (과제 요구사항)

모든 커밋은 다음 형식을 따른다:

```
<type>: #<feature 번호> <짧은 제목>

- 확인내용: <스펙·코드·동작에서 직접 확인한 사실, 발견한 이슈, 분리 결정 등>
- 이해 안 됐던 부분: <학습한 개념, 검색·문의로 해소한 의문. 없으면 "없음">
```

- `<type>`: feat / fix / refactor / docs / chore / test
- `#<feature 번호>`: 해당 주차 `works/weekN/plan.md` 체크리스트 항목 번호. 체크리스트와 무관한 셋업/메타 작업은 # 생략 가능.
- `확인내용`/`이해 안 됐던 부분`: 둘 다 필수 줄. 해당 사항 없으면 명시적으로 "없음".

## 개발 워크플로

체크리스트 항목 하나당 다음 사이클을 돈다:

1. **설계** — `plan.md` 항목을 펼쳐 무엇을 어떻게 만들지 결정. 필요 시 인터페이스/타입을 먼저 박는다.
2. **구현** — 코드 작성 (대개 AI 보조).
3. **리뷰** — 같은 항목 안에서 코드를 점검하고 `works/weekN/review.md`에 기록. 발견된 수정은 같은 커밋에 포함한다.
4. **커밋** — 위 형식대로 하나.

**리뷰 단계는 빠뜨리지 않는다. 리뷰 없이 커밋하지 않는다.**

## 병렬 작업 (subagent)

`plan.md`의 의존관계와 병렬 그룹(wave)에 따라 진행:

- 같은 wave 안의 항목은 subagent를 병렬로 띄워 작업 가능.
- subagent들에 할당하기 전에 **파일 충돌**을 점검 — 같은 파일을 둘이 수정해야 한다면 wave를 더 잘게 쪼갠다.
- 의존관계가 깨지지 않도록 wave 단위로 sync (이전 wave가 모두 끝난 뒤 다음 wave 시작).
