# CLAUDE.md

이 파일은 Claude(또는 다른 AI 페어)가 이 저장소에서 작업할 때 참고하는 가이드다.

## 프로젝트 정체

**뉴스스탠드 (Newsstand)** — 코드스쿼드 9-10주차 미션. 데스크톱 한국형 뉴스 포털 클론.

- 사용자는 6×4 언론사 그리드(72개)를 둘러보고, 마음에 드는 언론사를 구독/해지한다.
- 언론사를 클릭하면 그 언론사의 카테고리별 기사 리스트를 6초 자동 회전으로 읽을 수 있다.
- **데스크톱 1280px 고정폭** (그 이하에서는 스케일).

## 기술 스택

- **빌드/러너**: Vite + React 18 + TypeScript
- **스타일**: CSS Variables (디자인 토큰) + CSS Modules
- **상태**: React Hooks (useState/useReducer) — 외부 상태 라이브러리 없이 시작
- **린트/포맷**: ESLint (Vite 기본) + Prettier (필요 시 추가)

## 폴더 구조

```
.
├── docs/
│   └── checklist.md          # 개발 체크리스트 (#1-#13)
├── public/
├── src/
│   ├── components/           # 컴포넌트 + 컴포넌트별 .module.css
│   ├── data/                 # mock 데이터 (presses, ticker)
│   ├── styles/
│   │   ├── tokens.css        # :root 디자인 토큰
│   │   └── global.css        # reset / base
│   ├── types/                # 공통 타입
│   ├── App.tsx
│   └── main.tsx
├── CLAUDE.md                 # 이 문서
├── docs/checklist.md         # 체크리스트
└── week9*.pdf                # 스펙 원본
```

## 디자인 토큰 요약 (필수 준수)

전체 명세는 `week9_design_system.pdf` 참조. 핵심:

### 색

| 이름 | 값 | 용도 |
|------|------|------|
| `--ink` | `#14212B` | 본문, 진한 라벨 |
| `--sub` | `#5F6E76` | 보조 텍스트 |
| `--mute` | `#879298` | 비활성 탭 라벨 |
| `--line` | `#D2DAE0` | 1px divider, border |
| `--soft` | `#F5F7F9` | ticker bg, field-tab bg |
| `--card` | `#FFFFFF` | grid cell, opened-press body |
| `--page` | `#FEFEFE` | page bg |
| `--accent` | `#7890E7` | 구독 badge, active tab |
| `--accent-deep` | `#4362D0` | progress fill |

### 타이포

- **Primary**: Pretendard Variable / Pretendard → fallback Noto Sans KR → system sans
- **Numeric** (mono): IBM Plex Mono — tab counter `1 / 81`
- **Serif accent**: Noto Serif KR — 朝鮮日報, Korea JoongAng Daily, Insight 등
- 한글 letterspacing: body `-0.01em`, display `-0.02em`
- Latin: `0` (예외: 朝鮮日報 `0.08em`)

### 스페이싱

8px 베이스. 사용 단위: `4, 8, 12, 16, 24, 32, 40, 48, 64`

### 캔버스 레이아웃 (1280 × 720)

- 좌/우 gutter 175 → content width 930
- 헤더 y=58, ticker y=127, 탭바 y=208, 콘텐츠 y=256, chevron y=430

### Radii

- `--r-0` = 0 (그리드 셀, 티커 카드, opened-press frame)
- `--r-sub` = 2 (KBS WORLD 같은 chip 배경)
- `--r-pill` = 14 (구독/해지 pill)
- `--r-badge` = 10 (구독 카운트 배지)

### 룰

- **Strokes**: 항상 1px, `--line` (#D2DAE0). 다른 굵기·색 금지.
- **Shadows**: 그리드에는 거의 없음. 구독 pill만 `0 1px 2px rgba(20,33,43,0.04)`.

## 컴포넌트 트리 (디자인 시스템 §9)

```tsx
<Newsstand>
  <Header date={today} />
  <Ticker items={tickerItems} />
  <TabBar activeTab subCount viewer onTabChange onViewerChange />
  {opened
    ? <PressOpen press={activePress} tabKey={cat} />
    : <PressGrid items subscribedIds onSubscribe onUnsubscribe onOpen />
  }
  <Chevron dir="left" disabled={page===0} onClick />
  <Chevron dir="right" disabled={page===lastPage} onClick />
</Newsstand>
```

## 상태 모델

```ts
{
  tab: 'all' | 'sub',
  page: number,
  opened: pressId | null,
  tabKey: categoryKey,
  progress: 0..1,
  currentInTab: number,
  subscribed: Set<pressId>
}
```

`progress`는 `setInterval(tick, 100)`을 6000ms 동안 돌려 field-tab fill을 채운다. 100% 도달 시 `currentInTab++`, count 초과 시 다음 탭으로, 탭이 다 끝나면 첫 탭으로 루프.

## AI 페어링 규칙

1. **AI는 동료다** — 코드 생성기가 아니라 토론 상대.
2. **내가 먼저 설계한다** — 무엇을, 왜, 어떻게 만들지 말로 정리한 뒤 구현 요청.
3. **AI 결과는 반드시 검증한다** — 디자인 토큰·픽셀·타입 일치 확인.
4. **모르면 모른다고 표시한다** — 커밋 로그의 "이해 안 됐던 부분"에 솔직히 적는다.

## 커밋 메시지 규약 (필수)

```
feat: #N <기능명>

- 확인내용: <검증한 것 / 결정한 설계>
- 이해 안 됐던 부분: <학습 포인트, 없으면 "없음">
```

`#N`은 `docs/checklist.md`의 항목 번호. 모든 커밋이 이 형식을 따른다.

## 명령어

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (default :5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint
```

## 참고 문서

- `week9.pdf` — 미션 스펙 + 워크플로우 가이드라인
- `week9_proposal.pdf` — 6 frame 디자인 캔버스
- `week9_design_system.pdf` — 토큰·컴포넌트·상태 명세 (모든 픽셀 수치의 출처)
- `docs/checklist.md` — 기능 단위 체크리스트 (#1-#13)
