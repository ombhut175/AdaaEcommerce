import { motion } from 'framer-motion';
import {useEffect, useState} from 'react';
import { FaUpload } from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const [isAdmin,setIsAdmin] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (user && user.role?.includes('admin')) {
      setIsAdmin(true);
    }
  },[user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };
  
  return (
    <div className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative hidden md:block group"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"
              alt="Fashion Model"
              className="w-full h-[600px] object-cover rounded-lg"
            />
            {isAdmin && (
              <div className="absolute inset-0 flex items-center justify-center 
                bg-black bg-opacity-40 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 
                z-10 rounded-lg"
              >
                <FaUpload className="text-white text-3xl" />
              </div>
            )}
          </motion.div>
          
          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:col-span-1"
          >
            {/* ... rest of the form remains the same ... */}
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative hidden md:block group"
          >
            <img
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80"
              alt="Fashion Model"
              className="w-full h-[600px] object-cover rounded-lg"
            />
            {isAdmin && (
              <div className="absolute inset-0 flex items-center justify-center 
                bg-black bg-opacity-40 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 
                z-10 rounded-lg"
              >
                <FaUpload className="text-white text-3xl" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}