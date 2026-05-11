"use strict";

const { useEffect, useMemo, useState } = React;
const h = React.createElement;

const presses = [
  { name: "SBS Biz", category: "방송/통신", style: "biz", flag: "S" },
  { name: "아주경제", category: "종합/경제", style: "underline", flag: "A" },
  { name: "매일경제", category: "경제", style: "", flag: "M" },
  { name: "한겨레", category: "종합", style: "light", flag: "H" },
  { name: "한국일보", category: "종합", style: "", flag: "K" },
  { name: "연합뉴스", category: "통신", style: "underline", flag: "Y" },
  { name: "조선일보", category: "종합", style: "", flag: "C" },
  { name: "중앙일보", category: "종합", style: "light", flag: "J" },
  { name: "동아일보", category: "종합", style: "", flag: "D" },
  { name: "서울경제", category: "경제", style: "biz", flag: "E" },
  { name: "전자신문", category: "IT", style: "", flag: "T" },
  { name: "스포츠서울", category: "스포츠", style: "underline", flag: "P" },
  { name: "KBS", category: "방송", style: "", flag: "K" },
  { name: "MBC", category: "방송", style: "light", flag: "M" },
  { name: "JTBC", category: "방송", style: "", flag: "J" },
  { name: "머니투데이", category: "경제", style: "biz", flag: "N" },
  { name: "이데일리", category: "경제", style: "", flag: "I" },
  { name: "경향신문", category: "종합", style: "underline", flag: "G" },
  { name: "문화일보", category: "종합", style: "", flag: "W" },
  { name: "헤럴드경제", category: "경제", style: "light", flag: "R" },
  { name: "ZDNet Korea", category: "IT", style: "biz", flag: "Z" },
  { name: "블로터", category: "IT", style: "", flag: "B" },
  { name: "비즈워치", category: "경제", style: "underline", flag: "V" },
  { name: "코리아중앙", category: "영문", style: "light", flag: "K" },
  { name: "뉴스1", category: "통신", style: "", flag: "1" },
  { name: "뉴시스", category: "통신", style: "biz", flag: "N" },
  { name: "세계일보", category: "종합", style: "", flag: "S" },
  { name: "국민일보", category: "종합", style: "underline", flag: "G" },
  { name: "파이낸셜뉴스", category: "경제", style: "", flag: "F" },
  { name: "디지털타임스", category: "IT", style: "light", flag: "D" },
  { name: "스포츠조선", category: "스포츠", style: "", flag: "S" },
  { name: "OSEN", category: "스포츠", style: "biz", flag: "O" },
  { name: "데일리안", category: "종합", style: "", flag: "D" },
  { name: "프레시안", category: "종합", style: "underline", flag: "P" },
  { name: "아이뉴스24", category: "IT", style: "", flag: "I" },
  { name: "한국경제", category: "경제", style: "light", flag: "K" },
  { name: "시사저널", category: "시사", style: "", flag: "S" },
  { name: "노컷뉴스", category: "방송/통신", style: "biz", flag: "N" },
  { name: "쿠키뉴스", category: "종합", style: "", flag: "C" },
  { name: "더팩트", category: "종합", style: "underline", flag: "T" },
  { name: "오마이뉴스", category: "종합", style: "", flag: "O" },
  { name: "미디어오늘", category: "미디어", style: "light", flag: "M" },
  { name: "씨네21", category: "문화", style: "", flag: "C" },
  { name: "마이데일리", category: "연예", style: "biz", flag: "M" },
  { name: "스포츠경향", category: "스포츠", style: "", flag: "S" },
  { name: "코메디닷컴", category: "건강", style: "underline", flag: "C" },
  { name: "월간산", category: "라이프", style: "", flag: "W" },
  { name: "여성신문", category: "사회", style: "light", flag: "W" },
  { name: "기자협회보", category: "미디어", style: "", flag: "K" },
  { name: "비마이너", category: "사회", style: "biz", flag: "B" },
  { name: "녹색경제", category: "경제", style: "", flag: "G" },
  { name: "투데이신문", category: "종합", style: "underline", flag: "T" },
  { name: "더스쿠프", category: "경제", style: "", flag: "S" },
  { name: "테크M", category: "IT", style: "light", flag: "T" },
  { name: "코인데스크", category: "경제", style: "", flag: "C" },
  { name: "더벨", category: "경제", style: "biz", flag: "B" },
  { name: "뉴스핌", category: "종합", style: "", flag: "N" },
  { name: "브릿지경제", category: "경제", style: "underline", flag: "B" },
  { name: "일간스포츠", category: "스포츠", style: "", flag: "I" },
  { name: "스타뉴스", category: "연예", style: "light", flag: "S" },
  { name: "엑스포츠뉴스", category: "스포츠", style: "", flag: "X" },
  { name: "뉴스토마토", category: "경제", style: "biz", flag: "T" },
  { name: "데이터뉴스", category: "경제", style: "", flag: "D" },
  { name: "시사IN", category: "시사", style: "underline", flag: "I" },
  { name: "주간동아", category: "시사", style: "", flag: "D" },
  { name: "한경비즈니스", category: "경제", style: "light", flag: "H" },
  { name: "월간조선", category: "시사", style: "", flag: "C" },
  { name: "이코노미스트", category: "경제", style: "biz", flag: "E" },
  { name: "캠퍼스잡앤조이", category: "라이프", style: "", flag: "J" },
  { name: "법률신문", category: "전문", style: "underline", flag: "L" },
  { name: "약업신문", category: "전문", style: "", flag: "Y" },
  { name: "농민신문", category: "전문", style: "light", flag: "N" },
];

