export const CATEGORY_ORDER = [
  { key: "general", label: "종합 / 경제" },
  { key: "broadcast", label: "방송 / 통신" },
  { key: "tech", label: "IT" },
  { key: "sports", label: "스포츠 / 연예" },
  { key: "magazine", label: "매거진 / 전문지" },
  { key: "regional", label: "지역" }
] as const;

export type CategoryKey = (typeof CATEGORY_ORDER)[number]["key"];
export type ActiveTab = "all" | "sub";
export type ViewerMode = "grid" | "list";

export interface Article {
  id: string;
  title: string;
  editedAt: string;
  summary: string;
}

export interface CategoryFeed {
  key: CategoryKey;
  label: string;
  articles: Article[];
}

export interface WordmarkStyle {
  family: "sans" | "serif";
  color: string;
  weight: 500 | 600 | 700;
  italic?: boolean;
  small?: boolean;
  tracking?: string;
  accentColor?: string;
  accentChar?: number;
  underlineIndices?: number[];
  background?: string;
}

export interface Press {
  id: string;
  name: string;
  primaryCategoryKey: CategoryKey;
  descriptor: string;
  wordmark: WordmarkStyle;
  categories: Record<CategoryKey, CategoryFeed>;
}

const PRESS_NAMES = [
  "서울경제",
  "데일리안",
  "헤럴드경제",
  "SBS Biz",
  "세계일보",
  "아시아경제",
  "이데일리",
  "朝鮮日報",
  "아이뉴스24",
  "파이낸셜뉴스",
  "스포츠서울",
  "스포츠동아",
  "석간문화일보",
  "KBS WORLD",
  "Korea JoongAng Daily",
  "Insight",
  "법률방송뉴스",
  "시사저널e",
  "한국농어촌방송",
  "조이뉴스24",
  "에너지경제",
  "BUSINESS POST",
  "CEO스코어데일리",
  "KNN",
  "The Korea Herald",
  "MBC",
  "뉴스타파",
  "NewDaily",
  "국민일보",
  "일간스포츠",
  "경향신문",
  "ZDNET Korea",
  "mydaily",
  "MT 머니투데이",
  "SBS",
  "OhmyNews",
  "매일경제",
  "MBN",
  "YTN",
  "시사위크",
  "Digital Today",
  "dataNews",
  "한국대학신문",
  "서울파이낸스",
  "엑스포츠뉴스",
  "맥스무비",
  "OBS",
  "소년한국일보",
  "동아일보",
  "한겨레",
  "한국경제",
  "전자신문",
  "디지털타임스",
  "미디어오늘",
  "뉴스1",
  "연합뉴스TV",
  "문화일보",
  "부산일보",
  "강원일보",
  "대전일보",
  "전북일보",
  "제민일보",
  "스카이데일리",
  "포브스코리아",
  "한스경제",
  "노컷뉴스",
  "아주경제",
  "머니S",
  "스포티비뉴스",
  "게임메카",
  "씨네21",
  "한경비즈니스"
] as const;

