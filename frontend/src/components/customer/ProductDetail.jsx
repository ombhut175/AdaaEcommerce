import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShare } from 'react-icons/fa';

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['M', 'L', 'XL', 'XXL'];
  const colors = ['Blue', 'Black', 'Pink'];
  const images = [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary-500 dark:hover:text-primary-400">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary-500 dark:hover:text-primary-400">Shop</Link>
          <span className="mx-2">/</span>
          <span>Denim Jacket</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <img
                src={images[0]}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Denim Jacket
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★</span>
                    <span className="text-gray-400">☆</span>
                    <span className="ml-1 text-gray-600 dark:text-gray-400">(3)</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    24 people are viewing this right now
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$39.00</span>
                <span className="text-xl text-gray-500 line-through">$59.00</span>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm">
                  SAVE 35%
                </span>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
                <p className="text-red-600 dark:text-red-400">
                  Hurry up! Sale ends in: 00:05:59:47
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Only 9 item(s) left in stock!
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Size: {selectedSize}
                </h3>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedSize === size
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Color: {selectedColor}
                </h3>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? 'border-black dark:border-white'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-full font-medium hover:bg-gray-900 dark:hover:bg-gray-100"
                >
                  Add to cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaHeart className="text-gray-600 dark:text-gray-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaShare className="text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Shipping Info */}
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Estimated Delivery:</span>
                  <span>Jul 30 - Aug 03</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Free Shipping & Returns:</span>
                  <span>On all orders over $75</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}