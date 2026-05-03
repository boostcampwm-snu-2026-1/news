import './App.css'
import Header from './components/Header'
import Ticker from './components/Ticker'
import PressGrid from './components/PressGrid'
import ArticleList from './components/ArticleList'
import presses from './data/presses.json'
import articles from './data/articles.json'

const todayLabel = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}).format(new Date())

const tickerItems = [
  '조용한 밀도, 가벼운 인터랙션, 또렷한 정보 계층',
  '언론사 워드마크는 이미지가 아니라 타이포그래피로 표현',
  '한 가지 강조색만 사용해 구독 상태와 진행 상태를 표시',
]

function App() {
  const featured = (presses as any)[0]

  return (
    <div className="newsstand-app">
      <Header dateLabel={todayLabel} />
      <Ticker items={tickerItems} />

      <main className="newsstand-main">
        <PressGrid presses={presses as any} />
        <ArticleList featured={featured as any} articles={articles as any} />
      </main>
    </div>
  )
}

export default App