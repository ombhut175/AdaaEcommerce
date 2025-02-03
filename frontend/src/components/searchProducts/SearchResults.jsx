import { motion } from "framer-motion"
import { useSearchParams, Link } from "react-router-dom"
import { FaShoppingCart, FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react"
import axios from "axios"
import FilterSystem from "./FilterSystem.jsx"

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
  })
  const [sortOrder, setSortOrder] = useState(null)

  useEffect(() => {
    if (query) fetchProducts()
  }, [query])

  useEffect(() => {
    let filtered = products.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    if (filters.colors.length) {
      filtered = filtered.filter((product) => product.colors.some((color) => filters.colors?.includes(color.colorName)))
    }
    if (filters.sizes.length) {
      filtered = filtered.filter((product) => product.sizes.some((size) => filters.sizes.includes(size)))
    }
    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price)
    }
    setFilteredProducts(filtered)
  }, [products, filters, priceRange, sortOrder])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/search/${query}`)
      setProducts(response.data)
    } catch (error) {
      setProducts([])
      console.error("Error fetching products:", error)
    }
  }

  const uniqueValues = (key) => [
    ...new Set(
        products.flatMap((product) =>
            key.includes(".")
                ? product[key.split(".")[0]].map((item) => item[key.split(".")[1]])
                : Array.isArray(product[key])
                    ? product[key]
                    : [product[key]],
        ),
    ),
  ]

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-24 px-4 min-h-screen bg-gray-100 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search Results</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProducts.length} results for "{query}"
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64 flex-shrink-0 md:sticky md:top-24 md:h-[calc(100vh-100px)]">
              <FilterSystem
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  filters={filters}
                  setFilters={setFilters}
                  uniqueValues={uniqueValues}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
              />
            </div>
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group"
                    >
                      <Link to={`/product/${product._id}`}>
                        <div className="relative overflow-hidden">
                          <img
                              src={product.colors?.[0]?.images?.[0] || "default-image.jpg"}
                              alt={product.name}
                              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <FaShoppingCart size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <FaHeart size={20} />
                            </motion.button>
                          </div>
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link to={`/product/${product._id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.categoryOfProduct}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No results found for "{query}"</p>
                    <Link to="/shop">
                      <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md"
                      >
                        Browse All Products
                      </motion.button>
                    </Link>
                  </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
  )
}

