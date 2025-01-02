
function BlogListView(){
    return(
        <div>
            <div className="text-center text-4xl font-medium mt-10">
                Blog
            </div>
            
            {/* divider */}
            <div class="mb-5 w-80 mx-auto flex items-center justify-center space-x-4">
                <span class="w-32 h-1 bg-slate-500 rounded-full"></span>
                <span class="text-2xl">&#9670;</span>
                <span class="w-32 h-1 bg-slate-500 rounded-full"></span>
            </div>
        </div>
    );
}

export default BlogListView;