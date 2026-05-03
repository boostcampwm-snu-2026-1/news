# Commit 9 — feat: #9 페이지네이션 + Chevron

- Feature: #9 페이지네이션 + Chevron
- Type: feat

## 점검 결과

### 스펙 합치
- §6.7 Chevron: 24×40, stroke `--c-mute` 1.4, polyline 셰브론 (left/right 방향). disabled 시 `opacity: 0` + `pointer-events: none` (레이아웃 유지, 시각적으로만 사라짐 — spec 그대로).
- 위치: layout.css 에 미리 박은 글로벌 클래스 `chevron-left` (left 103) / `chevron-right` (left 1153, top 430). 컴포넌트가 그 클래스 + 자체 클래스 조합.
- §7 페이지네이션: chevron 은 현재 탭(`tab`) 스코프. lastPage = `ceil(visible.length / 24) - 1`.
  - 전체 → visible = 72 → lastPage = 2 (페이지 0/1/2).
  - 구독 → visible = subscribed.length 만큼 → 페이지 가변.
- 첫 페이지 (`safePage <= 0`) → 좌 chevron disabled. 마지막 페이지 (`safePage >= lastPage`) → 우 chevron disabled.
- 구독 해지로 page > lastPage 가 되면 useEffect 가 page/set 으로 보정 (그리드가 빈 페이지로 안 뜸).

### CLAUDE.md 규칙
- 셰브론 색 mute (#879298) — §8 노트 "mute on white passes for 14px+" 가 텍스트 룰이지만, chevron 은 명확한 그래픽 글리프라 mute 적용 의도 일치 (frame 4 에서도 mute 톤).
- 1px 룰: stroke 1.4 — frame 4 / spec §6.7 의 명시 두께. 1px 룰 (선/divider) 와 다른 카테고리 (그래픽 stroke).
- accent 안 씀. 그림자/그라디언트 없음.
- `<button>` + `aria-label="이전/다음 페이지"` + `disabled` 속성 (§8 a11y).

### 회귀
- Newsstand.tsx 에 Chevron 두 개 mount + lastPage 보정 effect 추가. 그 외 영향 없음.
- PressGrid/GridCell 자체는 미변경 — plan 의 "PressGrid 수정" 은 페이지네이션 통합을 의미했지만 실제로는 Newsstand 컨테이너 레벨 변경으로 충분 (PressGrid 는 이미 items 배열을 받는 dumb 컴포넌트).
- 구독 탭에서 페이지 늘어나는 동작은 #10 의 희소 그리드 이후 더 명확.

### 테스트
- Visual: 첫 페이지에서 좌 chevron 안 보이고, 다음 페이지로 → 양쪽 보이고, 마지막 페이지 → 우 chevron 안 보임.
- 키보드: chevron 은 button. Tab 으로 focus, Enter/Space.
- a11y: aria-label 정확.

### 불필요한 추상화
- 페이지네이션 hook 같은 거 없음. lastPage 한 줄 계산 + useEffect 한 줄 보정. 한 곳에서만 쓰는 로직이라 분리 필요 없음.

### 기타 메모
- safePage 라는 derived 값을 두는 이유: state.page 가 reducer 갱신 사이클로 한 frame 늦게 보정되므로, 그 frame 동안 잘못된 slice 가 안 되도록 즉시 derive.
- Chevron 의 `chevron-left/right` 클래스는 layout.css 에 이미 박혀 있어 추가 css 변경 없음.
- spec §6.8 의 "Pagination dots" 는 "kept in system, not in every shipped frame" 이라 본 commit 에서 미구현. 필요 시 별도 컴포넌트.
