# 뉴스스탠드 (Newsstand)

데스크톱 웹 뉴스 포털. React + CSS variables.

## 스택

- React + TypeScript
- Vite
- CSS variables 토큰 기반 스타일링 (`docs/design-spec.md` 참고)
- 폰트: Pretendard (npm) · IBM Plex Mono · Noto Serif KR (Google Fonts)
- 고정 1280px 콘텐츠 너비 / state는 `<Newsstand>` 최상위 집중

## 컴포넌트 트리

```tsx
<Newsstand>
  <Header />
  <Ticker />
  <TabBar activeTab viewer subCount />
  {opened
    ? <PressOpen press tabKey />
    : <PressGrid items subscribedIds onSubscribe onUnsubscribe onOpen />
  }
  <Chevron dir="left" />
  <Chevron dir="right" />
</Newsstand>
```

## 앱 상태 shape

```ts
{
  tab: 'all' | 'sub'
  page: number
  opened: pressId | null
  tabKey: categoryKey
  progress: number        // 0..1
  currentInTab: number
  subscribed: Set<pressId>
}
```

## 핵심 동작 규칙

- **그리드**: 6×4, 페이지당 24개, 전체 3페이지 (72개 언론사)
- **구독 탭**: 구독한 셀만 채움, 나머지 빈 흰 셀 유지
- **셀 클릭**: 그리드 → `<PressOpen>` 전환, 해당 언론사의 primary 카테고리로 진입
- **progress**: `setInterval(100ms)` over 6000ms → 완료 시 `currentInTab++` → 탭 소진 시 첫 탭 순환
- **언론사 로고**: 이미지 없음, CSS 타입으로 구현된 워드마크 (`<PressWordmark>`)
- **accent `#7890E7`**: 구독 수 배지, 활성 탭 — 이 두 곳에만 사용
- hover-only 컨트롤(구독/해지 필)은 키보드 `:focus-within`에서도 동일하게 노출
- `prefers-reduced-motion` 시 Ticker 완전 비활성화

## 디자인 스펙 참조

컬러 토큰, 타이포그래피, 컴포넌트 치수, 레이아웃 좌표 → [`docs/design-spec.md`](docs/design-spec.md)
