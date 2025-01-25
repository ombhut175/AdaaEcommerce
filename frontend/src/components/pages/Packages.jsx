import { motion } from 'framer-motion';
import { FaCheck, FaGem } from 'react-icons/fa';

const packages = [
  {
    id: 1,
    name: 'Basic',
    price: 99,
    description: 'Perfect for getting started',
    features: [
      '3 Clothing Items',
      'Basic Styling Guide',
      '30-Day Returns',
      'Standard Shipping'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Premium',
    price: 199,
    description: 'Most popular choice',
    features: [
      '5 Clothing Items',
      'Personal Stylist',
      'Priority Shipping',
      '60-Day Returns',
      'Exclusive Access'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Ultimate',
    price: 299,
    description: 'For fashion enthusiasts',
    features: [
      '8 Clothing Items',
      'VIP Stylist',
      'Free Express Shipping',
      '90-Day Returns',
      'Early Access',
      'Special Events'
    ],
    popular: false
  }
];

export default function Packages() {
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
            Fashion Packages
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Choose the perfect package that suits your style
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden ${
                pkg.popular ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 text-sm font-medium">
                  Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <FaGem className="text-4xl text-indigo-500 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  {pkg.description}
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${pkg.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="flex items-center text-gray-600 dark:text-gray-400"
                    >
                      <FaCheck className="text-green-500 mr-2" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-medium transition-colors duration-300 ${
                    pkg.popular
                      ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100'
                  }`}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-600 dark:text-gray-400"
        >
          <p>All packages include free styling consultation and access to exclusive events.</p>
          <p>Prices are in USD and billed monthly. Cancel anytime.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}