import axios from "axios";
import {toast} from "react-toastify";

const handleAddCartWithDefaultValues = async (productDetail) => {
    try {
        console.log(productDetail);
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart/addProduct/${productDetail._id}`,
            {
                selectedColor: productDetail.colors[0]?.colorName, selectedSize: productDetail.size[0], quantity: 1
            },
            {withCredentials: true});
        toast.success("product successfully added to cart!");
    } catch (error) {
        console.log(error);
    }
}


const handleAddWishlistWithDefaultValues = async (productDetail) => {
    try {
        console.log(productDetail);
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${productDetail._id}`,
            {
                color: productDetail.colors[0]?.colorName,
                size: productDetail.size[0], quantity: 1
            },
            {withCredentials: true});
        toast.success("product successfully added to wishlist!");
    } catch (error) {
        console.log(error);
    }
}
export {
    handleAddCartWithDefaultValues,
    handleAddWishlistWithDefaultValues
};