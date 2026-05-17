import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { ChevronButton } from "./components/ChevronButton";
import { Header } from "./components/Header";
import { PressGrid } from "./components/PressGrid";
import { PressOpen } from "./components/PressOpen";
import { TabBar } from "./components/TabBar";
import { Ticker } from "./components/Ticker";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import {
  INITIAL_SUBSCRIBED_IDS,
  NEWS_TICKER_ITEMS,
  PRESS_LIST,
  type ActiveTab,
  type CategoryKey,
  type Press,
  type ViewerMode
} from "./data/newsstand";
import {
  advanceOpenProgress,
  clampPage,
  getFallbackPress,
  getGridPageCells,
  getPageCount
} from "./lib/newsstand";

function formatTodayLabel(): string {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long"
  });

  return formatter
    .format(new Date())
    .replace(/\./g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

function findPress(pressId: string | null): Press | null {
  return PRESS_LIST.find((press) => press.id === pressId) ?? null;
}

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [viewer, setViewer] = useState<ViewerMode>("grid");
  const [page, setPage] = useState(0);
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(
    () => new Set(INITIAL_SUBSCRIBED_IDS)
  );
  const [openedPressId, setOpenedPressId] = useState<string | null>(null);
  const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryKey>("general");
  const [currentInTab, setCurrentInTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const openSequenceRef = useRef({ categoryKey: "general" as CategoryKey, currentInTab: 0 });

  const totalPages = useMemo(
    () => getPageCount(PRESS_LIST, activeTab, subscribedIds),
    [activeTab, subscribedIds]
  );
  const pageCells = useMemo(
    () => getGridPageCells(PRESS_LIST, activeTab, subscribedIds, page),
    [activeTab, page, subscribedIds]
  );
  const openedPress = useMemo(() => findPress(openedPressId), [openedPressId]);
  const todayLabel = useMemo(() => formatTodayLabel(), []);

  useEffect(() => {
    setPage((current) => clampPage(current, totalPages));
  }, [totalPages]);

  useEffect(() => {
    openSequenceRef.current = {
      categoryKey: activeCategoryKey,
      currentInTab
    };
  }, [activeCategoryKey, currentInTab]);

  useEffect(() => {
    if (!openedPress || viewer !== "list" || prefersReducedMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress = currentProgress + 1 / 60;

        if (nextProgress < 1) {
          return nextProgress;
        }

        const nextState = advanceOpenProgress(openedPress, openSequenceRef.current);
        openSequenceRef.current = nextState;
        setActiveCategoryKey(nextState.categoryKey);
        setCurrentInTab(nextState.currentInTab);
        return 0;
      });
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [openedPress, prefersReducedMotion, viewer]);

  useEffect(() => {
    if (activeTab === "sub" && openedPressId && !subscribedIds.has(openedPressId)) {
      setViewer("grid");
      setOpenedPressId(null);
      setProgress(0);
      setCurrentInTab(0);
    }
  }, [activeTab, openedPressId, subscribedIds]);

  const openPress = (pressId: string) => {
    const press = findPress(pressId);

    if (!press) {
      return;
    }

    startTransition(() => {
      setOpenedPressId(pressId);
      setViewer("list");
      setActiveCategoryKey(press.primaryCategoryKey);
      setCurrentInTab(0);
      setProgress(0);
    });
  };

  const resetToGrid = () => {
    setViewer("grid");
    setOpenedPressId(null);
    setCurrentInTab(0);
    setProgress(0);
  };

  const handleViewerChange = (nextViewer: ViewerMode) => {
    if (nextViewer === "grid") {
      resetToGrid();
      return;
    }

    if (openedPressId) {
      setViewer("list");
      return;
    }

    const fallbackPress = getFallbackPress(pageCells);

    if (fallbackPress) {
      openPress(fallbackPress.id);
    }
  };

  const handleTabChange = (nextTab: ActiveTab) => {
    setActiveTab(nextTab);
    setPage(0);

    if (nextTab === "all") {
      return;
    }

    if (openedPressId && !subscribedIds.has(openedPressId)) {
      resetToGrid();
    }
  };

  const handleToggleSubscription = (pressId: string) => {
    setSubscribedIds((current) => {
      const next = new Set(current);

      if (next.has(pressId)) {
        next.delete(pressId);
      } else {
        next.add(pressId);
      }

      return next;
    });
  };

  const handleCategoryChange = (categoryKey: CategoryKey) => {
    setActiveCategoryKey(categoryKey);
    setCurrentInTab(0);
    setProgress(0);
  };

  return (
    <div className="app-shell">
      <main className="newsstand">
        <Header dateLabel={todayLabel} />
        <Ticker items={NEWS_TICKER_ITEMS} reducedMotion={prefersReducedMotion} />
        <TabBar
          activeTab={activeTab}
          viewer={viewer}
          subscribedCount={subscribedIds.size}
          listEnabled={viewer === "list" || Boolean(getFallbackPress(pageCells))}
          onTabChange={handleTabChange}
          onViewerChange={handleViewerChange}
        />

        <section className="content-frame">
          {viewer === "list" && openedPress ? (
            <PressOpen
              press={openedPress}
              categoryKey={activeCategoryKey}
              currentInTab={currentInTab}
              progress={progress}
              subscribed={subscribedIds.has(openedPress.id)}
              reducedMotion={prefersReducedMotion}
              onCategoryChange={handleCategoryChange}
              onToggleSubscription={handleToggleSubscription}
            />
          ) : (
            <PressGrid
              cells={pageCells}
              activeTab={activeTab}
              subscribedIds={subscribedIds}
              onOpen={openPress}
              onToggleSubscription={handleToggleSubscription}
            />
          )}
        </section>

        {viewer === "grid" && (
          <>
            <ChevronButton
              direction="left"
              disabled={page === 0}
              onClick={() => setPage((current) => current - 1)}
            />
            <ChevronButton
              direction="right"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((current) => current + 1)}
            />
            <p className="page-indicator" aria-live="polite">
              Page {page + 1} / {totalPages}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
