# 뉴스스탠드 상태 흐름

`<Newsstand>` 최상위에 모인 7개 상태와 그 사이의 전이를 정리한다.
구현은 [components/Newsstand.tsx](../src/components/Newsstand.tsx).

---

## 상태 (AppState)

| 키 | 타입 | 의미 | 초기값 |
|----|------|------|--------|
| `tab` | `'all' \| 'sub'` | 전체/구독 탭 | `'all'` |
| `viewer` | `'grid' \| 'list'` | 그리드/리스트 뷰어 | `'grid'` |
| `page` | `number` | 그리드 페이지 인덱스 (0-base) | `0` |
| `opened` | `PressId \| null` | 오픈된 언론사 id | `null` |
| `tabKey` | `CategoryKey` | 리스트 뷰 활성 카테고리 | `CATEGORY_KEYS[0]` (`'종합/경제'`) |
| `progress` | `number` (0..1) | 활성 카테고리 자동 진행도 | `0` |
| `currentInTab` | `number` (1..81) | 카테고리 내 현재 항목 인덱스 | `1` |
| `subscribed` | `Set<PressId>` | 구독한 언론사 집합 | `DEFAULT_SUBSCRIBED_IDS` |

`viewer`는 `opened`와 강하게 연동된다 (오픈 = 리스트 뷰).

---

## 파생값

`render` 시 매번 계산, 별도 상태 아님.

```
subscribedList = PRESSES.filter(p => subscribed.has(p.id))
sourceList     = tab === 'all' ? PRESSES : subscribedList
totalPages     = max(1, ceil(sourceList.length / PAGE_SIZE))   // PAGE_SIZE = 24
safePage       = min(page, totalPages - 1)                      // 페이지 클램프
pageItems      = sourceList.slice(safePage*24, safePage*24 + 24)
```

`page` 자체는 줄이지 않고 `safePage`로 표시만 보정한다 — 구독을 다시 추가하면 원래 페이지로 돌아갈 수 있도록.

---

## 화면 모드 (View Mode)

```
              opened === null                opened !== null
            ┌──────────────────┐            ┌──────────────────┐
            │   GRID MODE      │            │   OPEN MODE      │
            │                  │            │                  │
            │  PressGrid       │            │  FieldTab        │
            │  Chevron L/R     │            │  PressOpen       │
            │                  │            │  (no Chevron)    │
            └──────────────────┘            └──────────────────┘
                    ▲                                ▲
                    │ onCloseOpened                  │ onOpen(id)
                    │ (viewer→grid 클릭)             │ (셀 클릭)
                    └────────────────────────────────┘
```

두 모드는 `opened`로 분기. `viewer`는 표시 토글 + 그리드 모드로의 복귀 트리거.

---

## 주요 전이

### T1. 셀 클릭 → 오픈 (`onOpen`)

```
opened       = id
viewer       = 'list'
tabKey       = press.primaryCategory   // 그 언론사 주력 카테고리로 점프
currentInTab = 1
progress     = 0
```

`tab` / `page` / `subscribed` 는 보존.

### T2. 오픈 닫기 (`onCloseOpened` — 뷰어 토글로 grid 클릭)

```
opened   = null
viewer   = 'grid'
progress = 0
```

`tabKey`, `currentInTab` 은 보존 (다음에 다시 오픈할 때 새 언론사 기준으로 덮어씀).

### T3. 탭 변경 (전체 ↔ 구독, `onTabChange`)

```
tab  = next
page = 0                 // 다른 source list로 바뀌므로 안전하게 첫 페이지
```

### T4. 페이지 이동 (Chevron)

```
page = clamp(page ± 1, 0, totalPages - 1)
```

오픈 모드에서는 chevron이 렌더되지 않아 호출 경로 자체가 없음.

### T5. 카테고리 수동 전환 (FieldTab 클릭)

```
tabKey       = next
currentInTab = 1
progress     = 0
```

### T6. Progress 자동 진행 (interval, 100ms tick over 6000ms)

```
elapsed += 100
progress = min(1, elapsed / 6000)

if progress === 1:
  progress = 0
  advanceCurrent():
    if currentInTab < TAB_TOTAL (81):
      currentInTab++
    else:
      tabKey = CATEGORY_KEYS[(i+1) % 6]   // 카테고리 순환
      currentInTab = 1
```

interval은 `opened`가 truthy 일 때만 살아있고 `prefers-reduced-motion`이면 아예 시작하지 않는다.
의존성 배열에 `progress`를 넣지 않은 이유: 단일 `elapsed` 카운터를 유지하고 매 tick마다 effect 재실행을 피하기 위함.

### T7. 구독 / 해지

```
subscribe(id)   : subscribed = subscribed ∪ {id}
unsubscribe(id) : subscribed = subscribed \ {id}
```

`tab`, `page`, `opened` 모두 그대로 — 부수 효과 없이 집합만 변경.

