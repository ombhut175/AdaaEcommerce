import { motion } from "framer-motion"
import Slider from "./Slider.jsx"
import Checkbox from "./Checkbox.jsx"

const FilterSystem = ({ priceRange, setPriceRange, filters, setFilters, uniqueValues, sortOrder, setSortOrder }) => {
    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType].includes(value)
                ? prevFilters[filterType].filter((item) => item !== value)
                : [...prevFilters[filterType], value],
        }))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors duration-200 overflow-y-auto max-h-[calc(100vh-100px)] sticky top-24 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700"
        >
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
                        {filterType === "colors" ? (
                            <div className="grid grid-cols-2 gap-2">
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
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</span>
                                        <span
                                            className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
                                            style={{ backgroundColor: value.toLowerCase() }}
                                        ></span>
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            <div className="max-h-40 overflow-y-auto pr-2">
                                {uniqueValues(filterType).map((value) => (
                                    <motion.div
                                        key={value}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="w-full"
                                    >
                                        <Checkbox
                                            id={`${filterType}-${value}`}
                                            checked={filters[filterType].includes(value)}
                                            onChange={() => handleFilterChange(filterType, value)}
                                            label={value}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}

                <motion.div layout>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Sort By</h3>
                    <motion.select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-500 dark:hover:border-indigo-400"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <option value="">Default</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </motion.select>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default FilterSystem

