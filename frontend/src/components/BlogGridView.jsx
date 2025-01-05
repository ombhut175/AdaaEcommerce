import BottomNavigationBar from "./BottomNavigationBar";
import Card_3 from "./Cards/Card_3";
import Divider from "./Divider";
import ScrollMenus from "./ScrollMenus";

function BlogGridView() {
    return (
        <div className="w-full">

            <div className="dark:bg-slate-800">
                <div className="text-center text-4xl font-medium pt-8 dark:text-slate-200">Blog</div>
                <Divider/>
                <ScrollMenus/>
            </div>
            <div className="w-full flex flex-wrap justify-center dark:bg-gray-900">
                <Card_3 />
                <Card_3 />
                <Card_3 />
                <Card_3 />
                <Card_3 />
            </div>
            <BottomNavigationBar />
        </div>
    );
}

export default BlogGridView;