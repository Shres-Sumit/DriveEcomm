import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider, CarProviders, SearchProvider } from './Context/Auth.jsx'
import { Provider } from "react-redux"
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CarProviders>
      <SearchProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>

      </SearchProvider>
    </CarProviders>

  </AuthProvider>
)
