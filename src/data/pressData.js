export const PRESS_PAGE_SIZE = 24
export const PRESS_TOTAL_PAGES = 3

export const PRESS_CATEGORIES = [
  '종합/경제',
  '방송/통신',
  '스포츠/연예',
  'IT/과학',
  '매거진/전문지',
  '지역',
]

const ink = 'var(--color-ink)'
const red = '#d92d20'
const blue = '#2563eb'
const green = '#16803c'

function createPress({
  id,
  name,
  category = '종합/경제',
  label = name,
  color = ink,
  weight = 500,
  family = 'sans',
  italic = false,
  tracking = '0',
  background = 'transparent',
  underline = false,
  compact = false,
}) {
  return {
    id,
    name,
    category,
    wordmark: {
      label,
      color,
      weight,
      family,
      italic,
      tracking,
      background,
      underline,
      compact,
    },
  }
}

export const PRESS_DATA = [
  createPress({ id: 'seoul-econ', name: '서울경제' }),
  createPress({ id: 'daily-an', name: '데일리안' }),
  createPress({ id: 'herald-econ', name: '헤럴드경제' }),
  createPress({ id: 'sbs-biz', name: 'SBS Biz', category: '방송/통신', weight: 700 }),
  createPress({ id: 'segye-daily', name: '세계일보' }),
  createPress({ id: 'asiae-econ', name: '아시아경제' }),
  createPress({ id: 'edaily', name: '이데일리', color: red, weight: 700 }),
  createPress({ id: 'chosun', name: '조선일보', label: '朝鮮日報', family: 'serif' }),
  createPress({ id: 'inews24', name: '아이뉴스24', color: blue, weight: 700 }),
  createPress({ id: 'financial-news', name: '파이낸셜뉴스' }),
  createPress({ id: 'sports-seoul', name: '스포츠서울', category: '스포츠/연예' }),
  createPress({ id: 'sports-donga', name: '스포츠동아', category: '스포츠/연예' }),
  createPress({ id: 'munhwa-ilbo', name: '문화일보', category: '매거진/전문지' }),
  createPress({ id: 'kbs-world', name: 'KBS WORLD', category: '방송/통신', color: '#ffffff', background: blue, weight: 700, tracking: '0.08em' }),
  createPress({ id: 'korea-joongang', name: 'Korea JoongAng Daily', family: 'serif', compact: true }),
  createPress({ id: 'insight', name: 'Insight', category: '매거진/전문지', color: red, family: 'serif', italic: true }),
  createPress({ id: 'law-tv-news', name: '법률방송뉴스', category: '지역' }),
  createPress({ id: 'sisajournal-e', name: '시사저널e', category: '매거진/전문지', color: red, compact: true }),
  createPress({ id: 'korean-farm', name: '한국농어촌방송', category: '지역', compact: true }),
  createPress({ id: 'joynews24', name: '조이뉴스24' }),
  createPress({ id: 'energy-econ', name: '에너지경제' }),
  createPress({ id: 'businesspost', name: 'BUSINESSPOST', weight: 700, tracking: '0.06em' }),
  createPress({ id: 'ceo-score', name: 'CEO스코어데일리', compact: true }),
  createPress({ id: 'knn', name: 'KNN', category: '방송/통신', weight: 700, tracking: '0.08em' }),

  createPress({ id: 'korea-herald', name: 'The Korea Herald', color: blue, family: 'serif', compact: true }),
  createPress({ id: 'mbc-news', name: 'MBC', category: '방송/통신', weight: 700, tracking: '0.08em' }),
  createPress({ id: 'newstapa', name: '뉴스타파', weight: 700 }),
  createPress({ id: 'newdaily', name: 'NewDaily' }),
  createPress({ id: 'kookmin-ilbo', name: '국민일보' }),
  createPress({ id: 'ilgan-sports', name: '일간스포츠', category: '스포츠/연예' }),
  createPress({ id: 'kyunghyang', name: '경향신문' }),
  createPress({ id: 'zdnet-korea', name: 'ZDNET Korea', weight: 700 }),
  createPress({ id: 'mydaily', name: 'mydaily', category: '스포츠/연예', color: red, italic: true }),
  createPress({ id: 'moneytoday', name: '머니투데이', weight: 700 }),
  createPress({ id: 'sbs-news', name: 'SBS', category: '방송/통신', weight: 700, tracking: '0.08em' }),
  createPress({ id: 'ohmynews', name: 'OhmyNews', color: red }),
  createPress({ id: 'maeil-econ', name: '매일경제' }),
  createPress({ id: 'mbn', name: 'MBN', category: '방송/통신', weight: 700, tracking: '0.08em' }),
  createPress({ id: 'ytn', name: 'YTN', category: '방송/통신', weight: 700, tracking: '0.08em' }),
  createPress({ id: 'sisaweek', name: '시사위크', category: '매거진/전문지' }),
  createPress({ id: 'digitaltoday', name: 'DigitalToday', weight: 700 }),
  createPress({ id: 'datanews', name: 'dataNews', color: red, italic: true }),
  createPress({ id: 'unn', name: '한국대학신문', category: '지역' }),
  createPress({ id: 'seoul-finance', name: '서울파이낸스' }),
  createPress({ id: 'xportsnews', name: '엑스포츠뉴스', category: '스포츠/연예' }),
  createPress({ id: 'maxmovie', name: '맥스무비', category: '스포츠/연예' }),
  createPress({ id: 'obs', name: 'OBS', category: '방송/통신', weight: 700, tracking: '0.08em' }),
  createPress({ id: 'sonyun-korea', name: '소년한국일보', category: '지역' }),

  createPress({ id: 'yonhap-news', name: '연합뉴스', category: '방송/통신', weight: 700 }),
  createPress({ id: 'hankyoreh', name: '한겨레', family: 'serif', weight: 700 }),
  createPress({ id: 'joongang-ilbo', name: '중앙일보', weight: 700 }),
  createPress({ id: 'donga-ilbo', name: '동아일보', family: 'serif' }),
  createPress({ id: 'hani-business', name: '한겨레경제사회연구원', category: '매거진/전문지', compact: true }),
  createPress({ id: 'kbs-news', name: 'KBS', category: '방송/통신', color: '#ffffff', background: '#1f4ed8', weight: 700, tracking: '0.08em' }),
  createPress({ id: 'jtbc-news', name: 'JTBC', category: '방송/통신', color: '#ffffff', background: '#334155', weight: 700, tracking: '0.08em' }),
  createPress({ id: 'channel-a', name: '채널A', category: '방송/통신', weight: 700 }),
  createPress({ id: 'tv-chosun', name: 'TV조선', category: '방송/통신', weight: 700 }),
  createPress({ id: 'khan-sports', name: '스포츠경향', category: '스포츠/연예' }),
  createPress({ id: 'osen', name: 'OSEN', category: '스포츠/연예', weight: 700, tracking: '0.08em' }),
  createPress({ id: 'starnews', name: '스타뉴스', category: '스포츠/연예', color: red }),
  createPress({ id: 'tenasia', name: '텐아시아', category: '스포츠/연예' }),
  createPress({ id: 'etnews', name: '전자신문', weight: 700 }),
  createPress({ id: 'bloter', name: '블로터', category: '매거진/전문지', color: blue }),
  createPress({ id: 'byline-network', name: '바이라인네트워크', category: '매거진/전문지', compact: true }),
  createPress({ id: 'weekly-donga', name: '주간동아', category: '매거진/전문지' }),
  createPress({ id: 'economist', name: '이코노미스트', category: '매거진/전문지', family: 'serif' }),
  createPress({ id: 'busan-ilbo', name: '부산일보', category: '지역' }),
  createPress({ id: 'daejeon-ilbo', name: '대전일보', category: '지역' }),
  createPress({ id: 'gwangju-daily', name: '광주일보', category: '지역' }),
  createPress({ id: 'jeju-sori', name: '제주의소리', category: '지역', color: green }),
  createPress({ id: 'kado', name: '강원도민일보', category: '지역' }),
  createPress({ id: 'imaeil', name: '매일신문', category: '지역' }),
]

