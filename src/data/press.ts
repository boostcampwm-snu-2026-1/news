export interface PressOutlet {
  id: number;
  name: string;
  category: string;
  wordmark: WordmarkStyle;
}

export interface WordmarkStyle {
  color?: string;
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
}

export const CATEGORIES = [
  '종합/경제',
  '방송/통신',
  'IT',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
] as const;

export type Category = typeof CATEGORIES[number];

export const pressData: PressOutlet[] = [
  // ── Page 1 ──
  { id: 1, name: '서울경제', category: '종합/경제', wordmark: {} },
  { id: 2, name: '데일리안', category: '종합/경제', wordmark: {} },
  { id: 3, name: '헤럴드경제', category: '종합/경제', wordmark: { accent: '#FF0000', accentChar: 0, accentUnder: [0, 1, 2, 3], underline: true } },
  { id: 4, name: 'SBS Biz', category: '방송/통신', wordmark: { weight: 700, latin: true } },
  { id: 5, name: '세계일보', category: '종합/경제', wordmark: {} },
  { id: 6, name: '아시아경제', category: '종합/경제', wordmark: { flag: true } },
  { id: 7, name: '이데일리', category: '종합/경제', wordmark: { color: '#FFFFFF', bg: '#ED1C24', weight: 700 } },
  { id: 8, name: '朝鮮日報', category: '종합/경제', wordmark: { family: 'serif', tracking: '0.08em' } },
  { id: 9, name: '아이뉴스24', category: 'IT', wordmark: { color: '#0066CC', underline: true } },
  { id: 10, name: '파이낸셜뉴스', category: '종합/경제', wordmark: { accent: '#FF0000', accentChar: 5 } },
  { id: 11, name: '스포츠서울', category: '스포츠/연예', wordmark: { underline: true } },
  { id: 12, name: '스포츠동아', category: '스포츠/연예', wordmark: {} },
  { id: 13, name: '석간 문화일보', category: '종합/경제', wordmark: { accent: '#FF0000', accentChar: 3, underline: true } },
  { id: 14, name: 'KBS WORLD', category: '방송/통신', wordmark: { color: '#FFFFFF', bg: '#1A56DB', weight: 700, latin: true } },
  { id: 15, name: 'KoreaJoongAng Daily', category: '종합/경제', wordmark: { small: true, latin: true } },
  { id: 16, name: 'Insight', category: '매거진/전문지', wordmark: { family: 'serif', italic: true, color: '#4362D0', latin: true } },
  { id: 17, name: '법률방송뉴스', category: '매거진/전문지', wordmark: {} },
  { id: 18, name: '시사저널e.', category: '매거진/전문지', wordmark: { color: '#FF0000' } },
  { id: 19, name: '한국농어촌방송', category: '지역', wordmark: {} },
  { id: 20, name: '조이뉴스24', category: 'IT', wordmark: { underline: true } },
  { id: 21, name: '에너지경제', category: '종합/경제', wordmark: {} },
  { id: 22, name: 'BUSINESS POST', category: '종합/경제', wordmark: { weight: 400, tracking: '0.15em', latin: true } },
  { id: 23, name: 'CEO스코어데일리', category: '종합/경제', wordmark: { color: '#FF0000', small: true } },
  { id: 24, name: 'KNN', category: '지역', wordmark: { color: '#FF0000', weight: 700, latin: true } },

  // ── Page 2 ──
  { id: 25, name: 'The Korea Herald', category: '종합/경제', wordmark: { family: 'serif', italic: true, color: '#CC0000', small: true, latin: true } },
  { id: 26, name: 'MBC', category: '방송/통신', wordmark: { weight: 700, tracking: '0.1em', latin: true } },
  { id: 27, name: '뉴스타파', category: '종합/경제', wordmark: {} },
  { id: 28, name: 'NewDaily', category: '종합/경제', wordmark: { weight: 400, latin: true } },
  { id: 29, name: '국민일보', category: '종합/경제', wordmark: {} },
  { id: 30, name: '일간스포츠', category: '스포츠/연예', wordmark: { color: '#FF0000', underline: true } },
  { id: 31, name: '경향신문', category: '종합/경제', wordmark: {} },
  { id: 32, name: 'ZDNET Korea', category: 'IT', wordmark: { weight: 700, latin: true } },
  { id: 33, name: 'mydaily', category: '스포츠/연예', wordmark: { italic: true, color: '#FF0000', latin: true } },
  { id: 34, name: 'MT 머니투데이', category: '종합/경제', wordmark: {} },
  { id: 35, name: 'SBS', category: '방송/통신', wordmark: { color: '#0066CC', weight: 700, latin: true } },
  { id: 36, name: 'OhmyNews', category: '종합/경제', wordmark: { italic: true, color: '#FF0000', latin: true } },
  { id: 37, name: '매일경제', category: '종합/경제', wordmark: { weight: 700 } },
  { id: 38, name: 'MBN', category: '방송/통신', wordmark: { color: '#FF0000', weight: 700, latin: true } },
  { id: 39, name: 'YTN', category: '방송/통신', wordmark: { weight: 700, latin: true } },
  { id: 40, name: '시사위크', category: '매거진/전문지', wordmark: { color: '#FF0000', underline: true } },
  { id: 41, name: 'Digital Today', category: 'IT', wordmark: { weight: 400, latin: true } },
  { id: 42, name: 'dataNews', category: 'IT', wordmark: { italic: true, weight: 700, color: '#FF0000', latin: true } },
  { id: 43, name: '한국대학신문', category: '매거진/전문지', wordmark: {} },
  { id: 44, name: '서울파이낸스', category: '종합/경제', wordmark: {} },
  { id: 45, name: '엑스포츠뉴스', category: '스포츠/연예', wordmark: {} },
  { id: 46, name: '맥스무비', category: '스포츠/연예', wordmark: {} },
  { id: 47, name: 'OBS', category: '방송/통신', wordmark: { weight: 700, latin: true } },
  { id: 48, name: '소년한국일보', category: '매거진/전문지', wordmark: { color: '#FF0000', underline: true } },

  // ── Page 3 ──
  { id: 49, name: '연합뉴스', category: '종합/경제', wordmark: { weight: 700 } },
  { id: 50, name: '한겨레', category: '종합/경제', wordmark: {} },
  { id: 51, name: 'CBS', category: '방송/통신', wordmark: { weight: 700, latin: true } },
  { id: 52, name: '전자신문', category: 'IT', wordmark: {} },
  { id: 53, name: '동아일보', category: '종합/경제', wordmark: { weight: 700 } },
  { id: 54, name: '중앙일보', category: '종합/경제', wordmark: { weight: 700 } },
  { id: 55, name: 'JTBC', category: '방송/통신', wordmark: { weight: 700, latin: true } },
  { id: 56, name: '한국일보', category: '종합/경제', wordmark: {} },
  { id: 57, name: '노컷뉴스', category: '종합/경제', wordmark: {} },
  { id: 58, name: '비즈한국', category: '종합/경제', wordmark: { color: '#FFFFFF', bg: '#333333', weight: 700 } },
  { id: 59, name: 'BBS NEWS', category: '방송/통신', wordmark: { color: '#FFFFFF', bg: '#1A56DB', weight: 700, latin: true } },
  { id: 60, name: '프레시안', category: '종합/경제', wordmark: {} },
  { id: 61, name: '머니S', category: '종합/경제', wordmark: {} },
  { id: 62, name: '뉴시스', category: '종합/경제', wordmark: {} },
  { id: 63, name: '채널A', category: '방송/통신', wordmark: {} },
  { id: 64, name: 'TV조선', category: '방송/통신', wordmark: {} },
  { id: 65, name: '한국경제', category: '종합/경제', wordmark: { weight: 700 } },
  { id: 66, name: '뉴스1', category: '종합/경제', wordmark: {} },
  { id: 67, name: '코리아타임스', category: '종합/경제', wordmark: {} },
  { id: 68, name: '오마이뉴스', category: '종합/경제', wordmark: {} },
  { id: 69, name: '블로터', category: 'IT', wordmark: {} },
  { id: 70, name: '택스워치', category: '종합/경제', wordmark: {} },
  { id: 71, name: '지디넷코리아', category: 'IT', wordmark: {} },
  { id: 72, name: '미디어오늘', category: '매거진/전문지', wordmark: {} },
];

