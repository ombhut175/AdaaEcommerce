const imgPath = import.meta.env.VITE_IMAGE_PATH
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export default function Hero() {
    return (
        <>
            {/* shopping */}
            <div className=' h-screen z-10 fixed top-[90%] right-5 text-2xl text-white hover:text-slate-400 dark:text-slate-800 dark:hover:text-slate-600'>
                <div className=''><button className='active:scale-95'> <Link to='' className='' > <i class="fa-solid fa-cart-shopping w-full bg-slate-900 p-5 rounded-xl dark:bg-slate-100"></i></Link></button></div>
            </div>

            {/* Hero code  */}
            <div className="grid grid-cols-12 items-center p-10 ">
                <div className="lg:col-span-4 h-auto col-span-12 ">
                    <img src={`${imgPath}/hero-1.avif`} alt="" />
                </div>
                <div className="lg:col-span-4 h-auto col-span-12">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center text-center space-y-6 py-32"
                    >
                        <h2 className="text-6xl font-bold text-black dark:text-white">
                            ULTIMATE
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                SALE
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">NEW COLLECTION</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md uppercase"
                        >
                            Shop Now
                        </motion.button>
                    </motion.div>
                </div>
                <div className="lg:col-span-4 h-auto col-span-12">

                    <img src={`${imgPath}/hero-2.avif`} alt="" />

                </div>

            </div>
        </>
    )
}