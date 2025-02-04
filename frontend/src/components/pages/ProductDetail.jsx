import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { LoadingBar } from '../loadingBar/LoadingBar.jsx';
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TelegramShareButton,
  TwitterShareButton
} from 'react-share'


export default function ProductDetail() {
  

  //product _id 
  const { id } = useParams()
  const [avgReview, setAvgReview] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([]);
  const [colorsName, setColorsName] = useState([]);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [indexImageChange, setIndexImageChange] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false)
  const [isAddCartHide,setIsAddCartHide] = useState(false);
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    setIsDisabled(true)
    axios.get(BACKEND_URL + '/api/products/' + id, { withCredentials: true })
    .then((res) => {
      
      setProduct(res.data);
      setIsDisabled(false)
    })
    .catch((err) => {
      console.log(err);
    })
    
  }, [id])
  
  useEffect(()=>{
    
    axios.get(BACKEND_URL+ '/api/cart', { withCredentials: true })
    .then((res)=>{
      
      const product = res.data.items.find((p)=>p.product._id===id)
      console.log(product.quantity);
      
      setQuantity(product.quantity)
      
      
    })
  },[id])
  
  const handleUpdateProductQuantity = (change)=>{
  
    if(quantity>1){
      setIsAddCartHide(true)
    }else{
      setIsAddCartHide(false)
    }setQuantity(change);

    axios.put(BACKEND_URL + '/api/cart/changeProductQuantity/' + id,
      { selectedSize,
        selectedColor,
        quantity:change
      } ,{ withCredentials: true })
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => console.error('Error updating cart:', err));
      
    }
  //calculate the stars of review
  const setReviewStars = () => {
    let sum = 0, avg = 0;
    product.reviews.map((review) => {
      sum += Number(review.rating)

    })

    avg = sum / product.reviews.length
    setAvgReview(avg)

  }

  // -------------------------------------------share ------------------------------------------------------------------------
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  // Toggle the pop-up visibility when the button is clicked
  const togglePopUp = () => {
    setPopUpOpen(!isPopUpOpen);
  };

  // Close the pop-up when clicking outside of it
  const closePopUp = (e) => {
    if (e.target === e.currentTarget) {
      setPopUpOpen(false);
    }
  };
  const shareLink = `${window.location.origin}/product/${id}`;
  const ShareButton = ({ shareLink }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <FaShare className="text-gray-600 dark:text-gray-400" />
      </motion.button>
    );
  };

  const SocialShareButtons = ({ shareLink }) => {
    return (
      <div className="flex space-x-2">
        <FacebookShareButton url={shareLink}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <WhatsappShareButton url={shareLink}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton url={shareLink}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    );
  };


  useEffect(() => {
    if (product?.colors) {
      setColors(product.colors);
      const colorNames = product.colors.map(c => c.colorName);
      setColorsName(colorNames);

      // Set default selected color
      const defaultColor = colorNames[index] || product.colors[0].colorName;
      setSelectedColor(defaultColor);

      // Find images for selected color
      const selectedColorData = product.colors.find(c => c.colorName === defaultColor);
      setImages(selectedColorData ? selectedColorData.images : []);

      setTotalReviews(product.reviews.length);
      setReviewStars();

      // Set default selected size
      if (product.size && product.size.length > 0) {
        setSelectedSize(product.size[0]);
        setSizes(product.size);
      }
    }
  }, [product, selectedColor]);

  

  const handleAddCart = () => {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/cart/addProduct/" + id, { selectedColor,selectedSize,quantity }, { withCredentials: true })
      .then((res) => {
        toast("Product added to cart");
      })
  }



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
      <LoadingBar isLoading={isDisabled} />

      <div className="max-w-7xl mx-auto">
        <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary-500 dark:hover:text-primary-400">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary-500 dark:hover:text-primary-400">Shop</Link>
          <span className="mx-2">/</span>
          <span>{product?.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <img
                src={images.length > 0 ? images[indexImageChange] : 'default-image.jpg'}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {images && images.map((image, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer"
                >

                  <img
                    src={image}
                    alt={`Product view ${i + 1}`}
                    className="w-full h-full object-cover"
                    onClick={() => { setIndexImageChange(i) }}
                  />

                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {product?.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[1, 1, 1, 1, 1].map((_, index) => {
                      if (index < Math.floor(avgReview)) {
                        return <i className="fa-solid fa-star text-yellow-400"></i>; // Full star
                      } else if (index === Math.floor(avgReview) && (avgReview % 1 !== 0)) {
                        return (
                          <span key={index} className="text-yellow-400">
                            <i className="fa-regular fa-star-half-stroke"></i>
                          </span>
                        ); // Half star
                      } else {
                        return <i className="fa-regular fa-star"></i>; // Empty star
                      }
                    })}


                    {/* <span className="text-yellow-400">★</span>
                    <span className="text-gray-400">☆</span> */}
                    <span className="ml-1 text-gray-600 dark:text-gray-400">({totalReviews})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{product?.price}</span>
                <span className="text-xl text-gray-500 line-through">₹59.00</span>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm">
                  SAVE {product?.discountPercent}%
                </span>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
                <p className="text-red-600 dark:text-red-400">
                  Hurry up! Sale ends in: 00:05:59:47
                </p>
                {
                  product?.stock < 10 ?
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Only {product?.stock} item(s) left in stock!
                    </p> : <></>
                }
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Size: {selectedSize}
                </h3>
                <div className="flex gap-2">
                  {sizes && sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedSize === size
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Color: {selectedColor}
                </h3>
                <div className="flex gap-2">
                  {colorsName.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color)
                        setIndex(colorsName.findIndex((c) => c === color))
                      }}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color
                        ? 'border-slate-200 border-4 dark:border-white'
                        : 'border-transparent'
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpdateProductQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 text-white"
                  >
                    -
                  </button>
                  <span className="w-12 text-center dark:text-white">{quantity}</span>
                  <button
                    onClick={() => handleUpdateProductQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                {
                  quantity==1? 
                
                <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-full font-medium hover:bg-gray-900 dark:hover:bg-gray-100"
                onClick={handleAddCart}
                >
                  Add to cart
                </motion.button>: <></>
                }
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={


                    () => {
                      
                      axios.post(BACKEND_URL + '/api/wishlist/' + user.id , { color: selectedColor, size: selectedSize, productId: id })
                        .then((res) => {
                          console.log(res.data);
                          toast("Product added into Wishlist")
                        })
                        .catch((err) => {
                          console.log(err);

                        })

                    }
                  }

                >
                  <FaHeart className="text-gray-600 dark:text-gray-400" />
                </motion.button>

                {/* share  */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={togglePopUp}
                >
                  <FaShare className="text-gray-600 dark:text-gray-400" />
                </motion.button>

                {/* Pop-up for Share Buttons */}
                {isPopUpOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
                    onClick={closePopUp}
                  >
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg space-y-2 p-10">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Share </h2>
                        <button
                          className="text-gray-600 dark:text-gray-400"

                        >
                          <i class="fa-solid fa-xmark" onClick={closePopUp}></i>
                        </button>
                      </div>
                      <SocialShareButtons shareLink={shareLink} />
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Info */}
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Estimated Delivery:</span>
                  <span>Jul 30 - Aug 03</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Free Shipping & Returns:</span>
                  <span>On all orders over $75</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}