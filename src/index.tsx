import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './i18n'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { applyCssVariables } from './styles/colors'

applyCssVariables()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
)

reportWebVitals()
