// Previous imports remain the same...
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const cartItems = [
  {
    id: 1,
    name: 'Mini Dress With Ruffled Straps',
    price: 14.90,
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    quantity: 1
  }
];

export default function Cart() {
  // Previous state and functions remain the same...
  const [items, setItems] = useState(cartItems);

  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL + '/api/cart' ,{withCredentials:true})
    .then((res)=>{
      console.log(resl.data);
    })
  },[])


  const updateQuantity = (id, change) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const wrappingCost = 10.00;
  const total = subtotal + (document.getElementById('gift-wrap')?.checked ? wrappingCost : 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Shopping Cart</h1>
          <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400 mt-2">
            <Link to="/" className="hover:text-black dark:hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>Your Shopping Cart</span>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 cart-text">Product</th>
                      <th className="text-center py-4 cart-text">Price</th>
                      <th className="text-center py-4 cart-text">Quantity</th>
                      <th className="text-right py-4 cart-text">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                              <h3 className="font-medium cart-text">{item.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Color: {item.color}</p>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 text-sm flex items-center gap-1 mt-2 hover:text-red-600"
                              >
                                <FaTrash size={12} /> Remove
                              </motion.button>
                            </div>
                          </div>
                        </td>
                        <td className="text-center cart-text">${item.price.toFixed(2)}</td>
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            >
                              <FaMinus size={12} />
                            </motion.button>
                            <span className="w-8 text-center cart-text">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            >
                              <FaPlus size={12} />
                            </motion.button>
                          </div>
                        </td>
                        <td className="text-right cart-text">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold cart-text mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between cart-text">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <input
                      type="checkbox"
                      id="gift-wrap"
                      className="rounded border-gray-300"
                      onChange={() => setItems([...items])}
                    />
                    <label htmlFor="gift-wrap" className="cart-text">
                      Gift wrap for $10.00
                    </label>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between font-bold cart-text">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium mt-4 hover:shadow-lg transition-all duration-300"
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold cart-text mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium hover:shadow-lg transition-all duration-300"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}