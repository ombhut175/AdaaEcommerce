import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80"
              alt="Fashion Model"
              className="w-full h-[600px] object-cover rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
              alt="Fashion Model"
              className="w-full h-[600px] object-cover rounded-lg"
            />
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-0"
          >
            <h2 className="text-2xl font-bold text-black dark:text-white">ADAA</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-8 text-gray-600 dark:text-gray-400"
          >
            {['Support Center', 'Invoicing', 'Contract', 'Careers', 'Blog', 'FAQs'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        </div>

        <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
          <p>Copyright © 2023 Fasco. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}