import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { FaShoppingCart, FaArrowUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './store/features/themeSlice';

// Components
import Navbar from './components/design/Navbar.jsx';
import Hero from './components/design/Hero.jsx';
import Brands from './components/design/Brands.jsx';
import DealsSection from './components/design/DealsSection.jsx';
import NewArrivals from './components/design/NewArrivals.jsx';
import InstagramFeed from './components/design/InstagramFeed.jsx';
import Testimonials from './components/design/Testimonials.jsx';
import Newsletter from './components/design/Newsletter.jsx';
import Footer from './components/design/Footer.jsx';
import Cart from './components/customer/Cart.jsx';
import Shop from './components/pages/Shop.jsx';
import ProductDetail from './components/customer/ProductDetail.jsx';
import Checkout from './components/customer/Checkout.jsx';
import UserProfile from './components/customer/UserProfile.jsx';
import EditProfile from './components/customer/EditProfile.jsx';
import Deals from './components/pages/Deals';
import NewArrivalsPage from './components/pages/NewArrivalsPage';
import Wishlist from './components/customer/Wishlist.jsx';
import SearchResults from './components/pages/SearchResults.jsx';
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import ConfirmCode from "./components/auth/ConfirmCode.jsx";
import DealerProducts from "./components/dealer/DealerProducts.jsx";
import DealerProductDetail from "./components/dealer/DealerProductDetail.jsx";
import DealerProductForm from "./components/dealer/DealerProductForm.jsx";
import DeliveryList from "./components/deliveryBoy/DeliveryList.jsx";
import DeliveryDetails from "./components/deliveryBoy/DeliveryDetails.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";
import UserDetails from "./components/admin/UserDetails.jsx";
import ProtectedRoute from './ProtectedRoute.jsx';
import Unauthorized from './Unauthorized.jsx';
import DealerProductEditingPage from "./components/dealer/DealerProductEditForm.jsx";




function App() {
  const darkMode = useSelector(selectDarkMode);
  const [showScrollTop, setShowScrollTop] = useState(false);
   const [isDealer, setIsDealer] = useState(null);
   const [isDelivery, setIsDelivery] = useState(null);
   const [isAdmin, setIsAdmin] = useState(null);
   //
   //  useEffect(() => {
   //    const roles = localStorage.getItem('role');
   //    if (roles) {
   //      const roleArray = roles.split(',');
   //      const dealerRole = roleArray.some(role => role.toLowerCase() === 'dealer');
   //      setIsDealer(dealerRole);
   //    } else {
   //      setIsDealer(false);
   //    }
   //  }, []);
   //  useEffect(() => {
   //    const roles = localStorage.getItem('role');
   //    console.log(roles);
   //    if (roles) {
   //      const roleArray = roles.split(',');
   //      console.log(roleArray);
   //      const deliveryRole = roleArray.some(role => role.toLowerCase() === 'delivery');
   //      setIsDelivery(deliveryRole);
   //    } else {
   //      setIsDelivery(false);
   //    }
   //  }, []);
   //  useEffect(() => {
   //    const roles = localStorage.getItem('role');
   //    console.log(roles);
   //    if (roles) {
   //      const roleArray = roles.split(',');
   //      console.log(roleArray);
   //      const adminRole = roleArray.some(role => role.toLowerCase() === 'admin');
   //      setIsAdmin(adminRole);
   //    } else {
   //      setIsAdmin(false);
   //    }
   //  }, []);
    

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Navbar />

          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
              </div>
            }
          >
            <Routes>

              {/*userLogin Routes*/}
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/confirm-code" element={<ConfirmCode />} />

              {/* Main Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/:userId" element={<Checkout />} />

              {/* User Profile Routes */}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/edit" element={<EditProfile />} />

              {/* Additional Pages */}
              <Route path="/deals" element={<Deals />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<SearchResults />} />

                {/* Dealer Routes */}
                <Route path="/dealer/products" element={<DealerProducts />} />
                <Route path="/dealer/products/:id" element={<DealerProductDetail />} />
                <Route path="/dealer/products/new" element={<DealerProductForm />} />
                <Route path="/dealer/products/:id/edit" element={<DealerProductEditingPage />} />


              {/* Dealer Routes */}
              {/*<Route >*/}
              {/*  <Route path='/unauthorized' element={<Unauthorized/>}></Route>*/}
              {/*  <Route*/}
              {/*    path="/dealer/products"*/}
              {/*    element={*/}
              {/*      <ProtectedRoute role={isDealer}>*/}
              {/*        <DealerProducts />*/}
              {/*      </ProtectedRoute>*/}
              {/*    }*/}
              {/*  />*/}
              {/*  <Route*/}
              {/*    path="/dealer/products/:id"*/}
              {/*    element={*/}
              {/*      <ProtectedRoute role={isDealer}>*/}
              {/*        <DealerProductDetail />*/}
              {/*      </ProtectedRoute>*/}
              {/*    }*/}
              {/*  />*/}
              {/*  <Route*/}
              {/*    path="/dealer/products/new"*/}
              {/*    element={*/}
              {/*      <ProtectedRoute role={isDealer}>*/}
              {/*        <DealerProductForm />*/}
              {/*      </ProtectedRoute>*/}
              {/*    }*/}
              {/*  />*/}
              {/*  <Route*/}
              {/*    path="/dealer/products/:id/edit"*/}
              {/*    element={*/}
              {/*      <ProtectedRoute role={isDealer}>*/}
              {/*        <DealerProductForm />*/}
              {/*      </ProtectedRoute>*/}
              {/*    }*/}
              {/*  />*/}
              {/*</Route>*/}

              <Route>
                <Route path="/delivery" element={
                  <ProtectedRoute role={isDelivery}>
                      <DeliveryList />
                    </ProtectedRoute>}
                    />
                <Route path="/delivery/:id" element={
                  <ProtectedRoute role={isDelivery}>
                      <DeliveryDetails />
                    </ProtectedRoute>} />
              </Route>


              <Route path="/admin" element={<ProtectedRoute role={isAdmin}>
                      <AdminPanel />
                    </ProtectedRoute>} />
              <Route path="/admin/user/:id/edit" element={<ProtectedRoute role={isAdmin}>
                      <UserDetails />
                    </ProtectedRoute>} />
            </Routes>
            <Footer />
          </Suspense>

          {/* Cart and Scroll-to-Top Buttons */}
          <Link to="/cart">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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
