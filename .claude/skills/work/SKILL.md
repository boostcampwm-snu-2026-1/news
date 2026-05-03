---
name: work
description: 주차 plan.md 의 체크리스트 항목 한 개를 처음부터 끝까지(의존성 체크 → 설계 → 구현 → commit<N>.md 작성 → plan.md 체크박스 갱신 → 단일 commit)로 처리. 인자로 항목 번호 N 을 받거나 비우면 plan.md 의 첫 미완 항목을 자동 선택. commit message 의 확인내용/이해 안 됐던 부분은 placeholder 로 두며, 사용자가 별도로 /commit-review 로 채운다.
---

# /work [N] [weekN]

주차 plan.md 의 한 체크리스트 항목을 한 사이클로 처리하고 단일 commit 까지 만든다.

## 호출 형식

| 호출 | 동작 |
|---|---|
| `/work` | 가장 최근 weekN 의 plan.md 에서 첫 미완(`[ ]`) 항목 |
| `/work 3` | 가장 최근 weekN 의 #3 항목 |
| `/work 3 week2` | week2 의 #3 항목 (여러 주차 동시 진행 시) |

## 절차

### 1. 주차 / 항목 식별

- **주차**: 인자에 `weekN` 있으면 그것. 없으면:
  - `works/week*/` 중 `plan.md` 의 `Status: in-progress` 인 디렉터리. 둘 이상이면 사용자에게 묻는다.
  - 모두 `done` 이면 "진행 중인 주차가 없다" 알리고 종료.
- **항목 N**: 인자에 숫자 있으면 그것. 없으면 plan.md 의 `- [ ] **N. ...**` 줄 중 가장 작은 N.
- 항목 제목은 `- [ ] **N. <title>** — ...` 의 `<title>` 부분 (정규식: `^\s*-\s*\[[ x]\]\s*\*\*(\d+)\.\s*([^*]+)\*\*`).

### 2. 의존성 체크

plan.md 의 "## 의존관계" 표에서 #N 의 선행 항목 추출:
- 모든 선행이 `[x]` → 진행
- 하나라도 `[ ]` → 미완 선행 항목 N 들을 보여주고 종료. (사용자가 의도적이면 `--force`로 재호출 안내)

### 3. 설계

- plan.md 의 항목 설명을 펼쳐 무엇을 / 어떻게 / 어디에 만들지 결정한다.
- 필요 시 인터페이스/타입을 먼저 박는다.
- 사용자에게 한두 줄 설계 요약을 보여주고 바로 다음 단계 (사용자가 멈추라고 안 하면 진행).

### 4. 구현

- 코드를 `src/` 하위에 작성. 다른 곳을 건드리지 않도록 주의 (스펙 외 파일 수정 금지).
- 다음 영구 규칙을 따른다 — `CLAUDE.md` 참고:
  - 디자인 토큰만 사용 (`:root` CSS 변수)
  - accent 색은 두 곳, 선은 1px / `#D2DAE0`, 그림자/그라디언트 금지(예외 두 군데)
  - 한글/Latin letter-spacing, wordmark 는 이미지 아닌 타이포그래피
  - 인터랙션 모션 규격 (티커 3.2s/0.55s, field tab 6s, `prefers-reduced-motion` 가드)
  - WCAG AA + ARIA 규칙
- 스펙(`spec/` PDF)의 픽셀 치수와 토큰을 그대로 따른다.

### 5. commit\<N\>.md 작성

`works/<주차>/review/commit<N>.md` 를 다음 형식으로 작성 (이미 있으면 덮어쓰지 말고 사용자에게 알림):

```markdown
# Commit <N> — feat: #<N> <항목 제목>

- Hash: pending
- Feature: #<N> <항목 제목>
- Type: feat

## 점검 결과

### 스펙 합치
spec/ 의 PDF 와 비교 — 어떤 토큰/치수/동작을 어떻게 매칭했는지.

### CLAUDE.md 규칙
컬러/선/그림자/타이포/모션/a11y 규칙을 어기지 않았는지 항목별로.

### 회귀
인접 컴포넌트나 기존 동작에 미치는 영향. 없으면 "없음".

### 테스트
이 변경이 테스트로 보호되는지. 추가/수정한 테스트 목록 또는 "다음 wave 의 #13 에서 다룸".

### 불필요한 추상화
한 곳에서만 쓰는데 컴포넌트/훅으로 빼지 않았는지. 없으면 "없음".

### 기타 메모
(필요 시 자유)
```

각 섹션은 빈 칸으로 두지 말고 짧게라도 채울 것 — "확인됨", "해당 없음" 등.

### 6. plan.md 체크박스 갱신

`works/<주차>/plan.md` 의 해당 줄에서 `- [ ] **N.` → `- [x] **N.` 로 정확히 한 글자 치환.

### 7. 단일 commit

- 명시적 경로로 stage (의도치 않은 파일을 끼워넣지 않도록):
  ```bash
  git add <변경된 src 파일들> works/<주차>/review/commit<N>.md works/<주차>/plan.md
  ```
- commit message:
  ```
  feat: #<N> <항목 제목>

  <짧은 본문 — 무엇을 어떻게 구현했는지 1~3 줄>

  - 확인내용: (리뷰 시 작성)
  - 이해 안 됐던 부분: (리뷰 시 작성)

  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  ```
- amend 하지 않는다 (사용자 `/commit-review` 의 영역).
- pre-commit 훅이 실패하면 원인 수정 후 새 commit 으로 (--no-verify 금지).

### 8. 결과 보고

- 새 commit 의 short hash 와 변경 파일 목록 한눈 요약
- plan.md 의 다음 미완 항목 안내 (있으면)
- 사용자가 `/commit-review <N>` 로 placeholder 채울 차례임을 한 줄로 환기

## 병렬 작업

기본은 한 호출 = 한 항목. 같은 wave 안의 여러 항목을 동시 처리하고 싶으면 사용자가 명시적으로 요청해야 한다.

명시 요청 시:
- 각 항목당 subagent 한 개 spawn — 각 subagent 는 절차 3~5 (설계·구현·commit<N>.md) 까지 수행
- 모든 subagent 종료 후 메인이 절차 6~7 을 항목 순서대로 직렬 수행 (git index lock + 의존관계 보존)
- 같은 파일을 두 항목이 수정해야 한다면 병렬 거부 — wave 를 더 잘게 쪼개라고 알린다

## 비목표

- `/commit-review` 가 하는 일(placeholder 채우기, Hash 동기화) 은 절대 하지 않는다
- 다음 wave / 다음 항목으로 자동 진행하지 않는다 — 한 항목 끝낼 때마다 사용자 지시 대기
- amend 또는 force-push 하지 않는다
- chore/refactor/docs 등 #N 없는 셋업 작업은 이 스킬 범위 밖 (CLAUDE.md 의 일반 규칙대로 직접 처리)
- 새 주차 디렉터리 생성, 스펙 흡수, plan 초안 작성도 이 스킬 밖 (별도 흐름)
