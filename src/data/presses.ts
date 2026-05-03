import type { Press } from '@/types/press';

/**
 * 72개 언론사 mock 데이터.
 * 워드마크 스타일은 week9_proposal.pdf의 frame 01 / 04 모양을 최대한 재현하고,
 * 빈자리는 한국 실제 언론사로 채웠다.
 *
 * 페이지 분할 (디자인 시스템 §7):
 *   page 1 = index 0..23 (frame 01)
 *   page 2 = index 24..47 (frame 04)
 *   page 3 = index 48..71 (filler)
 */
export const PRESSES: Press[] = [
  // ─── page 1 (frame 01) ───────────────────────────────────────
  { id: 'seoul-econ', name: '서울경제', category: 'general', wordmark: { weight: 700 } },
  { id: 'dailian', name: '데일리안', category: 'general', wordmark: {} },
  {
    id: 'herald-econ',
    name: '헤럴드경제',
    category: 'general',
    wordmark: { weight: 700, accent: '#B70F11', accentChar: 0 },
  },
  {
    id: 'sbs-biz',
    name: 'SBSBiz',
    category: 'broadcast',
    wordmark: { weight: 700, latin: true, accent: '#F2A700', accentChar: 5, tracking: '0.04em' },
  },
  { id: 'segye', name: '세계일보', category: 'general', wordmark: { weight: 700 } },
  {
    id: 'asia-econ',
    name: '아시아경제',
    category: 'general',
    wordmark: { weight: 700, flag: true },
  },
  {
    id: 'edaily',
    name: '이데일리',
    category: 'general',
    wordmark: { weight: 700, color: '#FFFFFF', bg: '#E51E25' },
  },
  {
    id: 'chosun',
    name: '朝鮮日報',
    category: 'general',
    wordmark: { weight: 700, family: 'serif', latin: true, tracking: '0.08em' },
  },
  {
    id: 'inews24',
    name: '아이뉴스24',
    category: 'it',
    wordmark: { weight: 700, accent: '#00B7C8', accentChar: 0, accentUnder: [0] },
  },
  {
    id: 'fnnews',
    name: '파이낸셜뉴스',
    category: 'general',
    wordmark: { weight: 700, underline: true },
  },
  {
    id: 'sports-seoul',
    name: '스포츠서울',
    category: 'sports',
    wordmark: { weight: 700, underline: true },
  },
  { id: 'sports-donga', name: '스포츠동아', category: 'sports', wordmark: { weight: 700 } },
  {
    id: 'munhwa-evening',
    name: '석간문화일보',
    category: 'general',
    wordmark: { weight: 700, accent: '#222222', accentUnder: [2, 3, 4] },
  },
  {
    id: 'kbs-world',
    name: 'KBS WORLD',
    category: 'broadcast',
    wordmark: { weight: 700, color: '#FFFFFF', bg: '#1B7CC9', latin: true, small: true },
  },
  {
    id: 'korea-joongang',
    name: 'Korea JoongAng Daily',
    category: 'general',
    wordmark: { weight: 700, family: 'serif', latin: true, small: true },
  },
  {
    id: 'insight',
    name: 'Insight',
    category: 'magazine',
    wordmark: { weight: 700, family: 'serif', italic: true, color: '#C00B23', latin: true },
  },
  { id: 'law-broadcast', name: '법률방송뉴스', category: 'magazine', wordmark: { weight: 700 } },
  {
    id: 'sisajournal-e',
    name: '시사저널e.',
    category: 'magazine',
    wordmark: { weight: 700, color: '#DD3340' },
  },
  { id: 'rural-broadcast', name: '한국농어촌방송', category: 'magazine', wordmark: { weight: 700 } },
  { id: 'joynews24', name: '조이뉴스24', category: 'sports', wordmark: { weight: 700 } },
  { id: 'energy-econ', name: '에너지경제', category: 'general', wordmark: { weight: 700 } },
  {
    id: 'business-post',
    name: 'BUSINESS POST',
    category: 'general',
    wordmark: { weight: 700, family: 'serif', latin: true, small: true, tracking: '0.04em' },
  },
  {
    id: 'ceo-score',
    name: 'CEO스코어데일리',
    category: 'general',
    wordmark: { weight: 700, accent: '#1B7CC9', accentUnder: [0, 1, 2], small: true },
  },
  {
    id: 'knn',
    name: 'KNN',
    category: 'local',
    wordmark: { weight: 700, color: '#C8112B', latin: true },
  },

  // ─── page 2 (frame 04) ───────────────────────────────────────
  {
    id: 'korea-herald',
    name: 'The Korea Herald',
    category: 'general',
    wordmark: {
      weight: 700,
      family: 'serif',
      italic: true,
      color: '#1B7CC9',
      latin: true,
      small: true,
    },
  },
  { id: 'mbc', name: 'MBC', category: 'broadcast', wordmark: { weight: 700, latin: true } },
  { id: 'newstapa', name: '뉴스타파', category: 'broadcast', wordmark: { weight: 700 } },
  { id: 'newdaily', name: 'NewDaily', category: 'general', wordmark: { weight: 700, latin: true } },
  { id: 'kmib', name: '국민일보', category: 'general', wordmark: { weight: 700 } },
  {
    id: 'ilgan-sports',
    name: '일간스포츠',
    category: 'sports',
    wordmark: { weight: 700, color: '#C8112B', underline: true },
  },
  { id: 'khan', name: '경향신문', category: 'general', wordmark: { weight: 700 } },
  { id: 'zdnet-kr', name: 'ZDNET Korea', category: 'it', wordmark: { weight: 700, latin: true } },
  {
    id: 'mydaily',
    name: 'mydaily',
    category: 'sports',
    wordmark: {
      weight: 700,
      family: 'serif',
      italic: true,
      color: '#C8112B',
      latin: true,
      small: true,
    },
  },
  {
    id: 'mt-news',
    name: 'MT머니투데이',
    category: 'general',
    wordmark: { weight: 700, color: '#C8112B' },
  },
  {
    id: 'sbs',
    name: 'SBS',
    category: 'broadcast',
    wordmark: { weight: 700, color: '#1B7CC9', latin: true },
  },
  {
    id: 'ohmynews',
    name: 'OhmyNews',
    category: 'general',
    wordmark: { weight: 700, family: 'serif', italic: true, color: '#E8A20A', latin: true },
  },
  {
    id: 'mk',
    name: '매일경제',
    category: 'general',
    wordmark: { weight: 700, underline: true },
  },
  {
    id: 'mbn',
    name: 'MBN',
    category: 'broadcast',
    wordmark: { weight: 700, color: '#E8A20A', latin: true },
  },
  { id: 'ytn', name: 'YTN', category: 'broadcast', wordmark: { weight: 700, latin: true } },
  {
    id: 'sisaweek',
    name: '시사위크',
    category: 'magazine',
    wordmark: { weight: 700, color: '#1B7CC9' },
  },
  {
    id: 'digital-today',
    name: 'Digital Today',
    category: 'it',
    wordmark: { weight: 700, family: 'serif', latin: true, small: true },
  },
  {
    id: 'datanews',
    name: 'dataNews',
    category: 'it',
    wordmark: {
      weight: 700,
      family: 'serif',
      italic: true,
      color: '#C8112B',
      latin: true,
      small: true,
    },
  },
  { id: 'unn', name: '한국대학신문', category: 'magazine', wordmark: { weight: 700 } },
  { id: 'seoul-finance', name: '서울파이낸스', category: 'general', wordmark: { weight: 700 } },
  { id: 'xportsnews', name: '엑스포츠뉴스', category: 'sports', wordmark: { weight: 700 } },
  { id: 'maxmovie', name: '맥스무비', category: 'sports', wordmark: { weight: 700 } },
  { id: 'obs', name: 'OBS', category: 'broadcast', wordmark: { weight: 700, latin: true } },
  {
    id: 'kid-hankook',
    name: '소년한국일보',
    category: 'magazine',
    wordmark: { weight: 700, color: '#1B7CC9', underline: true },
  },

  // ─── page 3 (filler — 한국 실제 언론사) ─────────────────────────
  { id: 'donga', name: '동아일보', category: 'general', wordmark: { weight: 700 } },
  { id: 'joongang', name: '중앙일보', category: 'general', wordmark: { weight: 700 } },
  { id: 'hankook', name: '한국일보', category: 'general', wordmark: { weight: 700 } },
  { id: 'nocut', name: '노컷뉴스', category: 'broadcast', wordmark: { weight: 700 } },
  { id: 'moneys', name: '머니S', category: 'general', wordmark: { weight: 700 } },
  {
    id: 'channela',
    name: '채널A',
    category: 'broadcast',
    wordmark: { weight: 700, color: '#1B7CC9' },
  },
  { id: 'jtbc', name: 'JTBC', category: 'broadcast', wordmark: { weight: 700, latin: true } },
  {
    id: 'tvchosun',
    name: 'TV조선',
    category: 'broadcast',
    wordmark: { weight: 700, accent: '#1B7CC9', accentUnder: [0, 1] },
  },
  {
    id: 'munhwa',
    name: '문화일보',
    category: 'general',
    wordmark: { weight: 700, family: 'serif' },
  },
  { id: 'dt', name: '디지털타임스', category: 'it', wordmark: { weight: 700 } },
  {
    id: 'etnews',
    name: '전자신문',
    category: 'it',
    wordmark: { weight: 700, color: '#C8112B' },
  },
  { id: 'bizhankook', name: '비즈한국', category: 'general', wordmark: { weight: 700 } },
  { id: 'newsis', name: '뉴시스', category: 'general', wordmark: { weight: 700 } },
  {
    id: 'ajunews',
    name: '아주경제',
    category: 'general',
    wordmark: { weight: 700, flag: true },
  },
  { id: 'mk-econ', name: '매경이코노미', category: 'general', wordmark: { weight: 700 } },
  { id: 'bizwatch', name: '비즈니스워치', category: 'general', wordmark: { weight: 700 } },
  { id: 'labor', name: '노동일보', category: 'magazine', wordmark: { weight: 700 } },
  { id: 'kwnews', name: '강원일보', category: 'local', wordmark: { weight: 700 } },
  { id: 'busan', name: '부산일보', category: 'local', wordmark: { weight: 700 } },
  { id: 'weekly-today', name: '위클리오늘', category: 'magazine', wordmark: { weight: 700 } },
  {
    id: 'hani',
    name: '한겨레',
    category: 'general',
    wordmark: { weight: 700, underline: true },
  },
  { id: 'mediatoday', name: '미디어오늘', category: 'magazine', wordmark: { weight: 700 } },
  { id: 'env', name: '환경일보', category: 'magazine', wordmark: { weight: 700 } },
  {
    id: 'ddaily',
    name: '디지털데일리',
    category: 'it',
    wordmark: { weight: 700, color: '#1B7CC9' },
  },
];

if (PRESSES.length !== 72) {
  throw new Error(`PRESSES must have 72 outlets, got ${PRESSES.length}`);
}

/** 페이지당 셀 수 (디자인 시스템 §7: 6×4 = 24) */
export const CELLS_PER_PAGE = 24;
