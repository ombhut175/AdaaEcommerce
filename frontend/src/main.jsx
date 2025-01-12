import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import {ToastContainer} from 'react-toastify'

import App from './App';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer/>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
