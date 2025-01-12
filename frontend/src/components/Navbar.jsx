import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../redux/slice/userPreferences";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const imagesPath = import.meta.env.VITE_IMAGE_PATH;

    const isDark = useSelector((state) => state.userPreferences.isDarkMode);
    const dispatch = useDispatch();

    // Apply/remove the dark class
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    // Toggle dark mode
    const toggleDarkMode = () => {
        dispatch(setMode(!isDark));
    };

    const navItems = [
        { title: "Home", subCategories: [] },
        { title: "Kurtas", subCategories: ["Casual Kurtas", "Designer Kurtas", "Party Wear"] },
        { title: "Gowns", subCategories: ["Evening Gowns", "Bridal Gowns", "Casual Gowns"] },
        { title: "Bottoms", subCategories: ["Palazzos", "Leggings", "Trousers"] },
        { title: "Tops", subCategories: ["Casual Tops", "Formal Tops", "Crop Tops"] },
        { title: "About Us", subCategories: [] },
        { title: "Contact Us", subCategories: [] },
    ];

    const toggleCategory = (title) => {
        setOpenCategory(openCategory === title ? null : title);
    };

    return (
        <nav className="sticky shadow-md bg-white dark:bg-gray-900">
            <div className="grid grid-cols-12 h-20">
                <div className="md:col-span-2 col-span-3 flex items-center justify-center">
                    <img src={`${imagesPath}/adaa-jaipur-logo.png`} alt="logo" className="w-20 h-20" />
                </div>

                {/* Desktop Navigation */}
                <div className="col-span-8 hidden lg:flex justify-center items-center space-x-6">
                    {navItems.map((navItem) => (
                        <div className="relative group text-lg" key={navItem.title}>
                            <div className="cursor-pointer transition-colors text-gray-800 hover:text-slate-900 dark:text-gray-200 dark:hover:text-slate-400">
                                {navItem.title}
                            </div>
                            {navItem.subCategories.length > 0 && (
                                <div className="absolute left-0 mt-2 w-48 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white dark:bg-gray-800">
                                    {navItem.subCategories.map((subCategory) => (
                                        <div
                                            key={subCategory}
                                            className="px-4 py-2 cursor-pointer transition-colors text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            {subCategory}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Theme Toggle */}
                <div className="col-span-2 hidden lg:flex items-center justify-center">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-md transition-colors text-gray-600 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-800"
                    >
                        {isDark ? <Sun size={24} /> : <Moon size={24} />}
                    </button>

                    {/* wishlist  */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-md transition-colors text-2xl mx-5 text-gray-600 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-800"
                    >
                        <i class="fa-regular fa-heart"></i>
                    </button>

                    {/* login  */}

                    {isLogin ? (
                        <button className="p-2 rounded-md ms-3 transition-colors text-xl text-gray-600 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-800">
                            <i className="fa-solid fa-user"></i>
                        </button>
                    ) : (
                        <button className="px-5 py-2 mx-3 bg-slate-800 text-white rounded-lg transition-colors text-lg hover:bg-slate-400 dark:text-slate-200 dark:bg-gray-800">
                            Login
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="col-span-9 lg:hidden flex justify-end items-center pr-4 space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full transition-colors text-gray-600 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-800"
                    >
                        {isDark ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-md transition-colors text-2xl mx-5 text-gray-600 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-800"
                    >
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md transition-colors text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                } lg:hidden bg-white dark:bg-gray-900`}
                style={{ top: "6rem" }}
            >
                <div className="h-full overflow-y-auto pb-20">
                    {navItems.map((navItem) => (
                        <div key={navItem.title} className="border-b border-gray-100 dark:border-gray-800">
                            <div
                                className="flex items-center justify-between px-6 py-4 cursor-pointer text-gray-800 dark:text-gray-200"
                                onClick={() => toggleCategory(navItem.title)}
                            >
                                <span className="text-lg font-medium">{navItem.title}</span>
                                {navItem.subCategories.length > 0 &&
                                    (openCategory === navItem.title ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
                            </div>

                            {navItem.subCategories.length > 0 && (
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openCategory === navItem.title ? "max-h-96" : "max-h-0"
                                    }`}
                                >
                                    {navItem.subCategories.map((subCategory) => (
                                        <div
                                            key={subCategory}
                                            className="px-8 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            {subCategory}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}
