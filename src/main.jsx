import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import App from './routes/App.jsx'
import { NameProvider } from './contexts/NameContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NameProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </NameProvider>
  </StrictMode>,
)
