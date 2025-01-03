import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from '../Layout';
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
