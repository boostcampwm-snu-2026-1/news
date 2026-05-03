export type TabType = 'all' | 'subscribed';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string }[] = [
  { id: 'all', label: '전체 언론사' },
  { id: 'subscribed', label: '구독한 언론사' },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="bg-surface border-b border-border">
      <div className="container-page flex">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={[
              'px-5 py-3 text-sm font-semibold transition-colors border-b-2',
              activeTab === id
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
