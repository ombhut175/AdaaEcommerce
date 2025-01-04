import Divider from "./Divider";
import DiscountCard from './Cards/DiscountCard'
import PromisesSection from "./PromisesSection";
import BottomNavigationBar from "./BottomNavigationBar";

function DiscountProductList(){
    return(
        <div>
            <div className="dark:bg-gray-800">
                <div className="text-center text-4xl font-medium pt-10 dark:text-white">
                    Blog
                </div>
                <Divider/>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-20 p-20 dark:bg-gray-900">
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
                <DiscountCard/>
            </div>
            <PromisesSection/>
            <BottomNavigationBar/>
        </div>
    );
}

export default DiscountProductList;