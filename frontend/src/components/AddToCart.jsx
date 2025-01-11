import Divider from "./Divider";

function AddToCart(){
    return(
        <div className="w-full dark:bg-gray-900">
            <div className="text-3xl justify-center flex items-center p-10 dark:text-white">
                Add To Cart
            </div>
            <Divider/>
        </div>
    );
}

export default AddToCart;