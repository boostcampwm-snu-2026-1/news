export interface Article {
  id: string
  headline: string
  editedAt: string
  thumbnail?: string
}

export interface Category {
  key: string
  label: string
  articles: Article[]
}

export interface PressContent {
  pressId: string
  mainArticle: Article
  categories: Category[]
}

const makeArticles = (prefix: string, count: number): Article[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    headline: HEADLINES[prefix]?.[i] ?? `${prefix} 기사 ${i + 1}`,
    editedAt: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} 편집`,
  }))

const HEADLINES: Record<string, string[]> = {
  politics: [
    '국회 본회의 예산안 처리 논란',
    '대통령실 "외교 성과 이어가겠다"',
    '여야, 쟁점 법안 협상 타결 실패',
    '지방선거 앞두고 공천 갈등 심화',
    '국무조정실 규제혁신 방안 발표',
  ],
  economy: [
    '원·달러 환율 1,350원대 등락',
    '코스피 2,640선 회복 마감',
    '수출 3개월 연속 플러스 기록',
    '한국은행 기준금리 동결 결정',
    '대기업 1분기 실적 개선세 뚜렷',
  ],
  society: [
    '전국 미세먼지 농도 "나쁨" 수준',
    '서울 아파트 거래량 소폭 반등',
    '의대 증원 둘러싼 갈등 지속',
    '5월 황금연휴 국내 여행 급증',
    '고령운전자 면허 자진반납 확대',
  ],
  world: [
    '미·중 무역 협상 재개 전망',
    'G7 정상회의 AI 규제 합의',
    '중동 정전 협상 교착 상태',
    '일본 엔화 약세 지속',
    '유럽 에너지 가격 안정화 조짐',
  ],
  culture: [
    '칸 영화제 한국 감독 경쟁부문 진출',
    '서울 국제도서전 개막',
    '국립현대미술관 특별전 흥행',
    'K-팝 글로벌 스트리밍 신기록',
    '세종문화회관 여름 공연 티켓 매진',
  ],
  sports: [
    'KBO 리그 주말 빅매치 결과',
    '손흥민 EPL 시즌 최다 어시스트',
    '한국 여자 골프 US오픈 3관왕',
    'NBA 플레이오프 1라운드 결과',
    '2026 월드컵 예선 대진 확정',
  ],
}

const CATEGORIES = [
  { key: 'politics', label: '정치' },
  { key: 'economy', label: '경제' },
  { key: 'society', label: '사회' },
  { key: 'world', label: '국제' },
  { key: 'culture', label: '문화' },
  { key: 'sports', label: '스포츠' },
]

export const PRESS_CONTENTS: Record<string, PressContent> = Object.fromEntries(
  ['chosun', 'joongang', 'donga', 'hani', 'khan', 'mk', 'hankyung',
    'moneytoday', 'edaily', 'sedaily', 'yonhap', 'ytn', 'mbc', 'kbs',
    'sbs', 'jtbc', 'tvchosun', 'channela', 'mbn', 'newsis', 'news1',
    'ohmynews', 'sisain', 'hankookilbo',
    'kukmin', 'segye', 'munhwa', 'seoul', 'asiae', 'asiatoday', 'heraldcorp',
    'fnews', 'etoday', 'bizwatch', 'etnews', 'dt', 'zdnet', 'bloter', 'techm',
    'nocutnews', 'yonhaptv', 'tbs', 'koreaherald', 'koreatimes', 'joongangeng',
    'sisajournal', 'weekly', 'economist',
    'forbes', 'busan', 'daegu', 'gwangju', 'jeonbuk', 'gangwon', 'jeju',
    'gyeongin', 'incheon', 'chungcheong', 'chungtoday', 'gyeongnam', 'yeongnam',
    'newstapa', 'pressian', 'minjoong', 'ntn', 'greenpost', 'topstarnews',
    'sportschosun', 'sportsdonga', 'osen', 'tenasia', 'dispatch',
  ].map((pressId) => [
    pressId,
    {
      pressId,
      mainArticle: {
        id: `${pressId}-main`,
        headline: HEADLINES.politics[Math.floor(Math.random() * 5)],
        editedAt: '10:30 편집',
      },
      categories: CATEGORIES.map(({ key, label }) => ({
        key,
        label,
        articles: makeArticles(key, 5),
      })),
    } satisfies PressContent,
  ]),
)
