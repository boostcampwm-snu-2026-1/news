import Header from './components/layout/Header/Header';
import Ticker from './components/ticker/Ticker';
import TabBar from './components/layout/TabBar/TabBar';
import PressGrid from './components/grid/PressGrid/PressGrid';
import { useNewsstandStore } from './store/NewsstandContext';

function App() {
  const { viewMode } = useNewsstandStore();

  return (
    <div className="flex flex-col items-center w-[var(--width-layout)] min-h-screen">
      <Header />
      <Ticker />
      <TabBar />
      {viewMode === 'grid' && <PressGrid />}
    </div>
  )
}

export default App;
