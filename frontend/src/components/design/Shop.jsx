import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Shop() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [productsData,setProductsData] =useState([]);
  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL+'/api/products/')
    .then((res)=>{
      setProductsData(res.data.products);
      // console.log(res.data);
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  },[])

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Shop</h1>
          <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400 mt-2">
            <Link to="/" className="hover:text-black dark:hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>Shop</span>
          </div>
        </div>

        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {productsData &&  productsData.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group cursor-pointer relative"
            >
              <div 
                onClick={() => handleProductClick(product._id)}
                className="relative overflow-hidden"
              >
                <img
                  src={product.colors[0].images[0]}
                  alt={product.title}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/checkout');
                    }}
                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-100"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}