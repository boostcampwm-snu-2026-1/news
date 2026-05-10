# 뉴스스탠드 구현 체크리스트

## 📌 1주차 목표: 전체 언론사 그리드 + 기본 UI 완성

### 기초 세팅
- [x] checklist-1 프로젝트 초기 환경 설정 (React, Vite, 폴더 구조)
- [x] checklist-2 CSS 변수 및 글로벌 스타일 정의 (:root 컬러 토큰, 타이포그래피)
- [x] checklist-3 언론사 데이터 구조 정의 (72개 언론사 배열, wordmark props)

### 상단 UI 컴포넌트
- [x] checklist-4 Header + Ticker 컴포넌트 (로고+날짜, 2레인 회전 3.2s, 크로스페이드)
- [x] checklist-5 TabBar 컴포넌트 (전체/구독 탭, 뷰 토글, 구독 수 배지)

### 그리드 레이아웃
- [x] checklist-6 PressGrid 컴포넌트 (6×4 그리드, 930×388px, 1px 구분선)
- [x] checklist-7 GridCell + PressWordmark (호버 시 구독/해지 버튼, 스타일링된 워드마크)
- [x] checklist-8 Subscribe Pill 컴포넌트 (+ 구독하기 / − 해지하기)

### 페이지네이션 및 상태 관리
- [x] checklist-9 Chevron + 페이지네이션 (좌우 화살표, 3페이지 × 24개 관리)
- [x] checklist-10 구독 상태 관리 (useState로 Set<pressId> 추적, 구독/해지 로직)

### 스타일링 & 접근성
- [x] checklist-11 디자인 시스템 준수 (색상 토큰, 타이포그래피, 8px 스페이싱)
- [x] checklist-12 접근성 + 반응형 (role="tablist", aria-selected, 1280px 콘텐츠 폭)

---

## 📊 체크리스트 사용 방법

### 개발 프로세스 (각 항목마다)
```
1. 설계 단계
   - GitHub Copilot에게 "이 항목 구현하는 방법이 뭘까요?"라고 질문
   - 컴포넌트 구조, props, 상태 관리 방식 논의

2. 구현 단계
   - GitHub Copilot이 코드 생성
   - 디자인 시스템 준수 확인

3. 리뷰 단계
   - 코드 검토: 가독성, 로직, 디자인 준수
   - 버그 확인: 호버, 클릭, 페이지네이션 동작

4. 커밋 단계
   - Windows cmd에 바로 붙여넣을 수 있는 한 줄 명령어 형식 사용
   - 형식: git commit -m "feat: checklist-[번호] [기능명]" -m "확인내용: ..." -m "이해 안 됐던 부분: ..."
   - 확인내용 + 이해 안 됐던 부분을 각각 별도 -m 옵션에 기록
```

### 커밋 메시지 예시
```
git commit -m "feat: checklist-4 Header + Ticker 컴포넌트" -m "확인내용: 헤더 레이아웃 완성, 티커 2레인 회전 애니메이션 구현" -m "이해 안 됐던 부분: cubic-bezier(.4,0,.2,1) 타이밍 함수 이유 확인"
```

---

## 🎯 1주차 완료 조건

✅ checklist-1 ~ checklist-12 모두 완료
✅ PR 작성 (학습 목표, 개발 과정, 어려웠던 점 기록)
✅ 전체 언론사 그리드 페이지 정상 렌더링

**진행 상황 추적:** 우측 체크박스를 클릭하여 진행 상황 기록!

---

## 📌 2주차 목표: 상태흐름 설계 + 리스트 오픈 기능 + 검증 체계

### 설계 및 문서화
- [x] checklist-13 10주차 PDF 요구사항 정리 및 상태흐름 설계 문서 작성
- [x] checklist-14 구현 전 컴포넌트 계층과 상태 책임 범위 정의

### 리스트 뷰 기능
- [x] checklist-15 언론사 클릭 시 리스트 오픈 상태로 전환
- [x] checklist-16 FieldTab 컴포넌트 추가 (6개 분야, 진행률 표시, 키보드 이동)
- [x] checklist-17 PressOpen 컴포넌트 추가 (언론사 워드마크, 기사 목록, 닫기 흐름)

### 검증 체계
- [x] checklist-18 엣지케이스 도출 및 검증 방법 문서화
- [x] checklist-19 빌드 검증과 수동 확인 항목 기록
- [x] checklist-20 수동 UI 검증 수행 결과 기록
- [x] checklist-21 접근성 세부 점검 및 보완
- [ ] checklist-22 PR 작성용 회고 및 검증 요약 정리
- [ ] checklist-23 최종 빌드 및 제출 전 점검

## 🎯 2주차 완료 조건

✅ 상태흐름 설계 필수 항목 문서화  
✅ 리스트 오픈/닫기, 탭 진행률, 키보드 이동 동작 확인  
✅ 검증 대상과 검증 방법을 PR에 옮길 수 있는 형태로 기록  
