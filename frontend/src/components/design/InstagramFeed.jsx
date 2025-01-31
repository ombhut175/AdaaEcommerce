import { motion } from 'framer-motion';
import {useEffect, useState} from 'react';
import { FaUpload } from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {submitImage} from "../utils/changeStaticImages.js";
import {fetchStaticImages} from "../../store/features/staticImagesSlice.js";

export default function InstagramFeed() {
  // const [images, setImages] = useState([
  //   'https://images.unsplash.com/photo-1520975661595-6453be3f7070',
  //   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
  //   'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
  //   'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
  //   'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
  //   'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
  //   'https://images.unsplash.com/photo-1469334031218-e382a71b716b'
  // ]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAdmin,setIsAdmin] = useState(false);
  const user = useSelector((state) => state.user);
  const images = useSelector((state) => state.staticImages.instagram);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (user && user.role?.includes('admin')) {
      setIsAdmin(true);
    }
  },[user]);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      submitImage("instagram", index, file)
          .then((res) => {
            if (res === 200) {
              dispatch(fetchStaticImages());
            }
          })
    }
  };

  return (
    <div className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Follow Us On Instagram
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultricies sollicitudin.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group overflow-hidden aspect-square"
              onMouseEnter={() => isAdmin && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {isAdmin && hoveredIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(index, e)}
                    />
                    <FaUpload className="text-white text-2xl" />
                  </label>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}