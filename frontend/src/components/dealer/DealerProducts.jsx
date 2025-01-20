import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const mockProducts = [
  {
    id: 1,
    name: 'Mini Dress',
    title: 'Mini Dress With Ruffled Straps',
    description: 'Beautiful mini dress perfect for summer',
    brand: 'FASCO',
    price: 99.99,
    discount: 20,
    stock: 50,
    purchaseCount: 156,
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80'],
    rating: 4.5,
    reviewCount: 28
  },
  // Add more mock products as needed
];

export default function DealerProducts() {
  const handleDelete = (productId) => {
    // Handle delete functionality
    console.log('Delete product:', productId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">My Products</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your product inventory and track sales
            </p>
          </div>
          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-xl font-bold text-black dark:text-white">284</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-xl font-bold text-black dark:text-white">1,568</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group"
            >
              <Link to={`/dealer/products/${product.id}`}>
                <div className="relative h-64">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.title}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/dealer/products/${product.id}/edit`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700 rounded-full"
                      >
                        <FaEdit size={16} />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 rounded-full"
                    >
                      <FaTrash size={16} />
                    </motion.button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    {product.discount > 0 && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Stock: {product.stock}
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div>Purchased: {product.purchaseCount}</div>
                  <div>Reviews: {product.reviewCount}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/dealer/products/new">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <FaPlus size={24} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}