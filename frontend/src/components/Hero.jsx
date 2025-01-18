import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80" 
          alt="Fashion Model" 
          className="w-full h-full object-cover" 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center space-y-6"
      >
        <h2 className="text-6xl font-bold text-black dark:text-white">
          ULTIMATE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            SALE
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">NEW COLLECTION</p>
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md uppercase"
          >
            Shop Now
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" 
          alt="Fashion Model" 
          className="w-full h-full object-cover" 
        />
      </motion.div>
    </div>
  );
}