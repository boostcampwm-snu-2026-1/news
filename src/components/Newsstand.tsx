import { useNewsstandStore } from '../store/useNewsstandStore';
import Header from './Header';
import Ticker from './Ticker';
import TabBar from './TabBar';
import PressGrid from './PressGrid';
import PressView from './PressView';

export default function Newsstand() {
  const { viewMode } = useNewsstandStore();

  return (
    <div className="mx-auto w-[930px] pt-12 pb-24">
      <Header />
      <Ticker />
      <TabBar />

      {/* 핵심 뷰 영역 (Grid or List) */}
      <main className="relative min-h-[384px] border border-line bg-card mt-6">
        <div key={viewMode} className="w-full h-full animate-fade-in">
          {viewMode === 'grid' ? <PressGrid /> : <PressView />}
        </div>
      </main>
    </div>
  );
}
