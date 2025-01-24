import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { FaShoppingCart, FaArrowUp } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/design/Navbar.jsx';
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import ConfirmCode from "./components/auth/ConfirmCode.jsx";

// Lazy load components
const Hero = lazy(() => import('./components/design/Hero.jsx'));
const Brands = lazy(() => import('./components/design/Brands.jsx'));
const DealsSection = lazy(() => import('./components/design/DealsSection.jsx'));
const NewArrivals = lazy(() => import('./components/design/NewArrivals.jsx'));
const InstagramFeed = lazy(() => import('./components/design/InstagramFeed.jsx'));
const Testimonials = lazy(() => import('./components/design/Testimonials.jsx'));
const Newsletter = lazy(() => import('./components/design/Newsletter.jsx'));
const Footer = lazy(() => import('./components/design/Footer.jsx'));
// const Cart = lazy(() => import('./components/user/Cart.jsx'));
const Shop = lazy(() => import('./components/design/Shop.jsx'));
const ProductDetail = lazy(() => import('./components/user/ProductDetail.jsx'));
const Checkout = lazy(() => import('./components/user/Checkout.jsx'));
const DealerProducts = lazy(() => import('./components/dealer/DealerProducts.jsx'));
const DealerProductDetail = lazy(() => import('./components/dealer/DealerProductDetail.jsx'));
const DealerProductForm = lazy(() => import('./components/dealer/DealerProductForm.jsx'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel.jsx'));
const DeliveryList = lazy(()=> import("./components/deliveryBoy/DeliveryList.jsx"));
const DeliveryDetails = lazy(()=>import("./components/deliveryBoy/DeliveryDetails.jsx"));
const UserDetails = lazy(()=>import("./components/user/UserDetails.jsx"));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setShowScrollTop(window.scrollY > 300);
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <LazyMotion features={domAnimation}>
        <div className={darkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
              </div>
            }>
              <Routes>
                {/*userLogin Routes*/}
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/confirm-code" element={<ConfirmCode />} />

                <Route path="/" element={<HomePage />} />
                {/* <Route path="/cart" element={<Cart />} /> */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Checkout />} />
                
                {/* Dealer Routes */}
                <Route path="/dealer/products" element={<DealerProducts />} />
                <Route path="/dealer/products/:id" element={<DealerProductDetail />} />
                <Route path="/dealer/products/new" element={<DealerProductForm />} />
                <Route path="/dealer/products/:id/edit" element={<DealerProductForm />} />


                <Route path="/delivery" element={<DeliveryList />} />
                <Route path="/delivery/:id" element={<DeliveryDetails />} />


                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/user/:id" element={<UserDetails />} />
              </Routes>
              <Footer />
            </Suspense>

            <Link to="/cart">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="fixed bottom-8 right-8 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg z-50 hover:bg-gray-900 dark:hover:bg-gray-100"
              >
                <FaShoppingCart size={24} />
              </motion.button>
            </Link>

            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={scrollToTop}
                  className="fixed bottom-24 right-8 p-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded-full shadow-lg z-50 hover:bg-gray-700 dark:hover:bg-gray-300"
                >
                  <FaArrowUp size={24} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </LazyMotion>
    </Router>
  );
}

const HomePage = memo(() => (
  <>
    <Hero />
    <Brands />
    <DealsSection />
    <NewArrivals />
    <InstagramFeed />
    <Testimonials />
    <Newsletter />
  </>
));


export default memo(App);