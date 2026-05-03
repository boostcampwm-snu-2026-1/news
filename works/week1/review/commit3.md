# Commit 3 — feat: #3 타입 + 픽스처

- Feature: #3 타입 + 픽스처
- Type: feat

## 점검 결과

### 스펙 합치
- `types.ts` — 디자인시스템 §6.5 의 PressWordmark props 14개 (name/color/bg/weight/family/italic/underline/tracking/accent/accentChar/accentUnder/accentBg/flag/latin/small) 를 그대로 인터페이스화. §9 의 NewsstandState 형태(tab/page/opened/tabKey/progress/currentInTab/subscribed) 도 그대로.
- 카테고리 6종 (`종합/경제 · 방송/통신 · IT · 스포츠/연예 · 매거진/전문지 · 지역`) — frame 5/6 의 field tab 라벨에서 추출.
- `press.json` — 72 outlets:
  - page 1 (24): frame 2 (pd-2.png) 에서 1:1 추출 — wordmark 색상/italic/serif/underline/chip/flag 디테일 반영.
  - page 2 (24): frame 4 (pd-5.png) 에서 1:1 추출.
  - page 3 (24): frame 에 없으므로 한국 주요 언론사 24종 임의 채움 (default sans/ink).
- `ticker.json` — 두 레인. lane 0 은 연합뉴스 시작, lane 1 은 한국경제 시작 (frame 1 의 ticker 그대로). 각 레인 6 아이템으로 회전 폭 확보.
- `articles.json` — 리스트 뷰가 등장하는 두 outlet (SBS Biz, 아시아경제) 데이터. 헤드라인 + 6 list items + count (1/81 의 81). frame 5, 6 텍스트 그대로.

### CLAUDE.md 규칙
- accent #7890E7 미사용 (데이터 픽스처라 컬러 토큰 사용처 아님).
- 1px/#D2DAE0 는 컴포넌트 commit 에서 적용.
- press.json 의 wordmark color 는 디자인 시스템 컬러 토큰 외의 hex (#E63E2C / #2A8AC4 / #003C8B / #FF7A00 / #C73E2C / #4A8FB0 / #E2A23E / #0066B3 / #FFFFFF) 를 사용 — 이는 wordmark 가 "각 언론사 브랜드 컬러" 라는 본질상 토큰화 대상이 아님 (디자인시스템 §3 도 wordmark 색상은 PressWordmark props 로 분리).
- 본문 텍스트 자체는 모두 ink. sub/mute 적용처는 컴포넌트 단계.

### 회귀
신규 데이터 파일 + types 만. 기존 코드(App.tsx) 와 무관.

### 테스트
타입 자체는 컴파일 타임에 검증 (`tsc -b`). 데이터 형태 검증은 #13 의 reducer 테스트에서 import 해 사용.

### 불필요한 추상화
- categorize helper 같은 함수는 만들지 않음. 컴포넌트가 필요할 때 직접 필터.
- ArticleListItem 은 단일 필드 (title) 지만 향후 url/timestamp 추가 가능성으로 객체 유지.

### 기타 메모
- press.json 은 정렬 보존 (page 1/page 2/page 3 순서 = 6×4 그리드 셀 순서). 페이지네이션 시 `slice(page*24, (page+1)*24)` 만으로 그리드 데이터 확정.
- editTime 은 모두 동일한 데모 시각 ("2026.01.14. 18:53 편집"). frame 5 의 SBS Biz 와 frame 6 의 아주경제는 다른 시간이지만 (18:53 / 19:38) 단순화.
- `wordmark.tracking` 은 string (CSS letter-spacing). `accentChar` / `accentUnder` 는 chunk-of-string index 가 아니라 0-base char index — PressWordmark 컴포넌트 (#5) 에서 split + map.
