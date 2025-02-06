import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { LoadingBar } from "../loadingBar/LoadingBar.jsx"
import { io } from "socket.io-client"
import FilterSystem from "../searchProducts/FilterSystem.jsx"
import {handleAddCartWithDefaultValues} from "../utils/cart.js";

const socket = io(import.meta.env.VITE_BACKEND_URL)

export default function Shop() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState("grid")
  const [productsData, setProductsData] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [priceRange, setPriceRange] = useState([
    Number.parseInt(searchParams.get("minPrice") || "0"),
    Number.parseInt(searchParams.get("maxPrice") || "10000"),
  ])
  const [filters, setFilters] = useState({
    colors: searchParams.get("colors")?.split(",") || [],
    size: searchParams.get("size")?.split(",") || [],
  })
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "")
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/`)
      setProductsData(response.data.products)
      applyFilters(response.data.products)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    socket.on("products updated", fetchProducts)
    return () => {
      socket.off("products updated")
    }
  }, [socket, fetchProducts]) // Added fetchProducts to dependencies

  useEffect(() => {
    applyFilters(productsData)
  }, [filters, priceRange, sortOrder, productsData])

  const applyFilters = (products) => {
    let filtered = products.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    if (filters.colors.length) {
      filtered = filtered.filter((product) => product.colors.some((color) => filters.colors.includes(color.colorName)))
    }
    if (filters.size.length) {
      filtered = filtered.filter((product) => product.size.some((size) => filters.size.includes(size)))
    }
    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price)
    }
    setFilteredProducts(filtered)
  }

  const uniqueValues = (key) => [
    ...new Set(
        productsData.flatMap((product) =>
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
          className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
      >
        <LoadingBar isLoading={isDisabled} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white">Shop</h1>
            <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400 mt-2">
              <Link to="/" className="hover:text-black dark:hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Shop</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 flex-shrink-0">
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
              <div
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group cursor-pointer relative"
                    >
                      <div onClick={() => navigate(`/product/${product._id}`)} className="relative overflow-hidden">
                        <img
                            src={product.colors[0].images[0] || "/placeholder.svg"}
                            alt={product.title}
                            className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                         onClick={(e) => { handleAddCartWithDefaultValues(product) }}
                                         className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-100">
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                          {product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</span>
                          <div className="flex gap-1">
                            {product.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700"
                                    style={{ backgroundColor: color.colorName }}
                                />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  )
}

