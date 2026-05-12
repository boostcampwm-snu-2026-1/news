export type NewsstandTab = "all" | "sub";

export type ViewerMode = "grid" | "list";

export type CategoryKey = "politics" | "economy" | "society" | "culture" | "world" | "tech" | "sports";

export type PressWordmark = {
  name: string;
  color?: string;
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
};

export type Press = {
  id: string;
  name: string;
  categoryKeys: CategoryKey[];
  primaryCategoryKey: CategoryKey;
  wordmark: PressWordmark;
};

export type TickerItem = {
  pressName: string;
  title: string;
};

export type Article = {
  id: string;
  pressId: string;
  name: string;
  categoryKey: CategoryKey;
  title: string;
  editedAt: string;
};

export type ArticlesByCategory = Record<CategoryKey, Article[]>;

export type NewsstandState = {
  tab: NewsstandTab;
  viewer: ViewerMode;
  page: number;
  opened: string | null;
  tabKey: CategoryKey;
  progress: number;
  currentInTab: number;
  subscribed: Set<string>;
};
