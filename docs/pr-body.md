# PR 본문

## 이번 주 나의 목표

2주차 목표는 리스트 뷰와 자동 진행을 구현하면서도, 그 전에 상태 흐름 설계와 컴포넌트 책임 경계를 문서로 고정하는 것이다. 이번 주 산출물은 구현 코드뿐 아니라 상태 전이 문서, 컴포넌트 계층 가이드, 검증 로그를 함께 남기는 것이다.

## 이번 주 학습 방법

- `design_spec.pdf`, `design_config.pdf`에서 리스트 뷰와 자동 진행 프레임을 먼저 읽고 상태 이벤트를 표로 분해한다.
- Next.js 16.2.4 App Router 문서를 로컬 `node_modules/next/dist/docs/01-app/`에서 확인한다.
- 구현 전 `docs/architecture/state-flow.md`, `docs/architecture/component-hierarchy.md`를 작성한다.
- 구현 후 `npm run lint`, `npm run test`, `npm run build`, Chrome 실사용 상호작용 확인까지 검증 로그를 남긴다.

## 확인한 설계 기준

- 데스크톱 1280x720 캔버스, 콘텐츠 폭 930px를 기준으로 한다.
- 리스트 뷰 활성 탭은 progress bar와 IBM Plex Mono 카운터를 포함한다.
- 6초 자동 진행 후 다음 언론사로 이동하며, 마지막 항목에서는 wrap 또는 다음 전이 규칙을 명확히 정의해야 한다.
- 강조 색상 `#7890E7`은 구독 수 배지와 활성 진행 탭에만 사용한다.

## 이번 PR에서 검증할 항목

- 상태 전이: 탭 전환, 구독 해지, 페이지 보정, 카테고리 선택, 자동 진행 wrap
- UI 구조: 리스트 뷰 탭, 헤드라인 카드, 기사 목록 배치
- 회귀 위험: 구독 탭에서 데이터가 줄어들 때 페이지/선택 상태가 깨지지 않는지
- 검증 방법: `npm run lint`, `npm run test`, `npm run build`, Chrome hover/클릭/탭 전환/자동 진행 확인

## 검증 결과

- `npm run test`: reducer 기반 상태 전이 4개 통과
- `npm run lint`: ESLint 통과
- `npm run build`: Next.js production build 통과
- `npm run verify:ui`: Chrome DevTools Protocol로 hover, 구독 클릭, 구독 탭 필터, 해지 버튼 문구, 그리드 셀 클릭 리스트 진입, 카테고리 탭 전환, 6초 자동 진행 확인
- 화면 증거: `/tmp/newsstand-verify.png`

## 검증한 엣지 케이스

- 구독 탭에서 모든 구독 언론사를 해지해도 page와 selectedPress가 안전하게 보정된다.
- 활성 카테고리 마지막 언론사에서 자동 진행이 돌면 첫 번째 언론사로 wrap된다.
- 구독 탭에서 비어 있는 카테고리는 클릭해도 activeCategory를 바꾸지 않는다.
- hover pill이 셀 중앙을 덮는 구조를 고려해 리스트 진입은 셀의 비버튼 영역 클릭으로 검증했다.
