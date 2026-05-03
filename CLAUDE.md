# CLAUDE.md

## 프로젝트 개요
뉴스스탠드 - 한국 뉴스 포털 클론
언론사 그리드 탐색, 구독/해지, 기사 리스트 뷰 제공
※ 현재 1주차 기준 구조이며, 기능 추가에 따라 확장 예정

## 기술 스택
- React + TypeScript
- Vite
- Tailwind CSS v4
- 상태관리: useState (추후 Context API로 리팩토링 예정)

## 디렉토리 구조 (1주차 기준)
src/
├── components/
│   ├── Header/
│   ├── TabBar/
│   ├── PressGrid/
│   │   ├── PressGrid.tsx
│   │   └── GridCell.tsx
│   └── ListView/
├── hooks/
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
└── App.tsx

## 컴포넌트 컨벤션
- 파일명/컴포넌트명: PascalCase
- 커스텀 훅: use 접두사 (예: useSubscribe)
- 이벤트 핸들러: handle 접두사 (예: handleSubscribe)

## 코드 컨벤션
- TypeScript any 타입 금지
- 외부 UI 라이브러리 금지
- 스타일: Tailwind CSS로 통일 (인라인 스타일 혼용 금지)
- 상수는 UPPER_SNAKE_CASE로 별도 추출
- 민감한 URL 및 환경변수는 .env로 관리, .gitignore에 등록 필수

## 커밋 컨벤션
- 커밋은 자동으로 하지 말고, 사용자가 직접 작성할 것
- 원격 git push 전 반드시 사용자에게 확인 받을 것
- 커밋 타입 및 템플릿: 프로젝트 루트 `.gitmessage` 참고

## 하지 말 것
- any 타입 사용 금지
- 외부 UI 라이브러리 사용 금지
- Tailwind 외 CSS 방식 혼용 금지
- setState 직접 자식에게 전달 금지 (핸들러 함수로 추상화)

## 디자인 참고
- docs/design-system.md 및 docs/planning.md를 반드시 참조할 것
- 모든 코드 구현은 해당 md 파일의 스펙을 벗어나지 않도록 할 것
- 스펙과 어긋나는 구현이 발견되면 반드시 사용자에게 경고할 것

## 개발 범위
- docs/checklist.md 참고

## 작업 완료 처리
- 각 작업 완료 시 docs/checklist.md를 읽고 해당 항목을 [x]로 업데이트할 것
- 단, 업데이트 전 반드시 사용자에게 확인 받을 것