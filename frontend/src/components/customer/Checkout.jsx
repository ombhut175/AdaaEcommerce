import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toastify
import { useSelector } from 'react-redux';

const RAZOR_API_KEY = import.meta.env.RAZOR_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const inputVariants = {
  focus: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
  tap: { scale: 0.98 },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400 } },
  tap: { scale: 0.95 },
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'India',
];

export default function Checkout() {
  const [saveInfo, setSaveInfo] = useState(false);
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [amount, setAmount] = useState(20000);
  // Create state to store address fields
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    addressLine: '',
    city: '',
    postalCode: '',
    state: '',
    country: '',
  });
  const user = useSelector(state => state.user )

  // Handle change of address fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAddress((prev) => ({
      ...prev,
      country: selectedCountry,
      userId:user.id
    }));
  };

  // Address validation function
  const validateAddress = () => {
    // Check if any address field is empty
    if (
      !address.firstName ||
      !address.lastName ||
      !address.addressLine ||
      !address.city ||
      !address.postalCode ||
      !address.state ||
      !address.country
    ) {
      toast.error('Please fill in all the address fields.');
      return false;
    }
  
    // Validate postal code: only numbers, exactly 10 digits
    const postalCodeRegex = /^\d{6}$/;
    if (!postalCodeRegex.test(address.postalCode)) {
      toast.error('Postal code must be 10 digits long and contain only numbers.');
      return false;
    }
  
    return true;
  };
  
  const handlePayNow = async () => {
    if (!validateAddress()) return; // Only proceed if the address is valid
    
    await axios.post(BACKEND_URL + "/api/address",address)
    .then((res)=>{
      console.log(res);
      
    })
    try {
      const { data: { order } } = await axios.post(BACKEND_URL + '/api/payment', {
        amount,
      });

      const options = {
        key: RAZOR_API_KEY,  // Use key to make Razorpay payment call
        amount: order.amount, // Amount from the backend order response
        currency: 'INR',
        name: 'adaa-jaipur',
        description: 'Tutorial of RazorPay',
        image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
        order_id: order.id,
        callback_url: BACKEND_URL + '/api/paymentVerification',  // Ensure this endpoint exists and works
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#121212',
        },
      };

      // Open Razorpay checkout
      const razor = new window.Razorpay(options);
      razor.open();



    } catch (error) {
      console.error('Error during payment initiation:', error);
      alert('There was an error initiating the payment.');
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

            {/* Delivery Section */}
            <motion.div variants={formVariants}>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Delivery</h2>
              <div className="space-y-4">
                <motion.select
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap="tap"
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                >
                  <option value="" className="dark:bg-gray-800">
                    Country / Region
                  </option>
                  {countries.map((country) => (
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
                      name={placeholder === 'First Name' ? 'firstName' : 'lastName'}
                      value={address[placeholder === 'First Name' ? 'firstName' : 'lastName']}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                    />
                  ))}
                </div>

                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap="tap"
                  type="text"
                  name="addressLine"
                  placeholder="Address"
                  value={address.addressLine}
                  onChange={handleInputChange}
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
                      name={placeholder === 'City' ? 'city' : 'postalCode'}
                      placeholder={placeholder}
                      value={address[placeholder === 'City' ? 'city' : 'postalCode']}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                    />
                  ))}
                </div>

                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap="tap"
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 hover:border-slate-700 dark:hover:border-slate-500"
                />

                <motion.label whileHover={{ scale: 1.02 }} className="flex items-center space-x-2 cursor-pointer">
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
              <div className="space-y-4">
                

              <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handlePayNow}
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <FaLock className="text-sm" />
              <span>Pay Now</span>
            </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Payment Details */}
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
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
                />
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-r-md transition-colors duration-200"
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
