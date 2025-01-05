import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
    dotsClass: "slick-dots custom-dots", // Custom class for better styling
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="dark:bg-gray-800 bg-gray-300 py-10">
      <div className="container mx-auto">
        <div className="carousel-wrapper mx-auto max-w-4xl lg:rounded-lg overflow-hidden">
          <Slider {...settings}>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                alt="Slide 1"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://miro.medium.com/v2/resize:fit:1400/1*nculSVfbqj3yg5FR8Kk3AQ.jpeg"
                alt="Slide 2"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://www.worldfashionexchange.com/blog/wp-content/uploads/2024/01/PRADA.webp"
                alt="Slide 3"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                alt="Slide 4"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://www.miamiamine.com/wp-content/uploads/2019/10/Mia-Mia-Mine-Louis-Vuitton-Scarf-1-650x975.jpeg"
                alt="Slide 5"
              />
            </div>
            <div>
              <img
                className="w-full h-64 md:h-96 object-cover"
                src="https://www.worldfashionexchange.com/blog/wp-content/uploads/2024/01/PRADA.webp"
                alt="Slide 6"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

// Custom Next Arrow
const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} bg-red-500 hover:bg-gray-700 p-2 rounded-full`}
      onClick={onClick}
    >
      ▶
    </div>
  );
};

// Custom Prev Arrow
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} bg-red-500 hover:bg-gray-700 p-2 rounded-full`}
      onClick={onClick}
    >
      ◀
    </div>
  );
};
// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import Dropdown from "../components/Dropdown1";

// function Navbar() {
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

//     const searchRef = useRef(null); // Ref for the search dropdown and input

//     const toggleDarkMode = () => {
//         setIsDarkMode(!isDarkMode);
//         document.documentElement.classList.toggle("dark");
//     };

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };

//     const toggleSearchDropdown = () => {
//         setIsSearchDropdownOpen(!isSearchDropdownOpen);
//     };

//     useEffect(() => {
//         // Close search dropdown when clicking outside
//         const handleClickOutside = (event) => {
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setIsSearchDropdownOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const navLinkClasses = `
//         nav-link relative text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300 
//         before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-blue-600 
//         before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:duration-300`;

//     return (
//         <header className="bg-white dark:bg-gray-800 shadow-lg h-16">
//             <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
//                 {/* Logo */}
//                 <img
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblNVEx4GuR8vBCHczvzvksIqZG31AkJxvEQ&s"
//                     alt="Logo"
//                     className="h-12 mb-1 w-auto"
//                 />

//                 {/* Links for Larger Screens */}
//                 <div className="hidden md:flex space-x-6">
//                     <Link to="/home" className={navLinkClasses}>
//                         Home
//                     </Link>
//                     <Link to="/blogGridView" className={navLinkClasses}>
//                         BlogGridView
//                     </Link>
//                     <Link to="/blogListView" className={navLinkClasses}>
//                         BlogListView
//                     </Link>
//                     <Link to="/productList" className={navLinkClasses}>
//                         Product
//                     </Link>
//                 </div>

//                 {/* Dropdown Example */}
//                 <Dropdown buttonLabel="Menu 1" options={["Option 1", "Option 2", "Option 3"]} />

//                 {/* Search Icon */}
//                 <div className="relative" ref={searchRef}>
//                     <button
//                         onClick={toggleSearchDropdown}
//                         className="text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5a6 6 0 100 12 6 6 0 000-12zm10 10l-4.35-4.35" />
//                         </svg>
//                     </button>

//                     {isSearchDropdownOpen && (
//                         <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg rounded-lg p-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 className="w-full border-b border-gray-300 dark:border-gray-600 focus:outline-none text-sm py-2 mb-4 bg-transparent text-gray-700 dark:text-gray-200"
//                             />
//                             <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-3">Suggestions</h3>
//                             <ul className="space-y-2">
//                                 {["Pink cotton top", "Pushkar jumpsuit", "Cotton dresses", "Handblock PJ sets", "Chogha sets"].map(
//                                     (item, index) => (
//                                         <li
//                                             key={index}
//                                             className="text-gray-600 dark:text-gray-300 hover:text-indigo-800 dark:hover:text-white cursor-pointer transition-all"
//                                         >
//                                             {item}
//                                         </li>
//                                     )
//                                 )}
//                             </ul>
//                         </div>
//                     )}
//                 </div>

//                 {/* Dark Mode Toggle */}
//                 <div className="hidden md:flex items-center space-x-4">
//                     <button
//                         onClick={toggleDarkMode}
//                         className="text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none transition-colors duration-300"
//                     >
//                         {isDarkMode ? (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//                             </svg>
//                         ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//                             </svg>
//                         )}
//                     </button>
//                 </div>

//                 {/* Hamburger Menu for Mobile */}
//                 <button
//                     onClick={toggleMobileMenu}
//                     className="md:hidden text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none"
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//                     </svg>
//                 </button>
//             </nav>

//             {/* Mobile Menu */}
//             <div
//                 className={`mobile-menu md:hidden bg-white dark:bg-gray-800 shadow-lg absolute w-full left-0 transition-transform duration-300 ${
//                     isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
//                 }`}
//             >
//                 <div className="container mx-auto px-4 py-4 space-y-4">
//                     <Link to="/home" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
//                         Home
//                     </Link>
//                     <Link to="/about" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
//                         About
//                     </Link>
//                     <Link to="/services" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
//                         Services
//                     </Link>
//                     <Link to="/contact" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
//                         Contact
//                     </Link>
//                     <Link to="/signup" className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
//                         Sign Up
//                     </Link>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Navbar;
