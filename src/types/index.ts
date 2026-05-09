// 언론사가 실제로 속하는 카테고리 (한 언론사당 1개)
export type PublisherCategory = '종합/경제' | '방송/통신' | 'IT';

// 상단 카테고리 탭 (주요언론사는 isMajor 플래그 기반 가상 카테고리)
export type CategoryTab = '주요언론사' | PublisherCategory;

export const CATEGORY_TABS: CategoryTab[] = [
  '주요언론사',
  '종합/경제',
  '방송/통신',
  'IT',
];

// 상단 세그먼트 토글
export type TabType = 'all' | 'subscribed'; // 전체언론사 / MY뉴스

// 자동슬라이드 속도
export type SlideSpeed = 'slow' | 'normal' | 'fast'; // 30s / 20s / 15s

export const SLIDE_INTERVAL_MS: Record<SlideSpeed, number> = {
  slow: 30_000,
  normal: 20_000,
  fast: 15_000,
};

// ────────────────────────────────────────────────────────────
// 마스터 데이터
// ────────────────────────────────────────────────────────────

export interface Publisher {
  id: string;
  name: string;
  logoUrl: string;
  thumbnailUrl: string;       // 하단 썸네일 띠용 1면 미리보기
  category: PublisherCategory; // 1차 카테고리 (주요언론사 외)
  isMajor: boolean;           // "주요언론사" 탭 노출 여부
  siteUrl: string;
}

// ────────────────────────────────────────────────────────────
// 1면 편성 데이터
// ────────────────────────────────────────────────────────────

export interface Article {
  id: string;
  title: string;
  lead?: string;              // 메인 헤드라인의 리드 문단
  imageUrl?: string;
  url?: string;
}

export interface HotArticle {
  rank: 1 | 2 | 3;
  title: string;
  thumbUrl?: string;
  url?: string;
}

export type FeatureBoxType = 'person' | 'column';

export interface FeatureBox {
  type: FeatureBoxType;
  name: string;               // 인물명 또는 칼럼 제목
  subtitle?: string;          // 직책 / 칼럼니스트
  bullets: string[];          // 3개 권장
  imageUrl?: string;
}

export interface AdBanner {
  imageUrl: string;
  linkUrl: string;
  alt?: string;
}

export interface FrontPage {
  publisherId: string;
  editedAt: string;           // ISO 문자열
  mainArticle: Article;       // 이미지 + 제목 + 리드 필수
  subArticles: Article[];     // 5개 이상 (검증 스크립트로 강제)
  featureBox?: FeatureBox;    // 옵션
  hotArticles: HotArticle[];  // 정확히 3개 (rank 1/2/3)
  adBanner?: AdBanner;
}
