import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaShoppingCart, FaHeart, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const deals = [
  {
    id: 1,
    name: 'Summer Collection',
    title: 'Floral Summer Dress',
    price: 129.99,
    discountedPrice: 79.99,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    timeLeft: '2d 15h 30m',
    stock: 5
  },
  {
    id: 2,
    name: 'Winter Special',
    title: 'Wool Blend Coat',
    price: 249.99,
    discountedPrice: 149.99,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
    timeLeft: '1d 8h 45m',
    stock: 3
  },
  {
    id: 3,
    name: 'Accessories',
    title: 'Designer Handbag',
    price: 199.99,
    discountedPrice: 99.99,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
    timeLeft: '3d 20h 15m',
    stock: 8
  }
];

export default function Deals() {
  const [hoveredId, setHoveredId] = useState(null);

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
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(deal.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {deal.discount}% OFF
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === deal.id ? 1 : 0 }}
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                  >
                    <FaShoppingCart size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100"
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
                        ${deal.discountedPrice}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${deal.price}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaClock className="mr-1" />
                      <span className="text-sm">{deal.timeLeft}</span>
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
                  <Link to={`/product/${deal.id}`}>
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
          ))}
        </div>
      </div>
    </motion.div>
  );
}