# Commit 6 — selectors/시나리오 통합 테스트

- Feature: #6 selectors/시나리오 통합 테스트
- Type: test

## 점검 결과

### 스펙 합치
spec/week2 의 *검증 체계 구축* 미션의 두 번째 보강 (#5 = reducer 엣지,
#6 = selectors 시나리오). #2 의 상태 흐름 docs 가 표로 정리한 파생 상태
체인(visible → lastPage → safePage → pageItems → catOutlets → curIdx)을
실제 시나리오로 trace 하여 기계 검증으로 굳혔다. spec/week2/spec.md 가
명시한 두 미션 중 검증 체계 구축에 기여.

다룬 시나리오 (10 개):

1. 한 카테고리만 visible — wrap 자기 자신 (auto-advance loop 보장)
2. sub 탭 visible.length=0 — lastPage=0, safePage clamp, chevron 양쪽 끝
3. 27 → 2 명 unsubscribe — lastPage 1 → 0, page=1 이 0 으로 clamp
4. opened press unsubscribe — curIdx -1, currentInTab=1 floor 보호
5. all → sub 탭 전환 — visible 길이/순서 변화 + reference 동작
6. visible 비었을 때 — catOutlets [], curIdx -1, count 1 floor
7. 정확히 72 outlets — 3 페이지 각 24 개, page 3 오버슈트 clamp
8. 5 카테고리 비고 1 만 — wrap 모두 그 카테고리로
9. 자동 진행 한 스텝 — 같은 카테고리 안 idx+1 분기
10. 카테고리 끝 → 다음 카테고리 점프 첫 outlet

### CLAUDE.md 규칙
코드 변경 없음 (테스트 파일 append only). 컬러/선/그림자/타이포/모션/a11y
규칙 모두 해당 없음. selectors.ts / Newsstand.tsx / reducer 등 본체 일체
미수정.

### 회귀
selectors.test.ts 만 수정 (append). 기존 19 케이스는 한 줄도 건드리지
않았다.

검증:
- `npm test` — selectors.test.ts: 29 tests passed (기존 19 + 신규 10)
- 전체: 67 passed / 1 failed. 실패 1 건은 같은 wave 3 의 #7 a11y 작업
  산출물(Chevron.test.tsx, untracked) 이고 #6 작업과 무관하다.
  #6 가 수정한 파일(selectors.test.ts) 의 모든 케이스는 pass.

### 테스트
신규 시나리오 10 개. 단일 함수 단위가 아닌 selectors 조합으로 한
사용자 흐름을 한 케이스 안에서 끝까지 trace 한다. 각 케이스 안에서
visible → lastPage → safePage → pageItems / catOutlets → curIdx →
currentInTab / count 의 의존 체인을 그대로 호출.

### 불필요한 추상화
- `makePress()` 헬퍼는 기존 파일에 이미 있어 그대로 재사용 (중복 정의
  안 함).
- A1/A2/B1/C1 픽스처도 재사용. R1/R2 는 시나리오 [8] 한 곳에서만 쓰여
  inline.
- 새 헬퍼 함수 도입하지 않음 (시나리오마다 step 이 약간씩 달라서 묶을
  수록 가독성 손해).

### 기타 메모
- `getVisible` 의 all 모드가 입력 배열 reference 를 그대로 반환한다는
  점([5]에서 `toBe(ALL)` 로 명시) — Newsstand 의 useMemo 가 새 배열을
  만들지 않아 PressGrid 가 불필요하게 재렌더되지 않는다. selectors 만
  보면 디테일이지만 React 렌더 트리거 측면에서 의미가 크다.
- `findNextCategoryWithOutlets` 가 "그 카테고리만 있을 때 자기 자신
  return" 하는 동작은 auto-advance wrap loop 가 자연스럽게 되도록 설계
  된 것. 시나리오 [1], [8] 로 두 번 명시 — 이 동작이 깨지면 auto-
  advance 가 멈춘다.
- `getCurrentInTab(-1) === 1` floor 동작([4], [6])은 opened 가 visible
  에서 사라지는 한 프레임 동안 NaN/음수 가드 역할. Newsstand 의
  useEffect 가 정리하기 전 표시값이 안전하다.
- selector 한계: opened 가 visible 에서 사라졌을 때 selector 는 "다음
  outlet 이 무엇인지"는 모른다 (그 결정은 reducer/useEffect 의 책임).
  selector 는 -1 만 알려주고 멈춘다 — 잘 분리된 형태.
