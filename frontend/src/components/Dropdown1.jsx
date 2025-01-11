// import React, { useState } from "react";

// const Dropdown = ({ buttonLabel, options }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     const dropDownClass = `inline-flex justify-center items-center w-full dark:text-gray-200 py-2 text-sm font-medium text-black transition-colors 
//         duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-blue-600 
//         before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:duration-300`;

//     return (
//         <div className="relative inline-block text-left">
//             <div className="group">
//                 <button
//                     type="button"
//                     onClick={toggleDropdown}
//                     className={dropDownClass}
//                 >
//                     {buttonLabel}
//                     <svg
//                         className="w-4 h-4 ml-2 -mr-1"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                     >
//                         <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
//                     </svg>
//                 </button>

//                 {/* Dropdown menu */}
//                 {isOpen && (
//                     <div className="absolute left-0 w-40 mt-1 origin-top-left bg-white bg-opacity-20 divide-y divide-gray-100 rounded-lg shadow-lg opacity-100 visible transition duration-300">
//                         <div className="py-1">
//                             {options.map((option, index) => (
//                                 <a
//                                     key={index}
//                                     href={option.path} // Use the 'path' from the option
//                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 >
//                                     {option.name} {/* Display the page name */}
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dropdown;


import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ buttonLabel, options, isMobile = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const dropDownClass = `
        ${isMobile ? "block w-full" : "inline-flex"} 
        justify-between items-center py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-800 
        dark:hover:text-white transition-colors duration-300
    `;

    return (
        <div className={`relative ${isMobile ? "w-full" : "inline-block"} text-left`}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={dropDownClass}
            >
                {buttonLabel}
                <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className={`absolute ${isMobile ? "static" : "left-0"} w-40 mt-1 bg-white dark:bg-gray-800 dark:bg-opacity-75 divide-y divide-gray-100 rounded-lg shadow-lg`}
                >
                    <div className="py-1">
                        {options.map((option, index) => (
                            <Link
                                key={index}
                                to={option.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                {option.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;