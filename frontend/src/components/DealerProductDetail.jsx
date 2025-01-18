import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaStar, FaUser } from 'react-icons/fa';

const mockProduct = {
  id: 1,
  name: 'Mini Dress',
  title: 'Mini Dress With Ruffled Straps',
  description: 'Beautiful mini dress perfect for summer',
  brand: 'FASCO',
  price: 99.99,
  discount: 20,
  stock: 50,
  purchaseCount: 156,
  images: [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80'
  ],
  rating: 4.5,
  reviewCount: 28,
  reviews: [
    { id: 1, user: 'John Doe', rating: 5, comment: 'Great product!', date: '2023-12-01' },
    { id: 2, user: 'Jane Smith', rating: 4, comment: 'Nice quality', date: '2023-11-28' }
  ],
  recentPurchases: [
    { id: 1, user: 'Alice Johnson', date: '2023-12-02', quantity: 2 },
    { id: 2, user: 'Bob Wilson', date: '2023-12-01', quantity: 1 }
  ]
};

export default function DealerProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

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
            <span>{mockProduct.name}</span>
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
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {mockProduct.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 ${
                    selectedImage === index ? 'ring-2 ring-indigo-600' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {mockProduct.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {mockProduct.title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Price Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                    <span className="text-gray-900 dark:text-white">${mockProduct.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                    <span className="text-green-600">{mockProduct.discount}% OFF</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-semibold text-gray-900 dark:text-white">Final Price:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${(mockProduct.price * (1 - mockProduct.discount / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Stock Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Available Stock:</span>
                    <span className="text-gray-900 dark:text-white">{mockProduct.stock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Purchased:</span>
                    <span className="text-gray-900 dark:text-white">{mockProduct.purchaseCount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Purchases
              </h3>
              <div className="space-y-4">
                {mockProduct.recentPurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                        <FaUser className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {purchase.user}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {purchase.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      Qty: {purchase.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Reviews
              </h3>
              <div className="space-y-4">
                {mockProduct.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {review.user}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {review.date}
                        </p>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}