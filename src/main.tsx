import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RozmowaApp from './RozmowaApp'
import { initTheme } from './styles/theme'
import './styles/tokens.css'
import './styles/globals.css'
import './styles/prose.css'

// Initialize theme on app load
initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RozmowaApp />
  </StrictMode>,
)
