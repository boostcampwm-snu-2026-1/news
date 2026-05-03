# Week 01 — Review

체크리스트 항목(= feature 번호)당 한 파일 — `commit<N>.md`. 같은 디렉터리에서 사용자는 N을 보고 `/commit-review N`으로 해당 커밋을 amend.

## 파일명 규칙

- `commit<N>.md` — N은 `plan.md`의 체크리스트 항목 번호. `feat: #N <title>` 커밋과 1:1 대응.
- 파일은 그 feat 커밋과 **같은 commit에 포함**된다 (별도 review 커밋 X).
- chore/refactor/docs 같은 셋업/메타 커밋은 #N이 없으므로 review 파일도 없다.

## commit\<N\>.md 템플릿

```markdown
# Commit <N> — <feat 커밋 subject>

- Hash: pending  <!-- /commit-review 첫 호출 시 그 시점 HEAD hash로 갱신 -->
- Feature: #<N> <plan.md 항목 제목>
- Type: feat | fix | ...

## 점검 결과

### 스펙 합치
spec/ 의 PDF와 일치하는가.

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

## Hash 필드의 의미

- 처음 작성 시점에는 `Hash: pending`. 사용자의 `/commit-review N` 첫 호출 시 스킬이 그 시점의 commit hash를 기록한다.
- 이후 amend로 hash가 다시 바뀌더라도 파일에 적힌 값은 갱신하지 않는다 — "사용자가 처음 리뷰를 적용한 시점의 hash"라는 fingerprint.
- 즉 파일의 Hash 필드 = **사용자 리뷰 amend 직전의 commit hash**.

## 사용자 워크플로

1. AI가 `commit<N>.md`를 작성 (Hash: pending) + 같은 commit에 포함하여 `feat: #N` 커밋.
2. 사용자가 코드 + 리뷰 노트를 검토.
3. `/commit-review N <확인내용/이해 안 됐던 부분>` — 스킬이 commit subject(`#N`)로 대상 커밋을 찾아 hash 채우고, 메시지의 placeholder 두 줄을 사용자 입력으로 갈아끼운 뒤 amend.
