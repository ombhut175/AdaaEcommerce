import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import axios from 'axios'

const RAZOR_API_KEY = import.meta.env.RAZOR_API_KEY
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL



const inputVariants = {
  focus: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
  tap: { scale: 0.98 }
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 400 } },
  tap: { scale: 0.95 }
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'India'
];

export default function Checkout() {
  const [saveInfo, setSaveInfo] = useState(false);
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [amount,setAmount] = useState(20000);

  const handlePayNow = async () => {
    try {
      const { data: { order } } = await axios.post(BACKEND_URL + "/api/payment", {
        amount,
      });
  
      const options = {
        key: RAZOR_API_KEY,  // Use key to make Razorpay payment call
        amount: order.amount, // Amount from the backend order response
        currency: "INR",
        name: "adaa-jaipur",
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: BACKEND_URL + "/api/paymentVerification",  // Ensure this endpoint exists and works
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          color: "#121212"
        }
      };
  
      // Open Razorpay checkout
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error during payment initiation:", error);
      alert("There was an error initiating the payment.");
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center text-black dark:text-white mb-8"
        >
          FASCO Demo Checkout
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <motion.div 
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Contact Section */}
            <motion.div variants={formVariants}>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Contact</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Have an account?</span>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/login" className="text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors">
                    Create Account
                  </Link>
                </motion.div>
              </div>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                whileTap="tap"
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
              />
            </motion.div>

            {/* Delivery Section */}
            <motion.div variants={formVariants}>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Delivery</h2>
              <div className="space-y-4">
                <motion.select
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap="tap"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                >
                  <option value="" className="dark:bg-gray-800">Country / Region</option>
                  {countries.map(country => (
                    <option key={country} value={country} className="dark:bg-gray-800">
                      {country}
                    </option>
                  ))}
                </motion.select>

                <div className="grid grid-cols-2 gap-4">
                  {['First Name', 'Last Name'].map((placeholder) => (
                    <motion.input
                      key={placeholder}
                      variants={inputVariants}
                      whileFocus="focus"
                      whileTap="tap"
                      type="text"
                      placeholder={placeholder}
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                    />
                  ))}
                </div>

                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap="tap"
                  type="text"
                  placeholder="Address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  {['City', 'Postal Code'].map((placeholder) => (
                    <motion.input
                      key={placeholder}
                      variants={inputVariants}
                      whileFocus="focus"
                      whileTap="tap"
                      type="text"
                      placeholder={placeholder}
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                    />
                  ))}
                </div>

                <motion.label 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-slate-900 dark:border-gray-700 transition-colors"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Save This Info For Future</span>
                </motion.label>
              </div>
            </motion.div>

            {/* Payment Section */}
            <motion.div variants={formVariants}>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Payment</h2>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 border border-gray-300 rounded-md dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-slate-600 dark:text-slate-400" />
                    <span className="text-gray-700 dark:text-gray-300">Credit Card</span>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                </motion.div>

                <motion.div className="relative">
                  <motion.input
                    variants={inputVariants}
                    whileFocus="focus"
                    whileTap="tap"
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                  />
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  {['MM/YY', 'CVV'].map((placeholder) => (
                    <motion.input
                      key={placeholder}
                      variants={inputVariants}
                      whileFocus="focus"
                      whileTap="tap"
                      type="text"
                      placeholder={placeholder}
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                    />
                  ))}
                </div>

                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap="tap"
                  type="text"
                  placeholder="Card Holder Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                />

                <motion.label 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={savePaymentInfo}
                    onChange={(e) => setSavePaymentInfo(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-slate-900 dark:border-gray-700 transition-colors"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Save This Info For Future</span>
                </motion.label>
              </div>
            </motion.div>

            <motion.button
            onClick={handlePayNow}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-slate-900 hover:bg-slate-900 dark:bg-slate-50 dark:hover:bg-slate-50 text-white dark:text-black py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <FaLock className="text-sm" />
              <span>Pay Now</span>
            </motion.button>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit"
          >
            <div className="flex items-center space-x-4 mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80"
                  alt="Mini Dress"
                  className="w-20 h-20 object-cover rounded"
                />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                >
                  1
                </motion.span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-black dark:text-white font-medium">Mini Dress With Ruffled Straps</h3>
                <p className="text-gray-600 dark:text-gray-400">Red</p>
              </div>
              <span className="text-black dark:text-white font-medium">$100.00</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex">
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap="tap"
                  type="text"
                  placeholder="Discount code"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
                />
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 bg-slate-900 hover:bg-slate-700 dark:bg-slate-50 dark:hover:bg-slate-100 text-white dark:text-black rounded-r-md transition-colors duration-200"
                >
                  Apply
                </motion.button>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-2 text-sm"
            >
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>$100.00</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>$40.00</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between text-black dark:text-white font-medium pt-2 border-t border-gray-200 dark:border-gray-700"
              >
                <span>Total</span>
                <span>$140.00</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8"
        >
          Copyright © 2023 FASCO. All Rights Reserved.
        </motion.div>
      </div>
    </motion.div>
  );
}