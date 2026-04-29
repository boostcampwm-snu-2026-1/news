# 뉴스스탠드 프로젝트

## 프로젝트 개요
네이버 뉴스스탠드 UI 클론. React + TypeScript + Vite 기반.
1280px 고정폭 레이아웃, 언론사 그리드/리스트 뷰, 구독 관리, 자동 롤링 티커.

## 기술 스택
- React + TypeScript + Vite
- CSS Variables (디자인 토큰)
- 폰트: Pretendard, IBM Plex Mono, Noto Serif KR

## 개발 규칙

### 커밋 관련
- **절대 직접 git commit 하지 않는다.** 작업 단위가 끝나면 커밋 메시지를 텍스트로 사용자에게 전달한다.
- 커밋 단위는 checklist.md의 태스크 ID(P0-1, P1-2 등) 기준으로 한다.
- 커밋 메시지는 **영어**로 작성한다.
- 커밋 메시지 형식 예시:
```
feat: #P0-1 Initialize React project

- Reviewed: verified Vite + TS scaffolding works, dev server runs correctly
- Learned: Vite uses esbuild for dev, Rollup for production bundling
```

### 코드 스타일
- 컴포넌트: PascalCase 함수형 컴포넌트 (e.g., `PressGrid.tsx`)
- 디렉토리: `src/components/`, `src/data/`, `src/hooks/`, `src/styles/`
- CSS: CSS Modules 또는 같은 폴더 내 `.css` 파일
- 디자인 토큰은 CSS 변수로 `src/styles/tokens.css`에 정의
- 상태 관리: React 내장 (useState, useReducer) — 외부 라이브러리 불필요

### 디자인 토큰 (참조)
- Colors: ink, sub, mute, line, soft(#F5F7F9), card, page, accent(#7890E7), accent-deep(#4362D0), badge-ink, danger
- Spacing: 4/8/12/16/24/32/40/48/64
- Radii: r-0, r-sub(2), r-pill(14), r-badge(10)
- Layout: 콘텐츠 폭 1280px, 좌우 gutter 175px, 그리드 930x388

### 접근성
- 시맨틱 HTML, ARIA 속성 필수
- `prefers-reduced-motion` 대응
- 키보드 내비게이션 지원
- WCAG AA 색상 대비 준수

## 체크리스트 참조
구현 순서와 상세 스펙은 `checklist.md` 참조.
Phase 0(프로젝트 세팅) → Phase 1(헤더+티커) → ... → Phase 8(상태 통합+마무리)
