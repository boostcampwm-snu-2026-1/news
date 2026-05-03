import type { Media, MediaCategory } from '../type/types'
import { createNewsDummyList } from './newsDummyList'

type MediaSeed = {
  id: string
  title: string
  category: MediaCategory
}

const MEDIA_SEEDS: MediaSeed[] = [
  { id: 'the-korea-herald', title: 'The Korea Herald', category: 'LOCAL' },
  { id: 'mbc', title: 'MBC', category: 'BROADCAST' },
  { id: 'newstapa', title: '뉴스타파', category: 'LOCAL' },
  { id: 'newdaily', title: 'NewDaily', category: 'LOCAL' },
  { id: 'kukmin-ilbo', title: '국민일보', category: 'LOCAL' },
  { id: 'daily-sports', title: '일간스포츠', category: 'SPORTS' },
  { id: 'kyunghyang-shinmun', title: '경향신문', category: 'LOCAL' },
  { id: 'sbs', title: 'SBS', category: 'BROADCAST' },
  { id: 'mbn', title: 'MBN', category: 'BROADCAST' },
  { id: 'ytn', title: 'YTN', category: 'BROADCAST' },
  { id: 'obs', title: 'OBS', category: 'BROADCAST' },
  { id: 'sisaweek', title: '시사위크', category: 'MAGAZINE' },
  { id: 'ohmynews', title: 'OhmyNews', category: 'LOCAL' },
  { id: 'maeil-business', title: '매일경제', category: 'ECONOMY' },
  { id: 'korean-university-news', title: '한국대학신문', category: 'LOCAL' },
  { id: 'seoul-finance', title: '서울파이낸스', category: 'ECONOMY' },
  { id: 'maxmovie', title: '맥스무비', category: 'MAGAZINE' },
  { id: 'boy-korea-ilbo', title: '소년한국일보', category: 'LOCAL' },
  { id: 'chosun-ilbo', title: '조선일보', category: 'LOCAL' },
  { id: 'joongang-ilbo', title: '중앙일보', category: 'LOCAL' },
  { id: 'donga-ilbo', title: '동아일보', category: 'LOCAL' },
  { id: 'hankyoreh', title: '한겨레', category: 'LOCAL' },
  { id: 'hankook-ilbo', title: '한국일보', category: 'LOCAL' },
  { id: 'seoul-shinmun', title: '서울신문', category: 'LOCAL' },
  { id: 'weekly-khan', title: '주간경향', category: 'MAGAZINE' },
  { id: 'moneytoday', title: '머니투데이', category: 'ECONOMY' },
  { id: 'asiae', title: '아시아경제', category: 'ECONOMY' },
  { id: 'edaily', title: '이데일리', category: 'ECONOMY' },
  { id: 'etnews', title: '전자신문', category: 'IT' },
  { id: 'zdnet-korea', title: 'ZDNet Korea', category: 'IT' },
  { id: 'bloter', title: '블로터', category: 'IT' },
  { id: 'inews24', title: '아이뉴스24', category: 'IT' },
  { id: 'sports-seoul', title: '스포츠서울', category: 'SPORTS' },
  { id: 'sports-donga', title: '스포츠동아', category: 'SPORTS' },
  { id: 'spotv-news', title: 'SPOTV NEWS', category: 'SPORTS' },
  { id: 'mk-sports', title: 'MK스포츠', category: 'SPORTS' },
  { id: 'kbs', title: 'KBS', category: 'BROADCAST' },
  { id: 'jtbc', title: 'JTBC', category: 'BROADCAST' },
  { id: 'channel-a', title: '채널A', category: 'BROADCAST' },
  { id: 'tvchosun', title: 'TV조선', category: 'BROADCAST' },
]

export const mediaDummyList: Media[] = MEDIA_SEEDS.map((media) => ({
  id: media.id,
  title: media.title,
  image: `/media/${media.id}.png`,
  category: media.category,
  news: createNewsDummyList(media),
}))
