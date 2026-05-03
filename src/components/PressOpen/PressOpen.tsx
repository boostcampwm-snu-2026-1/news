import type { CategoryKey, Press, PressArticles } from "../../state/types";
import { buildDummyCategoryArticles } from "../../data/dummyArticles";
import { FieldTab } from "../FieldTab/FieldTab";
import { PressWordmark } from "../PressWordmark/PressWordmark";
import { SubscribePill } from "../SubscribePill/SubscribePill";
import styles from "./PressOpen.module.css";

export interface PressOpenProps {
  press: Press;
  articles: PressArticles | undefined;
  tabKey: CategoryKey;
  currentInTab: number;
  progress: number;
  subscribed: boolean;
  onTabKeyChange: (key: CategoryKey) => void;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}

export function PressOpen({
  press,
  articles,
  tabKey,
  currentInTab,
  progress,
  subscribed,
  onTabKeyChange,
  onSubscribe,
  onUnsubscribe,
}: PressOpenProps) {
  const cat =
    articles?.byCategory[tabKey] ??
    buildDummyCategoryArticles(press.wordmark.name, tabKey);
  const { headlineTitle, items, count } = cat;

  return (
    <div className={styles.opened}>
      <FieldTab
        tabKey={tabKey}
        currentInTab={currentInTab}
        progress={progress}
        count={count}
        onTabKeyChange={onTabKeyChange}
      />
      <div className={styles.body}>
        <div className={styles.head}>
          <div className={styles.brand}>
            <PressWordmark spec={press.wordmark} />
          </div>
          <time className={styles.editTime}>{press.editTime}</time>
          <SubscribePill
            mode={subscribed ? "unsubscribe" : "subscribe"}
            onClick={subscribed ? onUnsubscribe : onSubscribe}
          />
        </div>
        <div className={styles.bodyRow}>
          <div className={styles.left}>
            <div className={styles.imageBox} aria-hidden="true">
              headline image
            </div>
            <h2 className={styles.headline}>{headlineTitle}</h2>
          </div>
          <div className={styles.right}>
            <ul className={styles.list}>
              {items.map((it, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.bullet} aria-hidden="true" />
                  <span>{it.title}</span>
                </li>
              ))}
            </ul>
            <div className={styles.footnote}>
              {press.wordmark.name} 언론사에서 직접 편집한 뉴스입니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
