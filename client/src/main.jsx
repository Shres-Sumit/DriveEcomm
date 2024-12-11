import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider, SearchProvider } from './Context/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </SearchProvider>

  </AuthProvider>
)
