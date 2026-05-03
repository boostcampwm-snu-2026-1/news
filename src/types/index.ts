export type Category =
  | '종합/경제'
  | '방송/통신'
  | 'IT'
  | '스포츠/연예'
  | '매거진/전문지'
  | '지역';

export interface OutletStyle {
  color?: string;
  fontStyle?: 'italic' | 'normal';
  fontWeight?: 'bold' | 'normal';
  background?: string;
}

export interface Outlet {
  id: string;
  name: string;
  category: Category;
  style?: OutletStyle;
}

export interface Article {
  outletId: string;
  editedAt: string;
  headlineTitle: string;
  headlineImage?: string;
  items: string[];
}

export interface TickerItem {
  outletName: string;
  headline: string;
}
