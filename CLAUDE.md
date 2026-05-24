# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 이 프로젝트는

**뉴스스탠드(Newsstand)** — 데스크톱 웹 뉴스 포털.

- 언론사를 6×4 그리드로 탐색하고 구독/해지
- 자동 롤링 뉴스 티커
- 언론사 선택 시 카테고리 탭 + 6초 주기 자동 전환 기사 리스트 뷰

기획서: `뉴스스탠드-기획디자인.pdf` / 디자인 토큰: `뉴스스탠드-디자인시스템.pdf`  
개발 체크리스트: [docs/checklist.md](docs/checklist.md)

## GitHub 업로드 규칙

커밋 메시지, PR 제목/본문, 코멘트 등 GitHub에 업로드되는 모든 내용에 AI(Claude)의 이름이나 흔적을 포함하지 않는다.

- 커밋 메시지에 `Co-Authored-By: Claude` 등의 줄을 추가하지 않는다.
- PR 설명 하단에 "Generated with Claude Code" 등의 문구를 포함하지 않는다.

## 커밋 메시지 규칙

체크리스트 번호를 반드시 포함하고, 확인한 내용과 이해 안 됐던 부분을 기록한다.

```
feat: #6 6×4 그리드 레이아웃 구현

- 확인내용: gap 1px로 border 없이 구분선 표현되는 것 확인, 930px 고정 폭 적용
- 이해 안 됐던 부분: CSS grid gap이 왜 border 역할을 할 수 있는지 확인함
```

형식: `feat | fix | style | refactor | chore: #번호 작업내용`

## PR 작성 규칙

제목: `[학부명_실명] - 작업 요약` (예: `[전기정보공학부_김서울] - 1주차 그리드 UI 구현`)

본문은 [pull_request_template.md](.github/pull_request_template.md) 항목을 채운다:
- **완료 작업 목록**: 동작 화면 스크린샷 포함
- **설계 내용** / **가장 막혔던 순간** / **새로 알게 된 것** / **다르게 한다면?**

## 디자인 토큰 요약

색상: `ink #14212B` / `sub #5F6E76` / `line #D2DAE0` / `accent #7890E7` / `accent-deep #4362D0`  
폰트: Pretendard Variable (본문) · IBM Plex Mono (탭 카운터 `1/81`) · Noto Serif KR (조선일보 등 세리프 워드마크)  
기준 폭: 1280px 캔버스, 콘텐츠 930px (좌우 여백 175px씩)  
chevron 위치: left 103 / right 1153, top 430

## 자동 병합 워크플로우

[auto-merge.yml](.github/workflows/auto-merge.yml)이 매주 일요일 00:10 KST에 실행된다.

- `main` 브랜치 대상 PR은 병합하지 않고 코멘트만 남긴다.
- `review` 라벨 PR은 건너뛴다.
- `CHANGES_REQUESTED` 상태 PR은 병합 연기.
- `CONFLICTING` 상태 PR은 자동으로 닫힌다.
