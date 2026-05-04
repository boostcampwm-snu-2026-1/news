# GEMINI.md - 프로젝트 지침서

## 1. 프로젝트 개요
- **프로젝트 명**: 뉴스스탠드 (Newsstand)
- **설명**: 뉴스를 구독하고 읽는 웹 애플리케이션 개발

## 2. 기술 스택 및 제약 사항
- **Framework**: React + TypeScript (Vite)
- **Styling**: CSS Modules (**외부 UI/CSS 라이브러리 사용 엄금**)
- **State Management**: React Hooks & Context API (**외부 상태 관리 라이브러리 금지**)
- **Type System**: Strict TypeScript (**any 타입 사용 금지**)

## 3. 컨벤션 (Convention)
- **Components**: PascalCase (예: `NewsCard.tsx`)
- **Naming**: 변수/함수는 camelCase, CSS 클래스는 kebab-case
- **Git Commit**: `feat / fix / refactor / docs / chore` 형식을 준수하고 체크리스트 번호 포함

## 4. 디자인 및 설계 참조
- **UI/UX Spec**: `@docs/design.md`의 컬러 토큰 및 타이포그래피 준수
- **Icons**: 라이브러리 대신 SVG 코드로 직접 구현

## 5. 에이전트 행동 수칙
1. 코드를 작성하기 전 **구현 전략(Architecture)**을 먼저 설명한다.
2. 모든 코드는 **리뷰 가능할 정도의 작은 단위**로 끊어서 제공한다.
3. 기획서(`design.md`)에 명시되지 않은 사항은 독단적으로 결정하지 말고 질문한다.
4. 새로운 디렉토리를 생성해야 할 경우, 파일을 생성하기 전에 사용자에게 먼저 보고하고 승인을 받는다.