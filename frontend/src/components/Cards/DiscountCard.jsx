function DiscountCard() {
    return (
        <a href="#" className="relative block rounded-tr-3xl border border-gray-100 dark:border-slate-500">
            <span
                className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white"
            >
                Save 10%
            </span>

            <img
                src="https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/d/i/digital-printed-georgette-crop-top-set-in-mustard-v1-tqh8.jpg"
                alt=""
                className="-ml-6 -mt-6 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
            />
            <div className="p-4 text-center">
                <strong className="text-xl font-medium text-gray-900"> Morden Kurti </strong>

                <p className="mt-2 text-pretty text-gray-700 dark:text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in
                    eum vitae aliquid at sed dignissimos.
                </p>

                <span
                    className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
                >
                    More Details
                </span>
            </div>
        </a>
    );
}

export default DiscountCard;