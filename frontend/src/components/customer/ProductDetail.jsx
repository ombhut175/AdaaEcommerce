import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link,Navigate,useNavigate,useParams } from 'react-router-dom';
import { FaHeart, FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import axios from 'axios'
export default function ProductDetail() {
  

  //product _id 
  const {id} = useParams()
  const [avgReview,setAvgReview ] = useState(0);
  const [totalReviews,setTotalReviews ] = useState(0);
  const [product,setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [quantity, setQuantity] = useState(1);
  const [sizes,setSizes] = useState([])
  const [colors,setColors] = useState([]);  
  const [colorsName,setColorsName] = useState([]);  
  const [images , setImages] = useState([]);
  const [index,setIndex] = useState(0);
  const [indexImageChange,setIndexImageChange] = useState(0);
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL+'/api/products/' + id)
    .then((res)=>{
      
      setProduct(res.data);
      
      
    })
    .catch((err)=>{
      console.log(err );
    })
  },[id])

  //calculate the stars of review
  const setReviewStars = ()=>{
    let sum=0,avg=0;
    product.reviews.map((review)=>{
      sum += Number(review.rating)
      
    })
    
    avg = sum/product.reviews.length
    setAvgReview(avg)
    
  }


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
  }, [product,selectedColor]);
  
  const handleAddCart = ()=>{
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/cart/addProduct/"+id,{selectedColor})
    .then((res)=>{
      console.log(res);
      
    })  
  }
    
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 min-h-screen bg-white dark:bg-gray-900"
    >
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
                    onClick={()=>{setIndexImageChange(i)}}
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
                      return <i class="fa-solid fa-star text-yellow-400"></i>; // Full star
                    } else if (index === Math.floor(avgReview) && (avgReview % 1 !== 0)) {
                      return (
                        <span key={index} className="text-yellow-400">
                          <i class="fa-regular fa-star-half-stroke"></i>
                        </span>
                      ); // Half star
                    } else {
                      return <i class="fa-regular fa-star"></i>; // Empty star
                    }
                  })}


                    {/* <span className="text-yellow-400">★</span>
                    <span className="text-gray-400">☆</span> */}
                    <span className="ml-1 text-gray-600 dark:text-gray-400">({totalReviews})</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    24 people are viewing this right now
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product?.price}</span>
                <span className="text-xl text-gray-500 line-through">$59.00</span>
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
                </p>:<></>
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedSize === size
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
                        setIndex(colorsName.findIndex((c)=>c==color))







                      }}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
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
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-full font-medium hover:bg-gray-900 dark:hover:bg-gray-100"
                  onClick={handleAddCart}
                >
                  Add to cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={

                    
                    ()=>{
                        console.log(user.id);
                        console.log(id);
                        console.log(selectedColor);
                        console.log(selectedSize);
                        
                        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/wishlist/' + user.id , {color:selectedColor,size:selectedSize,productId : id})
                        .then((res)=>{
                          console.log(res.data);
                          toast(res.data.message)
                        })
                        .catch((err)=>{
                          console.log(err);
                          
                        })
                    
                      }
                  }
                
                >
                  <FaHeart className="text-gray-600 dark:text-gray-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaShare className="text-gray-600 dark:text-gray-400" />
                </motion.button>
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