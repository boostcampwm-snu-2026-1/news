import type { CategoryKey, PressId } from '../types';

export type ArticleSample = {
  editTime: string;
  headline: string;
  list: string[];
};

const DEFAULT_LIST = [
  "출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다",
  '"기다림이 폭신해졌어요" 동네 버스정류장 의자, 새 단장',
  "데이터 걱정 내려놓기 실험… 통신사, '마음 편한 요금제' 선보여",
  "잠들기 전에 보는 조용한 영상 한 편… OTT, 힐링 추천 기능 도입",
  "\"길 잃지 않게 도와줄게요\" 친절해진 환승 안내 목소리",
  "퇴근 시간 맞춰 환하게 '찰칵'… 스마트 조명, 집이 먼저 반겨준다",
];

const ASIA_LIST = [
  '지자체, 소상공인 대상 친절 응대 교육 지원',
  "직장인 스트레스 관리 위한 '마음건강 상담' 확대",
  '생활밀착 스타트업, 직장인 대상 서비스 잇단 출시',
  '기업문화 개선 사례 공유 확산… 자발적 참여 늘어',
  '재택·출근 혼합 근무, 중견기업까지 확대 움직임',
  '사내 커뮤니케이션 플랫폼 고도화 추진',
];

export const ARTICLES: Record<PressId, Partial<Record<CategoryKey, ArticleSample>>> = {
  p04: {
    '방송/통신': {
      editTime: '2026.01.14. 18:53',
      headline: "전기요금도 이제 '알림으로 다독다독'… 생활관리 습관 확산",
      list: DEFAULT_LIST,
    },
  },
  p06: {
    '종합/경제': {
      editTime: '2026.01.14. 19:38',
      headline: "기업, '워라밸 교육 프로그램' 자율 도입 확대",
      list: ASIA_LIST,
    },
  },
};

export function getArticle(
  pressId: PressId,
  category: CategoryKey,
  pressName: string,
): ArticleSample {
  const fromMap = ARTICLES[pressId]?.[category];
  if (fromMap) return fromMap;
  return {
    editTime: '2026.01.14. 18:00',
    headline: `${pressName} ${category} 분야 오늘의 주요 소식`,
    list: DEFAULT_LIST,
  };
}
