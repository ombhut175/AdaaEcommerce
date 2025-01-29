import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { FaUpload } from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";

export default function Hero() {
  const [isAdmin,setIsAdmin] = useState(false); // For demo purposes
  const [images, setImages] = useState({
    left: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80",
    right: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"
  });
  const [hoveredImage, setHoveredImage] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user);
    if (user && user.role.includes('admin')) {
      setIsAdmin(true);
    }
  },[]);

  const handleImageChange = (side, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({
          ...prev,
          [side]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
        onMouseEnter={() => isAdmin && setHoveredImage('left')}
        onMouseLeave={() => setHoveredImage(null)}
      >
        <img 
          src={images.left}
          alt="Fashion Model" 
          className="w-full h-full object-cover" 
        />
        {isAdmin && hoveredImage === 'left' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange('left', e)}
              />
              <FaUpload className="text-white text-3xl" />
            </label>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center space-y-6"
      >
        <h2 className="text-6xl font-bold text-black dark:text-white">
          ULTIMATE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            SALE
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">NEW COLLECTION</p>
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md uppercase"
          >
            Shop Now
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
        onMouseEnter={() => isAdmin && setHoveredImage('right')}
        onMouseLeave={() => setHoveredImage(null)}
      >
        <img 
          src={images.right}
          alt="Fashion Model" 
          className="w-full h-full object-cover" 
        />
        {isAdmin && hoveredImage === 'right' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange('right', e)}
              />
              <FaUpload className="text-white text-3xl" />
            </label>
          </div>
        )}
      </motion.div>
    </div>
  );
}