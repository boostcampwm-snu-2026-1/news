import { useNewsstand } from '../../context/NewsstandContext'
import { getOutletsByPage, getSubscribedOutlets } from '../../data/outlets'
import OutletCell from './OutletCell'
import GridChevron from './GridChevron'
import styles from './GridView.module.css'

export default function GridView() {
  const { activeTab, currentPage, setCurrentPage, subscribed, totalPages } = useNewsstand()

  const displayOutlets =
    activeTab === 'subscribed'
      ? getSubscribedOutlets(subscribed)
      : getOutletsByPage(currentPage)

  const showPagination = activeTab === 'all'

  return (
    <div className={styles.wrapper}>
      {showPagination && (
        <GridChevron
          direction="left"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
      )}
      <div className={styles.grid}>
        {displayOutlets.length === 0 ? (
          <div className={styles.empty}>구독한 언론사가 없습니다.</div>
        ) : (
          displayOutlets.map(outlet => (
            <OutletCell key={outlet.id} outlet={outlet} />
          ))
        )}
      </div>
      {showPagination && (
        <GridChevron
          direction="right"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      )}
    </div>
  )
}
