import { motion } from "framer-motion"

const Slider = ({ min, max, value, onChange }) => {
    return (
        <div className="flex items-center space-x-4">
            <motion.input
                type="range"
                min={min}
                max={max}
                value={value[0]}
                onChange={(e) => onChange([Number.parseInt(e.target.value), value[1]])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.input
                type="range"
                min={min}
                max={max}
                value={value[1]}
                onChange={(e) => onChange([value[0], Number.parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            />
        </div>
    )
}

export default Slider

