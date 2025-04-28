import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './routes/App.jsx'

import './index.css'
import { NameProvider } from './contexts/NameContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NameProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </NameProvider>
  </StrictMode>,
)