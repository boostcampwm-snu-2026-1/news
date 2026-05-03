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

## 디렉터리 구조 (목표 상태)

```
src/
├── components/
│   ├── Header/
│   │   └── Header.tsx
│   ├── NewsGrid/
│   │   └── NewsGrid.tsx
│   ├── NewsCard/
│   │   └── NewsCard.tsx
│   ├── TabBar/
│   │   └── TabBar.tsx
│   └── SubscribeModal/
│       └── SubscribeModal.tsx
├── data/
│   └── publishers.json
├── hooks/
│   └── useSubscription.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
├── index.css      ← Tailwind @import + @theme + @layer
└── vite-env.d.ts
```

- **파일 당 하나의 컴포넌트** 원칙을 반드시 지킨다.
- 스타일은 Tailwind 유틸리티 클래스 우선, 복잡한 패턴은 `@layer components`에 정의.
- `.module.css`는 사용하지 않는다.

---

## 디자인 시스템

### 색상 팔레트

```css
:root {
  --color-primary: #03c75a;      /* 네이버 그린 계열 포인트 */
  --color-bg: #f7f8fa;           /* 페이지 배경 */
  --color-surface: #ffffff;      /* 카드 배경 */
  --color-border: #e5e8eb;       /* 구분선 */
  --color-text-primary: #1a1a1a; /* 본문 */
  --color-text-secondary: #6b7280; /* 부제, 날짜 */
}
```

### 타이포그래피

- 기본 폰트: 시스템 폰트 스택 (`-apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif`)
- 헤더 제목: `18px / font-weight: 700`
- 카드 제목: `14px / font-weight: 600`
- 보조 텍스트: `12px / color: var(--color-text-secondary)`

### 레이아웃

- 최대 너비: `1200px`, 중앙 정렬
- 카드 그리드: `repeat(auto-fill, minmax(160px, 1fr))`
- 카드 간격: `16px`
- 모바일 브레이크포인트: `768px`

### 컴포넌트 규칙

- 버튼은 `border-radius: 4px`, hover 시 `opacity: 0.85`
- 카드는 `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`, hover 시 `translateY(-2px)`
- 모달은 오버레이 배경 `rgba(0,0,0,0.4)`, 내부 `border-radius: 12px`

---

## 환경 설정 규칙

### 개발 서버

```bash
npm run dev   # http://localhost:5173
npm run build # TypeScript 타입 검사 + 번들링
```

### Tailwind v4 핵심 규칙

```css
/* index.css — 디자인 토큰은 @theme 블록에 선언 */
@theme {
  --color-primary: #03c75a;
}
/* bg-primary, text-primary 등 유틸리티 클래스 자동 생성됨 */
/* 복잡한 컴포넌트 스타일은 @layer components 에 정의 */
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

```
feat: #이슈번호 기능명

확인내용: 구현된 화면/로직 동작 확인 결과
이해 안 됐던 부분: AI가 추천한 패턴 중 추가로 공부한 내용
```

**Prefix 종류**

| prefix | 사용 시점 |
|--------|----------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `style` | UI/CSS 변경 (로직 무관) |
| `refactor` | 기능 변화 없는 코드 개선 |
| `chore` | 설정, 패키지 변경 |
| `docs` | 문서 작성/수정 |
