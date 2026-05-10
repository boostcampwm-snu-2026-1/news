import type { PressData } from '../types';

const COLOR = {
  ink: '#14212B',
  blue: '#1F5BBE',
  blueDeep: '#0033A0',
  blueAlt: '#0E63B0',
  blueLight: '#0072BC',
  blueGray: '#3A6FB0',
  red: '#D7263D',
  redOrange: '#E0322E',
  redDeep: '#B81230',
  orange: '#FF8C00',
  yellow: '#F2B500',
  white: '#FFFFFF',
  green: '#3CB371',
  teal: '#1A9FA0',
} as const;

export const PRESSES: PressData[] = [
  /* === Page 1 (1–24) === */
  {
    id: 'p01',
    name: '서울경제',
    wordmark: { name: '서울경제', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p02',
    name: '데일리안',
    wordmark: { name: '데일리안', color: COLOR.ink, weight: 500 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p03',
    name: '헤럴드경제',
    wordmark: { name: '헤럴드경제', color: COLOR.blue, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p04',
    name: 'SBSBiz',
    wordmark: {
      name: 'SBSBiz',
      color: COLOR.blueDeep,
      weight: 700,
      latin: true,
      tracking: '0.04em',
      accent: COLOR.red,
      accentChar: 3,
    },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p05',
    name: '세계일보',
    wordmark: { name: '세계일보', color: COLOR.ink, weight: 500 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p06',
    name: '아시아경제',
    wordmark: { name: '아시아경제', color: COLOR.ink, weight: 700, flag: true },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p07',
    name: '이데일리',
    wordmark: {
      name: '이데일리',
      color: COLOR.white,
      bg: COLOR.red,
      weight: 700,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p08',
    name: '朝鮮日報',
    wordmark: {
      name: '朝鮮日報',
      color: COLOR.ink,
      weight: 700,
      family: 'serif',
      tracking: '0.08em',
      latin: true,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p09',
    name: '아이뉴스24',
    wordmark: {
      name: '아이뉴스24',
      color: COLOR.blueAlt,
      weight: 700,
      accentUnder: [3],
    },
    primaryCategory: 'IT',
  },
  {
    id: 'p10',
    name: '파이낸셜뉴스',
    wordmark: {
      name: '파이낸셜뉴스',
      color: COLOR.ink,
      weight: 700,
      accent: COLOR.blue,
      accentChar: 5,
      accentUnder: [5],
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p11',
    name: '스포츠서울',
    wordmark: {
      name: '스포츠서울',
      color: COLOR.ink,
      weight: 700,
      underline: true,
    },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p12',
    name: '스포츠동아',
    wordmark: { name: '스포츠동아', color: COLOR.ink, weight: 700 },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p13',
    name: '석간문화일보',
    wordmark: {
      name: '석간문화일보',
      color: COLOR.ink,
      weight: 700,
      accent: COLOR.red,
      accentUnder: [2, 3],
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p14',
    name: 'KBSWORLD',
    wordmark: {
      name: 'KBSWORLD',
      color: COLOR.white,
      bg: COLOR.blueLight,
      weight: 700,
      latin: true,
    },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p15',
    name: 'KoreaJoongAng Daily',
    wordmark: {
      name: 'KoreaJoongAng Daily',
      color: COLOR.ink,
      weight: 700,
      family: 'serif',
      italic: true,
      latin: true,
      small: true,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p16',
    name: 'Insight',
    wordmark: {
      name: 'Insight',
      color: COLOR.red,
      weight: 700,
      family: 'serif',
      italic: true,
      latin: true,
    },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p17',
    name: '법률방송뉴스',
    wordmark: { name: '법률방송뉴스', color: COLOR.ink, weight: 700 },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p18',
    name: '시사저널e.',
    wordmark: {
      name: '시사저널e.',
      color: COLOR.red,
      weight: 700,
    },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p19',
    name: '한국농어촌방송',
    wordmark: { name: '한국농어촌방송', color: COLOR.ink, weight: 500 },
    primaryCategory: '지역',
  },
  {
    id: 'p20',
    name: '조이뉴스24',
    wordmark: { name: '조이뉴스24', color: COLOR.ink, weight: 700 },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p21',
    name: '에너지경제',
    wordmark: { name: '에너지경제', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p22',
    name: 'BUSINESSPOST',
    wordmark: {
      name: 'BUSINESSPOST',
      color: COLOR.ink,
      weight: 700,
      latin: true,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p23',
    name: 'CEO스코어데일리',
    wordmark: { name: 'CEO스코어데일리', color: COLOR.blueAlt, weight: 700 },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p24',
    name: 'KNN',
    wordmark: { name: 'KNN', color: COLOR.red, weight: 700, latin: true },
    primaryCategory: '지역',
  },

  /* === Page 2 (25–48) === */
  {
    id: 'p25',
    name: 'The Korea Herald',
    wordmark: {
      name: 'The Korea Herald',
      color: COLOR.blue,
      weight: 700,
      family: 'serif',
      italic: true,
      latin: true,
      small: true,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p26',
    name: 'MBC',
    wordmark: { name: 'MBC', color: COLOR.ink, weight: 700, latin: true },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p27',
    name: '뉴스타파',
    wordmark: { name: '뉴스타파', color: COLOR.ink, weight: 500 },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p28',
    name: 'NewDaily',
    wordmark: {
      name: 'NewDaily',
      color: COLOR.ink,
      weight: 500,
      family: 'serif',
      latin: true,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p29',
    name: '국민일보',
    wordmark: { name: '국민일보', color: COLOR.ink, weight: 500 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p30',
    name: '일간스포츠',
    wordmark: { name: '일간스포츠', color: COLOR.red, weight: 700 },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p31',
    name: '경향신문',
    wordmark: { name: '경향신문', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p32',
    name: 'ZDNET Korea',
    wordmark: {
      name: 'ZDNET Korea',
      color: COLOR.ink,
      weight: 700,
      latin: true,
    },
    primaryCategory: 'IT',
  },
  {
    id: 'p33',
    name: 'mydaily',
    wordmark: {
      name: 'mydaily',
      color: COLOR.red,
      weight: 700,
      family: 'serif',
      italic: true,
      latin: true,
    },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p34',
    name: 'MT머니투데이',
    wordmark: { name: 'MT머니투데이', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p35',
    name: 'SBS',
    wordmark: { name: 'SBS', color: COLOR.blueDeep, weight: 700, latin: true },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p36',
    name: 'OhmyNews',
    wordmark: {
      name: 'OhmyNews',
      color: COLOR.orange,
      weight: 700,
      family: 'serif',
      italic: true,
      latin: true,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p37',
    name: '매일경제',
    wordmark: {
      name: '매일경제',
      color: COLOR.ink,
      weight: 700,
      underline: true,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p38',
    name: 'MBN',
    wordmark: { name: 'MBN', color: COLOR.yellow, weight: 700, latin: true },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p39',
    name: 'YTN',
    wordmark: { name: 'YTN', color: COLOR.ink, weight: 700, latin: true },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p40',
    name: '시사위크',
    wordmark: { name: '시사위크', color: COLOR.blueAlt, weight: 700 },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p41',
    name: 'Digital Today',
    wordmark: {
      name: 'Digital Today',
      color: COLOR.ink,
      weight: 500,
      family: 'serif',
      latin: true,
    },
    primaryCategory: 'IT',
  },
  {
    id: 'p42',
    name: 'dataNews',
    wordmark: {
      name: 'dataNews',
      color: COLOR.red,
      weight: 700,
      family: 'serif',
      italic: true,
      latin: true,
    },
    primaryCategory: 'IT',
  },
  {
    id: 'p43',
    name: '한국대학신문',
    wordmark: {
      name: '한국대학신문',
      color: COLOR.ink,
      weight: 700,
      underline: true,
    },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p44',
    name: '서울파이낸스',
    wordmark: { name: '서울파이낸스', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p45',
    name: '엑스포츠뉴스',
    wordmark: { name: '엑스포츠뉴스', color: COLOR.ink, weight: 700 },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p46',
    name: '맥스무비',
    wordmark: { name: '맥스무비', color: COLOR.ink, weight: 700 },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p47',
    name: 'OBS',
    wordmark: { name: 'OBS', color: COLOR.ink, weight: 700, latin: true },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p48',
    name: '소년한국일보',
    wordmark: { name: '소년한국일보', color: COLOR.blueAlt, weight: 700 },
    primaryCategory: '매거진/전문지',
  },

  /* === Page 3 (49–72) === */
  {
    id: 'p49',
    name: '한겨레',
    wordmark: {
      name: '한겨레',
      color: COLOR.ink,
      weight: 700,
      underline: true,
    },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p50',
    name: '동아일보',
    wordmark: { name: '동아일보', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p51',
    name: '중앙일보',
    wordmark: { name: '중앙일보', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p52',
    name: '한국일보',
    wordmark: { name: '한국일보', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p53',
    name: '노컷뉴스',
    wordmark: { name: '노컷뉴스', color: COLOR.red, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p54',
    name: '머니S',
    wordmark: { name: '머니S', color: COLOR.blueAlt, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p55',
    name: '한국경제TV',
    wordmark: { name: '한국경제TV', color: COLOR.ink, weight: 700 },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p56',
    name: 'KBS',
    wordmark: { name: 'KBS', color: COLOR.blueLight, weight: 700, latin: true },
    primaryCategory: '방송/통신',
  },
  {
    id: 'p57',
    name: '뉴시스',
    wordmark: { name: '뉴시스', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p58',
    name: '뉴스1',
    wordmark: { name: '뉴스1', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p59',
    name: '매경이코노미',
    wordmark: { name: '매경이코노미', color: COLOR.ink, weight: 700 },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p60',
    name: '주간조선',
    wordmark: {
      name: '주간조선',
      color: COLOR.ink,
      weight: 700,
      family: 'serif',
    },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p61',
    name: '시사저널',
    wordmark: { name: '시사저널', color: COLOR.ink, weight: 700 },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p62',
    name: '비즈니스워치',
    wordmark: { name: '비즈니스워치', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p63',
    name: '더벨',
    wordmark: { name: '더벨', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p64',
    name: '데일리한국',
    wordmark: { name: '데일리한국', color: COLOR.ink, weight: 500 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p65',
    name: '디지털타임스',
    wordmark: { name: '디지털타임스', color: COLOR.ink, weight: 700 },
    primaryCategory: 'IT',
  },
  {
    id: 'p66',
    name: '전자신문',
    wordmark: { name: '전자신문', color: COLOR.blueAlt, weight: 700 },
    primaryCategory: 'IT',
  },
  {
    id: 'p67',
    name: '스포츠경향',
    wordmark: { name: '스포츠경향', color: COLOR.ink, weight: 700 },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p68',
    name: '시사인',
    wordmark: { name: '시사인', color: COLOR.ink, weight: 700 },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p69',
    name: '이코노미스트',
    wordmark: {
      name: '이코노미스트',
      color: COLOR.ink,
      weight: 700,
      family: 'serif',
      italic: true,
    },
    primaryCategory: '매거진/전문지',
  },
  {
    id: 'p70',
    name: '파이낸셜리뷰',
    wordmark: { name: '파이낸셜리뷰', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
  {
    id: 'p71',
    name: '헤럴드POP',
    wordmark: { name: '헤럴드POP', color: COLOR.red, weight: 700 },
    primaryCategory: '스포츠/연예',
  },
  {
    id: 'p72',
    name: '머니투데이',
    wordmark: { name: '머니투데이', color: COLOR.ink, weight: 700 },
    primaryCategory: '종합/경제',
  },
];

export const PRESSES_BY_ID: Record<string, PressData> = Object.fromEntries(
  PRESSES.map((p) => [p.id, p]),
);

/* Default subscriptions match PDF frame 1's "8" badge.
 * Frame 3 shows a 9th cell after subscribing one more in frame 2. */
export const DEFAULT_SUBSCRIBED_IDS = [
  'p18', // 시사저널e.
  'p15', // KoreaJoongAng Daily
  'p14', // KBSWORLD
  'p03', // 헤럴드경제
  'p16', // Insight
  'p26', // MBC
  'p49', // 한겨레
  'p04', // SBSBiz
];

export const PAGE_SIZE = 24;
