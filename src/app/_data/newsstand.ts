export type PressCategory =
  | "종합/경제"
  | "방송/통신"
  | "IT"
  | "스포츠/연예"
  | "매거진/전문지"
  | "지역";

export type Wordmark = {
  color?: string;
  bg?: string;
  weight?: 400 | 500 | 700;
  family?: "sans" | "serif";
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
};

export type Press = {
  id: string;
  name: string;
  category: PressCategory;
  subscribed: boolean;
  wordmark?: Wordmark;
};

export type TickerItem = {
  press: string;
  title: string;
};

const press = (
  id: string,
  name: string,
  category: PressCategory,
  subscribed = false,
  wordmark: Wordmark = {},
): Press => ({ id, name, category, subscribed, wordmark });

export const tickerItems: TickerItem[] = [
  {
    press: "연합뉴스",
    title: "[속보] 도심 공원 '조용한 독서존' 시범 운영... 시민 호응",
  },
  {
    press: "한국경제",
    title: "중소기업 ESG 전담 인력 채용 확대... 지속 가능성 주목",
  },
  {
    press: "SBS Biz",
    title: "출근길 데이터 사용량 줄이는 생활형 요금제 관심",
  },
  {
    press: "문화일보",
    title: "지역 도서관 야간 프로그램 확대... 가족 단위 참여 늘어",
  },
];

export const presses: Press[] = [
  press("seoul-economy", "서울경제", "종합/경제", true, { weight: 700 }),
  press("dailian", "데일리안", "종합/경제", false, { color: "#1d3e72" }),
  press("herald", "헤럴드경제", "종합/경제", true, { color: "#164b83", weight: 700 }),
  press("sbs-biz", "SBS Biz", "방송/통신", true, {
    color: "#3057a6",
    latin: true,
    weight: 700,
  }),
  press("segye", "세계일보", "종합/경제", false, { family: "serif", weight: 700 }),
  press("asia-economy", "아시아경제", "종합/경제", true, {
    color: "#1d55a4",
    flag: true,
  }),
  press("edaily", "이데일리", "종합/경제", false, { color: "#1d3d83" }),
  press("chosun", "朝鮮日報", "종합/경제", false, {
    family: "serif",
    tracking: "0.08em",
    weight: 700,
  }),
  press("inews24", "아이뉴스24", "IT", false, {
    accent: "#e5484d",
    accentChar: 4,
    weight: 700,
  }),
  press("fn-news", "파이낸셜뉴스", "종합/경제", false, { weight: 700 }),
  press("sports-seoul", "스포츠서울", "스포츠/연예", false, {
    color: "#2c7d4d",
    italic: true,
  }),
  press("sports-donga", "스포츠동아", "스포츠/연예", false, {
    color: "#236fc5",
    weight: 700,
  }),
  press("munhwa", "석간 문화일보", "종합/경제", true, {
    family: "serif",
    weight: 700,
  }),
  press("kbs-world", "KBS WORLD", "방송/통신", true, {
    bg: "#203864",
    color: "#ffffff",
    latin: true,
    small: true,
    weight: 700,
  }),
  press("korea-joongang", "Korea JoongAng Daily", "종합/경제", true, {
    family: "serif",
    latin: true,
    small: true,
  }),
  press("insight", "Insight", "매거진/전문지", true, {
    family: "serif",
    italic: true,
    latin: true,
  }),
  press("lawtv", "법률방송뉴스", "방송/통신", false, { weight: 700 }),
  press("sisajournal", "시사저널e.", "종합/경제", false, {
    color: "#d14235",
    latin: true,
  }),
  press("rural", "한국농어촌방송", "방송/통신", false, { small: true }),
  press("joynews", "조이뉴스24", "스포츠/연예", false, {
    color: "#db4a2b",
    weight: 700,
  }),
  press("energy", "에너지경제", "종합/경제", false, { color: "#2f8a55" }),
  press("business-post", "BUSINESS POST", "종합/경제", false, {
    latin: true,
    small: true,
    weight: 700,
  }),
  press("ceoscore", "CEO스코어데일리", "종합/경제", false, {
    latin: true,
    small: true,
  }),
  press("knn", "KNN", "지역", false, {
    color: "#f05a28",
    latin: true,
    weight: 700,
  }),
  press("korea-herald", "The Korea Herald", "종합/경제", false, {
    color: "#153b6f",
    latin: true,
    small: true,
  }),
  press("mbc", "MBC", "방송/통신", false, {
    color: "#1f62b6",
    latin: true,
    weight: 700,
  }),
  press("newstapa", "뉴스타파", "종합/경제", false, { weight: 700 }),
  press("newdaily", "NewDaily", "종합/경제", false, {
    color: "#c43e32",
    latin: true,
  }),
  press("kmib", "국민일보", "종합/경제", false, { family: "serif" }),
  press("daily-sports", "일간스포츠", "스포츠/연예", false, {
    color: "#2969ad",
  }),
  press("khan", "경향신문", "종합/경제", false, { family: "serif" }),
  press("zdnet", "ZDNET Korea", "IT", false, {
    color: "#c53b2c",
    latin: true,
    small: true,
  }),
  press("mydaily", "mydaily", "스포츠/연예", false, {
    color: "#d7462c",
    latin: true,
  }),
  press("moneytoday", "MT 머니투데이", "종합/경제", false, {
    color: "#254e9b",
    latin: true,
  }),
  press("sbs", "SBS", "방송/통신", false, {
    color: "#2a56a4",
    latin: true,
    weight: 700,
  }),
  press("ohmynews", "OhmyNews", "종합/경제", false, {
    color: "#d94330",
    latin: true,
  }),
  press("mk", "매일경제", "종합/경제", false, { weight: 700 }),
  press("mbn", "MBN", "방송/통신", false, {
    color: "#284f9e",
    latin: true,
    weight: 700,
  }),
  press("ytn", "YTN", "방송/통신", false, {
    color: "#1d67b1",
    latin: true,
    weight: 700,
  }),
  press("sisaweek", "시사위크", "종합/경제", false, { color: "#2f5d8f" }),
  press("digital-today", "Digital Today", "IT", false, {
    color: "#366ab2",
    latin: true,
    small: true,
  }),
  press("datanews", "dataNews", "종합/경제", false, {
    color: "#d34830",
    latin: true,
  }),
  press("university", "한국대학신문", "종합/경제", false, { small: true }),
  press("seoul-finance", "서울파이낸스", "종합/경제", false, { color: "#244b91" }),
  press("xports", "엑스포츠뉴스", "스포츠/연예", false, { color: "#1c72b4" }),
  press("maxmovie", "맥스무비", "스포츠/연예", false, { weight: 700 }),
  press("obs", "OBS", "지역", false, {
    color: "#2567af",
    latin: true,
    weight: 700,
  }),
  press("boy-korea", "소년한국일보", "종합/경제", false, { small: true }),
];
