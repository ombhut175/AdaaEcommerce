import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-0"
          >
            <h2 className="text-2xl font-bold text-black dark:text-white">FASCO</h2>
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