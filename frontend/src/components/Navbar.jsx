import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../redux/slice/userPreferences";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [isLogin,setIsLogin]=useState(true)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const imagesPath = `${BACKEND_URL}/api/static`;

    // Redux state and dispatch
    const isDark = useSelector(state => state.userPreferences.isDarkMode);
    const dispatch = useDispatch();
    
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
        <nav className={`relative shadow-md ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="grid grid-cols-12 h-24">
                <div className="md:col-span-2 col-span-3  flex items-center justify-center">
                    <img src={`${imagesPath}/adaa-jaipur-logo.png`} alt="logo" className="w-20 h-20 " />
                </div>
                
                {/* Desktop Navigation */}
                <div className="col-span-8 hidden lg:flex justify-center items-center space-x-6">
                    {navItems.map((navItem) => (
                        <div className="relative group text-xl" key={navItem.title}>
                            <div className={`cursor-pointer transition-colors ${isDark ? 'text-gray-200 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>
                                {navItem.title}
                            </div>
                            {navItem.subCategories.length > 0 && (
                                <div className={`absolute left-0 mt-2 w-48 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                    {navItem.subCategories.map((subCategory) => (
                                        <div
                                            key={subCategory}
                                            className={`px-4 py-2 cursor-pointer transition-colors ${
                                                isDark 
                                                ? 'text-gray-300 hover:bg-gray-700' 
                                                : 'text-gray-800 hover:bg-gray-50'
                                            }`}
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
                <div className="col-span-1 hidden lg:flex items-center justify-center">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {isDark ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    
                    <button
                        className={`p-2 rounded-full transition-colors text-xl ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                    <button
                        className={`p-2 rounded-full transition-colors text-xl ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <i className="fa-regular fa-heart"></i>
                    </button>
                    {isLogin? <button className={`p-2 rounded-full transition-colors text-xl ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}>
                    <i className="fa-solid fa-user"></i>
                    </button>:<button className={`px-5 py-2 mx-1 bg-slate-800 text-white  rounded-full transition-colors text-lg ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-slate-400'
                        }`}>
                    Login
                    </button>}
                </div>

                {/* Mobile Menu Button */}
                <div className="col-span-9 lg:hidden flex justify-end items-center pr-4 space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {isDark ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    
                    <button
                        className={`p-2 rounded-full transition-colors ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                    <button
                        className={`p-2 rounded-full transition-colors text-lg ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <i className="fa-regular fa-heart"></i>
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`p-2 rounded-md transition-colors ${
                            isDark 
                            ? 'text-gray-200 hover:bg-gray-800' 
                            : 'text-gray-800 hover:bg-gray-100'
                        }`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } lg:hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}
                style={{ top: '6rem' }}
            >
                <div className="h-full overflow-y-auto pb-20">
                    {navItems.map((navItem) => (
                        <div key={navItem.title} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                            <div
                                className={`flex items-center justify-between px-6 py-4 cursor-pointer ${
                                    isDark ? 'text-gray-200' : 'text-gray-800'
                                }`}
                                onClick={() => toggleCategory(navItem.title)}
                            >
                                <span className="text-lg font-medium">{navItem.title}</span>
                                {navItem.subCategories.length > 0 && (
                                    openCategory === navItem.title ? 
                                    <ChevronUp size={20} /> : 
                                    <ChevronDown size={20} />
                                )}
                            </div>
                            
                            {navItem.subCategories.length > 0 && (
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openCategory === navItem.title ? 'max-h-96' : 'max-h-0'
                                    }`}
                                >
                                    {navItem.subCategories.map((subCategory) => (
                                        <div
                                            key={subCategory}
                                            className={`px-8 py-3 transition-colors ${
                                                isDark 
                                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {subCategory}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {isLogin? <button className={`p-2 rounded-full transition-colors text-lg ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}>
                    <i className="fa-solid fa-user"></i>
                    </button>:<button className={`px-5 py-2 mx-1 bg-slate-800 text-white  rounded-full transition-colors text-lg ${
                            isDark 
                            ? 'text-yellow-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-slate-400'
                        }`}>
                    Login
                    </button>}
                </div>
            </div>
        </nav>
    );
}