import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaMoon, FaSun, FaChevronDown, FaSignOutAlt, FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode, toggleDarkMode } from '../../store/features/themeSlice.js';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const [isAdmin] = useState(false); // Set to false for non-admin users
  
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  };
  
  const isLoggedIn = true;

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const submenuItems = [
    { name: 'Deals', path: '/deals' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' }
  ];

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <Link to="/">
              <motion.h1 
                className="text-2xl font-bold text-black dark:text-white hover-transition"
                whileHover={{ scale: 1.05 }}
              >
                FASCO
              </motion.h1>
            </Link>

            <Link to="/">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Home
              </motion.span>
            </Link>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Browse
                <FaChevronDown className={`transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isSubmenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2"
                  >
                    {submenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsSubmenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ x: 4, backgroundColor: darkMode ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)' }}
                          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <FaSearch />
              </motion.button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link to="/wishlist">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Wishlist
              </motion.span>
            </Link>


            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </motion.button>

            {isLoggedIn ? (
                <div className="relative">
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 focus:outline-none"
                  >
                    <motion.img
                        src={user.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400"
                        whileHover={{ scale: 1.1 }}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-200 dark:border-gray-700"
                        >
                          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>

                          <Link to="/profile">
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <FaUser className="text-gray-500 dark:text-gray-400" />
                              <span>Your Profile</span>
                            </motion.div>
                          </Link>

                          <motion.button
                              whileHover={{ x: 4 }}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => {
                                // Handle logout
                                console.log('Logging out...');
                              }}
                          >
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </motion.button>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            ) : (
                <>
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    Sign In
                  </motion.button>

                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md"
                  >
                    Sign Up
                  </motion.button>
                </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
