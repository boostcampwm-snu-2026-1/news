export const pressCategories = [
  "종합/경제",
  "방송/통신",
  "IT",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
] as const;

export type PressCategory = (typeof pressCategories)[number];

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
  editedAt: string;
  headline: string;
  articles: string[];
  wordmark?: Wordmark;
};

export type TickerItem = {
  press: string;
  title: string;
};

type StoryBundle = {
  editedAt: string;
  headline: string;
  articles: string[];
};

const storyTemplates: Record<PressCategory, StoryBundle> = {
  "종합/경제": {
    editedAt: "2026.01.14. 19:38 편집",
    headline: "기업, '워라밸 교육 프로그램' 자율 도입 확대",
    articles: [
      "지자체, 소상공인 대상 친절 응대 교육 지원",
      "직장인 스트레스 관리 위한 '마음건강 상담' 확대",
      "생활밀착 스타트업, 직장인 대상 서비스 잇단 출시",
      "기업문화 개선 사례 공유 확산... 자발적 참여 늘어",
      "재택·출근 혼합 근무, 중견기업까지 확대 움직임",
      "사내 커뮤니케이션 플랫폼 고도화 추진",
    ],
  },
  "방송/통신": {
    editedAt: "2026.01.14. 18:53 편집",
    headline: "전기요금도 이제 '알림으로 다독다독'... 생활관리 습관 확산",
    articles: [
      "출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다",
      '"기다림이 폭신해졌어요" 동네 버스정류장 의자, 새 단장',
      "데이터 걱정 내려놓기 실험... 통신사, 마음 편한 요금제 선보여",
      "잠들기 전에 보는 조용한 영상 한 편... OTT, 힐링 추천 기능 도입",
      '"길 잃지 않게 도와줄게요" 친절해진 환승 안내 목소리',
      "퇴근 시간 맞춰 환하게 찰칵... 스마트 조명, 집이 먼저 반겨준다",
    ],
  },
  IT: {
    editedAt: "2026.01.14. 18:21 편집",
    headline: "회의록 자동 요약 도구 확산... 중소팀도 생산성 실험",
    articles: [
      "생성형 AI 업무 도구, 사내 보안 정책과 함께 도입 속도 조절",
      "클라우드 비용 절감형 모니터링 대시보드 수요 확대",
      "공공기관, 디지털 민원 화면 접근성 점검 강화",
      "학생 개발자 대상 오픈소스 멘토링 프로그램 경쟁률 상승",
      "반도체 설계 인재 확보전 심화... 현장 교육 투자 확대",
      "모바일 앱 다크패턴 규제 논의에 플랫폼 대응 분주",
    ],
  },
  "스포츠/연예": {
    editedAt: "2026.01.14. 17:44 편집",
    headline: "주말 극장가 다시 북적... 체험형 상영관 예약률 상승",
    articles: [
      "프로야구 스프링캠프 준비 본격화... 팬 행사 일정 공개",
      "예능 제작진, 짧은 클립 확산 전략으로 화제성 경쟁",
      "신인 배우 인터뷰 콘텐츠, OTT 비하인드 수요 흡수",
      "지역 스포츠 구장 리뉴얼 추진... 관람 동선 개선",
      "공연 티켓 예매 플랫폼, 취소표 알림 기능 강화",
      "클럽팀 유소년 육성 투자 확대... 장기 운영 모델 점검",
    ],
  },
  "매거진/전문지": {
    editedAt: "2026.01.14. 16:30 편집",
    headline: "브랜드 리포트, 소비자 취향 데이터 해석 경쟁 본격화",
    articles: [
      "전문 매체, 깊이 있는 인터뷰 포맷으로 재방문율 상승",
      "건축·인테리어 잡지, 실측 콘텐츠의 검색 유입 증가",
      "패션 트렌드 분석 기사에 커머스 연동 실험 확대",
      "미식 전문지, 지역 장인 스토리텔링 연재 강화",
      "자동차 전문 매체, 전비 비교 포맷 정교화",
      "헬스케어 매거진, 임상 근거 표기 가이드 업데이트",
    ],
  },
  지역: {
    editedAt: "2026.01.14. 17:05 편집",
    headline: "지자체 생활 공지 앱 통합... 지역 소식 접근성 개선",
    articles: [
      "부산권 교통 환승 할인 안내 강화... 시민 체감도 점검",
      "지역 축제 운영 인력 확보전... 자원봉사 교육 확대",
      "시·군 단위 농산물 직거래 플랫폼 이용자 증가",
      "지역방송 뉴스레터 실험... 아침 출근층 반응 확인",
      "생활문화센터 야간 프로그램 확대... 직장인 참여 유도",
      "지방대 산학협력 프로젝트, 청년 정착 모델과 연결",
    ],
  },
};

