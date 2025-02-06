import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from "axios";
import { handleAddCartWithDefaultValues, handleAddWishlistWithDefaultValues } from "../utils/cart.js";

export default function Deals() {
  const [hoveredId, setHoveredId] = useState(null);
  const [deals, setDeals] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchDeals = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/dealsOfMonth`, { withCredentials: true });
      if (response.data.success) {
        // Instead of mapping the data, we keep the product schema as it is.
        setDeals(response.data.deals);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const calculateDiscountedPrice = (price, discountPercent) => {
    if (discountPercent && discountPercent > 0) {
      return (price - (price * discountPercent / 100)).toFixed(2);
    }
    return price;
  };

  const getProductImage = (colors) => {
    // Retrieve the first image from the first color if available, else return empty string.
    if (colors && colors.length > 0 && colors[0].images && colors[0].images.length > 0) {
      return colors[0].images[0];
    }
    return "";
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
              Flash Deals
            </motion.h1>
            <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
            >
              Don't miss out on these amazing limited-time offers!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal, index) => {
              const discountPercent = deal.discountPercent || 0;
              const discountedPrice = calculateDiscountedPrice(deal.price, discountPercent);
              const image = getProductImage(deal.colors);
              const key = deal._id || deal.id;
              return (
                  <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onHoverStart={() => setHoveredId(key)}
                      onHoverEnd={() => setHoveredId(null)}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="relative">
                      <img
                          src={image}
                          alt={deal.name}
                          className="w-full h-80 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {discountPercent}% OFF
                    </span>
                      </div>
                      <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredId === key ? 1 : 0 }}
                          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4"
                      >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                            onClick={() => handleAddCartWithDefaultValues(deal)}
                        >
                          <FaShoppingCart size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                            onClick={() => handleAddWishlistWithDefaultValues(deal)}
                        >
                          <FaHeart size={20} />
                        </motion.button>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {deal.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${discountedPrice}
                        </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                          ${deal.price}
                        </span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <FaClock className="mr-1" />
                            <span className="text-sm">2d 15h 30m</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                              className="h-2 bg-red-500 rounded-full"
                              style={{ width: `${(deal.stock / 10) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Only {deal.stock} items left in stock!
                        </p>
                        <Link to={`/product/${key}`}>
                          <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-100"
                          >
                            Shop Now
                          </motion.button>
                        </Link>
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