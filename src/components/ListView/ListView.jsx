import { useState, useEffect } from 'react'
import PressWordmark from '../PublisherGrid/PublisherCell/PressWordmark'
import { CATEGORIES } from '../../data/articles'
import styles from './ListView.module.css'

const DURATION = 6000

export default function ListView({ publishers, selectedIdx, onPublisherChange, articles }) {
  const [category, setCategory] = useState(CATEGORIES[0])
  const [progressKey, setProgressKey] = useState(0)

  useEffect(() => {
    setCategory(CATEGORIES[0])
    setProgressKey(k => k + 1)
    const timer = setTimeout(() => {
      onPublisherChange((selectedIdx + 1) % publishers.length)
    }, DURATION)
    return () => clearTimeout(timer)
  }, [selectedIdx, publishers.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const publisher = publishers[selectedIdx]
  if (!publisher) return null

  const filteredArticles = articles.filter(
    a => a.publisherId === publisher.id && (category === CATEGORIES[0] || a.category === category)
  )

  const goPrev = () => onPublisherChange((selectedIdx - 1 + publishers.length) % publishers.length)
  const goNext = () => onPublisherChange((selectedIdx + 1) % publishers.length)

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <button className={styles.navBtn} onClick={goPrev} aria-label="이전 언론사">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
            <path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.publisherName}>
          <PressWordmark press={publisher} />
        </div>
        <button className={styles.navBtn} onClick={goNext} aria-label="다음 언론사">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
            <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.progressTrack}>
        <div key={progressKey} className={styles.progressBar} style={{ animationDuration: `${DURATION}ms` }} />
      </div>

      <div className={styles.categories} role="tablist">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={cat === category}
            className={`${styles.catTab} ${cat === category ? styles.catActive : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className={styles.articleList}>
        {filteredArticles.length === 0 ? (
          <li className={styles.empty}>등록된 기사가 없습니다.</li>
        ) : (
          filteredArticles.map(article => (
            <li key={article.id} className={styles.articleItem}>
              <span className={styles.articleTitle}>{article.title}</span>
              <span className={styles.articleTime}>{article.time}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
