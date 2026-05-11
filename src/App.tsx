import { useNewsstand, NewsstandProvider } from './context/NewsstandContext'
import Header from './components/Header/Header'
import NewsTicker from './components/NewsTicker/NewsTicker'
import TabBar from './components/TabBar/TabBar'
import GridView from './components/GridView/GridView'
import ListView from './components/ListView/ListView'
import styles from './App.module.css'

function AppContent() {
  const { viewMode } = useNewsstand()
  return (
    <div className={styles.app}>
      <Header />
      <NewsTicker />
      <TabBar />
      <main className={styles.main}>
        {viewMode === 'grid' ? <GridView /> : <ListView />}
      </main>
    </div>
  )
}

function App() {
  return (
    <NewsstandProvider>
      <AppContent />
    </NewsstandProvider>
  )
}

export default App
