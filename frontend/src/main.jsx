<<<<<<< HEAD
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from './pages/Layout.jsx';
import HomePage from './pages/Home';
import BlogGridView from './pages/BlogGridView';
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
=======
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
    <>
      <App/>
    </>
)
>>>>>>> 59de7bd441d5cb2673911293a5f621f5d0b2b0d1
