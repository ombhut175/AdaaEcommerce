import { motion } from "framer-motion"

const Checkbox = ({ id, checked, onChange, label }) => {
    return (
        <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <motion.input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 transition-all duration-200"
                whileTap={{ scale: 0.9 }}
            />
            <motion.label
                htmlFor={id}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                whileHover={{ color: "#4F46E5" }}
                transition={{ duration: 0.2 }}
            >
                {label}
            </motion.label>
        </motion.div>
    )
}

export default Checkbox