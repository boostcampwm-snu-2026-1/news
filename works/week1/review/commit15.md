# Commit 15 — feat: #15 날짜 동적 표시

- Feature: #15 날짜 동적 표시
- Type: feat

## 점검 결과

### 스펙 합치
- §6.1 "Right: todays date, '2026. 01. 14. 수요일', body 16/500 color sub" — frame 의 데모 문자열은 그날의 날짜였다는 점을 살려 `new Date()` 기반으로 동적 생성.
- 포맷 `YYYY. MM. DD. <한국어 요일>` 그대로.

### CLAUDE.md 규칙
- 컬러 / 토큰 / 모션 룰 변경 없음. Header 컴포넌트의 시각 표현은 그대로.

### 회귀
- Newsstand 마운트 시 `useMemo` 로 한 번만 계산 — re-render 마다 새 Date 객체 안 만듦.
- 자정에 페이지를 켜둔 채 날이 바뀌면 표시 갱신 안 됨 (현실적으로 새로고침). 데모 범위에서 OK.

### 테스트
- 시각: 오늘 날짜가 한국어 요일과 함께 표시.
- Unit: format 함수는 의도적으로 export 하지 않음 (한 곳에서만 쓰임). 별도 테스트 안 함.

### 불필요한 추상화
- format 함수를 hooks/ 또는 utils/ 로 빼지 않고 Newsstand.tsx 안에 inline. 다른 컴포넌트가 안 씀.

### 기타 메모
- `Intl.DateTimeFormat("ko-KR", { weekday: "long" })` 도 가능하지만, 단순 배열 lookup 이 의도가 더 명확하고 가벼움.
