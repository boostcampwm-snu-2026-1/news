# CLAUDE.md — 뉴스스탠드 프로젝트 AI 협업 지침서

## Project Overview

사용자가 언론사를 구독하고 뉴스를 소비하는 **뉴스스탠드 웹 서비스**.  
네이버 뉴스스탠드처럼 언론사 목록을 카드/리스트 형태로 보여주고, 구독·해지 기능을 제공한다.

- **Repository**: `news/`
- **Branch 전략**: `main` 보호, 작업은 `LeeSeokWoo0326` 브랜치에서 진행
- **PR 템플릿**: `.github/pull_request_template.md` 준수

---

## Tech Stack

| 분류 | 기술 | 비고 |
|------|------|------|
| 프레임워크 | React 19 + TypeScript | 함수형 컴포넌트 전용, strict 모드 |
| 빌드 도구 | Vite 6 | `npm run dev` 로 개발 서버 |
| 스타일링 | Tailwind CSS v4 | `@theme` 블록으로 디자인 토큰 정의 |
| 언어 | TypeScript 5.8 | strict 옵션 활성화 |
| 상태 관리 | React `useState` / `useContext` | 외부 라이브러리 최소화 |
| 데이터 | 로컬 JSON 파일 | `/src/data/publishers.json` |
| 패키지 매니저 | npm | `package-lock.json` 커밋 포함 |
| 버전 관리 | Git + GitHub | 커밋 메시지 규칙 준수 |

---

## 디렉터리 구조 (2주차 목표 상태)

> 1주차의 `NewsGrid`, `NewsCard`, `TabBar`(그리드/리스트 토글 포함), `Pagination`,
> `CategoryFilter`, ListView 사이드바는 **폐기**. 캐러셀 기반 컴포넌트로 교체된다.

```
src/
├── components/
│   ├── GlobalHeader/
│   │   └── GlobalHeader.tsx        # NEWSSTAND 로고 + MY뉴스/전체언론사 토글
│   ├── CategoryTabs/
│   │   └── CategoryTabs.tsx        # 4개 카테고리 탭
│   ├── Carousel/
│   │   ├── Carousel.tsx            # 3-패널 캐러셀 컨테이너
│   │   └── CarouselControlBar.tsx  # 자동넘김 토글 + 속도 + n/total
│   ├── FrontPagePanel/
│   │   └── FrontPagePanel.tsx      # 신문 1면 (멀티컬럼 그리드)
│   ├── PublisherStrip/
│   │   └── PublisherStrip.tsx      # 하단 썸네일 띠
│   └── SubscribeModal/
│       └── SubscribeModal.tsx      # 1주차에서 유지
├── data/
│   ├── publishers.json             # 20개 언론사 메타
│   └── frontpages.json             # 20개 1면 편성 데이터
├── hooks/
│   ├── useSubscription.ts          # 1주차에서 유지 (localStorage)
│   └── useAutoSlide.ts             # 자동슬라이드 타이머
├── types/
│   └── index.ts                    # Publisher, FrontPage, Article, FeatureBox 등
├── App.tsx
├── main.tsx
├── index.css                       # Tailwind @import + @theme + @layer
└── vite-env.d.ts

scripts/
└── validate-data.ts                # publishers ↔ frontpages 정합성 검증

public/
├── logos/                          # 언론사 로고
└── thumbs/                         # 1면 썸네일 / 메인 이미지
```

- **파일 당 하나의 컴포넌트** 원칙을 반드시 지킨다.
- 스타일은 Tailwind 유틸리티 클래스 우선, 복잡한 패턴은 `@layer components`에 정의.
- `.module.css`는 사용하지 않는다.

---

## 디자인 시스템

> 색상, 타이포그래피, 레이아웃, 컴포넌트 규칙 등 디자인 관련 사항은 **[design.md](design.md)** 를 참조한다.

---

## 환경 설정 규칙

### 개발 서버

```bash
npm run dev   # http://localhost:5173
npm run build # TypeScript 타입 검사 + 번들링
```

### 금지 사항

- `any` 타입 사용 — `unknown` + 타입 가드로 대체
- `index.ts` 배럴 파일로 모든 컴포넌트 한 번에 export — 트리셰이킹 방해
- 인라인 스타일(`style={{...}}`) — Tailwind 클래스 또는 `@layer components` 사용
- `console.log` 커밋 금지 (개발 중 디버깅 후 반드시 제거)
- `.jsx` 확장자 사용 — 모두 `.tsx` / `.ts`로 작성

---

## 코딩 표준

```tsx
// Good: 함수형 컴포넌트 + named export + Props 타입 정의
interface NewsCardProps {
  publisher: Publisher;
  isSubscribed: boolean;
  onToggle: (id: string) => void;
}

export function NewsCard({ publisher, isSubscribed, onToggle }: NewsCardProps) {
  return (
    <article className="card p-4 flex flex-col gap-2">
      ...
    </article>
  );
}

// Bad: default export 혼용, class 컴포넌트, any 타입
export default class NewsCard extends React.Component<any> { ... }
```

- Props는 **구조 분해 할당**으로 받는다.
- 이벤트 핸들러 이름은 `handle~` (내부), `on~` (Props로 전달)
- 상태를 올릴 때(State Lifting)는 **공통 부모**에만 위치시킨다.
- 의미 있는 변수명: `p`, `d`, `tmp` 사용 금지

---

## AI 협업 워크플로우 규칙

> 코드를 작성하기 전 **반드시 설계(컴포넌트 구조, Props, State 위치)를 먼저 제안**할 것.

1. **설계 먼저**: "이 기능의 State는 어느 컴포넌트에 있어야 하고 왜인지 설명해줘"
2. **코드 초안**: 설계 확정 후 구현 요청
3. **리뷰 요청**: "이 코드에서 발생할 수 있는 성능 이슈나 버그는?"
4. **에러 발생 시**: 해결 방안 3가지를 제시 + 각각의 트레이드오프 설명

### 효과적인 프롬프트 패턴

| 상황 | 프롬프트 예시 |
|------|--------------|
| 설계 | "NewsGrid 컴포넌트의 Props 구조를 제안해줘. 카드형/리스트형 전환을 지원해야 해." |
| 성능 리뷰 | "이 컴포넌트에서 불필요한 리렌더링이 발생할 수 있는 지점은 어디야?" |
| 에러 디버깅 | "이 에러 메시지가 나오는 원인 3가지와 각각의 해결 방법을 알려줘: [에러 내용]" |
| 리팩토링 | "이 로직을 custom hook으로 분리한다면 어떻게 구조화하겠어?" |

---

## 커밋 메시지 규칙

> 커밋 메시지는 **간결하게** 작성한다. 제목 한 줄 + 필요 시 짧은 bullet 1~2개.

### 포맷

```
<prefix>: #<항목번호> <기능명>
```

본문이 필요한 경우에만 한 줄 추가:

```
<prefix>: #<항목번호> <기능명>

- <핵심 변경사항 한 줄>
```

### 예시

```
feat: #3 NewsCard component

feat: #9 subscription state with localStorage

fix: #12 reset pagination on tab change
```

### Prefix 종류

| prefix | 사용 시점 |
|--------|----------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `style` | UI/CSS 변경 (로직 무관) |
| `refactor` | 기능 변화 없는 코드 개선 |
| `chore` | 설정, 패키지 변경 |
| `docs` | 문서 작성/수정 |
| `test` | 테스트 코드 추가/수정 |