const storyOverrides: Record<string, StoryBundle> = {
  "sbs-biz": {
    editedAt: "2026.01.14. 18:53 편집",
    headline: "전기요금도 이제 '알림으로 다독다독'... 생활관리 습관 확산",
    articles: [
      "출근길 드라마 끊김 이별? 지하철 와이파이, 살짝 더 빨라졌다",
      '"기다림이 폭신해졌어요" 동네 버스정류장 의자, 새 단장',
      "데이터 걱정 내려놓기 실험... 통신사, 마음 편한 요금제 선보여",
      "잠들기 전에 보는 조용한 영상 한 편... OTT, 힐링 추천 기능 도입",
      '"길 잃지 않게 도와줄게요" 친절해진 환승 안내 목소리',
      "퇴근 시간 맞춰 환하게 찰칵... 스마트 조명, 집이 먼저 반겨준다",
    ],
  },
  "asia-economy": {
    editedAt: "2026.01.14. 19:38 편집",
    headline: "기업, '워라밸 교육 프로그램' 자율 도입 확대",
    articles: [
      "지자체, 소상공인 대상 친절 응대 교육 지원",
      "직장인 스트레스 관리 위한 '마음건강 상담' 확대",
      "생활밀착 스타트업, 직장인 대상 서비스 잇단 출시",
      "기업문화 개선 사례 공유 확산... 자발적 참여 늘어",
      "재택·출근 혼합 근무, 중견기업까지 확대 움직임",
      "사내 커뮤니케이션 플랫폼 고도화 추진",
    ],
  },
};

