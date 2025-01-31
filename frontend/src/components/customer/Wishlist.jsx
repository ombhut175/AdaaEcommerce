import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaTrash, FaShoppingCart, FaChevronLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// Mock wishlist data - replace with actual data from your state management
const initialWishlist = [
  {
    id: 1,
    name: 'Summer Dress',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    color: 'Pink',
    size: 'M'
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
    color: 'Blue',
    size: 'L'
  }
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [swipingId, setSwipingId] = useState(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL + '/api/wishlist/' + user.id)
    .then((res)=>{
      console.log(res.data);
      setWishlist(res.data)
      // setState(0)
    })
  },[user])
  
  
  
    const removeFromWishlist = (id) => {
      console.log(id);
      
      axios.delete(import.meta.env.VITE_BACKEND_URL + '/api/wishlist/' + id + '/' +user.id)
      .then((res)=>{
        console.log(res);
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
      })
      
    };

  const addToCart = (item) => {
    navigate('/product/'+ item.product?._id)
    
  };

  const handleDragEnd = (e, info, item) => {
    const swipeThreshold = 100;
    const swipeDistance = Math.abs(info.offset.x);
    
    if (info.offset.x <   -swipeThreshold) {
      removeFromWishlist(item.id);
    }
    
    setSwipingId(null);
    setSwipeProgress(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 cursor-pointer"
            onClick={() => window.history.back()}
          >
            <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              Your wishlist is empty
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 overflow-hidden"
              >
                <motion.div
                  drag="x"
                  dragConstraints={{ left: -100, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={() => setSwipingId(item.id)}
                  onDrag={(e, info) => {
                    const progress = Math.min(Math.abs(info.offset.x) / 100, 1);
                    setSwipeProgress(progress);
                  }}
                  onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                  className="relative z-10 bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center p-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <img
                        src={item.product?.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: swipingId === item.id ? 0.1 : 0 }}
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.color} • Size {item.size}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                        ${item.product?.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(item)}
                        className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:shadow-lg transition-all duration-300"
                      >
                        <FaShoppingCart size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromWishlist(item._id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:shadow-lg transition-all duration-300"
                      >
                        <FaTrash size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Delete action background */}
                <div className="absolute inset-0 flex items-center justify-end px-4 bg-red-500">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: swipingId === item.id ? swipeProgress : 0 }}
                    className="flex items-center text-white"
                  >
                    <FaTrash className="mr-2" />
                    <span className="font-medium">Remove</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
          >
            <p>Swipe left to remove items or use the buttons</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}