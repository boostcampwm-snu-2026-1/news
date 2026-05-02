# 뉴스스탠드 구현 체크리스트

기획/디자인 기준: 데스크톱 웹 뉴스스탠드. 사용자는 6x4 언론사 그리드를 탐색하고, 언론사를 구독/해지하며, 언론사별 기사 리스트 뷰에서 카테고리 탭과 6초 자동 진행을 경험한다.

구현 기준:

- 디자인 토큰은 `뉴스스탠드-디자인시스템.pdf` 기준으로 CSS 변수화한다.
- 1280x720 캔버스, 930px 콘텐츠 컬럼, 6x4 그리드, 상단 헤더/티커/탭 구조를 우선 맞춘다.
- hover 전용 인터랙션은 키보드 focus에서도 동일하게 동작해야 한다.
- `prefers-reduced-motion`에서는 티커/프로그레스 자동 애니메이션을 중지한다.

## 이번 주 Week 1

- [x] 01. 프로젝트 기본 골격 세팅
  - React 앱 구조, 라우트 없는 단일 뉴스스탠드 화면, 기본 폴더 구조를 만든다.
  - 완료 기준: 로컬 실행 시 빈 뉴스스탠드 앱 화면이 뜨고 빌드가 성공한다.

- [x] 02. 디자인 토큰/CSS 변수 구축
  - 색상(`ink`, `sub`, `mute`, `line`, `soft`, `card`, `page`, `accent`, `accent-deep`), 타이포그래피, spacing, radius, stroke, shadow 값을 전역 변수로 정리한다.
  - 완료 기준: 컴포넌트가 하드코딩 색상 대신 토큰을 사용한다.

- [x] 03. 1280 캔버스와 공통 레이아웃 구현
  - 좌우 gutter 175px, 콘텐츠 폭 930px, 헤더/티커/탭/콘텐츠/chevron의 수직 위치를 반영한다.
  - 완료 기준: 1280px 이상 화면에서 디자인 캔버스와 동일한 밀도로 배치된다.

- [ ] 04. 헤더 컴포넌트 구현
  - 신문 아이콘, `뉴스스탠드` 워드마크, 날짜 텍스트를 flex space-between 구조로 만든다.
  - 완료 기준: 날짜는 `2026. 01. 14. 수요일` 형식으로 렌더링 가능하다.

- [ ] 05. 자동 롤링 뉴스 티커 구현
  - 2개 lane, 49px 높이, press name/title 구조, 3.2초 회전, 0.55초 crossfade, lane offset을 구현한다.
  - 완료 기준: hover/focus 시 정지하고 reduced-motion에서는 자동 회전하지 않는다.

- [ ] 06. 탭바와 뷰 토글 구현
  - `전체 언론사`, `내가 구독한 언론사` 탭, 구독 수 badge, 리스트/그리드 토글 아이콘을 만든다.
  - 완료 기준: active/inactive 타이포와 색상, badge 20x20 스타일이 디자인 토큰과 일치한다.

- [ ] 07. 언론사 데이터 모델 설계
  - press id, name, category, wordmark style props, subscription state, article list, edit time, category counts를 담는 mock data를 만든다.
  - 완료 기준: 전체 언론사 72개 이상 또는 페이지네이션 검증 가능한 충분한 mock data가 있다.

- [ ] 08. PressWordmark 컴포넌트 구현
  - 글꼴 계열, weight, italic, underline, tracking, accent char, accent bg, flag, long latin wrapping 규칙을 props 기반으로 렌더링한다.
  - 완료 기준: 긴 언론사 이름이 셀 안에서 최대 2줄로 안정적으로 줄바꿈된다.

- [ ] 09. 전체 언론사 6x4 그리드 구현
  - 930x388 영역, 6 columns x 4 rows, 1px gap, 각 cell 배경/중앙 정렬을 만든다.
  - 완료 기준: 24개 셀이 한 페이지에 보이고 divider가 `#D2DAE0` 1px로 표현된다.

