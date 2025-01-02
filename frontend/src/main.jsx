<<<<<<< HEAD
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import {Provider} from "react-redux";
import {store} from "./redux/store.js";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
=======
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Layout from '../Layout'
import HomePage from './pages/Home'
import BlogGridView from './pages/BlogGridView'
// import { AnimatedTestimonials } from './components/scrollViewCard.jsx'

createRoot(document.getElementById('root')).render(
    
  <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />}/>
        <Route path='bloggridview' element={<BlogGridView/>} />
        {/* <Route path="about" element={<AnimatedTestimonials />}/> */}
      </Route>
    </Routes>
  </BrowserRouter>
)
>>>>>>> kishanAkbari
