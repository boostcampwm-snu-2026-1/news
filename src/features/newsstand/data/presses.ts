import { createCategoryStats } from "./categories";
import type { Press, PressArticle, PressCategory, WordmarkStyle } from "../types";

type PressSeed = {
  id: string;
  name: string;
  primaryCategory: PressCategory;
  subscribed?: boolean;
  wordmark?: WordmarkStyle;
};

const pressSeeds: PressSeed[] = [
  { id: "seoul-economy", name: "서울경제", primaryCategory: "general", wordmark: { weight: 700 } },
  { id: "dailian", name: "데일리안", primaryCategory: "general", wordmark: { color: "#1d4fa3", weight: 700 } },
  { id: "herald", name: "헤럴드경제", primaryCategory: "general", subscribed: true, wordmark: { color: "#0a6f3c" } },
  { id: "sbs-biz", name: "SBS Biz", primaryCategory: "broadcast", subscribed: true, wordmark: { latin: true, weight: 700 } },
  { id: "segye", name: "세계일보", primaryCategory: "general", wordmark: { family: "serif", weight: 700 } },
  { id: "asia-economy", name: "아시아경제", primaryCategory: "general", wordmark: { flag: true, color: "#174a9c" } },
  { id: "edaily", name: "이데일리", primaryCategory: "general", wordmark: { color: "#2642a3", weight: 700 } },
  { id: "chosun", name: "朝鮮日報", primaryCategory: "general", wordmark: { family: "serif", weight: 700, tracking: "0.08em" } },
  { id: "inews24", name: "아이뉴스24", primaryCategory: "it", wordmark: { color: "#d64040" } },
  { id: "fnnews", name: "파이낸셜뉴스", primaryCategory: "general", wordmark: { color: "#3159a7" } },
  { id: "sports-seoul", name: "스포츠서울", primaryCategory: "sports", wordmark: { italic: true, weight: 700 } },
  { id: "sports-donga", name: "스포츠동아", primaryCategory: "sports", wordmark: { color: "#1b64ad" } },
  { id: "munhwa", name: "석간문화일보", primaryCategory: "general", wordmark: { family: "serif" } },
  { id: "kbs-world", name: "KBS WORLD", primaryCategory: "broadcast", subscribed: true, wordmark: { bg: "#14212b", color: "#ffffff", latin: true, small: true } },
  { id: "joongang-daily", name: "Korea JoongAng Daily", primaryCategory: "general", subscribed: true, wordmark: { family: "serif", latin: true, small: true } },
  { id: "insight", name: "Insight", primaryCategory: "magazine", subscribed: true, wordmark: { family: "serif", italic: true, latin: true } },
  { id: "lawtv", name: "법률방송뉴스", primaryCategory: "magazine", wordmark: { color: "#3b5368" } },
  { id: "sisajournal-e", name: "시사저널e.", primaryCategory: "general", subscribed: true, wordmark: { color: "#d34836" } },
  { id: "rural", name: "한국농어촌방송", primaryCategory: "local", wordmark: { color: "#2e7d32" } },
  { id: "joynews24", name: "조이뉴스24", primaryCategory: "sports", wordmark: { color: "#e45b27" } },
  { id: "ekn", name: "에너지경제", primaryCategory: "general", wordmark: { color: "#1d6c3f" } },
  { id: "business-post", name: "BUSINESS POST", primaryCategory: "general", wordmark: { latin: true, small: true, tracking: "0.04em" } },
  { id: "ceoscore", name: "CEO스코어데일리", primaryCategory: "general", wordmark: { latin: true, small: true } },
  { id: "knn", name: "KNN", primaryCategory: "local", wordmark: { latin: true, color: "#1456a3", weight: 700 } },
  { id: "korea-herald", name: "The Korea Herald", primaryCategory: "general", wordmark: { latin: true, family: "serif", small: true } },
  { id: "mbc", name: "MBC", primaryCategory: "broadcast", subscribed: true, wordmark: { latin: true, color: "#2454a6", weight: 700 } },
  { id: "newstapa", name: "뉴스타파", primaryCategory: "general", wordmark: { weight: 700 } },
  { id: "newdaily", name: "NewDaily", primaryCategory: "general", wordmark: { latin: true, color: "#cf2d2d" } },
  { id: "kmib", name: "국민일보", primaryCategory: "general", wordmark: { family: "serif", weight: 700 } },
  { id: "daily-sports", name: "일간스포츠", primaryCategory: "sports", wordmark: { color: "#2759a8" } },
  { id: "khan", name: "경향신문", primaryCategory: "general", wordmark: { family: "serif", weight: 700 } },
  { id: "zdnet", name: "ZDNET Korea", primaryCategory: "it", wordmark: { latin: true, color: "#c9332d", small: true } },
  { id: "mydaily", name: "mydaily", primaryCategory: "sports", wordmark: { latin: true, italic: true } },
  { id: "moneytoday", name: "MT 머니투데이", primaryCategory: "general", wordmark: { latin: true, weight: 700 } },
  { id: "sbs", name: "SBS", primaryCategory: "broadcast", wordmark: { latin: true, color: "#1a4ea3", weight: 700 } },
  { id: "ohmynews", name: "OhmyNews", primaryCategory: "general", wordmark: { latin: true, color: "#d23a2e" } },
  { id: "mk", name: "매일경제", primaryCategory: "general", wordmark: { family: "serif", weight: 700 } },
  { id: "mbn", name: "MBN", primaryCategory: "broadcast", wordmark: { latin: true, color: "#244e8f" } },
  { id: "ytn", name: "YTN", primaryCategory: "broadcast", wordmark: { latin: true, color: "#145ab0", weight: 700 } },
  { id: "sisaweek", name: "시사위크", primaryCategory: "general", wordmark: { color: "#40576b" } },
  { id: "digital-today", name: "Digital Today", primaryCategory: "it", wordmark: { latin: true, small: true } },
  { id: "datanews", name: "dataNews", primaryCategory: "it", wordmark: { latin: true, color: "#3472aa" } },
  { id: "university-news", name: "한국대학신문", primaryCategory: "magazine", wordmark: { color: "#34495e" } },
  { id: "seoul-finance", name: "서울파이낸스", primaryCategory: "general", wordmark: { color: "#345da8" } },
  { id: "xportsnews", name: "엑스포츠뉴스", primaryCategory: "sports", wordmark: { color: "#3157a5" } },
  { id: "maxmovie", name: "맥스무비", primaryCategory: "sports", wordmark: { color: "#c6483b" } },
  { id: "obs", name: "OBS", primaryCategory: "broadcast", wordmark: { latin: true, color: "#266ba5", weight: 700 } },
  { id: "boy-korea", name: "소년한국일보", primaryCategory: "magazine", wordmark: { family: "serif" } },
  { id: "yonhap", name: "연합뉴스", primaryCategory: "general", wordmark: { color: "#1e5aa8", weight: 700 } },
  { id: "hankyung", name: "한국경제", primaryCategory: "general", wordmark: { family: "serif", weight: 700 } },
  { id: "hani", name: "한겨레", primaryCategory: "general", subscribed: true, wordmark: { family: "serif", color: "#1e5b44", weight: 700 } },
  { id: "joongang", name: "중앙일보", primaryCategory: "general", wordmark: { family: "serif", weight: 700 } },
  { id: "donga", name: "동아일보", primaryCategory: "general", wordmark: { family: "serif", weight: 700 } },
  { id: "hankook", name: "한국일보", primaryCategory: "general", wordmark: { family: "serif" } },
  { id: "seoul-newspaper", name: "서울신문", primaryCategory: "general", wordmark: { family: "serif" } },
  { id: "kbs", name: "KBS", primaryCategory: "broadcast", wordmark: { latin: true, color: "#244d9f", weight: 700 } },
  { id: "jtbc", name: "JTBC", primaryCategory: "broadcast", wordmark: { latin: true, weight: 700 } },
  { id: "channel-a", name: "채널A", primaryCategory: "broadcast", wordmark: { latin: true, color: "#2467a9" } },
  { id: "tvchosun", name: "TV조선", primaryCategory: "broadcast", wordmark: { latin: true, family: "serif" } },
  { id: "etnews", name: "전자신문", primaryCategory: "it", wordmark: { color: "#d04a2f" } },
  { id: "bloter", name: "블로터", primaryCategory: "it", wordmark: { color: "#315ba6" } },
  { id: "it-chosun", name: "IT조선", primaryCategory: "it", wordmark: { latin: true } },
  { id: "ddaily", name: "디지털데일리", primaryCategory: "it", wordmark: { color: "#3066a8" } },
  { id: "sportalkorea", name: "스포탈코리아", primaryCategory: "sports", wordmark: { color: "#c94436" } },
  { id: "osen", name: "OSEN", primaryCategory: "sports", wordmark: { latin: true, weight: 700 } },
  { id: "starnews", name: "스타뉴스", primaryCategory: "sports", wordmark: { color: "#d04848" } },
  { id: "ize", name: "ize", primaryCategory: "magazine", wordmark: { latin: true, italic: true } },
  { id: "weekly-khan", name: "주간경향", primaryCategory: "magazine", wordmark: { family: "serif" } },
  { id: "monthly-chosun", name: "월간조선", primaryCategory: "magazine", wordmark: { family: "serif", tracking: "0.03em" } },
  { id: "busan", name: "부산일보", primaryCategory: "local", wordmark: { family: "serif" } },
  { id: "maeil", name: "매일신문", primaryCategory: "local", wordmark: { family: "serif" } },
  { id: "kwangju", name: "광주일보", primaryCategory: "local", wordmark: { family: "serif" } },
  { id: "gangwon", name: "강원일보", primaryCategory: "local", wordmark: { family: "serif" } },
  { id: "jeju", name: "제주일보", primaryCategory: "local", wordmark: { family: "serif" } },
];

