import type {
  Article,
  CategoryMeta,
  Publisher,
  PublisherCategory,
  TickerItem,
  WordmarkStyle,
} from '../types/newsStand.js'

interface PublisherSeed {
  id: string
  name: string
  category: PublisherCategory
  wordmark: WordmarkStyle
  editedAt: string
}

export const CATEGORIES = [
  { key: 'general-economy', label: '종합/경제' },
  { key: 'broadcast-telecom', label: '방송/통신' },
  { key: 'it-science', label: 'IT/과학' },
  { key: 'sports-entertainment', label: '스포츠/연예' },
  { key: 'magazine-specialty', label: '매거진/전문지' },
  { key: 'local', label: '지역' },
] as const satisfies readonly CategoryMeta[]

const publisherSeeds = [
  {
    id: 'yonhap',
    name: '연합뉴스',
    category: 'general-economy',
    wordmark: { color: '#14212B', weight: 700, accent: '#7890E7', accentChar: 0 },
    editedAt: '2026. 04. 30. 18:50 편집',
  },
  {
    id: 'hankyung',
    name: '한국경제',
    category: 'general-economy',
    wordmark: { color: '#1F2933', weight: 700, tracking: '-0.03em' },
    editedAt: '2026. 04. 30. 18:42 편집',
  },
  {
    id: 'maekyung',
    name: '매일경제',
    category: 'general-economy',
    wordmark: { color: '#263238', family: 'serif', weight: 700 },
    editedAt: '2026. 04. 30. 18:37 편집',
  },
  {
    id: 'sedaily',
    name: '서울경제',
    category: 'general-economy',
    wordmark: { color: '#14212B', underline: true, weight: 700 },
    editedAt: '2026. 04. 30. 18:33 편집',
  },
  {
    id: 'asiae',
    name: '아시아경제',
    category: 'general-economy',
    wordmark: { color: '#32465A', weight: 500, accent: '#7890E7', accentUnder: [0, 1] },
    editedAt: '2026. 04. 30. 18:38 편집',
  },
  {
    id: 'edaily',
    name: '이데일리',
    category: 'general-economy',
    wordmark: { color: '#14212B', italic: true, weight: 500 },
    editedAt: '2026. 04. 30. 18:29 편집',
  },
  {
    id: 'mt',
    name: '머니투데이',
    category: 'general-economy',
    wordmark: { color: '#1E3A5F', weight: 700, tracking: '0.02em' },
    editedAt: '2026. 04. 30. 18:24 편집',
  },
  {
    id: 'fnnews',
    name: '파이낸셜뉴스',
    category: 'general-economy',
    wordmark: { color: '#14212B', small: true, accent: '#4362D0', accentChar: 0 },
    editedAt: '2026. 04. 30. 18:20 편집',
  },
  {
    id: 'sbsbiz',
    name: 'SBS Biz',
    category: 'broadcast-telecom',
    wordmark: { color: '#14212B', weight: 700, latin: true, tracking: '0.01em' },
    editedAt: '2026. 04. 30. 18:53 편집',
  },
  {
    id: 'kbsworld',
    name: 'KBS WORLD',
    category: 'broadcast-telecom',
    wordmark: { color: '#FFFFFF', backgroundColor: '#14212B', weight: 700, latin: true, small: true },
    editedAt: '2026. 04. 30. 18:47 편집',
  },
  {
    id: 'ytn',
    name: 'YTN',
    category: 'broadcast-telecom',
    wordmark: { color: '#174EA6', weight: 700, latin: true, tracking: '0.08em' },
    editedAt: '2026. 04. 30. 18:39 편집',
  },
  {
    id: 'mbc',
    name: 'MBC',
    category: 'broadcast-telecom',
    wordmark: { color: '#14212B', weight: 700, latin: true, accent: '#7890E7', accentChar: 1 },
    editedAt: '2026. 04. 30. 18:31 편집',
  },
  {
    id: 'jtbc',
    name: 'JTBC',
    category: 'broadcast-telecom',
    wordmark: { color: '#2D3748', weight: 700, latin: true, tracking: '0.04em' },
    editedAt: '2026. 04. 30. 18:28 편집',
  },
  {
    id: 'channel-a',
    name: '채널A',
    category: 'broadcast-telecom',
    wordmark: { color: '#14212B', weight: 700, accent: '#7890E7', accentChar: 2 },
    editedAt: '2026. 04. 30. 18:22 편집',
  },
  {
    id: 'tvchosun',
    name: 'TV조선',
    category: 'broadcast-telecom',
    wordmark: { color: '#14212B', weight: 500, latin: true, underline: true },
    editedAt: '2026. 04. 30. 18:18 편집',
  },
  {
    id: 'yonhap-tv',
    name: '연합뉴스TV',
    category: 'broadcast-telecom',
    wordmark: { color: '#1E3A5F', weight: 700, small: true },
    editedAt: '2026. 04. 30. 18:14 편집',
  },
  {
    id: 'etnews',
    name: '전자신문',
    category: 'it-science',
    wordmark: { color: '#14212B', weight: 700, tracking: '-0.02em' },
    editedAt: '2026. 04. 30. 18:45 편집',
  },
  {
    id: 'zdnet-korea',
    name: 'ZDNet Korea',
    category: 'it-science',
    wordmark: { color: '#14212B', weight: 700, latin: true, small: true, accent: '#7890E7', accentChar: 2 },
    editedAt: '2026. 04. 30. 18:41 편집',
  },
  {
    id: 'digital-daily',
    name: '디지털데일리',
    category: 'it-science',
    wordmark: { color: '#2F4858', weight: 500, small: true },
    editedAt: '2026. 04. 30. 18:35 편집',
  },
  {
    id: 'bloter',
    name: '블로터',
    category: 'it-science',
    wordmark: { color: '#14212B', weight: 700, italic: true },
    editedAt: '2026. 04. 30. 18:26 편집',
  },
  {
    id: 'it-chosun',
    name: 'IT조선',
    category: 'it-science',
    wordmark: { color: '#14212B', weight: 700, latin: true, accent: '#4362D0', accentChar: 0 },
    editedAt: '2026. 04. 30. 18:21 편집',
  },
  {
    id: 'techm',
    name: '테크M',
    category: 'it-science',
    wordmark: { color: '#FFFFFF', backgroundColor: '#4362D0', weight: 700 },
    editedAt: '2026. 04. 30. 18:16 편집',
  },
  {
    id: 'aitimes',
    name: 'AI타임스',
    category: 'it-science',
    wordmark: { color: '#14212B', weight: 700, latin: true, tracking: '0.04em' },
    editedAt: '2026. 04. 30. 18:10 편집',
  },
  {
    id: 'science-times',
    name: '사이언스타임즈',
    category: 'it-science',
    wordmark: { color: '#5F6E76', family: 'serif', weight: 700, small: true },
    editedAt: '2026. 04. 30. 18:05 편집',
  },
  {
    id: 'sports-seoul',
    name: '스포츠서울',
    category: 'sports-entertainment',
    wordmark: { color: '#14212B', weight: 700, italic: true },
    editedAt: '2026. 04. 30. 18:48 편집',
  },
  {
    id: 'sports-donga',
    name: '스포츠동아',
    category: 'sports-entertainment',
    wordmark: { color: '#14212B', weight: 500, accent: '#7890E7', accentChar: 3 },
    editedAt: '2026. 04. 30. 18:43 편집',
  },
  {
    id: 'isplus',
    name: '일간스포츠',
    category: 'sports-entertainment',
    wordmark: { color: '#2D3748', family: 'serif', weight: 700 },
    editedAt: '2026. 04. 30. 18:36 편집',
  },
  {
    id: 'osen',
    name: 'OSEN',
    category: 'sports-entertainment',
    wordmark: { color: '#14212B', weight: 700, latin: true, tracking: '0.12em' },
    editedAt: '2026. 04. 30. 18:27 편집',
  },
  {
    id: 'starnews',
    name: '스타뉴스',
    category: 'sports-entertainment',
    wordmark: { color: '#14212B', weight: 700, flag: true },
    editedAt: '2026. 04. 30. 18:19 편집',
  },
  {
    id: 'xportsnews',
    name: '엑스포츠뉴스',
    category: 'sports-entertainment',
    wordmark: { color: '#1E3A5F', weight: 500, small: true },
    editedAt: '2026. 04. 30. 18:12 편집',
  },
  {
    id: 'spotvnews',
    name: '스포티비뉴스',
    category: 'sports-entertainment',
    wordmark: { color: '#14212B', weight: 700, small: true, underline: true },
    editedAt: '2026. 04. 30. 18:07 편집',
  },
  {
    id: 'mk-sports',
    name: 'MK스포츠',
    category: 'sports-entertainment',
    wordmark: { color: '#14212B', weight: 700, latin: true, accent: '#7890E7', accentChar: 1 },
    editedAt: '2026. 04. 30. 18:01 편집',
  },
  {
    id: 'sisajournal-e',
    name: '시사저널e',
    category: 'magazine-specialty',
    wordmark: { color: '#14212B', family: 'serif', weight: 700 },
    editedAt: '2026. 04. 30. 18:46 편집',
  },
  {
    id: 'weekly-chosun',
    name: '주간조선',
    category: 'magazine-specialty',
    wordmark: { color: '#14212B', weight: 700, underline: true },
    editedAt: '2026. 04. 30. 18:40 편집',
  },
  {
    id: 'hani21',
    name: '한겨레21',
    category: 'magazine-specialty',
    wordmark: { color: '#5F6E76', weight: 700, accent: '#7890E7', accentChar: 3 },
    editedAt: '2026. 04. 30. 18:34 편집',
  },
  {
    id: 'monthly-joongang',
    name: '월간중앙',
    category: 'magazine-specialty',
    wordmark: { color: '#2D3748', family: 'serif', weight: 700 },
    editedAt: '2026. 04. 30. 18:30 편집',
  },
  {
    id: 'forbes-korea',
    name: 'Forbes Korea',
    category: 'magazine-specialty',
    wordmark: { color: '#14212B', family: 'serif', weight: 700, latin: true, small: true },
    editedAt: '2026. 04. 30. 18:25 편집',
  },
  {
    id: 'mk-economy',
    name: '매경이코노미',
    category: 'magazine-specialty',
    wordmark: { color: '#14212B', weight: 500, small: true },
    editedAt: '2026. 04. 30. 18:17 편집',
  },
  {
    id: 'economist',
    name: '이코노미스트',
    category: 'magazine-specialty',
    wordmark: { color: '#14212B', family: 'serif', weight: 700, small: true },
    editedAt: '2026. 04. 30. 18:09 편집',
  },
  {
    id: 'scoop',
    name: '더스쿠프',
    category: 'magazine-specialty',
    wordmark: { color: '#FFFFFF', backgroundColor: '#14212B', weight: 700 },
    editedAt: '2026. 04. 30. 18:02 편집',
  },
  {
    id: 'kgnews',
    name: '경기일보',
    category: 'local',
    wordmark: { color: '#14212B', weight: 700 },
    editedAt: '2026. 04. 30. 18:44 편집',
  },
  {
    id: 'busan',
    name: '부산일보',
    category: 'local',
    wordmark: { color: '#14212B', family: 'serif', weight: 700 },
    editedAt: '2026. 04. 30. 18:32 편집',
  },
  {
    id: 'idaegu',
    name: '대구신문',
    category: 'local',
    wordmark: { color: '#2D3748', weight: 500, underline: true },
    editedAt: '2026. 04. 30. 18:23 편집',
  },
  {
    id: 'jejunews',
    name: '제주일보',
    category: 'local',
    wordmark: { color: '#14212B', weight: 700, accent: '#7890E7', accentChar: 0 },
    editedAt: '2026. 04. 30. 18:15 편집',
  },
  {
    id: 'kwnews',
    name: '강원일보',
    category: 'local',
    wordmark: { color: '#14212B', family: 'serif', weight: 700 },
    editedAt: '2026. 04. 30. 18:08 편집',
  },
  {
    id: 'jnilbo',
    name: '전남일보',
    category: 'local',
    wordmark: { color: '#1E3A5F', weight: 700 },
    editedAt: '2026. 04. 30. 18:03 편집',
  },
  {
    id: 'cctoday',
    name: '충청투데이',
    category: 'local',
    wordmark: { color: '#14212B', weight: 500, small: true },
    editedAt: '2026. 04. 30. 17:58 편집',
  },
  {
    id: 'knnews',
    name: '경남신문',
    category: 'local',
    wordmark: { color: '#14212B', weight: 700, flag: true },
    editedAt: '2026. 04. 30. 17:52 편집',
  },
] as const satisfies readonly PublisherSeed[]

