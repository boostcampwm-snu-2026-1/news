1. 프로젝트 개요 (Project Overview)
    프로젝트 명: 뉴스스탠드 (News Stand)
    목적: AI를 활용한 실무 프론트엔드 개발 흐름을 익히고, 단계적인 기능 구현을 통해 웹 서비스를 완성한다.
    개발 기간: 총 2주 (현재 1주차 진행 중)
    기술 스택: React 기반 웹 개발 (라이브러리 최소화)
    캔버스 크기: 1280 × 720px (데스크톱 우선)

2. AI 동료 가이드라인 (AI Collaboration Rules)
    관계 정의: 너는 나의 단순한 도구가 아닌, 함께 토론하고 의견을 주고받는 협력적 관계의 동료이다.
    상호작용 방식:
        구현 전 반드시 설계와 계획에 대해 나와 먼저 논의한다.
        내가 제시한 설계안에 대해 개선 방안이나 질문이 있다면 적극적으로 제안한다.
        모든 결과물은 상호 검토(Review) 과정을 거쳐야 한다.

3. 개발 워크플로우 (Development Workflow)
    우리는 다음 단계를 반복하며 기능을 개발한다:
    설계: 구현할 기능의 구조와 로직을 먼저 논의한다.
    구현 (AI): 설계된 내용을 바탕으로 코드를 생성하거나 가이드를 제공한다.
    리뷰: 생성된 코드를 사람이 검토하고 피드백을 주고받는다.
    Commit: 검토 완료된 코드를 정해진 규칙에 따라 커밋한다.

4. 참고 문서 및 위치 (Documentation)
    체크리스트: docs/checklist.md (기획서에서 도출된 최소 10개 이상의 기능 단위 리스트)
    기획/디자인: Design Spec PDF (뉴스스탠드 기획 및 디자인시스템 정보)
    디자인 시스템 참고 파일: Design Spec v1 (6 frames)

5. 디자인 시스템 (Design System) ⭐ NEW
    
    5.1 핵심 원칙 (Design Principles)
        Clarity over decoration: 그래디언트 없음, 글로우 효과 없음. 1px 헤어라인 보더로 시각적 구분
        Type is the brand: 각 언론사는 스타일링된 워드마크(폰트 가중치, 이탤릭, 색상, 언더라인)로 표현
        One accent color: #7890E7 (인디고)만 사용 - 구독 배지와 활성 탭 진행률에만 적용
        Dense and calm: 16px 본문, 12px 메타, 타이트한 라인높이(1.15-1.5). 화면에 많은 콘텐츠를 표시하되 공백으로 호흡감 유지

    5.2 컬러 토큰 (Color Tokens)
        ink: #14212B - 본문, 굵은 라벨, 그리드 테두리
        sub: #5F6E76 - 보조 텍스트 (날짜, 캡션)
        mute: #879298 - 비활성 탭, 빈 화살표
        line: #D2DAE0 - 1px 구분선, 카드 테두리 (유일한 테두리 색)
        soft: #F5F7F9 - 티커 배경, 필드 탭 배경 (열린 상태)
        card: #FFFFFF - 그리드 셀, 오픈된 언론사 본문, 구독 버튼
        page: #FEFEFE - 페이지 배경
        accent: #7890E7 - 구독 수 배지, 활성 탭 채우기
        accent-deep: #4362D0 - 활성 탭 내 진행률 채우기

    5.3 타이포그래피 (Typography)
        주 폰트: Pretendard Variable / Pretendard (시스템 sans-serif로 폴백)
        숫자 폰트: IBM Plex Mono (탭 카운터 "1/81")
        세리프 강조: Noto Serif KR (세리프 워드마크: 朝鮮日報, Insight 등)
        한글 자간: body -0.01em, display -0.02em
        라틴 자간: 0 (워드마크는 추적 오버라이드 예: 0.08em)
        
        토큰별 사용처:
        | Token      | Size/Weight/Leading | 사용처                          |
        |-----------|-------------------|-------------------------------|
        | display   | 24/700/100%       | "뉴스스탠드" 헤더              |
        | heading   | 16/700/100%       | 활성 탭 라벨, 기사 제목         |
        | body      | 16/500/22px       | 비활성 탭, 오늘 날짜, 구독 라벨 |
        | list-item | 14/500/1.5        | 기사 리스트 행                 |
        | caption   | 12/500/1          | 메타(편집시간), 구독 버튼       |
        | mono-tab  | 12/500/1          | 탭 카운터 "1/81"              |

    5.4 스페이싱 (Spacing)
        기본 단위: 8px (모든 스페이싱은 8px의 배수)
        스페이싱 스케일: 4, 8, 12, 16, 24, 32, 40, 48, 64
        
        레이아웃 좌표:
        - 좌측/우측 거터: 175px씩
        - 헤더: y 58 (높이 29)
        - 티커: y 127 (높이 49)
        - 탭바: y 208 (높이 24)
        - 콘텐츠: y 256 (930 × 388)
        - 화살표: y 430 (24 × 40, 좌 103 / 우 1153)
        - 콘텐츠 폭: 930 (1280 − 175 − 175)

    5.5 보더/라디우스/섀도우 (Radii, Strokes, Shadows)
        테두리: 항상 1px, #D2DAE0 (다른 두께나 색상 없음)
        라디우스:
        - r-0: 0 (그리드 셀, 티커)
        - r-sub: 2 (언론사 로고 배경)
        - r-pill: 14 (구독 버튼 높이 28)
        - r-badge: 10 (구독 수 배지 20×20)
        섀도우: 
        - 그리드: 거의 없음
        - 구독 버튼만: 0 1px 2px rgba(20,33,43,0.04)

