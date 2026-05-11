import type { Outlet, Category } from '../types';

export const outlets: Outlet[] = [
  // 페이지 1
  { id: 'seoul-economy', name: '서울경제', category: '종합/경제' },
  { id: 'dailian', name: '데일리안', category: '종합/경제' },
  { id: 'herald', name: '헤럴드경제', category: '종합/경제', style: { color: '#d62c2c' } },
  { id: 'sbs-biz', name: 'SBS Biz', category: '방송/통신', style: { color: '#e8003d', fontWeight: 'bold' } },
  { id: 'segye', name: '세계일보', category: '종합/경제' },
  { id: 'asia-economy', name: '아시아경제', category: '종합/경제' },
  { id: 'edaily', name: '이데일리', category: '종합/경제', style: { color: '#003087' } },
  { id: 'chosun', name: '朝鮮日報', category: '종합/경제', style: { fontWeight: 'bold' } },
  { id: 'inews24', name: '아이뉴스24', category: 'IT' },
  { id: 'financial-news', name: '파이낸셜뉴스', category: '종합/경제' },
  { id: 'sports-seoul', name: '스포츠서울', category: '스포츠/연예', style: { color: '#e8003d' } },
  { id: 'sports-donga', name: '스포츠동아', category: '스포츠/연예' },
  { id: 'munhwa', name: '석간문화일보', category: '종합/경제' },
  { id: 'kbs-world', name: 'KBS WORLD', category: '방송/통신', style: { color: '#ffffff', background: '#0068c8', fontWeight: 'bold' } },
  { id: 'joongang-daily', name: 'Korea JoongAng Daily', category: '종합/경제', style: { color: '#c00000', fontStyle: 'italic' } },
  { id: 'insight', name: 'Insight', category: '매거진/전문지', style: { color: '#ff5722', fontWeight: 'bold' } },
  { id: 'law-news', name: '법률방송뉴스', category: '방송/통신' },
  { id: 'sisajournal-e', name: '시사저널e.', category: '매거진/전문지' },
  { id: 'business-post', name: 'BUSINESS POST', category: '종합/경제', style: { fontWeight: 'bold' } },
  { id: 'ceo-score', name: 'CEO스코어데일리', category: '종합/경제' },
  { id: 'farmer-tv', name: '한국농어촌방송', category: '방송/통신' },
  { id: 'joynews24', name: '조이뉴스24', category: '스포츠/연예' },
  { id: 'energy-economy', name: '에너지경제', category: '종합/경제' },
  { id: 'knn', name: 'KNN', category: '방송/통신', style: { color: '#003087', fontWeight: 'bold' } },

  // 페이지 2
  { id: 'korea-herald', name: 'The Korea Herald', category: '종합/경제', style: { fontStyle: 'italic' } },
  { id: 'mbc', name: 'MBC', category: '방송/통신', style: { color: '#003087', fontWeight: 'bold' } },
  { id: 'newstapa', name: '뉴스타파', category: '종합/경제', style: { color: '#2d2d2d', fontWeight: 'bold' } },
  { id: 'newdaily', name: 'NewDaily', category: '종합/경제', style: { color: '#c00000' } },
  { id: 'kukmin', name: '국민일보', category: '종합/경제' },
  { id: 'ilgan-sports', name: '일간스포츠', category: '스포츠/연예' },
  { id: 'kyunghyang', name: '경향신문', category: '종합/경제', style: { color: '#003087' } },
  { id: 'zdnet-korea', name: 'ZDNET Korea', category: 'IT', style: { color: '#e8003d' } },
  { id: 'mydaily', name: 'mydaily', category: '스포츠/연예', style: { fontStyle: 'italic' } },
  { id: 'mt-money', name: 'MT 머니투데이', category: '종합/경제', style: { color: '#d62c2c' } },
  { id: 'sbs', name: 'SBS', category: '방송/통신', style: { color: '#e8003d', fontWeight: 'bold' } },
  { id: 'ohmynews', name: 'OhmyNews', category: '종합/경제', style: { color: '#0068c8' } },
  { id: 'maeil-economy', name: '매일경제', category: '종합/경제', style: { color: '#003087', fontWeight: 'bold' } },
  { id: 'mbn', name: 'MBN', category: '방송/통신', style: { color: '#e8003d' } },
  { id: 'ytn', name: 'YTN', category: '방송/통신', style: { color: '#003087', fontWeight: 'bold' } },
  { id: 'sisaweek', name: '시사위크', category: '매거진/전문지' },
  { id: 'digital-today', name: 'Digital Today', category: 'IT' },
  { id: 'datanews', name: 'dataNews', category: 'IT', style: { fontStyle: 'italic' } },
  { id: 'university-news', name: '한국대학신문', category: '매거진/전문지' },
  { id: 'seoul-finance', name: '서울파이낸스', category: '종합/경제' },
  { id: 'xports', name: '엑스포츠뉴스', category: '스포츠/연예' },
  { id: 'maxmovie', name: '맥스무비', category: '스포츠/연예' },
  { id: 'obs', name: 'OBS', category: '방송/통신' },
  { id: 'children-news', name: '소년한국일보', category: '매거진/전문지' },
];

export const OUTLETS_PER_PAGE = 24;

export function getOutletsByPage(page: number): Outlet[] {
  const start = (page - 1) * OUTLETS_PER_PAGE;
  return outlets.slice(start, start + OUTLETS_PER_PAGE);
}

export function getTotalPages(): number {
  return Math.ceil(outlets.length / OUTLETS_PER_PAGE);
}

export function getSubscribedOutlets(subscribedIds: Set<string>): Outlet[] {
  return outlets.filter(o => subscribedIds.has(o.id));
}

export function getOutletsByCategory(category: Category): Outlet[] {
  return outlets.filter(o => o.category === category);
}

export function getSubscribedOutletsByPage(subscribedIds: Set<string>, page: number): Outlet[] {
  const all = outlets.filter(o => subscribedIds.has(o.id));
  const start = (page - 1) * OUTLETS_PER_PAGE;
  return all.slice(start, start + OUTLETS_PER_PAGE);
}

export function getSubscribedTotalPages(subscribedIds: Set<string>): number {
  return Math.max(1, Math.ceil(subscribedIds.size / OUTLETS_PER_PAGE));
}
