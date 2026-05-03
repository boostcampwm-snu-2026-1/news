import { CATEGORIES } from '../../types';
import type { Category } from '../../types';

interface CategoryFilterProps {
  selected: Set<Category>;
  onChange: (next: Set<Category>) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const isAll = selected.size === 0;

  const toggle = (cat: Category) => {
    const next = new Set(selected);
    next.has(cat) ? next.delete(cat) : next.add(cat);
    onChange(next);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onChange(new Set())}
        className={[
          'px-3 py-1 text-xs font-semibold rounded-full border transition-colors',
          isAll
            ? 'border-primary bg-primary text-white'
            : 'border-border text-text-secondary hover:border-primary hover:text-primary',
        ].join(' ')}
      >
        전체
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => toggle(cat)}
          className={[
            'px-3 py-1 text-xs font-semibold rounded-full border transition-colors',
            selected.has(cat)
              ? 'border-primary bg-primary text-white'
              : 'border-border text-text-secondary hover:border-primary hover:text-primary',
          ].join(' ')}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
