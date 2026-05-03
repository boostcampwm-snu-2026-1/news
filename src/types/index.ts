export interface Publisher {
  id: string;
  name: string;
  logoUrl: string;
  category: Category;
  description: string;
}

export type Category = '종합' | '경제' | 'IT/과학' | '스포츠' | '방송/연예' | '지역';

export type TabType = 'all' | 'subscribed';
