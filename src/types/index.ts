export type Category =
  | '종합/경제'
  | '방송/통신'
  | 'IT'
  | '스포츠/연예'
  | '매거진/전문지'
  | '지역';

export const CATEGORIES: Category[] = [
  '종합/경제',
  '방송/통신',
  'IT',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
];

export interface Press {
  id: string;
  name: string;
  category: Category;
  editedAt: string;
  headlines: string[];
  mainHeadline: string;
}

export interface TickerItem {
  pressName: string;
  headline: string;
}

export type TabKind = 'all' | 'subscribed';
export type ViewKind = 'grid' | 'list';