export const presses: Press[] = pressSeeds.map((seed, index) => ({
  id: seed.id,
  name: seed.name,
  primaryCategory: seed.primaryCategory,
  subscribed: Boolean(seed.subscribed),
  editTime: `2026.01.14. ${String(18 + (index % 2)).padStart(2, "0")}:${String(30 + (index % 30)).padStart(2, "0")} 편집`,
  wordmark: seed.wordmark ?? {},
  categoryStats: createCategoryStats(seed.primaryCategory, index),
  articles: createArticles(seed, index),
}));

function createArticles(seed: PressSeed, seedIndex: number): PressArticle[] {
  const topics = [
    "생활밀착 서비스 개편으로 이용자 편의 높인다",
    "기업문화 개선 사례 공유 확산... 자발적 참여 늘어",
    "출근길 혼잡 완화 대책, 주요 거점부터 순차 적용",
    "지역 커뮤니티 중심 새 프로그램 시범 운영",
    "데이터 기반 추천 기능 강화... 개인화 경험 확대",
    "친환경 전환 속도 낸다... 현장 지원책 발표",
  ];

  return topics.map((title, index) => ({
    id: `${seed.id}-article-${index + 1}`,
    title,
    category: index % 2 === 0 ? seed.primaryCategory : rotateCategory(seed.primaryCategory, seedIndex + index),
  }));
}

function rotateCategory(primaryCategory: PressCategory, seed: number): PressCategory {
  const categories: PressCategory[] = ["general", "broadcast", "it", "sports", "magazine", "local"];
  return categories[(categories.indexOf(primaryCategory) + seed + 1) % categories.length];
}
