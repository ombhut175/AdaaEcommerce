import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" // Import useNavigate for redirection
import axios from "axios"

const categories = ["Men's Fashion", "Women's Fashion", "Discount Deals"]

export default function NewArrivals() {
  const [products, setProducts] = useState([]) // To store the products fetched from the backend
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [selectedCategory, setSelectedCategory] = useState("Women's Fashion")
  const navigate = useNavigate() // Initialize useNavigate hook for redirection

  useEffect(() => {
    console.log("from NewArrivals")
    getProducts()
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/newArrivals`, {
        withCredentials: true,
      })
      setProducts(response.data.newArrivals)
    } catch (error) {
      console.log(error)
    }
  }

  const handleViewMoreClick = ()=>{
    navigate('/new-arrivals');
  }

  const getFilteredProducts = () => {
    return products
        .filter((product) => {
          if (selectedCategory === "Men's Fashion") {
            return product.gender === "male"
          } else if (selectedCategory === "Women's Fashion") {
            return product.gender === "female"
          } else if (selectedCategory === "Discount Deals") {
            return product.discountPercent > 0
          }
          return true
        })
        .slice(0, 9) // Limit to 9 products
  }

  const handleProductClick = (id) => {
    navigate(`/product/${id}`) // Redirect to the product detail page
  }

  return (
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4">New Arrivals</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultricies sollicitudin.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                  <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-full transition-all duration-300 ${
                          selectedCategory === category
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredProducts().map((product) => (
                <motion.div
                    key={product._id} // Assuming that the _id field is returned from the backend
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => handleProductClick(product._id)} // Add click handler for redirection
                >
                  <div className="relative h-80">
                    <img
                        src={product.colors[0]?.images[0] || "/placeholder.svg"} // Adjusted to pick the first image from the colors array
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(product.reviews[0]?.rating || 0))}
                        {"☆".repeat(5 - Math.floor(product.reviews[0]?.rating || 0))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      ({product.reviews.length}) Customer Reviews
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                      <span className="text-red-500 text-sm">Almost Sold Out</span>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md"
                onClick={handleViewMoreClick}
            >
              View More
            </motion.button>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="relative">
              <img
                  src="https://images.unsplash.com/photo-1581442456348-b2fd0d9d8689?auto=format&fit=crop&q=80"
                  alt="Peaky Blinders Collection"
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0">
                {/* Product annotations */}
                <div className="absolute top-1/4 left-1/4">
                  <div className="bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm">Flat Cap</div>
                </div>
                <div className="absolute top-1/2 left-1/3">
                  <div className="bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm">Hugo Boss</div>
                </div>
                <div className="absolute bottom-1/4 left-1/4">
                  <div className="bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm">Santoni</div>
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-gray-600 dark:text-gray-400">Women Collection</span>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">Peaky Blinders</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultricies sollicitudin aliquam
                sem. Scelerisque duis ultricies sollicitudin.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-600 dark:text-gray-400">Size:</span>
                <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">M</button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">$100.00</span>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md"
                >
                  Buy Now
                </motion.button>
              </div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🏆", title: "High Quality", subtitle: "crafted from top materials" },
              { icon: "🛡️", title: "Warranty Protection", subtitle: "Over 2 years" },
              { icon: "🚚", title: "Free Shipping", subtitle: "Order over 150 $" },
              { icon: "🎧", title: "24 / 7 Support", subtitle: "Dedicated support" },
            ].map((feature) => (
                <motion.div key={feature.title} whileHover={{ y: -10 }} className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{feature.subtitle}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
  )
}