const CATEGORY_COPY: Record<CategoryKey, string[]> = {
  general: [
    "{press}, 생활 밀착 정책 변화를 분석한 큐레이션 공개",
    "{press}, 중소기업 투자 흐름을 짚는 아침 브리핑 업데이트",
    "{press}, 워라밸 확산 이후 소비 패턴 변화를 집중 조명",
    "{press}, 지역 상권 회복을 위한 데이터 리포트를 정리",
    "{press}, 물가와 고용 지표를 묶어 보는 한눈 리포트 제공",
    "{press}, 공공 서비스 개선 사례를 모은 주간 요약 발행",
    "{press}, 친환경 생활 트렌드를 다룬 심층 기사 큐레이션",
    "{press}, 직장인 관심 이슈 중심의 오늘의 해설 기사 정리"
  ],
  broadcast: [
    "{press}, 출근길 네트워크 품질 개선 소식을 메인으로 편집",
    "{press}, 스마트 모빌리티와 통신 인프라 연동 사례를 소개",
    "{press}, OTT 플랫폼의 개인화 기능 개선 흐름을 짚는다",
    "{press}, 공공 와이파이 확대가 생활 동선에 미친 변화를 분석",
    "{press}, 라이브 방송 경험을 높인 안정화 기술 사례를 모았다",
    "{press}, 방송 제작 현장의 AI 자동화 도입 움직임을 정리",
    "{press}, 통신 요금제 개편 이후 이용자 반응을 심층 취재",
    "{press}, 집과 차량을 연결하는 스마트 알림 서비스를 조명"
  ],
  tech: [
    "{press}, 생성형 AI 도구를 팀 협업에 붙이는 실전 사례를 소개",
    "{press}, 프론트엔드 성능 개선을 위한 렌더링 전략을 비교",
    "{press}, 개발 생산성을 높이는 에이전트 도구 활용 흐름을 정리",
    "{press}, 보안 점검 자동화를 도입한 서비스 팀의 경험을 분석",
    "{press}, 테스트 커버리지 확대와 회귀 방지 전략을 사례로 설명",
    "{press}, 데이터 기반 추천 기능을 만들기 위한 최소 구조를 제안",
    "{press}, 웹 접근성 대응을 코드 리뷰 단계에 넣는 방법을 다룬다",
    "{press}, 작은 단위 배포가 사용자 경험에 미치는 장점을 설명"
  ],
  sports: [
    "{press}, 경기 하이라이트와 팬 반응을 한 번에 보는 리스트를 편집",
    "{press}, 선수 인터뷰와 현장 스케치를 묶은 오늘의 스포츠 픽 제공",
    "{press}, 예능 화제 장면과 OTT 신작 소식을 함께 큐레이션",
    "{press}, 구단 운영 변화가 팬 경험에 미친 영향을 정리",
    "{press}, 시즌 전망과 이적시장 분석을 묶은 심층 기사 구성",
    "{press}, 공연·영화·드라마 추천을 한 화면에 담은 요약 리포트",
    "{press}, 팬 참여형 서비스가 커뮤니티에 미친 변화를 취재",
    "{press}, 기록 기반으로 보는 스타 플레이어 스토리를 정리"
  ],
  magazine: [
    "{press}, 브랜드 전략과 조직 문화 사례를 깊이 있게 큐레이션",
    "{press}, 리더십과 커리어 성장을 다룬 인터뷰 시리즈를 편집",
    "{press}, 라이프스타일과 소비 감각을 엮은 주간 읽을거리를 추천",
    "{press}, 크리에이터 비즈니스 모델을 분석한 스페셜 리포트를 공개",
    "{press}, 스타트업 운영 인사이트를 담은 긴 호흡의 해설 기사 발행",
    "{press}, 디자인 시스템과 제품 경험을 연결한 기획 기사를 소개",
    "{press}, 현업자의 문제 해결 방식을 풀어낸 실무 인터뷰를 정리",
    "{press}, 산업별 트렌드 키워드를 압축한 에디터 노트를 제공"
  ],
  regional: [
    "{press}, 지역 축제와 로컬 브랜드 소식을 큐레이션해 전달",
    "{press}, 지자체 생활 서비스 개선 사례를 한눈에 비교 정리",
    "{press}, 대중교통과 상권 변화가 시민 경험에 미친 영향을 분석",
    "{press}, 관광과 청년 창업을 연결한 로컬 프로젝트를 소개",
    "{press}, 주민 참여형 정책 실험이 확산되는 흐름을 취재",
    "{press}, 교육·복지 현장의 변화를 체감 사례 중심으로 정리",
    "{press}, 지역 미디어가 발굴한 따뜻한 뉴스들을 모아 전달",
    "{press}, 재난 대응과 공공 안전 정보를 쉽게 풀어쓴 브리핑 제공"
  ]
};

const CATEGORY_DESCRIPTORS: Record<CategoryKey, string> = {
  general: "종합 / 경제 큐레이션",
  broadcast: "방송 / 통신 큐레이션",
  tech: "IT 큐레이션",
  sports: "스포츠 / 연예 큐레이션",
  magazine: "매거진 / 전문지 큐레이션",
  regional: "지역 뉴스 큐레이션"
};

