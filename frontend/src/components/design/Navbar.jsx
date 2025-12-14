import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, LogOut, User, Heart, Menu, X } from "lucide-react"
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const user = useSelector((state) => state.user)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const userDropdownRef = useRef(null)
    const mobileMenuRef = useRef(null)

    // Navigation items - spread directly in header
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Deals", path: "/deals" },
        { name: "Shop", path: "/shop" },
        { name: "New Arrivals", path: "/new-arrivals" },
        { name: "Orders", path: "/orders" },
    ]

    // Role-based items
    const roleItems = [
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
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !event.target.closest('[aria-label="Mobile menu toggle"]')
            ) {
                setIsMobileMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            aria-label="Mobile menu toggle"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>

                        <Link to="/" className="flex-shrink-0">
                            <motion.h1
                                className="text-2xl font-bold text-black dark:text-white hover-transition me-8"
                                whileHover={{ scale: 1.05 }}
                            >
                                ADAA
                            </motion.h1>
                        </Link>

                        {/* Desktop Navigation - Direct Links */}
                        <div className="hidden md:flex items-center gap-5">
                            {navItems.map((item) => (
                                <Link key={item.path} to={item.path}>
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors"
                                    >
                                        {item.name}
                                    </motion.span>
                                </Link>
                            ))}
                            {roleItems.map((item) => (
                                <Link key={item.path} to={item.path}>
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                                    >
                                        {item.name}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4"> {/* Update 3 */}
                        <SearchBar isOpen={isSearchOpen} onToggle={() => setIsSearchOpen(!isSearchOpen)}
                            darkMode={darkMode} />

                        <Link to="/wishlist">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            >
                                <Heart size={24} />
                            </motion.div>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => dispatch(toggleDarkMode())}
                            className="text-xl"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <Sun className="text-yellow-400" size={22} /> : <Moon className="text-gray-700" size={22} />}
                        </motion.button>

                        {user.isLoggedIn ? (
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                    aria-expanded={isDropdownOpen}
                                    aria-haspopup="true"
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
                                            ref={userDropdownRef}
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu-button"
                                        >
                                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                            </div>

                                            <Link to="/profile">
                                                <motion.div
                                                    whileHover={{ x: 4 }}
                                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    role="menuitem"
                                                >
                                                    <User className="text-gray-500 dark:text-gray-400" size={16} />
                                                    <span>Your Profile</span>
                                                </motion.div>
                                            </Link>

                                            <motion.button
                                                whileHover={{ x: 4 }}
                                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => {
                                                    axios.delete(BACKEND_URL + "/clearCookie", { withCredentials: true }).then((res) => {
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
                                                <LogOut size={16} />
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
                                    className="hidden md:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                    onClick={() => navigate("/signIn")}
                                >
                                    Sign In
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md whitespace-nowrap"
                                    onClick={() => navigate("/signUp")}
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
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
                        ref={mobileMenuRef}
                    >
                        <div className="px-4 py-3 space-y-1">
                            {/* Mobile Navigation - Direct Links */}
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="block py-2.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {roleItems.length > 0 && (
                                <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                                    {roleItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="block py-2.5 px-3 text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

