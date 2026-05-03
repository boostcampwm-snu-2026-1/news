# 뉴스스탠드 개발 체크리스트

> 코드스쿼드 9-10주차 미션. 디자인 시스템(`week9_design_system.pdf`)·기획서(`week9_proposal.pdf`)에서 도출한 기능 목록.
> 2주에 나누어 점진적으로 개발한다.

## 체크리스트 형식 규칙

- 각 항목은 **고유 번호**를 가지며, 커밋 메시지의 `#N`과 1:1 매칭된다.
- 번호 순서는 의존성 순서를 어느 정도 반영한다 (먼저 만들어야 다음이 가능).
- ✅ = 완료, ◻ = 미완료. 이번 주 범위는 **"Week 1"** 섹션.
- 한 항목이 너무 크면 하위 작업으로 쪼갠다 (예: #7-a, #7-b).

---

## Week 1 — 정적 화면까지 (이번 주)

### 기반

- ✅ **#1 프로젝트 셋업** — Vite + React 18 + TypeScript, 폴더 구조, `.gitignore`, 계획 문서
- ✅ **#2 디자인 토큰 → CSS 변수** — color/space/radius/font 토큰을 `:root`에 (디자인 시스템 §2-5)
- ✅ **#3 언론사 mock 데이터 (72개)** — `PressWordmark` props 포함된 outlet 데이터, 카테고리, ticker 데이터

### 컴포넌트 (보이는 화면)

- ✅ **#4 Header** — 신문 아이콘 + "뉴스스탠드" wordmark + 오늘 날짜 (`flex space-between`, height 29)
- ✅ **#5 자동 롤링 뉴스 티커** — 2 lanes, 3.2s 회전, 0.55s crossfade, `prefers-reduced-motion` 가드
- ✅ **#6 TabBar + viewer toggle** — 전체/구독 탭 + badge + 리스트/그리드 아이콘
- ✅ **#7 PressWordmark 컴포넌트** — weight/family/italic/underline/tracking/accent/accentChar/accentUnder/accentBg/flag/latin/small props
- ✅ **#8 6×4 Grid (전체 언론사)** — 930×388, gap 1px → divider line 효과
- ✅ **#9 Chevron 페이지네이션** — 24×40 chevron, 3 페이지 좌우 이동, disabled opacity 0

---

## Week 2 — 상호작용 (다음 주 예정)

- ◻ **#10 구독 상태 관리 + Cell hover → 구독/해지 pill** — `Set<pressId>`, 셀 hover 시 wordmark ↔ pill 전환
- ◻ **#11 내가 구독한 언론사 탭** — sparse grid, 동적 페이지 수 (≤24/page)
- ◻ **#12 오픈 프레스 뷰** — 필드 탭 + 6초 progress + 자동 진행 + 리스트 뷰 (헤드라인 이미지 + 6개 기사)
- ◻ **#13 접근성** — `role="tablist"`, focus parity, `prefers-reduced-motion`, aria-label

---

## 워크플로우 (체크리스트 1개당 1 사이클)

1. **설계** — 디자인 시스템 해당 절(§) 다시 읽기, 컴포넌트 인터페이스를 직접 스케치
2. **구현** — Claude와 페어 (내가 의도 먼저 설명 → 코드 생성/조정)
3. **리뷰** — 디자인 토큰 일치, 픽셀 수치(1280/930/175 gutter 등) 검증
4. **commit** — 아래 규약대로

## 커밋 메시지 규약

```
feat: #N <기능명>

- 확인내용: <검증한 것 / 자세한 설명>
- 이해 안 됐던 부분: <학습 포인트, 없으면 "없음">
```

## 참고 문서

- `week9.pdf` — 미션 스펙
- `week9_proposal.pdf` — 6 frames (1 기본, 2 hover-구독, 3 hover-해지, 4 페이지네이션, 5-6 리스트 뷰)
- `week9_design_system.pdf` — 토큰·타이포·스페이싱·컴포넌트·상태 모델
- `CLAUDE.md` — AI 페어링 가이드
