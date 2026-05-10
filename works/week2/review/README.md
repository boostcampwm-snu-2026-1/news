# Week 02 — Review

체크리스트 항목(= feature 번호)당 한 파일 — `commit<N>.md`. 같은 디렉터리에서 사용자는 N을 보고 `/commit-review N`으로 해당 커밋을 amend.

## 파일명 규칙

- `commit<N>.md` — N은 `plan.md`의 체크리스트 항목 번호. `<type>: #N <title>` 커밋과 1:1 대응 (type 은 feat/fix/refactor/docs/test 어느 것이든).
- 파일은 그 항목 커밋과 **같은 commit에 포함**된다 (별도 review 커밋 X).
- chore 같은 plan 외부 셋업/메타 커밋은 #N이 없으므로 review 파일도 없다.

## commit\<N\>.md 템플릿

```markdown
# Commit <N> — <커밋 subject>

- Feature: #<N> <plan.md 항목 제목>
- Type: feat | fix | refactor | docs | test

## 점검 결과

### 스펙 합치
spec/week2/spec.md 또는 spec/week1/ 의 PDF와 일치하는가.

### CLAUDE.md 규칙
컬러·선·그림자·타이포·a11y 등 영구 규칙을 어기지 않는가.

### 회귀
인접 컴포넌트나 기존 동작에 영향은 없는가.

### 테스트
이 변경이 테스트로 보호되는가.

### 불필요한 추상화
한 곳에서만 쓰는데 분리하지 않았는가.

### 기타 메모
(자유)
```

## 사용자 워크플로

1. AI가 `commit<N>.md`를 작성 + 같은 commit에 포함하여 `<type>: #N` 커밋.
2. 사용자가 코드 + 리뷰 노트를 검토.
3. `/commit-review N <확인내용/이해 안 됐던 부분>` — 스킬이 commit subject(`#N`)로 대상 커밋을 찾아 메시지의 placeholder 두 줄을 사용자 입력으로 갈아끼운 뒤 amend.
