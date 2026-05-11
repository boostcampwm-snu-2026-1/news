export interface Press {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export interface PressDetail extends Press {
  date: string;
  headline: {
    title: string;
    imageUrl: string;
  };
  articles: string[];
}

export const CATEGORIES = ['종합/경제', '방송/통신', 'IT', '스포츠/연예', '매거진/전문지', '지역'];

// 96 Press items (Grid view supports 4 pages of 24)
export const MOCK_PRESS_LIST: Press[] = Array.from({ length: 96 }).map((_, i) => ({
  id: `press_${i + 1}`,
  name: `언론사 ${i + 1}`,
  logo: '',
  category: CATEGORIES[i % CATEGORIES.length],
}));

// Generates detail mock data dynamically based on the pressId
export const generateMockPressDetail = (pressId: string): PressDetail => {
  const press = MOCK_PRESS_LIST.find(p => p.id === pressId) || MOCK_PRESS_LIST[0];
  
  return {
    ...press,
    date: '2023. 02. 10. 18:53 편집',
    headline: {
      title: `[${press.name}] 동네 소아과도 안심 못한다… 영유아 접종, 이젠 맞을 수 있을까?`,
      imageUrl: 'https://via.placeholder.com/400x200/F5F7F9/5F6E76?text=Headline+Image'
    },
    articles: [
      `${press.name} 주요 뉴스 1이 들어갈 자리입니다.`,
      `${press.name} 주요 뉴스 2가 들어갈 자리입니다.`,
      `${press.name} 주요 뉴스 3이 들어갈 자리입니다.`,
      `${press.name} 주요 뉴스 4가 들어갈 자리입니다.`,
      `${press.name} 주요 뉴스 5가 들어갈 자리입니다.`,
      `${press.name} 주요 뉴스 6이 들어갈 자리입니다.`
    ]
  };
};
