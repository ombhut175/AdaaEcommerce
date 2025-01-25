import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

// Mock search results - replace with actual search logic
const mockProducts = [
  {
    id: 1,
    name: 'Summer Dress',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    category: 'Dresses'
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
    category: 'Jackets'
  }
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // Mock filtering - replace with actual search logic
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(query?.toLowerCase() || '')
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Search Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} results for "{query}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                    >
                      <FaShoppingCart size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                    >
                      <FaHeart size={20} />
                    </motion.button>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {product.category}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No results found for "{query}"
            </p>
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
    </motion.div>
  );
}