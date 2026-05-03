import type { MouseEvent } from "react";
import type { NewsstandTab, Press } from "../../types/newsstand";
import { PressWordmark } from "../PressWordmark/PressWordmark";
import styles from "./PressGrid.module.css";

type PressGridCellProps = {
  activeTab: NewsstandTab;
  isSubscribed: boolean;
  press: Press;
  onOpen: (pressId: string) => void;
  onSubscribe: (pressId: string) => void;
  onUnsubscribe: (pressId: string) => void;
};

export function PressGridCell({ activeTab, isSubscribed, press, onOpen, onSubscribe, onUnsubscribe }: PressGridCellProps) {
  const buttonLabel = activeTab === "sub" || isSubscribed ? "− 해지하기" : "+ 구독하기";
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (activeTab === "sub" || isSubscribed) {
      onUnsubscribe(press.id);
      return;
    }

    onSubscribe(press.id);
  };

  return (
    <div
      className={styles.cell}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(press.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(press.id);
        }
      }}
    >
      <PressWordmark wordmark={press.wordmark} />
      <span className={styles.control}>
        <button className={styles.pill} type="button" onClick={handleButtonClick}>
          {buttonLabel}
        </button>
      </span>
    </div>
  );
}
