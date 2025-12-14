import { motion } from 'framer-motion';
import { FaCamera, FaEnvelope, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";

export default function UserProfile() {
  const navigate = useNavigate();
  // Mock user data - replace with actual user data from your auth system
  const user = useSelector((state) => state.user);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Profile Picture */}
            <div className="relative -mt-16 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32 mx-auto"
              >
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 p-2 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg"
                >
                  <FaCamera size={16} />
                </motion.button>
              </motion.div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-6">
              <div>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  {user.name}
                </motion.h1>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center text-gray-600 dark:text-gray-400"
                >
                  <FaEnvelope className="mr-2" />
                  <span>{user.email}</span>
                </motion.div>
              </div>

              {/* Profile Details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
              >
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center text-4xl mb-4 text-indigo-600 dark:text-indigo-400">
                    <FaUser />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Personal Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your personal information and account settings
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center text-4xl mb-4 text-indigo-600 dark:text-indigo-400">
                    <FaEnvelope />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Email Preferences
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your email notifications and communication preferences
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-4 pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile/edit')}
                  className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium"
                >
                  Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md font-medium"
                >
                  Change Password
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}