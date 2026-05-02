export type PressCategory =
  | "general"
  | "broadcast"
  | "it"
  | "sports"
  | "magazine"
  | "local";

export type WordmarkStyle = {
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

export type PressArticle = {
  id: string;
  title: string;
  category: PressCategory;
};

export type PressCategoryStat = {
  key: PressCategory;
  label: string;
  count: number;
};

export type Press = {
  id: string;
  name: string;
  primaryCategory: PressCategory;
  subscribed: boolean;
  editTime: string;
  wordmark: WordmarkStyle;
  categoryStats: PressCategoryStat[];
  articles: PressArticle[];
};
