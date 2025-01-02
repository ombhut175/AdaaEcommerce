import Footer from "../components/Footer";
import 'flowbite';
import Carousel from "./carosle.jsx";
import SimpleSlider from "../components/Slider.jsx";
import { useState } from "react";
import Card_1 from "../components/Card_1.jsx";
import Card_2 from "../components/Card_2.jsx";

export default function HomePage() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };
    return (
        <div className={`w-full ${darkMode ? "dark" : ""}`}>
            {/* Dark Mode Toggle Button */}
            <button
                className="fixed top-4 right-4 p-2 bg-indigo-600 text-white rounded-full focus:outline-none"
                onClick={toggleDarkMode}
            >
                {darkMode ? "Light" : "Dark"}
            </button>

            <div className="flex items-center justify-center flex-col">
                <div className="w-full flex flex-col items-center justify-center">

                    {/* text image */}
                    <div className="absolute text-start text-indigo-800 font-bold text-lg italic">
                        LUXURY <br />FASHION <br />& ACCESSORIES
                    </div>

                    <div className="absolute top-full rounded-3xl w-auto text-center py-2 px-10 bg-opacity-60 bg-black text-white">
                        Your Heading Here
                    </div>

                    {/* images */}
                    <div className="w-full">
                        <img
                            src="https://www.miamiamine.com/wp-content/uploads/2019/10/Mia-Mia-Mine-Louis-Vuitton-Scarf-1-650x975.jpeg"
                            alt="Description"
                            className="w-full h-auto sm:hidden"
                        />
                        <img
                            className="md:block hidden h-auto w-full"
                            src="https://miro.medium.com/v2/resize:fit:1400/1*nculSVfbqj3yg5FR8Kk3AQ.jpeg"
                            alt="Alternate Description"
                        />
                    </div>
                </div>
            </div>

            <div>
                <SimpleSlider />
            </div>

            {/* body start */}
            <div className="bg-gray-200 dark:bg-gray-900">
                <div className="justify-center flex items-center flex-col">
                    <h1 className="mt-10 text-4xl font-bold text-indigo-800 dark:text-white">NEW ARRIVAL !</h1>
                    <hr class="w-52 h-1 mx-auto my-4 bg-emerald-700 border-0 rounded md:my-5 dark:bg-gray-600" />
                </div>

                {/* cards */}
                <div className="w-full h-auto flex flex-wrap justify-center gap-6 p-4">
                    <Card_1 />
                    <Card_1 />
                    <Card_1 />
                    <Card_1 />
                    <Card_1 />
                </div>

                {/* Explore More Button */}
                <div class="flex flex-col items-center justify-center space-y-4">
                    <div className="m-5">
                        <a
                            className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                            href="#"
                        >
                            <span className="absolute -start-full transition-all group-hover:start-4">
                                <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>

                            <span className="text-lg font-medium transition-all group-hover:ms-4"> Explore More </span>
                        </a>
                    </div>

                    {/* divider */}
                    <div class="w-80 flex items-center justify-center space-x-4">
                        <span class="w-32 h-1 bg-black dark:bg-slate-400 rounded-full"></span>
                        <span class="text-2xl dark:text-slate-100">&#10070;</span>
                        <span class="w-32 h-1 bg-black dark:bg-slate-400 rounded-full"></span>
                    </div>

                    {/* text */}
                    <div class="sm:flex sm:justify-center sm:space-x-20 space-y-5 sm:space-y-0">
                        <div class="flex flex-col items-center">
                            <h3 class="text-gray-800 dark:text-white font-bold text-xl">PRADA</h3>
                            <h3 class="text-gray-800 dark:text-white font-bold text-xl">Cartier</h3>
                        </div>
                        <div class="flex flex-col items-center">
                            <h3 class="text-gray-800 dark:text-white font-bold text-xl">BURBERRY</h3>
                            <h3 class="text-gray-800 dark:text-white font-bold text-xl">GUCCI</h3>
                        </div>
                        <div class="flex flex-col items-center">
                            <h3 class="text-gray-800 dark:text-white font-bold text-xl">BOSS</h3>
                            <h3 class="text-gray-800 dark:text-white font-bold text-xl">TIFFANY</h3>
                        </div>
                        <div class="flex flex-col items-center">
                            <h3 class="text-gray-800 dark:text-white font-bold text-xl">PRADA</h3>
                            <h3 class="text-gray-800 dark:text-white font-bold text-xl">Cartier</h3>
                        </div>
                    </div>


                    {/* divider */}
                    <div class="w-80 flex items-center justify-center space-x-4">
                        <span class="w-32 h-1 bg-black dark:bg-slate-400 rounded-full"></span>
                        <span class="text-2xl dark:text-slate-100">&#10070;</span>
                        <span class="w-32 h-1 bg-black dark:bg-slate-400 rounded-full"></span>
                    </div>


                    <h2 class="text-gray-800 font-bold text-lg dark:text-white">COLLECTIONS</h2>
                    <h1 class="font-robot dark:text-white">This should be Roboto font</h1>

                </div>

                <div className="bg-white">
                    <div className="w-full">
                        <img className="w-full h-auto p-10"
                            src="https://www.worldfashionexchange.com/blog/wp-content/uploads/2024/01/PRADA.webp" />
                    </div>
                </div>
            </div>
            <div className="dark:bg-gray-900">
                <div className="text-center pt-10 pb-6">
                    <span className="flex items-center justify-center">
                        <span className="h-px flex-1 ms-7 sm:ms-48 bg-black dark:bg-slate-400"></span>
                        <span className="shrink-0 px-6 text-xl sm:text-4xl font-bold text-indigo-800 dark:text-white">JUST FOR YOU</span>
                        <span className="h-px flex-1 me-7 sm:me-48 bg-black dark:bg-slate-400"></span>
                    </span>
                </div>

                <div>
                    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h2 class="text-3xl font-bold text-indigo-800 sm:text-4xl">
                                @TRENDING
                            </h2>
                            <div class="mt-4 text-gray-500 flex flex-wrap gap-3 justify-center">
                                <span className="bg-slate-400 text-white px-2 rounded-xl me-1">#2021</span>
                                <span className="bg-slate-400 text-white px-2 rounded-xl me-1">#spring</span>
                                <span className="bg-slate-400 text-white px-2 rounded-xl me-1">#collection</span>
                                <span className="bg-slate-400 text-white px-2 rounded-xl me-1">#fall</span>
                                <span className="bg-slate-400 text-white px-2 rounded-xl me-1">#autumncollection</span>
                                <span className="bg-slate-400 text-white px-2 rounded-xl me-1">#openfashion</span>
                            </div>
                        </div>
                        <div class="mt-10 text-center">
                            <h2 class="text-3xl font-bold text-indigo-800 sm:text-5xl">
                                Open
                                <br />
                                Fashion
                            </h2>
                            <p class="mt-4 text-xl text-gray-400 sm:text-2xl">
                                Making a luxurious lifestyle accessible for a generous group of women is our
                                daily drive.
                            </p>
                        </div>
                    </div>
                </div>

                {/* carousel */}
                <div className="md:mx-40 mb-10 my-5 border border-gray-300 rounded-lg shadow-lg">
                    <Carousel />
                </div>

                <div className="w-full">
                    <div class="flex flex-col text-center">
                        <h3 class="text-indigo-800 font-bold text-4xl dark:text-white">PRADA</h3>
                        <h3 class="text-indigo-800 font-bold text-4xl dark:text-white">Cartier</h3>
                    </div>
                    <div className="mt-4 text-slate-600 text-xl text-center dark:text-white">
                        Cdskmckldmc kmk knkio nio jnmk n njio okjm ojio joijio olkjo kjmolj oijioj iojiojiojioj jiojio
                    </div>
                </div>

                {/* Horizontle  Line */}
                <div className="mt-5 sm:mx-96 border-t border-gray-500 pt-8"></div>

                {/* 4 Part Images  */}
                <div className="w-full bg-slate-200">
                    <div className="bg-white dark:bg-gray-900 p-5">
                        <div className="flex flex-wrap justify-center gap-10">
                            <Card_2 />
                            <Card_2 />
                            <Card_2 />
                            <Card_2 />
                        </div>
                    </div>
                </div>

                {/* Title, subtitle and grid of blocked stats with value and title */}
                <div>
                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">Trusted by eCommerce Businesses</h2>

                            <p className="dark:text-white mt-4 text-gray-500 sm:text-xl">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores laborum labore
                                provident impedit esse recusandae facere libero harum sequi.
                            </p>
                        </div>

                        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">Total Sales</dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">$4.8m</dd>
                            </div>

                            <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">Official Addons</dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">24</dd>
                            </div>

                            <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">Total Addons</dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86</dd>
                            </div>

                            <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">Downloads</dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86k</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
