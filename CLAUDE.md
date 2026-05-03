# 뉴스스탠드 프로젝트

## 기술 스택

- **프레임워크**: React 19 + Vite 8 + TypeScript
- **스타일링**: Tailwind CSS v4 (`@tailwindcss/vite` 플러그인 사용)
- **패키지 매니저**: pnpm

## 명령어

```bash
pnpm dev       # 개발 서버 실행
pnpm build     # 프로덕션 빌드
pnpm preview   # 빌드 미리보기
pnpm lint      # ESLint 실행
```

## 프로젝트 구조

```
src/
  main.tsx                  # 진입점
  App.tsx                   # 루트 컴포넌트 (전역 상태 허브)
  index.css                 # 전역 스타일 + Tailwind import
  types/index.ts            # 공유 타입 정의
  data/mockData.ts          # 목업 데이터 (언론사, 티커 등)
  data/logos.tsx            # 언론사 로고 SVG/JSX 정의 + PressLogo 컴포넌트
  hooks/useSubscription.ts  # 구독 상태 훅
  components/
    ...                     # 기타 컴포넌트
design/                     # 디자인 참고 이미지
docs/
  DESIGN.md                 # UI 명세
  CHECKLIST.md              # 구현 체크리스트
```

## Tailwind 설정

Tailwind v4는 Vite 플러그인(`@tailwindcss/vite`)으로 설정됨. `tailwind.config.js` 불필요.
`src/index.css`에 `@import "tailwindcss";` 추가.

## 기능 완료 기준

`CHECKLIST.md` 항목을 `[x]`로 체크하는 것은 **사용자가 `$next-step`을 명시적으로 호출했을 때만** 한다. Agent가 임의로 체크해서는 안 된다.

`$next-step` 실행 시 아래 조건을 모두 만족해야 체크한다:

1. **에러 없음** — 다음 세 명령이 모두 통과해야 한다:
   ```bash
   npx tsc --noEmit   # TypeScript 타입 에러 없음
   pnpm lint          # ESLint 에러 없음
   pnpm build         # 빌드 성공
   ```
   > **주의**: `tsc --noEmit`은 IDE(VS Code Language Server)보다 느슨하다. IDE에서만 뜨는 에러도 반드시 해결한다.

2. **코드 품질** — `any` 타입 없음, 죽은 코드 없음, 명백한 개선 사항 없음

3. **스펙 준수** — `docs/DESIGN.md` 기준으로 해당 기능의 요구사항이 빠짐없이 구현됨

하나라도 미달이면 체크하지 않고 문제 목록을 보고한다.

## 구현 원칙

1. **버그 없는 완성** — 구현 후 반드시 `pnpm dev`로 직접 브라우저에서 확인하고, 버그가 없는 상태로 마무리한다.
2. **디자인 일치** — `design/` 폴더의 이미지와 최대한 동일하게 구현한다. 색상, 간격, 정렬, 인터랙션 모두 포함.
3. **컴포넌트 분리** — 하나의 컴포넌트가 너무 커지지 않도록 적절히 분리한다. 역할이 명확히 구분되면 별도 컴포넌트로 나눈다.
4. **로고 직접 구현** — 언론사 로고는 외부 이미지 파일 없이 SVG/JSX로 직접 만든다. 불필요한 파일 분리를 피하고 `src/data/logos.tsx` 한 파일에서 관리한다.
5. **목업 데이터 직접 생성** — 실제 데이터가 없으므로 디자인 이미지와 spec을 보고 직접 fake data를 작성한다.

## 디자인 참고

UI 구현 시 반드시 `docs/DESIGN.md`를 확인한다.
레이아웃, 컴포넌트 구조, 색상, 인터랙션, 목업 데이터 명세가 모두 해당 파일에 정리되어 있음.
실제 디자인 이미지는 `design/` 폴더 참고:

| 파일 | 설명 |
|---|---|
| `design/grid-all-press.png` | 그리드 뷰 — 전체 언론사 탭 |
| `design/grid-subscribed.png` | 그리드 뷰 — 내가 구독한 언론사 탭 |
| `design/list-view-progress.png` | 리스트 뷰 — 프로그레스 바 진행 중 |
| `design/list-view-progress-end.png` | 리스트 뷰 — 프로그레스 완료 직전 |
