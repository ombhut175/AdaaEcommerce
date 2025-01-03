import React, { useState } from "react";

const Dropdown = ({ buttonLabel, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const dropDownClass = `inline-flex justify-center items-center w-full dark:text-gray-200 py-2 text-sm font-medium text-black transition-colors 
        duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-blue-600 
        before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:duration-300`

    return (
        <div className="relative inline-block text-left">
            <div className="group">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className={dropDownClass}
                >
                    {buttonLabel}
                    <svg
                        className="w-4 h-4 ml-2 -mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                    </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute left-0 w-40  mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-lg shadow-lg opacity-100 visible transition duration-300">
                        <div className="py-1">
                            {options.map((option, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {option}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
