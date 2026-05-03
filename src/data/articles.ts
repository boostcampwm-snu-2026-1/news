import type { Article, TickerItem } from "../types/newsstand";

export const articles: Article[] = [
  { id: "yonhap-politics-1", pressId: "yonhap", name: "연합뉴스", categoryKey: "politics", title: "국회, 민생 법안 처리 일정 조율", editedAt: "2026.05.03. 18:10" },
  { id: "yonhap-economy-1", pressId: "yonhap", name: "연합뉴스", categoryKey: "economy", title: "수출 지표 개선세에 시장 기대감 확대", editedAt: "2026.05.03. 17:45" },
  { id: "mk-economy-1", pressId: "mk", name: "매일경제", categoryKey: "economy", title: "환율 변동성 속 기업 자금 조달 전략 변화", editedAt: "2026.05.03. 16:20" },
  { id: "etnews-tech-1", pressId: "etnews", name: "이투스뉴스", categoryKey: "tech", title: "차세대 반도체 공정 투자 경쟁 본격화", editedAt: "2026.05.03. 15:30" },
  { id: "hani-society-1", pressId: "hani", name: "한겨레", categoryKey: "society", title: "지역 공공의료 확충 논의 다시 속도", editedAt: "2026.05.03. 14:55" },
  { id: "sbs-culture-1", pressId: "sbs", name: "SBS뉴스", categoryKey: "culture", title: "주말 공연가, 가족 관객 중심으로 활기", editedAt: "2026.05.03. 13:40" },
];

export const tickerItems: TickerItem[] = articles.map((article) => ({
  pressName: article.name,
  title: article.title,
}));
