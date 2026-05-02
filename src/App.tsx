import Header from './components/Header';
import Ticker from './components/Ticker';
import { tickerData } from './data/press';

function getFormattedDate(): string {
  const now = new Date();
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${d}. ${days[now.getDay()]}`;
}

function App() {
  return (
    <div className="newsstand-wrap">
      <Header date={getFormattedDate()} />
      <Ticker items={tickerData} />
    </div>
  );
}

export default App;
