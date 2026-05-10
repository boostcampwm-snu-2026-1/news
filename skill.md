# AI Coding Convention (skill.md)

이 문서는 뉴스스탠드 프론트엔드 프로젝트를 구현할 때 지켜야 할 엄격한 기술적 제약사항과 코딩 컨벤션을 정의합니다. 바이브 코딩(의미 없이 돌아가기만 하는 코드)을 방지하고 유지보수성을 극대화하기 위해 다음 규칙을 준수합니다.

## 1. 기술 스택 및 스타일링
- **React + TypeScript**: 컴포넌트는 함수형(화살표 함수)으로 작성하며, 확장자는 `.tsx`를 사용합니다. 모든 Props와 State, 그리고 데이터 구조는 반드시 `interface`나 `type`으로 타이핑하여 런타임 에러를 방지합니다.
- **Tailwind CSS**: 스타일링은 Tailwind 유틸리티 클래스를 사용합니다. 기존의 CSS Modules 방식은 더 이상 사용하지 않습니다.
- **디자인 시스템 엄격 준수 (가장 중요)**: Tailwind를 사용하되, 임의의 색상(`bg-blue-500`, `text-gray-400` 등)은 절대 사용하지 않습니다. `tailwind.config.js`에 정의된 뉴스스탠드 전용 테마 토큰(`ink`, `sub`, `mute`, `line`, `soft`, `accent` 등)만을 사용하여 디자인 스펙("Clarity over decoration")을 준수합니다.

## 2. 상태 관리 (State Management)
- **지역 상태와 전역 상태의 분리**:
  - 특정 컴포넌트 내부에서만 쓰이는 상태(예: 호버 상태)는 `useState`를 사용합니다.
  - 여러 계층의 컴포넌트에서 공유되는 상태(예: 전체/구독 탭 선택 상태, 뷰어 모드, 구독한 언론사 ID 리스트)는 `Context API` (또는 지정된 Store)를 사용하여 Prop Drilling을 방지합니다.
- **비즈니스 로직 분리 (Custom Hooks)**:
  - 3.2초 티커 롤링, 6초 프로그레스 바 진행 등 `setInterval`, `setTimeout` 혹은 복잡한 상태 변화를 수반하는 로직은 반드시 `useTicker`, `useProgress` 등의 커스텀 훅으로 분리합니다. UI 컴포넌트 내부에 타이머 로직이 섞이는 것을 지양합니다.

## 3. 컴포넌트 설계
- **관심사 분리 (Separation of Concerns)**:
  - 컴포넌트의 크기가 커질 경우 역할에 맞게 하위 컴포넌트로 분리합니다.
  - 하나의 파일 안에는 원칙적으로 하나의 컴포넌트만 존재하도록 합니다 (매우 작은 단위의 내부 컴포넌트 제외).
- **Props**: Props 전달 시 구조 분해 할당(Destructuring)을 사용하여 명시적으로 어떤 데이터를 받는지 표시합니다.

## 4. 시맨틱 마크업 및 접근성 (Accessibility)
- WAI-ARIA 속성을 적절히 사용하여 탭(`<button role="tab">`), 선택 상태(`aria-selected="true"`) 등을 스크린 리더가 이해할 수 있도록 마크업합니다.
- 단순한 `div` 대신 목적에 맞는 태그(`header`, `nav`, `main`, `section`, `article` 등)를 사용합니다.
- `prefers-reduced-motion` 미디어 쿼리를 고려하여 사용자 OS 설정에 따른 애니메이션 처리(정지)를 반영합니다.
