import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './store/store'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import AnalyticsTracker from "./googleAnalytics/AnalyticsTracker.jsx";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_MEASUREMENT_ID);
ReactGA.send({ hitType: "pageview", page: "/" })

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AnalyticsTracker />
                    <App/>
            </BrowserRouter>
            <ToastContainer/>

        </Provider>
    </StrictMode>,
)