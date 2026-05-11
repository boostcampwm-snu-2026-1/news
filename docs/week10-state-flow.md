# 10주차 상태흐름 설계

## PDF 요구사항 요약

- 지난주 기획서와 디자인시스템을 유지한다.
- 2주차 구현 기능이 부족하면 추가 기능을 임의로 추가하거나 리팩토링한다.
- 엄격한 설계 과정을 거친 뒤 구현한다.
- 상태흐름 설계는 필수다.
- 구현 완료 후 엣지케이스를 도출하고 검증한다.
- 검증한 대상과 방법을 PR에 포함한다.
- 모든 커밋 로그에는 feature list 번호, 확인내용, 이해가 안 됐던 부분을 기록한다.

## 선택한 2주차 기능

1주차 그리드 기능은 완료되어 있으므로, `Gemini.md`에 이미 주요 컴포넌트로 정의된 `FieldTab`과 `PressOpen`을 구현한다.

- `checklist-15`: 언론사 클릭 시 리스트 오픈 상태로 전환
- `checklist-16`: 6개 분야 탭과 진행률 애니메이션
- `checklist-17`: 언론사 기사 목록, 닫기, 키보드 접근성

## 컴포넌트 계층

```text
App
  Header
  Ticker
  TabBar
  content-area
    Chevron
    PressGrid
      GridCell
        PressWordmark
        SubscribePill
    PressOpen
      PressWordmark
      FieldTab
```

`App`은 전체 상태를 소유한다. `PressGrid`와 `PressOpen`은 같은 콘텐츠 영역에서 `viewMode`에 따라 교체된다.

## 상태 책임

| 상태 | 위치 | 역할 |
| --- | --- | --- |
| `tab` | `App` | 전체 언론사 / 구독 언론사 범위 |
| `viewMode` | `App` | 그리드 / 리스트 화면 전환 |
| `page` | `App` | 현재 그리드 페이지 |
| `opened` | `App` | 리스트로 열린 언론사 id |
| `tabKey` | `App` | 열린 언론사의 활성 기사 분야 |
| `progress` | `App` | `FieldTab` 진행률 |
| `currentInTab` | `App` | 현재 분야에서 강조할 기사 인덱스 |
| `subscribed` | `App` | 구독 중인 언론사 id 집합 |

## 상태 전이

```text
그리드 셀 클릭
  -> opened = press.id
  -> viewMode = "list"
  -> tabKey = press.category
  -> progress = 0
  -> currentInTab = 0

FieldTab 클릭 또는 키보드 이동
  -> tabKey = 선택한 분야
  -> progress = 0
  -> currentInTab = 0

6초 진행률 완료
  -> 같은 분야의 다음 기사 강조
  -> 마지막 기사면 다음 분야로 이동
  -> 마지막 분야면 첫 분야로 순환

닫기 버튼 또는 그리드 보기 버튼
  -> opened = null
  -> viewMode = "grid"
  -> progress = 0
  -> currentInTab = 0
```

## 엣지케이스

- 구독 탭에 언론사가 없을 때 리스트 버튼을 누르면 빈 상태 문구를 보여준다.
- 구독 탭에서 해지 후 현재 페이지가 범위를 넘으면 마지막 가능한 페이지로 보정한다.
- 구독 버튼 클릭은 셀 열기 이벤트로 전파되지 않게 막는다.
- `prefers-reduced-motion` 환경에서는 기존 전역 CSS 규칙으로 진행률/전환 애니메이션 지속시간을 최소화한다.
- 필드 탭은 `ArrowLeft`, `ArrowRight`, `Home`, `End`로 이동한다.
