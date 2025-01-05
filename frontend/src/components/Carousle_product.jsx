import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function CarouselOfProduct() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1067,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const Images = [
        "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80",
        "https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png",
        "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80",
        "https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png",
    ];

    const formattedImageSlider = Images.map((imgPath, idx) => (
        <div
            key={idx}
            className="flex flex-col items-center justify-center"
        >
            <div className="h-64 sm:h-80 md:h-[400px] w-3/4 flex justify-center">
                <img
                    src={imgPath}
                    alt={`Product ${idx + 1}`}
                    className="object-cover h-full w-full grayscale hover:grayscale-0 transition-all duration-500 rounded-lg"
                />
            </div>
        </div>
    ));

    return (
        <div className="py-8 px-4 sm:px-8 lg:px-16">
            <Slider {...settings}>{formattedImageSlider}</Slider>
        </div>
    );
}

export default CarouselOfProduct;