const pageSize = 24;
const articleTabs = ["주요뉴스", "많이 본 뉴스", "최신"];
const defaultSubscribed = [0, 1, 10, 20, 35, 53, 64, 68, 70];
const savedSubscribed = readSavedSubscribed();

function readSavedSubscribed() {
  try {
    const saved = JSON.parse(localStorage.getItem("newsstand.subscribed") || "null");
    return Array.isArray(saved) ? saved : null;
  } catch {
    return null;
  }
}

function makeArticles(press, tab) {
  const lead = [
    `${press.name}, 오늘의 주요 이슈를 한눈에 정리`,
    `시장 흐름 바꾼 새 발표... 업계 반응은`,
    `현장 취재로 본 정책 변화의 다음 장면`,
    `주요 인물 발언에 관심 집중`,
    `독자가 많이 찾은 심층 분석 리포트`,
  ];
  const popular = [
    `${press.category} 분야에서 가장 많이 읽힌 기사`,
    `숫자로 보는 오늘의 변화와 쟁점`,
    `댓글 많은 뉴스, 핵심만 빠르게 보기`,
    `오전 브리핑 이후 달라진 흐름`,
    `이번 주 독자 선택 기사 모음`,
  ];
  const latest = [
    `${press.name} 방금 전 업데이트된 속보`,
    `새 자료 공개... 후속 보도 예고`,
    `관계자 설명으로 풀어본 배경`,
    `오후 일정 앞두고 긴장감 높아져`,
    `다음 페이지 전환 전 마지막 기사`,
  ];
  return [lead, popular, latest][tab];
}

function pressClassName(press) {
  return `wordmark ${press.style}`.trim();
}

