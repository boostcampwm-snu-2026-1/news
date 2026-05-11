import type { Outlet, Article } from '../../types';
import styles from './ArticleCard.module.css';

interface Props {
  outlet: Outlet;
  article: Article;
  isSubscribed: boolean;
  onToggleSubscription: () => void;
}

export default function ArticleCard({ outlet, article, isSubscribed, onToggleSubscription }: Props) {
  const outletStyle = {
    color: outlet.style?.color,
    fontStyle: outlet.style?.fontStyle,
    fontWeight: outlet.style?.fontWeight,
    background: outlet.style?.background,
  };

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.outletName} style={outletStyle}>{outlet.name}</span>
        <span className={styles.editedAt}>{article.editedAt}</span>
        <button className={styles.subscribeBtn} onClick={onToggleSubscription}>
          {isSubscribed ? '− 해지하기' : '+ 구독하기'}
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          {article.headlineImage
            ? <img src={article.headlineImage} alt={article.headlineTitle} className={styles.headlineImg} />
            : <div className={styles.headlinePlaceholder} />
          }
          <p className={styles.headlineTitle}>{article.headlineTitle}</p>
        </div>
        <div className={styles.right}>
          <ul className={styles.items}>
            {article.items.map((item, i) => (
              <li key={i} className={styles.item}>
                <span className={styles.bullet} />
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.footnote}>{outlet.name} 언론사에서 직접 편집한 뉴스입니다.</p>
        </div>
      </div>
    </div>
  );
}
