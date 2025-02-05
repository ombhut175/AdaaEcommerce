import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingBar } from '../loadingBar/LoadingBar';

export default function Cart() {
  const [items, setItems] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [isDisabled, setIsDisabled] = useState(false);
  
  
  const updateQuantity = (id, change) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  
    const product = items.find((item) => item.id === id);
    if (!product) return;
  
    const newQuantity = Math.max(1, product.quantity + change);
  
    axios
      .put(
        `${BACKEND_URL}/api/cart/changeProductQuantity/${id}`,
        {
          selectedSize: product.size,
          selectedColor: product.color,
          quantity: newQuantity,
        },
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error("Error updating cart:", err));
  };
  
  useEffect(() => {
    axios.get(BACKEND_URL + '/api/cart', { withCredentials: true })
        .then((res) => {
          if (Array.isArray(res.data.items)) {
            setItems(res.data.items.map(item => {
              const selectedColorObj = item.product.availableColors?.find(
                  color => color.colorName === item.selectedColor
              );
              return {
                id: item.product._id,
                name: item.product.name,
                price: item.product.price - (item.product.price * (item.product.discountPercent || 0) / 100),
                color: item.selectedColor || 'No color selected',
                image: selectedColorObj?.images?.[0] || item.product.images?.[0] || 'default-image-url.jpg',
                quantity: item.quantity,
                size:item.selectedSize
              };
            }));
          } else {
            setItems([]);
          }
        })
        .catch((err) => console.error('Error fetching cart:', err));
  }, []);


  const removeItem = async (id) => {
    try {
      setIsDisabled(false);
      await axios.delete(`${BACKEND_URL}/api/cart/${id}`, { withCredentials: true });
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
    }
    setIsDisabled(true);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const wrappingCost = 10.00;
  const total = subtotal + (document.getElementById('gift-wrap')?.checked ? wrappingCost : 0);

  return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <LoadingBar isLoading={isDisabled} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
            <div className="text-sm breadcrumbs mt-2">
              <Link to="/" className="hover:text-black dark:hover:text-gray-300">Home</Link>
              <span className="mx-2">/</span>
              <span>Your Shopping Cart</span>
            </div>
          </div>

          {items.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6 overflow-x-auto">
                    <table className="w-full text-black dark:text-white text-sm md:text-base">
                      <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3">Product</th>
                        <th className="text-center py-3">Price</th>
                        <th className="text-center py-3">Quantity</th>
                        <th className="text-right py-3">Total</th>
                      </tr>
                      </thead>
                      <tbody>
                      {items?.map(item => (
                          <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3">
                              <div className="flex items-center gap-4">
                                <motion.img whileHover={{ scale: 1.05 }} src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded" />
                                <div>
                                  <h3 className="font-medium">{item.name}</h3>
                                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Color: {item.color}</p>
                                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Size: {item.size}</p>
                                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => removeItem(item.id)} className="text-red-500 text-xs flex items-center gap-1 mt-1 hover:text-red-600">
                                    <FaTrash size={10} /> Remove
                                  </motion.button>
                                </div>
                              </div>
                            </td>
                            <td className="text-center">${item.price.toFixed(2)}</td>
                            <td className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-200 dark:bg-gray-700 rounded">
                                  <FaMinus size={12} />
                                </motion.button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-200 dark:bg-gray-700 rounded">
                                  <FaPlus size={12} />
                                </motion.button>
                              </div>
                            </td>
                            <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-bold mb-3">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="gift-wrap" className="rounded border-gray-300" onChange={() => setItems([...items])} />
                        <label htmlFor="gift-wrap">Gift wrap for $10.00</label>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                      <motion.button
                          onClick={() => {
                            localStorage.setItem('totalCart', total.toFixed(2));
                            navigate('/checkout/' + user.id);
                          }}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium mt-4 hover:shadow-lg transition-all duration-300">
                        Proceed to Checkout
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
          ) : (
              <div className="text-center py-10">
                <h2 className="text-xl font-bold">Your cart is empty</h2>
                <Link to="/shop">
                  <motion.button className="mt-4 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium hover:shadow-lg">
                    Continue Shopping
                  </motion.button>
                </Link>
              </div>
          )}
        </div>
      </motion.div>
  );
}
