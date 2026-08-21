import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaMoon, FaSun, FaChevronDown, FaSignOutAlt, FaUser, FaHeart, FaBars, FaTimes } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectDarkMode, toggleDarkMode } from "../../store/features/themeSlice.js"
import { fetchUser, logOutUser } from "../../store/features/userSlice.js"
import axios from "axios"
import { toast } from "react-toastify"
import { SearchBar } from "./SearchBar"

export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const darkMode = useSelector(selectDarkMode)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const user = useSelector((state) => state.user)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const userDropdownRef = useRef(null)
    const submenuRef = useRef(null)
    const mobileSubmenuRef = useRef(null)

    const submenuItems = [
        { name: "Deals", path: "/deals" },
        { name: "Shop", path: "/shop" },
        { name: "New Arrivals", path: "/new-arrivals" },
        { name: "Orders", path: "/orders" },
        ...(user.role?.includes("dealer") ? [{ name: "Dealer", path: "/dealer/products" }] : []),
        ...(user.role?.includes("delivery") ? [{ name: "Delivery Boy", path: "/delivery" }] : []),
        ...(user.role?.includes("admin") ? [{ name: "Admin", path: "/admin" }] : []),
    ]

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
            if (submenuRef.current && !submenuRef.current.contains(event.target)) {
                setIsSubmenuOpen(false)
            }
            if (
                mobileSubmenuRef.current &&
                !mobileSubmenuRef.current.contains(event.target) &&
                !event.target.closest('[aria-label="Mobile menu toggle"]')
            ) {
                setIsSubmenuOpen(false)
                setIsMobileMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <nav className="fixed w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-6">
                        <motion.button
                            whileTap={{scale: 0.95}}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            aria-label="Mobile menu toggle"
                        >
                            {isMobileMenuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
                        </motion.button>

                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <motion.h1
                                className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-500 mr-8"
                                whileHover={{scale: 1.05}}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                ADAA
                            </motion.h1>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/">
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Home
                                </span>
                            </Link>

                            <div className="relative">
                                <button
                                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    aria-expanded={isSubmenuOpen}
                                    aria-haspopup="true"
                                >
                                    Browse
                                    <FaChevronDown
                                        className={`text-[10px] transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`}/>
                                </button>

                                <AnimatePresence>
                                    {isSubmenuOpen && (
                                        <motion.div
                                            initial={{opacity: 0, y: 10, scale: 0.95}}
                                            animate={{opacity: 1, y: 0, scale: 1}}
                                            exit={{opacity: 0, y: 10, scale: 0.95}}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-4 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-3 border border-gray-100 dark:border-gray-800"
                                            ref={submenuRef}
                                            role="menu"
                                        >
                                            {submenuItems.map((item) => (
                                                <Link key={item.path} to={item.path}
                                                      onClick={() => setIsSubmenuOpen(false)}>
                                                    <div
                                                        className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all"
                                                        role="menuitem"
                                                    >
                                                        {item.name}
                                                    </div>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <SearchBar isOpen={isSearchOpen} onToggle={() => setIsSearchOpen(!isSearchOpen)} darkMode={darkMode}/>

                        <Link to="/wishlist" className="hidden sm:block">
                            <motion.div
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                            >
                                <FaHeart className="text-xl"/>
                            </motion.div>
                        </Link>

                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            onClick={() => dispatch(toggleDarkMode())}
                            className="text-xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </motion.button>

                        {user.isLoggedIn ? (
                            <div className="relative">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center focus:outline-none"
                                >
                                    <div className="relative">
                                        <img
                                            src={user.profilePicture}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent hover:ring-indigo-500 dark:hover:ring-indigo-400 transition-all"
                                        />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                                    </div>
                                </motion.button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{opacity: 0, y: 10, scale: 0.95}}
                                            animate={{opacity: 1, y: 0, scale: 1}}
                                            exit={{opacity: 0, y: 10, scale: 0.95}}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-4 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-2 border border-gray-100 dark:border-gray-800"
                                            ref={userDropdownRef}
                                            role="menu"
                                        >
                                            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate mt-1">{user.email}</p>
                                            </div>

                                            <div className="p-2">
                                                <Link to="/profile">
                                                    <div
                                                        className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                                        role="menuitem"
                                                    >
                                                        <FaUser className="text-gray-400"/>
                                                        <span>Your Profile</span>
                                                    </div>
                                                </Link>

                                                <button
                                                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-1"
                                                    onClick={() => {
                                                        axios.delete(BACKEND_URL + "/clearCookie",{withCredentials:true}).then((res) => {
                                                            if (res.data?.success) {
                                                                dispatch(logOutUser())
                                                                navigate("/signin")
                                                            } else {
                                                                toast("Failed Log Out")
                                                            }
                                                        })
                                                    }}
                                                    role="menuitem"
                                                >
                                                    <FaSignOutAlt/>
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    className="hidden md:block px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    onClick={() => navigate("/signIn")}
                                >
                                    Log In
                                </button>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold rounded-full shadow-lg shadow-indigo-500/30 transition-all whitespace-nowrap"
                                    onClick={() => navigate("/signUp")}
                                >
                                    Sign Up
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 overflow-hidden"
                        ref={mobileSubmenuRef}
                    >
                        <div className="px-4 py-4 space-y-2">
                            <Link to="/" className="block px-4 py-3 text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                                Home
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                                    className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                                >
                                    <span>Browse</span>
                                    <FaChevronDown
                                        className={`transition-transform duration-300 text-sm ${isSubmenuOpen ? "rotate-180" : ""}`}/>
                                </button>
                                <AnimatePresence>
                                    {isSubmenuOpen && (
                                        <motion.div 
                                            initial={{opacity: 0, height: 0}}
                                            animate={{opacity: 1, height: "auto"}}
                                            exit={{opacity: 0, height: 0}}
                                            className="px-4 py-2 space-y-1 overflow-hidden" 
                                            ref={submenuRef}
                                        >
                                            {submenuItems.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800/50 rounded-lg"
                                                    onClick={() => {
                                                        setIsSubmenuOpen(false)
                                                        setIsMobileMenuOpen(false)
                                                    }}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

