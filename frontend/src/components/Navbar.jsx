import React from "react";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b">
            {/* Hamburger Menu */}
            <button className="text-2xl">
                <span className="material-icons"><i class="fi fi-tr-bars-sort"></i></span>
            </button>

            {/* Logo */}
            <div className="text-center">
                <h1 className="text-lg font-serif font-bold leading-tight ">
                    <img src="https://cdn.shopify.com/s/files/1/0795/7800/5807/files/PNG-Logo_200x60@2x.png?v=1706964393.webp" alt="" className="h-16" />
                </h1>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
                <button className="text-2xl">
                    <span className="material-icons"><i class="fi fi-tc-search"></i></span>
                </button>
                <button className="text-2xl">
                    <span className="material-icons"><i class="fi fi-rr-shopping-bag-add"></i></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
