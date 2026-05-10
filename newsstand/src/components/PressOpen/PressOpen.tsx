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
  onClose: () => void
  onCategoryChange: (key: string) => void
}

export function PressOpen({
  press,
  content,
  tabKey,
  progress,
  currentInTab,
  onClose,
  onCategoryChange,
}: PressOpenProps) {
  const activeCategory = content.categories.find((c) => c.key === tabKey)
  const articles = activeCategory?.articles ?? []

  return (
    <div className={styles.wrapper}>
      {/* 헤더: 워드마크 + 닫기 */}
      <div className={styles.header}>
        <div className={styles.wordmark}>
          <PressWordmark press={press} size={18} />
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="언론사 닫기">
          ✕
        </button>
      </div>

      {/* 메인 기사 */}
      <div className={styles.main}>
        <p className={styles.mainHeadline}>{content.mainArticle.headline}</p>
        <span className={styles.editedAt}>{content.mainArticle.editedAt}</span>
      </div>

      {/* 카테고리 탭 + 프로그레스 */}
      <FieldTab
        categories={content.categories}
        activeKey={tabKey}
        progress={progress}
        onSelect={onCategoryChange}
      />

      {/* 기사 리스트 */}
      <ol className={styles.articleList}>
        {articles.map((article, idx) => (
          <li
            key={article.id}
            className={`${styles.articleItem} ${idx === currentInTab ? styles.current : ''}`}
          >
            <span className={styles.articleHeadline}>{article.headline}</span>
            <span className={styles.articleTime}>{article.editedAt}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