const CATEGORY_ARTICLE_TEMPLATES = {
  '종합/경제': [
    '정책 변화가 시장에 미치는 영향 점검',
    '주요 기업 실적과 투자 흐름 분석',
    '생활 물가 지표로 보는 이번 주 경제',
    '금융권 디지털 전환 속도 비교',
  ],
  '방송/통신': [
    '플랫폼 경쟁 속 시청자 이용 패턴 변화',
    '통신 인프라 투자와 AI 서비스 확장',
    '콘텐츠 편성 전략의 새 흐름',
    '미디어 규제 이슈와 업계 반응',
  ],
  '스포츠/연예': [
    '주말 경기 결과와 다음 라운드 전망',
    '신작 공개 이후 팬덤 반응 분석',
    '이적 시장 주요 변수와 팀 전략',
    '공연 일정 확정으로 되살아난 현장 열기',
  ],
  'IT/과학': [
    '생성형 AI 서비스의 최신 적용 사례',
    '클라우드 비용 최적화 전략 부상',
    '보안 업데이트가 개발 조직에 남긴 과제',
    '연구 현장에서 검증 중인 차세대 기술',
  ],
  '매거진/전문지': [
    '깊이 읽는 산업 트렌드 리포트',
    '전문가 인터뷰로 짚은 현장 변화',
    '데이터로 보는 소비자 관심사',
    '롱폼 기사로 정리한 이번 주 쟁점',
  ],
  지역: [
    '지역 현안과 주민 생활 변화',
    '지자체 정책 발표 이후 현장 반응',
    '문화 행사와 골목 상권 회복 흐름',
    '교통망 개선이 생활권에 미치는 영향',
  ],
}

export function getPressPrimaryCategory(press) {
  return PRESS_CATEGORIES.includes(press?.category) ? press.category : PRESS_CATEGORIES[0]
}

export function getPressArticleDeck(press) {
  if (!press) {
    return []
  }

  return PRESS_CATEGORIES.map((category) => ({
    key: category,
    label: category,
    articles: CATEGORY_ARTICLE_TEMPLATES[category].map((title, index) => ({
      id: `${press.id}-${category}-${index}`,
      title: `${press.name}, ${title}`,
      meta: `${press.category === category ? '주요 분야' : '확장 기사'} · ${index + 1}면`,
    })),
  }))
}
