import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUpload } from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {submitImage} from "../utils/changeStaticImages.js";
import {fetchStaticImages} from "../../store/features/staticImagesSlice.js";

export default function DealsSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 5,
    minutes: 5,
    seconds: 30
  });
  // const [images, setImages] = useState([
  //   'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80',
  //   'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80',
  //   'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80'
  // ]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [isAdmin,setIsAdmin] = useState(false);
  const user = useSelector((state) => state.user);
  const images = useSelector((state) => state.staticImages.deals);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (user && user.role?.includes('admin')) {
      setIsAdmin(true);
    }
  },[user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 };
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
        
        const newDays = prev.days - 1;
        if (newDays >= 0) return { days: newDays, hours: 23, minutes: 59, seconds: 59 };
        
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      submitImage("deals",index,file)
          .then((res) => {
            if (res === 200) {
                dispatch(fetchStaticImages());
            }
          })
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Deals Of The Month
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultricies sollicitudin.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:shadow-lg transition-all duration-300"
          >
            Buy Now
          </motion.button>
        </motion.div>

        <div className="flex justify-center gap-8 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-2 timer-text">
                {String(value).padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {unit}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => isAdmin && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              {isAdmin && hoveredIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(index, e)}
                    />
                    <FaUpload className="text-white text-3xl" />
                  </label>
                </div>
              )}
              <div className="p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  0{index + 1} — Spring Sale
                </div>
                <div className="text-xl font-bold text-black dark:text-gray-200 mb-2">
                  30% OFF
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}