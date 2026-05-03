import PublisherCell from './PublisherCell/PublisherCell'
import styles from './PublisherGrid.module.css'

const PAGE_SIZE = 24

export default function PublisherGrid({ publishers, subscribedIds, onSubscribe, onUnsubscribe }) {
  const pageItems = publishers.slice(0, PAGE_SIZE)

  return (
    <div className={styles.grid}>
      {pageItems.map(press => (
        <PublisherCell
          key={press.id}
          press={press}
          isSubscribed={subscribedIds.has(press.id)}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
      ))}
    </div>
  )
}
