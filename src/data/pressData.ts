import type { Press } from '../types/press';

export const mockPressData: Press[] = Array.from({ length: 72 }, (_, i) => ({
  id: `press-${i + 1}`,
  name: i % 2 === 0 ? `언론사 ${i + 1}` : `News ${i + 1}`,
  style: { 
    weight: i % 3 === 0 ? 700 : 500,
    italic: i % 4 === 0,
    color: i % 5 === 0 ? '#326295' : undefined
  },
  articles: {
    editTime: '18:53 편집',
    headline: {
      title: `[속보] 언론사 ${i + 1}의 메인 헤드라인 기사 제목입니다. 조금 길게 작성되어 두 줄로 넘어갈 수도 있습니다.`,
      imageUrl: undefined // 그라디언트 플레이스홀더 사용
    },
    subArticles: [
      `서브 기사 1: 언론사 ${i + 1}의 중요한 소식을 전달합니다.`,
      `서브 기사 2: 최근 이슈가 되고 있는 사건의 전말`,
      `서브 기사 3: 내일부터 날씨가 크게 추워질 전망입니다.`,
      `서브 기사 4: 글로벌 경제 지표, 이번 달 상승세 유지`,
      `서브 기사 5: IT 업계, 새로운 AI 기술 발표로 들썩`,
      `서브 기사 6: 주말 가볼만한 곳 베스트 5 추천`
    ]
  }
}));