// Ticker mock data
export interface TickerItem {
  pressName: string;
  title: string;
}

export const tickerData: TickerItem[][] = [
  [
    { pressName: '연합뉴스', title: '[속보] 도심 공원 \'조용한 독서존\' 시범 운영… 시민 호응 …' },
    { pressName: '동아일보', title: '정부, 청년 주거 안정 위한 새 임대 모델 발표' },
    { pressName: '한겨레', title: '기후변화 대응 국제회의, 서울서 개최… 30개국 참여' },
    { pressName: '경향신문', title: '수도권 광역급행철도 2단계 노선 확정… 수혜 지역은' },
  ],
  [
    { pressName: '한국경제', title: '중소기업 ESG 전담 인력 채용 확대… 지속 가능성 주목' },
    { pressName: '매일경제', title: 'AI 반도체 수출 호조… 3분기 무역흑자 사상 최대' },
    { pressName: '서울경제', title: '부동산 시장 안정세… 수도권 거래량 회복 조짐' },
    { pressName: '헤럴드경제', title: '원/달러 환율 하락… 외국인 투자 자금 유입 가속' },
  ],
];

// Article mock data for list view
export interface ArticleData {
  headline: string;
  headlineImage?: string;
  articles: string[];
  editTime: string;
}

export const mockArticles: Record<string, ArticleData> = {
  'SBS Biz': {
    headline: '전기요금도 이제 \'알림으로 다독다독\'… 생활관리 습관 확산',
    editTime: '2026.01.14. 18:53 편집',
    articles: [
      '출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다',
      '"기다림이 폭신해졌어요" 동네 버스정류장 의자, 새 단장',
      '데이터 걱정 내려놓기 실험… 통신사, \'마음 편한 요금제\' 선보여',
      '잠들기 전에 보는 조용한 영상 한 편… OTT, 힐링 추천 기능 도입',
      '"길 잃지 않게 도와줄게요" 친절해진 환승 안내 목소리',
      '퇴근 시간 맞춰 환하게 \'찰칵\'… 스마트 조명, 집이 먼저 반겨준다',
    ],
  },
  '아시아경제': {
    headline: '기업, \'워라밸 교육 프로그램\' 자율 도입 확대',
    editTime: '2026.01.14. 19:38 편집',
    articles: [
      '지자체, 소상공인 대상 친절 응대 교육 지원',
      '직장인 스트레스 관리 위한 \'마음건강 상담\' 확대',
      '생활밀착 스타트업, 직장인 대상 서비스 잇단 출시',
      '기업문화 개선 사례 공유 확산… 자발적 참여 놀이',
      '재택·출근 혼합 근무, 중견기업까지 확대 움직임',
      '사내 커뮤니케이션 플랫폼 고도화 추진',
    ],
  },
};