6. 커밋 로그 규칙 (Commit Message Rules)
    커밋 로그 작성 시 다음 형식을 반드시 준수하며, 나에게 커밋 메시지를 추천해 줄 때도 이 형식을 따른다:
    형식: feat: #[기능번호] [기능명]
    필수 포함 내용:
        확인 내용: 구현 및 테스트 과정에서 확인한 사항
        이해 안 됐던 부분: 구현 중 어려웠거나 추가 학습이 필요한 로직/개념 기록
    예시:
    ```
    feat: #3 뉴스 카드 컴포넌트
        확인 내용: 컴포넌트 배치 확인, 구조가 복잡해서 컴포넌트 분리 추가 진행
        이해 안 됐던 부분: useCallback 사용 이유와 최적화 원리 확인
    ```

7. 제미나이에게 바라는 점
    코드 생성 전, 해당 작업이 docs/checklist.md의 몇 번 항목에 해당하는지 먼저 물어봐 줄 것.
    구현 시 섹션 5 (디자인 시스템)의 색상, 폰트, 스페이싱, 컴포넌트 스펙을 엄격히 준수할 것.
    단순 코드 제공보다는 특정 로직을 왜 그렇게 짰는지 설명하여 나의 학습을 도울 것.
    디자인 스펙의 "상태와 흐름"(States and flows) 섹션을 참고하여 구현할 것.

8. 주요 컴포넌트 (Key Components)
    Header: 좌측 뉴스스탠드 로고 + 아이콘, 우측 오늘 날짜
    Ticker: 자동 롤링 뉴스 (3.2s 주기, 0.55s 크로스페이드, cubic-bezier(.4,0,.2,1))
    TabBar: "전체 언론사" / "내가 구독한 언론사" 탭 + 그리드/리스트 뷰 토글
    PressGrid: 6×4 그리드 (3페이지 × 24개 = 72 언론사), 각 셀 hover 시 구독/해지 버튼
    PressWordmark: 각 언론사의 스타일링된 워드마크 (폰트 가중치, 이탤릭, 배경색 등 변수)
    FieldTab: 오픈된 언론사의 카테고리 탭 (6개, 6초 진행률 애니메이션)
    PressOpen: 리스트 뷰 - 오픈된 언론사의 기사 목록
    Chevron: 좌우 페이지 네비게이션 (양쪽 외부 배치, 불가능 시 opacity 0)

9. 상태 및 흐름 (States and Flows)
    그리드 탭:
        "전체 언론사": 6×4 그리드, 페이지됨 (3 페이지)
        "내가 구독한 언론사": 스파스 그리드, 구독한 셀만 채움
    
    셀 hover:
        "전체 언론사" 탭 → "+ 구독하기" 버튼 표시
        "내가 구독한 언론사" 탭 → "− 해지하기" 버튼 표시
    
    언론사 클릭 → 오픈 상태:
        콘텐츠 영역이 그리드에서 리스트 뷰로 전환
        진입 탭은 해당 언론사의 주요 카테고리로 기본값 설정 (예: SBS Biz → "방송/통신")
        진행률 0에서 시작
    
    페이지네이션:
        화살표는 현재 탭에 범위 지정
        "전체 언론사": 3 페이지
        "내가 구독한 언론사": 구독 수에 따라 증가 (페이지당 ≤24)
    
    티커:
        항상 표시 (그리드 + 리스트 뷰 모두)
        콘텐츠 컬럼 상단
        닫을 수 없음

10. 접근성 (Accessibility)
    탭바는 semantically role="tablist" / 탭은 role="tab"
    활성 탭: aria-selected="true"
    화살표: <button> with aria-label="이전 페이지" / "다음 페이지", 불가능 시 disabled
    구독 수 배지: aria-label="구독 중인 언론사 9곳"
    Hover 컨트롤(구독 버튼): keyboard focus에서도 표시 (:focus-within)
    티커: hover/focus 시 회전 일시정지, prefers-reduced-motion 준수
    색상 대비: 모든 텍스트가 WCAG AA 표준 충족 (mute #879298는 14px+ 가능)

11. 제안된 React 구조 (Suggested React Structure)
    상태는 <Newsstand>에 집중:
    - tab: "all" | "sub"
    - page: number
    - opened: pressId | null
    - tabKey: categoryKey
    - progress: 0..1
    - currentInTab: number
    - subscribed: Set<pressId>
    
    진행률이 필드탭 채우기를 구동 → setInterval(tick, 100) over 6000ms
    완료 시 currentInTab++, 오버플로우 시 tabKey 진행, 탭 소진 시 처음으로 루프

12. 구현 체크리스트 (Implementation Checklist)
    ☐ CSS 변수로 색상 + 타입 토큰 추출 (:root)
    ☐ <PressWordmark press={p} /> 컴포넌트 (press 객체 기반)
    ☐ <GridCell> 호버 시 워드마크 ↔ 구독 버튼 전환
    ☐ <Ticker> 2레인 회전 + prefers-reduced-motion 가드
    ☐ <FieldTab> 진행률 애니메이션
    ☐ Focus/키보드 패리티 (마우스 호버와 동일)
    ☐ prefers-reduced-motion 준수
    ☐ 고정 1280 콘텐츠 폭 레이아웃