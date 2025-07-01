import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import App from './1.context/3.context-slice'
import App from './2.reducer+context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
