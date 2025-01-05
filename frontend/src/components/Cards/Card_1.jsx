function Card_1() {
    return (
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
    );
}

export default Card_1;