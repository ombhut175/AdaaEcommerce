import { motion } from 'framer-motion';

const products = [
  { id: 1, name: 'Shiny Dress', price: 95.50, rating: 4.5, reviews: 4, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80' },
  { id: 2, name: 'Long Dress', price: 95.50, rating: 4.5, reviews: 4, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80' },
  { id: 3, name: 'Full Sweater', price: 95.50, rating: 4.5, reviews: 4, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80' },
  { id: 4, name: 'White Dress', price: 95.50, rating: 4.5, reviews: 4, image: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&q=80' },
  { id: 5, name: 'Colorful Dress', price: 95.50, rating: 4.5, reviews: 4, image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80' },
  { id: 6, name: 'White Shirt', price: 95.50, rating: 4.5, reviews: 4, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80' },
];

const categories = ['Men\'s Fashion', 'Women\'s Fashion', 'Women Accessories', 'Men Accessories', 'Discount Deals'];

export default function NewArrivals() {
  return (
    <div className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultricies sollicitudin.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full ${
                  index === 1 
                    ? 'bg-black text-white dark:bg-white dark:text-black' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  ({product.reviews}) Customer Reviews
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-red-500 text-sm">Almost Sold Out</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md"
          >
            View More
          </motion.button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1581442456348-b2fd0d9d8689?auto=format&fit=crop&q=80"
              alt="Peaky Blinders Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0">
              {/* Product annotations */}
              <div className="absolute top-1/4 left-1/4">
                <div className="bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm">
                  Flat Cap
                </div>
              </div>
              <div className="absolute top-1/2 left-1/3">
                <div className="bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm">
                  Hugo Boss
                </div>
              </div>
              <div className="absolute bottom-1/4 left-1/4">
                <div className="bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm">
                  Santoni
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="text-gray-600 dark:text-gray-400">Women Collection</span>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Peaky Blinders
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Scelerisque duis ultricies sollicitudin aliquam sem. 
              Scelerisque duis ultricies sollicitudin.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-600 dark:text-gray-400">Size:</span>
              <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                M
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                $100.00
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md"
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: '🏆', title: 'High Quality', subtitle: 'crafted from top materials' },
            { icon: '🛡️', title: 'Warranty Protection', subtitle: 'Over 2 years' },
            { icon: '🚚', title: 'Free Shipping', subtitle: 'Order over 150 $' },
            { icon: '🎧', title: '24 / 7 Support', subtitle: 'Dedicated support' },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}