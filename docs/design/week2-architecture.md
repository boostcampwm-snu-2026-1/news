# 2주차 설계 문서

## 목표
- PDF 기반 화면 흐름을 React 상태로 옮긴다.
- 구현 전에 상태 전이 규칙과 컴포넌트 책임을 명확히 한다.
- 구현 후에는 엣지 케이스를 테스트와 빌드로 검증한다.

## 상태 흐름 설계

### 최상위 상태

| 상태 | 타입 | 설명 |
| --- | --- | --- |
| `activeTab` | `"all" \| "sub"` | 전체 언론사 / 구독 언론사 탭 상태 |
| `viewer` | `"grid" \| "list"` | 그리드 보기 / 오픈 뷰 상태 |
| `page` | `number` | 현재 그리드 페이지 |
| `subscribedIds` | `Set<string>` | 구독 중인 언론사 id 집합 |
| `openedPressId` | `string \| null` | 현재 열려 있는 언론사 |
| `activeCategoryKey` | `CategoryKey` | 오픈 뷰에서 선택된 카테고리 |
| `currentInTab` | `number` | 현재 카테고리 안에서 선택된 기사 인덱스 |
| `progress` | `0..1` | 현재 카테고리 진행 바 값 |

### 주요 전이 규칙
1. 앱 진입:
   `activeTab="all"`, `viewer="grid"`, `page=0`
2. 언론사 셀 클릭:
   `openedPressId` 설정 -> `viewer="list"` -> `activeCategoryKey`를 해당 언론사의 기본 카테고리로 초기화
3. 구독 토글:
   `subscribedIds` Set 갱신
4. `sub` 탭에서 열린 언론사를 해지:
   숨겨진 언론사를 계속 보여주지 않도록 `viewer="grid"`로 되돌림
5. 진행 바 완료:
   `advanceOpenProgress()`를 호출해 기사 인덱스 또는 카테고리를 다음 상태로 이동

## 컴포넌트 계층

```text
App
├─ Header
├─ Ticker
├─ TabBar
├─ PressGrid
│  └─ PressWordmark
├─ PressOpen
│  └─ PressWordmark
└─ ChevronButton
```

## 컴포넌트 책임

| 컴포넌트 | 책임 |
| --- | --- |
| `App` | 전역 상태, 화면 전환, 자동 진행, 페이지 계산 |
| `Header` | 브랜드와 날짜 표시 |
| `Ticker` | 두 줄 자동 롤링 뉴스와 모션 감소 대응 |
| `TabBar` | 탭 전환, 구독 수 표시, 그리드/리스트 토글 |
| `PressGrid` | 6x4 셀 렌더링, 구독/해지 버튼, 키보드 접근성 |
| `PressOpen` | 카테고리 탭, 진행 바, 헤드라인/기사 리스트 렌더링 |
| `PressWordmark` | 언론사 이름을 타이포그래피 중심 워드마크로 출력 |
| `newsstand.ts` | 페이지 계산, 상태 전이 같은 순수 로직 |

## 엣지 케이스

### 페이지 계산
- 구독 언론사가 24개 미만이면 빈 칸을 유지하되 페이지는 1페이지로 처리한다.
- 전체 언론사는 72개 기준 3페이지를 유지한다.

### 구독 해지
- 구독 탭에서 열려 있는 언론사를 해지하면 더 이상 해당 탭에 속하지 않으므로 그리드 화면으로 복귀한다.

### 자동 진행
- 현재 카테고리의 마지막 기사면 다음 카테고리의 첫 기사로 이동한다.
- 마지막 카테고리까지 모두 끝나면 다시 첫 카테고리부터 반복한다.

### 모션 감소
- `prefers-reduced-motion` 환경에서는 티커와 자동 진행을 중지한다.

## 검증 계획

| 검증 항목 | 방법 |
| --- | --- |
| 전체 그리드 페이지 수 | `vitest`로 72개 기준 3페이지인지 확인 |
| 구독 탭 빈 칸 패딩 | `vitest`로 24셀 유지 여부 확인 |
| 오픈 뷰 진행 규칙 | `vitest`로 기사 -> 카테고리 전환 로직 확인 |
| 타입 및 번들 안정성 | `npm run build` |
| 접근성 기본선 | `role`, `aria-label`, `:focus-within`, reduced-motion 코드 반영 확인 |

## 구현 후 메모
- 자동 진행 규칙은 UI와 분리된 순수 함수라 테스트가 쉽다.
- 구독 Set과 페이지 계산은 문서 기준 흐름과 구현 흐름을 연결하는 핵심 상태였다.
- 다음 단계에서는 실제 기사 데이터 연동이나 상세 페이지 이동을 여기에 이어서 추가할 수 있다.
