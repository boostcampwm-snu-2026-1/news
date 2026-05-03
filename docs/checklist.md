# 뉴스스탠드 개발 체크리스트

## 체크리스트 형태에 대해

이 체크리스트는 **컴포넌트/기능 단위로 그룹화**한 형태를 선택했습니다.

- 평탄한 나열보다 기능 영역이 눈에 들어와 "지금 어느 단계인지" 파악이 쉽습니다.
- 각 항목은 **독립적으로 완료 여부를 확인**할 수 있는 크기로 쪼갰습니다.
- 수용 기준(acceptance criteria)을 괄호로 표기해, PR 리뷰 때 명확한 기준이 됩니다.

---

## 전체 체크리스트

### 0. 프로젝트 셋업

- [ ] **Vite + React 18 프로젝트 초기화** (npm create vite, 불필요한 보일러플레이트 정리)
- [ ] **CSS 디자인 토큰 `:root` 변수 설정** (color tokens 11종, typography scale, spacing 8px 배수, radius tokens)
- [ ] **폴더 구조 생성** (components/, data/, hooks/, assets/logos/)

### 1. 공통 헤더

- [ ] **`<Header>` 컴포넌트** — 왼쪽: newspaper-icon + "뉴스스탠드" 워드마크, 오른쪽: 오늘 날짜 `YYYY. MM. DD. 요일` 형식

### 2. 뉴스 티커

- [ ] **`<NewsTicker>` 컴포넌트** — 2-lane 병렬 배치, gap 8 _(1주차: 정적 표시만. 롤링은 2주차)_
- [ ] **자동 롤링 구현** — 3.2초마다 교차 전환, crossfade 0.55s (`cubic-bezier(.4,0,.2,1)`) _(2주차)_
- [ ] **타이머 cleanup** — `useEffect` return에서 반드시 clearInterval _(2주차, 롤링과 함께)_

### 3. 탭바

- [ ] **`<TabBar>` 컴포넌트** — "전체 언론사" / "내가 구독한 언론사 N" 탭, 우측 리스트/그리드 뷰 토글 아이콘
- [ ] **구독 수 뱃지** — accent 배경 20×20 pill, IBM Plex Mono 숫자

### 4. Mock 데이터

- [ ] **`publishers.js`** — 72개 언론사 (id, name, wordmark 스타일 props: color, bg, weight, family, italic, underline, tracking, accent, flag 등)
- [ ] **`articles.js`** — 언론사별 카테고리 + 기사 목록 (headline, editTime, items 6개)

### 5. 언론사 워드마크

- [ ] **`<PressWordmark>` 컴포넌트** — press 객체를 받아 타이포그래피 스타일을 렌더링 (filled chip, accent char, flag glyph, serif/sans 분기)

### 6. 언론사 그리드

- [ ] **`<PublisherGrid>` 컴포넌트** — CSS Grid 6열×4행, gap 1px (gap이 divider 역할), 배경 `#D2DAE0` _(1주차: 첫 페이지 24개만 표시)_
- [ ] **`<PublisherCell>` hover 상태** — 미구독: "+ 구독하기" 필 오버레이 / 구독 중: "− 해지하기" 필 오버레이, bg `#F5F7F9`
- [ ] **"내가 구독한 언론사" 탭의 sparse grid** — 구독 언론사만 채워지고 빈 셀은 흰 배경 유지 _(2주차, 페이지네이션과 함께 다루기 권장)_

### 7. 페이지네이션 _(2주차)_

- [ ] **`<Chevron>` 컴포넌트** — 24×40, stroke `#879298`, 첫/마지막 페이지에서 `opacity: 0` (레이아웃 유지)
- [ ] **페이지 인디케이터** — active: 20×8 pill `ink`, inactive: 8×8 dot `line`, trailing counter `1 / 3` IBM Plex Mono

### 8. 구독 상태 관리

- [ ] **`useSubscriptions` hook** — `Set<pressId>` 상태, localStorage 읽기/쓰기, subscribe/unsubscribe 함수 반환
- [ ] **페이지 새로고침 후에도 구독 상태 복원** 확인

### 9. 리스트 뷰 (ListView) — 2주차 후반

- [ ] **언론사 셀 클릭 → 리스트 뷰 전환** — `opened` 상태로 `<PressGrid>` → `<PressOpen>` 전환
- [ ] **`<FieldTab>` 카테고리 탭** — 종합/경제 · 방송/통신 · IT · 스포츠/연예 · 매거진/전문지 · 지역, 6개 flex 탭
- [ ] **프로그레스 바 애니메이션** — 6초 linear fill, setInterval(tick, 100) 방식, 완료 시 `currentInTab++`
- [ ] **기사 리스트 레이아웃** — 좌: 340px (헤드라인 이미지 + 헤드라인), 우: flex 1 (기사 6줄 + footnote)
- [ ] **언론사 자동 전환** — 탭 소진 시 다음 언론사로 이동, 타이머 cleanup

