import { motion } from 'framer-motion';

const brands = [
  { name: 'CHANEL', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Chanel_logo.svg' },
  { name: 'LOUIS VUITTON', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo.svg' },
  { name: 'PRADA', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Prada-Logo.svg' },
  { name: 'Calvin Klein', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Calvin_Klein_logo.svg' },
  { name: 'DENIM', logo: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80' },
];

export default function Brands() {
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
              className="brand-logo"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 md:h-12 object-contain filter dark:invert"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}