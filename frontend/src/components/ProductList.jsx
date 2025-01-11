import ProductCard from "./Cards/ProductCard";
import Footer from "./Footer";
import PromisesSection from "./PromisesSection";

function ProductList(){
    return(
        <div className="w-full dark:bg-gray-900">
            <div className="text-3xl justify-center flex items-center p-10 dark:text-white">
                Collections list
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 m-10">
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
            <PromisesSection/>
            <Footer/>
        </div>
    );
}

export default ProductList;