# Commit 1 — feat: #1 프로젝트 부트스트랩

- Feature: #1 프로젝트 부트스트랩
- Type: feat

## 점검 결과

### 스펙 합치
이 항목은 스펙 PDF의 시각/동작 규격을 직접 구현하지 않는다 (그건 #2 이후). 다만 `index.html` `viewport` 를 `width=1280` 으로 고정해 캔버스 1280×720 전제(스펙 기획 PDF 1장)와 모순되지 않게 두었다.

### CLAUDE.md 규칙
- 컬러/선/그림자/타이포 토큰: 아직 도입 전 (#2 담당). 임시 `App.tsx` 는 인라인 스타일·임의 색상을 쓰지 않고 텍스트만 렌더 → 향후 토큰 도입 시 회귀 위험 없음.
- a11y: 임시 마크업이라 별도 시맨틱 부담 없음. 본 항목 범위 밖.
- 디렉터리 컨벤션: CLAUDE.md "디렉터리 컨벤션" 절(`components/data/hooks/styles/state`)을 그대로 만들었다.

### 회귀
신규 파일만 추가 — 기존 동작 영향 없음.

### 테스트
테스트 인프라(Vitest + Testing Library + jsdom + setupTests)만 깔았다. 실제 테스트 케이스는 #13. `--passWithNoTests` 로 0-test 상태에서도 `npm test` 가 통과하도록 처리.

### 불필요한 추상화
없음. 임시 `App.tsx` 는 한 줄짜리 placeholder.

### 기타 메모
- ESLint 8(classic config) 채택. 9 의 flat config 마이그레이션 비용을 피했다 — 본 프로젝트 규모에선 차이 없음.
- `tsconfig.json` 에 `exactOptionalPropertyTypes: true` 켜둠. 스펙 9장 상태(`opened: PressId | null` 등) 에서 `undefined`/`null` 혼동을 컴파일 타임에 차단하기 위함.
- 의존성 4건 moderate vulnerability 경고는 dev-only(eslint/glob 계열). 프로덕션 번들에 영향 없어 무시.
- `npm install` 후 생성되는 `package-lock.json` 도 같이 commit (재현성).
