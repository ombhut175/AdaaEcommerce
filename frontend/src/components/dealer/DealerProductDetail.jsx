import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaStar, FaUser } from 'react-icons/fa';
import axios from "axios";

export default function DealerProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/${id}`, { withCredentials: true });
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id, BACKEND_URL]);

  if (!product) {
    return <div className="text-center text-gray-600 dark:text-gray-400 pt-24">Loading product details...</div>;
  }

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400">
              <Link to="/dealer/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                My Products
              </Link>
              <span className="mx-2">/</span>
              <span>{product.name}</span>
            </div>
            <Link to={`/dealer/products/${id}/edit`}>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                <FaEdit />
                Edit Product
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <motion.div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img src={product.colors[selectedImage]?.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {product.colors.map((color, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 ${selectedImage === index ? 'ring-2 ring-indigo-600' : ''}`}
                    >
                      <img src={color.images[0]} alt={color.colorName} className="w-full h-full object-cover" />
                    </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">{product.title}</p>
              <p className="text-gray-600 dark:text-gray-400">{product.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Price Details</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                    <span className="text-gray-900 dark:text-white">${product.price}</span>
                  </div>
                  {product.discountPercent && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                        <span className="text-green-600">{product.discountPercent}% OFF</span>
                      </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-semibold text-gray-900 dark:text-white">Final Price:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                    ${(product.price * (1 - (product.discountPercent || 0) / 100)).toFixed(2)}
                  </span>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Stock Details</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Available Stock:</span>
                    <span className="text-gray-900 dark:text-white">{product.stock}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reviews</h3>
                <div className="space-y-4">
                  {product.reviews.length > 0 ? (
                      product.reviews.map((review) => (
                          <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">{review.userId}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                          </div>
                      ))
                  ) : (
                      <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}