const createPress = (
  id: string,
  name: string,
  category: PressCategory,
  subscribed = false,
  wordmark: Wordmark = {},
): Press => {
  const story = storyOverrides[id] ?? storyTemplates[category];

  return {
    id,
    name,
    category,
    subscribed,
    editedAt: story.editedAt,
    headline: story.headline,
    articles: story.articles,
    wordmark,
  };
};

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
  createPress("seoul-economy", "서울경제", "종합/경제", true, { weight: 700 }),
  createPress("dailian", "데일리안", "종합/경제", false, { color: "#1d3e72" }),
  createPress("herald", "헤럴드경제", "종합/경제", true, {
    color: "#164b83",
    weight: 700,
  }),
  createPress("sbs-biz", "SBS Biz", "방송/통신", true, {
    color: "#3057a6",
    latin: true,
    weight: 700,
  }),
  createPress("segye", "세계일보", "종합/경제", false, {
    family: "serif",
    weight: 700,
  }),
  createPress("asia-economy", "아시아경제", "종합/경제", true, {
    color: "#1d55a4",
    flag: true,
  }),
  createPress("edaily", "이데일리", "종합/경제", false, { color: "#1d3d83" }),
  createPress("chosun", "朝鮮日報", "종합/경제", false, {
    family: "serif",
    tracking: "0.08em",
    weight: 700,
  }),
  createPress("inews24", "아이뉴스24", "IT", false, {
    accent: "#e5484d",
    accentChar: 4,
    weight: 700,
  }),
  createPress("fn-news", "파이낸셜뉴스", "종합/경제", false, { weight: 700 }),
  createPress("sports-seoul", "스포츠서울", "스포츠/연예", false, {
    color: "#2c7d4d",
    italic: true,
  }),
  createPress("sports-donga", "스포츠동아", "스포츠/연예", false, {
    color: "#236fc5",
    weight: 700,
  }),
  createPress("munhwa", "석간 문화일보", "종합/경제", true, {
    family: "serif",
    weight: 700,
  }),
  createPress("kbs-world", "KBS WORLD", "방송/통신", true, {
    bg: "#203864",
    color: "#ffffff",
    latin: true,
    small: true,
    weight: 700,
  }),
  createPress("korea-joongang", "Korea JoongAng Daily", "종합/경제", true, {
    family: "serif",
    latin: true,
    small: true,
  }),
  createPress("insight", "Insight", "매거진/전문지", true, {
    family: "serif",
    italic: true,
    latin: true,
  }),
  createPress("lawtv", "법률방송뉴스", "방송/통신", false, { weight: 700 }),
  createPress("sisajournal", "시사저널e.", "종합/경제", false, {
    color: "#d14235",
    latin: true,
  }),
  createPress("rural", "한국농어촌방송", "방송/통신", false, { small: true }),
  createPress("joynews", "조이뉴스24", "스포츠/연예", false, {
    color: "#db4a2b",
    weight: 700,
  }),
  createPress("energy", "에너지경제", "종합/경제", false, { color: "#2f8a55" }),
  createPress("business-post", "BUSINESS POST", "종합/경제", false, {
    latin: true,
    small: true,
    weight: 700,
  }),
  createPress("ceoscore", "CEO스코어데일리", "종합/경제", false, {
    latin: true,
    small: true,
  }),
  createPress("knn", "KNN", "지역", false, {
    color: "#f05a28",
    latin: true,
    weight: 700,
  }),
  createPress("korea-herald", "The Korea Herald", "종합/경제", false, {
    color: "#153b6f",
    latin: true,
    small: true,
  }),
  createPress("mbc", "MBC", "방송/통신", false, {
    color: "#1f62b6",
    latin: true,
    weight: 700,
  }),
  createPress("newstapa", "뉴스타파", "종합/경제", false, { weight: 700 }),
  createPress("newdaily", "NewDaily", "종합/경제", false, {
    color: "#c43e32",
    latin: true,
  }),
  createPress("kmib", "국민일보", "종합/경제", false, { family: "serif" }),
  createPress("daily-sports", "일간스포츠", "스포츠/연예", false, {
    color: "#2969ad",
  }),
  createPress("khan", "경향신문", "종합/경제", false, { family: "serif" }),
  createPress("zdnet", "ZDNET Korea", "IT", false, {
    color: "#c53b2c",
    latin: true,
    small: true,
  }),
  createPress("mydaily", "mydaily", "스포츠/연예", false, {
    color: "#d7462c",
    latin: true,
  }),
  createPress("moneytoday", "MT 머니투데이", "종합/경제", false, {
    color: "#254e9b",
    latin: true,
  }),
  createPress("sbs", "SBS", "방송/통신", false, {
    color: "#2a56a4",
    latin: true,
    weight: 700,
  }),
  createPress("ohmynews", "OhmyNews", "종합/경제", false, {
    color: "#d94330",
    latin: true,
  }),
  createPress("mk", "매일경제", "종합/경제", false, { weight: 700 }),
  createPress("mbn", "MBN", "방송/통신", false, {
    color: "#284f9e",
    latin: true,
    weight: 700,
  }),
  createPress("ytn", "YTN", "방송/통신", false, {
    color: "#1d67b1",
    latin: true,
    weight: 700,
  }),
  createPress("sisaweek", "시사위크", "종합/경제", false, { color: "#2f5d8f" }),
  createPress("digital-today", "Digital Today", "IT", false, {
    color: "#366ab2",
    latin: true,
    small: true,
  }),
  createPress("datanews", "dataNews", "종합/경제", false, {
    color: "#d34830",
    latin: true,
  }),
  createPress("university", "한국대학신문", "종합/경제", false, { small: true }),
  createPress("seoul-finance", "서울파이낸스", "종합/경제", false, {
    color: "#244b91",
  }),
  createPress("xports", "엑스포츠뉴스", "스포츠/연예", false, { color: "#1c72b4" }),
  createPress("maxmovie", "맥스무비", "스포츠/연예", false, { weight: 700 }),
  createPress("obs", "OBS", "지역", false, {
    color: "#2567af",
    latin: true,
    weight: 700,
  }),
  createPress("boy-korea", "소년한국일보", "종합/경제", false, { small: true }),
];
