import React from 'react';
import styles from './PressArticleContent.module.css';
import { PressNewsData } from '@/types/news';
import PressWordmark from '@/components/common/PressWordmark/PressWordmark';
import Button from '@/components/common/Button/Button';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface PressArticleContentProps {
  data: PressNewsData;
}

const PressArticleContent: React.FC<PressArticleContentProps> = ({ data }) => {
  const { isSubscribed, subscribe, unsubscribe } = useSubscription();
  const subscribed = isSubscribed(data.name);

  const handleSubscribe = () => {
    subscribed ? unsubscribe(data.name) : subscribe(data.name);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.pressInfo}>
          <PressWordmark {...data} />
          <span className={styles.editTime}>{data.lastEditTime} 편집</span>
        </div>
        <Button 
          text={subscribed ? "해지하기" : "구독하기"} 
          onClick={handleSubscribe} 
        />
      </header>

      <main className={styles.mainArea}>
        <section className={styles.mainArticle}>
          <div className={styles.thumbnailWrapper}>
            {data.mainArticle.thumbnail ? (
              <img src={data.mainArticle.thumbnail} alt={data.mainArticle.title} />
            ) : (
              <svg 
                className={styles.geminiIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor" />
              </svg>
            )}
          </div>
          <h3 className={styles.mainTitle}>{data.mainArticle.title}</h3>
        </section>

        <section className={styles.subArticles}>
          <ul className={styles.articleList}>
            {data.subArticles.map((article, index) => (
              <li key={index} className={styles.articleItem}>
                <a href={article.link}>{article.title}</a>
              </li>
            ))}
          </ul>
          <p className={styles.footerNote}>{data.name} 언론사에서 직접 편집한 뉴스입니다.</p>
        </section>
      </main>
    </div>
  );
};

export default PressArticleContent;