import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaMoon, FaSun, FaChevronDown, FaSignOutAlt, FaUser, FaHeart, FaBars, FaTimes } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectDarkMode, toggleDarkMode } from "../../store/features/themeSlice.js"
import { changeRole, fetchUser, logOutUser } from "../../store/features/userSlice.js"
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
        { name: "Dealer", path: "/dealer/products" },
        { name: "Orders", path: "/orders" },
        { name: "Delivery Boy", path: "/delivery" },
    ]


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

    const giveAdmin = async () => {
        dispatch(changeRole("admin"))
    }

    return (
        <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            aria-label="Mobile menu toggle"
                        >
                            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </motion.button>

                        <Link to="/" className="flex-shrink-0">
                            <motion.h1
                                className="text-2xl font-bold text-black dark:text-white hover-transition me-12"
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
                                    aria-expanded={isSubmenuOpen}
                                    aria-haspopup="true"
                                >
                                    Browse
                                    <FaChevronDown className={`transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {isSubmenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2"
                                            ref={submenuRef}
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu-button"
                                        >
                                            {submenuItems.map((item) => (
                                                <Link key={item.path} to={item.path} onClick={() => setIsSubmenuOpen(false)}>
                                                    <motion.div
                                                        whileHover={{
                                                            x: 4,
                                                            backgroundColor: darkMode ? "rgb(55, 65, 81)" : "rgb(243, 244, 246)",
                                                        }}
                                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                                        role="menuitem"
                                                    >
                                                        {item.name}
                                                    </motion.div>
                                                </Link>
                                            ))}
                                            <motion.div
                                                whileHover={{
                                                    x: 4,
                                                    backgroundColor: darkMode ? "rgb(55, 65, 81)" : "rgb(243, 244, 246)",
                                                }}
                                                className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                                onClick={giveAdmin}
                                                role="menuitem"
                                            >
                                                Admin
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <SearchBar isOpen={isSearchOpen} onToggle={() => setIsSearchOpen(!isSearchOpen)} darkMode={darkMode} />

                        <Link to="/wishlist">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            >
                                <FaHeart className="text-2xl" />
                            </motion.div>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => dispatch(toggleDarkMode())}
                            className="text-xl"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
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
                                                    <FaUser className="text-gray-500 dark:text-gray-400" />
                                                    <span>Your Profile</span>
                                                </motion.div>
                                            </Link>

                                            <motion.button
                                                whileHover={{ x: 4 }}
                                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => {
                                                    axios.delete(BACKEND_URL + "/clearCookie").then((res) => {
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
                                    onClick={() => navigate("/signIn")}
                                >
                                    Sign In
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md"
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
                        ref={mobileSubmenuRef}
                    >
                        <div className="px-4 py-2 space-y-4">
                            <Link to="/" className="block py-2 text-gray-700 dark:text-gray-300">
                                Home
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                                    className="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-300"
                                    aria-expanded={isSubmenuOpen}
                                    aria-haspopup="true"
                                >
                                    <span>Browse</span>
                                    <FaChevronDown className={`transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isSubmenuOpen && (
                                    <div className="pl-4 space-y-2" ref={submenuRef}>
                                        {submenuItems.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className="block py-2 text-gray-600 dark:text-gray-400"
                                                onClick={() => {
                                                    setIsSubmenuOpen(false)
                                                    setIsMobileMenuOpen(false)
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
    )
}