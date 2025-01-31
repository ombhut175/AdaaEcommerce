import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import {submitImage} from "../utils/changeStaticImages.js";
import {fetchStaticImages} from "../../store/features/staticImagesSlice.js";

export default function Brands() {
  // const [brandLogos, setBrandLogos] = useState([
  //   'https://upload.wikimedia.org/wikipedia/commons/6/69/Chanel_logo.svg',
  //   'https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo.svg',
  //   'https://upload.wikimedia.org/wikipedia/commons/e/e5/Prada-Logo.svg',
  //   'https://upload.wikimedia.org/wikipedia/commons/2/22/Calvin_Klein_logo.svg',
  //   'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80'
  // ]);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const brandLogos = useSelector(state => state.staticImages.brands);
  // console.log("from brands");
  console.log(brandLogos);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.role?.includes('admin')) {
      setIsAdmin(true);
    }
  }, [user]);

  const handleLogoChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      submitImage("brands",index,file)
          .then(response => {
            if (response === 200){
              dispatch(fetchStaticImages());
            }
          })
    }
  };

  return (
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12">
            {brandLogos.map((logo, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="relative brand-logo"
                    onMouseEnter={() => isAdmin && setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                      src={logo}
                      alt={`Brand ${index + 1}`}
                      className="h-8 md:h-12 object-contain filter dark:invert"
                  />
                  {isAdmin && hoveredIndex === index && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <label className="cursor-pointer">
                          <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleLogoChange(index, e)}
                          />
                          <FaUpload className="text-white text-xl" />
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
