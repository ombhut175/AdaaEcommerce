import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {handleAddCartWithDefaultValues, handleAddWishlistWithDefaultValues} from "../utils/cart.js";
// If there are internal organization modules to use for axios or similar, import them accordingly.

const categories = ['All', 'Women', 'Men'];

export default function NewArrivalsPage() {
  // Use products state fetched from backend
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  // Get backend URL from environment variables
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/newArrivals`, {
        withCredentials: true,
      });
      // Assuming response.data.newArrivals is an array of product objects following the provided schema
      setProducts(response.data.newArrivals);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };

  // Filtering logic:
  // For 'Women', filter by product.gender === 'Women'.
  // For 'Men', filter by product.gender === 'male'.
  // For any other category, filter by product.categoryOfProduct.
  const filteredProducts = selectedCategory === 'All'
      ? products
      : products.filter(product => {
        if (selectedCategory === 'Women') {
          return product.gender === 'female';
        }
        if (selectedCategory === 'Men') {
          return product.gender === 'male';
        }
        return product.categoryOfProduct === selectedCategory;
      });

  // Helper function to compute average rating from reviews array
  const calculateAverageRating = (reviews = []) => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return sum / reviews.length;
  };

  // Helper function to get product image from colors, fallback to placeholder if not available
  const getProductImage = (product) => {
    if (product.colors && product.colors.length > 0 && product.colors[0].images && product.colors[0].images.length > 0) {
      return product.colors[0].images[0];
    }
    return 'https://via.placeholder.com/400x320?text=No+Image';
  };


  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              New Arrivals
            </motion.h1>
            <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400 mb-8"
            >
              Discover our latest collection of trendy fashion items
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                  <motion.button
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                          selectedCategory === category
                              ? 'bg-black dark:bg-white text-white dark:text-black'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    {category}
                  </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              // Calculate average rating from reviews; floor it for star display.
              const avgRating = calculateAverageRating(product.reviews);
              const fullStars = Math.floor(avgRating);
              return (
                  <motion.div
                      key={product._id || product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onHoverStart={() => setHoveredId(product._id || product.id)}
                      onHoverEnd={() => setHoveredId(null)}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                          src={getProductImage(product)}
                          alt={product.name}
                          className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredId === (product._id || product.id) ? 1 : 0 }}
                          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4"
                      >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                            onClick={()=> handleAddCartWithDefaultValues(product)}
                        >
                          <FaShoppingCart size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                            onClick={()=> handleAddWishlistWithDefaultValues(product)}
                        >
                          <FaHeart size={20} />
                        </motion.button>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <Link to={`/product/${product._id || product.id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                              <FaStar
                                  key={i}
                                  className={i < fullStars ? 'text-yellow-400' : 'text-gray-300'}
                              />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.reviews ? `(${product.reviews.length} reviews)` : '(0 reviews)'}
                    </span>
                      </div>
                      <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      New Arrival
                    </span>
                      </div>
                    </div>
                  </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
  );
}