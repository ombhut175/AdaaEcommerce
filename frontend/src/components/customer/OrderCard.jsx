import { motion } from "framer-motion";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../store/features/themeSlice.js";
import { ChevronRight, Package, Truck, CheckCircle } from "lucide-react";

const OrderStatusBar = ({ status }) => {
    const statuses = ["Pending", "Delivered", "Cancelled"];
    const currentIndex = statuses.indexOf(status);

    return (
        <div className="relative mt-6">
            <div className="flex justify-between mb-2">
                {statuses.map((s, index) => (
                    <div key={s} className="flex flex-col items-center w-1/3">
                        {index === 0 && <Package className={`w-5 h-5 ${index <= currentIndex ? "text-blue-500" : "text-gray-400"}`} />}
                        {index === 1 && <Truck className={`w-5 h-5 ${index <= currentIndex ? "text-blue-500" : "text-gray-400"}`} />}
                        {index === 2 && <CheckCircle className={`w-5 h-5 ${index <= currentIndex ? "text-blue-500" : "text-gray-400"}`} />}
                        <span className="text-xs mt-1 capitalize">{s}</span>
                    </div>
                ))}
            </div>
            <div className="h-1 bg-gray-200 rounded">
                <motion.div
                    className="h-full bg-blue-500 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentIndex + 1) * 33.33}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};


const OrderCard = ({ order , address}) => {
    const darkMode = useSelector(selectDarkMode);

    // Accessing the first color's image safely
    const productImage =
        order.productId.colors && order.productId.colors.length > 0
            ? order.productId.colors[0].images[0]
            : "/placeholder.svg"; // Default placeholder image if not available

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} transition-colors duration-200`}
        >
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <img
                                src={productImage}
                                alt={order.productId.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{order.productId.name}</h3>
                            <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Order #{order._id}</p>
                        </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} className={`text-right ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <p className="text-lg font-medium">${order.price.toFixed(2)}</p>
                        <p className="text-sm mt-1">Qty: {order.quantity}</p>
                    </motion.div>
                </div>

                <OrderStatusBar status={order.orderStatus} />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Shipping Address</h4>
                        <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {address?.address || "Address not available"}
                            <br />
                            {address?.city}, {address?.state} {address?.pincode}
                        </p>
                    </div>
                    <div>
                        <h4 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Order Details</h4>
                        <div className={`mt-1 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <p>Payment: {order.paymentMethod}</p>
                            <p>Ordered: {format(new Date(order.orderDate), "MMM dd, yyyy")}</p>
                            {order.deliveryDate && <p>Expected Delivery: {format(new Date(order.deliveryDate), "MMM dd, yyyy")}</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${order.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                        {order.orderStatus}
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center px-4 py-2 rounded-md ${darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"} transition-colors duration-200`}
                    >
                        Track Order
                        <ChevronRight className="ml-2 w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};




export default OrderCard;
