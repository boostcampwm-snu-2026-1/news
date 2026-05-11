# 뉴스스탠드 상태 흐름 설계

## 목적

2주차 구현 범위는 리스트 뷰와 자동 진행을 붙이는 것이지만, UI 상태가 늘어나는 시점부터는 이벤트와 파생 상태를 명확히 분리하지 않으면 탭 전환, 구독 해지, 페이지 보정이 서로 충돌한다. 이 문서는 구현 전에 상태 소유와 전이 규칙을 고정하기 위한 설계 문서다.

## 상태 소유 원칙

- 서버에서 내려오는 초기 데이터는 `page.tsx`가 주입한다.
- 상호작용 상태는 `Newsstand` 컨테이너 하나가 소유한다.
- 그리드 셀, 리스트 패널, 카테고리 탭은 상태를 소유하지 않고 이벤트만 올린다.
- 화면에 직접 렌더링되는 배열, 카운터, 선택 언론사는 모두 원시 상태에서 계산한다.

## 원시 상태

| 필드 | 타입 | 의미 |
| --- | --- | --- |
| `presses` | `Press[]` | 구독 여부와 기사 메타를 포함한 전체 언론사 데이터 |
| `activeTab` | `"all" \| "subscribed"` | 전체/구독 탭 |
| `viewMode` | `"grid" \| "list"` | 그리드/리스트 보기 |
| `page` | `number` | 현재 그리드 페이지 인덱스 |
| `activeCategory` | `PressCategory` | 리스트 뷰에서 열린 카테고리 |
| `listIndexByCategory` | `Record<PressCategory, number>` | 카테고리별 현재 선택 인덱스 |
| `listTick` | `number` | 자동 진행 reset 추적용 시퀀스 |

## 파생 상태

| 이름 | 계산 규칙 |
| --- | --- |
| `subscribedCount` | `presses` 중 `subscribed === true` 개수 |
| `visiblePresses` | `activeTab`이 `all`이면 전체, 아니면 구독한 언론사만 |
| `pagedPresses` | `visiblePresses`를 `page`와 `PAGE_SIZE`로 자른 결과 |
| `pressesByCategory` | `visiblePresses`를 카테고리별로 그룹화한 결과 |
| `safePage` | `visiblePresses` 길이에 맞춰 clamp된 page |
| `selectedPress` | `activeCategory`와 `listIndexByCategory`를 현재 데이터에 맞게 보정한 결과 |
| `listProgressLabel` | `selectedPress`의 현재 순번과 카테고리 총 개수 |

## 이벤트와 전이

| 이벤트 | 변경 필드 | 전이 규칙 |
| --- | --- | --- |
| `CHANGE_TAB(nextTab)` | `activeTab`, `page`, `activeCategory`, `listIndexByCategory`, `listTick` | 탭을 바꾸고 page를 0으로 리셋한다. 새 visible set에 없는 카테고리/인덱스는 첫 유효값으로 보정한다. |
| `TOGGLE_VIEW(nextView)` | `viewMode`, `listTick` | 리스트로 들어가면 현재 visible set 기준 첫 유효 카테고리를 보장한다. |
| `CHANGE_PAGE(nextPage)` | `page` | 범위를 벗어나지 않게 clamp한다. |
| `TOGGLE_SUBSCRIPTION(pressId)` | `presses`, `page`, `activeCategory`, `listIndexByCategory`, `listTick` | 구독 탭에서 언론사를 해지하면 visible set이 줄어든다. page와 리스트 선택을 새 데이터 기준으로 즉시 보정한다. |
| `SELECT_CATEGORY(category)` | `activeCategory`, `listTick` | 해당 카테고리에 언론사가 있을 때만 전환하고, 현재 인덱스가 범위를 넘으면 0으로 보정한다. |
| `ADVANCE_LIST()` | `listIndexByCategory`, `listTick` | 현재 카테고리 내에서 다음 언론사로 이동하고 마지막이면 0으로 wrap한다. |
| `SELECT_PRESS_IN_LIST(index)` | `listIndexByCategory`, `listTick` | 사용자가 특정 언론사를 직접 선택했을 때 해당 카테고리 인덱스를 갱신한다. |

## 엣지 케이스

1. 구독 탭에서 마지막 언론사를 해지하면 빈 상태가 될 수 있다.
2. 현재 페이지가 마지막 페이지인데 visible set이 줄면 `page`가 초과값이 될 수 있다.
3. 현재 카테고리의 마지막 항목에서 자동 진행이 돌면 처음으로 wrap돼야 한다.
4. 카테고리 탭 전환 직후 자동 진행 타이머는 이전 진행률을 이어받지 않고 reset돼야 한다.
5. 리스트 뷰 진입 시 visible set에 없는 카테고리를 들고 있으면 첫 유효 카테고리로 교체해야 한다.

## 이번 구현 결정

- 카운터는 현재 mock 데이터 한계 때문에 `카테고리 내 순번 / 카테고리 총 개수`로 정의한다.
- 자동 진행은 활성 카테고리 안에서만 순환한다.
- 빈 카테고리는 disabled처럼 보이게 하되 클릭 전환은 막는다.
- headline image는 실제 에셋 대신 headline text를 담은 placeholder card로 렌더링한다.
