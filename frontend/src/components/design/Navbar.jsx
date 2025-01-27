import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaMoon, FaSun, FaChevronDown, FaSignOutAlt, FaUser, FaSearch, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {selectDarkMode, toggleDarkMode} from "../../store/features/themeSlice.js";
import {fetchUser} from "../../store/features/userSlice.js";
import axios from "axios";

    const searchSuggestions = [
      {
        type: 'recent',
        items: [
          { id: 1, text: 'Summer dresses' },
          { id: 2, text: 'Denim jackets' }
        ]
      },
      {
        type: 'trending',
        items: [
          { id: 3, text: 'Winter collection 2024' },
          { id: 4, text: 'Party wear' },
          { id: 5, text: 'Casual outfits' }
        ]
      },
      {
        type: 'popular',
        items: [
          { id: 6, text: 'Designer bags' },
          { id: 7, text: 'Sneakers' },
          { id: 8, text: 'Accessories' }
        ]
      }
    ];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const [isAdmin] = useState(false);
  const user = useSelector(state => state.user);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


      const isLoggedIn = true;

  useEffect(() => {

    dispatch(fetchUser());

    console.log(user);

    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsSearchOpen(false);
      }
    };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

      const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
          setIsSearchOpen(false);
          setShowSuggestions(false);
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
          setSearchQuery('');
        }
      };

      const handleSearchFocus = () => {
        setShowSuggestions(true);
      };

      const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.text);
        setShowSuggestions(false);
        setIsSearchOpen(false);
        navigate(`/search?q=${encodeURIComponent(suggestion.text)}`);
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
                <div className="flex items-center gap-4">
                  <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="md:hidden text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                  </motion.button>

                  <Link to="/" className="flex-shrink-0">
                    <motion.h1
                        className="text-2xl font-bold text-black dark:text-white hover-transition"
                        whileHover={{ scale: 1.05 }}
                    >
                      ADAA
                    </motion.h1>
                  </Link>

                  <div className="hidden md:flex items-center gap-6">
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
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
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
                </div>

                <div className="flex items-center gap-4">
                  <div ref={searchContainerRef} className="relative">
                    <motion.div
                        initial={false}
                        animate={{ width: isSearchOpen ? "240px" : "40px" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative"
                    >
                      {!isSearchOpen ? (
                          <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setIsSearchOpen(true)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                          >
                            <FaSearch size={20} />
                          </motion.button>
                      ) : (
                          <motion.form
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onSubmit={handleSearchSubmit}
                              className="relative"
                          >
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={handleSearchFocus}
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                autoFocus
                            />
                            <FaSearch
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                size={16}
                            />
                          </motion.form>
                      )}

                      <AnimatePresence>
                        {showSuggestions && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full right-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50"
                            >
                              {searchSuggestions.map((section, index) => (
                                  <div key={section.type} className={index > 0 ? 'border-t border-gray-200 dark:border-gray-700 pt-2 mt-2' : ''}>
                                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                      {section.type}
                                    </div>
                                    {section.items.map((suggestion) => (
                                        <motion.div
                                            key={suggestion.id}
                                            whileHover={{ backgroundColor: darkMode ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)' }}
                                            className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                          <div className="flex items-center gap-2">
                                            <FaSearch size={12} className="text-gray-400" />
                                            {suggestion.text}
                                          </div>
                                        </motion.div>
                                    ))}
                                  </div>
                              ))}
                            </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <Link to="/wishlist">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      <FaHeart size={20} />
                    </motion.div>
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
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400"
                          whileHover={{ scale: 1.1 }}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                          <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-200 dark:border-gray-700"
                          >
                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                {user.name}
                              </p>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
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

            <AnimatePresence>
              {isMobileMenuOpen && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
                  >
                    <div className="px-4 py-2 space-y-4">
                      <Link to="/" className="block py-2 text-gray-700 dark:text-gray-300">
                        Home
                      </Link>
                      <div className="relative">
                        <button
                            onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                            className="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-300"
                        >
                          <span>Browse</span>
                          <FaChevronDown className={`transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSubmenuOpen && (
                            <div className="pl-4 space-y-2">
                              {submenuItems.map((item) => (
                                  <Link
                                      key={item.path}
                                      to={item.path}
                                      className="block py-2 text-gray-600 dark:text-gray-400"
                                      onClick={() => {
                                        setIsSubmenuOpen(false);
                                        setIsMobileMenuOpen(false);
                                      }}
                                  >
                                    {item.name}
                                  </Link>
                              ))}
                            </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </nav>
      );
    }