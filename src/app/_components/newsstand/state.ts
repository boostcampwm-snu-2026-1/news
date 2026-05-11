import {
  pressCategories,
  type Press,
  type PressCategory,
} from "../../_data/newsstand";

export const PAGE_SIZE = 24;
export const AUTO_ROTATE_MS = 6000;

export type NewsstandTab = "all" | "subscribed";
export type ViewMode = "grid" | "list";

export type ListIndexMap = Record<PressCategory, number>;

export type NewsstandState = {
  presses: Press[];
  activeTab: NewsstandTab;
  viewMode: ViewMode;
  page: number;
  activeCategory: PressCategory;
  listIndexByCategory: ListIndexMap;
  listTick: number;
};

export type NewsstandAction =
  | { type: "change-tab"; tab: NewsstandTab }
  | { type: "change-view"; viewMode: ViewMode }
  | { type: "change-page"; page: number }
  | { type: "toggle-subscription"; id: string }
  | { type: "select-category"; category: PressCategory }
  | { type: "advance-list" }
  | { type: "open-press"; id: string };

export type DerivedNewsstandState = {
  subscribedCount: number;
  visiblePresses: Press[];
  totalPages: number;
  safePage: number;
  pagePresses: Press[];
  pressesByCategory: Record<PressCategory, Press[]>;
  selectedPress?: Press;
  activeCategoryPresses: Press[];
  activeListIndex: number;
  progressLabel: string;
  progressKey: string;
};

export function createInitialNewsstandState(
  presses: Press[],
): NewsstandState {
  return normalizeState({
    presses,
    activeTab: "all",
    viewMode: "grid",
    page: 0,
    activeCategory: pressCategories[0],
    listIndexByCategory: createListIndexMap(),
    listTick: 0,
  });
}

export function newsstandReducer(
  state: NewsstandState,
  action: NewsstandAction,
): NewsstandState {
  switch (action.type) {
    case "change-tab":
      return normalizeState({
        ...state,
        activeTab: action.tab,
        page: 0,
        listTick: state.listTick + 1,
      });
    case "change-view":
      return normalizeState({
        ...state,
        viewMode: action.viewMode,
        listTick:
          action.viewMode === "list" ? state.listTick + 1 : state.listTick,
      });
    case "change-page":
      return normalizeState({
        ...state,
        page: action.page,
      });
    case "toggle-subscription":
      return normalizeState({
        ...state,
        presses: state.presses.map((press) =>
          press.id === action.id
            ? { ...press, subscribed: !press.subscribed }
            : press,
        ),
        listTick: state.listTick + 1,
      });
    case "select-category": {
      const visiblePresses = getVisiblePresses(state.presses, state.activeTab);
      const pressesByCategory = groupPressesByCategory(visiblePresses);

      if (pressesByCategory[action.category].length === 0) {
        return normalizeState(state);
      }

      return normalizeState({
        ...state,
        activeCategory: action.category,
        listTick: state.listTick + 1,
      });
    }
    case "advance-list": {
      const normalized = normalizeState(state);
      const derived = deriveNewsstandState(normalized);
      const total = derived.activeCategoryPresses.length;

      if (total === 0) {
        return normalized;
      }

      return normalizeState({
        ...normalized,
        listIndexByCategory: {
          ...normalized.listIndexByCategory,
          [normalized.activeCategory]: (derived.activeListIndex + 1) % total,
        },
        listTick: normalized.listTick + 1,
      });
    }
    case "open-press": {
      const visiblePresses = getVisiblePresses(state.presses, state.activeTab);
      const target = visiblePresses.find((press) => press.id === action.id);

      if (!target) {
        return normalizeState({
          ...state,
          viewMode: "list",
          listTick: state.listTick + 1,
        });
      }

      const targetIndex = groupPressesByCategory(visiblePresses)[
        target.category
      ].findIndex((press) => press.id === action.id);

      return normalizeState({
        ...state,
        viewMode: "list",
        activeCategory: target.category,
        listIndexByCategory: {
          ...state.listIndexByCategory,
          [target.category]: targetIndex,
        },
        listTick: state.listTick + 1,
      });
    }
    default:
      return state;
  }
}

