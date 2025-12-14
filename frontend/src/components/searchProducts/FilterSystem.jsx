"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Slider from "./Slider"
<<<<<<< HEAD
import { ChevronDown, ChevronUp, Palette, Ruler, IndianRupee, ArrowUpDown } from "lucide-react"
=======
import { ChevronDown, ChevronUp } from "lucide-react"
>>>>>>> origin
import { useSearchParams } from "react-router-dom"

const FilterSystem = ({ priceRange, setPriceRange, filters, setFilters, uniqueValues, sortOrder, setSortOrder }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth >= 768) {
                setIsOpen(true)
            }
        }

        checkIsMobile()
        window.addEventListener("resize", checkIsMobile)
        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams)

        Object.entries(filters).forEach(([key, value]) => {
            if (value.length > 0) {
                newParams.set(key, value.join(","))
            } else {
                newParams.delete(key)
            }
        })

        if (priceRange[0] !== 0 || priceRange[1] !== 10000) {
            newParams.set("minPrice", priceRange[0])
            newParams.set("maxPrice", priceRange[1])
        } else {
            newParams.delete("minPrice")
            newParams.delete("maxPrice")
        }

        if (sortOrder) {
            newParams.set("sort", sortOrder)
        } else {
            newParams.delete("sort")
        }

        setSearchParams(newParams)
    }, [filters, priceRange, sortOrder, searchParams, setSearchParams]) // Added setSearchParams to dependencies

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType].includes(value)
                ? prevFilters[filterType].filter((item) => item !== value)
                : [...prevFilters[filterType], value],
        }))
    }

<<<<<<< HEAD
    // Filter section header component for consistency
    const FilterHeader = ({ icon: Icon, title, count }) => (
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                {title}
            </h3>
            {count !== undefined && (
                <span className="ml-auto text-xs font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {count}
                </span>
            )}
        </div>
    )

    // Map filter types to their display names and icons
    const filterConfig = {
        colors: { title: "Colors", icon: Palette },
        size: { title: "Sizes", icon: Ruler },
    }

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Price Range Filter */}
            <motion.div layout className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <FilterHeader icon={IndianRupee} title="Price Range" />
                <Slider min={0} max={10000} value={priceRange} onChange={setPriceRange} />
                <div className="flex justify-between mt-3 text-sm font-semibold">
                    <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 shadow-sm">
                        ₹{priceRange[0].toLocaleString()}
                    </span>
                    <span className="text-gray-400">—</span>
                    <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 shadow-sm">
                        ₹{priceRange[1].toLocaleString()}
                    </span>
                </div>
            </motion.div>

            {/* Color and Size Filters */}
            {["colors", "size"].map((filterType) => {
                const config = filterConfig[filterType]
                const values = uniqueValues(filterType === "colors" ? "colors.colorName" : filterType)

                return (
                    <motion.div key={filterType} layout className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <FilterHeader
                            icon={config.icon}
                            title={config.title}
                            count={values.length}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            {values.map((value) => (
                                <motion.button
                                    key={value}
                                    onClick={() => handleFilterChange(filterType, value)}
                                    className={`flex items-center gap-2 p-2.5 rounded-lg transition-all duration-200 border ${filters[filterType].includes(value)
                                            ? "bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500/20"
                                            : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {filterType === "colors" && (
                                        <span
                                            className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-600 shadow-sm flex-shrink-0"
                                            style={{ backgroundColor: value.toLowerCase() }}
                                        />
                                    )}
                                    <span className={`text-sm font-medium truncate ${filters[filterType].includes(value)
                                            ? "text-indigo-700 dark:text-indigo-300"
                                            : "text-gray-700 dark:text-gray-200"
                                        }`}>
                                        {value}
                                    </span>
                                    {filters[filterType].includes(value) && (
                                        <span className="ml-auto w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )
            })}

            {/* Sort By Filter */}
            <motion.div layout className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <FilterHeader icon={ArrowUpDown} title="Sort By" />
                <motion.select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-500 cursor-pointer"
                    whileHover={{ scale: 1.01 }}
=======
    const FilterContent = () => (
        <div className="space-y-6">
            <motion.div layout>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Price Range</h3>
                <Slider min={0} max={10000} value={priceRange} onChange={setPriceRange} />
                <div className="flex justify-between mt-2 text-gray-600 dark:text-gray-300">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                </div>
            </motion.div>

            {["colors", "size"].map((filterType) => (
                <motion.div key={filterType} layout>
                    <h3 className="text-lg font-semibold mb-2 capitalize text-gray-900 dark:text-white">{filterType}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {uniqueValues(filterType === "colors" ? "colors.colorName" : filterType).map((value) => (
                            <motion.button
                                key={value}
                                onClick={() => handleFilterChange(filterType, value)}
                                className={`flex items-center justify-between p-2 rounded transition-all duration-200 ${
                                    filters[filterType].includes(value)
                                        ? "bg-blue-100 dark:bg-blue-900"
                                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate mr-2">{value}</span>
                                {filterType === "colors" && (
                                    <span
                                        className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0"
                                        style={{ backgroundColor: value.toLowerCase() }}
                                    ></span>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            ))}

            <motion.div layout>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Sort By</h3>
                <motion.select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-500 dark:hover:border-indigo-400"
                    whileHover={{ scale: 1.02 }}
>>>>>>> origin
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <option value="">Default</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </motion.select>
            </motion.div>
        </div>
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200 overflow-hidden"
        >
            {isMobile && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center p-4 text-lg font-semibold text-gray-900 dark:text-white"
                >
                    Filters
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
            )}
            <div className={`${isMobile ? "" : "md:w-64 md:sticky md:top-24 md:h-[calc(100vh-100px)]"}`}>
                <AnimatePresence>
                    {(isOpen || !isMobile) && (
                        <motion.div
                            initial={isMobile ? { height: 0, opacity: 0 } : false}
                            animate={isMobile ? { height: "auto", opacity: 1 } : false}
                            exit={isMobile ? { height: 0, opacity: 0 } : false}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700"
                        >
                            <FilterContent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default FilterSystem

