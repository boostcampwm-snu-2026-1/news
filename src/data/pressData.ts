export interface PressStyle {
  weight: 400 | 500 | 700;
  italic?: boolean;
  color?: string;
  accent?: {
    charIndex: number;
    color: string;
  };
  flag?: boolean;
}

export interface Press {
  id: string;
  name: string;
  style: PressStyle;
}

export const mockPressData: Press[] = [
  {
    id: '1',
    name: '서울경제',
    style: { weight: 500 }
  },
  {
    id: '2',
    name: '이데일리',
    style: { 
      weight: 700, 
      color: '#FFFFFF',
      accent: { charIndex: 0, color: '#E5145A' } // 첫 글자 배경 강조 느낌
    }
  },
  {
    id: '3',
    name: '朝鮮日報',
    style: { weight: 700, italic: true }
  },
  {
    id: '4',
    name: '아시아경제',
    style: { weight: 500, flag: true } // 빨간 깃발 표시
  },
  {
    id: '5',
    name: 'SBS Biz',
    style: { weight: 700, color: '#326295' }
  }
  // ... 더 많은 데이터를 추가할 수 있습니다.
];
