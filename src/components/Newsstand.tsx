import { useNewsstandStore } from '../store/useNewsstandStore';
import Header from './Header';
import Ticker from './Ticker';
import TabBar from './TabBar';

export default function Newsstand() {
  const { viewMode } = useNewsstandStore();

  return (
    <div className="mx-auto w-[930px] pt-12 pb-24">
      <Header />
      <Ticker />
      <TabBar />

      {/* 핵심 뷰 영역 (Grid or List) Placeholder */}
      <main className="min-h-[500px] border border-line bg-card">
        <div className="flex items-center justify-center h-full min-h-[500px] text-mute">
          {viewMode === 'grid' ? '그리드 뷰 컴포넌트가 들어갈 자리' : '리스트 뷰 컴포넌트가 들어갈 자리'}
        </div>
      </main>
    </div>
  );
}
