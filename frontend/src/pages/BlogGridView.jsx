import BottomNavigationBar from "../components/BottomNavigationBar";
import Card_3 from "../components/Card_3";

function BlogGridView(){
    return(
        <div className="w-full">
            <div className="text-center text-4xl font-medium mt-8">
                Blog
            </div>
            
            {/* divider */}
            <div class="mb-5 w-80 mx-auto flex items-center justify-center space-x-4">
                <span class="w-32 h-1 bg-slate-500 rounded-full"></span>
                <span class="text-2xl">&#9670;</span>
                <span class="w-32 h-1 bg-slate-500 rounded-full"></span>
            </div>


            <div class="my-4 text-xl justify-center items-center flex text-gray-500">
                <span className="bg-slate-300 text-white px-2 rounded-xl m-2">#2021</span>
                <span className="bg-slate-300 text-white px-2 rounded-xl me-2">#spring</span>
                <span className="bg-slate-300 text-white px-2 rounded-xl me-2">#collection</span>
                <span className="bg-slate-300 text-white px-2 rounded-xl me-2">#fall</span>
                <span className="bg-slate-300 text-white px-2 rounded-xl me-2">#autumncollection</span>
                <span className="bg-slate-300 text-white px-2 rounded-xl me-2">#openfashion</span>
            </div>

            <div>
                <div className="w-full flex flex-wrap justify-center">
                    <Card_3/>
                    <Card_3/>
                    <Card_3/>
                    <Card_3/>
                    <Card_3/>
                </div>    
            </div>

            <div>
                <BottomNavigationBar/>
            </div>
        </div>
    );
}

export default BlogGridView;