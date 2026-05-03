import type { Press } from "../types/newsstand";

export const PAGE_SIZE = 24;

export const presses: Press[] = [
  { id: "yonhap", name: "연합뉴스", categoryKeys: ["politics", "economy", "society"], primaryCategoryKey: "politics", wordmark: { name: "연합뉴스", weight: 700 } },
  { id: "chosun", name: "조선일보", categoryKeys: ["politics", "society", "culture"], primaryCategoryKey: "politics", wordmark: { name: "조선일보", family: "serif", weight: 700 } },
  { id: "joongang", name: "중앙일보", categoryKeys: ["politics", "economy", "world"], primaryCategoryKey: "economy", wordmark: { name: "중앙일보", weight: 700, tracking: "-0.02em" } },
  { id: "donga", name: "동아일보", categoryKeys: ["politics", "society", "world"], primaryCategoryKey: "society", wordmark: { name: "동아일보", family: "serif", weight: 700 } },
  { id: "hani", name: "한겨레", categoryKeys: ["politics", "society", "culture"], primaryCategoryKey: "society", wordmark: { name: "한겨레", weight: 700, color: "#0B6F4D" } },
  { id: "khan", name: "경향신문", categoryKeys: ["politics", "society", "culture"], primaryCategoryKey: "politics", wordmark: { name: "경향신문", family: "serif", weight: 700 } },
  { id: "mk", name: "매일경제", categoryKeys: ["economy", "world", "tech"], primaryCategoryKey: "economy", wordmark: { name: "매일경제", weight: 700 } },
  { id: "hankyung", name: "한국경제", categoryKeys: ["economy", "tech", "world"], primaryCategoryKey: "economy", wordmark: { name: "한국경제", weight: 700, color: "#245C9E" } },
  { id: "sedaily", name: "서울경제", categoryKeys: ["economy", "politics", "tech"], primaryCategoryKey: "economy", wordmark: { name: "서울경제", weight: 700 } },
  { id: "etnews", name: "전자신문", categoryKeys: ["tech", "economy", "world"], primaryCategoryKey: "tech", wordmark: { name: "전자신문", weight: 700, color: "#B9232A" } },
  { id: "zdnet", name: "ZDNET Korea", categoryKeys: ["tech", "economy", "world"], primaryCategoryKey: "tech", wordmark: { name: "ZDNET Korea", latin: true, weight: 700 } },
  { id: "kbs", name: "KBS", categoryKeys: ["politics", "society", "world"], primaryCategoryKey: "politics", wordmark: { name: "KBS", latin: true, weight: 700, color: "#1F5FAE" } },
  { id: "mbc", name: "MBC", categoryKeys: ["politics", "society", "culture"], primaryCategoryKey: "society", wordmark: { name: "MBC", latin: true, weight: 700 } },
  { id: "sbs", name: "SBS", categoryKeys: ["politics", "society", "culture"], primaryCategoryKey: "culture", wordmark: { name: "SBS", latin: true, weight: 700, color: "#3152A4" } },
  { id: "jtbc", name: "JTBC", categoryKeys: ["politics", "society", "world"], primaryCategoryKey: "politics", wordmark: { name: "JTBC", latin: true, weight: 700 } },
  { id: "ytn", name: "YTN", categoryKeys: ["politics", "society", "world"], primaryCategoryKey: "society", wordmark: { name: "YTN", latin: true, weight: 700, color: "#1C63B7" } },
  { id: "newsis", name: "뉴시스", categoryKeys: ["politics", "society", "economy"], primaryCategoryKey: "society", wordmark: { name: "뉴시스", weight: 700 } },
  { id: "nocut", name: "노컷뉴스", categoryKeys: ["politics", "society", "culture"], primaryCategoryKey: "society", wordmark: { name: "노컷뉴스", weight: 700 } },
  { id: "pressian", name: "프레시안", categoryKeys: ["politics", "society", "world"], primaryCategoryKey: "politics", wordmark: { name: "프레시안", family: "serif", weight: 700 } },
  { id: "ohmy", name: "오마이뉴스", categoryKeys: ["politics", "society", "culture"], primaryCategoryKey: "politics", wordmark: { name: "오마이뉴스", weight: 700, color: "#D34836" } },
  { id: "asiae", name: "아시아경제", categoryKeys: ["economy", "world", "tech"], primaryCategoryKey: "economy", wordmark: { name: "아시아경제", weight: 700 } },
  { id: "moneytoday", name: "머니투데이", categoryKeys: ["economy", "tech", "culture"], primaryCategoryKey: "economy", wordmark: { name: "머니투데이", weight: 700 } },
  { id: "herald", name: "헤럴드경제", categoryKeys: ["economy", "culture", "world"], primaryCategoryKey: "economy", wordmark: { name: "헤럴드경제", weight: 700 } },
  { id: "fnnews", name: "파이낸셜뉴스", categoryKeys: ["economy", "tech", "world"], primaryCategoryKey: "economy", wordmark: { name: "파이낸셜뉴스", weight: 700 } },
];
