<<<<<<< HEAD
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";
import HomePage from "./pages/Home.jsx";
import BlogGridView from "./pages/BlogGridView.jsx";
import Cart from "./pages/Cart.jsx";
import {EditPage} from "./pages/EditPage.jsx";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route path="home" element={<HomePage/>}/>
                        <Route path="bloggridview" element={<BlogGridView/>}/>
                        <Route path={'cart'} element={<Cart/>}/>
                        <Route path={"editPage"} element={<EditPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Layout from './Layout'
import HomePage from './pages/Home'
import BlogGridView from './components/BlogGridView'
import BlogListView from './components/BlogListView'
import ProductList from './components/ProductList'
import BuyNow from './components/BuyNow'
import AddToCart from './components/AddToCart'
import ProductDetails from './components/ProductDetails'
import DiscountProductList from './components/DiscountProductList'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />}/>
        <Route path='blogGridView' element={<BlogGridView/>} />
        <Route path='blogListView' element={<BlogListView/>} />  
        <Route path='productList' element={<ProductList/>} /> 
        <Route path='buyNow' element={<BuyNow/>} />  
        <Route path='addToCart' element={<AddToCart/>} />  
        <Route path='productDetails' element={<ProductDetails/>} />  
        <Route path='discountProductlist' element={<DiscountProductList/>} />  
        {/* <Route path='productlist' element={<ProductList/>} />         */}
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
>>>>>>> 59de7bd441d5cb2673911293a5f621f5d0b2b0d1