---

## 시나리오 다이어그램

### S1. 첫 진입 → 셀 오픈 → 카테고리 순환 → 닫기

```
GRID(all, page0)
  │ 셀 클릭 (id="조선일보")
  ▼
OPEN(opened="조선일보", tabKey="종합/경제", current=1, progress=0)
  │ progress: 0 → 1 (6s)
  ▼
OPEN(current=2, progress=0) → ... → OPEN(current=81)
  │ progress 완료 (current=81 → 다음 카테고리)
  ▼
OPEN(tabKey="방송/통신", current=1)
  │ ... 6 카테고리 후 다시 종합/경제
  │ 사용자: viewer=grid 클릭
  ▼
GRID(all, page0)
```

### S2. 구독 탭 페이지네이션 — 구독 해지로 페이지 줄어드는 케이스

```
GRID(sub, page=2, subscribed={...72개})    // 3 페이지
  │ unsubscribe로 24개로 감소
  ▼
GRID(sub, page=2, subscribed={24개})
  │ totalPages = 1, safePage = min(2, 0) = 0
  ▼
실제 표시: page0 의 24개  (page state 자체는 2로 남음)
  │ 다시 24개를 구독하면 → safePage = min(2, 0) = 0 (총 페이지 여전히 1)
  │ 다시 49개째 구독하면 → totalPages=3, safePage=min(2,2)=2 → 원래 페이지 복귀
```

### S3. 오픈 중 해당 언론사 구독 해지

```
OPEN(opened="조선일보", subscribed.has("조선일보") = true)
  │ Pill 클릭 (해지)
  ▼
OPEN(opened="조선일보", subscribed.has("조선일보") = false)
  │ → opened, viewer 둘 다 그대로. 본문은 계속 표시.
  │ Pill 텍스트가 "− 해지하기" → "+ 구독하기"로만 바뀜
```

> 정책 결정 필요: 오픈을 자동으로 닫을지 여부. 현 구현은 "닫지 않음".

### S4. progress 진행 중 카테고리 수동 전환

```
OPEN(tabKey="종합/경제", current=40, progress=0.7)
  │ FieldTab "IT" 클릭
  ▼
OPEN(tabKey="IT", current=1, progress=0)
  │ effect 의존성 [opened, tabKey, currentInTab] 변경 → interval 재시작
```

### S5. `prefers-reduced-motion` 활성

```
mount
  │ Ticker: requestAnimationFrame 루프 자체를 시작하지 않음
  │ Newsstand effect: 조건문에서 early-return → progress interval 미시작
  ▼
OPEN(progress=0 고정)   // 사용자 클릭만으로 카테고리/항목 이동 가능
```

---

## 불변식 (Invariants)

| # | 식 | 보장 위치 |
|---|----|-----------|
| I1 | `opened !== null` ⇒ `viewer === 'list'` | `onOpen` / `onCloseOpened` 동시 set |
| I2 | `0 ≤ safePage ≤ totalPages - 1` | 매 render의 `min` 클램프 |
| I3 | `1 ≤ currentInTab ≤ TAB_TOTAL` | `advanceCurrent`에서 81 도달 시 1 리셋 |
| I4 | `0 ≤ progress ≤ 1` | tick에서 `min(1, ...)`, 완료 시 0 리셋 |
| I5 | progress interval은 `opened !== null` 일 때만 활성 | effect의 `if (!opened) return` |
| I6 | 그리드 모드에선 chevron만, 오픈 모드에선 chevron 미렌더 | `{!opened && <Chevron .../>}` 조건부 |

---

## 점검 결과 — 컴포넌트 계층

현재 트리:

```
<Newsstand>                            // 모든 상태 + 모든 핸들러
  <Header />                           // props: date
  <Ticker />                           // props: lanes
  <TabBar />                           // props 5개 (state 3 + handler 2)
  ├─ GRID 모드
  │   <PressGrid />                    // props 5개 (items, subscribed, 3 handlers)
  │   <Chevron x2 />                   // props 3개
  └─ OPEN 모드
      <FieldTab />                     // props 4개
      <PressOpen />                    // props 6개 (press + article + 2 handlers)
```

- **상태 위치**: 7개가 모두 한 곳 → 정합성 추적 쉽고, 자식은 모두 stateless.
  Props drilling 깊이는 1단계뿐 (모두 직속 자식).
- **개선 후보**:
  - Progress 드라이버 effect를 `useProgressDriver(opened, tabKey)` 훅으로 분리하면
    Newsstand의 핸들러 가독성↑.
  - 구독 토글 로직을 `useSubscriptions()` 훅으로 분리하면 추후 localStorage 영속화 시
    유일한 변경 지점이 됨 → 2-C-1 작업 시 함께 처리.
  - reducer로 묶기엔 전이가 단순해서 cost-benefit 부정적. 현 useState 유지 권장.
