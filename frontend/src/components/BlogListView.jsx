import BottomNavigationBar from "./BottomNavigationBar";
import Card_4 from "./Cards/Card_4";
import CarouselOfProduct from "./Carousle_product";
import Divider from "./Divider";
import ScrollMenus from "./ScrollMenus";

function BlogListView(){
    return(
        <div>
            <div className="dark:bg-gray-800">
                <div className="text-center text-4xl font-medium pt-10 dark:text-white">
                    Blog
                </div>
                <Divider/>
                <ScrollMenus/>
            </div>
            <Card_4/>
            <Card_4/>
            <Card_4/>
            <Card_4/>
            <CarouselOfProduct/>
            <BottomNavigationBar/>
        </div>
    );
}

export default BlogListView;