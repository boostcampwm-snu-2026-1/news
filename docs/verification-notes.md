# 2주차 검증 노트

PR 본문 첨부용. "무엇을 어떻게 검증했는지"의 단일 출처.

---

## 검증 범위 요약

| 항목 | 위치 | 케이스 수 |
|------|------|-----------|
| 2-B-1 구독 0개 상태 | [2-B-1 테스트](../src/test/edge-cases/2-B-1-empty-subscription.test.tsx) | 3 |
| 2-B-2 페이지 클램프 | [2-B-2 테스트](../src/test/edge-cases/2-B-2-page-clamp.test.tsx) | 2 |
| 2-B-3 오픈 중 해지 | [2-B-3 테스트](../src/test/edge-cases/2-B-3-unsub-while-open.test.tsx) | 2 |
| 2-B-4 progress 리셋 | [2-B-4 테스트](../src/test/edge-cases/2-B-4-progress-reset.test.tsx) | 2 |
| 2-B-5 reduced-motion | [2-B-5 테스트](../src/test/edge-cases/2-B-5-reduced-motion.test.tsx) | 3 |
| 2-B-6 키보드 접근성 | [2-B-6 테스트](../src/test/edge-cases/2-B-6-keyboard.test.tsx) | 7 |
| 2-C-1 localStorage 영속화 | [2-C-1 테스트](../src/test/edge-cases/2-C-1-localstorage.test.tsx) | 5 |
| 2-C-2 그리드 방향키 | [2-C-2 테스트](../src/test/edge-cases/2-C-2-grid-keyboard-nav.test.tsx) | 9 |

**총 33개 케이스 / 8개 파일 / `npm test` 시 모두 통과.**

---

## 검증 방법

- **Vitest 4 + jsdom 29**: vite와 동일 빌드 파이프라인에 얹어 별도 transform 설정 없음.
- **@testing-library/react 16**: 통합 수준 검증 — 가능한 한 `<Newsstand />` 풀 마운트로 사용자 흐름 그대로 재현.
- **fireEvent + act(advanceTimersByTime)**: userEvent + fake timers 조합이 hang하는 회피책.
- **`vi.spyOn(window, 'matchMedia')`**: prefers-reduced-motion 분기 시뮬레이션.
- 매 테스트 종료 시 `cleanup()` + `vi.useRealTimers()` + `localStorage.clear()` ([setup.ts](../src/test/setup.ts)).

쿼리 패턴:
- 그리드 셀(`role="button"`인 div) vs SubscribePill(`<button>` 태그) 구분: 후자만 골라내는 `pillButtons(label)` 헬퍼 사용.
- 활성 카테고리 탭: TabBar의 전체/구독 탭과 FieldTab 둘 다 `aria-selected="true"`라 카테고리 키 정규식으로 분리.

---

## 주요 발견 · 정책 결정

### S3 — 오픈 중 구독 해지 정책 (2-B-3)
선택지: (a) 자동으로 그리드 복귀 / (b) PressOpen 유지하고 pill 토글만.
**결정: (b)**. "방금 보고 있던 화면이 갑자기 사라지는 놀람"이 자동 닫힘의 이점보다 크다고 판단. 테스트로 정책을 고정.

### S2 — 페이지 클램프 (2-B-2)
구독 탭 마지막 페이지의 항목을 모두 해지하면 `safePage = min(page, totalPages-1)`만 보정하고 `page` state 자체는 보존. **다시 같은 탭에서 구독을 늘리면 원래 마지막 페이지로 복귀 가능**. 단, 탭 전환 시 `setPage(0)` 명시 리셋되므로 "탭 유지가 전제".

### 2-B-4 / 2-B-5 — 모션 분기
- 카테고리 수동 전환은 `progress=0` + `currentInTab=1`로 즉시 리셋. 새 카테고리에서 interval 재가동.
- `prefers-reduced-motion: reduce` 일 때 progress effect와 Ticker effect 모두 early-return — 시간이 흘러도 상태 변화 없음. 사용자 직접 클릭만 카테고리 전환 가능함을 별도 케이스로 확인.

### 2-B-6 — 키보드 접근성
- Chevron 비활성은 **HTML `disabled` 속성**으로 표현 (aria-disabled 아님) — 포커스/활성화 모두 차단됨을 `focus()` 시도 후 `activeElement` 체크로 검증.
- SubscribePill은 실제 `<button>` 태그라 기본 tabIndex=0. CSS는 hover-only지만 `:focus-within`으로도 노출되도록 [PressGrid.module.css](../src/components/PressGrid.module.css)에 정의.

### 2-C-1 — localStorage 영속화 폴백
손상된 저장값(배열 아닌 JSON / 파싱 실패) 모두 `DEFAULT_SUBSCRIBED_IDS`로 silent fallback. 다음 쓰기에서 정상 형식으로 자가 복구. 향후 토스트 도입 시 한 번 알리는 방식 검토 가능.

### 2-C-2 — 빈 셀 정책
방향키로 빈 셀(role 부재 슬롯)에 도달하면 **건너뛰지 않고 그대로 정지**. 건너뛰기를 구현하면 6×4 산술이 깨지고 점프가 직관에서 벗어나 부작용이 더 크다고 판단.

---

## 검증의 한계

| 항목 | 자동화 가능 부분 | 자동화 불가 — 수동 QA 필요 |
|------|-----------------|--------------------------|
| `:focus-within` pill 노출 | "포커스 받을 수 있는 button" 인지 | 실제 시각 노출 (JSDOM은 computed style 미지원) |
| Ticker crossfade 0.55s | 활성 아이템 전환 (aria-hidden) | opacity transition 곡선 |
| Chevron `opacity:0` 비활성 | `disabled` 속성 | "버튼이 보이지 않지만 자리는 차지"를 시각 확인 |
| 1280px 고정 폭 레이아웃 | — | 실제 뷰포트에서 시각 확인 |

위 항목은 PR 머지 전 브라우저에서 한 번 직접 확인.

---

## 참고: 리팩토링 영향

2-D-2의 두 hook 분리(`useSubscriptions`, `useProgressDriver`)는 동작 변화 없는 리팩토링이며, 위 33개 테스트가 안전망으로 동작. 분리 전후 모두 통과 확인.
