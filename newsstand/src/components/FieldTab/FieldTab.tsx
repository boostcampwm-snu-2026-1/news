import type { Category } from '../../data/articles'
import styles from './FieldTab.module.css'

interface FieldTabProps {
  categories: Category[]
  activeKey: string
  progress: number   // 0..1
  onSelect: (key: string) => void
}

export function FieldTab({ categories, activeKey, progress, onSelect }: FieldTabProps) {
  return (
    <div className={styles.tabBar} role="tablist">
      {categories.map((cat) => {
        const isActive = cat.key === activeKey
        return (
          <button
            key={cat.key}
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onSelect(cat.key)}
          >
            <span className={styles.label}>{cat.label}</span>
            {isActive && (
              <span
                className={styles.progress}
                style={{ transform: `scaleX(${progress})` }}
                aria-hidden="true"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
