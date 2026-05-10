import { useProgress } from '../../../hooks/useProgress';

interface FieldTabProps {
  tabs: string[];
  activeTabName: string;
  onTabChange: (tabName: string) => void;
  isPaused: boolean;
  onProgressComplete: () => void;
  currentInTab: number;
  totalInTab: number;
}

const FieldTab = ({ 
  tabs,
  activeTabName, 
  onTabChange, 
  isPaused, 
  onProgressComplete,
  currentInTab,
  totalInTab
}: FieldTabProps) => {
  // 활성화된 탭에 대해서만 진행률 계산
  const progress = useProgress({
    duration: 6000,
    isPaused,
    onComplete: onProgressComplete,
    resetDependency: activeTabName
  });

  return (
    <div className="flex w-full h-[40px] bg-[var(--color-soft)] border border-[var(--color-line)] border-b-0 overflow-hidden">
      {tabs.map((tabName, index) => {
        const isActive = tabName === activeTabName;
        const isLast = index === tabs.length - 1;

        return (
          <div
            key={tabName}
            className={`relative flex-1 flex items-center px-[16px] cursor-pointer min-w-0 ${
              !isLast ? 'border-r border-[var(--color-line)]' : ''
            }`}
            onClick={() => onTabChange(tabName)}
          >
            {/* 활성 상태일 때 배경색 */}
            {isActive && (
              <div className="absolute inset-0 bg-[var(--color-accent)] z-0" />
            )}

            {/* 활성 상태일 때 차오르는 프로그레스 바 */}
            {isActive && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-[var(--color-accent-deep)] z-0 origin-left"
                style={{ width: `${progress}%` }}
              />
            )}

            {/* 텍스트와 카운터 */}
            <div className="relative z-10 flex justify-between items-center w-full min-w-0">
              <span className={`text-[14px] truncate ${isActive ? 'font-bold text-[#FFFFFF]' : 'font-medium text-[var(--color-sub)]'}`}>
                {tabName}
              </span>

              {isActive && (
                <span className="font-[var(--font-mono)] text-[12px] text-[#FFFFFF] ml-2 shrink-0">
                  {currentInTab}
                  <span className="opacity-70">/{totalInTab}</span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FieldTab;
