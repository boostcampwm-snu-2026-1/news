export type CategoryKey =
  | '종합/경제'
  | '방송/통신'
  | 'IT'
  | '스포츠/연예'
  | '매거진/전문지'
  | '지역';

export type WordmarkProps = {
  name: string;
  color: string;
  bg?: string;
  weight?: 400 | 500 | 700;
  family?: 'sans' | 'serif';
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

export type PressId = string;

export type PressData = {
  id: PressId;
  name: string;
  wordmark: WordmarkProps;
  primaryCategory: CategoryKey;
};

export type Tab = 'all' | 'sub';
export type Viewer = 'grid' | 'list';

export type TickerItem = {
  press: string;
  title: string;
};

export type AppState = {
  tab: Tab;
  viewer: Viewer;
  page: number;
  opened: PressId | null;
  tabKey: CategoryKey;
  progress: number;
  currentInTab: number;
  subscribed: Set<PressId>;
};
