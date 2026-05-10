# Commit 8 — 키보드 단축키 (←/→/Esc)

- Feature: #8 키보드 단축키 (←/→/Esc)
- Type: feat

## 점검 결과

### 스펙 합치
spec/week2/spec.md 의 *추가기능을 임의로 추가* 허용 범위 안. 스펙·디자인
시스템에 새 시각 요소를 더하지 않고 UX 만 개선 (Newsstand 의 기존 onLeft /
onRight 핸들러를 키보드로도 트리거). 디자인 PDF 어떤 픽셀도 건드리지 않음.

### CLAUDE.md 규칙
- 디자인 토큰 / 컬러 / 1px 선 / 그림자 / 그라디언트: 시각 변경 없음 →
  해당 없음.
- 타이포: 변경 없음.
- 모션 / `prefers-reduced-motion`: 키보드 단축키는 사용자 명시 입력이라
  자동 모션이 아니다 — reduced 가드 대상 아님 (정확한 해석: 자동 회전/진행만
  reduced 가드). useAutoAdvance 는 그대로 reduced 가드 유지.
- a11y: chevron 의 `disabled` 가드와 동일한 결과 — leftDisabled / rightDisabled
  가 true 일 때 onLeft / onRight 자체를 undefined 로 넘겨 단축키도 잠긴다.
  포커스가 input/textarea/select/contenteditable 안에 있거나 ctrl/alt/meta/
  shift 같이 눌리면 무시 — 브라우저/입력 단축키와 충돌 차단.
- accent #7890E7 가드: 변경 없음.

### 회귀
- Newsstand.tsx 에 `useKeyboardShortcuts` 호출 한 블록만 추가. 기존 onLeft /
  onRight / dispatch 시그니처 그대로. 마우스/터치 동작 영향 없음.
- chevron 이 disabled 일 때 키보드도 disabled — onLeft/onRight 가 undefined
  로 넘어가 hook 이 preventDefault 도 안 한다 (브라우저가 페이지를 좌우
  스크롤할 수 있게 그대로 둠 — 화면이 작아 대개 발생 안 하지만 안전).
- 검증:
  - `npx tsc --noEmit` exit 0
  - `npm test` — 82 tests pass (기존 71 + 신규 useKeyboardShortcuts 11)
  - `npm run build` — 174.03 kB JS / 10.38 kB CSS, 정상 빌드

### 테스트
useKeyboardShortcuts.test.ts 신규 11 케이스:
- 각 키 → 핸들러 호출 + preventDefault
- 핸들러 undefined → no-op (preventDefault 도 없음)
- 모디파이어 (ctrl/alt/meta/shift) 같이 → 무시
- input/textarea/contenteditable focus → 무시
- 무관한 키 → 무시
- unmount 시 listener 정리
- 최신 render 의 핸들러가 ref 로 캡처되는지 (rerender 후 새 핸들러 호출)

수동으로 검증해야 할 것 (verification.md 에 기록 예정):
- 그리드 모드에서 ←/→ 페이지 이동
- 리스트 뷰에서 ←/→ 같은 카테고리 안 outlet 이동, Esc 닫기
- 마지막 페이지에서 → 키 무반응 (chevron disabled 와 동일)

### 불필요한 추상화
- hook 은 인자 3 개 (onLeft/onRight/onEscape) — 필요할 때만 enable. 다른
  키가 추가되면 같은 hook 을 확장하기보다 새 hook 으로 가는 게 깔끔.
- listener 는 한 번만 등록 (ref 로 핸들러 캡처) — useInterval 과 같은
  패턴이라 일관.
- TS `exactOptionalPropertyTypes: true` 이라 `onLeft?: (() => void) |
  undefined` 명시 — 호출 측이 조건부 undefined 를 통과시키기 위함.

### 기타 메모
- jsdom 의 `target.isContentEditable` 가 `div.contentEditable = "true"` 만으로는
  true 가 안 되는 경우가 있어 hook 안에서 `getAttribute("contenteditable")`
  도 같이 본다 — 실 브라우저에서는 `isContentEditable` 만으로 충분하지만
  방어 한 줄 추가 비용이 적다.
- listener 가 `window` 에 붙으므로 keydown 의 target 이 window 인 경우가
  있다 (jsdom 에서 dispatch 시). `target instanceof HTMLElement` 가드로
  타입 좁히기 — Window 에는 getAttribute 가 없어서 그대로 두면 throw 한다.
- onEscape 는 isOpened 일 때만 활성. 그리드 모드에서 Esc 는 무반응 (페이지
  로드 직후 등 무의미한 이벤트 차단).
