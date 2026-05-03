---
name: commit-review
description: Feature 번호 N에 해당하는 commit의 message placeholder 라벨 줄(확인내용/이해 안 됐던 부분)을 사용자 입력으로 갈아끼워 amend. works/weekX/review/commit<N>.md 의 Hash 필드도 첫 호출 시 동기화. 과제 워크플로(설계 → 구현 → AI 리뷰노트 → AI 커밋 → 사용자 리뷰 → /commit-review)의 마지막 단계. 코드 변경은 하지 않는다.
---

# /commit-review \<N\> [\<리뷰 입력\>]

사용자가 feature `#N`에 해당하는 커밋을 amend.

- 대상 커밋 식별: `works/*/review/commit<N>.md`의 Hash 필드 → 없으면 `git log` subject `#N` 매치
- amend 작업 두 가지를 동시에:
  1. 메시지의 `- 확인내용:` / `- 이해 안 됐던 부분:` 라벨 줄을 사용자 입력으로 교체
  2. `commit<N>.md`의 `Hash: pending` 을 amend 직전의 hash로 채워서 staged

## 호출 형식

| 호출 | 동작 |
|---|---|
| `/commit-review` | 번호도 모름 → 사용자에게 N 묻고, 두 필드 묻고 진행 |
| `/commit-review 3` | N만 있음 → 두 필드를 AskUserQuestion |
| `/commit-review 3 확인내용: <a> 이해 안 됐던 부분: <b>` | 라벨로 분리 |
| `/commit-review 3 <자유텍스트>` | 단일 텍스트 → 확인내용으로, 이해 안 됐던 부분은 "없음" |
| 빈 줄로 분리된 두 단락 | 첫째=확인내용, 둘째=이해 안 됐던 부분 |

## 절차

### 1. 입력 파싱
- 첫 토큰이 숫자면 N. 아니면 사용자에게 묻는다.
- 나머지 텍스트에서 두 필드 추출 (위 표대로). 빠진 게 있으면 AskUserQuestion으로만 보충.

### 2. commit\<N\>.md 위치 찾기
```bash
ls works/*/review/commit<N>.md 2>/dev/null
```
- 정확히 1개 → 사용
- 2개 이상 → 어느 주차인지 사용자에게 물음
- 0개 → "feature #N 의 review 파일이 없다"고 알리고 종료

### 3. Hash / 대상 커밋 식별

```bash
HASH=$(grep -E '^- Hash:' <commit<N>.md path> | head -1 | sed -E 's/^- Hash:[[:space:]]*//')
```

- `HASH=="pending"` → subject 매치로 식별:
  ```bash
  git log --all --format='%H %s' | grep -E ' #'<N>'( |$)' | head -5
  ```
  결과 1개면 그 hash. 여러 개면 사용자에게 list 보여주고 선택. 0개면 종료.
- `HASH!="pending"` → `git rev-parse --verify "$HASH"`로 존재 확인. 없으면 (이미 amend됨) 위 subject 매치 fallback.

### 4. 푸시 / 스테이지 사전 점검
- 푸시 여부:
  ```bash
  if git rev-parse '@{u}' >/dev/null 2>&1; then
    git merge-base --is-ancestor "$HASH" '@{u}' && echo "이미 푸시됨"
  fi
  ```
  푸시되어 있으면 force-push 필요 사실 확인. 사용자가 거절하면 종료.
- 스테이지된 변경: `git diff --cached --quiet` exit≠0이면 amend에 포함됨 사실을 알리고 진행 여부 확인.

### 5. 새 메시지 구성
- `git log -1 --format=%B "$HASH"` 로 기존 메시지를 가져와서:
  - `^- 확인내용:.*` → `- 확인내용: <user 입력>`
  - `^- 이해 안 됐던 부분:.*` → `- 이해 안 됐던 부분: <user 입력>`
- 그 외 줄(제목, 본문, Co-Authored-By 등)은 손대지 않음.
- 입력에 줄바꿈이 포함되면 라벨 줄 다음에 들여쓴 추가 줄로 풀어 쓴다.

### 6. commit\<N\>.md Hash 필드 동기화
- 파일의 `- Hash: pending` 줄을 `- Hash: <대상 HASH>`로 치환. (이미 채워져 있으면 그대로 둠.)
- 변경된 파일을 `git add <path>` 로 스테이지.

### 7. 메시지 amend / rebase reword

**HEAD인 경우:**
```bash
git commit --amend -m "$(cat <<'MSG_EOF'
<재구성된 메시지>
MSG_EOF
)"
```

**HEAD~K (older)인 경우 — rebase reword:**
```bash
SHORT=$(git rev-parse --short=7 "$HASH")
NEW_MSG_FILE=$(mktemp)
cat > "$NEW_MSG_FILE" <<'MSG_EOF'
<재구성된 메시지>
MSG_EOF

GIT_SEQUENCE_EDITOR="sed -i.bak \"s/^pick $SHORT/reword $SHORT/\"" \
GIT_EDITOR="cp \"$NEW_MSG_FILE\"" \
git rebase -i "${HASH}^"

rm -f "$NEW_MSG_FILE"
```
- `GIT_SEQUENCE_EDITOR`로 시퀀스 파일에서 해당 커밋만 `pick`→`reword`로 바꿈
- `GIT_EDITOR`는 commit message 편집기 — `cp <pre-prepared file>`로 호출돼 메시지 파일을 통째로 덮어씀
- 같은 rebase에서 6번에서 staged한 파일 변경(Hash 동기화)도 함께 반영됨

### 8. 결과 보고
- 새 commit hash (`git log --all --format='%H' | head -1` 또는 amend 후 `git rev-parse HEAD`나 rebase 후 해당 위치) 출력
- 사용자가 입력한 두 필드를 그대로 인용해 확인
- 만약 원래 푸시되어 있었으면 force-push 필요 사실 한 번 더 알림

## 비목표 / 제약

- **코드 변경 안 함.** commit<N>.md의 Hash 필드 동기화만 한다.
- 한 번에 한 커밋만. `/commit-review 1 2 3` 같은 다중 지정은 지원하지 않음.
- review 파일이 없으면 자동 생성하지 않는다 (AI가 만든 파일을 보호 — 의도치 않은 새 파일 생성 방지).
- push는 절대 자동 실행하지 않는다.
