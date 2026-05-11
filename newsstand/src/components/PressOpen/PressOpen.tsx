import type { Press } from '../../data/presses'
import type { PressContent } from '../../data/articles'
import { PressWordmark } from '../PressWordmark/PressWordmark'
import { FieldTab } from '../FieldTab/FieldTab'
import styles from './PressOpen.module.css'

interface PressOpenProps {
  press: Press
  content: PressContent
  tabKey: string
  progress: number
  currentInTab: number
  isSubscribed: boolean
  onClose: () => void
  onCategoryChange: (key: string) => void
  onSubscribe: (id: string) => void
  onUnsubscribe: (id: string) => void
  onNextPress?: () => void
}

export function PressOpen({
  press,
  content,
  tabKey,
  progress,
  currentInTab,
  isSubscribed,
  onClose,
  onCategoryChange,
  onSubscribe,
  onUnsubscribe,
  onNextPress,
}: PressOpenProps) {
  const activeCategory = content.categories.find((c) => c.key === tabKey)
  const articles = activeCategory?.articles ?? []

  return (
    <div className={styles.wrapper}>
      <FieldTab
        categories={content.categories}
        activeKey={tabKey}
        progress={progress}
        onSelect={onCategoryChange}
      />

      <div className={styles.card}>
        {/* 언론사 헤더 */}
        <div className={styles.pressHeader}>
          <div className={styles.pressInfo}>
            <PressWordmark press={press} size={16} />
            <span className={styles.editedAt}>{content.mainArticle.editedAt}</span>
          </div>
          <button
            className={`${styles.subscribeBtn} ${isSubscribed ? styles.subscribedBtn : ''}`}
            onClick={() => isSubscribed ? onUnsubscribe(press.id) : onSubscribe(press.id)}
          >
            {isSubscribed ? '− 해지하기' : '+ 구독하기'}
          </button>
        </div>

        {/* 본문: 이미지 + 기사 리스트 */}
        <div className={styles.body}>
          <div className={styles.imageArea}>
            <div className={styles.imagePlaceholder}>headline image</div>
            <p className={styles.mainHeadline}>{content.mainArticle.headline}</p>
          </div>

          <ul className={styles.articleList}>
            {articles.map((article, idx) => (
              <li
                key={article.id}
                className={`${styles.articleItem} ${idx === currentInTab ? styles.current : ''}`}
              >
                <span className={styles.bullet}>・</span>
                <span className={styles.headline}>{article.headline}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 하단 attribution */}
        <div className={styles.footer}>
          <span className={styles.attribution}>{press.name} 언론사에서 직접 편집한 뉴스입니다.</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">✕</button>
        </div>
      </div>

      {/* 다음 언론사 chevron */}
      {onNextPress && (
        <button className={styles.nextBtn} onClick={onNextPress} aria-label="다음 언론사">
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2 1 8 8 2 15" />
          </svg>
        </button>
      )}
    </div>
  )
}
