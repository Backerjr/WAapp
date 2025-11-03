import React from 'react'
import ReactDOM from 'react-dom/client'
import RozmowaApp from './RozmowaApp'
import ErrorBoundary from './components/legacy/ErrorBoundary'
import { initTheme } from './styles/theme'
import './styles/tokens.css'
import './styles/globals.css'
import './styles/prose.css'

// Initialize theme on app load
initTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RozmowaApp />
    </ErrorBoundary>
  </React.StrictMode>,
)