export function deriveNewsstandState(
  state: NewsstandState,
): DerivedNewsstandState {
  const normalized = normalizeState(state);
  const visiblePresses = getVisiblePresses(
    normalized.presses,
    normalized.activeTab,
  );
  const { totalPages, safePage, pagePresses } = paginatePresses(
    visiblePresses,
    normalized.page,
  );
  const pressesByCategory = groupPressesByCategory(visiblePresses);
  const activeCategoryPresses = pressesByCategory[normalized.activeCategory];
  const activeListIndex = clampIndex(
    normalized.listIndexByCategory[normalized.activeCategory],
    activeCategoryPresses.length,
  );
  const selectedPress = activeCategoryPresses[activeListIndex];
  const progressLabel =
    activeCategoryPresses.length === 0
      ? "0 / 0"
      : `${activeListIndex + 1} / ${activeCategoryPresses.length}`;

  return {
    subscribedCount: getSubscribedCount(normalized.presses),
    visiblePresses,
    totalPages,
    safePage,
    pagePresses,
    pressesByCategory,
    selectedPress,
    activeCategoryPresses,
    activeListIndex,
    progressLabel,
    progressKey: `${normalized.activeCategory}-${selectedPress?.id ?? "empty"}-${normalized.listTick}`,
  };
}

export function getVisiblePresses(
  presses: Press[],
  activeTab: NewsstandTab,
): Press[] {
  return activeTab === "all"
    ? presses
    : presses.filter((press) => press.subscribed);
}

export function getSubscribedCount(presses: Press[]): number {
  return presses.filter((press) => press.subscribed).length;
}

export function paginatePresses(presses: Press[], page: number) {
  const totalPages = Math.max(1, Math.ceil(presses.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 0), totalPages - 1);

  return {
    totalPages,
    safePage,
    pagePresses: presses.slice(
      safePage * PAGE_SIZE,
      safePage * PAGE_SIZE + PAGE_SIZE,
    ),
  };
}

export function groupPressesByCategory(presses: Press[]) {
  return pressCategories.reduce<Record<PressCategory, Press[]>>(
    (groups, category) => {
      groups[category] = presses.filter((press) => press.category === category);
      return groups;
    },
    createCategoryGroups(),
  );
}

function normalizeState(state: NewsstandState): NewsstandState {
  const visiblePresses = getVisiblePresses(state.presses, state.activeTab);
  const { safePage } = paginatePresses(visiblePresses, state.page);
  const pressesByCategory = groupPressesByCategory(visiblePresses);
  const activeCategory =
    pressesByCategory[state.activeCategory].length > 0
      ? state.activeCategory
      : getFirstAvailableCategory(pressesByCategory);

  const listIndexByCategory = pressCategories.reduce<ListIndexMap>(
    (indexes, category) => {
      indexes[category] = clampIndex(
        state.listIndexByCategory[category] ?? 0,
        pressesByCategory[category].length,
      );
      return indexes;
    },
    createListIndexMap(),
  );

  return {
    ...state,
    page: safePage,
    activeCategory,
    listIndexByCategory,
  };
}

function getFirstAvailableCategory(
  pressesByCategory: Record<PressCategory, Press[]>,
): PressCategory {
  return (
    pressCategories.find((category) => pressesByCategory[category].length > 0) ??
    pressCategories[0]
  );
}

function createListIndexMap(): ListIndexMap {
  return pressCategories.reduce<ListIndexMap>((indexes, category) => {
    indexes[category] = 0;
    return indexes;
  }, {} as ListIndexMap);
}

function createCategoryGroups(): Record<PressCategory, Press[]> {
  return pressCategories.reduce<Record<PressCategory, Press[]>>(
    (groups, category) => {
      groups[category] = [];
      return groups;
    },
    {} as Record<PressCategory, Press[]>,
  );
}

function clampIndex(index: number, length: number) {
  if (length === 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}
