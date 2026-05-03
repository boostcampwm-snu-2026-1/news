export type PressId = string;

export type CategoryKey =
  | "general-economy"
  | "broadcast-telecom"
  | "it"
  | "sports-entertainment"
  | "magazine-pro"
  | "regional";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  "general-economy": "종합/경제",
  "broadcast-telecom": "방송/통신",
  it: "IT",
  "sports-entertainment": "스포츠/연예",
  "magazine-pro": "매거진/전문지",
  regional: "지역",
};

export const CATEGORY_ORDER: CategoryKey[] = [
  "general-economy",
  "broadcast-telecom",
  "it",
  "sports-entertainment",
  "magazine-pro",
  "regional",
];

/**
 * Wordmark spec — design system §6.5.
 * Each press outlet is a typographic wordmark, not an image.
 */
export interface PressWordmarkSpec {
  name: string;
  color: string;
  bg?: string;
  weight?: 400 | 500 | 700;
  family?: "sans" | "serif";
  italic?: boolean;
  underline?: boolean;
  tracking?: string;
  accent?: string;
  accentChar?: number;
  accentUnder?: number[];
  accentBg?: boolean;
  flag?: boolean;
  latin?: boolean;
  small?: boolean;
}

export interface Press {
  id: PressId;
  wordmark: PressWordmarkSpec;
  primaryCategory: CategoryKey;
  editTime: string;
}

export interface TickerItem {
  pressId: PressId;
  pressName: string;
  title: string;
}

export interface ArticleListItem {
  title: string;
}

export interface CategoryArticles {
  headlineTitle: string;
  items: ArticleListItem[];
  count: number;
}

export interface PressArticles {
  pressId: PressId;
  byCategory: Partial<Record<CategoryKey, CategoryArticles>>;
}

/** Newsstand state — design system §9. */
export interface NewsstandState {
  tab: "all" | "sub";
  page: number;
  opened: PressId | null;
  tabKey: CategoryKey;
  progress: number;
  currentInTab: number;
  subscribed: PressId[];
}