const articleTemplates = [
  '{publisher}, 생활밀착형 뉴스 큐레이션 강화',
  '출근길 독자가 많이 본 오늘의 주요 이슈',
  '지역과 산업 현장을 잇는 새 기획 코너 공개',
  '데이터로 보는 주간 변화와 소비자 반응',
  '편집국이 고른 오후 브리핑 핵심 키워드',
  '내일 아침 업데이트될 주요 일정 미리보기',
] as const

const createArticles = (publisherId: string, publisherName: string): readonly Article[] =>
  articleTemplates.map((template, index) => ({
    id: `${publisherId}-article-${index + 1}`,
    title: template.replace('{publisher}', publisherName),
    isLead: index === 0,
  }))

export const SEEDED_PUBLISHERS: readonly Publisher[] = publisherSeeds.map((publisher) => ({
  ...publisher,
  articles: createArticles(publisher.id, publisher.name),
}))

export function createTickerItems(
  publishers: readonly Publisher[],
): readonly TickerItem[] {
  return publishers.slice(0, 8).map((publisher, index) => ({
    id: `ticker-${index + 1}`,
    publisherId: publisher.id,
    publisherName: publisher.name,
    headline: publisher.articles[0]?.title ?? `${publisher.name} 주요 뉴스 업데이트`,
  }))
}
