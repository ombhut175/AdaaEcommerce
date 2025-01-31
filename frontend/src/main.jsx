import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './store/store'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
            <ToastContainer/>

        </Provider>
    </StrictMode>,
)