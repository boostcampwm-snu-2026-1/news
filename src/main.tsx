import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NewsstandProvider } from './store/NewsstandContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsstandProvider>
      <App />
    </NewsstandProvider>
  </StrictMode>,
)
