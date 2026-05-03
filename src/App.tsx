import { NewsstandProvider } from './context/NewsstandContext'
import Header from './components/Header/Header'
import TabBar from './components/TabBar/TabBar'
import GridView from './components/GridView/GridView'
import styles from './App.module.css'

function App() {
  return (
    <NewsstandProvider>
      <div className={styles.app}>
        <Header />
        <TabBar />
        <main className={styles.main}>
          <GridView />
        </main>
      </div>
    </NewsstandProvider>
  )
}

export default App
