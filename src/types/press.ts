export interface PressStyle {
  weight: number | string;
  italic?: boolean;
  color?: string;
  accent?: {
    charIndex: number;
    color: string;
  };
  flag?: boolean;
}

export interface PressArticle {
  editTime: string;
  headline: {
    title: string;
    imageUrl?: string;
  };
  subArticles: string[];
}

export interface Press {
  id: string;
  name: string;
  style: PressStyle;
  articles?: PressArticle;
}
