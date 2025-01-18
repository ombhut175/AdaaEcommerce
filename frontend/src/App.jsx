import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { FaShoppingCart, FaArrowUp } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const Brands = lazy(() => import('./components/Brands'));
const DealsSection = lazy(() => import('./components/DealsSection'));
const NewArrivals = lazy(() => import('./components/NewArrivals'));
const InstagramFeed = lazy(() => import('./components/InstagramFeed'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Footer = lazy(() => import('./components/Footer'));
const Cart = lazy(() => import('./components/Cart'));
const Shop = lazy(() => import('./components/Shop'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Checkout = lazy(() => import('./components/Checkout'));
const DealerProducts = lazy(() => import('./components/DealerProducts'));
const DealerProductDetail = lazy(() => import('./components/DealerProductDetail'));
const DealerProductForm = lazy(() => import('./components/DealerProductForm'));
const AdminPanel = lazy(() => import('./components/AdminPanel.jsx'));

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
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Dealer Routes */}
                <Route path="/dealer/products" element={<DealerProducts />} />
                <Route path="/dealer/products/:id" element={<DealerProductDetail />} />
                <Route path="/dealer/products/new" element={<DealerProductForm />} />
                <Route path="/dealer/products/:id/edit" element={<DealerProductForm />} />

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