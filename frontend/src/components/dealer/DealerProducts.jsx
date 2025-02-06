import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function DealerProducts() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/dealer/getAllProducts`, { withCredentials: true });
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/dealer/deleteProduct/${productId}`, { withCredentials: true });
      setProducts(products.filter(product => product._id !== productId));

      toast.success('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
            {/*<div className="flex gap-4">*/}
            {/*  <motion.div*/}
            {/*      whileHover={{ scale: 1.05 }}*/}
            {/*      whileTap={{ scale: 0.95 }}*/}
            {/*      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"*/}
            {/*  >*/}
            {/*    <h3 className="text-xl font-bold text-black dark:text-white">{products.length}</h3>*/}
            {/*    <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>*/}
            {/*  </motion.div>*/}
            {/*</div>*/}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group"
                >
                  <Link to={`/dealer/products/${product._id}`}>
                    <div className="relative h-64">
                      <img
                          src={product.colors?.[0]?.images?.[0] || "https://via.placeholder.com/300"}
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
                        <Link to={`/dealer/products/${product._id}/edit`}>
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
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 rounded-full"
                        >
                          <FaTrash size={16} />
                        </motion.button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{(product.price * (1 - (product.discountPercent || 0) / 100)).toFixed(2)}
                    </span>
                        {product.discountPercent > 0 && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.price.toFixed(2)}
                      </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Stock: {product.stock}
                      </div>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white">My Products</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your product inventory and track sales
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
              >
                <h3 className="text-xl font-bold text-black dark:text-white">{products.length}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
              </motion.div>

              {/* Moved "Add Product" button here */}
              <Link to="/dealer/products/new">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-md flex items-center gap-2"
                >
                  <FaPlus size={16} />
                  Add Product
                </motion.button>
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
  );
}
