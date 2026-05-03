import type { Press, TickerItem } from '../types'

export const CATEGORIES = [
  '종합/경제',
  '방송/통신',
  'IT',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
] as const

const C: string[] = [...CATEGORIES]

export const MOCK_PRESSES: Press[] = [
  // ─── Page 1 ─────────────────────────────────────────
  { id: 'seoul-economy',  wordmark: { name: '서울경제',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'dailyan',        wordmark: { name: '데일리안',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'herald',         wordmark: { name: '헤럴드경제',         color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'sbs-biz',        wordmark: { name: 'SBS Biz',           color: '#14212B', weight: 700, family: 'sans', latin: true                }, categories: C },
  { id: 'segye',          wordmark: { name: '세계일보',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'asia-economy',   wordmark: { name: '아시아경제',         color: '#14212B', weight: 700, family: 'sans', flag: true                 }, categories: C },
  { id: 'edaily',         wordmark: { name: '이데일리',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'chosun',         wordmark: { name: '朝鮮日報',           color: '#14212B', weight: 700, family: 'serif'                            }, categories: C },
  { id: 'inews24',        wordmark: { name: '아이뉴스24',         color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'fn',             wordmark: { name: '파이낸셜뉴스',       color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'sports-seoul',   wordmark: { name: '스포츠서울',         color: '#D0021B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'sports-donga',   wordmark: { name: '스포츠동아',         color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'moonhwa',        wordmark: { name: '석간문화일보',       color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'kbs-world',      wordmark: { name: 'KBS WORLD',         color: '#FFFFFF', weight: 700, family: 'sans', bg: '#C00000', latin: true  }, categories: C },
  { id: 'joongang-daily', wordmark: { name: 'Korea JoongAng Daily', color: '#14212B', weight: 500, family: 'serif', latin: true, small: true }, categories: C },
  { id: 'insight',        wordmark: { name: 'Insight',           color: '#14212B', weight: 400, family: 'serif', italic: true, latin: true  }, categories: C },
  { id: 'lawtv',          wordmark: { name: '법률방송뉴스',       color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'sisa-journal',   wordmark: { name: '시사저널e.',         color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'koreafarm',      wordmark: { name: '한국농어촌방송',     color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'joynews24',      wordmark: { name: '조이뉴스24',         color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'energy-economy', wordmark: { name: '에너지경제',         color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'business-post',  wordmark: { name: 'BUSINESS POST',     color: '#14212B', weight: 700, family: 'sans', latin: true                }, categories: C },
  { id: 'ceo-score',      wordmark: { name: 'CEO스코어데일리',    color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'knn',            wordmark: { name: 'KNN',               color: '#14212B', weight: 700, family: 'sans', latin: true                }, categories: C },

  // ─── Page 2 ─────────────────────────────────────────
  { id: 'korea-herald',   wordmark: { name: 'The Korea Herald',  color: '#14212B', weight: 400, family: 'serif', italic: true, latin: true, small: true }, categories: C },
  { id: 'mbc',            wordmark: { name: 'MBC',               color: '#00358E', weight: 700, family: 'sans', latin: true                }, categories: C },
  { id: 'newstapa',       wordmark: { name: '뉴스타파',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'newdaily',       wordmark: { name: 'NewDaily',          color: '#14212B', weight: 700, family: 'sans', latin: true                }, categories: C },
  { id: 'kukmin',         wordmark: { name: '국민일보',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'ilgan-sports',   wordmark: { name: '일간스포츠',         color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'kyunghyang',     wordmark: { name: '경향신문',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'zdnet',          wordmark: { name: 'ZDNET Korea',       color: '#14212B', weight: 700, family: 'sans', latin: true, small: true    }, categories: C },
  { id: 'mydaily',        wordmark: { name: 'mydaily',           color: '#14212B', weight: 500, family: 'sans', italic: true, latin: true   }, categories: C },
  { id: 'mt',             wordmark: { name: 'MT머니투데이',       color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'sbs',            wordmark: { name: 'SBS',               color: '#14212B', weight: 700, family: 'sans', latin: true                }, categories: C },
  { id: 'ohmynews',       wordmark: { name: 'OhmyNews',          color: '#DB0A0A', weight: 500, family: 'sans', italic: true, latin: true   }, categories: C },
  { id: 'mk',             wordmark: { name: '매일경제',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'mbn',            wordmark: { name: 'MBN',               color: '#14212B', weight: 700, family: 'sans', latin: true                }, categories: C },
  { id: 'ytn',            wordmark: { name: 'YTN',               color: '#E5131B', weight: 700, family: 'sans', latin: true                }, categories: C },
  { id: 'sisa-week',      wordmark: { name: '시사위크',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'digital-today',  wordmark: { name: 'Digital Today',     color: '#14212B', weight: 700, family: 'sans', latin: true, small: true    }, categories: C },
  { id: 'datanews',       wordmark: { name: 'dataNews',          color: '#14212B', weight: 500, family: 'sans', italic: true, latin: true   }, categories: C },
  { id: 'unn',            wordmark: { name: '한국대학신문',       color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'seoul-finance',  wordmark: { name: '서울파이낸스',       color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'xsports',        wordmark: { name: '엑스포츠뉴스',       color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'maxmovie',       wordmark: { name: '맥스무비',           color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
  { id: 'obs',            wordmark: { name: 'OBS',               color: '#14212B', weight: 700, family: 'sans', latin: true                }, categories: C },
  { id: 'snkorea',        wordmark: { name: '소년한국일보',       color: '#14212B', weight: 700, family: 'sans'                             }, categories: C },
]

export const MOCK_TICKER_ITEMS: TickerItem[] = [
  { pressName: '연합뉴스', title: "[속보] 도심 공원 '조용한 독서존' 시범 운영… 시민 호응" },
  { pressName: '한국경제', title: '중소기업 ESG 전담 인력 채용 확대… 지속 가능성 주목' },
  { pressName: '조선일보', title: '하반기 경제 전망 "성장세 유지"… 전문가 분석' },
  { pressName: 'MBC',      title: '국내 OTT 가입자 수 1천만 돌파… 콘텐츠 경쟁 가속' },
]
