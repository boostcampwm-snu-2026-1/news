import type { ReactNode, SVGProps } from 'react';

export type PressLogoId = keyof typeof LOGO_SPECS;
export type PressLogoProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'> & {
  pressId: string;
  fallbackName?: string;
};

interface LogoSpec {
  label: string;
  content: ReactNode;
}

const LOGO_SPECS = {
  'seoul-economy': {
    label: '서울경제',
    content: (
      <text x="90" y="34" textAnchor="middle" fontFamily="serif" fontSize="22" fontWeight="700" fill="#111827">
        서울경제
      </text>
    ),
  },
  dailyan: {
    label: '데일리안',
    content: (
      <text x="90" y="34" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="800" fill="#111827">
        데일리안
      </text>
    ),
  },
  'world-news': {
    label: '세계일보',
    content: (
      <text x="90" y="34" textAnchor="middle" fontFamily="serif" fontSize="21" fontWeight="700" fill="#111827">
        세계일보
      </text>
    ),
  },
  'asia-economy': {
    label: '아시아경제',
    content: (
      <>
        <text x="82" y="34" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#111827">
          아시아경제
        </text>
        <path d="M134 24h12l-3 4 3 4h-12z" fill="#d7192a" />
      </>
    ),
  },
  'financial-news': {
    label: '파이낸셜뉴스',
    content: (
      <>
        <text x="82" y="34" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#111827">
          파이낸셜뉴
        </text>
        <text x="139" y="34" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#e11d48">
          스
        </text>
      </>
    ),
  },
  chosun: {
    label: '조선일보',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="serif" fontSize="23" fontWeight="700" letterSpacing={5} fill="#111827">
        朝鮮日報
      </text>
    ),
  },
  hankyoreh: {
    label: '한겨레',
    content: (
      <text x="90" y="36" textAnchor="middle" fontFamily="serif" fontSize="28" fontWeight="800" fill="#2f5f46">
        한겨레
      </text>
    ),
  },
  edaily: {
    label: '이데일리',
    content: (
      <>
        <rect x="45" y="19" width="90" height="28" rx="3" fill="#e4002b" />
        <text x="90" y="39" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#ffffff">
          이데일리
        </text>
      </>
    ),
  },
  munhwa: {
    label: '석간 문화일보',
    content: (
      <>
        <text x="62" y="35" textAnchor="middle" fontFamily="serif" fontSize="19" fontWeight="700" fill="#111827">
          석간
        </text>
        <text x="105" y="35" textAnchor="middle" fontFamily="serif" fontSize="20" fontWeight="800" fill="#d7192a">
          문화
        </text>
        <text x="143" y="35" textAnchor="middle" fontFamily="serif" fontSize="19" fontWeight="700" fill="#111827">
          일보
        </text>
      </>
    ),
  },
  'energy-economy': {
    label: '에너지경제',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="900" fill="#111827">
        에너지경제
      </text>
    ),
  },
  'sbs-biz': {
    label: 'SBS Biz',
    content: (
      <>
        <text x="75" y="36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="23" fontWeight="800" letterSpacing={4} fill="#0057b8">
          SBS
        </text>
        <text x="123" y="36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="800" fill="#f59e0b">
          Biz
        </text>
      </>
    ),
  },
  'kbs-world': {
    label: 'KBS WORLD',
    content: (
      <>
        <rect x="30" y="19" width="120" height="28" rx="2" fill="#0073c8" />
        <text x="90" y="38" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="800" letterSpacing={4} fill="#ffffff">
          KBS WORLD
        </text>
      </>
    ),
  },
  mbc: {
    label: 'MBC',
    content: (
      <>
        <text x="62" y="39" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="31" fontWeight="900" fill="#1d4ed8">
          M
        </text>
        <text x="91" y="39" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="31" fontWeight="900" fill="#dc2626">
          B
        </text>
        <text x="120" y="39" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="31" fontWeight="900" fill="#16a34a">
          C
        </text>
      </>
    ),
  },
  ytn: {
    label: 'YTN',
    content: (
      <text x="90" y="39" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="900" letterSpacing={4} fill="#0b5cab">
        YTN
      </text>
    ),
  },
  'tv-chosun': {
    label: 'TV조선',
    content: (
      <>
        <text x="63" y="36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="900" fill="#1d4ed8">
          TV
        </text>
        <text x="112" y="36" textAnchor="middle" fontFamily="serif" fontSize="25" fontWeight="800" fill="#dc2626">
          조선
        </text>
      </>
    ),
  },
  inews24: {
    label: '아이뉴스24',
    content: (
      <>
        <text x="78" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="900" fill="#005bac">
          아이뉴스
        </text>
        <text x="132" y="35" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="900" fill="#005bac">
          24
        </text>
      </>
    ),
  },
  zdnet: {
    label: '지디넷코리아',
    content: (
      <>
        <text x="57" y="36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="23" fontWeight="900" fill="#e11d48">
          ZD
        </text>
        <text x="112" y="36" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#111827">
          넷코리아
        </text>
      </>
    ),
  },
  joynews24: {
    label: '조이뉴스24',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="900" letterSpacing={2} fill="#111827">
        조이뉴스24
      </text>
    ),
  },
  etnews: {
    label: '전자신문',
    content: (
      <>
        <text x="72" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="900" fill="#111827">
          전자
        </text>
        <text x="116" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="900" fill="#00843d">
          신문
        </text>
      </>
    ),
  },
  dt: {
    label: '디지털타임스',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#173a66">
        디지털타임스
      </text>
    ),
  },
  'sports-seoul': {
    label: '스포츠서울',
    content: (
      <>
        <text x="90" y="34" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="900" fontStyle="italic" fill="#111827">
          스포츠서울
        </text>
        <line x1="48" y1="40" x2="132" y2="40" stroke="#111827" strokeWidth="1.5" />
      </>
    ),
  },
  'sports-donga': {
    label: '스포츠동아',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="900" fill="#111827">
        스포츠동아
      </text>
    ),
  },
  'ilgan-sports': {
    label: '일간스포츠',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="900" fill="#f97316">
        일간스포츠
      </text>
    ),
  },
  mydaily: {
    label: '마이데일리',
    content: (
      <>
        <text x="74" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="900" fill="#111827">
          마이
        </text>
        <text x="120" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="900" fill="#7c3aed">
          데일리
        </text>
      </>
    ),
  },
  herald: {
    label: '헤럴드경제',
    content: (
      <>
        <text x="55" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#00a9ce">
          헤
        </text>
        <text x="101" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#111827">
          럴드경제
        </text>
        <circle cx="145" cy="25" r="3" fill="#e11d48" />
      </>
    ),
  },
  'joongang-daily': {
    label: 'Korea JoongAng Daily',
    content: (
      <>
        <text x="90" y="29" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" letterSpacing={4} fill="#111827">
          KoreaJoongAn
        </text>
        <text x="90" y="47" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" letterSpacing={4} fill="#111827">
          gDaily
        </text>
      </>
    ),
  },
  insight: {
    label: 'Insight',
    content: (
      <text x="90" y="37" textAnchor="middle" fontFamily="Georgia, serif" fontSize="23" fontStyle="italic" letterSpacing={3} fill="#d7192a">
        Insight
      </text>
    ),
  },
  'sisa-journal': {
    label: '시사저널e.',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="900" letterSpacing={2} fill="#d7192a">
        시사저널e.
      </text>
    ),
  },
  'business-post': {
    label: 'BUSINESS POST',
    content: (
      <>
        <text x="90" y="29" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" letterSpacing={5} fill="#111827">
          BUSINESS PO
        </text>
        <text x="90" y="47" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" letterSpacing={5} fill="#111827">
          ST
        </text>
      </>
    ),
  },
  'law-news': {
    label: '법률방송뉴스',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#111827">
        법률방송뉴스
      </text>
    ),
  },
  'ceo-score': {
    label: 'CEO스코어데일리',
    content: (
      <>
        <text x="60" y="30" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="900" letterSpacing={4} fill="#0084d6">
          CEO
        </text>
        <text x="109" y="30" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="900" fill="#0084d6">
          스코어데일
        </text>
        <text x="119" y="49" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="900" fill="#0084d6">
          리
        </text>
      </>
    ),
  },
  knn: {
    label: 'KNN',
    content: (
      <text x="90" y="38" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="900" letterSpacing={5} fill="#d7192a">
        KNN
      </text>
    ),
  },
  'agro-news': {
    label: '한국농어촌방송',
    content: (
      <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="19" fontWeight="800" fill="#111827">
        한국농어촌방송
      </text>
    ),
  },
} satisfies Record<string, LogoSpec>;

export function PressLogo({ pressId, fallbackName, className = 'h-full w-full', ...props }: PressLogoProps) {
  const spec = LOGO_SPECS[pressId as PressLogoId];
  const label = spec?.label ?? fallbackName ?? pressId;

  return (
    <svg
      {...props}
      viewBox="0 0 180 64"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={props['aria-label'] ?? label}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      {spec?.content ?? (
        <text x="90" y="35" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="800" fill="#111827">
          {label}
        </text>
      )}
    </svg>
  );
}

export default PressLogo;

