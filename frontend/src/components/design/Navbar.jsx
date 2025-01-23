import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import {Link, useLocation, useNavigate} from 'react-router-dom';

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <motion.h1 
              className="text-2xl font-bold text-black dark:text-white"
              whileHover={{ scale: 1.05 }}
            >
              ADAA
            </motion.h1>
          </Link>

          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Deals', path: '/deals' },
              { name: 'Shop', path: '/shop' },
              { name: 'New Arrivals', path: '/new-arrivals' },
              { name: 'Packages', path: '/packages' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
              >
                <motion.span
                  className={`text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors ${
                    location.pathname === item.path ? 'text-black dark:text-white font-semibold' : ''
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </motion.button>
            

            {localStorage.getItem('authToken')!=null?
            <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{
                scale: 1.1,
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            }}
            className="relative flex items-center justify-center rounded-full overflow-hidden border-4 border-gray-200 shadow-lg w-10 h-10"
        >
            <img
                src={localStorage.getItem('profilePicture')}
                className="w-full h-full object-cover "
            />
        </motion.div>:
          <>  

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              onClick={()=> navigate('/signIn')}
            >
              Sign In
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md"
              onClick={()=> navigate('/signUp')}
            >
              Sign Up
            </motion.button>
            </>
          }
</div>
        </div>
      </div>
    </nav>
  );
}