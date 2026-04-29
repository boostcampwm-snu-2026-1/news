# 뉴스스탠드

데스크톱 웹 뉴스스탠드 UI입니다. `design_spec.pdf`, `design_config.pdf`를 기준으로 전체 언론사 그리드, 구독/해지, 구독 언론사 탭, 페이지 이동, 리스트 뷰 진입을 구현합니다.

## 기술 스택

- Next.js 16.2.4 App Router
- React 19.2.4
- TypeScript
- Tailwind CSS v4

## 실행

```bash
npm install
npm run dev
```

브라우저에서 다음 주소를 엽니다.

```txt
http://127.0.0.1:3000
```

WSL에서 Windows 브라우저 접속이 불안정하면 다음처럼 호스트를 열어 실행합니다.

```bash
npm run dev -- --hostname 0.0.0.0 --port 3000
```

## 검증

```bash
npm run lint
npm run build
```

화면 검증은 Chrome headless 1280x720 기준으로 진행했습니다. hover, 구독 클릭, 구독 탭, 페이지 이동, 리스트 뷰 전환은 Chrome DevTools Protocol로 실제 마우스 이벤트를 보내 확인했습니다.

## 문서

- [PR 본문 초안](docs/pr-body.md)
- [개발 체크리스트](docs/checklist.md)
- [프로젝트 작업 규칙](AGENTS.md)

## 구현 범위

- `#1` 디자인 토큰 정의
- `#2` 앱 메타데이터와 기본 레이아웃 정리
- `#3` 헤더 컴포넌트 구현
- `#4` 자동 롤링 뉴스 티커 구현
- `#5` 탭 바와 뷰 토글 구현
- `#6` 언론사 데이터 모델 작성
- `#7` 전체 언론사 6x4 그리드 구현
- `#8` 언론사 hover 구독/해지 버튼 구현
- `#10` 페이지네이션 chevron 구현
- `#14` Chrome 화면 검증