function App() {
  const [activeView, setActiveView] = useState("grid");
  const [page, setPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeArticleTab, setActiveArticleTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [subscribed, setSubscribed] = useState(
    () => new Set(Array.isArray(savedSubscribed) ? savedSubscribed : defaultSubscribed),
  );

  const isListView = activeView === "list";
  const visiblePresses = useMemo(() => {
    if (activeView === "subscribed") {
      return presses.filter((_, index) => subscribed.has(index));
    }
    return presses;
  }, [activeView, subscribed]);

  const totalPages = Math.max(1, Math.ceil(visiblePresses.length / pageSize));
  const pageItems = visiblePresses.slice(page * pageSize, page * pageSize + pageSize);
  const selectedPress = presses[selectedIndex] || presses[0];
  const selectedArticles = makeArticles(selectedPress, activeArticleTab);

  useEffect(() => {
    localStorage.setItem("newsstand.subscribed", JSON.stringify([...subscribed]));
  }, [subscribed]);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress >= 100) {
          setActiveArticleTab((currentTab) => (currentTab + 1) % articleTabs.length);
          return 0;
        }
        return currentProgress + 2;
      });
    }, 160);
    return () => window.clearInterval(timer);
  }, []);

  function changeView(nextView) {
    setActiveView(nextView);
    setPage(0);
  }

  function selectPress(index) {
    setSelectedIndex(index);
    setActiveArticleTab(0);
    setProgress(0);
  }

  function toggleSubscribed(index = selectedIndex) {
    setSubscribed((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function changeArticleTab(index) {
    setActiveArticleTab(index);
    setProgress(0);
  }

  return h(
    "main",
    { className: "app-shell" },
    h(Header, { subscribedCount: subscribed.size }),
    h(ViewTabs, { activeView, onChangeView: changeView }),
    h(
      "section",
      { className: "portal-layout", "aria-live": "polite" },
      h(
        "section",
        { className: "press-panel", "aria-label": "언론사 목록" },
        h(PanelHead, {
          activeView,
          page,
          totalPages,
          totalCount: visiblePresses.length,
        }),
        isListView
          ? h(PressList, {
              subscribed,
              onSelectPress: selectPress,
              onToggleSubscribed: toggleSubscribed,
              selectedIndex,
            })
          : pageItems.length === 0
            ? h("div", { className: "empty-state" }, "구독한 언론사가 없습니다.")
            : h(PressGrid, {
                pageItems,
                subscribed,
                selectedIndex,
                onSelectPress: selectPress,
                onToggleSubscribed: toggleSubscribed,
              }),
        !isListView &&
          h(Pager, {
            page,
            totalPages,
            onPrev: () => setPage((currentPage) => Math.max(0, currentPage - 1)),
            onNext: () => setPage((currentPage) => Math.min(totalPages - 1, currentPage + 1)),
          }),
      ),
      h(ArticlePanel, {
        activeArticleTab,
        articles: selectedArticles,
        isSubscribed: subscribed.has(selectedIndex),
        onChangeArticleTab: changeArticleTab,
        onToggleSubscribed: () => toggleSubscribed(selectedIndex),
        press: selectedPress,
        progress,
      }),
    ),
  );
}

function Header({ subscribedCount }) {
  return h(
    "header",
    { className: "topbar" },
    h("div", null, h("p", { className: "eyebrow" }, "NEWSSTAND"), h("h1", null, "뉴스스탠드")),
    h("div", { className: "summary" }, h("span", null, subscribedCount), h("small", null, "구독 중")),
  );
}

function ViewTabs({ activeView, onChangeView }) {
  const tabs = [
    ["grid", "전체 언론사"],
    ["subscribed", "내가 구독한 언론사"],
    ["list", "리스트 보기"],
  ];
  return h(
    "nav",
    { className: "view-tabs", "aria-label": "뉴스스탠드 보기 방식" },
    tabs.map(([view, label]) =>
      h(
        "button",
        {
          key: view,
          className: `tab-button${activeView === view ? " active" : ""}`,
          type: "button",
          "aria-pressed": activeView === view,
          onClick: () => onChangeView(view),
        },
        label,
      ),
    ),
  );
}

function PanelHead({ activeView, page, totalPages, totalCount }) {
  const title = {
    grid: "전체 언론사",
    subscribed: "내가 구독한 언론사",
    list: "언론사 리스트",
  }[activeView];
  return h(
    "div",
    { className: "panel-head" },
    h("strong", null, title),
    h("span", null, activeView === "list" ? `${totalCount}개` : `${page + 1} / ${totalPages}`),
  );
}

function PressGrid({ pageItems, subscribed, selectedIndex, onSelectPress, onToggleSubscribed }) {
  return h(
    "div",
    { className: "press-grid" },
    pageItems.map((press) => {
      const realIndex = presses.indexOf(press);
      const isSubscribed = subscribed.has(realIndex);
      return h(PressCell, {
        key: press.name,
        isSelected: realIndex === selectedIndex,
        isSubscribed,
        onSelect: () => onSelectPress(realIndex),
        onToggleSubscribed: () => onToggleSubscribed(realIndex),
        press,
      });
    }),
  );
}

function PressCell({ isSelected, isSubscribed, onSelect, onToggleSubscribed, press }) {
  return h(
    "div",
    { className: `press-cell${isSubscribed ? " subscribed" : ""}${isSelected ? " selected" : ""}` },
    h(
      "button",
      { className: "press-select", type: "button", onClick: onSelect },
      h("span", { className: pressClassName(press) }, h("span", { className: "flag" }, press.flag), press.name),
    ),
    h(
      "button",
      {
        className: "cell-action",
        type: "button",
        onClick: onToggleSubscribed,
        "aria-label": `${press.name} ${isSubscribed ? "구독 해지" : "구독"}`,
      },
      isSubscribed ? "해지하기" : "구독하기",
    ),
  );
}

function PressList({ subscribed, selectedIndex, onSelectPress, onToggleSubscribed }) {
  return h(
    "ul",
    { className: "press-list" },
    presses.map((press, index) =>
      h(
        "li",
        { key: press.name, className: index === selectedIndex ? "selected" : "" },
        h(
          "button",
          { className: "list-press-button", type: "button", onClick: () => onSelectPress(index) },
          h("span", { className: pressClassName(press) }, h("span", { className: "flag" }, press.flag), press.name),
          h("small", null, press.category),
        ),
        h(
          "button",
          {
            className: `subscribe-button small${subscribed.has(index) ? " active" : ""}`,
            type: "button",
            onClick: () => onToggleSubscribed(index),
          },
          subscribed.has(index) ? "구독 중" : "구독",
        ),
      ),
    ),
  );
}

function Pager({ page, totalPages, onPrev, onNext }) {
  return h(
    "div",
    { className: "pager", "aria-label": "페이지 이동" },
    h("button", { className: "icon-button", type: "button", "aria-label": "이전 페이지", disabled: page === 0, onClick: onPrev }, "‹"),
    h(
      "div",
      { className: "dots" },
      Array.from({ length: totalPages }, (_, index) =>
        h("span", { key: index, className: `dot${index === page ? " active" : ""}` }),
      ),
    ),
    h(
      "button",
      { className: "icon-button", type: "button", "aria-label": "다음 페이지", disabled: page === totalPages - 1, onClick: onNext },
      "›",
    ),
  );
}

function ArticlePanel({ activeArticleTab, articles, isSubscribed, onChangeArticleTab, onToggleSubscribed, press, progress }) {
  return h(
    "aside",
    { className: "article-panel", "aria-label": "선택한 언론사 기사" },
    h(
      "div",
      { className: "selected-press" },
      h("span", { className: "press-flag" }, press.flag),
      h("div", null, h("p", null, press.category), h("h2", null, press.name)),
      h(
        "button",
        {
          className: `subscribe-button${isSubscribed ? " active" : ""}`,
          type: "button",
          onClick: onToggleSubscribed,
        },
        isSubscribed ? "구독 중" : "구독하기",
      ),
    ),
    h(
      "div",
      { className: "progress-tabs", role: "tablist", "aria-label": "기사 분류" },
      articleTabs.map((label, index) =>
        h(
          "button",
          {
            key: label,
            className: `progress-tab${index === activeArticleTab ? " active" : ""}`,
            type: "button",
            role: "tab",
            "aria-selected": index === activeArticleTab,
            style: { "--progress": `${index === activeArticleTab ? progress : 0}%` },
            onClick: () => onChangeArticleTab(index),
          },
          label,
        ),
      ),
    ),
    h(
      "ol",
      { className: "article-list" },
      articles.map((title, index) =>
        h("li", { key: title }, h("span", null, String(index + 1).padStart(2, "0")), h("a", { href: "#" }, title)),
      ),
    ),
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(h(App));
