# CLAUDE.MD

## 프로젝트 개요
- 프로젝트 이름: 뉴스스탠드
- 목표: React 기반 웹 애플리케이션으로 뉴스스탠드 서비스를 2주에 나누어 단계적으로 구현한다.
- 작업 방식: AI를 동료로 보고, 기획 확인 -> 상태 흐름 설계 -> 구현 -> 검증 -> 리뷰 -> 커밋 순서로 진행한다.

## 현재 단계
- 현재는 2주차 구현 단계이며, PDF 기반 설계 반영과 검증 체계 구축을 함께 진행한다.
- 이번주 범위는 `/Users/donghyun/Documents/news/docs/checklist.md`의 `이번주 개발 범위` 섹션을 기준으로 한다.

## 참고 문서 원칙
- 기획서와 디자인시스템은 Claude Design으로 제작된 문서를 기준으로 삼는다.
- 원본 PDF는 먼저 Markdown 참고 문서로 요약/변환한 뒤 설계와 구현 기준으로 사용한다.
- 참고 문서는 `/Users/donghyun/Documents/news/docs/references/newsstand-planning.md`와 `/Users/donghyun/Documents/news/docs/references/newsstand-design-system.md`에 정리한다.
- 상태 흐름과 컴포넌트 구조는 `/Users/donghyun/Documents/news/docs/design/week2-architecture.md`를 기준으로 맞춘다.

## AI 협업 가이드
- AI는 구현 대행 도구가 아니라 설계와 리뷰를 함께하는 동료로 사용한다.
- 큰 기능을 한 번에 요청하지 말고, 체크리스트 번호 기준으로 작은 작업 단위로 나눈다.
- 구현을 요청하기 전에 아래 네 가지를 먼저 정리한다.
  - 무엇을 만들지
  - 완료 조건이 무엇인지
  - 상태가 어떻게 바뀌는지
  - 어디까지 이번 커밋 범위인지
- 기획이 바뀌면 코드보다 먼저 문서를 업데이트한다.

## 구현 원칙
- React 컴포넌트는 재사용 가능한 단위로 분리한다.
- 디자인 시스템의 색상, 타이포그래피, 간격은 CSS 변수와 컴포넌트 규칙으로 먼저 정리한다.
- 상태 전이 규칙은 순수 함수로 분리해 테스트 가능하게 만든다.
- 초기 단계에서는 목업 데이터로 UI 흐름과 자동 진행 규칙을 먼저 검증한다.
- 반응형 대응과 접근성 점검을 기능 구현과 함께 진행한다.

## 개발 흐름
1. 관련 기획서와 디자인 참고 문서를 확인한다.
2. 체크리스트에서 이번에 다룰 번호 하나를 고른다.
3. 상태 흐름, 컴포넌트 책임, 검증 기준을 먼저 메모한다.
4. AI와 설계 초안을 합의한 뒤 구현한다.
5. 테스트와 빌드로 검증하고 필요한 수정 사항을 정리한다.
6. 커밋 메시지에 체크리스트 번호, 확인 내용, 이해가 안 됐던 부분을 남긴다.
7. PR 본문에 이번주 목표, 검증 방법, 진행 상황을 업데이트한다.

## 문서 목록
- 체크리스트: `/Users/donghyun/Documents/news/docs/checklist.md`
- 개발 워크플로우: `/Users/donghyun/Documents/news/docs/workflow.md`
- 기획서 변환본: `/Users/donghyun/Documents/news/docs/references/newsstand-planning.md`
- 디자인시스템 변환본: `/Users/donghyun/Documents/news/docs/references/newsstand-design-system.md`
- 2주차 설계 문서: `/Users/donghyun/Documents/news/docs/design/week2-architecture.md`

## 커밋 메시지 예시
```text
feat: #10 언론사 오픈 뷰 구현

- 확인내용: 상태 전이와 카테고리 자동 진행 규칙을 함께 확인함
- 이해 안 됐던 부분: progress 완료 시 다음 카테고리로 넘기는 기준을 다시 확인함
```
