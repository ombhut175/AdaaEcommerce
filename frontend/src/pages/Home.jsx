import Footer from "../components/Footer";
import 'flowbite';
import Carousel from "./carosle.jsx";

export default function HomePage() {
    return (
        <div className="w-full">
            <div className="flex items-center justify-center flex-col">
                <div className="w-full flex flex-col items-center justify-center">

                    {/* text image */}
                    <div className="absolute text-start text-indigo-800 font-bold text-lg italic">
                        LUXURY <br />FASHION <br />& ACCESSORIES
                    </div>

                    <div className="absolute top-full rounded-3xl w-auto text-center py-2 px-10 bg-opacity-60 bg-black text-white">
                        Your Heading Here
                    </div>

                    {/* images */}
                    <div className="w-full">
                        <img
                            src="https://www.miamiamine.com/wp-content/uploads/2019/10/Mia-Mia-Mine-Louis-Vuitton-Scarf-1-650x975.jpeg"
                            alt="Description"
                            className="w-full h-auto sm:hidden"
                        />
                        <img
                            className="md:block hidden h-auto w-full"
                            src="https://miro.medium.com/v2/resize:fit:1400/1*nculSVfbqj3yg5FR8Kk3AQ.jpeg"
                            alt="Alternate Description"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-200">
                <div className="justify-center flex items-center flex-col">
                    <h1 className="mt-10 text-4xl font-bold text-indigo-800">NEW ARRIVAL!</h1>
                    <hr class="w-48 h-1 mx-auto my-4 bg-yellow-400 border-0 rounded md:my-10 dark:bg-gray-700" />
                </div>

                {/* cards */}
                <div className="w-full h-auto flex flex-wrap justify-center gap-6 p-4">
                    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 group">
                        {/* Image */}
                        <img
                            class="w-full transition-opacity duration-300 ease-in-out group-hover:opacity-90"
                            src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                            alt="Sunset in the mountains"
                        />
                        {/* Img Text */}
                        <div class="px-6 py-4 bg-white">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!</p>
                        </div>
                        <div class="px-6 pb-2  bg-white">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">$120</span>
                        </div>
                    </div>

                    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 group">
                        {/* Image */}
                        <img
                            class="w-full transition-opacity duration-300 ease-in-out group-hover:opacity-90"
                            src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                            alt="Sunset in the mountains"
                        />
                        {/* Img Text */}
                        <div class="px-6 py-4  bg-white">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!</p>
                        </div>
                        <div class="px-6 pb-2  bg-white">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">$120</span>
                        </div>
                    </div>

                    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 group">
                        {/* Image */}
                        <img
                            class="w-full transition-opacity duration-300 ease-in-out group-hover:opacity-90"
                            src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                            alt="Sunset in the mountains"
                        />
                        {/* Img Text */}
                        <div class="px-6 py-4  bg-white">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!</p>
                        </div>
                        <div class="px-6 pb-2  bg-white">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">$120</span>
                        </div>
                    </div>

                    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 group">
                        {/* Image */}
                        <img
                            class="w-full transition-opacity duration-300 ease-in-out group-hover:opacity-90"
                            src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                            alt="Sunset in the mountains"
                        />
                        {/* Img Text */}
                        <div class="px-6 py-4  bg-white">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!</p>
                        </div>
                        <div class="px-6 pb-2  bg-white">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">$120</span>
                        </div>
                    </div>

                    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 group">
                        {/* Image */}
                        <img
                            class="w-full transition-opacity duration-300 ease-in-out group-hover:opacity-90"
                            src="https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png"
                            alt="Sunset in the mountains"
                        />
                        {/* Img Text */}
                        <div class="px-6 py-4  bg-white">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!</p>
                        </div>
                        <div class="px-6 pb-2  bg-white">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">$120</span>
                        </div>
                    </div>
                </div>
                {/* card end */}

                {/* Explore More Button */}
                <div class="flex flex-col items-center justify-center space-y-4">
                    <div className="m-5">
                        <a
                        className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                        href="#"
                        >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                            <svg
                            className="size-5 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                            </svg>
                        </span>

                        <span className="text-lg font-medium transition-all group-hover:ms-4"> Explore More </span>
                        </a>
                    </div>

                    {/* divider */}
                    <div class="w-80 h-1 bg-black rounded-full flex flex-wrap flex-col justify-center ">
                        <span class="w-80 h-1 bg-black rounded-full"></span>
                        <span>⭐</span>
                        <span class="w-80 h-1 bg-black rounded-full"></span>
                    </div>
                    {/* text */}
                    <div class="flex space-x-40 ">
                        <div class="flex flex-col">
                            <h3 class="text-gray-800 font-bold text-xl">PRADA</h3>
                            <h3 class="text-gray-800 font-bold text-xl">Cartier</h3>
                        </div>
                        <div class="flex flex-col">
                            <h3 class="text-gray-800 font-bold text-xl">BURBERRY</h3>
                            <h3 class="text-gray-800 font-bold text-xl">GUCCI</h3>
                        </div>
                        <div class="flex flex-col">
                            <h3 class="text-gray-800 font-bold text-xl">BOSS</h3>
                            <h3 class="text-gray-800 font-bold text-xl">TIFFANY & CO.</h3>
                        </div>
                    </div>

                    {/* divider */}
                    <div class="w-60 h-1 bg-yellow-300 rounded-full"></div>
                    
                    <h2 class="text-gray-800 font-bold text-lg">COLLECTIONS</h2>
                    <h1 class="font-roboto">This should be Roboto font</h1>

                </div>
                <div className="bg-white">
                    <div className="w-full">
                        <img className="w-full h-auto p-10"
                        src="https://www.worldfashionexchange.com/blog/wp-content/uploads/2024/01/PRADA.webp"/>
                    </div>
                </div>
            </div>

            <div className="text-center mb-10">
                <span className="flex items-center">
                    <span className="h-px flex-1 ms-48 bg-black"></span>
                    <span className="shrink-0 px-6 text-lg sm:text-4xl font-bold text-indigo-800">JUST FOR YOU</span>
                    <span className="h-px flex-1 me-48 bg-black"></span>
                </span>
            </div>

            <div>
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h2 class="text-3xl font-bold text-indigo-800 sm:text-4xl">
                        @TRENDING
                        </h2>
                        <div class="mt-4 text-gray-500">
                            <span className="bg-slate-300 text-white px-2 rounded-xl me-1">#2021</span>
                            <span className="bg-slate-300 text-white px-2 rounded-xl me-1">#spring</span>
                            <span className="bg-slate-300 text-white px-2 rounded-xl me-1">#collection</span>
                            <span className="bg-slate-300 text-white px-2 rounded-xl me-1">#fall</span>
                            <span className="bg-slate-300 text-white px-2 rounded-xl me-1">#autumncollection</span>
                            <span className="bg-slate-300 text-white px-2 rounded-xl me-1">#openfashion</span>
                        </div>
                    </div>
                    <div class="mt-10 text-center">
                        <h2 class="text-3xl font-bold text-indigo-800 sm:text-5xl">
                        Open
                        <br />
                        Fashion
                        </h2>
                        <p class="mt-4 text-xl text-gray-500 sm:text-2xl">
                        Making a luxurious lifestyle accessible for a generous group of women is our
                        daily drive.
                        </p>
                    </div>
                </div>       
            </div>

            <div className="md:mx-40 mb-10 my-5 border border-gray-300 rounded-lg shadow-lg">
                <Carousel />
            </div>


            {/* second carosle */}
            <div>
<div data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }' class="relative">
  <div class="hs-carousel flex space-x-2">
    <div class="flex-none">
      <div class="hs-carousel-pagination max-h-96 flex flex-col gap-y-2 overflow-y-auto">
        <div class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[150px] hs-carousel-active:border-blue-400">
          <div class="flex justify-center h-full bg-gray-100 p-2 dark:bg-neutral-900">
            <span class="self-center text-xs text-gray-800 transition duration-700 dark:text-white">First slide</span>
          </div>
        </div>
        <div class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[150px] hs-carousel-active:border-blue-400">
          <div class="flex justify-center h-full bg-gray-200 p-2 dark:bg-neutral-800">
            <span class="self-center text-xs text-gray-800 transition duration-700 dark:text-white">Second slide</span>
          </div>
        </div>
        <div class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[150px] hs-carousel-active:border-blue-400">
          <div class="flex justify-center h-full bg-gray-300 p-2 dark:bg-neutral-700">
            <span class="self-center text-xs text-gray-800 transition duration-700 dark:text-white">Third slide</span>
          </div>
        </div>
        <div class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[150px] hs-carousel-active:border-blue-400">
          <div class="flex justify-center h-full bg-gray-100 p-2 dark:bg-neutral-900">
            <span class="self-center text-xs text-gray-800 transition duration-700 dark:text-white">Fourth slide</span>
          </div>
        </div>
        <div class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[150px] hs-carousel-active:border-blue-400">
          <div class="flex justify-center h-full bg-gray-200 p-2 dark:bg-neutral-800">
            <span class="self-center text-xs text-gray-800 transition duration-700 dark:text-white">Fifth slide</span>
          </div>
        </div>
        <div class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[150px] hs-carousel-active:border-blue-400">
          <div class="flex justify-center h-full bg-gray-300 p-2 dark:bg-neutral-700">
            <span class="self-center text-xs text-gray-800 transition duration-700 dark:text-white">Sixth slide</span>
          </div>
        </div>
      </div>
    </div>

    <div class="relative grow overflow-hidden min-h-96 bg-white rounded-lg">
      <div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
        <div class="hs-carousel-slide">
          <div class="flex justify-center h-full bg-gray-100 p-6 dark:bg-neutral-900">
            <span class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">First slide</span>
          </div>
        </div>
        <div class="hs-carousel-slide">
          <div class="flex justify-center h-full bg-gray-200 p-6 dark:bg-neutral-800">
            <span class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Second slide</span>
          </div>
        </div>
        <div class="hs-carousel-slide">
          <div class="flex justify-center h-full bg-gray-300 p-6 dark:bg-neutral-700">
            <span class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Third slide</span>
          </div>
        </div>
        <div class="hs-carousel-slide">
          <div class="flex justify-center h-full bg-gray-100 p-6 dark:bg-neutral-900">
            <span class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Fourth slide</span>
          </div>
        </div>
        <div class="hs-carousel-slide">
          <div class="flex justify-center h-full bg-gray-200 p-6 dark:bg-neutral-800">
            <span class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Fifth slide</span>
          </div>
        </div>
        <div class="hs-carousel-slide">
          <div class="flex justify-center h-full bg-gray-300 p-6 dark:bg-neutral-700">
            <span class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Sixth slide</span>
          </div>
        </div>
      </div>

      <button type="button" class="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span class="text-2xl" aria-hidden="true">
          <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </span>
        <span class="sr-only">Previous</span>
      </button>
      <button type="button" class="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span class="sr-only">Next</span>
        <span class="text-2xl" aria-hidden="true">
          <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</div>
            </div>
        
            <div className="w-full">
                <div class="flex flex-col text-center">
                    <h3 class="text-indigo-800 font-bold text-4xl">PRADA</h3>
                    <h3 class="text-indigo-800 font-bold text-4xl">Cartier</h3>
                </div>
                <div className="mt-4 text-slate-600 text-xl text-center">
                    Cdskmckldmc kmk knkio nio jnmk n njio okjm ojio joijio olkjo kjmolj oijioj iojiojiojioj jiojio
                </div>
            </div>
            {/* Horizontle  Line */}
            <div className="mt-5 sm:mx-96 border-t border-gray-500 pt-8"></div>
            {/* 4 Part Images  */}
            <div className="w-full bg-slate-200">
                    <div className="bg-white dark:bg-gray-900 p-5">
                    <div className="flex flex-wrap justify-center gap-10">
                        <div className="w-1/2 sm:w-1/3 h-72">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlpCM0AMyUaJajEp7gTpLFs6JsqK0-bU1uA&s"
                            className="w-full h-full object-cover rounded-lg"
                            alt="Image 1"
                        />
                        </div>
                        <div className="w-1/2 sm:w-1/3 h-72">
                        <img
                            src="https://img.freepik.com/premium-photo/women-fashion-designer-waistline-with-measuring-tape-size-workshop-boutique-store-young-female-person-tailors-checking-measurement-body-clothing-line-style-production_590464-459961.jpg"
                            className="w-full h-full object-cover rounded-lg"
                            alt="Image 2"
                        />
                        </div>
                        <div className="w-1/2 sm:w-1/3 h-72">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJl6_5VN8ZF0UQBIYvCtmsXuyuhpGBGkIeLsm3SqEUZ7lf3dkKsxgivocIxtIPQdWF2w&usqp=CAU"
                            className="w-full h-full object-cover rounded-lg"
                            alt="Image 3"
                        />
                        </div>
                        <div className="w-1/2 sm:w-1/3 h-72">
                        <img
                            src="https://media.istockphoto.com/id/1338720994/photo/middle-aged-mature-woman-with-blond-hair-wearing-sunglasses-walking-on-city-streets-while.jpg?s=612x612&w=0&k=20&c=vljaPm9YoM5-544iiax5KIK8ixf2fIsW1Gga0o1_0Uc="
                            className="w-full h-full object-cover rounded-lg"
                            alt="Image 4"
                        />
                        </div>
                    </div>
                </div>
            </div>

            {/* Title, subtitle and grid of blocked stats with value and title */}
            <div>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by eCommerce Businesses</h2>

                        <p className="mt-4 text-gray-500 sm:text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores laborum labore
                        provident impedit esse recusandae facere libero harum sequi.
                        </p>
                    </div>

                    <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Total Sales</dt>

                        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">$4.8m</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Official Addons</dt>

                        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">24</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Total Addons</dt>

                        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Downloads</dt>

                        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86k</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    );
}







{/* <div>
    <a href="#" className="group relative block bg-black rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out sm:w-[300px] sm:h-[400px] lg:w-[400px] lg:h-[500px]">
        <img alt="fation Image"
            src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
            className="inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />
        <div className="absolute bottom-0 w-full bg-black bg-opacity-75 text-white text-center py-4 transform translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out">
            <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, amet!
            </p>
        </div>
    </a>
</div> */}