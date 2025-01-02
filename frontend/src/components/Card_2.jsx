function Card_2() {
    return (
        <div className="relative w-1/2 sm:w-1/3 h-72">
            <img
                src="https://img.freepik.com/premium-photo/women-fashion-designer-waistline-with-measuring-tape-size-workshop-boutique-store-young-female-person-tailors-checking-measurement-body-clothing-line-style-production_590464-459961.jpg"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300"
                alt="Image 1"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-2 py-1 rounded">
                Fashion Design
            </div>
        </div>
    );
}

export default Card_2;
