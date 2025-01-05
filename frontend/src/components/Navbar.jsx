import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown1";

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        // Add fade-in animation to nav links
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
        });

        // Toggle dark mode based on system preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
        if (e.target.value === "") setIsFocused(false);
    };

    const options = [
        { name: 'Home', path: '/home' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const options2 = [
        { name: 'kutri', path: '/kurti' },
        { name: 'Salvar', path: '/salvar' },
        { name: 'Top', path: '/top' },
    ];

    const navLinkClasses = `
        nav-link relative text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300 
        before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-blue-600 
        before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:duration-300`;

    return (
        <header className="bg-white dark:bg-gray-800 shadow-lg h-16">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblNVEx4GuR8vBCHczvzvksIqZG31AkJxvEQ&s"
                    alt="Logo"
                    className="h-12 w-auto"
                />

                <div className="hidden md:flex space-x-6">
                    <Link to="/home" className={navLinkClasses}>
                        Home
                    </Link>
                    <Link to="/blogGridView" className={navLinkClasses}>
                        BlogGridView
                    </Link>
                    <Link to="/blogListView" className={navLinkClasses}>
                        BlogListView
                    </Link>
                    <Link to="/productList" className={navLinkClasses}>
                        Product
                    </Link>
                    <Link to="/discountProductList" className={navLinkClasses}>
                        Offers
                    </Link>

                    {/* Drop Down Menus */}
                    <Dropdown buttonLabel="Views" options={options} />
                    <Dropdown buttonLabel="Dress" options={options} />
                </div>
               
                {/* Search Bar */}
                <div className="flex justify-center items-center">
                    <div className="relative">
                        <input
                            type="text"
                            className={`bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-offset-1 transition-all duration-300 ease-in-out w-12 ${isFocused ? "w-64" : ""}`}
                            placeholder="Search..."
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <svg className="h-6 w-6 fill-current text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Toggle Button */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className="text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none transition-colors duration-300"
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu md:hidden bg-white bg-opacity-50 dark:bg-gray-800 shadow-lg absolute w-full left-0 transform translate-y-0 opacity-100">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        <Link to="/home" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
                            Home
                        </Link>
                        <Link className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
                            <Dropdown buttonLabel="Views" options={options} />
                        </Link>
                        <Link  className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
                            <Dropdown buttonLabel="Views" options={options2} />
                        </Link>
                        <Link to="#" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
                            Contact
                        </Link>
                        <Link to="#" className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
