# Commit 16 — feat: #16 articles 더미 데이터 확장

- Feature: #16 articles 더미 데이터 확장
- Type: feat

## 점검 결과

### 스펙 합치
- §6.10 의 "6 list items + headline + count" 형태 그대로 — `CategoryArticles` 인터페이스에 맞춰 생성.
- 카테고리 6종 모두에 6개씩 헤드라인 풀 + 카테고리별 한 줄 헤드라인 템플릿. count 81 (frame 5/6 의 SBS Biz / 아시아경제 와 동일).

### CLAUDE.md 규칙
- 컬러/토큰/모션 룰 무관 (데이터 helper).
- 텍스트는 모두 한국어 — frame 의 톤 유지 (정책/지원/시범/조사 등 정적인 어휘).

### 회귀
- helper 파일만 신설 — 아직 import 하는 곳 없음 (#17 에서 PressOpen 이 fallback 으로 import).
- articles.json 은 그대로 (SBS Biz, 아시아경제 정확 데이터 유지).

### 테스트
- 다른 commit 의 fixture 가 그대로 유효 (jsdom + 기존 reducer 테스트 영향 없음).

### 불필요한 추상화
- `Record<CategoryKey, string[]>` 두 개 + 단일 함수. 클래스나 builder 패턴 같은 것 없음.

### 기타 메모
- count = 81 을 `DEFAULT_CATEGORY_COUNT` 상수로 export — #17 의 Newsstand progress tick 폴백 카운트 가 같은 값을 import 하면 일관성 유지.
- 헤드라인은 `${pressName} 단독: ...` 패턴으로 outlet 별로 시각적 차이 살짝.
