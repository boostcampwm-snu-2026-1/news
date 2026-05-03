import type { NewsstandState, PressId, CategoryKey } from "./types";

export type NewsstandAction =
  | { type: "tab/set"; tab: "all" | "sub" }
  | { type: "page/set"; page: number }
  | { type: "page/next" }
  | { type: "page/prev" }
  | { type: "press/open"; pressId: PressId; primaryCategory: CategoryKey }
  | { type: "press/close" }
  | { type: "subscribe"; pressId: PressId }
  | { type: "unsubscribe"; pressId: PressId }
  | { type: "subscribed/hydrate"; subscribed: PressId[] }
  | { type: "field-tab/set"; tabKey: CategoryKey }
  | { type: "field-tab/advance-current" }
  | { type: "progress/set"; progress: number }
  | { type: "progress/reset" };

export const initialNewsstandState: NewsstandState = {
  tab: "all",
  page: 0,
  opened: null,
  tabKey: "general-economy",
  progress: 0,
  currentInTab: 1,
  subscribed: [],
};

export function newsstandReducer(
  state: NewsstandState,
  action: NewsstandAction,
): NewsstandState {
  switch (action.type) {
    case "tab/set":
      if (state.tab === action.tab) return state;
      return { ...state, tab: action.tab, page: 0 };
    case "page/set":
      return { ...state, page: Math.max(0, action.page) };
    case "page/next":
      return { ...state, page: state.page + 1 };
    case "page/prev":
      return { ...state, page: Math.max(0, state.page - 1) };
    case "press/open":
      return {
        ...state,
        opened: action.pressId,
        tabKey: action.primaryCategory,
        progress: 0,
        currentInTab: 1,
      };
    case "press/close":
      return { ...state, opened: null, progress: 0, currentInTab: 1 };
    case "subscribe":
      if (state.subscribed.includes(action.pressId)) return state;
      return { ...state, subscribed: [...state.subscribed, action.pressId] };
    case "unsubscribe":
      if (!state.subscribed.includes(action.pressId)) return state;
      return {
        ...state,
        subscribed: state.subscribed.filter((id) => id !== action.pressId),
      };
    case "subscribed/hydrate":
      return { ...state, subscribed: action.subscribed };
    case "field-tab/set":
      return { ...state, tabKey: action.tabKey, progress: 0, currentInTab: 1 };
    case "field-tab/advance-current":
      return { ...state, currentInTab: state.currentInTab + 1, progress: 0 };
    case "progress/set":
      return { ...state, progress: Math.min(1, Math.max(0, action.progress)) };
    case "progress/reset":
      return { ...state, progress: 0 };
    default:
      return state;
  }
}
