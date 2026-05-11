import { useNewsstand } from '../../context/NewsstandContext'
import { getOutletsByPage, getOutletsByCategory, getSubscribedOutletsByPage, getSubscribedTotalPages } from '../../data/outlets'
import { getArticleByOutletId } from '../../data/articles'
import OutletCell from './OutletCell'
import GridChevron from './GridChevron'
import styles from './GridView.module.css'

export default function GridView() {
  const {
    activeTab, currentPage, setCurrentPage, subscribed, totalPages,
    setActiveCategory, setCurrentOutletIndex, setViewMode,
  } = useNewsstand()

  const GRID_SIZE = 24

  const activeTotalPages = activeTab === 'all'
    ? totalPages
    : getSubscribedTotalPages(subscribed)

  const displayOutlets =
    activeTab === 'subscribed'
      ? getSubscribedOutletsByPage(subscribed, currentPage)
      : getOutletsByPage(currentPage)

  const cellItems: (typeof displayOutlets[number] | null)[] =
    activeTab === 'subscribed'
      ? [...displayOutlets, ...Array(Math.max(0, GRID_SIZE - displayOutlets.length)).fill(null)]
      : displayOutlets

  function handleOutletClick(outletId: string) {
    const article = getArticleByOutletId(outletId)
    if (!article) return
    const outlet = displayOutlets.find(o => o.id === outletId)
    if (!outlet) return
    const categoryOutletsWithArticles = getOutletsByCategory(outlet.category)
      .filter(o => getArticleByOutletId(o.id) !== undefined)
    const index = categoryOutletsWithArticles.findIndex(o => o.id === outletId)
    setActiveCategory(outlet.category)
    setCurrentOutletIndex(index >= 0 ? index : 0)
    setViewMode('list')
  }

  return (
    <div className={styles.wrapper}>
      <GridChevron
        direction="left"
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
      <div className={styles.grid}>
        {cellItems.length === 0 ? (
          <div className={styles.empty}>구독한 언론사가 없습니다.</div>
        ) : (
          cellItems.map((outlet, i) =>
            outlet ? (
              <OutletCell
                key={outlet.id}
                outlet={outlet}
                onClick={getArticleByOutletId(outlet.id) ? () => handleOutletClick(outlet.id) : undefined}
              />
            ) : (
              <div key={`empty-${i}`} className={styles.emptyCell} />
            )
          )
        )}
      </div>
      <GridChevron
        direction="right"
        disabled={currentPage >= activeTotalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  )
}