### 10. 접근성

- [ ] **ARIA 적용** — tablist/tab role, aria-selected, chevron aria-label("이전 페이지"/"다음 페이지"), 뱃지 aria-label
- [ ] **키보드 포커스 = hover 동일** — `:focus-within`으로 구독 pill 노출
- [ ] **`prefers-reduced-motion`** — 티커 rotation 비활성화

---

## 개발 워크플로우

체크리스트 항목 하나 = 한 사이클. 아래 4단계를 반복한다.

```
1. 설계  →  2. 구현 (AI)  →  3. 리뷰  →  4. 커밋
```

### 각 단계에서 할 일

**1. 설계**
- 체크리스트 항목의 수용 기준을 다시 읽는다.
- 어떤 props/state/함수가 필요한지 머릿속으로 그린다.
- 모르는 개념이 있으면 먼저 찾아보고 시작한다.

**2. 구현 (AI)**
- AI에게 구현을 맡긴다.
- 생성된 코드를 한 줄씩 읽으며 이해한다.
- 이해 안 되는 부분은 바로 AI에게 물어본다.

**3. 리뷰**
- 브라우저에서 직접 동작을 확인한다.
- 체크리스트의 수용 기준을 하나씩 눈으로 검증한다.
- 이상하면 수정 요청, 이상 없으면 다음 단계.

**4. 커밋**
- 아래 커밋 로그 형식에 맞춰 기록한다.
- 커밋 전에 `git diff`로 변경 파일 한 번 더 확인.

---

## 커밋 로그 형식

```
<type>: #<번호> <항목 이름>

- 확인내용: <브라우저/코드에서 직접 확인한 것>
- 이해 안 됐던 부분: <처음엔 몰랐지만 이해하게 된 것, 없으면 "없음">
```

**type 종류**

| type | 언제 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `style` | CSS/디자인만 변경 |
| `refactor` | 동작 변화 없이 코드 정리 |
| `chore` | 설정, 데이터 파일 등 |

**예시**

```
feat: #3 뉴스 티커 자동 롤링

- 확인내용: 3.2초마다 두 레인이 교차 전환되는 것 브라우저에서 확인,
  탭을 바꿨다 돌아와도 타이머가 중복 실행되지 않음
- 이해 안 됐던 부분: useEffect의 return 함수(cleanup)가 왜 필요한지 —
  컴포넌트가 언마운트될 때 setInterval이 남아있으면 메모리 누수가 생기기 때문
```

```
chore: #4 publishers.js Mock 데이터 72개

- 확인내용: 3페이지 × 24개 = 72개 채워짐, 워드마크 props 형태 통일
- 이해 안 됐던 부분: 없음
```

---

## 이번 주 (1주차) 개발 범위

> **목표: 그리드 뷰 기반 MVP — 앱을 열면 헤더·정적 티커·탭·첫 페이지(24개) 언론사 그리드에서 구독 흐름까지 볼 수 있다.**  
> **범위:** 전체 체크리스트 대략 **절반**(셋업·헤더·티커 레이아웃·탭·mock·워드마크·1페이지 그리드·구독 저장). 나머지는 2주차.

| # | 항목 | 완료 |
|---|------|------|
| 0 | Vite + React 18 프로젝트 초기화 | - [ ] |
| 0 | CSS 디자인 토큰 `:root` 변수 설정 | - [ ] |
| 0 | 폴더 구조 생성 | - [ ] |
| 1 | `<Header>` 컴포넌트 | - [ ] |
| 2 | `<NewsTicker>` 컴포넌트 (2-lane 정적 표시만) | - [ ] |
| 3 | `<TabBar>` 컴포넌트 + 구독 수 뱃지 | - [ ] |
| 4 | `publishers.js` Mock 데이터 72개 | - [ ] |
| 5 | `<PressWordmark>` 컴포넌트 | - [ ] |
| 6 | `<PublisherGrid>` + `<PublisherCell>` hover (첫 페이지 24개만) | - [ ] |
| 8 | `useSubscriptions` hook + localStorage 복원 | - [ ] |

**2주차(전반):** 티커 자동 롤링 + cleanup, 페이지네이션(Chevron·인디케이터), sparse grid, `articles.js` (4번 일부)

**2주차(후반) 이후:** ListView 전체 (9번), 접근성 polish (10번)

---

## 1주차 학습 목표 (PR 본문에 작성 예정)

- **목표**: React 컴포넌트 설계 원칙 체득 — props 인터페이스를 먼저 정의하고 구현하는 습관
- **방법**: 각 컴포넌트를 만들기 전에 어떤 props를 받을지 먼저 주석으로 정리한 뒤 구현
- **확인 기준**: 구독 상태가 새로고침 후에도 유지되고, 첫 페이지 그리드에서 워드마크·셀 hover·구독/해지가 기획대로 동작하는가
