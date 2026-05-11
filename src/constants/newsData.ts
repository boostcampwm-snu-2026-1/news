import { CategoryData, PressNewsData } from '@/types/news';
import { PRESS_LIST } from './pressData';

export const LISTVIEW_TIMER_DURATION = 6000; // 6초

/**
 * 각 언론사에 맞는 가짜 뉴스 데이터를 생성하는 헬퍼 함수
 */
const createMockNews = (press: typeof PRESS_LIST[0]): PressNewsData => ({
  ...press,
  lastEditTime: '2024.05.10. 14:00',
  mainArticle: {
    title: `${press.name}이 주목한 제미나이 AI의 미래 기술 혁신`,
    thumbnail: "",
    link: "#"
  },
  subArticles: [
    { title: `${press.name} 단독: AI 에이전트 도입으로 생산성 3배 향상`, link: "#" },
    { title: "구글 클라우드, 차세대 제미나이 엔진 통합 발표", link: "#" },
    { title: "멀티모달 AI가 바꾸는 일상... 이제는 음성으로 대화한다", link: "#" },
    { title: "글로벌 IT 리더들이 말하는 AI 보안의 중요성", link: "#" },
    { title: "제미나이 나노, 안드로이드 생태계의 새로운 도약", link: "#" },
    { title: `${press.name} 바로가기`, link: "#" }
  ]
});

/**
 * PRESS_LIST를 기반으로 6개 카테고리에 데이터를 자동 분배
 */
export const CATEGORIES: CategoryData[] = [
  { id: 'total', name: '종합', pressList: [] },
  { id: 'broadcast', name: '방송/IT', pressList: [] },
  { id: 'economy', name: '경제', pressList: [] },
  { id: 'news', name: '인터넷/신문', pressList: [] },
  { id: 'sports', name: '스포츠/연예', pressList: [] },
  { id: 'magazine', name: '매거진/전문지', pressList: [] }
].map(category => {
  const filteredPresses = PRESS_LIST.filter(press => {
    switch (category.id) {
      case 'economy':
        return press.flag === '경제';
      case 'broadcast':
        return press.flag === 'IT' || press.name.includes('TV') || ['MBC', 'KBS', 'SBS', 'JTBC', 'YTN'].includes(press.name);
      case 'sports':
        return press.name.includes('스포츠') || press.name === 'OSEN' || press.name === '스타뉴스';
      case 'magazine':
        return press.name.includes('코리아') || press.name.includes('매거진') || ['포브스', '더블유', '보그', '엘르'].some(n => press.name.includes(n));
      case 'news':
        return press.fontFamily === 'serif' || press.name.includes('신문');
      case 'total':
        // 다른 카테고리에 속하지 않는 경우 종합으로 분류
        return (
          !press.flag && 
          !press.name.includes('스포츠') && 
          !press.name.includes('코리아') && 
          !press.name.includes('신문') &&
          !['한겨레', '아시아경제'].includes(press.name)
        );
      default:
        return false;
    }
  });

  return {
    ...category,
    pressList: filteredPresses.map(createMockNews)
  };
});