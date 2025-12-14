import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { selectDarkMode } from "../store/features/themeSlice.js"
import { ShoppingBag } from "lucide-react"
import {useNavigate} from "react-router-dom";

const EmptyState = () => {
    const darkMode = useSelector(selectDarkMode);
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="inline-block">
                <ShoppingBag className="mx-auto h-12 w-12" />
            </motion.div>
            <h3 className={`mt-2 text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>No orders found</h3>
            <p className="mt-1 text-sm">Start shopping to see your orders here.</p>
            <div className="mt-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                        darkMode ? "text-white bg-blue-600 hover:bg-blue-700" : "text-white bg-blue-500 hover:bg-blue-600"
                    } transition-colors duration-200`}
                    onClick={() => {
                        navigate("/shop");
                    }}
                >
                    Browse Products
                </motion.button>
            </div>
        </motion.div>
    )
}

export default EmptyState