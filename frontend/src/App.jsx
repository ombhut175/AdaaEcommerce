import {  Routes, Route } from 'react-router-dom';

// Pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from './pages/Layout';
import HomePage from './pages/Home';
import BlogListView from './components/BlogListView';
import ProductList from './components/ProductList';
import BuyNow from './components/BuyNow';
import AddToCart from './components/AddToCart';
import ProductDetails from './components/ProductDetails';
import DiscountProductList from './components/DiscountProductList';
import Cart from './pages/Cart';
import { EditPage } from './pages/EditPage';
import BlogGridView from "./components/BlogGridView.jsx";

function App() {
    return (
            <Routes>
                {/* Public Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<HomePage />} />
                    <Route path="blogGridView" element={<BlogGridView />} />
                    <Route path="blogListView" element={<BlogListView />} />
                    <Route path="productList" element={<ProductList />} />
                    <Route path="buyNow" element={<BuyNow />} />
                    <Route path="addToCart" element={<AddToCart />} />
                    <Route path="productDetails" element={<ProductDetails />} />
                    <Route path="discountProductList" element={<DiscountProductList />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="editPage" element={<EditPage />} />
                </Route>
            </Routes>
    );
}

export default App;
