import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';


const sampleProducts = [
  {
    dealerId: 'dealer_id_1',
    name: 'Shiny Dress',
    title: 'Elegant Shiny Dress',
    description: 'A shiny, elegant dress perfect for formal occasions.',
    brand: 'Brand A',
    price: 95.50,
    categoryOfProduct: 'Dress',
    size: ['S', 'M', 'L'],
    colors: [
      {
        colorName: 'Red',
        images: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
        ],
      },
    ],
    material: 'Silk',
    discountPercent: 10,
    productType: 'new',
    stock: 20,
    reviews: [
      {
        userId: 'user_id_1',
        rating: 4.5,
        comment: 'Beautiful dress, fits perfectly!',
        sales: 5,
        createdAt: '2025-01-15T08:00:00Z',
      },
    ],
    features: ['Shiny', 'Elegant', 'Formal'],
    offers: {
      bankOffers: '10% off with XYZ Bank',
      partnersOffers: '5% off with ABC Brand',
    },
    warrantyDetails: '1-year manufacturer warranty',
  },
  {
    dealerId: 'dealer_id_2',
    name: 'Long Dress',
    title: 'Graceful Long Dress',
    description: 'A graceful, long dress for evening wear.',
    brand: 'Brand B',
    price: 95.50,
    categoryOfProduct: 'Dress',
    size: ['M', 'L'],
    colors: [
      {
        colorName: 'Blue',
        images: [
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
        ],
      },
    ],
    material: 'Cotton',
    discountPercent: 15,
    productType: 'new',
    stock: 15,
    reviews: [
      {
        userId: 'user_id_2',
        rating: 4.5,
        comment: 'Very comfortable and fits perfectly.',
        sales: 8,
        createdAt: '2025-01-17T10:00:00Z',
      },
    ],
    features: ['Comfortable', 'Breathable', 'Casual'],
    offers: {
      bankOffers: '15% off with XYZ Bank',
      partnersOffers: 'Free shipping on orders over $100',
    },
    warrantyDetails: '2-year warranty',
  },
  {
    dealerId: 'dealer_id_3',
    name: 'Full Sweater',
    title: 'Cozy Full Sweater',
    description: 'A cozy sweater perfect for winter.',
    brand: 'Brand C',
    price: 95.50,
    categoryOfProduct: 'Sweater',
    size: ['L', 'XL'],
    colors: [
      {
        colorName: 'Grey',
        images: [
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
        ],
      },
    ],
    material: 'Wool',
    discountPercent: 5,
    productType: 'new',
    stock: 10,
    reviews: [
      {
        userId: 'user_id_3',
        rating: 4.5,
        comment: 'Keeps me warm and cozy!',
        sales: 3,
        createdAt: '2025-01-18T12:00:00Z',
      },
    ],
    features: ['Cozy', 'Warm', 'Winter'],
    offers: {
      bankOffers: '5% off with XYZ Bank',
      partnersOffers: '10% off with XYZ Partner',
    },
    warrantyDetails: '6-month warranty',
  },
  {
    dealerId: 'dealer_id_4',
    name: 'White Dress',
    title: 'Classic White Dress',
    description: 'A simple yet elegant white dress for all occasions.',
    brand: 'Brand D',
    price: 95.50,
    categoryOfProduct: 'Dress',
    size: ['S', 'M'],
    colors: [
      {
        colorName: 'White',
        images: [
          'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&q=80',
        ],
      },
    ],
    material: 'Cotton',
    discountPercent: 20,
    productType: 'new',
    stock: 25,
    reviews: [
      {
        userId: 'user_id_4',
        rating: 4.5,
        comment: 'A beautiful and classic design!',
        sales: 10,
        createdAt: '2025-01-19T14:00:00Z',
      },
    ],
    features: ['Simple', 'Elegant', 'Classic'],
    offers: {
      bankOffers: '20% off with XYZ Bank',
      partnersOffers: 'Free gift with purchase',
    },
    warrantyDetails: '1-year warranty',
  },
  {
    dealerId: 'dealer_id_5',
    name: 'Colorful Dress',
    title: 'Vibrant Colorful Dress',
    description: 'A colorful and lively dress perfect for summer.',
    brand: 'Brand E',
    price: 95.50,
    categoryOfProduct: 'Dress',
    size: ['M', 'L', 'XL'],
    colors: [
      {
        colorName: 'Multicolor',
        images: [
          'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80',
        ],
      },
    ],
    material: 'Polyester',
    discountPercent: 25,
    productType: 'new',
    stock: 30,
    reviews: [
      {
        userId: 'user_id_5',
        rating: 4.5,
        comment: 'Perfect for summer vacations!',
        sales: 12,
        createdAt: '2025-01-20T16:00:00Z',
      },
    ],
    features: ['Colorful', 'Lively', 'Summer'],
    offers: {
      bankOffers: '25% off with XYZ Bank',
      partnersOffers: '10% off with ABC Brand',
    },
    warrantyDetails: '1-year warranty',
  },
  {
    dealerId: 'dealer_id_6',
    name: 'White Shirt',
    title: 'Casual White Shirt',
    description: 'A clean and simple white shirt for everyday wear.',
    brand: 'Brand F',
    price: 95.50,
    categoryOfProduct: 'Shirt',
    size: ['S', 'M', 'L'],
    colors: [
      {
        colorName: 'White',
        images: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
        ],
      },
    ],
    material: 'Cotton',
    discountPercent: 10,
    productType: 'new',
    stock: 40,
    reviews: [
      {
        userId: 'user_id_6',
        rating: 4.5,
        comment: 'Great fit and comfortable!',
        sales: 15,
        createdAt: '2025-01-21T18:00:00Z',
      },
    ],
    features: ['Comfortable', 'Casual', 'Simple'],
    offers: {
      bankOffers: '10% off with XYZ Bank',
      partnersOffers: 'Free shipping with XYZ Partner',
    },
    warrantyDetails: '2-year warranty',
  },
];



const categories = ['Men\'s Fashion', 'Women\'s Fashion', 'Women Accessories', 'Men Accessories', 'Discount Deals'];

export default function NewArrivals() {

  const [products, setProducts] = useState([]); // To store the products fetched from the backend
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [selectedCategory, setSelectedCategory] = useState("Women's Fashion");
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  useEffect(() => {
    console.log("from NewArrivals");
    setProducts(sampleProducts);
    // getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/newArrivals`, { withCredentials: true });
      setProducts(response.data.newArrivals); // Store the fetched products in state
    } catch (error) {
      console.log(error);
    }
  }

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Redirect to the product detail page
  }

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
              {categories.map((category) => (
                  <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-full transition-all duration-300 ${
                          selectedCategory === category
                              ? 'bg-black text-white dark:bg-white dark:text-black'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <motion.div
                    key={product._id} // Assuming that the _id field is returned from the backend
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => handleProductClick(product._id)} // Add click handler for redirection
                >
                  <div className="relative h-80">
                    <img
                        src={product.colors[0]?.images[0]} // Adjusted to pick the first image from the colors array
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
                        {'★'.repeat(Math.floor(product.reviews[0]?.rating || 0))}
                        {'☆'.repeat(5 - Math.floor(product.reviews[0]?.rating || 0))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      ({product.reviews.length}) Customer Reviews
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
