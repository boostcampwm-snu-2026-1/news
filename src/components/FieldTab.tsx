import { CATEGORIES } from '../data/press';
import type { Category } from '../data/press';
import './FieldTab.css';

interface FieldTabProps {
  activeCategory: Category;
  onSelect: (cat: Category) => void;
  progress: number;
  progressKey: string;
}

function FieldTab({ activeCategory, onSelect, progress, progressKey }: FieldTabProps) {
  return (
    <div className="field-tab" role="tablist" aria-label="분야 탭">
      {CATEGORIES.map((cat, i) => {
        const active = cat === activeCategory;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={active}
            className={`field-tab__item${active ? ' field-tab__item--active' : ''}`}
            onClick={() => onSelect(cat)}
          >
            <span className="field-tab__label">{cat}</span>
            {active && (
              <span
                className="field-tab__progress"
                key={progressKey}
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              />
            )}
            {i < CATEGORIES.length - 1 && (
              <span className="field-tab__divider" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FieldTab;
