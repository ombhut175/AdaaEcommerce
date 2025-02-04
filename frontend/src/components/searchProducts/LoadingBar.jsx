import { motion } from "framer-motion"

export const LoadingBar = ({ isLoading }) => {
    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "rgba(0,0,0,0.2)",
                zIndex: 9999,
            }}
            animate={{
                width: isLoading ? "100%" : 0,
            }}
            transition={{
                duration: 0.5,
            }}
        >
            <motion.div
                style={{
                    height: "100%",
                    background: "#4F46E5",
                }}
                animate={{
                    width: isLoading ? "100%" : 0,
                }}
                transition={{
                    duration: 0.5,
                }}
            />
        </motion.div>
    )
}

