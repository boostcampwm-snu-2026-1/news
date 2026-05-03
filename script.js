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
let page = 0;
let selectedIndex = 0;
let activeView = "grid";
let activeArticleTab = 0;
let progress = 0;
const subscribed = new Set([0, 1, 10, 20, 35, 53, 64, 68, 70]);

const grid = document.querySelector("#press-grid");
const dots = document.querySelector("#page-dots");
const pageLabel = document.querySelector("#page-label");
const gridTitle = document.querySelector("#grid-title");
const count = document.querySelector("#subscribed-count");
const selectedFlag = document.querySelector("#selected-flag");
const selectedCategory = document.querySelector("#selected-category");
const selectedName = document.querySelector("#selected-name");
const subscribeButton = document.querySelector("#toggle-subscribe");
const progressTabs = document.querySelector("#progress-tabs");
const articleList = document.querySelector("#article-list");

function visiblePresses() {
  if (activeView === "subscribed") {
    return presses.filter((_, index) => subscribed.has(index));
  }
  return presses;
}

function renderGrid() {
  const list = visiblePresses();
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  page = Math.min(page, totalPages - 1);
  const offset = page * pageSize;
  const pageItems = list.slice(offset, offset + pageSize);

  gridTitle.textContent = activeView === "subscribed" ? "내가 구독한 언론사" : "전체 언론사";
  pageLabel.textContent = `${page + 1} / ${totalPages}`;
  grid.innerHTML = "";

  pageItems.forEach((press) => {
    const realIndex = presses.indexOf(press);
    const item = document.createElement("div");
    const action = subscribed.has(realIndex) ? "해지하기" : "구독하기";
    item.className = `press-cell${subscribed.has(realIndex) ? " subscribed" : ""}${realIndex === selectedIndex ? " selected" : ""}`;
    item.dataset.index = realIndex;
    item.innerHTML = `
      <button class="press-select" type="button">
        <span class="wordmark ${press.style}">
          <span class="flag">${press.flag}</span>
          ${press.name}
        </span>
      </button>
      <button class="cell-action" type="button">${action}</button>
    `;
    item.querySelector(".press-select").addEventListener("click", () => {
      selectedIndex = realIndex;
      activeArticleTab = 0;
      progress = 0;
      render();
    });
    item.querySelector(".cell-action").addEventListener("click", () => toggleSubscribed(realIndex));
    grid.append(item);
  });

  dots.innerHTML = "";
  Array.from({ length: totalPages }, (_, index) => {
    const dot = document.createElement("span");
    dot.className = `dot${index === page ? " active" : ""}`;
    dots.append(dot);
  });
}

function renderArticles() {
  const press = presses[selectedIndex];
  selectedFlag.textContent = press.flag;
  selectedCategory.textContent = press.category;
  selectedName.textContent = press.name;
  subscribeButton.textContent = subscribed.has(selectedIndex) ? "구독 중" : "구독하기";
  subscribeButton.classList.toggle("active", subscribed.has(selectedIndex));

  progressTabs.innerHTML = "";
  ["주요뉴스", "많이 본 뉴스", "최신"].forEach((label, index) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = `progress-tab${index === activeArticleTab ? " active" : ""}`;
    tab.textContent = label;
    tab.style.setProperty("--progress", `${index === activeArticleTab ? progress : 0}%`);
    tab.addEventListener("click", () => {
      activeArticleTab = index;
      progress = 0;
      renderArticles();
    });
    progressTabs.append(tab);
  });

  articleList.innerHTML = "";
  makeArticles(press, activeArticleTab).forEach((title, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><a href="#">${title}</a>`;
    articleList.append(item);
  });
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

function toggleSubscribed(index = selectedIndex) {
  if (subscribed.has(index)) {
    subscribed.delete(index);
  } else {
    subscribed.add(index);
  }
  if (activeView === "subscribed" && !subscribed.size) {
    activeView = "grid";
  }
  render();
}

function render() {
  count.textContent = subscribed.size;
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === activeView);
  });
  renderGrid();
  renderArticles();
}

document.querySelector("#prev-page").addEventListener("click", () => {
  page = Math.max(0, page - 1);
  renderGrid();
});

document.querySelector("#next-page").addEventListener("click", () => {
  const totalPages = Math.max(1, Math.ceil(visiblePresses().length / pageSize));
  page = Math.min(totalPages - 1, page + 1);
  renderGrid();
});

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeView = button.dataset.view;
    page = 0;
    render();
  });
});

subscribeButton.addEventListener("click", () => toggleSubscribed());

setInterval(() => {
  progress += 2;
  if (progress > 100) {
    progress = 0;
    activeArticleTab = (activeArticleTab + 1) % 3;
  }
  renderArticles();
}, 160);

render();