const COLOR_ROTATION = [
  "#14212B",
  "#35506A",
  "#4362D0",
  "#7A4860",
  "#435A3C",
  "#5F6E76"
] as const;

const INITIAL_SUBSCRIBED_NAMES = [
  "SBS Biz",
  "MBC",
  "KBS WORLD",
  "Korea JoongAng Daily",
  "Insight",
  "헤럴드경제",
  "한겨레",
  "시사저널e"
] as const;

export const NEWS_TICKER_ITEMS = [
  "[속보] 도심 공원 조용한 독서존 시범 운영 확대",
  "중소기업 ESG 전담 인력 채용 확대로 지속 가능성 주목",
  "출근길 지하철 와이파이 품질 개선 체감도 상승",
  "지역 생활 서비스 데이터 공개 범위 확대 논의",
  "생성형 AI 도구를 활용한 뉴스 편집 자동화 실험 확산",
  "모바일 구독 경험 개선 위한 UX 리팩토링 사례 공유"
] as const;

export function slugifyPressName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function createEditedAt(pressIndex: number, articleIndex: number): string {
  const hour = 8 + ((pressIndex + articleIndex) % 12);
  const minute = (11 + articleIndex * 7 + pressIndex) % 60;
  return `2026.01.14 ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function createWordmarkStyle(name: string, index: number): WordmarkStyle {
  const charCount = Array.from(name).length;
  const isLatinHeavy = /[A-Za-z]{3,}/.test(name);
  const serif =
    /朝鮮|Herald|JoongAng|Insight|Forbes|씨네21/.test(name) || index % 7 === 0;

  return {
    family: serif ? "serif" : "sans",
    color: COLOR_ROTATION[index % COLOR_ROTATION.length],
    weight: index % 4 === 0 ? 700 : index % 3 === 0 ? 600 : 500,
    italic: isLatinHeavy && index % 5 === 0,
    small: name.length > 10,
    tracking: isLatinHeavy ? "0.04em" : undefined,
    accentColor: "#7890E7",
    accentChar: charCount > 2 ? index % charCount : 0,
    underlineIndices: index % 6 === 0 ? [Math.min(1, charCount - 1)] : undefined,
    background: /KBS WORLD|BUSINESS POST|KNN/.test(name) ? "#F5F7F9" : undefined
  };
}

function createCategoryFeed(
  pressName: string,
  pressIndex: number,
  categoryKey: CategoryKey
): CategoryFeed {
  const label = CATEGORY_ORDER.find((category) => category.key === categoryKey)!.label;
  const articles = CATEGORY_COPY[categoryKey].map((template, articleIndex) => ({
    id: `${slugifyPressName(pressName)}-${categoryKey}-${articleIndex + 1}`,
    title: template.replace("{press}", pressName),
    editedAt: createEditedAt(pressIndex, articleIndex),
    summary: `${pressName}가 직접 편집한 ${CATEGORY_DESCRIPTORS[categoryKey]} 기사입니다.`
  }));

  return {
    key: categoryKey,
    label,
    articles
  };
}

export const PRESS_LIST: Press[] = PRESS_NAMES.map((name, index) => {
  const primaryCategoryKey = CATEGORY_ORDER[index % CATEGORY_ORDER.length].key;
  const categories = Object.fromEntries(
    CATEGORY_ORDER.map((category) => [
      category.key,
      createCategoryFeed(name, index, category.key)
    ])
  ) as Record<CategoryKey, CategoryFeed>;

  return {
    id: slugifyPressName(name),
    name,
    primaryCategoryKey,
    descriptor: CATEGORY_DESCRIPTORS[primaryCategoryKey],
    wordmark: createWordmarkStyle(name, index),
    categories
  };
});

export const INITIAL_SUBSCRIBED_IDS = INITIAL_SUBSCRIBED_NAMES.map((name) =>
  slugifyPressName(name)
);