- [ ] 10. 그리드 셀 hover/focus 구독 버튼 구현
  - 전체 언론사 탭에서는 hover/focus 시 `+ 구독하기` pill을, 구독 탭에서는 `- 해지하기` pill을 표시한다.
  - 완료 기준: 마우스와 키보드 focus 모두에서 동일하게 버튼이 나타나고 클릭 가능하다.

## 다음 주 Week 2

- [ ] 11. 구독/해지 상태 관리 구현
  - `subscribed: Set<pressId>` 기반으로 구독 수, 탭 badge, 셀 버튼 상태를 갱신한다.
  - 완료 기준: 구독/해지 후 badge 숫자와 구독 탭 목록이 즉시 반영된다.

- [ ] 12. 구독한 언론사 탭 구현
  - 구독한 언론사만 채워진 sparse grid를 만들고, 빈 셀은 흰 배경으로 유지한다.
  - 완료 기준: 구독 수가 24개 이하일 때 한 페이지에 빈 셀 포함 6x4 구조가 유지된다.

- [ ] 13. 페이지네이션 chevron 구현
  - 좌우 chevron 버튼을 콘텐츠 컬럼 밖 위치에 배치하고, 현재 탭 기준으로 페이지를 이동한다.
  - 완료 기준: 첫/마지막 페이지에서 disabled 상태가 시각적으로 사라지고 접근성 label이 있다.

- [ ] 14. 그리드 페이지네이션 상태 연결
  - 전체 언론사는 3페이지, 구독 탭은 구독 수 기준으로 페이지 수를 계산한다.
  - 완료 기준: `Page 2 / 3` 프레임처럼 양쪽 chevron이 모두 노출되는 중간 페이지가 동작한다.

- [ ] 15. 언론사 선택과 리스트 뷰 진입 구현
  - 그리드 셀 클릭 시 선택 언론사의 opened press layout으로 콘텐츠 영역을 전환한다.
  - 완료 기준: 선택 직후 해당 언론사의 기본 카테고리와 기사 리스트가 표시된다.

- [ ] 16. 열린 언론사 카테고리 FieldTab 구현
  - 종합/경제, 방송/통신, IT, 스포츠/연예, 매거진/전문지, 지역 탭 strip을 만든다.
  - 완료 기준: active tab은 accent 배경, inactive는 soft 배경과 border 구조를 유지한다.

- [ ] 17. 6초 프로그레스와 자동 전환 구현
  - active category tab의 progress fill을 6초 linear로 채우고, 완료 시 `currentInTab` 증가 및 category overflow 전환을 처리한다.
  - 완료 기준: `1 / 81`에서 진행되고 마지막 항목 이후 다음 카테고리 또는 첫 카테고리로 순환한다.

- [ ] 18. 열린 언론사 기사 리스트 레이아웃 구현
  - 930x388 카드, 내부 padding 24/32, head row, headline image placeholder, headline, 6개 기사 목록, footnote를 구현한다.
  - 완료 기준: SBS Biz/아시아경제 예시 프레임처럼 편집 시각, 구독 pill, 기사 목록, footnote가 배치된다.

- [ ] 19. 접근성/키보드/모션 마감
  - tablist/tab 역할, `aria-selected`, chevron `aria-label`, badge `aria-label`, focus ring, reduced-motion 처리를 점검한다.
  - 완료 기준: 키보드만으로 탭 전환, 구독/해지, 페이지 이동, 언론사 열기가 가능하다.

- [ ] 20. 최종 QA와 반응형 보정
  - 1280 desktop 기준 픽셀 QA, 1280 미만 화면 scale/overflow 보정, 브라우저별 렌더링, 빌드/린트 테스트를 수행한다.
  - 완료 기준: 6개 레퍼런스 프레임의 기본 상태, hover, 구독 탭, 페이지 2, 리스트 뷰 진행/전환 상태가 재현된다.
