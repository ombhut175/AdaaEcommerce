import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
<<<<<<< HEAD
import { Moon, Sun, LogOut, User, Heart, Menu, X } from "lucide-react"
=======
import { FaMoon, FaSun, FaChevronDown, FaSignOutAlt, FaUser, FaHeart, FaBars, FaTimes } from "react-icons/fa"
>>>>>>> origin
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
<<<<<<< HEAD
=======
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
>>>>>>> origin
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const user = useSelector((state) => state.user)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const userDropdownRef = useRef(null)
<<<<<<< HEAD
    const mobileMenuRef = useRef(null)

    // Navigation items - spread directly in header
    const navItems = [
        { name: "Home", path: "/" },
=======
    const submenuRef = useRef(null)
    const mobileSubmenuRef = useRef(null)

    const submenuItems = [
>>>>>>> origin
        { name: "Deals", path: "/deals" },
        { name: "Shop", path: "/shop" },
        { name: "New Arrivals", path: "/new-arrivals" },
        { name: "Orders", path: "/orders" },
<<<<<<< HEAD
    ]

    // Role-based items
    const roleItems = [
=======
>>>>>>> origin
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
<<<<<<< HEAD
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !event.target.closest('[aria-label="Mobile menu toggle"]')
            ) {
=======
            if (submenuRef.current && !submenuRef.current.contains(event.target)) {
                setIsSubmenuOpen(false)
            }
            if (
                mobileSubmenuRef.current &&
                !mobileSubmenuRef.current.contains(event.target) &&
                !event.target.closest('[aria-label="Mobile menu toggle"]')
            ) {
                setIsSubmenuOpen(false)
>>>>>>> origin
                setIsMobileMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
<<<<<<< HEAD
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
=======
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8"> {/* Update 2 */}
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileTap={{scale: 0.95}}
>>>>>>> origin
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            aria-label="Mobile menu toggle"
                        >
<<<<<<< HEAD
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
=======
                            {isMobileMenuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
>>>>>>> origin
                        </motion.button>

                        <Link to="/" className="flex-shrink-0">
                            <motion.h1
<<<<<<< HEAD
                                className="text-2xl font-bold text-black dark:text-white hover-transition me-8"
                                whileHover={{ scale: 1.05 }}
=======
                                className="text-2xl font-bold text-black dark:text-white hover-transition me-12"
                                whileHover={{scale: 1.05}}
>>>>>>> origin
                            >
                                ADAA
                            </motion.h1>
                        </Link>

<<<<<<< HEAD
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
=======
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/">
                                <motion.span
                                    whileHover={{scale: 1.1}}
                                    className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                >
                                    Home
                                </motion.span>
                            </Link>

                            <div className="relative">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                                    className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                    aria-expanded={isSubmenuOpen}
                                    aria-haspopup="true"
                                >
                                    Browse
                                    <FaChevronDown
                                        className={`transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`}/>
                                </motion.button>

                                <AnimatePresence>
                                    {isSubmenuOpen && (
                                        <motion.div
                                            initial={{opacity: 0, y: -10}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: -10}}
                                            className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2"
                                            ref={submenuRef}
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu-button"
                                        >
                                            {submenuItems.map((item) => (
                                                <Link key={item.path} to={item.path}
                                                      onClick={() => setIsSubmenuOpen(false)}>
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
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
>>>>>>> origin
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4"> {/* Update 3 */}
                        <SearchBar isOpen={isSearchOpen} onToggle={() => setIsSearchOpen(!isSearchOpen)}
<<<<<<< HEAD
                            darkMode={darkMode} />

                        <Link to="/wishlist">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            >
                                <Heart size={24} />
=======
                                   darkMode={darkMode}/>

                        <Link to="/wishlist">
                            <motion.div
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            >
                                <FaHeart className="text-2xl"/>
>>>>>>> origin
                            </motion.div>
                        </Link>

                        <motion.button
<<<<<<< HEAD
                            whileHover={{ scale: 1.1 }}
=======
                            whileHover={{scale: 1.1}}
>>>>>>> origin
                            onClick={() => dispatch(toggleDarkMode())}
                            className="text-xl"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
<<<<<<< HEAD
                            {darkMode ? <Sun className="text-yellow-400" size={22} /> : <Moon className="text-gray-700" size={22} />}
=======
                            {darkMode ? <FaSun className="text-yellow-400"/> : <FaMoon className="text-gray-700"/>}
>>>>>>> origin
                        </motion.button>

                        {user.isLoggedIn ? (
                            <div className="relative">
                                <motion.button
<<<<<<< HEAD
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
=======
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
>>>>>>> origin
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                    aria-expanded={isDropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <motion.img
                                        src={user.profilePicture}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400"
<<<<<<< HEAD
                                        whileHover={{ scale: 1.1 }}
=======
                                        whileHover={{scale: 1.1}}
>>>>>>> origin
                                    />
                                </motion.button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
<<<<<<< HEAD
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
=======
                                            initial={{opacity: 0, y: -10, scale: 0.95}}
                                            animate={{opacity: 1, y: 0, scale: 1}}
                                            exit={{opacity: 0, y: -10, scale: 0.95}}
>>>>>>> origin
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
<<<<<<< HEAD
                                                    whileHover={{ x: 4 }}
                                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    role="menuitem"
                                                >
                                                    <User className="text-gray-500 dark:text-gray-400" size={16} />
=======
                                                    whileHover={{x: 4}}
                                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    role="menuitem"
                                                >
                                                    <FaUser className="text-gray-500 dark:text-gray-400"/>
>>>>>>> origin
                                                    <span>Your Profile</span>
                                                </motion.div>
                                            </Link>

                                            <motion.button
<<<<<<< HEAD
                                                whileHover={{ x: 4 }}
                                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => {
                                                    axios.delete(BACKEND_URL + "/clearCookie", { withCredentials: true }).then((res) => {
=======
                                                whileHover={{x: 4}}
                                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => {
                                                    axios.delete(BACKEND_URL + "/clearCookie",{withCredentials:true}).then((res) => {
>>>>>>> origin
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
<<<<<<< HEAD
                                                <LogOut size={16} />
=======
                                                <FaSignOutAlt/>
>>>>>>> origin
                                                <span>Logout</span>
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <motion.button
<<<<<<< HEAD
                                    whileHover={{ scale: 1.05 }}
=======
                                    whileHover={{scale: 1.05}}
>>>>>>> origin
                                    className="hidden md:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                    onClick={() => navigate("/signIn")}
                                >
                                    Sign In
                                </motion.button>

                                <motion.button
<<<<<<< HEAD
                                    whileHover={{ scale: 1.05 }}
=======
                                    whileHover={{scale: 1.05}}
>>>>>>> origin
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
<<<<<<< HEAD
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
=======
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
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
                                    <FaChevronDown
                                        className={`transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`}/>
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
>>>>>>> origin
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

