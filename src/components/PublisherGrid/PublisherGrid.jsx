import { useState, useEffect } from 'react'
import PublisherCell from './PublisherCell/PublisherCell'
import styles from './PublisherGrid.module.css'

const PAGE_SIZE = 24

export default function PublisherGrid({ publishers, subscribedIds, onSubscribe, onUnsubscribe, onCellClick, activeTab }) {
  const [page, setPage] = useState(0)

  useEffect(() => {
    setPage(0)
  }, [activeTab])

  const totalPages = Math.max(1, Math.ceil(publishers.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)
  const pageItems = publishers.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE)

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {pageItems.map(press => (
          <PublisherCell
            key={press.id}
            press={press}
            isSubscribed={subscribedIds.has(press.id)}
            onSubscribe={onSubscribe}
            onUnsubscribe={onUnsubscribe}
            onClick={() => onCellClick?.(press)}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.chevron}
            disabled={safePage === 0}
            onClick={() => setPage(p => p - 1)}
            aria-label="이전 페이지"
          >
            &#8249;
          </button>
          <div className={styles.dots}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === safePage ? styles.dotActive : ''}`}
                onClick={() => setPage(i)}
                aria-label={`${i + 1}페이지`}
              />
            ))}
          </div>
          <button
            className={styles.chevron}
            disabled={safePage === totalPages - 1}
            onClick={() => setPage(p => p + 1)}
            aria-label="다음 페이지"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  )
}
