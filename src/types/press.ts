/**
 * 뉴스스탠드 타입 정의
 * 출처: week9_design_system.pdf §6.5 PressWordmark, §9 React structure
 */

/** 카테고리 — opened-press의 6개 field tab과 매칭 */
export type CategoryKey =
  | 'general'    // 종합/경제
  | 'broadcast'  // 방송/통신
  | 'it'         // IT
  | 'sports'     // 스포츠/연예
  | 'magazine'   // 매거진/전문지
  | 'local';     // 지역

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  general: '종합/경제',
  broadcast: '방송/통신',
  it: 'IT',
  sports: '스포츠/연예',
  magazine: '매거진/전문지',
  local: '지역',
};

export const CATEGORY_ORDER: CategoryKey[] = [
  'general',
  'broadcast',
  'it',
  'sports',
  'magazine',
  'local',
];

/**
 * 언론사 워드마크 스타일 props (디자인 시스템 §6.5).
 * 워드마크는 이미지가 아니라 typographic artifact — 이 props로 모양이 결정된다.
 */
export type WordmarkStyle = {
  /** 텍스트 색 (default: var(--ink)) */
  color?: string;
  /** 채워진 chip 배경 (KBS WORLD, 이데일리, MBN 등) */
  bg?: string;
  weight?: 400 | 500 | 700;
  family?: 'sans' | 'serif';
  italic?: boolean;
  underline?: boolean;
  /** css letter-spacing — 예: "0.08em" (朝鮮日報) */
  tracking?: string;
  /** 특정 char만 색상 */
  accent?: string;
  /** accent를 적용할 char 인덱스 */
  accentChar?: number;
  /** accent 색으로 underline할 char 인덱스 배열 */
  accentUnder?: number[];
  /** accentChar에 채워진 chip 배경을 적용 */
  accentBg?: boolean;
  /** 작은 빨간 깃발 glyph (아시아경제) */
  flag?: boolean;
  /** -0.01em 한글 letter-spacing 비활성 (latin 워드마크용) */
  latin?: boolean;
  /** 16px 대신 14px (긴 latin 이름용) */
  small?: boolean;
};

export type Press = {
  id: string;
  name: string;
  category: CategoryKey;
  wordmark: WordmarkStyle;
};

export type TickerItem = {
  press: string;   // 언론사명 (14/700 ink)
  title: string;   // 헤드라인 (14/500 ink, ellipsis)
};
