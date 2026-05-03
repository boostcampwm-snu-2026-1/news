import { formatKoreanDate } from "../../utils/date";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img className={styles.icon} src="/dist/assets/newsIcon.png" alt="" aria-hidden="true" />
        <h1>뉴스스탠드</h1>
      </div>
      <time dateTime={new Date().toISOString()}>{formatKoreanDate(new Date())}</time>
    </header>
  );
}
