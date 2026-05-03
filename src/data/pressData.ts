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

// 72개의 더미 데이터 생성
export const mockPressData: Press[] = Array.from({ length: 72 }, (_, i) => ({
  id: `press-${i + 1}`,
  name: i % 2 === 0 ? `언론사 ${i + 1}` : `News ${i + 1}`,
  style: { 
    weight: i % 3 === 0 ? 700 : 500,
    italic: i % 4 === 0,
    color: i % 5 === 0 ? '#326295' : undefined
  }
}));
