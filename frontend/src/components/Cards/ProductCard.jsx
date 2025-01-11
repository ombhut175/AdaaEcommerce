import { Link } from "react-router-dom";

function ProductCard() {
    return (
        <div>
            <a href="/productDetails" className="group relative block overflow-hidden ">
                <button
                    className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-emerald-900"
                >
                    <span className="sr-only">Wishlist</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </button>

                <img
                    src="https://www.irealife.com/cdn/shop/files/ProductTopsCarissaBlueSlitPeplumTop_1_7142cff7-459e-4416-bf3d-b0ff37347e12.jpg?v=1734448212&width=1100"
                    alt=""
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                />

                <div className="relative border border-gray-100 bg-white p-6">
                    <p className="text-gray-700">
                        $49.99
                        <span className="text-gray-400 line-through">$80</span>
                    </p>

                    <h3 className="mt-1.5 text-lg font-medium text-gray-900">Morden Workwear</h3>

                    <p className="mt-1.5 line-clamp-3 text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                        Officiis qui, enim cupiditate aliquam corporis iste.
                    </p>

                    <form className="mt-4 flex gap-4">
                        <Link to='/addToCart'>
                            <button
                                className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                            >
                                Add to Cart
                            </button>
                        </Link>
                        <Link to='/buyNow'>
                            <button
                                type="button"
                                className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                            >
                                Buy Now
                            </button>
                        </Link>
                    </form>
                </div>
            </a>
        </div>
    );
}

export default ProductCard;