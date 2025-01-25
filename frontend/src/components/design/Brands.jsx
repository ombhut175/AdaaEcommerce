import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

export default function Brands() {
  const [isAdmin] = useState(true); // For demo purposes
  const [brands, setBrands] = useState([
    { name: 'CHANEL', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Chanel_logo.svg' },
    { name: 'LOUIS VUITTON', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo.svg' },
    { name: 'PRADA', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Prada-Logo.svg' },
    { name: 'Calvin Klein', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Calvin_Klein_logo.svg' },
    { name: 'DENIM', logo: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80' },
  ]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleLogoChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newBrands = [...brands];
        newBrands[index] = { ...newBrands[index], logo: reader.result };
        setBrands(newBrands);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="relative brand-logo"
              onMouseEnter={() => isAdmin && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={brand.logo}
                alt={brand.name}
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